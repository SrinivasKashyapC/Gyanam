// Gnyaan Backend Server - Node.js + Express + MongoDB
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Configuration from environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'practice_database';
const COLLECTION_NAME = 'gnyaan_notes';
const QUIZ_RESULTS_COLLECTION = 'gnyaan_quiz_results';
const GURU_CONVERSATIONS_COLLECTION = 'gnyaan_guru_conversations';

let db;
let notesCollection;
let quizResultsCollection;
let guruConversationsCollection;

// Middleware - Order matters!
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies

// Important: Define API routes BEFORE static file serving
// This ensures API calls aren't caught by static file middleware

// Connect to MongoDB
async function connectToDatabase() {
    try {
        // Remove deprecated options - they're not needed in MongoDB driver 4.0+
        const client = await MongoClient.connect(MONGODB_URI);
        
        console.log('✅ Connected to MongoDB Atlas successfully!');
        db = client.db(DB_NAME);
        notesCollection = db.collection(COLLECTION_NAME);
        quizResultsCollection = db.collection(QUIZ_RESULTS_COLLECTION);
        guruConversationsCollection = db.collection(GURU_CONVERSATIONS_COLLECTION);
        
        // Create indexes for better performance
        await notesCollection.createIndex({ username: 1, timestamp: -1 });
        await notesCollection.createIndex({ username: 1, title: 1 });
        
        // Create indexes for quiz results
        await quizResultsCollection.createIndex({ username: 1, timestamp: -1 });
        await quizResultsCollection.createIndex({ username: 1, subject: 1 });
        
        // Create indexes for guru conversations
        await guruConversationsCollection.createIndex({ username: 1, timestamp: -1 });
        await guruConversationsCollection.createIndex({ username: 1, sessionId: 1 });
        
        console.log('✅ Database indexes created');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Gnyaan backend server is running!',
        database: db ? 'connected' : 'disconnected'
    });
});

// Test endpoint for guru API
app.get('/api/guru/test', (req, res) => {
    res.json({
        success: true,
        message: 'Guru API is working!',
        collection: guruConversationsCollection ? 'initialized' : 'not initialized'
    });
});

