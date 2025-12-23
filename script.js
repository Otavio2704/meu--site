document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initContactForm();
    initLanguageToggle();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active section indicator
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    
    // Se o elemento não existir, retorna (não é mais usado no HTML atual)
    if (!typingText) return;
    
    const phrases = [
        'Web Developer',
        'Front-End', 
        'Problem Solver',
        'Code Explorer',
        'AI Explorer',
        'Innovator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initOrbitAnimations() {
    const sunCore = document.querySelector('.sun-core');
    const orbitIcons = document.querySelector('.orbit-icons');
    const orbitItems = document.querySelectorAll('.orbit-item');

    if (!sunCore || !orbitIcons || orbitItems.length === 0) {
        console.warn('Elementos de órbita não encontrados');
        return;
    }

    // Pausar animação ao passar o mouse na foto
    sunCore.addEventListener('mouseenter', () => {
        orbitItems.forEach(item => {
            item.style.animationPlayState = 'paused';
        });
    });

    // Retomar animação ao tirar o mouse da foto
    sunCore.addEventListener('mouseleave', () => {
        orbitItems.forEach(item => {
            item.style.animationPlayState = 'running';
        });
    });

    // Opcional: pausar também ao passar o mouse nos ícones
    orbitItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.animationPlayState = 'paused';
        });

        item.addEventListener('mouseleave', () => {
            item.style.animationPlayState = 'running';
        });
    });
}

