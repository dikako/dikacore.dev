document.addEventListener('DOMContentLoaded', () => {
    // Soft Fade In on Load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Minimal Interaction: Log for context
    console.log("Dika Core // Context Loaded.");

    // Auto-calculate years of experience (Started: Jan 2019)
    const startDate = new Date(2019, 0, 1); // January 2019
    const now = new Date();
    const yearsExp = Math.floor((now - startDate) / (1000 * 60 * 60 * 24 * 365));
    const yearsElement = document.getElementById('years-exp');
    if (yearsElement) {
        yearsElement.textContent = `(${yearsExp}+ years)`;
    }

    // Calculate duration for each job
    document.querySelectorAll('.project-card[data-start]').forEach(card => {
        const startStr = card.dataset.start;
        const endStr = card.dataset.end;

        if (!startStr) return;

        const [startYear, startMonth] = startStr.split('-').map(Number);

        let endYear, endMonth;
        if (endStr === 'present') {
            const now = new Date();
            endYear = now.getFullYear();
            endMonth = now.getMonth() + 1; // getMonth() is 0-indexed
        } else {
            [endYear, endMonth] = endStr.split('-').map(Number);
        }

        // Calculate total months
        let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);

        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;

        let durationText = '';
        if (years > 0 && remainingMonths > 0) {
            durationText = `(${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo)`;
        } else if (years > 0) {
            durationText = `(${years} yr${years > 1 ? 's' : ''})`;
        } else if (remainingMonths > 0) {
            durationText = `(${remainingMonths} mo)`;
        }

        const durationSpan = card.querySelector('.duration');
        if (durationSpan) {
            durationSpan.textContent = durationText;
        }
    });

    // Fetch GitHub Repositories
    const GITHUB_USERNAME = 'dikako';
    const reposContainer = document.getElementById('github-repos');

    async function fetchGitHubRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
            if (!response.ok) throw new Error('Failed to fetch repos');

            const repos = await response.json();

            // Filter out forks and sort by stargazers count (descending)
            const filteredRepos = repos
                .filter(repo => !repo.fork)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6); // Show top 6 repos

            renderRepos(filteredRepos);
        } catch (error) {
            console.error('Error fetching repos:', error);
            reposContainer.innerHTML = '<p class="error-message">Unable to load repositories. Please visit <a href="https://github.com/dikako" target="_blank">GitHub</a> directly.</p>';
        }
    }

    function getLanguageClass(language) {
        if (!language) return '';
        const lang = language.toLowerCase();
        const langMap = {
            'ruby': 'ruby',
            'go': 'go',
            'shell': 'shell',
            'swift': 'swift',
            'java': 'java',
            'javascript': 'javascript',
            'python': 'python',
            'kotlin': 'kotlin'
        };
        return langMap[lang] || '';
    }

    function renderRepos(repos) {
        reposContainer.innerHTML = repos.map(repo => `
            <a href="${repo.html_url}" class="repo-card" target="_blank">
                <div class="repo-header">
                    <h3>${repo.name}</h3>
                    ${repo.language ? `<span class="lang-tag ${getLanguageClass(repo.language)}">${repo.language}</span>` : ''}
                </div>
                <p class="repo-desc">${repo.description || 'No description available.'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </a>
        `).join('');
    }

    if (reposContainer) {
        fetchGitHubRepos();
    }

    // Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const openBtn = document.getElementById('open-contact');
    const closeBtn = document.getElementById('close-contact');
    const backdrop = document.querySelector('.modal-backdrop');

    function openModal() {
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
