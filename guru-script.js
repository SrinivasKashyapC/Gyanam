// Guru Zone JavaScript - Dedicated Page

// API Configuration - Using secure backend endpoints
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';
const GEMINI_API_URL = `${API_BASE_URL}/ai/gemini`;
const GROQ_API_URL = `${API_BASE_URL}/ai/groq`;

// API Configuration
const API_CONFIG = {
    primary: 'gemini',
    fallback: 'groq',
    current: 'gemini'
};

// DOM Elements
const guruMessages = document.getElementById('guruMessages');
const guruInput = document.getElementById('guruInput');

// Conversation memory
let guruSessionId = null;
let conversationHistory = [];
const MAX_HISTORY_LENGTH = 10;

// Bad keywords filter
const badKeywords = [
    'porn', 'sex', 'xxx', 'nude', 'naked', 'nsfw',
    'kill', 'murder', 'suicide', 'bomb', 'weapon', 'gun',
    'drug', 'cocaine', 'heroin', 'weed', 'marijuana',
    'hate', 'racist', 'nazi', 'terrorism',
    'fuck', 'shit', 'bitch', 'damn', 'ass', 'bastard',
    'game', 'play', 'fortnite', 'pubg', 'minecraft', 'roblox', 'gta',
    'movie', 'netflix', 'youtube', 'tiktok', 'instagram', 'facebook',
    'girlfriend', 'boyfriend', 'dating', 'crush', 'love',
    'party', 'drink', 'alcohol', 'beer', 'wine'
];

// Motivational responses
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

// Helper Functions
function containsBadKeyword(text) {
    const lowerText = text.toLowerCase();
    return badKeywords.some(keyword => lowerText.includes(keyword));
}

function getRandomGuruResponse() {
    return guruResponses[Math.floor(Math.random() * guruResponses.length)];
}

function createEducationalPrompt(userPrompt) {
    return `You are an educational AI assistant focused on helping students learn. Please provide helpful, accurate, and educational responses. User question: ${userPrompt}`;
}

// API Functions
async function callAIAPI(prompt, retryCount = 0) {
    const maxRetries = 1;
    
    try {
        if (API_CONFIG.current === 'gemini') {
            return await callGeminiAPI(prompt);
        } else if (API_CONFIG.current === 'groq') {
            return await callGroqAPI(prompt);
        }
    } catch (error) {
        console.warn(`${API_CONFIG.current.toUpperCase()} API failed:`, error.message);
        
        if (retryCount < maxRetries) {
            const previousAPI = API_CONFIG.current;
            API_CONFIG.current = API_CONFIG.current === 'gemini' ? 'groq' : 'gemini';
            console.log(`Switching from ${previousAPI.toUpperCase()} to ${API_CONFIG.current.toUpperCase()}`);
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

// Session Management
async function initializeGuruSession(customSessionId = null) {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = 'landing.html';
        return;
    }
    
    if (customSessionId) {
        guruSessionId = customSessionId;
        console.log('Loading existing session:', guruSessionId);
    } else {
        // Don't create session yet - will be created on first message
        guruSessionId = null;
        console.log('Ready for new session - will create on first message');
    }
    
    conversationHistory = [];
    guruMessages.innerHTML = '';
    
    // If loading existing session, fetch messages
    if (customSessionId) {
        try {
            const response = await fetch(`http://localhost:3000/api/guru/history/${user.email}/${guruSessionId}`);
            const data = await response.json();
            
            if (data.success && data.messages && data.messages.length > 0) {
                conversationHistory = data.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));
                
                data.messages.forEach(msg => {
                    addGuruMessage(msg.content, msg.role === 'user');
                });
                
                console.log(`✅ Loaded ${conversationHistory.length} previous messages`);
            } else {
                addGuruMessage("Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.", false);
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
            conversationHistory = [];
            addGuruMessage("Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.", false);
        }
    } else {
        // New session - show welcome
        addGuruMessage("Namaste! 🙏 I am your Guru. Ask me anything related to your studies, and I shall guide you on the path of knowledge.", false);
    }
    
    await loadChatHistoryList();
}

async function loadChatHistoryList() {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    console.log('Loading chat history for user:', user.email);
    
    try {
        const response = await fetch(`${API_BASE_URL}/guru/sessions/${user.email}`);
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('Chat history response:', data);
        
        const chatHistoryList = document.getElementById('chatHistoryList');
        
        if (data.success && data.sessions && data.sessions.length > 0) {
            console.log(`Found ${data.sessions.length} chat sessions`);
            
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
            console.log('No chat sessions found');
            chatHistoryList.innerHTML = '<div class="no-chats">💭 No previous conversations<br><small>Start chatting to save conversations!</small></div>';
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        const chatHistoryList = document.getElementById('chatHistoryList');
        chatHistoryList.innerHTML = `
            <div class="no-chats">
                ❌ Server connection error<br>
                <small>Make sure the server is running:<br>
                Run <code>npm start</code> in terminal</small>
            </div>
        `;
    }
}

async function loadChatSession(sessionId) {
    await initializeGuruSession(sessionId);
    toggleChatHistory();
}

async function createNewChat() {
    // Check if current chat has messages
    if (conversationHistory.length > 0) {
        const confirmNew = confirm('Start a new conversation? Your current chat will be automatically saved in the history.');
        if (!confirmNew) return;
    }
    
    await initializeGuruSession();
}

function toggleChatHistory() {
    const sidebar = document.getElementById('chatHistorySidebar');
    sidebar.classList.toggle('open');
}

async function deleteChatSession(sessionId) {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this conversation? This cannot be undone.')) {
        return;
    }
    
    try {
        await fetch(`${API_BASE_URL}/guru/clear/${user.email}/${sessionId}`, {
            method: 'DELETE'
        });
        
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

async function clearCurrentChat() {
    await deleteChatSession(guruSessionId);
}

async function saveGuruMessage(role, content) {
    const user = firebase.auth().currentUser;
    if (!user || !guruSessionId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/guru/save-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user.email,
                sessionId: guruSessionId,
                role: role,
                content: content
            })
        });
        
        const data = await response.json();
        console.log('Message saved:', data);
        
        // Reload chat history to show updated conversations
        if (role === 'assistant') {
            await loadChatHistoryList();
        }
    } catch (error) {
        console.error('Error saving message:', error);
    }
}

