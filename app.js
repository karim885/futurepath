// Quiz Questions
const questions = [
    "What subjects do you enjoy most in school? (e.g., Math, Science, Arts, Literature)",
    "What are your hobbies and interests outside of school?",
    "Describe your dream job or career. What would you love to do every day?",
    "Which countries or regions interest you for studying abroad?",
    "What's your budget range for university education? (Low, Medium, High, No constraint)",
    "Do you prefer theoretical learning or hands-on practical work?",
    "What kind of work environment appeals to you? (Office, Lab, Outdoors, Remote)",
    "Are you interested in research, entrepreneurship, or working for companies?"
];

// Universities Data
const universities = [
    {
        name: "Massachusetts Institute of Technology (MIT)",
        country: "United States",
        ranking: 1,
        website: "https://www.mit.edu",
        fields: ["Engineering", "Computer Science", "Physics", "Mathematics", "Business"]
    },
    {
        name: "Stanford University",
        country: "United States",
        ranking: 2,
        website: "https://www.stanford.edu",
        fields: ["Computer Science", "Engineering", "Business", "Medicine", "Law"]
    },
    {
        name: "Harvard University",
        country: "United States",
        ranking: 3,
        website: "https://www.harvard.edu",
        fields: ["Law", "Business", "Medicine", "Arts", "Sciences"]
    },
    {
        name: "University of Oxford",
        country: "United Kingdom",
        ranking: 4,
        website: "https://www.ox.ac.uk",
        fields: ["Arts", "Sciences", "Medicine", "Law", "Business"]
    },
    {
        name: "University of Cambridge",
        country: "United Kingdom",
        ranking: 5,
        website: "https://www.cam.ac.uk",
        fields: ["Sciences", "Engineering", "Arts", "Medicine", "Mathematics"]
    },
    {
        name: "California Institute of Technology (Caltech)",
        country: "United States",
        ranking: 6,
        website: "https://www.caltech.edu",
        fields: ["Physics", "Engineering", "Chemistry", "Biology", "Astronomy"]
    },
    {
        name: "ETH Zurich",
        country: "Switzerland",
        ranking: 7,
        website: "https://ethz.ch",
        fields: ["Engineering", "Computer Science", "Mathematics", "Physics", "Architecture"]
    },
    {
        name: "Imperial College London",
        country: "United Kingdom",
        ranking: 8,
        website: "https://www.imperial.ac.uk",
        fields: ["Engineering", "Medicine", "Business", "Sciences", "Computer Science"]
    },
    {
        name: "University of Chicago",
        country: "United States",
        ranking: 9,
        website: "https://www.uchicago.edu",
        fields: ["Economics", "Business", "Law", "Medicine", "Sciences"]
    },
    {
        name: "University College London (UCL)",
        country: "United Kingdom",
        ranking: 10,
        website: "https://www.ucl.ac.uk",
        fields: ["Arts", "Sciences", "Engineering", "Medicine", "Architecture"]
    },
    {
        name: "National University of Singapore (NUS)",
        country: "Singapore",
        ranking: 11,
        website: "https://www.nus.edu.sg",
        fields: ["Engineering", "Business", "Computer Science", "Medicine", "Law"]
    },
    {
        name: "Princeton University",
        country: "United States",
        ranking: 12,
        website: "https://www.princeton.edu",
        fields: ["Mathematics", "Physics", "Engineering", "Economics", "Arts"]
    },
    {
        name: "Yale University",
        country: "United States",
        ranking: 13,
        website: "https://www.yale.edu",
        fields: ["Law", "Medicine", "Business", "Arts", "Sciences"]
    },
    {
        name: "University of Toronto",
        country: "Canada",
        ranking: 14,
        website: "https://www.utoronto.ca",
        fields: ["Medicine", "Engineering", "Computer Science", "Business", "Arts"]
    },
    {
        name: "University of Melbourne",
        country: "Australia",
        ranking: 15,
        website: "https://www.unimelb.edu.au",
        fields: ["Medicine", "Law", "Business", "Engineering", "Arts"]
    },
    {
        name: "Technical University of Munich",
        country: "Germany",
        ranking: 16,
        website: "https://www.tum.de",
        fields: ["Engineering", "Computer Science", "Physics", "Business", "Medicine"]
    },
    {
        name: "Sorbonne University",
        country: "France",
        ranking: 17,
        website: "https://www.sorbonne-universite.fr",
        fields: ["Arts", "Sciences", "Medicine", "Engineering", "Law"]
    },
    {
        name: "Tsinghua University",
        country: "China",
        ranking: 18,
        website: "https://www.tsinghua.edu.cn",
        fields: ["Engineering", "Computer Science", "Business", "Sciences", "Architecture"]
    },
    {
        name: "University of British Columbia",
        country: "Canada",
        ranking: 19,
        website: "https://www.ubc.ca",
        fields: ["Engineering", "Business", "Sciences", "Medicine", "Arts"]
    },
    {
        name: "University of Sydney",
        country: "Australia",
        ranking: 20,
        website: "https://www.sydney.edu.au",
        fields: ["Business", "Medicine", "Engineering", "Arts", "Law"]
    }
];

