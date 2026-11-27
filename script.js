document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle do Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Rolagem Suave (Smooth Scroll) com compensação da Navbar fixa
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                if (mobileMenu) mobileMenu.classList.add('hidden');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Efeito Glassmorphism na Navbar ao rolar
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (!nav) return;
        if (window.scrollY > 10) {
            nav.classList.add('shadow-md', 'bg-white/90', 'backdrop-blur-md');
        } else {
            nav.classList.remove('shadow-md', 'bg-white/90', 'backdrop-blur-md');
        }
    });

    // 4. Efeito de Digitação Dinâmico no Hero
    const typingElement = document.getElementById('typing-role');
    if (typingElement) {
        const roles = [
            'Data & Analytics',
            'Ciência de Dados & IA',
            'Python, SQL & Power BI',
            'Desenvolvedor ADS'
        ];
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let isDeleting = true;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
                typingElement.textContent = currentRole.substring(0, charIndex);
            } else {
                charIndex++;
                typingElement.textContent = currentRole.substring(0, charIndex);
            }

            let speed = isDeleting ? 45 : 85;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = 2200; // Pausa com o texto completo
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }

            setTimeout(typeLoop, speed);
        }

        setTimeout(typeLoop, 2200);
    }

    // 5. Filtro Interativo de Projetos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualiza estilo ativo dos botões
            filterButtons.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-white', 'text-gray-700');
            });
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.classList.add('bg-blue-600', 'text-white');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.classList.remove('opacity-0', 'scale-95');
                        card.classList.add('opacity-100', 'scale-100');
                    }, 20);
                } else {
                    card.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 200);
                }
            });
        });
    });

    // 6. Botão de Copiar E-mail com Feedback Visual
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    if (copyEmailBtn && emailText) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailText.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check mr-1.5 text-green-600"></i> Copiado!';
                copyEmailBtn.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-200');
                copyEmailBtn.classList.add('bg-green-50', 'text-green-700', 'border-green-300');

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                    copyEmailBtn.classList.remove('bg-green-50', 'text-green-700', 'border-green-300');
                    copyEmailBtn.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-200');
                }, 2500);
            });
        });
    }

    // 7. Animação de Scroll Reveal e Barras de Progresso
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-6');
                entry.target.classList.add('opacity-100', 'translate-y-0');

                // Anima a barra de progresso interna se for um card de habilidade
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const targetWidth = skillBar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            skillBar.style.width = targetWidth;
                        }, 150);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.skill-bubble, .timeline-item, .project-card');
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
        revealObserver.observe(el);
    });

    // 8. Feedback visual no envio do formulário
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check mr-2"></i> Abrindo cliente de e-mail...';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3000);
            }
        });
    }
});