// AI API Proxy Endpoints - Keep keys secure on server
app.post('/api/ai/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/ai/groq', async (req, res) => {
    try {
        const { prompt, model = 'llama-3.3-70b-versatile' } = req.body;
        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 4000
            })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save notes
app.post('/api/notes/save', async (req, res) => {
    try {
        const { username, title, content } = req.body;
        
        if (!username || !title || !content) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: username, title, content' 
            });
        }
        
        const note = {
            username: username,
            title: title,
            content: content,
            timestamp: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        
        const result = await notesCollection.insertOne(note);
        
        console.log(`✅ Note saved for user: ${username}, title: ${title}`);
        
        res.json({ 
            success: true, 
            id: result.insertedId.toString(),
            message: 'Note saved successfully'
        });
    } catch (error) {
        console.error('❌ Error saving note:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get all notes for a user
app.get('/api/notes/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const limit = parseInt(req.query.limit) || 50;
        
        if (!username) {
            return res.status(400).json({ 
                success: false, 
                error: 'Username is required' 
            });
        }
        
        const notes = await notesCollection
            .find({ username: username })
            .sort({ timestamp: -1 })
            .limit(limit)
            .toArray();
        
        // Convert MongoDB _id to string id for frontend
        const formattedNotes = notes.map(note => ({
            id: note._id.toString(),
            username: note.username,
            title: note.title,
            content: note.content,
            timestamp: note.timestamp,
            lastModified: note.lastModified
        }));
        
        console.log(`✅ Retrieved ${notes.length} notes for user: ${username}`);
        
        res.json({ 
            success: true, 
            notes: formattedNotes,
            count: formattedNotes.length
        });
    } catch (error) {
        console.error('❌ Error fetching notes:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get a single note by ID
app.get('/api/notes/:username/:noteId', async (req, res) => {
    try {
        const { username, noteId } = req.params;
        
        const note = await notesCollection.findOne({ 
            _id: new ObjectId(noteId),
            username: username
        });
        
        if (!note) {
            return res.status(404).json({ 
                success: false, 
                error: 'Note not found' 
            });
        }
        
        res.json({ 
            success: true, 
            note: {
                id: note._id.toString(),
                username: note.username,
                title: note.title,
                content: note.content,
                timestamp: note.timestamp,
                lastModified: note.lastModified
            }
        });
    } catch (error) {
        console.error('❌ Error fetching note:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Delete a note
app.delete('/api/notes/:username/:noteId', async (req, res) => {
    try {
        const { username, noteId } = req.params;
        
        const result = await notesCollection.deleteOne({ 
            _id: new ObjectId(noteId),
            username: username
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Note not found or already deleted' 
            });
        }
        
        console.log(`✅ Note deleted: ${noteId} for user: ${username}`);
        
        res.json({ 
            success: true, 
            message: 'Note deleted successfully' 
        });
    } catch (error) {
        console.error('❌ Error deleting note:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Update a note
app.put('/api/notes/:username/:noteId', async (req, res) => {
    try {
        const { username, noteId } = req.params;
        const { title, content } = req.body;
        
        const updateData = {
            lastModified: new Date().toISOString()
        };
        
        if (title) updateData.title = title;
        if (content) updateData.content = content;
        
        const result = await notesCollection.updateOne(
            { _id: new ObjectId(noteId), username: username },
            { $set: updateData }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Note not found' 
            });
        }
        
        console.log(`✅ Note updated: ${noteId} for user: ${username}`);
        
        res.json({ 
            success: true, 
            message: 'Note updated successfully' 
        });
    } catch (error) {
        console.error('❌ Error updating note:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Clear all notes for a user (optional - for testing)
app.delete('/api/notes/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        const result = await notesCollection.deleteMany({ username: username });
        
        console.log(`✅ Cleared ${result.deletedCount} notes for user: ${username}`);
        
        res.json({ 
            success: true, 
            message: `Deleted ${result.deletedCount} notes`,
            count: result.deletedCount
        });
    } catch (error) {
        console.error('❌ Error clearing notes:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// ==================== QUIZ RESULTS ENDPOINTS ====================

// Save quiz results
app.post('/api/quiz-results/save', async (req, res) => {
    try {
        const { username, subject, difficulty, score, totalQuestions, questions, answers, percentage, grade } = req.body;
        
        if (!username || !subject || score === undefined || !totalQuestions) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: username, subject, score, totalQuestions' 
            });
        }
        
        const quizResult = {
            username: username,
            subject: subject,
            difficulty: difficulty || 'medium',
            score: score,
            totalQuestions: totalQuestions,
            percentage: percentage || ((score / totalQuestions) * 100),
            grade: grade || 'N/A',
            questions: questions || [],
            answers: answers || [],
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };
        
        const result = await quizResultsCollection.insertOne(quizResult);
        
        console.log(`✅ Quiz result saved for user: ${username}, subject: ${subject}, score: ${score}/${totalQuestions}`);
        
        res.json({ 
            success: true, 
            id: result.insertedId.toString(),
            message: 'Quiz result saved successfully'
        });
    } catch (error) {
        console.error('❌ Error saving quiz result:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get all quiz results for a user
app.get('/api/quiz-results/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const limit = parseInt(req.query.limit) || 50;
        const subject = req.query.subject; // Optional filter by subject
        
        if (!username) {
            return res.status(400).json({ 
                success: false, 
                error: 'Username is required' 
            });
        }
        
        const query = { username: username };
        if (subject) {
            query.subject = subject;
        }
        
        const results = await quizResultsCollection
            .find(query)
            .sort({ timestamp: -1 })
            .limit(limit)
            .toArray();
        
        // Convert MongoDB _id to string id for frontend
        const formattedResults = results.map(result => ({
            id: result._id.toString(),
            username: result.username,
            subject: result.subject,
            difficulty: result.difficulty,
            score: result.score,
            totalQuestions: result.totalQuestions,
            percentage: result.percentage,
            grade: result.grade,
            timestamp: result.timestamp,
            date: result.date,
            questions: result.questions,
            answers: result.answers
        }));
        
        console.log(`✅ Retrieved ${results.length} quiz results for user: ${username}`);
        
        res.json({ 
            success: true, 
            results: formattedResults,
            count: formattedResults.length
        });
    } catch (error) {
        console.error('❌ Error fetching quiz results:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get quiz statistics for a user
app.get('/api/quiz-results/:username/stats', async (req, res) => {
    try {
        const { username } = req.params;
        
        if (!username) {
            return res.status(400).json({ 
                success: false, 
                error: 'Username is required' 
            });
        }
        
        const results = await quizResultsCollection
            .find({ username: username })
            .toArray();
        
        if (results.length === 0) {
            return res.json({ 
                success: true, 
                stats: {
                    totalQuizzes: 0,
                    averageScore: 0,
                    highestScore: 0,
                    lowestScore: 0,
                    totalQuestions: 0,
                    correctAnswers: 0,
                    subjects: []
                }
            });
        }
        
        // Calculate statistics
        const totalQuizzes = results.length;
        const totalCorrect = results.reduce((sum, r) => sum + r.score, 0);
        const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
        const averageScore = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
        const percentages = results.map(r => r.percentage || ((r.score / r.totalQuestions) * 100));
        const highestScore = Math.max(...percentages).toFixed(1);
        const lowestScore = Math.min(...percentages).toFixed(1);
        
        // Get unique subjects with their counts
        const subjectMap = {};
        results.forEach(r => {
            if (!subjectMap[r.subject]) {
                subjectMap[r.subject] = { subject: r.subject, count: 0, totalScore: 0, totalQuestions: 0 };
            }
            subjectMap[r.subject].count++;
            subjectMap[r.subject].totalScore += r.score;
            subjectMap[r.subject].totalQuestions += r.totalQuestions;
        });
        
        const subjects = Object.values(subjectMap).map(s => ({
            subject: s.subject,
            quizzesTaken: s.count,
            averageScore: ((s.totalScore / s.totalQuestions) * 100).toFixed(1)
        }));
        
        console.log(`✅ Retrieved quiz statistics for user: ${username}`);
        
        res.json({ 
            success: true, 
            stats: {
                totalQuizzes,
                averageScore: parseFloat(averageScore),
                highestScore: parseFloat(highestScore),
                lowestScore: parseFloat(lowestScore),
                totalQuestions,
                correctAnswers: totalCorrect,
                subjects
            }
        });
    } catch (error) {
        console.error('❌ Error fetching quiz statistics:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Clear all quiz results for a user
app.delete('/api/quiz-results/:username/clear-all', async (req, res) => {
    try {
        const { username } = req.params;
        
        const result = await quizResultsCollection.deleteMany({ username: username });
        
        console.log(`✅ Cleared ${result.deletedCount} quiz results for user: ${username}`);
        
        res.json({ 
            success: true, 
            message: `Deleted ${result.deletedCount} quiz results`,
            count: result.deletedCount
        });
    } catch (error) {
        console.error('❌ Error clearing quiz results:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Save guru conversation message
app.post('/api/guru/save-message', async (req, res) => {
    try {
        const { username, sessionId, role, content } = req.body;
        
        if (!username || !sessionId || !role || !content) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: username, sessionId, role, content' 
            });
        }
        
        const message = {
            username: username,
            sessionId: sessionId,
            role: role, // 'user' or 'assistant'
            content: content,
            timestamp: new Date().toISOString()
        };
        
        const result = await guruConversationsCollection.insertOne(message);
        
        console.log(`✅ Guru message saved for user: ${username}`);
        
        res.json({ 
            success: true, 
            id: result.insertedId.toString(),
            message: 'Conversation message saved successfully'
        });
    } catch (error) {
        console.error('❌ Error saving guru message:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get guru conversation history
app.get('/api/guru/history/:username/:sessionId', async (req, res) => {
    try {
        const { username, sessionId } = req.params;
        const limit = parseInt(req.query.limit) || 20; // Last 20 messages by default
        
        const messages = await guruConversationsCollection
            .find({ username: username, sessionId: sessionId })
            .sort({ timestamp: 1 })
            .limit(limit)
            .toArray();
        
        console.log(`✅ Retrieved ${messages.length} guru messages for user: ${username}`);
        
        res.json({ 
            success: true, 
            messages: messages,
            count: messages.length
        });
    } catch (error) {
        console.error('❌ Error retrieving guru history:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Get all chat sessions for a user
app.get('/api/guru/sessions/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Get distinct session IDs with first message from each
        const sessions = await guruConversationsCollection.aggregate([
            { $match: { username: username } },
            { $sort: { timestamp: 1 } },
            { $group: {
                _id: '$sessionId',
                firstMessage: { $first: '$content' },
                lastTimestamp: { $last: '$timestamp' },
                messageCount: { $sum: 1 }
            }},
            { $sort: { lastTimestamp: -1 } }
        ]).toArray();
        
        console.log(`✅ Retrieved ${sessions.length} chat sessions for user: ${username}`);
        
        res.json({ 
            success: true, 
            sessions: sessions.map(s => ({
                sessionId: s._id,
                preview: s.firstMessage.substring(0, 100),
                lastUpdated: s.lastTimestamp,
                messageCount: s.messageCount
            }))
        });
    } catch (error) {
        console.error('❌ Error retrieving chat sessions:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Clear guru conversation history
app.delete('/api/guru/clear/:username/:sessionId', async (req, res) => {
    try {
        const { username, sessionId } = req.params;
        
        const result = await guruConversationsCollection.deleteMany({ 
            username: username,
            sessionId: sessionId
        });
        
        console.log(`✅ Cleared ${result.deletedCount} guru messages for user: ${username}`);
        
        res.json({ 
            success: true, 
            deletedCount: result.deletedCount,
            message: 'Conversation history cleared successfully' 
        });
    } catch (error) {
        console.error('❌ Error clearing guru history:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Delete a quiz result
app.delete('/api/quiz-results/:username/:resultId', async (req, res) => {
    try {
        const { username, resultId } = req.params;
        
        const result = await quizResultsCollection.deleteOne({ 
            _id: new ObjectId(resultId),
            username: username
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Quiz result not found or already deleted' 
            });
        }
        
        console.log(`✅ Quiz result deleted: ${resultId} for user: ${username}`);
        
        res.json({ 
            success: true, 
            message: 'Quiz result deleted successfully' 
        });
    } catch (error) {
        console.error('❌ Error deleting quiz result:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Root route - redirect to intro.html (BEFORE static files)
app.get('/', (req, res) => {
    res.redirect('/intro.html');
});

// Serve static files AFTER all API routes and root redirect
app.use(express.static('.'));

// Start server
async function startServer() {
    await connectToDatabase();
    
    app.listen(PORT, () => {
        console.log(`🚀 Gnyaan server running on http://localhost:${PORT}`);
        console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
        console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
        console.log(`💬 Guru API: http://localhost:${PORT}/api/guru/`);
    });
}

startServer().catch(console.error);
