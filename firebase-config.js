// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFeXOK1lpK140IasFh7gFUW29i5xXBK00",
    authDomain: "gyaanam-ai.firebaseapp.com",
    projectId: "gyaanam-ai",
    storageBucket: "gyaanam-ai.firebasestorage.app",
    messagingSenderId: "266437796361",
    appId: "1:266437796361:web:1684ec8b4938aec0b0ced8",
    measurementId: "G-Z7W5SFJBDT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth
const auth = firebase.auth();

// Configure Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Debug: Check Firebase initialization
console.log('🔥 Firebase initialized successfully!');
console.log('Auth object:', auth);
console.log('Firestore object:', db);

// Generate unique session ID
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Get current session ID (from localStorage or create new)
function getCurrentSessionId() {
    let sessionId = localStorage.getItem('gyaanam_session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('gyaanam_session_id', sessionId);
    }
    return sessionId;
}

// Database helper functions
const GyaanamDB = {
    // Save chat message (supports both user-specific and session-based storage)
    async saveChatMessage(identifier, message, isUser = false, topic = null) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            
            if (isUserLoggedIn) {
                // Save to user-specific collection
                await db.collection('users').doc(user.uid).collection('chat_history').add({
                    message: message,
                    isUser: isUser,
                    topic: topic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                // Update user metadata
                await db.collection('users').doc(user.uid).update({
                    lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
                    currentTopic: topic || null,
                    messageCount: firebase.firestore.FieldValue.increment(1)
                });
            } else {
                // Fallback to session-based storage for anonymous users
                await db.collection('chat_sessions').doc(identifier).collection('messages').add({
                    message: message,
                    isUser: isUser,
                    topic: topic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                await db.collection('chat_sessions').doc(identifier).set({
                    lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
                    currentTopic: topic || null,
                    messageCount: firebase.firestore.FieldValue.increment(1)
                }, { merge: true });
            }
        } catch (error) {
            console.error('Error saving chat message:', error);
        }
    },

    // Load chat history (user-specific or session-based)
    async loadChatHistory(identifier, limit = 50) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            let snapshot;
            
            if (isUserLoggedIn) {
                // Load from user-specific collection
                snapshot = await db.collection('users')
                    .doc(user.uid)
                    .collection('chat_history')
                    .orderBy('timestamp', 'asc')
                    .limit(limit)
                    .get();
            } else {
                // Fallback to session-based storage
                snapshot = await db.collection('chat_sessions')
                    .doc(identifier)
                    .collection('messages')
                    .orderBy('timestamp', 'asc')
                    .limit(limit)
                    .get();
            }
            
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return messages;
        } catch (error) {
            console.error('Error loading chat history:', error);
            return [];
        }
    },

    // Save quiz result to "results" collection (user-specific or session-based)
    async saveQuizResult(identifier, topic, difficulty, score, totalQuestions, questions, answers) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            
            const quizData = {
                topic: topic,
                difficulty: difficulty,
                score: score,
                totalQuestions: totalQuestions,
                percentage: Math.round((score / totalQuestions) * 100),
                questions: questions,
                answers: answers,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            if (isUserLoggedIn) {
                quizData.userId = user.uid;
                // Save to the "results" collection as requested
                await db.collection('results').add(quizData);
                await this.updateUserProgress(user.uid, topic, difficulty, score, totalQuestions);
                console.log('Quiz result saved to Firebase results collection for user:', user.uid);
            } else {
                quizData.sessionId = identifier;
                // Save to the "results" collection for session users too
                await db.collection('results').add(quizData);
                await this.updateUserProgress(identifier, topic, difficulty, score, totalQuestions);
                console.log('Quiz result saved to Firebase results collection for session:', identifier);
            }
            
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    },

    // Update user progress (user-specific or session-based)
    async updateUserProgress(identifier, topic, difficulty, score, totalQuestions) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            
            const percentage = Math.round((score / totalQuestions) * 100);
            const passed = percentage >= 70; // 70% to pass
            
            let progressData = {
                lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
                totalQuizzes: firebase.firestore.FieldValue.increment(1),
                totalScore: firebase.firestore.FieldValue.increment(score),
                totalQuestions: firebase.firestore.FieldValue.increment(totalQuestions)
            };
            
            let progressRef;
            if (isUserLoggedIn) {
                progressRef = db.collection('users').doc(user.uid);
                // Also update the separate user_progress collection for detailed tracking
                await db.collection('user_progress').add({
                    userId: user.uid,
                    activity: 'quiz_completed',
                    topic: topic,
                    difficulty: difficulty,
                    score: score,
                    totalQuestions: totalQuestions,
                    percentage: percentage,
                    passed: passed,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } else {
                progressRef = db.collection('user_progress').doc(identifier);
            }

            const doc = await progressRef.get();
            
            // Track topics learned
            if (doc.exists) {
                const data = doc.data();
                const topicsLearned = data.topicsLearned || [];
                if (!topicsLearned.includes(topic)) {
                    progressData.topicsLearned = firebase.firestore.FieldValue.arrayUnion(topic);
                }
                
                // Track difficulty levels
                progressData[`difficultyStats.${difficulty}`] = firebase.firestore.FieldValue.increment(1);
                
                if (passed) {
                    progressData[`difficultyStats.${difficulty}_passed`] = firebase.firestore.FieldValue.increment(1);
                }
            } else {
                progressData.topicsLearned = [topic];
                progressData.difficultyStats = {
                    [difficulty]: 1,
                    [`${difficulty}_passed`]: passed ? 1 : 0
                };
            }

            await progressRef.set(progressData, { merge: true });
            
        } catch (error) {
            console.error('Error updating user progress:', error);
        }
    },

    // Get user progress (user-specific or session-based)
    async getUserProgress(identifier) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            let doc;
            
            if (isUserLoggedIn) {
                doc = await db.collection('users').doc(user.uid).get();
            } else {
                doc = await db.collection('user_progress').doc(identifier).get();
            }
            
            if (doc.exists) {
                return doc.data();
            }
            return null;
        } catch (error) {
            console.error('Error getting user progress:', error);
            return null;
        }
    },

    // Get detailed user progress history (for logged-in users)
    async getUserProgressHistory(limit = 20) {
        try {
            const user = auth.currentUser;
            if (!user) return [];
            
            const snapshot = await db.collection('user_progress')
                .where('userId', '==', user.uid)
                .orderBy('timestamp', 'desc')
                .limit(limit)
                .get();
            
            const progress = [];
            snapshot.forEach(doc => {
                progress.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return progress;
        } catch (error) {
            console.error('Error getting user progress history:', error);
            return [];
        }
    },

    // Get user's quiz results from "results" collection (limit to last 3 as requested)
    async getUserQuizResults(identifier, limit = 3) {
        try {
            const user = auth.currentUser;
            let snapshot;
            
            if (user) {
                // Get results for logged-in user from "results" collection
                snapshot = await db.collection('results')
                    .where('userId', '==', user.uid)
                    .orderBy('timestamp', 'desc')
                    .limit(limit)
                    .get();
                console.log('Fetching quiz results for user:', user.uid);
            } else {
                // Get results for session-based user from "results" collection
                snapshot = await db.collection('results')
                    .where('sessionId', '==', identifier)
                    .orderBy('timestamp', 'desc')
                    .limit(limit)
                    .get();
                console.log('Fetching quiz results for session:', identifier);
            }
            
            const results = [];
            snapshot.forEach(doc => {
                results.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            console.log(`Found ${results.length} quiz results`);
            return results;
        } catch (error) {
            console.error('Error getting user quiz results:', error);
            return [];
        }
    },

    // Save generated notes (user-specific or session-based)
    async saveNotes(identifier, topic, notes) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            
            const notesData = {
                topic: topic,
                notes: notes,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            console.log('💾 Saving notes to Firebase:', { topic, isUserLoggedIn });
            
            if (isUserLoggedIn) {
                notesData.userId = user.uid;
                const docRef = await db.collection('generated_notes').add(notesData);
                console.log('✅ Notes saved for user:', user.uid, 'with doc ID:', docRef.id);
            } else {
                notesData.sessionId = identifier;
                const docRef = await db.collection('generated_notes').add(notesData);
                console.log('✅ Notes saved for session:', identifier, 'with doc ID:', docRef.id);
            }
        } catch (error) {
            console.error('❌ Error saving notes:', error);
            throw error; // Re-throw to handle in calling function
        }
    },

    // Get notes for a topic (user-specific or session-based)
    async getNotes(identifier, topic) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            let query;
            
            if (isUserLoggedIn) {
                query = db.collection('generated_notes')
                    .where('userId', '==', user.uid)
                    .where('topic', '==', topic);
            } else {
                query = db.collection('generated_notes')
                    .where('sessionId', '==', identifier)
                    .where('topic', '==', topic);
            }
            
            const snapshot = await query
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get();
            
            if (!snapshot.empty) {
                return snapshot.docs[0].data().notes;
            }
            return null;
        } catch (error) {
            console.error('Error getting notes:', error);
            return null;
        }
    },

    // Get all user's notes (supports both authenticated and session-based users)
    async getUserNotes(identifier, limit = 20) {
        try {
            const user = auth.currentUser;
            let snapshot;
            
            console.log('📚 Getting user notes with identifier:', identifier, 'user:', user?.uid);
            
            if (user) {
                // Get notes for authenticated user - try with timestamp ordering first
                try {
                    snapshot = await db.collection('generated_notes')
                        .where('userId', '==', user.uid)
                        .orderBy('timestamp', 'desc')
                        .limit(limit)
                        .get();
                    console.log('📚 Fetching notes for authenticated user with timestamp:', user.uid, 'found:', snapshot.size, 'notes');
                } catch (indexError) {
                    console.warn('⚠️ Timestamp index not available, fetching without ordering:', indexError.message);
                    // Fallback: get notes without ordering if index doesn't exist
                    snapshot = await db.collection('generated_notes')
                        .where('userId', '==', user.uid)
                        .limit(limit)
                        .get();
                    console.log('📚 Fetching notes for authenticated user without ordering:', user.uid, 'found:', snapshot.size, 'notes');
                }
            } else if (identifier) {
                // Get notes for session-based user - try with timestamp ordering first
                try {
                    snapshot = await db.collection('generated_notes')
                        .where('sessionId', '==', identifier)
                        .orderBy('timestamp', 'desc')
                        .limit(limit)
                        .get();
                    console.log('📚 Fetching notes for session user with timestamp:', identifier, 'found:', snapshot.size, 'notes');
                } catch (indexError) {
                    console.warn('⚠️ Timestamp index not available, fetching without ordering:', indexError.message);
                    // Fallback: get notes without ordering if index doesn't exist
                    snapshot = await db.collection('generated_notes')
                        .where('sessionId', '==', identifier)
                        .limit(limit)
                        .get();
                    console.log('📚 Fetching notes for session user without ordering:', identifier, 'found:', snapshot.size, 'notes');
                }
            } else {
                console.log('❌ No user or session identifier provided');
                return [];
            }
            
            const notes = [];
            snapshot.forEach(doc => {
                const noteData = { id: doc.id, ...doc.data() };
                console.log('📝 Found note:', noteData.topic, 'ID:', doc.id, 'timestamp:', noteData.timestamp);
                notes.push(noteData);
            });
            
            // If we got notes without timestamp ordering, sort them manually by timestamp
            if (notes.length > 0 && notes[0].timestamp) {
                notes.sort((a, b) => {
                    if (!a.timestamp) return 1;
                    if (!b.timestamp) return -1;
                    return b.timestamp.toDate() - a.timestamp.toDate();
                });
                console.log('📚 Manually sorted notes by timestamp');
            }
            
            console.log(`✅ Found ${notes.length} total notes`);
            return notes;
        } catch (error) {
            console.error('Error getting user notes:', error);
            return [];
        }
    },

    // Delete a note by ID
    async deleteNote(noteId) {
        try {
            console.log('🗑️ Deleting note with ID:', noteId);
            await db.collection('generated_notes').doc(noteId).delete();
            console.log('✅ Note deleted successfully:', noteId);
            return { success: true };
        } catch (error) {
            console.error('❌ Error deleting note:', error);
            return { success: false, error: error.message };
        }
    },

    // Clear all chat history for user or session
    async clearChatHistory(identifier) {
        try {
            const user = auth.currentUser;
            const isUserLoggedIn = user !== null;
            
            console.log('🗑️ Clearing chat history for:', isUserLoggedIn ? `user ${user.uid}` : `session ${identifier}`);
            
            if (isUserLoggedIn) {
                // Clear user-specific chat history
                const chatCollection = db.collection('users').doc(user.uid).collection('chat_history');
                const snapshot = await chatCollection.get();
                
                // Delete all chat messages in batches
                const batch = db.batch();
                snapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                });
                
                if (snapshot.docs.length > 0) {
                    await batch.commit();
                    console.log(`✅ Deleted ${snapshot.docs.length} chat messages for user`);
                }
            } else {
                // Clear session-based chat history
                const chatCollection = db.collection('chat_sessions').doc(identifier).collection('messages');
                const snapshot = await chatCollection.get();
                
                // Delete all chat messages in batches
                const batch = db.batch();
                snapshot.docs.forEach(doc => {
                    batch.delete(doc.ref);
                });
                
                if (snapshot.docs.length > 0) {
                    await batch.commit();
                    console.log(`✅ Deleted ${snapshot.docs.length} chat messages for session`);
                }
            }
            
            return { success: true };
        } catch (error) {
            console.error('❌ Error clearing chat history:', error);
            return { success: false, error: error.message };
        }
    }
};

