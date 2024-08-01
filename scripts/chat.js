
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
