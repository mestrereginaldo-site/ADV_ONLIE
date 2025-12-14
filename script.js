// Main Application Controller
class StrategicDefenseApp {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize all modules
        await this.loadModules();
        this.setupEventListeners();
        this.startAnimations();
        this.showSmartWhatsApp();
    }

    async loadModules() {
        // Load particles if available
        if (typeof particlesJS !== 'undefined') {
            await import('./particles-config.js');
        }
        
        // Load sound effects
        await import('./sound-effects.js');
        
        // Load case analyzer
        await import('./case-analyzer.js');
    }

    setupEventListeners() {
        // Custom cursor
        this.setupCustomCursor();
        
        // Navigation
        this.setupNavigation();
        
        // Case analyzer
        this.setupCaseAnalyzer();
        
        // Timeline controls
        this.setupTimelineControls();
        
        // Smart WhatsApp
        this.setupSmartWhatsApp();
    }

    setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor || document.body.classList.contains('no-js')) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .option-card, .case-control, .strategy-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    setupNavigation() {
        const navTrigger = document.querySelector('.nav-trigger');
        const navOverlay = document.querySelector('.nav-overlay');
        const closeOverlay = document.querySelector('.close-overlay');
        const navLinks = document.querySelectorAll('.overlay-menu a');

        if (navTrigger) {
            navTrigger.addEventListener('click', () => {
                navTrigger.classList.toggle('active');
                navOverlay.classList.toggle('active');
                document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
            });
        }

        if (closeOverlay) {
            closeOverlay.addEventListener('click', () => {
                navTrigger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navTrigger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-nav');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 14, 23, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(10, 14, 23, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    setupCaseAnalyzer() {
        const form = document.getElementById('caseAnalyzer');
        if (!form) return;

        const steps = form.querySelectorAll('.analyzer-step');
        const progressSteps = form.querySelectorAll('.progress-step');
        const nextBtn = form.querySelector('.btn-next');
        const prevBtn = form.querySelector('.btn-prev');
        const submitBtn = form.querySelector('.btn-submit');
        
        let currentStep = 1;
        const totalSteps = steps.length;
        const answers = {};

        // Initialize
        this.updateNavigation();

        // Next button
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                // Save current step answer
                this.saveStepAnswer(currentStep);
                
                // Hide current step
                steps[currentStep - 1].classList.remove('active');
                progressSteps[currentStep - 1].classList.remove('active');
                
                // Show next step
                currentStep++;
                steps[currentStep - 1].classList.add('active');
                progressSteps[currentStep - 1].classList.add('active');
                
                this.updateNavigation();
            }
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                // Hide current step
                steps[currentStep - 1].classList.remove('active');
                progressSteps[currentStep - 1].classList.remove('active');
                
                // Show previous step
                currentStep--;
                steps[currentStep - 1].classList.add('active');
                progressSteps[currentStep - 1].classList.add('active');
                
                this.updateNavigation();
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveStepAnswer(currentStep);
            this.generateAnalysis(answers);
        });

        // Update navigation buttons
        this.updateNavigation = () => {
            prevBtn.disabled = currentStep === 1;
            nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
            submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
        };

        // Save step answers
        this.saveStepAnswer = (step) => {
            const stepElement = steps[step - 1];
            const inputs = stepElement.querySelectorAll('input[type="radio"]:checked');
            inputs.forEach(input => {
                answers[input.name] = input.value;
            });
        };

        // Generate analysis
        this.generateAnalysis = (answers) => {
            const resultContainer = document.getElementById('analysisResult');
            const strategies = this.getStrategiesForCase(answers);
            
            resultContainer.innerHTML = `
                <div class="result-header">
                    <h3>ANÁLISE ESTRATÉGICA PRÉVIA</h3>
                    <div class="result-meta">
                        <span class="result-date">${new Date().toLocaleDateString()}</span>
                        <span class="result-id">REF: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                    </div>
                </div>
                
                <div class="result-summary">
                    <h4>RESUMO DO CASO</h4>
                    <p>Com base nas informações fornecidas, identificamos oportunidades estratégicas nas seguintes áreas:</p>
                </div>
                
                <div class="result-strategies">
                    ${strategies.map(strategy => `
                        <div class="strategy-recommendation">
                            <div class="strategy-icon">${strategy.icon}</div>
                            <div class="strategy-content">
                                <h5>${strategy.title}</h5>
                                <p>${strategy.description}</p>
                                <div class="strategy-actions">
                                    <span class="action-time">⏱️ ${strategy.time}</span>
                                    <span class="action-priority">${strategy.priority}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="result-cta">
                    <p>Esta análise preliminar indica a necessidade de uma avaliação detalhada. Para desenvolver uma estratégia completa:</p>
                    <a href="https://wa.me/${window.siteConfig.whatsappNumber}" class="btn btn-primary btn-holographic" target="_blank">
                        <span class="btn-text">AGENDAR CONSULTA ESTRATÉGICA</span>
                        <span class="btn-icon">→</span>
                    </a>
                </div>
            `;
            
            resultContainer.classList.add('active');
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        };

        // Get strategies based on answers
        this.getStrategiesForCase = (answers) => {
            const strategies = [];
            
            // Phase-based strategies
            if (answers.phase === 'investigacao') {
                strategies.push({
                    icon: '🕵️',
                    title: 'DEFESA NA FASE INVESTIGATIVA',
                    description: 'Atuação preventiva para evitar oferecimento da denúncia ou arquivamento do inquérito.',
                    time: 'AÇÃO IMEDIATA',
                    priority: 'ALTA PRIORIDADE'
                });
            }
            
            if (answers.gravity === 'alta') {
                strategies.push({
                    icon: '🚨',
                    title: 'CONTROLE DE DANOS',
                    description: 'Estratégia para redução de pena-base e negociação de qualificadoras.',
                    time: 'PLANEJAMENTO URGENTE',
                    priority: 'MÁXIMA PRIORIDADE'
                });
            }
            
            if (answers.urgency === 'alta') {
                strategies.push({
                    icon: '⚡',
                    title: 'AÇÕES IMEDIATAS',
                    description: 'Protocolo de emergência para preservação de direitos e recursos.',
                    time: 'EXECUÇÃO IMEDIATA',
                    priority: 'EMERGÊNCIA'
                });
            }
            
            // Default strategies
            strategies.push({
                icon: '📋',
                title: 'ANÁLISE FORENSE COMPLETA',
                description: 'Revisão detalhada de todo o processo para identificação de nulidades e vícios.',
                time: '48-72 HORAS',
                priority: 'PRIORIDADE MÉDIA'
            });
            
            return strategies;
        };
    }

    setupTimelineControls() {
        const track = document.querySelector('.timeline-track');
        const prevBtn = document.querySelector('.prev-case');
        const nextBtn = document.querySelector('.next-case');
        const cards = document.querySelectorAll('.case-card');
        
        if (!track || !cards.length) return;

        let currentPosition = 0;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
        const maxPosition = (cards.length - 3) * cardWidth;

        nextBtn.addEventListener('click', () => {
            if (currentPosition > -maxPosition) {
                currentPosition -= cardWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentPosition < 0) {
                currentPosition += cardWidth;
                track.style.transform = `translateX(${currentPosition}px)`;
            }
        });
    }

    setupSmartWhatsApp() {
        const whatsapp = document.getElementById('smart-whatsapp');
        const minimizeBtn = whatsapp?.querySelector('.whatsapp-minimize');
        const header = whatsapp?.querySelector('.whatsapp-header');
        const optionBtns = whatsapp?.querySelectorAll('.option-btn');

        if (!whatsapp) return;

        // Show after delay
        setTimeout(() => {
            whatsapp.classList.add('active');
        }, 5000);

        // Minimize functionality
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                whatsapp.classList.toggle('minimized');
                minimizeBtn.textContent = whatsapp.classList.contains('minimized') ? '+' : '−';
            });
        }

        // Expand on header click
        if (header) {
            header.addEventListener('click', () => {
                whatsapp.classList.remove('minimized');
                if (minimizeBtn) minimizeBtn.textContent = '−';
            });
        }

        // Option buttons
        optionBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                const option = btn.dataset.option;
                this.handleWhatsAppOption(option);
            });
        });
    }

    handleWhatsAppOption(option) {
        const messages = {
            consulta: 'Olá, gostaria de agendar uma consulta presencial.',
            online: 'Olá, gostaria de agendar uma consulta online.',
            analise: 'Olá, gostaria de enviar documentos para análise.',
            emergencia: 'URGENTE: Preciso de assistência imediata em caso penal.'
        };

        const message = messages[option] || 'Olá, gostaria de mais informações.';
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${window.siteConfig.whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
    }

    startAnimations() {
        // Typing effect
        this.initTypingEffect();
        
        // Counter animations
        this.initCounters();
        
        // Scroll animations
        this.initScrollAnimations();
        
        // Loading screen
        this.hideLoadingScreen();
    }

    initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-text');
        typingElements.forEach((element, index) => {
            const text = element.dataset.text;
            const delay = parseInt(element.dataset.delay) || 0;
            
            setTimeout(() => {
                let i = 0;
                const speed = 50; // milliseconds per character
                
                const typeWriter = () => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    } else {
                        element.querySelector('::after')?.remove();
                    }
                };
                
                typeWriter();
            }, delay);
        });
    }

    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.strategy-card, .case-card, .analyzer-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 3000); // 3 second loading simulation
    }

    showSmartWhatsApp() {
        // Show WhatsApp after user engagement
        let engagementDetected = false;
        
        const engagementEvents = ['scroll', 'mousemove', 'click', 'keydown'];
        
        const showWhatsApp = () => {
            if (!engagementDetected) {
                engagementDetected = true;
                const whatsapp = document.getElementById('smart-whatsapp');
                setTimeout(() => {
                    whatsapp?.classList.add('active');
                }, 2000);
                
                // Remove listeners
                engagementEvents.forEach(event => {
                    document.removeEventListener(event, showWhatsApp);
                });
            }
        };
        
        engagementEvents.forEach(event => {
            document.addEventListener(event, showWhatsApp, { once: true });
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StrategicDefenseApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StrategicDefenseApp;
}
