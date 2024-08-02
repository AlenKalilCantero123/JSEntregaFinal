
// JavaScript para desplegar el chat
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
}

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