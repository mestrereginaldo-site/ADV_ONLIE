// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site do Dr. Reginaldo Oliveira carregado!');
    
    // Menu Mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'var(--primary)';
            navMenu.style.padding = '20px';
            navMenu.style.gap = '20px';
            navMenu.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        });
    }
    
    // Contadores Animados
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
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
    
    // Formulário de Contato
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta dados
            const nome = form.querySelector('input[type="text"]').value;
            const telefone = form.querySelector('input[type="tel"]').value;
            const tipoCaso = form.querySelector('select').value;
            const descricao = form.querySelector('textarea').value;
            
            // Prepara mensagem para WhatsApp
            const mensagem = `*NOVA CONSULTA*%0A%0A` +
                            `*Nome:* ${nome}%0A` +
                            `*Telefone:* ${telefone}%0A` +
                            `*Tipo de Caso:* ${tipoCaso}%0A` +
                            `*Descrição:* ${descricao}%0A%0A` +
                            `*Enviado via Site*`;
            
            // Redireciona para WhatsApp
            window.open(`https://wa.me/5548999999999?text=${mensagem}`, '_blank');
            
            // Limpa formulário
            form.reset();
            
            // Feedback
            alert('Obrigado! Você será redirecionado para o WhatsApp para finalizar o agendamento.');
        });
    }
    
    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se aberto
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });
    
    // Atualiza ano no footer
    const yearSpan = document.querySelector('#currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Efeito de digitação no título (opcional)
    const titleLine = document.querySelector('.hero-title .title-line:first-child');
    if (titleLine && !titleLine.dataset.typed) {
        titleLine.dataset.typed = 'true';
        const text = titleLine.textContent;
        titleLine.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleLine.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});
