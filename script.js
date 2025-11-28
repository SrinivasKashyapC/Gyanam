// ===== GLOBAL VARIABLES AND COURSE LOADING =====
let allSubjects = []; // Will be populated based on course selection

// Function to load selected course - DEFINED GLOBALLY
function loadSelectedCourse() {
    const selectedCourse = sessionStorage.getItem('selectedCourse');
    const isCustomCourse = sessionStorage.getItem('customCourse');
    
    // Get defaultSubjects
    const defaultSubjects = getDefaultSubjects();
    
    if (selectedCourse) {
        const courseData = JSON.parse(selectedCourse);
        console.log('📚 Loading course:', courseData.name);
        
        // Convert course subjects to the format expected by the app
        allSubjects = courseData.subjects.map((subjectName, index) => {
            const existingSubject = defaultSubjects.find(s => s.name === subjectName);
            return {
                name: subjectName,
                icon: existingSubject ? existingSubject.icon : getCourseIcon(index)
            };
        });
        
        console.log(`✅ Loaded ${allSubjects.length} subjects from course`);
        console.log('Subjects:', allSubjects.map(s => s.name).join(', '));
    } else if (isCustomCourse === 'true') {
        console.log('✨ Custom course mode - using all subjects');
        allSubjects = defaultSubjects;
    } else {
        console.log('No course selected - using all subjects');
        allSubjects = defaultSubjects;
    }
}

// Get course icon helper
function getCourseIcon(index) {
    const icons = ['📖', '📝', '💡', '🎯', '🔬', '🧪', '⚡', '🚀', '🌟', '💎', '🔥', '⭐', '✨', '🎓', '🏆'];
    return icons[index % icons.length];
}

