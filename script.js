// Menu responsivo
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Formulário de contato (simulação)
const formContato = document.getElementById('form-contato');
if (formContato) {
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
        formContato.reset();
    });
}

// Newsletter footer
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert(`Obrigado por se inscrever com o email: ${email}`);
            this.reset();
        }
    });
}

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animação ao rolar
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.passo, .servico-card, .profissional-card').forEach(el => {
    observer.observe(el);
});