// Career recommendations based on common patterns
const careerDatabase = {
    'math': [
        { title: 'Data Scientist', description: 'Use mathematics and statistics to analyze complex data and drive business decisions. Perfect for those who love numbers and problem-solving.', match: 92 },
        { title: 'Software Engineer', description: 'Build innovative applications using logical thinking and mathematical algorithms. Great for systematic thinkers.', match: 88 },
        { title: 'Financial Analyst', description: 'Apply mathematical models to investment strategies and financial planning. Ideal for analytical minds.', match: 85 }
    ],
    'science': [
        { title: 'Research Scientist', description: 'Conduct groundbreaking research in your field of interest. Perfect for curious minds who love discovery.', match: 94 },
        { title: 'Biotech Engineer', description: 'Combine biology and technology to solve real-world problems. Great for science enthusiasts.', match: 89 },
        { title: 'Environmental Consultant', description: 'Use scientific knowledge to protect our planet. Ideal for eco-conscious thinkers.', match: 86 }
    ],
    'arts': [
        { title: 'UX/UI Designer', description: 'Create beautiful and functional user experiences. Perfect for creative problem solvers.', match: 91 },
        { title: 'Digital Marketing Specialist', description: 'Craft compelling stories and campaigns. Great for creative communicators.', match: 87 },
        { title: 'Creative Director', description: 'Lead creative projects and bring visions to life. Ideal for artistic leaders.', match: 84 }
    ],
    'business': [
        { title: 'Product Manager', description: 'Guide products from concept to launch. Perfect for strategic thinkers.', match: 90 },
        { title: 'Management Consultant', description: 'Help companies solve complex business problems. Great for analytical advisors.', match: 88 },
        { title: 'Entrepreneur', description: 'Build your own business and make your vision reality. Ideal for innovative risk-takers.', match: 85 }
    ],
    'default': [
        { title: 'Software Engineer', description: 'Build applications that impact millions of users. Perfect for problem solvers and creative thinkers.', match: 88 },
        { title: 'Product Manager', description: 'Guide products from concept to market. Great for strategic thinkers who love bringing ideas to life.', match: 85 },
        { title: 'Data Analyst', description: 'Turn data into insights that drive decisions. Ideal for analytical minds who love finding patterns.', match: 82 }
    ]
};

// State
let currentQuestionIndex = 0;
let answers = [];
let userProfile = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    loadAllUniversities();
});

// Section Management
function showSection(section) {
    const sections = ['home', 'quiz', 'results', 'universities'];
    sections.forEach(s => {
        const element = document.getElementById(`${s}-section`);
        if (element) {
            element.classList.add('hidden');
        }
    });

    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    if (section === 'quiz') {
        startQuiz();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quiz Functions
function startQuiz() {
    currentQuestionIndex = 0;
    answers = [];
    userProfile = {};
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    addBotMessage("Hi there! 👋 I'm your AI career guide. I'll ask you 8 questions to help discover your perfect career path and universities. Ready to begin?");
    
    setTimeout(() => {
        addBotMessage(questions[currentQuestionIndex]);
        updateProgress();
    }, 1000);
}

function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitAnswer();
    }
}

function submitAnswer() {
    const input = document.getElementById('userInput');
    const answer = input.value.trim();
    
    if (!answer) return;
    
    addUserMessage(answer);
    answers.push({
        question: questions[currentQuestionIndex],
        answer: answer
    });
    
    // Analyze answer for profile building
    analyzeAnswer(answer, currentQuestionIndex);
    
    input.value = '';
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            addBotMessage(`Great! Question ${currentQuestionIndex + 1} of ${questions.length}:`);
            setTimeout(() => {
                addBotMessage(questions[currentQuestionIndex]);
                updateProgress();
            }, 500);
        }, 800);
    } else {
        setTimeout(() => {
            addBotMessage("Excellent! 🎉 You've completed all questions. Let me analyze your answers and find the perfect career paths and universities for you...");
            setTimeout(() => {
                showResults();
            }, 2000);
        }, 800);
    }
}

