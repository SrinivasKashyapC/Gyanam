// Course data with relevant subjects for each domain
const courseData = {
    'neural-networks': {
        name: 'Neural Networks & Deep Learning',
        subjects: [
            'Deep Learning',
            'Neural Networks',
            'TensorFlow',
            'PyTorch',
            'Keras',
            'Computer Vision',
            'Natural Language Processing',
            'Reinforcement Learning',
            'Generative AI',
            'Machine Learning',
            'Python',
            'NumPy'
        ]
    },
    'web-development': {
        name: 'Full Stack Web Development',
        subjects: [
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Angular',
            'Vue.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'SQL',
            'MySQL',
            'PostgreSQL',
            'RESTful APIs',
            'GraphQL',
            'OAuth',
            'JWT',
            'Redux',
            'TypeScript',
            'Bootstrap',
            'Tailwind CSS',
            'Git',
            'Docker',
            'AWS',
            'Heroku',
            'Netlify'
        ]
    },
    'machine-learning': {
        name: 'Machine Learning Mastery',
        subjects: [
            'Machine Learning',
            'Scikit-learn',
            'Python',
            'NumPy',
            'Pandas',
            'Matplotlib',
            'Seaborn',
            'Statistics',
            'Linear Algebra',
            'Probability',
            'Data Science',
            'TensorFlow',
            'Keras',
            'XGBoost',
            'Random Forest'
        ]
    },
    'data-structures': {
        name: 'Data Structures & Algorithms',
        subjects: [
            'Data Structures',
            'Algorithms',
            'Arrays',
            'Linked Lists',
            'Stacks',
            'Queues',
            'Trees',
            'Graphs',
            'Sorting',
            'Searching',
            'Hashing',
            'Dynamic Programming',
            'Greedy Algorithms',
            'Recursion',
            'Big O Notation'
        ]
    },
    'python-programming': {
        name: 'Python Programming',
        subjects: [
            'Python',
            'NumPy',
            'Pandas',
            'Matplotlib',
            'Django',
            'Flask',
            'FastAPI',
            'SQLAlchemy',
            'BeautifulSoup',
            'Selenium',
            'PyTest',
            'Object-Oriented Programming',
            'Data Structures',
            'File Handling',
            'Regular Expressions'
        ]
    },
    'cloud-computing': {
        name: 'Cloud Computing & AWS',
        subjects: [
            'AWS',
            'Azure',
            'Google Cloud',
            'Docker',
            'Kubernetes',
            'Jenkins',
            'Terraform',
            'Ansible',
            'CI/CD',
            'DevOps',
            'Linux',
            'Networking',
            'Load Balancing',
            'Microservices',
            'Serverless',
            'CloudFormation'
        ]
    },
    'cybersecurity': {
        name: 'Cybersecurity Fundamentals',
        subjects: [
            'Ethical Hacking',
            'Penetration Testing',
            'Network Security',
            'Cryptography',
            'Linux',
            'Python',
            'SQL Injection',
            'XSS',
            'Firewalls',
            'VPN',
            'Malware Analysis',
            'Incident Response',
            'Security Auditing',
            'OWASP',
            'Kali Linux'
        ]
    },
    'mobile-development': {
        name: 'Mobile App Development',
        subjects: [
            'React Native',
            'Flutter',
            'Kotlin',
            'Swift',
            'Java',
            'Android',
            'iOS',
            'Firebase',
            'SQLite',
            'REST APIs',
            'Push Notifications',
            'Mobile UI/UX',
            'Redux',
            'TypeScript',
            'Expo'
        ]
    }
};

// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Courses page loaded');
    
    // Wait for Firebase to initialize and use auth state listener
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded');
        alert('Firebase authentication not available. Please refresh the page.');
        return;
    }

    // Use Firebase auth state listener to properly detect logged-in user
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log('User not authenticated, redirecting to landing page');
            alert('Please log in to access courses');
            window.location.href = 'landing.html';
            return;
        }
        
        // Update user greeting
        const userName = user.displayName || user.email.split('@')[0];
        const greetingElement = document.getElementById('userGreeting');
        if (greetingElement) {
            greetingElement.textContent = `Welcome, ${userName}! 👋`;
        }
        
        // Show logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'flex';
        }
        
        console.log('User authenticated:', userName);
    });
});

// Select a pre-configured course
function selectCourse(courseId) {
    const course = courseData[courseId];
    
    if (!course) {
        console.error('Course not found:', courseId);
        return;
    }
    
    console.log('Selected course:', course.name);
    
    // Store course data in sessionStorage
    sessionStorage.setItem('selectedCourse', JSON.stringify({
        id: courseId,
        name: course.name,
        subjects: course.subjects,
        isCustom: false
    }));
    
    // Redirect to the main learning app
    window.location.href = 'index.html';
}

// All available subjects for custom course creation
let allAvailableSubjects = [];
let selectedSubjects = [];

