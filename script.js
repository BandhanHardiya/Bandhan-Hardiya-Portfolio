document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Fade-in animation on page load
    const faders = document.querySelectorAll('.fade-in');
    
    // Slight delay to ensure CSS is loaded and DOM is ready
    setTimeout(() => {
        faders.forEach(fader => {
            fader.classList.add('appear');
        });
    }, 100);

    // --- NEW FEATURES ---

    // 1. Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 2. Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Go to top';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // 4. Typing Effect
    const typedRole = document.getElementById('typed-role');
    if (typedRole) {
        const roles = ["Eukaryote", "Data Analyst", "Data Enthusiast", "Data Scientist", "Problem Solver", "Tech Nerd", "Data Driven", "Techie"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);
    }

    // 4.5. Biology Facts Fader
    const factContainer = document.getElementById('fact-container');
    if (factContainer) {
        const facts = [
            { title: "Eukaryote", text: "A \"sciencey\" name for a complex, multi-cellular organism (like us!). Because I love biology and it is my passion to learn about it." },
            { title: "DNA", text: "The universe's most efficient hard drive. Just one gram of DNA can store around 215 petabytes of data." },
            { title: "Genetic Code", text: "Nature's original source code. It only uses four basic strings (A, C, T, G) to program every living organism on Earth." },
            { title: "Mycorrhizal Networks", text: "The original \"World Wide Web.\" Fungi connect trees underground in a massive network, allowing them to communicate and share resources." },
            { title: "Mitochondria", text: "The powerhouse of the cell, but also a former independent bacteria that our early cellular ancestors essentially \"hacked\" and adopted billions of years ago." },
            { title: "Evolution", text: "The ultimate machine learning algorithm. It has been running a continuous trial-and-error optimization loop for 3.8 billion years." },
            { title: "Apoptosis", text: "Programmed cell death. It is basically a cell realizing it has a critical bug and executing an exit(0) command for the greater good of the body." },
            { title: "Synapses", text: "The brain's logic gates. You have about 100 trillion of them constantly firing to process inputs and compile your reality." }
        ];
        
        let factIndex = 0;
        
        setInterval(() => {
            // Fade out
            factContainer.classList.add('fade-out');
            
            setTimeout(() => {
                // Change text after faded out
                factIndex = (factIndex + 1) % facts.length;
                const fact = facts[factIndex];
                factContainer.innerHTML = `<strong>*${fact.title}:</strong> ${fact.text}`;
                
                // Fade back in
                factContainer.classList.remove('fade-out');
            }, 1000); // Wait for CSS transition (1s) to complete
            
        }, 8000); // Change fact every 8 seconds
    }

    // 5. GitHub Fetcher
    const githubContainer = document.getElementById('github-repos');
    if (githubContainer) {
        // Fetch public repositories, sorted by recently updated
        fetch('https://api.github.com/users/BandhanHardiya/repos?sort=updated&per_page=3')
            .then(response => response.json())
            .then(repos => {
                if (repos.length > 0) {
                    let html = '';
                    repos.forEach(repo => {
                        const date = new Date(repo.updated_at).toLocaleDateString();
                        html += `
                            <a href="${repo.html_url}" target="_blank" class="repo-card" style="text-decoration: none;">
                                <div class="repo-name">
                                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    ${repo.name}
                                </div>
                                <div class="repo-desc">${repo.description || 'No description provided.'}</div>
                                <div class="repo-meta">
                                    <span>⭐ ${repo.stargazers_count}</span>
                                    <span>🍴 ${repo.forks_count}</span>
                                    <span>Updated: ${date}</span>
                                </div>
                            </a>
                        `;
                    });
                    githubContainer.innerHTML = html;
                } else {
                    githubContainer.innerHTML = '<p>No repositories found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching GitHub repos:', error);
                githubContainer.innerHTML = '<p>Unable to load repositories at the moment.</p>';
            });
    }
});
