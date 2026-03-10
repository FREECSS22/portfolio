// Scroll detection for navbar style change
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }
    });

    AOS.init({
        duration: 1000,  // Animation duration
        once: true       // Whether animation should happen only once
    });

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:riverajohnluie@gmail.com?subject=${subject}&body=${body}`;
        formStatus.classList.remove('d-none');
        formStatus.textContent = 'Your email app has been opened. If it did not open, please email me directly.';
        contactForm.reset();
    });

    const projectData = [
        {
            title: 'CRUD',
            description: 'A clean CRUD demo focused on solid UI/UX patterns for create, read, update, and delete workflows.',
            publish: 'June 2025',
            image: 'assets/CRUD.png',
            link: 'https://simpledemocrud.vercel.app'
        },
        {
            title: 'KME Landing Page',
            description: 'A modern landing page built for KME Design and Constructions, showcasing construction projects with Tailwind UI.',
            publish: 'September 2025',
            image: 'assets/KME.png',
            link: 'https://kme-design-and-constructions.vercel.app/'
        },
        {
            title: 'Munticare',
            description: 'A comprehensive healthcare management platform designed to streamline patient care, appointment scheduling, and medical record management for modern clinics.',
            publish: 'February 2026',
            image: 'assets/MuntiCare.png',
            link: 'https://munticare.vercel.app/'
        },
        {
            title: 'Icom (Deaf Caps)',
            description: 'DeafCaps provides real-time speech-to-text captions, making communication more accessible for deaf and hard-of-hearing users.',
            publish: 'January 2026',
            image: 'assets/Icom(deafcaps).png',
            link: 'https://deafcaps.vercel.app/'
        },
        {
            title: 'SK Event Management',
            description: 'A modern event management platform designed to simplify the process of planning, organizing, and promoting events of all sizes.',
            publish: 'December 2024',
            image: 'assets/SKEventManagement.png',
            link: 'https://skeventmanagement.vercel.app/'
        },
        {
            title: 'PLMUN Clone',
            description: 'A clone of the PLMUN (Pamantasan Lungsod ng Muntinlupa) platform, designed to provide a similar experience for users.',
            publish: 'April 2023',
            image: 'assets/PLMUN Clone.png',
            link: 'https://plmunclone.vercel.app/'
        }
    ];

    const monthIndex = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    const toPublishDate = (value) => {
        if (!value) return new Date(0);
        const parts = value.split(' ');
        if (parts.length === 1) {
            const year = Number(parts[0]);
            return new Date(Number.isNaN(year) ? 0 : year, 0, 1);
        }
        const month = monthIndex[parts[0]] ?? 0;
        const year = Number(parts[1]);
        return new Date(Number.isNaN(year) ? 0 : year, month, 1);
    };

    projectData.sort((a, b) => toPublishDate(b.publish) - toPublishDate(a.publish));

    const projectList = document.getElementById('projectList');
    const projectPagination = document.getElementById('projectPagination');
    const projectCount = document.getElementById('projectCount');
    const viewButtons = document.querySelectorAll('.project-view-btn');
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentView = 'grid';
    let totalPages = 1;

    const updateViewButtons = () => {
        viewButtons.forEach((button) => {
            button.classList.toggle('active', button.dataset.view === currentView);
        });
    };

    const updateViewClass = () => {
        if (!projectList) return;
        projectList.classList.toggle('is-grid', currentView === 'grid');
        projectList.classList.toggle('is-list', currentView === 'list');
    };

    const renderPagination = () => {
        if (!projectPagination) return;
        const paginationWrapper = projectPagination.parentElement;
        if (totalPages <= 1) {
            projectPagination.innerHTML = '';
            if (paginationWrapper) paginationWrapper.classList.add('d-none');
            return;
        }

        if (paginationWrapper) paginationWrapper.classList.remove('d-none');

        const pageItems = [];
        const prevDisabled = currentPage === 1 ? 'disabled' : '';
        const nextDisabled = currentPage === totalPages ? 'disabled' : '';

        pageItems.push(`
            <li class="page-item ${prevDisabled}">
                <button class="page-link" data-page="${currentPage - 1}" aria-label="Previous">
                    <i class="bi bi-chevron-left"></i>
                </button>
            </li>
        `);

        for (let i = 1; i <= totalPages; i += 1) {
            const active = i === currentPage ? 'active' : '';
            pageItems.push(`
                <li class="page-item ${active}">
                    <button class="page-link" data-page="${i}">${i}</button>
                </li>
            `);
        }

        pageItems.push(`
            <li class="page-item ${nextDisabled}">
                <button class="page-link" data-page="${currentPage + 1}" aria-label="Next">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </li>
        `);

        projectPagination.innerHTML = pageItems.join('');
    };

    const renderProjects = () => {
        if (!projectList) return;
        totalPages = Math.max(1, Math.ceil(projectData.length / itemsPerPage));
        if (currentPage > totalPages) currentPage = totalPages;
        const start = (currentPage - 1) * itemsPerPage;
        const visibleProjects = projectData.slice(start, start + itemsPerPage);

        projectList.innerHTML = visibleProjects.map((project) => `
            <article class="project-card rounded-3 shadow-lg overflow-hidden" data-aos="zoom-in">
                <img src="${project.image}" alt="${project.title} Preview" class="project-thumb">
                <div class="project-body">
                    <h3 class="h5 fw-semibold mb-2">${project.title}</h3>
                    <p class="text-white-50 small mb-2">Published ${project.publish}</p>
                    <p class="text-white small mb-3">${project.description}</p>
                    <div class="project-actions">
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer"
                            class="btn btn-outline-primary btn-sm text-primary border-primary hover-bg-primary">
                            <i class="bi bi-link-45deg"></i> Live Preview
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

        const showingStart = projectData.length === 0 ? 0 : start + 1;
        const showingEnd = start + visibleProjects.length;
        if (projectCount) {
            projectCount.textContent = `Showing ${showingStart}-${showingEnd} of ${projectData.length}`;
        }

        renderPagination();

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };

    const setProjectView = (view) => {
        currentView = view;
        updateViewClass();
        updateViewButtons();
        renderProjects();
    };

    if (projectPagination) {
        projectPagination.addEventListener('click', (event) => {
            const button = event.target.closest('button[data-page]');
            if (!button) return;
            const requestedPage = Number(button.dataset.page);
            if (Number.isNaN(requestedPage)) return;
            if (requestedPage < 1 || requestedPage > totalPages) return;
            currentPage = requestedPage;
            renderProjects();
            projectList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    viewButtons.forEach((button) => {
        button.addEventListener('click', () => {
            setProjectView(button.dataset.view);
        });
    });

    updateViewClass();
    updateViewButtons();
    renderProjects();