// Authentication functions
const GyaanamAuth = {
    // Sign up with email and password
    async signUp(email, password, displayName) {
        console.log('GyaanamAuth.signUp called with:', { email, displayName }); // Debug log
        
        try {
            console.log('Creating user with Firebase Auth...'); // Debug log
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            console.log('User created successfully:', user.uid); // Debug log
            
            // Update user profile
            await user.updateProfile({
                displayName: displayName
            });
            
            console.log('User profile updated'); // Debug log
            
            // Try to save user data to Firestore (optional - won't block if it fails)
            try {
                await db.collection('users').doc(user.uid).set({
                    email: user.email,
                    displayName: displayName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    totalQuizzes: 0,
                    totalScore: 0,
                    topicsLearned: []
                });
                console.log('User data saved to Firestore'); // Debug log
            } catch (firestoreError) {
                console.log('Note: Firestore not configured, continuing without it');
            }
            console.log('User signed up successfully:', user.uid);
            return { success: true, user: user };
        } catch (error) {
            console.error('Sign up error details:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            
            // Provide user-friendly error messages
            let userMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                userMessage = 'This email is already registered. Please try logging in instead.';
            } else if (error.code === 'auth/weak-password') {
                userMessage = 'Password is too weak. Please choose a stronger password.';
            } else if (error.code === 'auth/invalid-email') {
                userMessage = 'Please enter a valid email address.';
            }
            
            return { success: false, error: userMessage };
        }
    },

    // Sign in with email and password
    async signIn(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Try to update last login (optional - won't block if it fails)
            try {
                await db.collection('users').doc(user.uid).update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (firestoreError) {
                console.log('Note: Firestore not configured, continuing without it');
            }
            
            console.log('User signed in successfully:', user.uid);
            return { success: true, user: user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const user = result.user;
            
            // Try to save/update user data (optional - won't block if it fails)
            try {
                const userDoc = await db.collection('users').doc(user.uid).get();
                
                if (!userDoc.exists) {
                    // New user - create profile
                    await db.collection('users').doc(user.uid).set({
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                        totalQuizzes: 0,
                        totalScore: 0,
                        topicsLearned: []
                    });
                } else {
                    // Existing user - update last login
                    await db.collection('users').doc(user.uid).update({
                        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
            } catch (firestoreError) {
                console.log('Note: Firestore not configured, continuing without it');
            }
            
            console.log('Google sign in successful:', user.uid);
            return { success: true, user: user };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out
    async signOut() {
        try {
            await auth.signOut();
            console.log('User signed out successfully');
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    getCurrentUser() {
        return auth.currentUser;
    },

    // Listen for auth state changes
    onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(callback);
    }
};

console.log('🔥 Firebase initialized successfully!');