// Load all subjects for custom course modal
function loadAllSubjects() {
    allAvailableSubjects = [
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

// Show custom course modal
function showCustomCourseModal() {
    loadAllSubjects();
    selectedSubjects = [];
    document.getElementById('customCourseName').value = '';
    document.getElementById('subjectSearch').value = '';
    document.getElementById('customCourseModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    renderSubjects();
    updateSelectedCount();
}

// Hide custom course modal
function hideCustomCourseModal() {
    document.getElementById('customCourseModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Render subjects in the modal
function renderSubjects(filter = '') {
    const container = document.getElementById('subjectsContainer');
    const filteredSubjects = filter 
        ? allAvailableSubjects.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
        : allAvailableSubjects;
    
    container.innerHTML = filteredSubjects.map(subject => `
        <div class="subject-item ${selectedSubjects.includes(subject.name) ? 'selected' : ''}" 
             onclick="toggleSubject('${subject.name.replace(/'/g, "\\'")}')">
            <span class="subject-icon">${subject.icon}</span>
            <span class="subject-name">${subject.name}</span>
            <span class="subject-check">
                <i class="fas fa-check-circle"></i>
            </span>
        </div>
    `).join('');
}

// Filter subjects based on search
function filterSubjects() {
    const searchTerm = document.getElementById('subjectSearch').value;
    renderSubjects(searchTerm);
}

// Toggle subject selection
function toggleSubject(subjectName) {
    const index = selectedSubjects.indexOf(subjectName);
    
    if (index > -1) {
        selectedSubjects.splice(index, 1);
    } else {
        selectedSubjects.push(subjectName);
    }
    
    renderSubjects(document.getElementById('subjectSearch').value);
    updateSelectedCount();
    updateSelectedChips();
}

// Update selected count
function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = `(${selectedSubjects.length} selected)`;
    
    const display = document.getElementById('selectedSubjectsDisplay');
    display.style.display = selectedSubjects.length > 0 ? 'block' : 'none';
}

// Update selected chips display
function updateSelectedChips() {
    const chipsContainer = document.getElementById('selectedChips');
    
    chipsContainer.innerHTML = selectedSubjects.map(name => {
        const subject = allAvailableSubjects.find(s => s.name === name);
        return `
            <div class="subject-chip">
                <span>${subject.icon} ${name}</span>
                <button onclick="toggleSubject('${name.replace(/'/g, "\\'")}'); event.stopPropagation();">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
}

// Save custom course
function saveCustomCourse() {
    const courseName = document.getElementById('customCourseName').value.trim();
    
    if (!courseName) {
        alert('Please enter a course name');
        document.getElementById('customCourseName').focus();
        return;
    }
    
    if (selectedSubjects.length === 0) {
        alert('Please select at least one subject');
        return;
    }
    
    // Get existing custom courses from localStorage
    let customCourses = JSON.parse(localStorage.getItem('customCourses') || '[]');
    
    // Create new course
    const newCourse = {
        id: 'custom-' + Date.now(),
        name: courseName,
        subjects: selectedSubjects,
        createdAt: new Date().toISOString(),
        isCustom: true
    };
    
    // Add to custom courses
    customCourses.push(newCourse);
    localStorage.setItem('customCourses', JSON.stringify(customCourses));
    
    // Show success message
    alert(`✅ Course "${courseName}" created successfully with ${selectedSubjects.length} subjects!`);
    
    // Hide modal and reload custom courses
    hideCustomCourseModal();
    loadCustomCourses();
}

// Load and display custom courses
function loadCustomCourses() {
    const customCourses = JSON.parse(localStorage.getItem('customCourses') || '[]');
    
    if (customCourses.length === 0) {
        document.getElementById('customCoursesSection').style.display = 'none';
        document.getElementById('customCoursesGrid').style.display = 'none';
        return;
    }
    
    document.getElementById('customCoursesSection').style.display = 'block';
    document.getElementById('customCoursesGrid').style.display = 'grid';
    
    const grid = document.getElementById('customCoursesGrid');
    
    grid.innerHTML = customCourses.map(course => `
        <div class="course-card custom-course" data-course="${course.id}">
            <div class="course-badge" style="background: linear-gradient(135deg, #667eea, #764ba2);">Custom</div>
            <div class="course-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                ✨
            </div>
            <h3 class="course-title">${course.name}</h3>
            <p class="course-description">
                Your personalized learning path with ${course.subjects.length} hand-picked subjects.
            </p>
            <div class="course-stats">
                <span><i class="fas fa-book"></i> ${course.subjects.length} Subjects</span>
                <span><i class="fas fa-clock"></i> Self-paced</span>
                <span><i class="fas fa-star"></i> Custom</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="selectCustomCourse('${course.id}')" class="course-btn" style="flex: 1;">
                    Continue Learning <i class="fas fa-arrow-right"></i>
                </button>
                <button onclick="deleteCustomCourse('${course.id}')" class="delete-course-btn" title="Delete Course">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Select a custom course
function selectCustomCourse(courseId) {
    const customCourses = JSON.parse(localStorage.getItem('customCourses') || '[]');
    const course = customCourses.find(c => c.id === courseId);
    
    if (!course) {
        console.error('Custom course not found:', courseId);
        return;
    }
    
    console.log('Selected custom course:', course.name);
    
    // Store course data in sessionStorage
    sessionStorage.setItem('selectedCourse', JSON.stringify({
        id: course.id,
        name: course.name,
        subjects: course.subjects,
        isCustom: true
    }));
    
    // Redirect to the main learning app
    window.location.href = 'index.html';
}

// Delete a custom course
function deleteCustomCourse(courseId) {
    if (!confirm('Are you sure you want to delete this custom course?')) {
        return;
    }
    
    let customCourses = JSON.parse(localStorage.getItem('customCourses') || '[]');
    customCourses = customCourses.filter(c => c.id !== courseId);
    localStorage.setItem('customCourses', JSON.stringify(customCourses));
    
    loadCustomCourses();
}

// Create a custom course (legacy function - now opens modal)
function createCustomCourse() {
    showCustomCourseModal();
}

// Handle logout
async function handleLogout() {
    try {
        await GyaanamAuth.signOut();
        console.log('User logged out successfully');
        window.location.href = 'landing.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Failed to logout. Please try again.');
    }
}

// Add animation to course cards
document.addEventListener('DOMContentLoaded', () => {
    // Load custom courses on page load
    loadCustomCourses();
    
    const cards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});
