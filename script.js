// JavaScript for the Career Assessment
document.getElementById('careerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    
    // Get selected subjects (max 3)
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
    const subjects = Array.from(subjectCheckboxes).map(cb => cb.value).slice(0, 3);
    
    // Get selected activities (max 3)
    const activityCheckboxes = document.querySelectorAll('input[name="activities"]:checked');
    const activities = Array.from(activityCheckboxes).map(cb => cb.value).slice(0, 3);
    
    const environment = document.getElementById('environment').value;
    
    // Generate career recommendations based on inputs
    const recommendations = generateCareerRecommendations(subjects, activities, environment);
    
    // Display results
    displayResults(name, recommendations);
});

function generateCareerRecommendations(subjects, activities, environment) {
    // This is a simplified version - a real system would use more sophisticated matching
    const allCareers = [
        {
            title: "Data Scientist",
            description: "Analyze complex data to help organizations make decisions. Requires strong math and programming skills.",
            match: 85,
            tags: ["math", "computer", "analyzing"],
            environments: ["office", "remote"]
        },
        {
            title: "Environmental Engineer",
            description: "Develop solutions to environmental problems using engineering principles.",
            match: 78,
            tags: ["science", "problem-solving", "building"],
            environments: ["office", "outdoor", "lab"]
        },
        {
            title: "Graphic Designer",
            description: "Create visual concepts to communicate ideas that inspire and inform consumers.",
            match: 72,
            tags: ["arts", "creative"],
            environments: ["office", "creative", "remote"]
        },
        {
            title: "Healthcare Professional",
            description: "Various roles in medicine, nursing, or allied health services helping patients.",
            match: 68,
            tags: ["science", "helping"],
            environments: ["office", "lab"]
        },
        {
            title: "Software Developer",
            description: "Design, develop, and test software applications for computers and devices.",
            match: 82,
            tags: ["computer", "problem-solving"],
            environments: ["office", "remote"]
        },
        {
            title: "Social Worker",
            description: "Help people cope with challenges in their lives and improve communities.",
            match: 65,
            tags: ["social", "helping"],
            environments: ["office", "outdoor"]
        },
        {
            title: "Business Manager",
            description: "Plan, direct, and coordinate operations for organizations.",
            match: 70,
            tags: ["social", "leading"],
            environments: ["office"]
        },
        {
            title: "Research Scientist",
            description: "Conduct experiments and studies to advance knowledge in various fields.",
            match: 75,
            tags: ["science", "analyzing"],
            environments: ["lab"]
        }
    ];
    
    // Score careers based on matches
    const scoredCareers = allCareers.map(career => {
        let score = 0;
        
        // Check subject matches
        career.tags.forEach(tag => {
            if (subjects.includes(tag)) score += 15;
        });
        
        // Check activity matches
        career.tags.forEach(tag => {
            if (activities.includes(tag)) score += 15;
        });
        
        // Environment match
        if (career.environments.includes(environment)) score += 20;
        
        // Add some randomness to make it more realistic
        score += Math.floor(Math.random() * 10) - 5;
        score = Math.max(50, Math.min(95, score)); // Keep between 50-95
        
        return {
            ...career,
            match: score
        };
    });
    
    // Sort by match score
    scoredCareers.sort((a, b) => b.match - a.match);
    
    // Return top 3
    return scoredCareers.slice(0, 3);
}

function displayResults(name, recommendations) {
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = '';
    
    recommendations.forEach(career => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3>${career.title} (${career.match}% match)</h3>
            <p>${career.description}</p>
        `;
        resultContent.appendChild(card);
    });
    
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    // Also populate modal (for larger screens)
    const modalResults = document.getElementById('modalResults');
    modalResults.innerHTML = `
        <p>Hi ${name}, based on your interests and preferences, we recommend exploring these career paths:</p>
        ${recommendations.map(career => `
            <div class="result-card">
                <h3>${career.title} (${career.match}% match)</h3>
                <p>${career.description}</p>
            </div>
        `).join('')}
    `;
    
    // Show modal on larger screens
    if (window.innerWidth > 768) {
        document.getElementById('resultModal').style.display = 'flex';
    }
}

// Close modal
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('resultModal').style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('resultModal')) {
        document.getElementById('resultModal').style.display = 'none';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});