// Function to get default subjects list
function getDefaultSubjects() {
    return [
        // Programming Languages
        { name: 'Python', icon: '🐍' },
        { name: 'JavaScript', icon: '📜' },
        { name: 'Java', icon: '☕' },
        { name: 'C++', icon: '⚙️' },
        { name: 'C Programming', icon: '💻' },
        { name: 'C#', icon: '🎮' },
        { name: 'Ruby', icon: '💎' },
        { name: 'PHP', icon: '🐘' },
        { name: 'Swift', icon: '🍎' },
        { name: 'Kotlin', icon: '🤖' },
        { name: 'Go', icon: '🔵' },
        { name: 'Rust', icon: '🦀' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'R Programming', icon: '📊' },
        { name: 'MATLAB', icon: '🔬' },
        
        // Web Development
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'React', icon: '⚛️' },
        { name: 'Angular', icon: '🅰️' },
        { name: 'Vue.js', icon: '💚' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Django', icon: '🎸' },
        { name: 'Flask', icon: '🧪' },
        { name: 'Bootstrap', icon: '🅱️' },
        { name: 'Tailwind CSS', icon: '💨' },
        { name: 'Next.js', icon: '▲' },
        { name: 'Express.js', icon: '🚂' },
        
        // Data Science & AI
        { name: 'Machine Learning', icon: '🤖' },
        { name: 'Deep Learning', icon: '🧠' },
        { name: 'Data Science', icon: '📊' },
        { name: 'Artificial Intelligence', icon: '🤖' },
        { name: 'Neural Networks', icon: '🕸️' },
        { name: 'Natural Language Processing', icon: '💬' },
        { name: 'Computer Vision', icon: '👁️' },
        { name: 'TensorFlow', icon: '🔮' },
        { name: 'PyTorch', icon: '🔥' },
        { name: 'Scikit-learn', icon: '📚' },
        { name: 'Keras', icon: '🔥' },
        { name: 'NumPy', icon: '🔢' },
        { name: 'Pandas', icon: '🐼' },
        { name: 'Matplotlib', icon: '📈' },
        { name: 'Seaborn', icon: '📊' },
        
        // Data Structures & Algorithms
        { name: 'Data Structures', icon: '📦' },
        { name: 'Algorithms', icon: '🔍' },
        { name: 'Sorting', icon: '🔢' },
        { name: 'Searching', icon: '🔍' },
        { name: 'Arrays', icon: '📊' },
        { name: 'Linked Lists', icon: '🔗' },
        { name: 'Stacks', icon: '📚' },
        { name: 'Queues', icon: '📋' },
        { name: 'Trees', icon: '🌳' },
        { name: 'Graphs', icon: '🕸️' },
        { name: 'Hashing', icon: '#️⃣' },
        { name: 'Dynamic Programming', icon: '💡' },
        { name: 'Greedy Algorithms', icon: '🎯' },
        { name: 'Recursion', icon: '🔄' },
        { name: 'Big O Notation', icon: '📐' },
        
        // Databases
        { name: 'SQL', icon: '🗄️' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Redis', icon: '🔴' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'Oracle', icon: '🔶' },
        { name: 'SQLite', icon: '💾' },
        
        // Cloud & DevOps
        { name: 'AWS', icon: '☁️' },
        { name: 'Azure', icon: '🔷' },
        { name: 'Google Cloud', icon: '🌩️' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Kubernetes', icon: '☸️' },
        { name: 'Jenkins', icon: '🔧' },
        { name: 'Git', icon: '📌' },
        { name: 'CI/CD', icon: '🔄' },
        { name: 'DevOps', icon: '♾️' },
        { name: 'Linux', icon: '🐧' },
        { name: 'Terraform', icon: '🏗️' },
        { name: 'Ansible', icon: '🤖' },
        
        // Security
        { name: 'Cybersecurity', icon: '🔐' },
        { name: 'Ethical Hacking', icon: '👨‍💻' },
        { name: 'Network Security', icon: '🔒' },
        { name: 'Cryptography', icon: '🔑' },
        { name: 'Penetration Testing', icon: '🎯' },
        { name: 'OWASP', icon: '🛡️' },
        { name: 'Kali Linux', icon: '🐉' },
        
        // Mobile Development
        { name: 'Android', icon: '🤖' },
        { name: 'iOS', icon: '🍎' },
        { name: 'React Native', icon: '📱' },
        { name: 'Flutter', icon: '🦋' },
        { name: 'Expo', icon: '📱' },
        
        // APIs & Integration
        { name: 'REST APIs', icon: '🔌' },
        { name: 'RESTful APIs', icon: '🔌' },
        { name: 'GraphQL', icon: '📊' },
        { name: 'OAuth', icon: '🔐' },
        { name: 'JWT', icon: '🎫' },
        
        // Additional Technologies
        { name: 'Redux', icon: '🔄' },
        { name: 'Microservices', icon: '🔷' },
        { name: 'Serverless', icon: '⚡' },
        { name: 'Load Balancing', icon: '⚖️' },
        { name: 'Networking', icon: '🌐' },
        { name: 'VPN', icon: '🔒' },
        { name: 'Firewalls', icon: '🧱' },
        { name: 'XSS', icon: '⚠️' },
        { name: 'SQL Injection', icon: '💉' },
        { name: 'Push Notifications', icon: '🔔' },
        { name: 'Mobile UI/UX', icon: '🎨' },
        { name: 'Heroku', icon: '🟣' },
        { name: 'Netlify', icon: '🌐' },
        { name: 'Reinforcement Learning', icon: '🎮' },
        { name: 'Generative AI', icon: '✨' },
        { name: 'Statistics', icon: '📊' },
        { name: 'Linear Algebra', icon: '📐' },
        { name: 'Probability', icon: '🎲' },
        { name: 'XGBoost', icon: '🚀' },
        { name: 'Random Forest', icon: '🌲' },
        { name: 'Object-Oriented Programming', icon: '🎯' },
        { name: 'File Handling', icon: '📁' },
        { name: 'Regular Expressions', icon: '🔤' },
        { name: 'FastAPI', icon: '⚡' },
        { name: 'SQLAlchemy', icon: '🔮' },
        { name: 'BeautifulSoup', icon: '🍜' },
        { name: 'Selenium', icon: '🕷️' },
        { name: 'PyTest', icon: '🧪' },
        { name: 'CloudFormation', icon: '☁️' },
        { name: 'Malware Analysis', icon: '🦠' },
        { name: 'Incident Response', icon: '🚨' },
        { name: 'Security Auditing', icon: '🔍' }
    ];
}

// Load course IMMEDIATELY on script load (before DOMContentLoaded)
console.log('🚀 Script loading, initializing course data...');
loadSelectedCourse();
console.log('✅ Course loaded. Total subjects:', allSubjects.length);

document.addEventListener('DOMContentLoaded', function() {
    // Check for user parameter in URL (from landing page)
    const urlParams = new URLSearchParams(window.location.search);
    const userFromURL = urlParams.get('user');
    
    // Reload course in case DOM needed
    loadSelectedCourse();
    
    // Verify Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        console.log('✅ Chart.js loaded successfully. Version:', Chart.version);
    } else {
        console.error('❌ Chart.js failed to load! Chart will not work.');
    }
    
    // Progress Zone - Auto-load on page load
    setTimeout(async () => {
        await loadProgressData();
    }, 2000); // Load after 2 seconds to avoid blocking initial page load
    
    // Clear Progress button event listener
    const clearProgressBtn = document.getElementById('clearProgressBtn');
    if (clearProgressBtn) {
        clearProgressBtn.addEventListener('click', clearAllProgress);
    }
    
    // Authentication state listener
    let currentUser = null;
    GyaanamAuth.onAuthStateChanged(async (user) => {
        currentUser = user;
        
        if (user) {
            console.log('User is signed in:', user.displayName || user.email);
            // Update UI to show user info
            updateUserUI(user);
            // Load user's chat history
            await loadPreviousChatHistory();
            // Auto-load user's notes in Pusthaka Zone
            setTimeout(loadUserNotes, 1000); // Load after a small delay
        } else {
            console.log('User is signed out, using session-based storage');
            // Initialize session for anonymous users
            const currentSessionId = getCurrentSessionId();
            console.log('Current session:', currentSessionId);
            // Load session-based chat history
            await loadPreviousChatHistory();
            // Auto-load session notes in Pusthaka Zone
            setTimeout(loadUserNotes, 1000); // Load after a small delay
        }
    });
    
    function updateUserUI(user) {
        // Add user info to the chat interface
        const userInfoDiv = document.getElementById('userInfo');
        if (userInfoDiv) {
            userInfoDiv.innerHTML = `
                <div class="user-greeting">
                    <span>Welcome back, ${user.displayName || 'Learner'}!</span>
                    <button onclick="showUserMenu()" class="user-menu-btn">
                        <i class="fas fa-user-circle"></i>
                    </button>
                </div>
            `;
        }
    }
    
    function getCurrentIdentifier() {
        const baseId = currentUser ? currentUser.uid : getCurrentSessionId();
        const selectedCourse = sessionStorage.getItem('selectedCourse');
        
        // Add course context to identifier for data isolation
        if (selectedCourse) {
            const courseData = JSON.parse(selectedCourse);
            const courseName = courseData.name.replace(/\s+/g, '_').toLowerCase();
            return `${baseId}_${courseName}`;
        }
        
        return baseId;
    }
    
    // API Configuration - Using centralized config
    const YOUTUBE_API_KEY = window.APP_CONFIG ? window.APP_CONFIG.YOUTUBE_API_KEY : 'AIzaSyALog2mrVl4Fd73or38hrspaXAQHtL9440';
    const API_BASE_URL = window.APP_CONFIG ? window.APP_CONFIG.apiBaseUrl : 'http://localhost:3000/api';
    
    // Secure backend endpoints - API keys stay on server
    const GEMINI_API_URL = `${API_BASE_URL}/ai/gemini`;
    const GROQ_API_URL = `${API_BASE_URL}/ai/groq`;
    const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

    // API Configuration
    const API_CONFIG = {
        primary: 'gemini',
        fallback: 'groq',
        current: 'gemini'
    };

    // Function to reset API configuration
    function resetAPIConfig() {
        API_CONFIG.current = API_CONFIG.primary;
        console.log('API configuration reset to primary:', API_CONFIG.current);
    }

    // Function to get current API status
    function getAPIStatus() {
        return {
            current: API_CONFIG.current,
            primary: API_CONFIG.primary,
            fallback: API_CONFIG.fallback,
            isUsingFallback: API_CONFIG.current !== API_CONFIG.primary
        };
    }

    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const clearChatButton = document.getElementById('clearChatButton');
    const chatBox = document.getElementById('chatBox');
    const videosContainer = document.getElementById('videosContainer');
    const notesContainer = document.getElementById('notesContainer');
    const notesActions = document.getElementById('notesActions');
    const quizContainer = document.getElementById('quizContainer');
    const startQuizButton = document.getElementById('startQuizButton');
    const progressButton = document.getElementById('progressButton');
    const progressModal = document.getElementById('progressModal');
    const closeProgressModal = document.getElementById('closeProgressModal');
    const progressZoneSection = document.getElementById('progressZoneSection');
    const closeProgressZone = document.getElementById('closeProgressZone');
    
    // Event Listeners (only add if elements exist - chat removed in favor of subject selector)
    if (sendButton && messageInput) {
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Clear Chat Event Listener
    if (clearChatButton) {
        clearChatButton.addEventListener('click', clearChatHistory);
    }
    
    // Progress Zone is now always visible at the bottom - no button needed
    
    // Check if Start Quiz button exists
    if (startQuizButton) {
        console.log('Start Quiz button found!');
    } else {
        console.error('Start Quiz button not found!');
    }

    // ===== SUBJECT SELECTOR SYSTEM =====
    
    let selectedSubject = null;
    
    // Display course title in the header
    function displayCourseTitle(courseName) {
        // Find or create a course title element
        const videoZone = document.querySelector('.video-zone-section');
        if (videoZone) {
            let courseTitleDiv = document.getElementById('courseTitleHeader');
            if (!courseTitleDiv) {
                courseTitleDiv = document.createElement('div');
                courseTitleDiv.id = 'courseTitleHeader';
                courseTitleDiv.style.cssText = `
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
                    padding: 20px 30px;
                    border-radius: 15px;
                    margin-bottom: 30px;
                    text-align: center;
                    border: 2px solid rgba(102, 126, 234, 0.3);
                `;
                videoZone.insertBefore(courseTitleDiv, videoZone.firstChild);
            }
            courseTitleDiv.innerHTML = `
                <h2 style="color: #667eea; font-size: 24px; margin: 0 0 10px 0; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fas fa-book-open"></i>
                    ${courseName}
                </h2>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">
                    Your personalized learning journey
                </p>
            `;
        }
    }
    
    // 100 Default Subjects with icons (used for custom courses) - REMOVED, NOW GLOBAL
        // Programming Languages (15)
    // Initialize subject selector
    function initializeSubjectSelector() {
        console.log('🎯 Initializing subject selector...');
        console.log('📊 Total subjects:', allSubjects.length);
        
        const subjectsGrid = document.getElementById('subjectsGrid');
        console.log('🔍 Subjects grid element found:', !!subjectsGrid);
        
        if (!subjectsGrid) {
            console.error('❌ Subjects grid not found!');
            return;
        }
        
        console.log('✅ Grid element is ready, rendering subjects...');
        // Populate all subjects
        renderSubjects(allSubjects);
    }
    
    function renderSubjects(subjectsToRender) {
        const subjectsGrid = document.getElementById('subjectsGrid');
        if (!subjectsGrid) {
            console.error('Cannot render subjects: grid element not found');
            return;
        }
        
        console.log('Rendering', subjectsToRender.length, 'subjects');
        
        subjectsGrid.innerHTML = '';
        
        subjectsToRender.forEach(subject => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            if (selectedSubject === subject.name) {
                card.classList.add('selected');
            }
            
            card.innerHTML = `
                <span class="subject-icon">${subject.icon}</span>
                <div class="subject-name">${subject.name}</div>
            `;
            
            card.addEventListener('click', () => selectSubject(subject.name));
            subjectsGrid.appendChild(card);
        });
        
        console.log('Subjects rendered successfully');
    }
    
    async function selectSubject(subjectName) {
        selectedSubject = subjectName;
        
        // Update UI
        renderSubjects(allSubjects);
        
        // Show selected banner
        const banner = document.getElementById('selectedSubjectBanner');
        const subjectNameSpan = document.getElementById('currentSubjectName');
        if (banner && subjectNameSpan) {
            subjectNameSpan.textContent = subjectName;
            banner.style.display = 'block';
        }
        
        // Auto-generate content
        const message = `Learn ${subjectName}`;
        
        // Show loading in all sections
        showSubjectLoadingStates(subjectName);
        
        try {
            // Generate notes
            await generateStudyNotes(subjectName);
            
            // Search for videos
            if (YOUTUBE_API_KEY !== 'YOUR_YOUTUBE_API_KEY_HERE') {
                const videos = await searchYouTubeVideos(subjectName);
                if (videos && videos.length > 0) {
                    displayVideosInContainer(videos, subjectName);
                } else {
                    displayVideoError(subjectName);
                }
            }
            
            // Show success message in a notification
            showNotification(`✅ ${subjectName} content loaded successfully!`);
        } catch (error) {
            console.error('Error loading subject:', error);
            showNotification(`❌ Error loading ${subjectName}. Please try again.`, 'error');
        }
    }
    
    function showSubjectLoadingStates(subjectName) {
        // Videos loading
        const videosContainer = document.getElementById('videosContainer');
        if (videosContainer) {
            videosContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                                border-top: 4px solid #feca57; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: #feca57; margin-top: 15px;">🔍 Loading ${subjectName} videos...</p>
                </div>`;
        }
        
        // Notes loading
        const notesContainer = document.getElementById('notesContainer');
        if (notesContainer) {
            notesContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                                border-top: 4px solid #48dbfb; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: #48dbfb; margin-top: 15px;">📚 Generating ${subjectName} study notes...</p>
                </div>`;
        }
    }
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(45deg, #10ac84, #1dd1a1)' : 'linear-gradient(45deg, #ff6b6b, #ee5a6f)'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 600;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    window.clearSelectedSubject = function() {
        selectedSubject = null;
        const banner = document.getElementById('selectedSubjectBanner');
        if (banner) {
            banner.style.display = 'none';
        }
        renderSubjects(allSubjects);
    }
    
    // Initialize subject selector IMMEDIATELY - try multiple times
    console.log('🎬 Script loaded, attempting immediate initialization...');
    
    // Load course FIRST, then initialize subjects
    loadSelectedCourse();
    initializeSubjectSelector();
    
    // Also try after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM Content Loaded, initializing...');
            loadSelectedCourse();
            initializeSubjectSelector();
        });
    }
    
    // And try after everything loads
    window.addEventListener('load', function() {
        console.log('🚀 Window fully loaded, initializing...');
        loadSelectedCourse();
        initializeSubjectSelector();
    });

    // Main function to send a message
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        addMessageToUI(message, true);
        messageInput.value = '';
        sendButton.disabled = true;
        showLoading();

        try {
            const searchForVideos = shouldSearchVideos(message);
            const generateNotes = shouldGenerateNotes(message);
            const enhancedMessage = enhancePromptForRoadmap(message);

            const aiResponse = await callAIAPI(enhancedMessage);
            removeLoading();
            addMessageToUI(aiResponse);

            if (generateNotes) {
                addMessageToUI('📚 Generating comprehensive study notes for you...');
                await generateStudyNotes(message);
            }

            if (searchForVideos) {
                if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
                    addMessageToUI('🎥 YouTube API key not configured. Cannot search for videos.');
                } else {
                    displayVideoLoading(message);
                    const videos = await searchYouTubeVideos(message);
                    if (videos && videos.length > 0) {
                        displayVideosInContainer(videos, message);
                        addMessageToUI(`🎬 Found ${videos.length} relevant videos (5+ minutes) ranked by YouTube's algorithm in the "YOUR VIDEOS" section below!`);
                    } else {
                        displayVideoError(message);
                        addMessageToUI('🎥 Sorry, no quality videos found after trying multiple search strategies.');
                    }
                }
            }
        } catch (error) {
            removeLoading();
            handleAPIError(error);
        } finally {
            sendButton.disabled = false;
            messageInput.focus();
        }
    }

    // --- UI HELPER FUNCTIONS ---

    function addMessageToUI(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        messageDiv.innerHTML = isUser ? message : formatAIResponse(message);
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // Note: Chat messages are not being saved to database anymore
        // Only Guru Zone conversations are saved with MongoDB
    }

    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading';
        loadingDiv.id = 'loadingMessage';
        loadingDiv.textContent = 'AI is contemplating';
        chatBox.appendChild(loadingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeLoading() {
        const loadingMessage = document.getElementById('loadingMessage');
        if (loadingMessage) loadingMessage.remove();
    }

    // Load previous chat history
    async function loadPreviousChatHistory() {
        try {
            const identifier = getCurrentIdentifier();
            const messages = await GyaanamDB.loadChatHistory(identifier);
            if (messages.length > 0) {
                // Clear existing messages except welcome message
                const welcomeMessage = chatBox.querySelector('.ai-message');
                chatBox.innerHTML = '';
                if (welcomeMessage) {
                    chatBox.appendChild(welcomeMessage);
                }
                
                // Add previous messages
                messages.forEach(msg => {
                    if (msg.message) {
                        const messageDiv = document.createElement('div');
                        messageDiv.className = `message ${msg.isUser ? 'user-message' : 'ai-message'}`;
                        messageDiv.innerHTML = msg.isUser ? msg.message : formatAIResponse(msg.message);
                        chatBox.appendChild(messageDiv);
                    }
                });
                
                chatBox.scrollTop = chatBox.scrollHeight;
                console.log(`Loaded ${messages.length} previous messages`);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    // Clear chat history function
    async function clearChatHistory() {
        // Show confirmation dialog
        const confirmed = confirm('Are you sure you want to clear all chat history?\n\nThis will permanently delete all your conversations and cannot be undone.');
        
        if (!confirmed) {
            return;
        }
        
        try {
            console.log('🗑️ Clearing chat history...');
            
            // Get current identifier
            const identifier = getCurrentIdentifier();
            
            // Clear from Firebase
            const result = await GyaanamDB.clearChatHistory(identifier);
            
            if (result.success) {
                // Clear local chat display (keep welcome message)
                const welcomeMessage = chatBox.querySelector('.ai-message');
                const welcomeText = welcomeMessage ? welcomeMessage.innerHTML : 'Welcome to GyaanamAI! I\'m your AI companion on the path of knowledge. Ask me anything you\'d like to learn! 🌸';
                
                chatBox.innerHTML = `<div class="message ai-message">${welcomeText}</div>`;
                
                console.log('✅ Chat history cleared successfully');
                
                // Show success message briefly
                addMessage('Chat history has been cleared successfully! 🗑️✨', false);
                
            } else {
                console.error('❌ Failed to clear chat history:', result.error);
                alert('Failed to clear chat history. Please try again.');
            }
        } catch (error) {
            console.error('❌ Error clearing chat history:', error);
            alert('An error occurred while clearing chat history. Please try again.');
        }
    }

    function formatAIResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
            .replace(/^(\d+\.\s+)/gm, '<strong style="color: #feca57;">$1</strong>')
            .replace(/^[-*]\s+/gm, '<span style="color: #ff6b6b;">• </span>')
            .replace(/\n/g, '<br>');
    }

    function handleAPIError(error) {
        let errorMessage = 'An unexpected error occurred. Please try again.';
        if (error.message.includes('overloaded')) {
            errorMessage = '🔥 **Gemini servers are busy.** Please try again in a few moments.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = '🌐 **Connection Error.** Please check your internet connection.';
        } else if (error.message) {
            errorMessage = `❌ Error: ${error.message}`;
        }
        addMessageToUI(errorMessage);
    }


    // --- EDUCATIONAL CONTENT FILTERING ---

    function createEducationalPrompt(userMessage) {
        const systemPrompt = `You are an AI professor for an educational platform.
Your ONLY purpose is to teach safe, constructive topics like science, technology, engineering, arts, and mathematics.

❌ You must refuse and not provide any answer if the user query involves:
- Violence, weapons, or harming others
- Sexual or adult content
- Drugs, alcohol, or illegal activities
- Hate speech or discrimination
- Or anything that might sound obscene or wrong

✅ If such a request is made, politely decline with:
"I'm here to help only with safe, educational topics. Please ask me something related to learning."

Always stay professional, kind, and focused on teaching.

User question: ${userMessage}`;

        return systemPrompt;
    }

    // --- AI API FUNCTIONS WITH FALLBACK ---

    async function callAIAPI(prompt, retryCount = 0) {
        const maxRetries = 1; // Try primary API once, then fallback once
        
        try {
            if (API_CONFIG.current === 'gemini') {
                return await callGeminiAPI(prompt);
            } else if (API_CONFIG.current === 'groq') {
                return await callGroqAPI(prompt);
            }
        } catch (error) {
            console.warn(`${API_CONFIG.current.toUpperCase()} API failed:`, error.message);
            
            if (retryCount < maxRetries) {
                // Switch to fallback API
                const previousAPI = API_CONFIG.current;
                API_CONFIG.current = API_CONFIG.current === 'gemini' ? 'groq' : 'gemini';
                
                console.log(`Switching from ${previousAPI.toUpperCase()} to ${API_CONFIG.current.toUpperCase()}`);
                // addMessageToUI(`🔄 **API Switch**: ${previousAPI.toUpperCase()} unavailable, switching to ${API_CONFIG.current.toUpperCase()}`);
                
                return await callAIAPI(prompt, retryCount + 1);
            } else {
                throw new Error(`Both APIs failed. Last error: ${error.message}`);
            }
        }
    }

    async function callGeminiAPI(prompt) {
        const educationalPrompt = createEducationalPrompt(prompt);
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: educationalPrompt })
        });

        const data = await response.json();
        if (!response.ok || !data.candidates || data.candidates.length === 0) {
            throw new Error(data.error?.message || 'Invalid response from Gemini API');
        }
        return data.candidates[0].content.parts[0].text;
    }

    async function callGroqAPI(prompt) {
        const educationalPrompt = createEducationalPrompt(prompt);
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: educationalPrompt })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || 'Invalid response from Groq API');
        }
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('No response from Groq API');
        }
        
        return data.choices[0].message.content;
    }

    function enhancePromptForRoadmap(message) {
        const techKeywords = ['java', 'python', 'javascript', 'c++', 'react', 'machine learning', 'data science', 'web development'];
        const lowerMessage = message.toLowerCase();
        const isRoadmapRequest = techKeywords.some(kw => lowerMessage.includes(kw) && (lowerMessage.includes('roadmap') || lowerMessage.includes('learn')));

        if (isRoadmapRequest) {
            return `Provide a detailed learning roadmap for ${message}. Include prerequisites, core concepts, a step-by-step learning path, project ideas, and recommended resources. Format with clear headings.`;
        }
        return message;
    }

    // --- YOUTUBE API FUNCTIONS ---

    function shouldSearchVideos(message) {
        const videoKeywords = ['video', 'tutorial', 'learn', 'course', 'youtube', 'watch', 'show me', 'explain'];
        const techSubjects = ['java', 'python', 'javascript', 'c++', 'react', 'sql', 'node', 'data structures', 'algorithms'];
        const lowerMessage = message.toLowerCase();
        return videoKeywords.some(kw => lowerMessage.includes(kw)) || techSubjects.some(sub => lowerMessage.includes(sub));
    }

    async function searchYouTubeVideos(query) {
        // Create more specific search terms for better results
        let enhancedQuery = query;
        
        // Add context keywords for algorithms and computer science topics
        if (query.toLowerCase().includes('algorithm')) {
            enhancedQuery = `${query} computer science tutorial explanation`;
        } else if (query.toLowerCase().includes('programming') || query.toLowerCase().includes('coding')) {
            enhancedQuery = `${query} tutorial programming guide`;
        } else if (query.toLowerCase().includes('data structure')) {
            enhancedQuery = `${query} computer science data structures tutorial`;
        } else {
            // For other topics, add educational context
            enhancedQuery = `${query} tutorial explanation educational`;
        }
        
        console.log('YouTube search query:', enhancedQuery);
        
        const searchParams = { 
            q: enhancedQuery, 
            videoDuration: 'any', 
            order: 'relevance',
            maxResults: 20 // Get more results to filter better
        };

        return await tryYouTubeSearch(searchParams, query);
    }

    async function tryYouTubeSearch(searchParams, originalQuery) {
        const baseParams = { part: 'snippet', type: 'video', key: YOUTUBE_API_KEY };
        const params = new URLSearchParams({ ...baseParams, ...searchParams });

        try {
            const response = await fetch(`${YOUTUBE_API_URL}?${params}`);
            const data = await response.json();
            if (!data.items || data.items.length === 0) return [];

            const videoIds = data.items.map(item => item.id.videoId).join(',');
            const detailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`);
            const detailsData = await detailsResponse.json();

            const videosWithDetails = data.items.map(item => {
                const details = detailsData.items.find(d => d.id === item.id.videoId);
                return { ...item, ...details };
            });

            // Filter videos to be more relevant to original query
            const relevantVideos = videosWithDetails.filter(video => {
                const title = video.snippet.title.toLowerCase();
                const description = video.snippet.description.toLowerCase();
                const originalWords = originalQuery.toLowerCase().split(' ');
                
                // Check if the video title/description contains key words from original query
                const hasRelevantWords = originalWords.some(word => 
                    word.length > 2 && (title.includes(word) || description.includes(word))
                );
                
                // Duration filter (5+ minutes minimum)
                const duration = video.contentDetails?.duration;
                if (!duration) return false;
                const totalMinutes = parseISO8601Duration(duration);
                const hasGoodDuration = totalMinutes >= 5;
                
                return hasRelevantWords && hasGoodDuration;
            });

            // If we have relevant videos, return them; otherwise fall back to quality videos
            const finalVideos = relevantVideos.length > 0 ? relevantVideos : videosWithDetails.filter(video => {
                const duration = video.contentDetails?.duration;
                if (!duration) return false;
                const totalMinutes = parseISO8601Duration(duration);
                return totalMinutes >= 5;
            });

            // Return top 10 videos
            return finalVideos.slice(0, 10);

        } catch (error) {
            console.error('YouTube API Error:', error);
            return [];
        }
    }

    // --- YOUTUBE UI FUNCTIONS ---

    function displayVideoLoading(query) {
        videosContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                            border-top: 4px solid #feca57; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #feca57; margin-top: 15px;">🔍 Searching YouTube for "${query}"...</p>
            </div>`;
    }

    function displayVideoError(query) {
        videosContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #ff6b6b; font-size: 16px;">😔 No quality videos found for "${query}"</p>
                <p style="color: #cccccc; font-size: 14px;">Tried multiple strategies to find the best content for you.</p>
            </div>`;
    }

    function displayVideosInContainer(videos, query) {
        const title = query.length > 20 ? 'Video Results' : `${query.toUpperCase()} Course`;
        let html = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: white;">🎓 ${title}</h3>
                <p style="color: #f1f2f6; opacity: 0.9;">${videos.length} quality videos found (5+ min) • Ranked by YouTube algorithm</p>
            </div>
            <div style="display: grid; gap: 15px;">`;
        videos.forEach(video => {
            html += createVideoCard(video);
        });
        html += '</div>';
        videosContainer.innerHTML = html;
        videosContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function createVideoCard(video) {
        const viewCount = video.statistics ? formatCount(video.statistics.viewCount) : 'N/A';
        const duration = video.contentDetails ? formatDuration(video.contentDetails.duration) : '';
        // Extract video ID properly - it could be video.id.videoId or video.id
        const videoId = video.id?.videoId || video.id;
        const safeTitle = video.snippet.title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        return `
            <div style="display: flex; gap: 12px; align-items: flex-start; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; background: rgba(255,255,255,0.05); cursor: pointer;"
                 onclick="openNoDistractionMode('${videoId}', '${safeTitle}')">
                <div style="position: relative;">
                    <img src="${video.snippet.thumbnails.medium.url}" style="width: 140px; height: 105px; border-radius: 8px; object-fit: cover;" alt="Thumbnail">
                    <span style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.8); color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px;">${duration}</span>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 16px;">🎯</span>
                    </div>
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 8px 0; color: #feca57; font-size: 15px;">${video.snippet.title}</h4>
                    <p style="margin: 0 0 6px 0; color: #ff6b6b; font-size: 13px;">📺 ${video.snippet.channelTitle}</p>
                    <span style="color: #48dbfb; font-size: 12px;">👁 ${viewCount} views</span>
                    <div style="margin-top: 8px; background: rgba(255, 107, 107, 0.2); padding: 4px 8px; border-radius: 12px; display: inline-block;">
                        <span style="color: #feca57; font-size: 11px; font-weight: bold;">🎯 No Distraction Mode</span>
                    </div>
                </div>
            </div>`;
    }


    // --- NO DISTRACTION MODE FUNCTIONS ---

    window.openNoDistractionMode = function(videoId, videoTitle) {
        console.log('🎯 Opening No Distraction Mode with videoId:', videoId);
        
        const modal = document.getElementById('noDistractionModal');
        const iframe = document.getElementById('distractionVideoFrame');
        const titleElement = document.getElementById('videoTitle');
        
        if (!modal || !iframe || !titleElement) {
            console.error('❌ Modal elements not found!');
            return;
        }
        
        // Set video title
        titleElement.textContent = `🎯 ${videoTitle}`;
        
        // Set iframe source with YouTube embed URL (autoplay enabled)
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&fs=1`;
        console.log('📺 Loading video URL:', embedUrl);
        iframe.src = embedUrl;
        
        // Show modal
        modal.classList.add('active');
        modal.style.display = 'flex';
        
        // Disable page scrolling
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleNoDistractionEscape);
        
        console.log('✅ No Distraction Mode activated for:', videoTitle);
    }

    window.closeNoDistractionMode = function() {
        const modal = document.getElementById('noDistractionModal');
        const iframe = document.getElementById('distractionVideoFrame');
        
        // Hide modal
        modal.classList.remove('active');
        modal.style.display = 'none';
        
        // Stop video by clearing iframe source
        iframe.src = '';
        
        // Re-enable page scrolling
        document.body.style.overflow = 'auto';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleNoDistractionEscape);
        
        console.log('🎯 No Distraction Mode deactivated');
    }

    function handleNoDistractionEscape(event) {
        // Allow escape key to exit
        if (event.key === 'Escape') {
            closeNoDistractionMode();
        }
        // Don't block other keys - allow video controls (spacebar for play/pause, arrow keys, etc.)
    }


    // --- STUDY NOTES FUNCTIONS ---

    function shouldGenerateNotes(message) {
        const studyKeywords = ['learn', 'study', 'explain', 'notes', 'roadmap', 'guide', 'teach me'];
        const lowerMessage = message.toLowerCase();
        return studyKeywords.some(kw => lowerMessage.includes(kw));
    }

    async function generateStudyNotes(topic) {
        displayNotesLoading(topic);
        try {
            const optimizedPrompt = generateOptimizedStudyPrompt(topic);
            const notesMarkdown = await callAIAPI(optimizedPrompt);
            displayStudyNotes(notesMarkdown, topic);
            notesActions.style.display = 'block';
        } catch (error) {
            displayNotesError(error.message);
        }
    }

    function generateOptimizedStudyPrompt(topic) {
        return `Create a comprehensive, university-level study guide for "${topic}". Structure it with a clear roadmap, core concepts, detailed milestone-based notes with examples, advanced topics, practice recommendations, and a quick reference section. Format using clear Markdown headings. Ensure the content is detailed, accurate, and suitable for a primary learning resource.`;
    }

    function displayNotesLoading(topic) {
        notesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                            border-top: 4px solid #48dbfb; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #48dbfb; margin-top: 15px;">📚 Generating comprehensive study notes for "${topic}"...</p>
            </div>`;
    }

    function displayNotesError(errorMessage) {
        notesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #ff6b6b; font-size: 16px;">❌ Error generating notes: ${errorMessage}</p>
            </div>`;
    }

    function displayStudyNotes(notesMarkdown, topic) {
        const htmlContent = convertMarkdownToHTML(notesMarkdown);
        notesContainer.innerHTML = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: white;">🎓 ${topic.toUpperCase()} - Study Guide</h3>
                <p style="color: #f1f2f6; opacity: 0.9;">A comprehensive resource for your learning journey.</p>
            </div>
            <div class="study-notes-content" style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 30px; line-height: 1.6;">
                ${htmlContent}
            </div>`;
        // Store both HTML and raw markdown for PDF export and saving
        window.currentStudyNotes = { 
            topic: topic, 
            html: htmlContent, 
            rawContent: notesMarkdown 
        };
        notesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Note: Auto-save removed - user must manually save notes using the Save button
        console.log('Study notes generated successfully! Use the Save button to store them.');
    }

    function convertMarkdownToHTML(markdown) {
        // A simple markdown to HTML converter
        return markdown
            .replace(/^### (.*$)/gm, '<h3 style="color: #48dbfb; margin: 28px 0 18px 0;">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 style="color: #feca57; margin: 35px 0 22px 0; border-bottom: 1px solid #feca5733; padding-bottom: 10px;">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 style="color: #ff6b6b; text-align: center;">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #feca57;">$1</strong>')
            .replace(/```([\s\S]*?)```/g, '<pre style="background: #00000033; border-radius: 8px; padding: 15px; margin: 20px 0; overflow-x: auto; color: #a8e6cf; font-family: monospace;"><code>$1</code></pre>')
            .replace(/`(.*?)`/g, '<code style="background: #ffffff1A; padding: 3px 6px; border-radius: 4px; color: #a8e6cf;">$1</code>')
            .replace(/^- (.*$)/gm, '<li style="margin: 8px 0;">$1</li>')
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
            .replace(/<\/ul>\s*<ul>/g, '')
            .replace(/\n/g, '<br>');
    }


    // --- GLOBAL FUNCTIONS for button clicks in HTML ---

    window.clearNotes = function() {
        notesContainer.innerHTML = '<p class="placeholder-text">📖 Ask to learn any subject to generate comprehensive study notes!</p>';
        notesActions.style.display = 'none';
        window.currentStudyNotes = null;
    }

    window.exportNotesPDF = function() {
        if (!window.currentStudyNotes) {
            alert('No study notes to export!');
            return;
        }
        const { topic, html } = window.currentStudyNotes;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html><html><head><title>${topic} Notes</title>
            <style>body{font-family: Arial, sans-serif; line-height: 1.6;} h1,h2,h3{color: #333;}</style>
            </head><body><h1>${topic} Study Notes</h1>${html.replace(/style="[^"]*"/g, '')}</body></html>`);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    }

    // --- SAVE NOTES FUNCTIONS ---

    window.showSaveNotesModal = function() {
        if (!window.currentStudyNotes) {
            alert('❌ No study notes to save! Please generate some notes first by asking about a topic.');
            return;
        }
        
        const modal = document.getElementById('saveNotesModal');
        const titleInput = document.getElementById('noteTitle');
        
        if (modal && titleInput) {
            // Pre-fill with current topic if available
            titleInput.value = window.currentStudyNotes.topic || '';
            titleInput.focus();
            modal.style.display = 'block';
            
            // Handle Enter key to save
            titleInput.onkeypress = function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveCurrentNotes(e);
                }
            }
        }
    }

    window.closeSaveNotesModal = function() {
        const modal = document.getElementById('saveNotesModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    window.saveCurrentNotes = async function(event) {
        if (!window.currentStudyNotes) {
            alert('❌ No study notes to save!');
            return;
        }

        const titleInput = document.getElementById('noteTitle');
        const title = titleInput.value.trim();

        if (!title) {
            alert('📝 Please enter a title for your notes!');
            titleInput.focus();
            return;
        }

        // Get save button reference - could be from event or find it in DOM
        let saveButton = null;
        if (event && event.target) {
            saveButton = event.target;
        } else {
            // Fallback: find the save button in the modal
            const modal = document.getElementById('saveNotesModal');
            if (modal) {
                saveButton = modal.querySelector('button[onclick*="saveCurrentNotes"]');
            }
        }

        try {
            // Show saving indicator
            if (saveButton) {
                const originalText = saveButton.innerHTML;
                saveButton.innerHTML = '⏳ Saving...';
                saveButton.disabled = true;
                // Store original text for restore
                saveButton.dataset.originalText = originalText;
            }

            // Get the raw notes content
            const notesContent = await getNoteContentForSaving();
            
            if (!notesContent) {
                throw new Error('No note content found to save');
            }

            // Save to MongoDB (localStorage) with custom title
            console.log('🔄 Saving notes with title:', title);
            console.log('🔄 Current identifier:', getCurrentIdentifier());
            console.log('🔄 Notes content length:', notesContent.length);
            
            // Use MongoDBNotesAPI for MongoDB backend
            await MongoDBNotesAPI.saveNote(getCurrentIdentifier(), title, notesContent);
            
            console.log('✅ Notes saved successfully with title:', title);
            
            // Close modal
            closeSaveNotesModal();
            
            // Show success message using notification
            showNotification(`✅ Notes Saved Successfully! "${title}" has been saved to your Pusthaka Zone library.`, 'success');
            
            // Refresh Pusthaka Zone to show the new note
            console.log('🔄 Refreshing Pusthaka Zone in 2 seconds...');
            setTimeout(async () => {
                console.log('🔄 Now refreshing user notes...');
                
                // Check if refreshUserNotes exists, otherwise try loadUserNotes
                if (typeof refreshUserNotes === 'function') {
                    await refreshUserNotes();
                } else if (typeof loadUserNotes === 'function') {
                    await loadUserNotes();
                }
                
                console.log('✅ Pusthaka Zone refresh completed');
                
                // Also manually trigger the load button if it exists
                const loadButton = document.getElementById('loadNotesButton');
                if (loadButton) {
                    console.log('🔄 Also triggering manual load button click');
                    loadButton.click();
                }
            }, 2000);
            
            // Restore button
            if (saveButton) {
                saveButton.innerHTML = saveButton.dataset.originalText || '💾 Save to Library';
                saveButton.disabled = false;
            }

        } catch (error) {
            console.error('❌ Error saving notes:', error);
            console.error('Error details:', error.message);
            
            // Show more specific error message
            const errorMsg = error.message || 'Unknown error';
            showNotification(`❌ Failed to save notes: ${errorMsg}`, 'error');
            
            // Restore button
            if (saveButton) {
                saveButton.innerHTML = saveButton.dataset.originalText || '💾 Save to Library';
                saveButton.disabled = false;
            }
        }
    }

    async function getNoteContentForSaving() {
        // Try to get the raw markdown content if available
        if (window.currentStudyNotes && window.currentStudyNotes.rawContent) {
            return window.currentStudyNotes.rawContent;
        }
        
        // If no raw content, try to extract from the HTML (fallback)
        const notesContent = document.querySelector('.study-notes-content');
        if (notesContent) {
            // Convert HTML back to a readable format (simplified)
            let text = notesContent.innerText || notesContent.textContent;
            return text;
        }
        
        return null;
    }


    // --- UTILITY FUNCTIONS ---

    function formatCount(count) {
        const num = parseInt(count);
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toLocaleString();
    }

    function formatDuration(iso) {
        const minutes = parseISO8601Duration(iso);
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }

    function parseISO8601Duration(iso) {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
        const matches = iso.match(regex);
        const hours = parseInt(matches[1] || 0);
        const minutes = parseInt(matches[2] || 0);
        return (hours * 60) + minutes;
    }

    // --- QUIZ FUNCTIONS ---

    let currentQuizTopic = '';
    let currentQuizQuestions = [];
    let currentQuizAnswers = [];
    let currentQuestionIndex = 0;
    let quizScore = { correct: 0, total: 0 };
    let currentQuizDifficulty = ''; // FIX: Added variable to store difficulty
    let quizResultsSaved = false; // Flag to prevent duplicate saves

    function startQuizConfirmation() {
        console.log('🎯 Start Quiz button clicked!');
        
        // Use selected subject directly
        const topic = selectedSubject;
        console.log('Selected subject for quiz:', topic);
        
        if (!topic) {
            console.log('❌ No topic selected');
            quizContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <p style="color: #ff6b6b; font-size: 18px; margin-bottom: 15px;">❌ No Subject Selected</p>
                    <p style="color: rgba(255,255,255,0.8);">Please select a subject from the list above to start a quiz!</p>
                </div>`;
            return;
        }

        currentQuizTopic = topic;
        console.log('✅ Topic set, showing difficulty modal for:', topic);
        
        // Show difficulty selection modal
        showDifficultyModal(topic);
    }

    // Difficulty Modal Functions
    function showDifficultyModal(topic) {
        console.log('🎯 showDifficultyModal called with topic:', topic);
        const modal = document.getElementById('difficultyModal');
        console.log('Modal element found:', !!modal);
        if (!modal) {
            console.error('❌ Difficulty modal not found!');
            return;
        }
        const topicDisplay = document.getElementById('quizTopicDisplay');
        console.log('Topic display element found:', !!topicDisplay);
        if (topicDisplay) {
            topicDisplay.textContent = topic;
        }
        modal.style.display = 'block';
        console.log('✅ Modal should now be visible');
    }

    function closeDifficultyModal() {
        const modal = document.getElementById('difficultyModal');
        if (modal) {
           modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const difficultyModal = document.getElementById('difficultyModal');
        const saveNotesModal = document.getElementById('saveNotesModal');
        
        if (event.target === difficultyModal) {
            closeDifficultyModal();
        }
        
        if (event.target === saveNotesModal) {
            closeSaveNotesModal();
        }
    }

    function startQuizWithDifficulty(difficulty) {
        closeDifficultyModal();
        currentQuizDifficulty = difficulty;
        quizResultsSaved = false; // Reset flag for new quiz
        
        const difficultyConfig = {
            easy: { questions: 10, level: 'Easy', description: 'basic concepts and definitions' },
            medium: { questions: 15, level: 'Medium', description: 'intermediate level with examples' },
            hard: { questions: 20, level: 'Hard', description: 'advanced concepts and scenarios' }
        };
        
        const config = difficultyConfig[difficulty];
        
        console.log(`🎯 Starting ${config.level} quiz for ${currentQuizTopic}`);
        
        // Show starting message in quiz container
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3 style="color: #feca57; margin-bottom: 20px;">🎯 Starting Pariksha Zone - ${config.level} Level!</h3>
                <p style="color: white; font-size: 16px; margin-bottom: 15px;">Generating a quiz about <strong>${currentQuizTopic}</strong></p>
                <ul style="list-style: none; padding: 0; color: rgba(255,255,255,0.9); margin-bottom: 20px;">
                    <li>• ${config.questions} Questions (${config.level} Difficulty)</li>
                    <li>• Focus on ${config.description}</li>
                    <li>• Personalized for your learning level</li>
                </ul>
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                            border-top: 4px solid #ff6b6b; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #ff6b6b; margin-top: 15px;">Preparing your quiz...</p>
            </div>`;
        
        // Scroll to quiz section
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Generate quiz with specific difficulty
        generateQuizWithDifficulty(currentQuizTopic, difficulty, config.questions);
    }

    function extractTopicFromChat() {
        // Use selected subject from subject selector
        if (selectedSubject) {
            console.log('Using selected subject:', selectedSubject);
            return selectedSubject;
        }
        
        // No chat interface anymore, return null if no subject selected
        console.log('No subject selected');
        return null;
    }
    
    // Simplified version - just return selected subject
    function extractTopicFromChat_OLD() {
        // PRIORITY 1: If a subject is selected from the subject selector, use it
        if (selectedSubject) {
            console.log('Using selected subject:', selectedSubject);
            return selectedSubject;
        }
        
        // PRIORITY 2: Extract from chat messages
        const messages = chatBox.querySelectorAll('.message');
        const recentMessages = Array.from(messages).slice(-10); // Check last 10 messages
        
        // Greetings and casual phrases to skip entirely
        const casualPhrases = [
            'hey', 'hi', 'hello', 'thanks', 'thank you', 'ok', 'okay', 'yes', 'no', 
            'sure', 'great', 'good', 'nice', 'awesome', 'cool', 'bye', 'goodbye',
            'how are you', 'whats up', 'sup', 'yo'
        ];
        
        // Comprehensive list of words to filter out
        const filterWords = [
            // Prepositions
            'with', 'without', 'through', 'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over', 'since', 'to', 'toward', 'under', 'until', 'up', 'upon', 'within',
            
            // Articles and determiners
            'a', 'an', 'the', 'this', 'that', 'these', 'those', 'some', 'any', 'all', 'every', 'each', 'both', 'either', 'neither',
            
            // Conjunctions
            'and', 'or', 'but', 'so', 'yet', 'nor', 'as', 'if', 'than', 'when', 'where', 'while', 'because', 'since', 'unless', 'although', 'though',
            
            // Instruction/learning words
            'videos', 'video', 'notes', 'note', 'quiz', 'quizzes', 'test', 'tests', 'learn', 'learning', 'teach', 'teaching', 'study', 'studying', 'explain', 'explanation', 'tutorial', 'tutorials', 'course', 'courses', 'guide', 'guides', 'roadmap', 'roadmaps', 'help', 'helping',
            
            // Common filler words
            'please', 'can', 'could', 'would', 'should', 'will', 'shall', 'may', 'might', 'must', 'need', 'want', 'get', 'give', 'make', 'take', 'do', 'does', 'did', 'have', 'has', 'had', 'be', 'is', 'are', 'was', 'were', 'been', 'being', 'go', 'going', 'come', 'coming',
            
            // Question words
            'what', 'how', 'why', 'when', 'where', 'who', 'which', 'whose',
            
            // Pronouns
            'i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'we', 'us', 'our', 'ours', 'they', 'them', 'their', 'theirs',
            
            // Other common words
            'also', 'just', 'only', 'even', 'still', 'already', 'yet', 'always', 'never', 'sometimes', 'often', 'usually', 'really', 'very', 'quite', 'rather', 'too', 'enough', 'almost', 'nearly', 'probably', 'maybe', 'perhaps',
            'there', 'here'
        ];
        
        // First try to find exact topic from user messages with learning intent
        for (let message of recentMessages) {
            if (message.classList.contains('user-message')) {
                const text = message.textContent.toLowerCase().trim();
                
                // Skip casual greetings and short phrases
                if (text.length < 5 || casualPhrases.some(phrase => text === phrase || text.startsWith(phrase + ' ') || text === phrase + '!')) {
                    console.log('Skipping casual phrase:', text);
                    continue;
                }
                
                // Skip if message doesn't contain any learning indicators or technical terms
                const hasLearningIntent = /\b(learn|teach|explain|study|tutorial|course|guide|roadmap|quiz|notes|video|show|tell)\b/i.test(text);
                
                if (!hasLearningIntent) {
                    console.log('Skipping non-learning message:', text);
                    continue;
                }
                
                // Enhanced learning patterns to capture the core subject
                const learningPatterns = [
                    /learn\s+(?:about\s+)?(.+)/,
                    /teach\s+me\s+(?:about\s+)?(.+)/,
                    /explain\s+(.+)/,
                    /(?:what\s+is|what\s+are)\s+(.+?)(?:\?|$)/,
                    /study\s+(.+)/,
                    /tell\s+me\s+about\s+(.+)/,
                    /i\s+want\s+to\s+learn\s+(.+)/,
                    /(?:quiz|test|notes|video|tutorial|course|guide)\s+(?:on|about|for)\s+(.+)/,
                    /(.+?)\s+(?:tutorial|course|guide|roadmap|quiz|notes)/,
                    /(?:show|give)\s+(?:me\s+)?(.+?)(?:\s+(?:quiz|notes|video|tutorial))/
                ];
                
                for (let pattern of learningPatterns) {
                    const match = text.match(pattern);
                    if (match && match[1]) {
                        let topic = match[1].trim();
                        
                        // Split the topic into words and filter out unwanted words
                        let words = topic.split(/\s+/);
                        let filteredWords = words.filter(word => {
                            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                            return cleanWord.length > 1 && !filterWords.includes(cleanWord);
                        });
                        
                        // Rejoin the filtered words
                        topic = filteredWords.join(' ').trim();
                        
                        // Additional cleanup for common programming language patterns
                        topic = topic.replace(/\b(programming|language|development|concepts?|basics?|fundamentals?)\b/gi, '').trim();
                        topic = topic.replace(/\s+/g, ' '); // Clean up extra spaces
                        
                        // Ensure we have a meaningful topic (at least 2 characters, not just numbers/symbols)
                        if (topic.length >= 2 && /[a-zA-Z]/.test(topic)) {
                            console.log('Extracted topic from learning pattern:', topic);
                            return topic;
                        }
                    }
                }
            }
        }
        
        // Enhanced fallback to specific algorithm and technical terms
        const techKeywords = [
            // Programming Languages
            'javascript', 'python', 'java', 'c++', 'cpp', 'c#', 'csharp', 'c', 'html', 'css', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'typescript', 'scala', 'r', 'matlab', 'perl', 'bash', 'sql',
            
            // Algorithms
            'bankers algorithm', 'dijkstra algorithm', 'bubble sort', 'merge sort', 'quick sort',
            'binary search', 'linear search', 'breadth first search', 'depth first search',
            'dynamic programming', 'greedy algorithm', 'backtracking',
            
            // Data Structures
            'linked list', 'binary tree', 'hash table', 'stack', 'queue', 'heap',
            'graph theory', 'array', 'matrix',
            
            // Programming Languages
            'java programming', 'python programming', 'javascript', 'c++', 'c programming', 
            'react', 'node.js', 'angular', 'vue.js',
            
            // Technologies
            'machine learning', 'deep learning', 'artificial intelligence', 'genai', 'generative ai',
            'data science', 'sql', 'database', 'html', 'css', 'web development',
            'mobile development', 'android', 'ios', 'git', 'docker', 'kubernetes',
            'aws', 'azure', 'blockchain', 'cybersecurity', 'operating systems'
        ];

        for (let message of recentMessages) {
            const text = message.textContent.toLowerCase();
            for (let keyword of techKeywords) {
                if (text.includes(keyword)) {
                    console.log('Found keyword:', keyword);
                    return keyword;
                }
            }
        }
        
        return null;
    }

    // Additional topic cleaning specifically for quiz generation
    function cleanTopicForQuiz(topic) {
        if (!topic) return topic;
        
        let cleanTopic = topic.toLowerCase().trim();
        
        // Remove any remaining instruction/format words that might have slipped through
        const quizSpecificFilters = [
            'videos?', 'notes?', 'quiz(zes)?', 'tutorial', 'course', 'guide', 'roadmap',
            'help', 'please', 'can you', 'could you', 'would you', 'will you',
            'i want', 'i need', 'give me', 'show me', 'tell me',
            'learn about', 'teach me about', 'explain about',
            'using', 'via', 'through', 'by'
        ];
        
        // Remove these patterns
        for (let filter of quizSpecificFilters) {
            const regex = new RegExp(`\\b${filter}\\b`, 'gi');
            cleanTopic = cleanTopic.replace(regex, '').trim();
        }
        
        // Clean up extra spaces and normalize
        cleanTopic = cleanTopic.replace(/\s+/g, ' ').trim();
        
        // Capitalize properly for display
        cleanTopic = cleanTopic.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        return cleanTopic || topic; // Return original if cleaning resulted in empty string
    }

    async function generateQuizWithDifficulty(topic, difficulty, questionCount) {
        try {
            // Clean the topic one more time for quiz generation
            const cleanTopic = cleanTopicForQuiz(topic);
            console.log('📝 Original topic:', topic, '→ Clean topic:', cleanTopic);
            
            displayQuizLoading(cleanTopic, difficulty, questionCount); // FIX: Pass more info to loading screen
            
            // Create difficulty-specific prompts
            const difficultyPrompts = {
                easy: `basic concepts, definitions, and simple examples about "${cleanTopic}". Focus on fundamental understanding and recall.`,
                medium: `intermediate concepts with practical examples about "${cleanTopic}". Include some application-based questions and reasoning.`,
                hard: `advanced concepts, complex scenarios, and problem-solving about "${cleanTopic}". Focus on critical thinking, edge cases, and real-world applications.`
            };
            
            const quizPrompt = `Create a ${difficulty} level quiz SPECIFICALLY about "${cleanTopic}" with exactly ${questionCount} questions in valid JSON format:

IMPORTANT: ALL questions must be directly related to "${cleanTopic}" - do not include unrelated grammar, general knowledge, or off-topic questions.

{
  "questions": [
    {
      "id": 1,
      "question": "Question specifically about ${topic} at ${difficulty} level",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correct_answer": "A",
      "difficulty": "${difficulty}",
      "explanation": "Brief explanation related to ${topic}"
    }
  ]
}

STRICT Requirements for ${difficulty.toUpperCase()} level:
- ALL ${questionCount} questions must be directly about "${topic}" - NO exceptions
- Focus on ${difficultyPrompts[difficulty]}
- Each question has exactly 4 options (A, B, C, D) with plausible distractors
- correct_answer must be A, B, C, or D only
- Keep explanations informative but under 60 words and related to ${topic}
- Return ONLY the JSON object, no other text
- Ensure valid JSON syntax
- Do NOT include grammar questions, word definitions, or unrelated topics

${difficulty === 'easy' ? `Focus on basic understanding, definitions, and simple concepts of ${topic}.` : 
  difficulty === 'medium' ? `Include practical examples, applications, and analytical thinking about ${topic}.` :
  `Challenge with complex scenarios, edge cases, critical thinking, and advanced problem-solving in ${topic}.`}`;

            const response = await callAIAPI(quizPrompt);
            console.log('Raw AI response:', response);
            
            // More robust JSON extraction and cleaning
            let cleanedResponse = response.trim();
            
            // Remove markdown code blocks
            cleanedResponse = cleanedResponse.replace(/```json/gi, '').replace(/```/g, '');
            
            // Remove any leading/trailing text and find JSON
            const jsonStart = cleanedResponse.indexOf('{');
            const jsonEnd = cleanedResponse.lastIndexOf('}') + 1;
            
            if (jsonStart === -1 || jsonEnd === 0) {
                throw new Error('No valid JSON found in response');
            }
            
            cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
            
            // Fix common JSON issues
            cleanedResponse = cleanedResponse
                .replace(/,\s*}/g, '}')  // Remove trailing commas
                .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
                .replace(/[\u201C\u201D]/g, '"')  // Replace smart quotes
                .replace(/[\u2018\u2019]/g, "'");  // Replace smart apostrophes
            
            console.log('Cleaned response:', cleanedResponse);
            
            // Validate JSON structure before parsing
            if (!cleanedResponse.includes('"questions"')) {
                throw new Error('Invalid quiz format - missing questions array');
            }
            
            const quizData = JSON.parse(cleanedResponse);
            
            // Validate the parsed data
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error('Invalid quiz format - questions must be an array');
            }
            
            if (quizData.questions.length === 0) {
                throw new Error('No questions found in quiz data');
            }
            
            // Validate each question
            for (let i = 0; i < quizData.questions.length; i++) {
                const q = quizData.questions[i];
                if (!q.question || !q.options || !q.correct_answer || !q.difficulty) {
                    throw new Error(`Question ${i + 1} is missing required fields`);
                }
                if (!Array.isArray(q.options) || q.options.length !== 4) {
                    throw new Error(`Question ${i + 1} must have exactly 4 options`);
                }
            }
            
            currentQuizQuestions = quizData.questions;
            currentQuizAnswers = new Array(currentQuizQuestions.length).fill(null);
            currentQuestionIndex = 0;
            quizScore = { correct: 0, total: 0 };

            displayQuizQuestion();
            
        } catch (error) {
            console.error('Quiz generation error:', error); // Log technical error for debugging
            
            // Show user-friendly error message
            let userMessage = "Oops! Something went wrong while creating your quiz.";
            
            if (error.message.includes('JSON') || error.message.includes('parse')) {
                userMessage = "Quiz generation failed. Let me try again with a different approach.";
            } else if (error.message.includes('API') || error.message.includes('fetch')) {
                userMessage = "Unable to connect to the quiz service. Please check your connection and try again.";
            } else if (error.message.includes('quota') || error.message.includes('limit')) {
                userMessage = "Service temporarily unavailable. Please try again in a few moments.";
            }
            
            displayQuizError(userMessage);
        }
    }

    function displayQuizLoading(topic, difficulty, questionCount) {
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                            border-top: 4px solid #ff6b6b; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="color: #ff6b6b; margin-top: 15px;">🎯 Generating ${topic} quiz questions...</p>
                <p style="color: #cccccc; font-size: 14px;">Creating ${questionCount} challenging questions at ${difficulty} level</p>
            </div>`;
    }

    function displayQuizError(errorMessage) {
        quizContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 20px;">😔</div>
                <h3 style="color: #ff6b6b; margin-bottom: 15px;">Quiz Generation Failed</h3>
                <p style="color: #f1f2f6; font-size: 16px; margin-bottom: 25px; line-height: 1.5;">${errorMessage}</p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="startQuizConfirmation()" class="action-button" style="background: linear-gradient(45deg, #48dbfb, #0abde3);">
                        🔄 Try Again
                    </button>
                    <button onclick="resetQuiz()" class="action-button" style="background: linear-gradient(45deg, #6c757d, #495057);">
                        ← Back to Start
                    </button>
                </div>
                <p style="color: #cccccc; font-size: 14px; margin-top: 20px;">
                    💡 Tip: Make sure you've asked about a specific topic in the chat first!
                </p>
            </div>`;
    }

    function displayQuizQuestion() {
        if (currentQuestionIndex >= currentQuizQuestions.length) {
            showQuizResults();
            return;
        }

        const question = currentQuizQuestions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100;
        
        quizContainer.innerHTML = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: white;">🎯 ${currentQuizTopic.toUpperCase()} - Pariksha Zone</h3>
                <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 10px; margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="color: #feca57;">Question ${currentQuestionIndex + 1} of ${currentQuizQuestions.length}</span>
                        <span style="color: #ff6b6b; text-transform: capitalize;">${question.difficulty}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: linear-gradient(45deg, #ff6b6b, #feca57); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 25px; margin-bottom: 20px;">
                <h4 style="color: #48dbfb; margin-bottom: 20px; font-size: 18px;">${question.question}</h4>
                
                <div style="display: grid; gap: 12px;">
                    ${question.options.map((option, index) => `
                        <button onclick="selectAnswer('${option.charAt(0)}')" 
                                class="quiz-option ${currentQuizAnswers[currentQuestionIndex] === option.charAt(0) ? 'selected' : ''}"
                                style="background: ${currentQuizAnswers[currentQuestionIndex] === option.charAt(0) ? 'linear-gradient(45deg, #48dbfb, #0abde3)' : 'rgba(255,255,255,0.1)'}; 
                                       border: 2px solid ${currentQuizAnswers[currentQuestionIndex] === option.charAt(0) ? '#48dbfb' : 'rgba(255,255,255,0.2)'}; 
                                       color: white; padding: 15px; border-radius: 10px; cursor: pointer; 
                                       text-align: left; transition: all 0.3s ease; font-size: 16px;">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center;">
                <button onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''} 
                        class="action-button" style="background: linear-gradient(45deg, #6c757d, #495057); margin-right: 10px; ${currentQuestionIndex === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
                    ← Previous
                </button>
                <button onclick="nextQuestion()" 
                        class="action-button" style="background: linear-gradient(45deg, #ff6b6b, #feca57);">
                    ${currentQuestionIndex === currentQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next →'}
                </button>
            </div>`;
    }

    function selectAnswer(answer) {
        currentQuizAnswers[currentQuestionIndex] = answer;
        displayQuizQuestion(); // Refresh to show selection
    }

    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuizQuestion();
        }
    }

    function nextQuestion() {
        if (currentQuestionIndex < currentQuizQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuizQuestion();
        } else {
            showQuizResults();
        }
    }

    async function showQuizResults() {
        // Prevent duplicate saves
        if (quizResultsSaved) {
            console.log('⚠️ Quiz results already saved, skipping duplicate save');
            return;
        }
        
        let correctCount = 0;
        const results = [];
        try {
            // Calculate basic score
            for (let i = 0; i < currentQuizQuestions.length; i++) {
                const question = currentQuizQuestions[i];
                const userAnswer = currentQuizAnswers[i];
                const isCorrect = userAnswer === question.correct_answer;
                
                if (isCorrect) correctCount++;
                
                results.push({
                    question: question.question,
                    userAnswer: userAnswer,
                    correctAnswer: question.correct_answer,
                    isCorrect: isCorrect,
                    explanation: question.explanation,
                    difficulty: question.difficulty
                });
            }

            // Save quiz results to MongoDB
            console.log('Saving quiz results to MongoDB...');
            const percentage = ((correctCount / currentQuizQuestions.length) * 100);
            const grade = getQuizGrade(percentage);
            
            await MongoDBQuizAPI.saveQuizResult(
                getCurrentIdentifier(),
                {
                    subject: currentQuizTopic,
                    difficulty: currentQuizDifficulty || 'medium',
                    score: correctCount,
                    total: currentQuizQuestions.length,
                    percentage: percentage,
                    grade: grade,
                    questions: currentQuizQuestions,
                    userAnswers: currentQuizAnswers
                }
            );
            console.log('Quiz results saved to MongoDB for Progress Zone!');
            
            // Mark results as saved
            quizResultsSaved = true;

            // Get detailed AI evaluation with question-by-question analysis
            const questionsDetails = currentQuizQuestions.map((q, idx) => {
                const userAnswer = currentQuizAnswers[idx];
                const isCorrect = userAnswer === q.correctAnswer;
                return `Q${idx + 1}: ${q.question}
                Your answer: ${q.options[userAnswer]} ${isCorrect ? '✓ CORRECT' : '✗ WRONG - Correct: ' + q.options[q.correctAnswer]}`;
            }).join('\n\n');

            const evaluationPrompt = `You are an educational tutor analyzing a student's quiz performance. Provide a comprehensive, detailed evaluation in 300-400 words.

QUIZ DETAILS:
Topic: ${currentQuizTopic}
Difficulty Level: ${currentQuizDifficulty || 'Medium'}
Total Questions: ${currentQuizQuestions.length}
Correct Answers: ${correctCount}
Wrong Answers: ${currentQuizQuestions.length - correctCount}
Score: ${((correctCount / currentQuizQuestions.length) * 100).toFixed(1)}%

DETAILED QUESTION ANALYSIS:
${questionsDetails}

EVALUATION REQUIREMENTS (Write in clear paragraphs with proper formatting):

1. **Performance Overview** (2-3 sentences)
   - Analyze the overall score and what it indicates about their understanding
   - Comment on their performance relative to the difficulty level

2. **Strengths Analysis** (3-4 sentences)
   - Based on the questions they answered CORRECTLY above, identify which specific concepts they understand well
   - Point out patterns in their correct answers
   - Recognize their mastery of specific topics
   - DO NOT say you cannot see which questions were answered correctly - the analysis is provided above

3. **Areas for Improvement** (4-5 sentences)
   - Focus on the questions they got WRONG (marked with X above)
   - Explain the correct concepts they need to learn for each wrong answer
   - Identify knowledge gaps or misconceptions
   - Suggest specific topics to review based on their mistakes

4. **Detailed Study Recommendations** (3-4 sentences)
   - Provide actionable study strategies
   - Recommend specific resources or practice areas based on their weak points
   - Suggest how to approach similar questions in the future

5. **Encouragement and Next Steps** (2-3 sentences)
   - Motivational message based on their performance
   - Clear next steps for improvement

Use markdown formatting with **bold** for emphasis and bullet points where appropriate. Be specific, constructive, and encouraging. IMPORTANT: Always refer to the specific questions from the analysis above when discussing strengths and weaknesses.`;

            const aiEvaluation = await callAIAPI(evaluationPrompt);
            
            // Store evaluation globally for later access
            window.currentQuizEvaluation = aiEvaluation;
            
            displayQuizResults(correctCount, results, aiEvaluation);
            
        } catch (error) {
             console.error("Error generating AI evaluation for quiz results:", error);
            displayQuizResults(correctCount, results, "Great job completing the quiz! Keep learning and practicing to improve your skills.");
        }
    }

    function displayQuizResults(correctCount, results, aiEvaluation) {
        const percentage = currentQuizQuestions.length > 0 ? ((correctCount / currentQuizQuestions.length) * 100) : 0;
        // FIX: Use the new getQuizGrade function for consistent grading
        const grade = getQuizGrade(percentage); 
        const gradeColor = getGradeColor(grade);
        const gradeEmoji = getGradeEmoji(grade);
        
        quizContainer.innerHTML = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: white;">🎯 Quiz Results - ${currentQuizTopic.toUpperCase()}</h3>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 25px; margin-bottom: 20px;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 4rem; margin-bottom: 10px;">${gradeEmoji}</div>
                    <h2 style="color: ${gradeColor}; margin-bottom: 10px;">Grade: ${grade} (${percentage.toFixed(1)}%)</h2>
                    <p style="color: #feca57; font-size: 18px;">${correctCount} out of ${currentQuizQuestions.length} correct</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 25px;">
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; text-align: center;">
                        <div style="color: #48dbfb; font-size: 24px; font-weight: bold;">${correctCount}</div>
                        <div style="color: #cccccc;">Correct</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; text-align: center;">
                        <div style="color: #ff6b6b; font-size: 24px; font-weight: bold;">${currentQuizQuestions.length - correctCount}</div>
                        <div style="color: #cccccc;">Incorrect</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; text-align: center;">
                        <div style="color: #feca57; font-size: 24px; font-weight: bold;">${percentage.toFixed(1)}%</div>
                        <div style="color: #cccccc;">Score</div>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                    <h4 style="color: #48dbfb; margin-bottom: 15px;">🤖 AI Evaluation</h4>
                    <div style="color: #f1f2f6; line-height: 1.6;">${formatAIResponse(aiEvaluation)}</div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="showDetailedResults()" class="action-button" style="background: linear-gradient(45deg, #48dbfb, #0abde3); margin-right: 10px;">
                        📊 View Detailed Results
                    </button>
                    <button onclick="resetQuiz()" class="action-button" style="background: linear-gradient(45deg, #ff6b6b, #feca57);">
                        🔄 Take Another Quiz
                    </button>
                </div>
            </div>`;
        
        // Results are already saved in showQuizResults() function
        console.log('Quiz results displayed and already saved to Firebase results collection!');
        
        // Store results for detailed view
        window.quizDetailedResults = results;
    }


    function showDetailedResults() {
        if (!window.quizDetailedResults) return;
        
        const results = window.quizDetailedResults;
        let html = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: white;">📊 Detailed Results - ${currentQuizTopic.toUpperCase()}</h3>
            </div>
            <div style="max-height: 400px; overflow-y: auto;">`;
        
        results.forEach((result, index) => {
            const statusColor = result.isCorrect ? '#48dbfb' : '#ff6b6b';
            const statusIcon = result.isCorrect ? '✅' : '❌';
            
            html += `
                <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px; margin-bottom: 15px; border-left: 4px solid ${statusColor};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #feca57; font-weight: bold;">Question ${index + 1}</span>
                        <span style="color: ${statusColor};">${statusIcon} ${result.difficulty.toUpperCase()}</span>
                    </div>
                    <p style="color: #f1f2f6; margin-bottom: 10px;">${result.question}</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div>
                            <span style="color: #ff6b6b;">Your Answer:</span> ${result.userAnswer || 'Not answered'}
                        </div>
                        <div>
                            <span style="color: #48dbfb;">Correct Answer:</span> ${result.correctAnswer}
                        </div>
                    </div>
                    <p style="color: #cccccc; font-size: 14px; font-style: italic;">${result.explanation}</p>
                </div>`;
        });
        
        html += '</div>';
        
        quizContainer.innerHTML = html + `
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="displayQuizResultsWrapper()" class="action-button" style="background: linear-gradient(45deg, #6c757d, #495057);">
                    ← Back to Summary
                </button>
            </div>`;
    }

    // FIX: Wrapper function to recall displayQuizResults with the stored data
    function displayQuizResultsWrapper() {
        const correctCount = window.quizDetailedResults.filter(r => r.isCorrect).length;
        // This is a simplified recall; AI evaluation won't be regenerated.
        const lastAIEvaluation = quizContainer.querySelector('.ai-evaluation-content')?.innerHTML || "Evaluation not available."; 
        displayQuizResults(correctCount, window.quizDetailedResults, lastAIEvaluation);
    }
    

    function resetQuiz() {
        currentQuizTopic = '';
        currentQuizQuestions = [];
        currentQuizAnswers = [];
        currentQuestionIndex = 0;
        quizScore = { correct: 0, total: 0 };
        quizResultsSaved = false; // Reset flag
        window.quizDetailedResults = null;
        
        quizContainer.innerHTML = `
            <p class="placeholder-text">
                🎯 Ready to test your knowledge? Click below to start a quiz based on your chosen topic!
            </p>`;
    }

    // FIX: CONSOLIDATED HELPER FUNCTIONS (Removed duplicates)

    function getQuizGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    }

    function getGradeColor(grade) {
        switch(grade) {
            case 'A+': return '#4caf50'; // Vibrant Green
            case 'A': return '#8bc34a';  // Light Green
            case 'B': return '#ffc107';  // Amber
            case 'C': return '#ff9800';  // Orange
            case 'D': return '#ff5722';  // Deep Orange
            case 'F': return '#f44336';  // Red
            default: return '#9e9e9e';   // Grey
        }
    }

    function getGradeEmoji(grade) {
        switch(grade) {
            case 'A+': return '🏆';
            case 'A': return '🥇';
            case 'B': return '🥈';
            case 'C': return '🥉';
            case 'D': return '📚';
            case 'F': return '💪'; // An encouraging emoji for "needs improvement"
            default: return '📝';
        }
    }

    // Helper function to format time ago
    function getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return date.toLocaleDateString();
    }

    // --- PROGRESS MODAL FUNCTIONS ---

    async function showProgressModal() {
        if (progressModal) {
            // Load user progress from Firebase
            const progress = await GyaanamDB.getUserProgress(getCurrentIdentifier());
            
            // Load last 3 quiz results from the "results" collection
            let quizResults = [];
            try {
                quizResults = await GyaanamDB.getUserQuizResults(getCurrentIdentifier(), 3);
                console.log('Loaded last 3 quiz results from results collection:', quizResults);
            } catch (error) {
                console.error('Error loading quiz results from results collection:', error);
            }
            
            let progressHTML = '';
            if (progress && (progress.totalQuizzes > 0 || (progress.topicsLearned && progress.topicsLearned.length > 0))) {
                const totalQuizzes = progress.totalQuizzes || 0;
                const totalScore = progress.totalScore || 0;
                const totalQuestions = progress.totalQuestions || 0;
                const topicsLearned = progress.topicsLearned || [];
                const averageScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
                
                progressHTML = `
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #48dbfb; margin-bottom: 10px;">📊 Your Learning Progress</h2>
                        <p style="color: rgba(255,255,255,0.8);">Keep learning and improving!</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                        <div style="background: rgba(72, 219, 251, 0.1); padding: 20px; border-radius: 15px; text-align: center; border: 1px solid rgba(72, 219, 251, 0.3);">
                            <div style="font-size: 2.5rem; color: #48dbfb; margin-bottom: 10px;">🧠</div>
                            <div style="font-size: 2rem; font-weight: bold; color: #48dbfb;">${totalQuizzes}</div>
                            <div style="color: rgba(255,255,255,0.8);">Quizzes Taken</div>
                        </div>
                        
                        <div style="background: rgba(255, 202, 87, 0.1); padding: 20px; border-radius: 15px; text-align: center; border: 1px solid rgba(255, 202, 87, 0.3);">
                            <div style="font-size: 2.5rem; color: #feca57; margin-bottom: 10px;">📚</div>
                            <div style="font-size: 2rem; font-weight: bold; color: #feca57;">${topicsLearned.length}</div>
                            <div style="color: rgba(255,255,255,0.8);">Topics Learned</div>
                        </div>
                        
                        <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 15px; text-align: center; border: 1px solid rgba(255, 107, 107, 0.3);">
                            <div style="font-size: 2.5rem; color: #ff6b6b; margin-bottom: 10px;">⭐</div>
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6b6b;">${averageScore}%</div>
                            <div style="color: rgba(255,255,255,0.8);">Average Score</div>
                        </div>
                    </div>
                    
                    ${quizResults.length > 0 ? `
                    <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px; margin-bottom: 20px;">
                        <h4 style="color: #48dbfb; margin-bottom: 15px;">🎯 Last 3 Quiz Results</h4>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${quizResults.map((quiz) => {
                                const percentage = quiz.totalQuestions > 0 ? Math.round((quiz.score / quiz.totalQuestions) * 100) : 0;
                                const grade = getQuizGrade(percentage);
                                const gradeColor = getGradeColor(grade);
                                const gradeEmoji = getGradeEmoji(grade);
                                const timeAgo = quiz.timestamp ? getTimeAgo(quiz.timestamp.toDate()) : 'Recently';
                                
                                return `
                                    <div style="background: rgba(255,255,255,0.03); border-radius: 10px; padding: 15px; border-left: 4px solid ${gradeColor};">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                            <div style="flex: 1;">
                                                <div style="font-weight: 600; color: white; margin-bottom: 4px;">
                                                    ${quiz.topic || 'Quiz'} - ${quiz.difficulty || 'Medium'} Level
                                                </div>
                                                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.6);">
                                                    ${timeAgo}
                                                </div>
                                            </div>
                                            <div style="text-align: right;">
                                                <div style="font-size: 1.5rem; margin-bottom: 4px;">${gradeEmoji}</div>
                                                <div style="font-weight: bold; color: ${gradeColor};">
                                                    ${quiz.score}/${quiz.totalQuestions} (${percentage}%)
                                                </div>
                                            </div>
                                        </div>
                                        <div style="background: rgba(255,255,255,0.1); border-radius: 8px; height: 6px; overflow: hidden;">
                                            <div style="background: ${gradeColor}; height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    ` : `
                    <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px; margin-bottom: 20px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🎯</div>
                        <h4 style="color: #48dbfb; margin-bottom: 10px;">No Quiz Results Yet</h4>
                        <p style="color: rgba(255,255,255,0.6);">Take a quiz to see your results here!</p>
                    </div>
                    `}
                    
                    ${topicsLearned.length > 0 ? `
                    <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 20px; margin-bottom: 20px;">
                        <h4 style="color: #48dbfb; margin-bottom: 15px;">📖 Topics You've Learned</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            ${topicsLearned.map(topic => `
                                <span style="background: rgba(72, 219, 251, 0.2); color: #48dbfb; padding: 8px 15px; border-radius: 20px; font-size: 14px; border: 1px solid rgba(72, 219, 251, 0.3);">
                                    ${topic}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="text-align: center; color: rgba(255,255,255,0.6); font-size: 14px;">
                        💡 Keep learning to unlock more achievements!
                    </div>
                `;
            } else {
                progressHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">🚀</div>
                        <h3 style="color: #48dbfb; margin-bottom: 15px;">Start Your Learning Journey!</h3>
                        <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">Ask me questions and take quizzes to track your progress.</p>
                        <p style="color: rgba(255,255,255,0.6); font-size: 14px;">Your learning stats will appear here as you use Gyaanam AI.</p>
                    </div>
                `;
            }
            
            // Update modal content
            const modalContent = progressModal.querySelector('.progress-stats');
            if (modalContent) {
                modalContent.innerHTML = progressHTML;
            }
            
            progressModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function hideProgressModal() {
        if (progressModal) {
            progressModal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    // --- PROGRESS ZONE SECTION (Always Visible at Bottom) ---
    
    let performanceChart = null; // Global chart instance
    
    // Function kept for backward compatibility but not used for toggling
    async function showProgressZone() {
        await loadProgressData();
    }
    
    // Function kept for backward compatibility
    function hideProgressZone() {
        // No longer hides - Progress Zone is always visible
        console.log('Progress Zone is now always visible');
    }
    
    async function loadProgressData() {
        try {
            const username = getCurrentIdentifier();
            
            // Load quiz statistics
            const stats = await MongoDBQuizAPI.getQuizStats(username);
            updateStatsCards(stats);
            updateSubjectBreakdown(stats.subjects);
            
            // Load recent quiz results
            const results = await MongoDBQuizAPI.getQuizResults(username);
            updateRecentResults(results);
            updatePerformanceChart(results);
            updateSubjectFilter(results);
        } catch (error) {
            console.error('Error loading progress data:', error);
            showProgressError();
        }
    }
    
    function updateStatsCards(stats) {
        document.getElementById('totalQuizzesValue').textContent = stats.totalQuizzes || 0;
        document.getElementById('averageScoreValue').textContent = `${stats.averageScore || 0}%`;
        document.getElementById('highestScoreValue').textContent = `${stats.highestScore || 0}%`;
        document.getElementById('subjectsStudiedValue').textContent = stats.subjects?.length || 0;
    }
    
    function updateRecentResults(results) {
        const recentResultsList = document.getElementById('recentResultsList');
        if (!recentResultsList) return;
        
        if (results.length === 0) {
            recentResultsList.innerHTML = `
                <div class="no-results-placeholder">
                    <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                    <p>No quiz results yet!</p>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6);">Take a quiz to see your performance here.</p>
                </div>
            `;
            return;
        }
        
        recentResultsList.innerHTML = results.map(result => {
            const percentage = result.percentage || ((result.score / result.totalQuestions) * 100);
            const grade = result.grade || getQuizGrade(percentage);
            const difficultyClass = `difficulty-${result.difficulty?.toLowerCase() || 'medium'}`;
            const gradeClass = `grade-${grade.replace('+', '')}`;
            
            return `
                <div class="result-card">
                    <div class="result-info">
                        <div class="result-subject">📚 ${result.subject}</div>
                        <div class="result-date">${result.date || new Date(result.timestamp).toLocaleDateString()}</div>
                        <span class="result-difficulty ${difficultyClass}">
                            ${result.difficulty || 'Medium'} Level
                        </span>
                    </div>
                    <div class="result-score-display">
                        <div class="result-percentage">${percentage.toFixed(1)}%</div>
                        <div class="result-fraction">${result.score}/${result.totalQuestions} correct</div>
                        <span class="result-grade ${gradeClass}">${grade}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    function updateSubjectBreakdown(subjects) {
        const subjectBreakdownList = document.getElementById('subjectBreakdownList');
        if (!subjectBreakdownList) return;
        
        if (!subjects || subjects.length === 0) {
            subjectBreakdownList.innerHTML = `
                <div class="no-results-placeholder">
                    <p>Take quizzes on different subjects to see your breakdown!</p>
                </div>
            `;
            return;
        }
        
        subjectBreakdownList.innerHTML = subjects.map(subject => `
            <div class="subject-card">
                <div class="subject-name">
                    <span>📖</span>
                    <span>${subject.name}</span>
                </div>
                <div class="subject-stats">
                    <div class="subject-quizzes">${subject.count} quiz${subject.count !== 1 ? 'zes' : ''} taken</div>
                    <div class="subject-avg-score">${subject.averageScore}%</div>
                </div>
            </div>
        `).join('');
    }
    
    // Clear all progress data
    async function clearAllProgress() {
        const confirmation = confirm(
            '⚠️ Are you sure you want to delete ALL your quiz progress?\n\n' +
            'This will permanently remove:\n' +
            '• All quiz results\n' +
            '• Performance history\n' +
            '• Subject statistics\n\n' +
            'This action cannot be undone!'
        );
        
        if (!confirmation) {
            return;
        }
        
        try {
            const username = getCurrentIdentifier();
            // Note: Clear all results not implemented in API yet
            const result = { success: false, error: 'Clear all not implemented' };
            
            if (result.success) {
                console.log('✅ All progress cleared successfully');
                
                // Show success message
                alert('✅ All progress data has been cleared successfully!');
                
                // Reload the progress zone to show empty state
                await loadProgressData();
            } else {
                throw new Error(result.error || 'Failed to clear progress');
            }
        } catch (error) {
            console.error('❌ Error clearing progress:', error);
            alert('❌ Failed to clear progress data. Please try again.');
        }
    }
    
    function updatePerformanceChart(results) {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        // Destroy existing chart if it exists
        if (performanceChart) {
            performanceChart.destroy();
            performanceChart = null;
        }
        
        if (results.length === 0) {
            // Show placeholder but keep canvas structure
            const chartContainer = canvas.parentElement;
            const headerElement = chartContainer.querySelector('.chart-header');
            
            // Create placeholder after header
            const existingPlaceholder = chartContainer.querySelector('.chart-placeholder');
            if (existingPlaceholder) {
                existingPlaceholder.remove();
            }
            
            const placeholder = document.createElement('div');
            placeholder.className = 'chart-placeholder';
            placeholder.style.cssText = 'text-align: center; padding: 60px 20px;';
            placeholder.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 15px;">📈</div>
                <p style="color: rgba(255,255,255,0.6);">Take some quizzes to see your performance trend!</p>
            `;
            
            canvas.style.display = 'none';
            if (headerElement && headerElement.nextSibling) {
                chartContainer.insertBefore(placeholder, headerElement.nextSibling);
            } else {
                chartContainer.appendChild(placeholder);
            }
            return;
        }
        
        // Show canvas and remove placeholder
        canvas.style.display = 'block';
        const existingPlaceholder = canvas.parentElement.querySelector('.chart-placeholder');
        if (existingPlaceholder) {
            existingPlaceholder.remove();
        }
        
        // Sort results by timestamp (oldest first for chart)
        const sortedResults = [...results].reverse();
        
        // Prepare chart data
        const labels = sortedResults.map((r, index) => {
            const date = new Date(r.timestamp);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const percentages = sortedResults.map(r => 
            r.percentage || ((r.score / r.totalQuestions) * 100)
        );
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Verify Chart is available
            if (typeof Chart === 'undefined') {
                console.error('Chart.js library not loaded!');
                const chartContainer = canvas.parentElement;
                chartContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                        <div style="font-size: 2rem; margin-bottom: 15px;">⚠️</div>
                        <p>Chart.js library failed to load. Please refresh the page.</p>
                    </div>
                `;
                return;
            }
            
            performanceChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Quiz Score (%)',
                        data: percentages,
                        borderColor: '#48dbfb',
                        backgroundColor: 'rgba(72, 219, 251, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#48dbfb',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: '#ffffff',
                                font: {
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#48dbfb',
                            bodyColor: '#ffffff',
                            borderColor: '#48dbfb',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    const result = sortedResults[context.dataIndex];
                                    return [
                                        `Score: ${context.parsed.y.toFixed(1)}%`,
                                        `${result.score}/${result.totalQuestions} correct`,
                                        `Subject: ${result.subject}`,
                                        `Difficulty: ${result.difficulty || 'Medium'}`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                color: '#ffffff',
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });
            
            console.log('✅ Chart rendered successfully with', results.length, 'data points');
        } catch (error) {
            console.error('❌ Error creating chart:', error);
            const chartContainer = canvas.parentElement;
            chartContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                    <div style="font-size: 2rem; margin-bottom: 15px;">⚠️</div>
                    <p>Error rendering chart: ${error.message}</p>
                    <button onclick="loadProgressData()" style="margin-top: 15px; padding: 10px 20px; background: #48dbfb; border: none; border-radius: 8px; color: white; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
        }
    }
    
    function updateSubjectFilter(results) {
        const subjectFilter = document.getElementById('subjectFilter');
        if (!subjectFilter) return;
        
        // Get unique subjects
        const subjects = [...new Set(results.map(r => r.subject))];
        
        // Keep "All Subjects" and add others
        subjectFilter.innerHTML = '<option value="all">All Subjects</option>' +
            subjects.map(subject => `<option value="${subject}">${subject}</option>`).join('');
        
        // Remove old event listeners by cloning and replacing
        const newSubjectFilter = subjectFilter.cloneNode(true);
        subjectFilter.parentNode.replaceChild(newSubjectFilter, subjectFilter);
        
        // Add event listener for filtering
        newSubjectFilter.addEventListener('change', async function() {
            const selectedSubject = this.value;
            const timeFilterElement = document.getElementById('timeFilter');
            const timeValue = timeFilterElement ? timeFilterElement.value : 'all';
            await filterAndUpdateChart(selectedSubject, timeValue);
        });
        
        // Time filter event listener
        const timeFilter = document.getElementById('timeFilter');
        if (timeFilter) {
            // Remove old event listeners
            const newTimeFilter = timeFilter.cloneNode(true);
            timeFilter.parentNode.replaceChild(newTimeFilter, timeFilter);
            
            newTimeFilter.addEventListener('change', async function() {
                const subjectFilterElement = document.getElementById('subjectFilter');
                const selectedSubject = subjectFilterElement ? subjectFilterElement.value : 'all';
                const selectedTime = this.value;
                await filterAndUpdateChart(selectedSubject, selectedTime);
            });
        }
    }
    
    async function filterAndUpdateChart(subject, timeRange) {
        try {
            const username = getCurrentIdentifier();
            const results = await MongoDBQuizAPI.getQuizResults(username);
            
            let filtered = results;
            
            // Filter by subject
            if (subject !== 'all') {
                filtered = filtered.filter(r => r.subject === subject);
            }
            
            // Filter by time range
            if (timeRange !== 'all') {
                const now = new Date();
                const cutoff = new Date();
                
                if (timeRange === 'week') {
                    cutoff.setDate(now.getDate() - 7);
                } else if (timeRange === 'month') {
                    cutoff.setDate(now.getDate() - 30);
                }
                
                filtered = filtered.filter(r => new Date(r.timestamp) >= cutoff);
            }
            
            updatePerformanceChart(filtered);
        } catch (error) {
            console.error('Error filtering chart data:', error);
        }
    }
    
    function showProgressError() {
        const progressZoneContent = document.querySelector('.progress-zone-content');
        if (progressZoneContent) {
            progressZoneContent.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 20px;">⚠️</div>
                    <h3 style="color: #ff6b6b; margin-bottom: 15px;">Unable to Load Progress Data</h3>
                    <p style="color: rgba(255,255,255,0.7); margin-bottom: 25px;">
                        There was an error loading your progress. Please try again.
                    </p>
                    <button onclick="loadProgressData()" class="action-button" style="background: linear-gradient(45deg, #48dbfb, #0abde3);">
                        🔄 Retry
                    </button>
                </div>
            `;
        }
    }

    // --- PUSTHAKA ZONE FUNCTIONS ---

    async function loadUserNotes() {
        const pusthakaContainer = document.getElementById('pusthakaContainer');
        if (!pusthakaContainer) return;

        try {
            // Show loading state
            pusthakaContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3;
                                border-top: 4px solid #10ac84; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: #10ac84; margin-top: 15px;">📚 Loading your saved notes...</p>
                </div>`;

            // Get user's notes from MongoDB backend
            const username = getCurrentIdentifier();
            const notes = await MongoDBNotesAPI.getNotes(username);
            console.log('Loaded user notes from MongoDB:', notes);

            if (notes.length === 0) {
                pusthakaContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">📚</div>
                        <h3 style="color: #10ac84; margin-bottom: 15px;">Your Library is Empty</h3>
                        <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">Start building your knowledge library by generating study notes!</p>
                        <p style="color: rgba(255,255,255,0.6); font-size: 14px;">Ask about any topic (e.g., "Learn Python programming", "Explain calculus") to create your first notes.</p>
                    </div>`;
                return;
            }

            // Display notes
            displayUserNotes(notes);

        } catch (error) {
            console.error('Error loading user notes:', error);
            pusthakaContainer.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 2rem; margin-bottom: 15px;">⚠️</div>
                    <h4 style="color: #ff6b6b; margin-bottom: 10px;">Error Loading Notes</h4>
                    <p style="color: rgba(255,255,255,0.8);">Unable to load your saved notes. Please try again.</p>
                    <button onclick="loadUserNotes()" style="margin-top: 15px; padding: 10px 20px; background: #10ac84; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        🔄 Retry
                    </button>
                </div>`;
        }
    }

    function displayUserNotes(notes) {
        const pusthakaContainer = document.getElementById('pusthakaContainer');
        if (!pusthakaContainer) return;

        let html = `
            <div style="text-align: center; padding-bottom: 20px;">
                <h3 style="color: #10ac84;">📖 Your Knowledge Library</h3>
                <p style="color: rgba(255,255,255,0.8);">${notes.length} saved ${notes.length === 1 ? 'note' : 'notes'}</p>
            </div>
            <div style="display: grid; gap: 20px;">`;

        notes.forEach((note, index) => {
            const timeAgo = note.timestamp ? getTimeAgo(new Date(note.timestamp)) : 'Recently';
            
            // Create a better formatted preview from markdown
            let preview = note.content || 'No preview available';
            
            // Extract first meaningful content (skip title/headers)
            const lines = preview.split('\n').filter(line => line.trim());
            let previewText = '';
            
            for (let line of lines) {
                // Skip markdown headers
                if (line.startsWith('#')) continue;
                
                // Clean markdown formatting
                line = line
                    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold
                    .replace(/\*(.*?)\*/g, '$1')      // Remove italics
                    .replace(/`(.*?)`/g, '$1')        // Remove code marks
                    .replace(/^[-*]\s+/, '• ')        // Convert lists to bullets
                    .trim();
                
                if (line) {
                    previewText += line + ' ';
                    if (previewText.length > 200) break;
                }
            }
            
            previewText = previewText.trim();
            if (!previewText) previewText = 'No preview available';
            if (previewText.length > 200) previewText = previewText.substring(0, 200) + '...';
            
            html += `
                <div class="note-card" style="background: linear-gradient(135deg, rgba(16, 172, 132, 0.08), rgba(16, 172, 132, 0.04)); border-radius: 15px; padding: 20px; border-left: 4px solid #10ac84; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; flex-wrap: wrap; gap: 15px;">
                        <div style="flex: 1; min-width: 200px;">
                            <h4 style="color: #10ac84; margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">${note.title || 'Study Notes'}</h4>
                            <div style="color: rgba(255,255,255,0.5); font-size: 13px; display: flex; align-items: center; gap: 5px;">
                                <i class="fas fa-clock"></i> ${timeAgo}
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <button onclick="viewFullNote('${note.id}')" style="background: linear-gradient(135deg, #48dbfb, #0abde3); color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(72, 219, 251, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(72, 219, 251, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(72, 219, 251, 0.3)'">
                                👁️ View
                            </button>
                            <button onclick="exportNoteAsPDF('${note.id}')" style="background: linear-gradient(135deg, #feca57, #ff9f43); color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(254, 202, 87, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(254, 202, 87, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(254, 202, 87, 0.3)'">
                                📄 PDF
                            </button>
                            <button class="delete-note-btn" data-note-id="${note.id}" data-note-title="${(note.title || 'Study Notes').replace(/"/g, '&quot;')}" style="background: linear-gradient(135deg, #ff6b6b, #ee5a6f); color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(255, 107, 107, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(255, 107, 107, 0.3)'">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                    <div style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 14px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        ${previewText}
                    </div>
                </div>`;
        });

        html += '</div>';
        pusthakaContainer.innerHTML = html;

        // Store notes globally for other functions
        window.userNotesData = notes;

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-note-btn').forEach(button => {
            button.addEventListener('click', function() {
                const noteId = this.getAttribute('data-note-id');
                const noteTitle = this.getAttribute('data-note-title');
                deleteNote(noteId, noteTitle);
            });
        });
    }

    async function refreshUserNotes() {
        console.log('🔄 Refreshing user notes...');
        console.log('🔄 Current identifier for refresh:', getCurrentIdentifier());
        await loadUserNotes();
        console.log('✅ User notes refresh completed');
    }

    function viewFullNote(noteId) {
        const notes = window.userNotesData || [];
        const note = notes.find(n => n.id === noteId);
        
        if (!note) {
            alert('Note not found!');
            return;
        }

        // Display note in the main notes section
        const notesContainer = document.getElementById('notesContainer');
        if (notesContainer) {
            const htmlContent = convertMarkdownToHTML(note.content);
            notesContainer.innerHTML = `
                <div style="text-align: center; padding-bottom: 20px;">
                    <h3 style="color: white;">📖 ${note.title.toUpperCase()} - Saved Notes</h3>
                    <p style="color: #f1f2f6; opacity: 0.9;">Retrieved from your knowledge library</p>
                </div>
                <div class="study-notes-content" style="background: rgba(255,255,255,0.04); border-radius: 12px; padding: 30px; line-height: 1.6;">
                    ${htmlContent}
                </div>`;
            
            // Show notes actions
            const notesActions = document.getElementById('notesActions');
            if (notesActions) {
                notesActions.style.display = 'block';
            }

            // Store for PDF export and saving
            window.currentStudyNotes = { 
                topic: note.title, 
                html: htmlContent, 
                rawContent: note.content 
            };
            
            // Scroll to notes section
            notesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    async function deleteNote(noteId, noteTitle) {
        // Show confirmation dialog
        const confirmed = confirm(`Are you sure you want to delete the note "${noteTitle}"?\n\nThis action cannot be undone.`);
        
        if (!confirmed) {
            return;
        }
        
        try {
            console.log('🗑️ Attempting to delete note:', noteId, noteTitle);
            
            // Delete from MongoDB
            const username = getCurrentIdentifier();
            const result = await MongoDBNotesAPI.deleteNote(username, noteId);
            
            if (result && result.success) {
                console.log('✅ Note deleted successfully');
                
                // Show success notification
                showNotification(`Note "${noteTitle}" has been deleted successfully!`, 'success');
                
                // Refresh the notes display
                await loadUserNotes();
                
                console.log('✅ Pusthaka Zone refreshed after deletion');
            } else {
                console.error('❌ Failed to delete note:', result ? result.error : 'Unknown error');
                showNotification('Failed to delete note. Please try again.', 'error');
            }
        } catch (error) {
            console.error('❌ Error deleting note:', error);
            showNotification('An error occurred while deleting the note.', 'error');
        }
    }

    function exportNoteAsPDF(noteId) {
        const notes = window.userNotesData || [];
        const note = notes.find(n => n.id === noteId);
        
        if (!note) {
            alert('Note not found!');
            return;
        }

        // Create PDF export
        const htmlContent = convertMarkdownToHTML(note.content);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html><html><head><title>${note.title} Notes</title>
            <style>body{font-family: Arial, sans-serif; line-height: 1.6; margin: 40px;} h1,h2,h3{color: #333;}</style>
            </head><body><h1>${note.title} Study Notes</h1>${htmlContent.replace(/style="[^"]*"/g, '')}</body></html>`);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
    }

    // Global functions for HTML onclick events
    window.selectAnswer = selectAnswer;
    window.previousQuestion = previousQuestion;
    window.nextQuestion = nextQuestion;
    window.showDetailedResults = showDetailedResults;
    window.displayQuizResultsWrapper = displayQuizResultsWrapper; // FIX: Use wrapper
    window.resetQuiz = resetQuiz;
    window.startQuizConfirmation = startQuizConfirmation;
    window.closeDifficultyModal = closeDifficultyModal;
    window.startQuizWithDifficulty = startQuizWithDifficulty;
    window.resetAPIConfig = resetAPIConfig;
    window.getAPIStatus = getAPIStatus;
    
    // Guru Zone Functions
    const guruMessages = document.getElementById('guruMessages');
    const guruInput = document.getElementById('guruInput');
    
    // Conversation memory
    let guruSessionId = null;
    let conversationHistory = [];
    const MAX_HISTORY_LENGTH = 10; // Keep last 10 exchanges for context
    
    // Bad keywords filter - comprehensive list
    const badKeywords = [
        // Explicit content
        'porn', 'sex', 'xxx', 'nude', 'naked', 'nsfw',
        // Violence
        'kill', 'murder', 'suicide', 'bomb', 'weapon', 'gun',
        // Drugs
        'drug', 'cocaine', 'heroin', 'weed', 'marijuana',
        // Hate speech
        'hate', 'racist', 'nazi', 'terrorism',
        // Profanity (basic)
        'fuck', 'shit', 'bitch', 'damn', 'ass', 'bastard',
        // Gaming/Entertainment when should be studying
        'game', 'play', 'fortnite', 'pubg', 'minecraft', 'roblox', 'gta',
        'movie', 'netflix', 'youtube', 'tiktok', 'instagram', 'facebook',
        // Time wasting
        'girlfriend', 'boyfriend', 'dating', 'crush', 'love',
        'party', 'drink', 'alcohol', 'beer', 'wine'
    ];
    
    // Motivational sarcastic responses for filtered content
    const guruResponses = [
        "🙏 Dear student, I'm here to enlighten your mind with knowledge, not to discuss such earthly distractions! Life is short - spend it learning! 📚",
        "🧘 Ah, my young padawan, I sense distraction in your query. The path to wisdom requires focus on studies, not on... whatever that was! 💡",
        "🧙‍♂️ *Guru raises eyebrow* Really? I expected better from a knowledge seeker! Let's get back to learning, shall we? Time waits for no one! ⏰",
        "🙏 Namaste! I guide students on the path of knowledge, not down rabbit holes of distraction. Focus, young one - your future self will thank you! 🎓",
        "🧘 Ah, I see you're testing the Guru's patience! Remember: Every moment spent on distractions is a moment stolen from your success. Ask me about studies! 📖",
        "🧙‍♂️ *Guru shakes head wisely* In my 1000 years of teaching, I've learned that success belongs to the focused. Let's talk about learning, not leisure! 🎯",
        "🙏 Dear child, the universe conspired to give you this moment for learning. Don't waste it! Ask me something that will make you smarter! 💪",
        "🧘 Life's too short to spend on distractions when there's SO MUCH to learn! Channel your curiosity towards knowledge, not... that. 🚀"
    ];
    
    function containsBadKeyword(text) {
        const lowerText = text.toLowerCase();
        return badKeywords.some(keyword => lowerText.includes(keyword));
    }
    
    function getRandomGuruResponse() {
        return guruResponses[Math.floor(Math.random() * guruResponses.length)];
    }
    
    // Initialize guru session
    async function initializeGuruSession(customSessionId = null) {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        // Use custom session ID or generate new one
        if (customSessionId) {
            guruSessionId = customSessionId;
        } else {
            // Generate session ID with timestamp for unique sessions
            const timestamp = new Date().getTime();
            guruSessionId = `${user.email}_${timestamp}`;
        }
        
        // Clear current conversation
        conversationHistory = [];
        guruMessages.innerHTML = '';
        
        // Load conversation history from MongoDB
        try {
            const username = getCurrentIdentifier();
            const response = await fetch(`http://localhost:3000/api/guru/history/${username}/${guruSessionId}`);
            const data = await response.json();
            
            if (data.success && data.messages && data.messages.length > 0) {
                conversationHistory = data.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));
                
                // Display previous messages
                data.messages.forEach(msg => {
                    addGuruMessage(msg.content, msg.role === 'user');
                });
                
                console.log(`✅ Loaded ${conversationHistory.length} previous messages`);
            } else {
                // New conversation - show welcome message
                addGuruMessage("Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.", false);
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
            conversationHistory = [];
            addGuruMessage("Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.", false);
        }
        
        // Load chat history list
        await loadChatHistoryList();
    }
    
    // Load list of all chat sessions
    async function loadChatHistoryList() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const username = getCurrentIdentifier();
            const response = await fetch(`http://localhost:3000/api/guru/sessions/${username}`);
            const data = await response.json();
            
            const chatHistoryList = document.getElementById('chatHistoryList');
            
            if (data.success && data.sessions && data.sessions.length > 0) {
                chatHistoryList.innerHTML = data.sessions.map((session, index) => {
                    const date = new Date(session.lastUpdated);
                    const isActive = session.sessionId === guruSessionId;
                    
                    return `
                        <div class="chat-history-item ${isActive ? 'active' : ''}" 
                             onclick="loadChatSession('${session.sessionId}')">
                            <div class="chat-preview">
                                <div class="chat-preview-title">💬 Chat ${data.sessions.length - index}</div>
                                <div class="chat-preview-text">${session.preview}...</div>
                                <div class="chat-preview-meta">
                                    <span>💬 ${session.messageCount} messages</span>
                                    <span>🕒 ${date.toLocaleDateString()}</span>
                                </div>
                            </div>
                            <button class="delete-chat-btn" 
                                    onclick="event.stopPropagation(); deleteChatSession('${session.sessionId}')" 
                                    title="Delete conversation">
                                🗑️
                            </button>
                        </div>
                    `;
                }).join('');
            } else {
                chatHistoryList.innerHTML = '<div class="no-chats">💭 No previous conversations</div>';
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            document.getElementById('chatHistoryList').innerHTML = '<div class="no-chats">❌ Error loading history</div>';
        }
    }
    
    // Load a specific chat session
    async function loadChatSession(sessionId) {
        await initializeGuruSession(sessionId);
        toggleChatHistory(); // Close sidebar after loading
    }
    
    // Create new chat
    async function createNewChat() {
        await initializeGuruSession(); // Creates new session with timestamp
    }
    
    // Toggle chat history sidebar
    function toggleChatHistory() {
        const sidebar = document.getElementById('chatHistorySidebar');
        sidebar.classList.toggle('open');
    }
    
    // Delete a chat session
    async function deleteChatSession(sessionId) {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        if (!confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
            return;
        }
        
        try {
            const username = getCurrentIdentifier();
            await fetch(`http://localhost:3000/api/guru/clear/${username}/${sessionId}`, {
                method: 'DELETE'
            });
            
            // If deleting current session, create new one
            if (sessionId === guruSessionId) {
                await createNewChat();
            } else {
                await loadChatHistoryList();
            }
            
            console.log('✅ Chat deleted successfully');
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('Failed to delete conversation. Please try again.');
        }
    }
    
    // Clear current chat
    async function clearCurrentChat() {
        await deleteChatSession(guruSessionId);
    }
    
    // Save message to MongoDB
    async function saveGuruMessage(role, content) {
        const user = firebase.auth().currentUser;
        if (!user || !guruSessionId) return;
        
        try {
            const username = getCurrentIdentifier();
            await fetch('http://localhost:3000/api/guru/save-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    sessionId: guruSessionId,
                    role: role,
                    content: content
                })
            });
        } catch (error) {
            console.error('Error saving message:', error);
        }
    }
    
    // Build context-aware prompt with conversation history
    function buildContextualPrompt(userMessage, needsDetailedResponse) {
        let contextPrompt = 'You are a wise and patient Guru helping students with their studies. ';
        
        // Add conversation history for context
        if (conversationHistory.length > 0) {
            contextPrompt += 'Here is the recent conversation history:\n\n';
            conversationHistory.slice(-MAX_HISTORY_LENGTH).forEach(msg => {
                contextPrompt += `${msg.role === 'user' ? 'Student' : 'Guru'}: ${msg.content}\n`;
            });
            contextPrompt += '\n';
        }
        
        // Add current question with appropriate instructions
        if (needsDetailedResponse) {
            contextPrompt += `The student now asks: "${userMessage}"\n\nProvide a detailed, clear, and comprehensive explanation (200-300 words) that includes:\n- Clear explanation of the concept\n- Key points and important details\n- Examples when helpful\n- Step-by-step breakdown if applicable\n\nBe thorough and educational, ensuring the student truly understands the topic. Maintain context from previous messages if relevant.`;
        } else {
            contextPrompt += `The student now asks: "${userMessage}"\n\nAnswer this educational question concisely and helpfully (under 150 words). Maintain context from previous messages if relevant.`;
        }
        
        return contextPrompt;
    }
    
    function getRandomGuruResponse() {
        return guruResponses[Math.floor(Math.random() * guruResponses.length)];
    }
    
    async function sendGuruMessage() {
        const userMessage = guruInput.value.trim();
        
        if (!userMessage) return;
        
        // Initialize session if not already done
        if (!guruSessionId) {
            await initializeGuruSession();
        }
        
        // Check for bad keywords
        if (containsBadKeyword(userMessage)) {
            // Add user message
            addGuruMessage(userMessage, true);
            guruInput.value = '';
            
            // Add warning response
            setTimeout(() => {
                const warningDiv = document.createElement('div');
                warningDiv.className = 'guru-warning-message';
                warningDiv.innerHTML = getRandomGuruResponse();
                guruMessages.appendChild(warningDiv);
                guruMessages.scrollTop = guruMessages.scrollHeight;
            }, 500);
            
            return;
        }
        
        // Add user message to UI and history
        addGuruMessage(userMessage, true);
        conversationHistory.push({ role: 'user', content: userMessage });
        await saveGuruMessage('user', userMessage);
        guruInput.value = '';
        
        // Show typing indicator
        const typingId = addTypingIndicator();
        
        // Detect if detailed explanation is needed
        const detailedKeywords = ['explain', 'teach', 'learn', 'how does', 'how do', 'what is', 'what are', 'why', 'describe', 'tell me about', 'help me understand'];
        const needsDetailedResponse = detailedKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
        
        // Build contextual prompt with conversation history
        const guruPrompt = buildContextualPrompt(userMessage, needsDetailedResponse);
        
        try {
            // Use the same API function that works for notes generation
            const guruReply = await callAIAPI(guruPrompt);
            removeTypingIndicator(typingId);
            
            // Add to UI and history
            addGuruMessage(guruReply, false);
            conversationHistory.push({ role: 'assistant', content: guruReply });
            await saveGuruMessage('assistant', guruReply);
            
            // Keep history manageable
            if (conversationHistory.length > MAX_HISTORY_LENGTH * 2) {
                conversationHistory = conversationHistory.slice(-MAX_HISTORY_LENGTH * 2);
            }
        } catch (error) {
            console.error('Guru Zone API error:', error);
            removeTypingIndicator(typingId);
            addGuruMessage("🙏 Apologies, young one. The cosmic knowledge channels are temporarily blocked. Please try again in a moment!", false);
        }
    }
    
    function addGuruMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `guru-message ${isUser ? 'guru-message-user' : 'guru-message-bot'}`;
        
        let formattedText = text;
        
        // Format the text for better readability (only for bot messages)
        if (!isUser) {
            // Detect and format code blocks (```code```)
            formattedText = formattedText.replace(/```([\s\S]*?)```/g, '<pre class="guru-code-block"><code>$1</code></pre>');
            
            // Detect and format inline code (`code`)
            formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="guru-inline-code">$1</code>');
            
            // Convert markdown-style headers
            formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            
            // Convert numbered lists with proper spacing
            formattedText = formattedText.replace(/(\d+\.\s+\*\*[^*]+\*\*:)/g, '<br><br><strong>$1</strong>');
            formattedText = formattedText.replace(/(\d+\.\s+)/g, '<br><br>$1');
            
            // Add line breaks before bullet points with proper spacing
            formattedText = formattedText.replace(/\*\s+/g, '<br>• ');
            
            // Remove excessive line breaks and normalize spacing
            formattedText = formattedText.replace(/\n\n\n+/g, '\n\n');
            
            // Paragraph breaks (but not inside code blocks)
            formattedText = formattedText.replace(/\n\n/g, '<br><br>');
            formattedText = formattedText.replace(/\n/g, '<br>');
            
            // Clean up multiple consecutive <br> tags
            formattedText = formattedText.replace(/(<br>\s*){3,}/gi, '<br><br>');
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '🎓' : '🧘'}</div>
            <div class="message-content">
                ${formattedText}
            </div>
        `;
        
        guruMessages.appendChild(messageDiv);
        guruMessages.scrollTop = guruMessages.scrollHeight;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'guru-message guru-message-bot';
        typingDiv.id = 'guruTyping';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🧘</div>
            <div class="message-content">
                <p style="font-style: italic; color: rgba(255,255,255,0.6);">Guru is thinking...</p>
            </div>
        `;
        
        guruMessages.appendChild(typingDiv);
        guruMessages.scrollTop = guruMessages.scrollHeight;
        
        return 'guruTyping';
    }
    
    function removeTypingIndicator(id) {
        const typingDiv = document.getElementById(id);
        if (typingDiv) {
            typingDiv.remove();
        }
    }
    
    // Initialize guru session on auth state change
    firebase.auth().onAuthStateChanged(user => {
        if (user && guruMessages) {
            initializeGuruSession();
        }
    });
    
    // Clear guru chat history
    async function clearGuruChat() {
        const user = firebase.auth().currentUser;
        if (!user || !guruSessionId) return;
        
        if (!confirm('Are you sure you want to clear this conversation? This cannot be undone.')) {
            return;
        }
        
        try {
            const username = getCurrentIdentifier();
            // Clear from MongoDB
            await fetch(`http://localhost:3000/api/guru/clear/${username}/${guruSessionId}`, {
                method: 'DELETE'
            });
            
            // Clear local history
            conversationHistory = [];
            
            // Clear UI
            guruMessages.innerHTML = `
                <div class="guru-message guru-message-bot">
                    <div class="message-avatar">🧘</div>
                    <div class="message-content">
                        Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.
                    </div>
                </div>
            `;
            
            console.log('✅ Chat history cleared');
        } catch (error) {
            console.error('Error clearing chat:', error);
            alert('Failed to clear chat history. Please try again.');
        }
    }
    
    // Make sendGuruMessage global
    window.sendGuruMessage = sendGuruMessage;
    window.clearGuruChat = clearCurrentChat;
    window.clearCurrentChat = clearCurrentChat;
    window.createNewChat = createNewChat;
    window.toggleChatHistory = toggleChatHistory;
    window.loadChatSession = loadChatSession;
    window.deleteChatSession = deleteChatSession;
    window.resetQuiz = resetQuiz;
    window.startQuizConfirmation = startQuizConfirmation;
    window.closeDifficultyModal = closeDifficultyModal;
    window.startQuizWithDifficulty = startQuizWithDifficulty;
    window.resetAPIConfig = resetAPIConfig;
    window.getAPIStatus = getAPIStatus;
    
    // No Distraction Mode functions
    window.openNoDistractionMode = openNoDistractionMode;
    window.closeNoDistractionMode = closeNoDistractionMode;
    
    // Pusthaka Zone functions
    window.loadUserNotes = loadUserNotes;
    window.refreshUserNotes = refreshUserNotes;
    window.viewFullNote = viewFullNote;
    window.exportNoteAsPDF = exportNoteAsPDF;
    window.deleteNote = deleteNote;
    
    // Progress Zone functions
    window.showProgressZone = showProgressZone;
    window.hideProgressZone = hideProgressZone;
    window.loadProgressData = loadProgressData;
    
    // Save Notes functions
    window.showSaveNotesModal = showSaveNotesModal;
    window.closeSaveNotesModal = closeSaveNotesModal;
    window.saveCurrentNotes = saveCurrentNotes;

});
