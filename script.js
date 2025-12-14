// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Altera o ícone do botão
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio real

            // Coleta dos dados
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const subject = formData.get('subject');

            // Exemplo: Redireciona para o WhatsApp com uma mensagem pré-preparada
            // Em um cenário real, aqui você enviaria os dados para um servidor/email
            const whatsappMessage = `Olá Dr. Reginaldo, meu nome é ${name}. Gostaria de falar sobre: ${subject}. Meu telefone é ${phone}.`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/5548999999999?text=${encodedMessage}`;

            // Simula um processamento
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Obrigado! Em instantes você será redirecionado para o WhatsApp para concluir o atendimento.');
                window.open(whatsappURL, '_blank');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset(); // Limpa o formulário
            }, 1500);
        });
    }

    // ===== ANIMAÇÃO AO ROLAR A PÁGINA =====
    // Adiciona uma classe 'scrolled' ao header quando a página é rolada
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '15px 0';
        }
    });

    // ===== ATUALIZA O ANO NO FOOTER =====
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ===== SUBSTITUI A IMAGEM DE LOGO PLACEHOLDER (exemplo) =====
    // Quando tiver o logo real, substitua o src abaixo
    const logoImg = document.getElementById('logo-img');
    // Exemplo: logoImg.src = "assets/logo-real.png";

    // ===== ROLAGEM SUAVE PARA LINKS ANCORA =====
    // (Já habilitada pelo CSS: html { scroll-behavior: smooth; })
    // Código adicional para links com hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Site do Dr. Reginaldo Oliveira carregado com sucesso!');
});
