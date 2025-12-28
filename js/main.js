// ===========================================
// MAIN.JS - Archivo principal de JavaScript
// ===========================================

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏨 Hotel TouchMe - Página cargada');
    
    // Inicializar todas las funcionalidades
    initCarousel();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    
    console.log('✅ Todas las funcionalidades inicializadas');
});

// Función para inicializar scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para el formulario de contacto (placeholder)
function initContactForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Formulario enviado');
            alert('¡Gracias por tu interés! Te contactaremos pronto.');
        });
    });
}

// Función para mostrar/ocultar loading
function showLoading() {
    console.log('⏳ Cargando...');
}

function hideLoading() {
    console.log('✅ Carga completada');
}

// Utilidades generales
const Utils = {
    // Formatear fechas
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-ES').format(date);
    },
    
    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Animar elementos
    animateElement: function(element, animation) {
        element.classList.add(animation);
        setTimeout(() => {
            element.classList.remove(animation);
        }, 1000);
    }
};