function analyzeAnswer(answer, questionIndex) {
    const lowerAnswer = answer.toLowerCase();
    
    // Build user profile based on answers
    if (questionIndex === 0) { // Subjects
        if (lowerAnswer.includes('math') || lowerAnswer.includes('science')) {
            userProfile.type = 'analytical';
        } else if (lowerAnswer.includes('art') || lowerAnswer.includes('english')) {
            userProfile.type = 'creative';
        } else if (lowerAnswer.includes('business') || lowerAnswer.includes('economics')) {
            userProfile.type = 'business';
        }
    }
    
    if (questionIndex === 3) { // Countries
        userProfile.countries = lowerAnswer.split(',').map(c => c.trim());
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showResults() {
    showSection('results');
    
    // Generate career recommendations
    const careers = generateCareerRecommendations();
    const careerResults = document.getElementById('careerResults');
    careerResults.innerHTML = '';
    
    careers.forEach((career, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'career-card';
            card.innerHTML = `
                <div class="career-header">
                    <h3 class="career-title">${career.title}</h3>
                    <div class="match-percentage">${career.match}%</div>
                </div>
                <p class="career-description">${career.description}</p>
                <div class="match-bar">
                    <div class="match-fill" style="width: 0%"></div>
                </div>
            `;
            careerResults.appendChild(card);
            
            setTimeout(() => {
                card.querySelector('.match-fill').style.width = career.match + '%';
            }, 100);
        }, index * 200);
    });
    
    // Generate university recommendations
    const recommendedUnis = generateUniversityRecommendations();
    const uniResults = document.getElementById('universityResults');
    uniResults.innerHTML = '';
    
    recommendedUnis.forEach((uni, index) => {
        setTimeout(() => {
            const card = createUniversityCard(uni);
            uniResults.appendChild(card);
        }, careers.length * 200 + index * 100);
    });
}

function generateCareerRecommendations() {
    // Simple AI-like logic based on answers
    const allAnswers = answers.map(a => a.answer.toLowerCase()).join(' ');
    
    let selectedCareers = careerDatabase.default;
    
    if (allAnswers.includes('math') || allAnswers.includes('calculus') || allAnswers.includes('statistics')) {
        selectedCareers = careerDatabase.math;
    } else if (allAnswers.includes('science') || allAnswers.includes('biology') || allAnswers.includes('chemistry') || allAnswers.includes('physics')) {
        selectedCareers = careerDatabase.science;
    } else if (allAnswers.includes('art') || allAnswers.includes('design') || allAnswers.includes('creative')) {
        selectedCareers = careerDatabase.arts;
    } else if (allAnswers.includes('business') || allAnswers.includes('marketing') || allAnswers.includes('management')) {
        selectedCareers = careerDatabase.business;
    }
    
    return selectedCareers;
}

function generateUniversityRecommendations() {
    // Filter universities based on user preferences
    let recommended = [...universities];
    
    // If user mentioned specific countries
    if (userProfile.countries && userProfile.countries.length > 0) {
        const filtered = recommended.filter(uni => 
            userProfile.countries.some(country => 
                uni.country.toLowerCase().includes(country) || 
                country.includes(uni.country.toLowerCase())
            )
        );
        if (filtered.length > 0) {
            recommended = filtered;
        }
    }
    
    // Return top 10
    return recommended.slice(0, 10);
}

function createUniversityCard(uni) {
    const card = document.createElement('div');
    card.className = 'university-card';
    card.innerHTML = `
        <div class="uni-ranking">#${uni.ranking}</div>
        <h4 class="uni-name">${uni.name}</h4>
        <p class="uni-country">📍 ${uni.country}</p>
        <div style="margin-bottom: 1rem;">
            ${uni.fields.slice(0, 2).map(field => 
                `<span style="background: #e3f2fd; color: #1976d2; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; margin-right: 0.5rem; display: inline-block; margin-top: 0.5rem;">${field}</span>`
            ).join('')}
        </div>
        <a href="${uni.website}" target="_blank" class="uni-link">Visit Website →</a>
    `;
    return card;
}

function loadAllUniversities() {
    const container = document.getElementById('allUniversities');
    if (!container) return;
    
    container.innerHTML = '';
    universities.forEach(uni => {
        container.appendChild(createUniversityCard(uni));
    });
}

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

