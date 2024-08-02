

// JavaScript para el carrusel
const carrusel = document.getElementById('carrusel');
const items = carrusel.getElementsByClassName('carousel-item');
const indicators = carrusel.getElementsByClassName('indicator');
let currentIndex = 0;

console.log(items)

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