function buildContextualPrompt(userMessage, needsDetailedResponse) {
    let contextPrompt = 'You are a wise and patient Guru helping students with their studies. ';
    
    if (conversationHistory.length > 0) {
        contextPrompt += 'Here is the recent conversation history:\n\n';
        conversationHistory.slice(-MAX_HISTORY_LENGTH).forEach(msg => {
            contextPrompt += `${msg.role === 'user' ? 'Student' : 'Guru'}: ${msg.content}\n`;
        });
        contextPrompt += '\n';
    }
    
    if (needsDetailedResponse) {
        contextPrompt += `The student now asks: "${userMessage}"\n\nProvide a detailed, clear, and comprehensive explanation (200-300 words) that includes:\n- Clear explanation of the concept\n- Key points and important details\n- Examples when helpful\n- Step-by-step breakdown if applicable\n\nBe thorough and educational, ensuring the student truly understands the topic. Maintain context from previous messages if relevant.`;
    } else {
        contextPrompt += `The student now asks: "${userMessage}"\n\nAnswer this educational question concisely and helpfully (under 150 words). Maintain context from previous messages if relevant.`;
    }
    
    return contextPrompt;
}

// Message Functions
async function sendGuruMessage() {
    const userMessage = guruInput.value.trim();
    
    if (!userMessage) return;
    
    // Create session on first message if not exists
    if (!guruSessionId) {
        const user = firebase.auth().currentUser;
        const timestamp = new Date().getTime();
        guruSessionId = `${user.email}_${timestamp}`;
        console.log('Created new session on first message:', guruSessionId);
    }
    
    if (containsBadKeyword(userMessage)) {
        addGuruMessage(userMessage, true);
        guruInput.value = '';
        
        setTimeout(() => {
            const warningDiv = document.createElement('div');
            warningDiv.className = 'guru-warning-message';
            warningDiv.innerHTML = getRandomGuruResponse();
            guruMessages.appendChild(warningDiv);
            guruMessages.scrollTop = guruMessages.scrollHeight;
        }, 500);
        
        return;
    }
    
    addGuruMessage(userMessage, true);
    conversationHistory.push({ role: 'user', content: userMessage });
    await saveGuruMessage('user', userMessage);
    guruInput.value = '';
    
    const typingId = addTypingIndicator();
    
    const detailedKeywords = ['explain', 'teach', 'learn', 'how does', 'how do', 'what is', 'what are', 'why', 'describe', 'tell me about', 'help me understand'];
    const needsDetailedResponse = detailedKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));
    
    const guruPrompt = buildContextualPrompt(userMessage, needsDetailedResponse);
    
    try {
        const guruReply = await callAIAPI(guruPrompt);
        removeTypingIndicator(typingId);
        
        addGuruMessage(guruReply, false);
        conversationHistory.push({ role: 'assistant', content: guruReply });
        await saveGuruMessage('assistant', guruReply);
        
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
    
    if (!isUser) {
        formattedText = formattedText.replace(/```([\s\S]*?)```/g, '<pre class="guru-code-block"><code>$1</code></pre>');
        formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="guru-inline-code">$1</code>');
        formattedText = formattedText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/(\d+\.\s+\*\*[^*]+\*\*:)/g, '<br><br><strong>$1</strong>');
        formattedText = formattedText.replace(/(\d+\.\s+)/g, '<br><br>$1');
        formattedText = formattedText.replace(/\*\s+/g, '<br>• ');
        formattedText = formattedText.replace(/\n\n\n+/g, '\n\n');
        formattedText = formattedText.replace(/\n\n/g, '<br><br>');
        formattedText = formattedText.replace(/\n/g, '<br>');
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

// Logout Function
function logoutUser() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'landing.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

// Initialize on page load
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        initializeGuruSession();
    } else {
        window.location.href = 'landing.html';
    }
});
