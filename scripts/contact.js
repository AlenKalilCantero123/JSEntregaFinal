document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Aquí puedes reemplazar 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', y 'YOUR_USER_ID' con tus credenciales de EmailJS
        emailjs.sendForm('service_xcxkep8', 'template_hrskyho', this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                swal("Mensaje Enviado", "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.", "success");
                form.reset(); // Resetea el formulario después de enviar
            }, function (error) {
                console.log('FAILED...', error);
                swal("Error", "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.", "error");
            });
    });
});



(function(){
    emailjs.init('BbtPxeKXalnjyS5f2'); // Reemplaza 'YOUR_USER_ID' con tu ID de usuario EmailJS
})();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.sendForm('service_xcxkep8', 'template_hrskyho', this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                swal("Mensaje Enviado", "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.", "success");
                form.reset(); // Resetea el formulario después de enviar
            }, function (error) {
                console.log('FAILED...', error);
                swal("Error", "Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.", "error");
            });
    });
});