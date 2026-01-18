// Carrusel de imágenes para la galería del hotel
// Este script permite navegar entre las imágenes con botones y también cambia automáticamente cada 5 segundos.

// Selecciona todos los slides del carrusel
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
let currentIndex = 0;
let autoInterval;

// Función para mostrar el slide actual y ocultar los demás
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
}

// Función para avanzar al siguiente slide
function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// Función para retroceder al slide anterior
function prevSlide() {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

// Función para ir a un slide específico (usando los indicadores)
function goToSlide(index) {
    showSlide(index);
}

// Iniciar el carrusel automático
function startAutoSlide() {
    autoInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
}

// Detener el carrusel automático
function stopAutoSlide() {
    clearInterval(autoInterval);
}

// Eventos de los botones
if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });

// Eventos de los indicadores
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => { goToSlide(i); stopAutoSlide(); startAutoSlide(); });
});

// Inicializa el carrusel al cargar la página
showSlide(currentIndex);
startAutoSlide();

// Puedes modificar el tiempo de cambio automático ajustando el valor en setInterval.
// Si quieres solo manual, elimina las funciones startAutoSlide y stopAutoSlide.
