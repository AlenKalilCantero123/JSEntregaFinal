
document.addEventListener("DOMContentLoaded", function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar ul');

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });
});


// JavaScript para desplegar el chat
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
}


// JavaScript para el carrusel
const carrusel = document.getElementById('carrusel');
const items = carrusel.getElementsByClassName('carousel-item');
const indicators = carrusel.getElementsByClassName('indicator');
let currentIndex = 0;

// Función para mostrar un item específico
function showItem(index) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
        indicators[i].classList.remove('active');
    }
    items[index].classList.add('active');
    indicators[index].classList.add('active');
}

// Función para mostrar el siguiente item
function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
}

// Función para mostrar el item anterior
function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
}

// Event listeners para los controles de navegación
document.querySelector('.carousel-control-next').addEventListener('click', nextItem);
document.querySelector('.carousel-control-prev').addEventListener('click', prevItem);

// Event listeners para los indicadores
for (let i = 0; i < indicators.length; i++) {
    indicators[i].addEventListener('click', () => showItem(i));
}

// Auto-rotación del carrusel cada 4 segundos
setInterval(nextItem, 4000);


// Función para enviar un mensaje en el chat
function sendMessage(question) {
    const chatContent = document.querySelector('.chat-content');

    // Muestra el mensaje del usuario
    const userMessage = document.createElement('div');
    userMessage.className = 'message';
    userMessage.textContent = question;
    chatContent.appendChild(userMessage);

    // Muestra la respuesta automática después de una pequeña pausa
    setTimeout(() => {
        const response = getResponse(question);
        const botMessage = document.createElement('div');
        botMessage.className = 'message';
        botMessage.textContent = response;
        chatContent.appendChild(botMessage);

        // Desplaza el chat hacia abajo para mostrar el último mensaje
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 1000);
}

// Función para obtener la respuesta basada en la pregunta
function getResponse(question) {
    switch (question) {
        case '¿En qué zona trabajas?':
            return '¡Hola! Aunque amo viajar, actualmente estoy establecido en la Ciudad Autónoma de Buenos Aires y también trabajo en los alrededores. Si te encuentras fuera de esta área, podemos coordinar con tiempo de antelación. Contáctame al 1160432536 o alen_kalil_cantero@hotmail.com.';
        case '¿Cuánto demora la entrega del trabajo?':
            return 'Se envía una muestra de hasta 20 fotos dentro de las 48 horas. El contenido completo puede demorar hasta 10 días hábiles, dependiendo de la cantidad solicitada.';
        case '¿Haces videos también?':
            return 'Trabajo con un colega para la producción de videos, lo que me permite dedicarme al 100% a la fotografía mientras él se encarga de filmar el evento. Si deseas saber más sobre sus trabajos, haz clic aquí.';
        case '¿Realizas otros tipos de trabajo?':
            return '¡Por supuesto! Lo publicitado es solo a modo ilustrativo, pero soy versátil en cuanto a los proyectos a realizar. No dudes en contactarme con los detalles de tu proyecto haciendo clic aquí.';
        case 'Tengo otra consulta':
            return 'En ese caso, te dejo a disposición el link de contacto haciendo clic AQUÍ.';
        default:
            return 'Lo siento, no entendí tu pregunta. Por favor, intenta nuevamente.';
    }
}