function initSunPhotoModal() {
    const sun = document.querySelector('.sun-core');
    const modal = document.getElementById('photo-modal');
    const closeBtn = document.querySelector('.close');
    const randomPhoto = document.getElementById('random-photo');

    if (sun && modal && closeBtn && randomPhoto) {
        sun.addEventListener('click', () => {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Pegar idioma atual para mensagens de feedback
        const currentLang = localStorage.getItem('language') || 'pt';
        const messages = {
            pt: {
                success: '✅ Mensagem enviada com sucesso!',
                error: '❌ Falha ao enviar mensagem: '
            },
            en: {
                success: '✅ Message sent successfully!',
                error: '❌ Failed to send message: '
            }
        };

        try {
            await emailjs.sendForm(
                "service_84s8dbo",
                "template_n9fc865",
                form
            );
            alert(messages[currentLang].success);
            form.reset();
        } catch (error) {
            alert(messages[currentLang].error + error.text);
            console.error("Erro EmailJS:", error);
        }
    });
}

function initLanguageToggle() {
    const langToggle = document.getElementById('language-toggle');
    if (!langToggle) return;

    // Traduções completas
    const translations = {
        pt: {
            // Navegação
            'nav-home': 'Início',
            'nav-about': 'Sobre',
            'nav-projects': 'Projetos',
            'nav-contact': 'Contato',
            
            // Hero Section
            'greeting': 'Olá, eu sou <strong>Otávio Guedes</strong> 👋',
            'hero-title': 'Eng.Software - Desenvolvedor Back-end',
            'hero-quote': 'Foco em back-end com Java, Spring Boot, bancos relacionais e soluções em cloud.',
            'download-cv': 'Baixar CV',
            'view-projects': 'Ver projetos',
            
            // About Section
            'about-title': 'Sobre',
            'about-text': 'Sou estudante de Engenharia de Software com foco em desenvolvimento Back-end. Trabalho com Java e Spring Boot para construir APIs escaláveis, faço modelagem de banco de dados (PostgreSQL), escrevo testes com JUnit e Mockito e tenho interesse em IA generativa e cloud (AWS).',
            'skills-title': 'Tecnologias & Ferramentas',
            'skill-prompt-engineering': 'Engenharia de prompts',
            
            // Code Animation
            'code-name': 'nome',
            'code-name-value': '"Otávio Guedes"',
            'code-role': 'cargo',
            'code-role-value': '"Eng.Software / Back-end Java"',
            'code-focus': 'foco',
            'code-focus-value': '"APIs, testes, modelagem e cloud"',
            
            // Projects Section
            'projects-title': 'Projetos',
            'projects-subtitle': 'Seleção de projetos no meu GitHub — códigos e README disponíveis nos links.',
            
            // Project 1 - API Amigo Secreto
            'project1-title': 'API Amigo Secreto 2.0',
            'project1-desc': 'API REST moderna e completa para gerenciar sorteios de amigo secreto de forma digital e automatizada. Desenvolvida com Spring Boot, oferece recursos avançados de gerenciamento de grupos, algoritmo de sorteio inteligente e sistema de mensagens anônimas.',
            
            // Project 2 - Roguelike
            'project2-desc': 'Um jogo roguelike clássico desenvolvido em Java puro, jogado direto no terminal. Explore masmorras geradas proceduralmente, colete itens, derrote inimigos e tente sobreviver o máximo de níveis possível!',
            
            // Project 3 - AcademiaGYM
            'project3-desc': 'API RESTful profissional para gerenciamento completo de academias de ginástica, desenvolvida com Spring Boot 3.2.5, Spring Data JPA, Bean Validation e arquitetura em camadas.',
            
            // Project 4 - E-commerce
            'project4-title': 'Sistema E-commerce — Modelagem de Banco',
            'project4-desc': 'Este projeto apresenta uma modelagem completa de banco de dados para um sistema de e-commerce, desenvolvida em PostgreSQL. O sistema foi projetado para suportar operações comerciais complexas, incluindo gestão de clientes (PF/PJ), produtos, pedidos, pagamentos, estoque e entregas.',
            'project4-tech': 'Modelagem ER',
            
            // Project 5 - Gerenciador de Times
            'project5-title': 'Gerenciador de Times e Jogadores',
            'project5-desc': 'Sistema completo em Java para gerenciamento de times de futebol e seus jogadores, com persistência de dados e interface de linha de comando intuitiva.',
            
            // Project 6 - Otavio's Bank
            'project6-title': 'Otavio\'s Bank — Sistema Bancário (Java POO)',
            'project6-desc': 'Um sistema bancário completo desenvolvido em Java que demonstra os principais conceitos de Programação Orientada a Objetos (POO), oferecendo uma experiência bancária simulada com funcionalidades modernas como PIX e investimentos.',
            
            // Contact Section
            'contact-title': 'Contato',
            'contact-text': 'Estou aberto a oportunidades e colaborações. Pode me encontrar no GitHub ou LinkedIn — ou enviar uma mensagem por aqui.',
            
            // Form
            'send-message': 'Enviar mensagem',
            'name-placeholder': 'Seu nome',
            'email-placeholder': 'Seu e-mail',
            'message-placeholder': 'Mensagem',
            'form-name-label': 'Seu nome',
            'form-email-label': 'Seu e-mail',
            'form-message-label': 'Sua mensagem',
            
            // Footer
            'footer-rights': '© 2025 Otávio Guedes. Todos os direitos reservados.'
        },
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            
            // Hero Section
            'greeting': 'Hello, I\'m <strong>Otávio Guedes</strong> 👋',
            'hero-title': 'Software Engineer - Backend Developer',
            'hero-quote': 'Focused on back-end with Java, Spring Boot, relational databases and cloud solutions.',
            'download-cv': 'Download CV',
            'view-projects': 'View Projects',
            
            // About Section
            'about-title': 'About',
            'about-text': 'I\'m a Software Engineering student focused on Back-end development. I work with Java and Spring Boot to build scalable APIs, design databases (PostgreSQL), write tests with JUnit and Mockito, and have interest in generative AI and cloud (AWS).',
            'skills-title': 'Technologies & Tools',
            'skill-prompt-engineering': 'Prompt Engineering',
            
            // Code Animation
            'code-name': 'name',
            'code-name-value': '"Otávio Guedes"',
            'code-role': 'role',
            'code-role-value': '"Software Eng. / Back-end Java"',
            'code-focus': 'focus',
            'code-focus-value': '"APIs, testing, modeling and cloud"',
            
            // Projects Section
            'projects-title': 'Projects',
            'projects-subtitle': 'Selection of projects on my GitHub — code and README available at the links.',
            
            // Project 1 - API Amigo Secreto
            'project1-title': 'Secret Santa API 2.0',
            'project1-desc': 'Modern and complete REST API to manage secret santa draws digitally and automatically. Developed with Spring Boot, it offers advanced group management features, intelligent draw algorithm and anonymous messaging system.',
            
            // Project 2 - Roguelike
            'project2-desc': 'A classic roguelike game developed in pure Java, played directly in the terminal. Explore procedurally generated dungeons, collect items, defeat enemies and try to survive as many levels as possible!',
            
            // Project 3 - AcademiaGYM
            'project3-desc': 'Professional RESTful API for complete gym management, developed with Spring Boot 3.2.5, Spring Data JPA, Bean Validation and layered architecture.',
            
            // Project 4 - E-commerce
            'project4-title': 'E-commerce System — Database Modeling',
            'project4-desc': 'This project presents a complete database modeling for an e-commerce system, developed in PostgreSQL. The system was designed to support complex business operations, including customer management (individual/corporate), products, orders, payments, inventory and deliveries.',
            'project4-tech': 'ER Modeling',
            
            // Project 5 - Team Manager
            'project5-title': 'Teams and Players Manager',
            'project5-desc': 'Complete Java system for managing soccer teams and their players, with data persistence and intuitive command-line interface.',
            
            // Project 6 - Otavio's Bank
            'project6-title': 'Otavio\'s Bank — Banking System (Java OOP)',
            'project6-desc': 'A complete banking system developed in Java that demonstrates the main concepts of Object-Oriented Programming (OOP), offering a simulated banking experience with modern features like PIX and investments.',
            
            // Contact Section
            'contact-title': 'Contact',
            'contact-text': 'I\'m open to opportunities and collaborations. You can find me on GitHub or LinkedIn — or send a message here.',
            
            // Form
            'send-message': 'Send Message',
            'name-placeholder': 'Your name',
            'email-placeholder': 'Your email',
            'message-placeholder': 'Message',
            'form-name-label': 'Your name',
            'form-email-label': 'Your email',
            'form-message-label': 'Your message',
            
            // Footer
            'footer-rights': '© 2025 Otávio Guedes. All rights reserved.'
        }
    };

    // Carregar idioma salvo ou usar português como padrão
    let currentLang = localStorage.getItem('language') || 'pt';
    updateLanguage(currentLang);

    // Event listener para o botão de troca de idioma
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        // Atualizar atributo lang do HTML
        document.getElementById('html-root').setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        
        // Atualizar textos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Atualizar placeholders dos inputs
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Atualizar texto do botão de idioma
        const langText = langToggle.querySelector('.lang-text');
        langText.textContent = lang === 'pt' ? 'EN' : 'PT';

        // Atualizar link do CV
        updateCVLink(lang);

        // Atualizar aria-label do botão
        langToggle.setAttribute('aria-label', lang === 'pt' ? 'Alternar idioma' : 'Switch language');
    }

    function updateCVLink(lang) {
        const cvLink = document.getElementById('cv-download');
        if (cvLink) {
            if (lang === 'en') {
                cvLink.href = 'Otavio_Guedes_Resume.pdf';
            } else {
                cvLink.href = 'Otavio_Guedes_Curriculo.pdf';
            }
        }
    }
}
