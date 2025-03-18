// Espera o DOM carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', function () {
    // ======= Menu Mobile =======
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Função para alternar o menu móvel
    function toggleMenu() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');

        // Impede rolagem quando o menu está aberto
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Event listeners para abrir/fechar o menu
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // Fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ======= Carrossel de Depoimentos =======
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentSlide = 0;
    const slideWidth = 100; // Largura em porcentagem

    // Função para navegar para um slide específico
    function goToSlide(index) {
        // Verificar se os elementos existem
        if (!track || slides.length === 0) return;

        // Verificações de limite
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Mover o carrossel
        track.style.transform = `translateX(-${index * slideWidth}%)`;
        currentSlide = index;

        // Atualizar indicadores de navegação
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Navegação com setas
    if (prevArrow) prevArrow.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    if (nextArrow) nextArrow.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Navegação com dots
    navDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    });

    // Autoplay do carrossel (opcional)
    let autoplayInterval;
    const carousel = document.querySelector('.testimonial-carousel');

    function startAutoplay() {
        if (slides.length > 1) {
            autoplayInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000); // Muda a cada 5 segundos
        }
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Iniciar autoplay se o carrossel existir
    if (carousel && slides.length > 0) {
        startAutoplay();

        // Parar autoplay quando o mouse estiver sobre o carrossel
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // ======= Animações ao rolar =======
    // Animar elementos quando entrarem na viewport
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .contact-form');

    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;

        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            // Verificar se o elemento está visível
            if (elementBottom > windowTop && elementTop < windowBottom) {
                element.classList.add('animate');
            }
        });
    }

    // Verificar elementos quando a página carrega e durante a rolagem
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);

    // ======= Formulário de Contato com EmailJS =======
    console.log("Inicializando setup do formulário de contato");

    // Verificar se a biblioteca EmailJS está disponível
    if (typeof emailjs === 'undefined') {
        console.error("Erro: EmailJS não está carregado. Certifique-se de adicionar o script do EmailJS antes deste código.");
    } else {
        // Inicializar EmailJS
        try {
            emailjs.init("bG-eBk7kIUfofoKx2"); // Sua chave pública correta
            console.log("EmailJS inicializado com sucesso");
        } catch (error) {
            console.error("Erro ao inicializar EmailJS:", error);
        }
    }

    // Obter referência ao formulário
    const contactForm = document.getElementById('contactForm');

    // Obter referência ao botão de submit
    const submitBtn = document.getElementById('submitBtn');

    console.log("Formulário encontrado:", !!contactForm);
    console.log("Botão encontrado:", !!submitBtn);

    if (contactForm && submitBtn) {
        // Flag para controlar estado de envio
        let isSubmitting = false;

        // Adicionar evento de clique ao botão
        submitBtn.addEventListener('click', function () {
            console.log("Botão de envio clicado");

            // Evitar múltiplos envios simultâneos
            if (isSubmitting) {
                console.log("Envio já em andamento. Aguarde...");
                return;
            }

            // Obter dados do formulário
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            console.log("Dados coletados:", { name, email });

            // Validar dados
            if (name === '') {
                document.getElementById('name').classList.add('error');
                alert('Por favor, informe seu nome.');
                return;
            } else {
                document.getElementById('name').classList.remove('error');
            }

            if (email === '' || !email.includes('@') || !email.includes('.')) {
                document.getElementById('email').classList.add('error');
                alert('Por favor, informe um email válido.');
                return;
            } else {
                document.getElementById('email').classList.remove('error');
            }

            if (message === '') {
                document.getElementById('message').classList.add('error');
                alert('Por favor, escreva uma mensagem.');
                return;
            } else {
                document.getElementById('message').classList.remove('error');
            }

            // Preparar envio
            const originalButtonText = submitBtn.textContent;

            // Atualizar estado do botão
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            isSubmitting = true;

            console.log("Preparando para enviar email");

            // Preparar parâmetros para o template
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: "thierrytibiaaugusto@gmail.com" // Email de destino
            };

            // Definir IDs do serviço e template
            const serviceID = 'service_4tgziib';
            const templateID = 'template_xlnkagm';

            // Definir timeout para evitar espera infinita
            const sendTimeout = setTimeout(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = originalButtonText;
                isSubmitting = false;
                alert('O envio demorou muito tempo. Por favor, tente novamente.');
            }, 30000); // 30 segundos de timeout

            console.log("Enviando email via EmailJS...");

            // Enviar email usando EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(function (response) {
                    // Limpar timeout
                    clearTimeout(sendTimeout);

                    // Log de sucesso
                    console.log('Mensagem enviada com sucesso:', response);

                    // Resetar formulário
                    contactForm.reset();

                    // Mostrar confirmação
                    alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
                })
                .catch(function (error) {
                    // Limpar timeout
                    clearTimeout(sendTimeout);

                    // Log de erro
                    console.error('Erro ao enviar mensagem:', error);

                    // Mensagem de erro específica
                    let errorMessage = 'Ocorreu um erro ao enviar sua mensagem.';

                    if (error.text) {
                        errorMessage += ' Detalhes: ' + error.text;
                    }

                    alert(errorMessage);
                })
                .finally(function () {
                    // Limpar timeout (caso ainda não tenha sido limpo)
                    clearTimeout(sendTimeout);

                    // Restaurar estado do botão
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalButtonText;

                    // Resetar flag de envio
                    isSubmitting = false;
                });
        });

        console.log("Event listener adicionado ao botão de envio");
    } else {
        console.error("Não foi possível configurar o formulário de contato: formulário ou botão não encontrado");
    }

    // ======= Links de Navegação Suave =======
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            const targetId = this.getAttribute('href').split('#')[1];
            if (!targetId) return;
    
            // Se estiver em outra página, redireciona para index.html com o id
            if (!document.getElementById(targetId)) {
                window.location.href = `index.html#${targetId}`;
                return;
            }
    
            // Se estiver na mesma página, faz a rolagem suave
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
    
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Adicionar estilo para animação aos elementos
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .service-card, .testimonial-card, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .testimonial-card.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border-color: #ff3c3c !important;
            box-shadow: 0 0 0 2px rgba(255, 60, 60, 0.1) !important;
        }
    </style>
`);