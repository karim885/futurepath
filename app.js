// Quiz Questions
const questions = [
    "What subjects do you enjoy most in school? (e.g., Math, Science, Arts, Literature)",
    "What are your hobbies and interests outside of school?",
    "Describe your dream job or career. What would you love to do every day?",
    "Which countries or regions interest you for studying abroad?",
    "What's your budget range for university education? (Low, Medium, High, No constraint)",
    "Do you prefer theoretical learning or hands-on practical work?",
    "What kind of work environment appeals to you? (Office, Lab, Outdoors, Remote)",
    "Are you interested in research, entrepreneurship, or working for companies?",
    "What's your current GPA (on a 4.0 scale)?",
    "Which field are you most interested in? (e.g., Computer Science, Business, Medicine, Law, Engineering, Arts)"
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
let numericGpa = null;

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

    if (questionIndex === 8) { // GPA
        const gpaMatch = answer.match(/\d+(\.\d+)?/);
        if (gpaMatch) {
            numericGpa = Math.min(4.0, Math.max(0, parseFloat(gpaMatch[0])));
        }
    }

    if (questionIndex === 9) { // Preferred field
        userProfile.preferredField = answer.trim();
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

    // Show featured university (top ranked in chosen country and field, filtered by GPA)
    const featured = pickFeaturedUniversity(recommendedUnis);
    const featuredWrap = document.getElementById('featuredUniversity');
    if (featured) {
        featuredWrap.classList.remove('hidden');
        document.getElementById('featuredUniRanking').innerText = `#${featured.ranking}`;
        document.getElementById('featuredUniName').innerText = featured.name;
        document.getElementById('featuredUniCountry').innerText = `📍 ${featured.country}`;
        document.getElementById('featuredUniLink').href = featured.website;
        const fieldsHtml = featured.fields.slice(0, 3).map(field => (
            `<span style="background: #e3f2fd; color: #1976d2; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; margin-right: 0.5rem; display: inline-block; margin-top: 0.5rem;">${field}</span>`
        )).join('');
        document.getElementById('featuredUniFields').innerHTML = fieldsHtml;
    } else {
        featuredWrap.classList.add('hidden');
    }
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
    
    // Further filter by preferred field if provided
    if (userProfile.preferredField && userProfile.preferredField.length > 0) {
        const fieldLower = userProfile.preferredField.toLowerCase();
        const byField = recommended.filter(uni =>
            uni.fields.some(f => f.toLowerCase().includes(fieldLower))
        );
        if (byField.length > 0) recommended = byField;
    }

    // Sort by ranking asc
    recommended.sort((a, b) => a.ranking - b.ranking);

    // Return top 12 to show more options
    return recommended.slice(0, 12);
}

function pickFeaturedUniversity(list) {
    if (!list || list.length === 0) return null;

    // Prefer a university in preferred country (if any)
    let pool = list;
    if (userProfile.countries && userProfile.countries.length > 0) {
        const inCountry = list.filter(uni =>
            userProfile.countries.some(c =>
                uni.country.toLowerCase().includes(c) || c.includes(uni.country.toLowerCase())
            )
        );
        if (inCountry.length > 0) pool = inCountry;
    }

    // If GPA provided and high (>=3.7), favor top-5 ranked
    if (numericGpa !== null && numericGpa >= 3.7) {
        const top5 = pool.filter(uni => uni.ranking <= 5);
        if (top5.length > 0) return top5[0];
    }

    // If GPA is moderate (>=3.0), favor top-10
    if (numericGpa !== null && numericGpa >= 3.0) {
        const top10 = pool.filter(uni => uni.ranking <= 10);
        if (top10.length > 0) return top10[0];
    }

    // Otherwise pick the best ranked in pool
    return pool.sort((a, b) => a.ranking - b.ranking)[0];
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

async function loadAllUniversities() {
    const container = document.getElementById('allUniversities');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align: center; padding: 3rem;"><p>Loading 100+ universities...</p></div>';
    
    try {
        // Fetch from Hipolabs API (no country specified = global)
        const response = await fetch('/api/universities?limit=150');
        const data = await response.json();
        
        if (data.universities && data.universities.length > 0) {
            container.innerHTML = '';
            data.universities.forEach((uni, index) => {
                // Create enhanced card with more info
                const card = document.createElement('div');
                card.className = 'university-card';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div style="flex: 1;">
                            <h4 class="uni-name">${uni.name}</h4>
                            <p class="uni-country">📍 ${uni.country}${uni.city ? ', ' + uni.city : ''}</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.5rem 1rem; border-radius: 50px; font-weight: bold; font-size: 0.9rem;">
                            Top University
                        </div>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <span style="background: #e3f2fd; color: #1976d2; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; display: inline-block;">
                            Official Website Available
                        </span>
                    </div>
                    <a href="${uni.website || '#'}" target="_blank" class="uni-link">Visit Website →</a>
                `;
                
                // Animate appearance
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                container.appendChild(card);
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 10);
            });
        } else {
            // Fallback to static list
            container.innerHTML = '';
            universities.forEach(uni => {
                container.appendChild(createUniversityCard(uni));
            });
        }
    } catch (error) {
        console.error('Failed to load universities from API:', error);
        // Fallback to static list
        container.innerHTML = '';
        universities.forEach(uni => {
            container.appendChild(createUniversityCard(uni));
        });
    }
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


