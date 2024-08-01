document.addEventListener('DOMContentLoaded', function() {
    // URL del archivo JSON
    const jsonUrl = '/images.json';
    
    // Función para cargar imágenes desde el JSON
    function loadImages() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(images => {
                const container = document.getElementById('tres-imagenes');
                container.innerHTML = ''; // Limpiar el contenedor

                images.forEach(image => {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'imagen-item';
                    
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;

                    imageItem.appendChild(img);
                    container.appendChild(imageItem);
                });
            })
            .catch(error => console.error('Error al cargar las imágenes:', error));
    }

    // Cargar las imágenes cuando el DOM esté listo
    loadImages();
});
