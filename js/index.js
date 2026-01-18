/* ========================================
   FUNCIONALIDAD PÁGINA PRINCIPAL - INDEX
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== BOTONES DE RESERVA ==========
    
    /**
     * Obtiene todos los botones de reserva en la página
     */
    const botonesReserva = document.querySelectorAll('.btn-reserva, .btn-reserva-hero');
    
    /**
     * Verifica si el usuario está logueado
     * @returns {Object|null} Datos del usuario o null
     */
    function verificarSesion() {
        const usuario = localStorage.getItem('usuarioLogueado');
        return usuario ? JSON.parse(usuario) : null;
    }
    
    /**
     * Maneja el click en los botones de reserva
     */
    botonesReserva.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const usuario = verificarSesion();
            
            if (usuario) {
                // Usuario logueado, ir a Habitaciones directamente
                console.log(`Usuario ${usuario.nombre} logueado, redirigiendo a habitaciones...`);
                window.location.href = 'src/pages/Habitaciones.html';
            } else {
                // Usuario NO logueado, mostrar opciones
                const respuesta = confirm(
                    '🏨 ¡Bienvenido a Hotel TouchMe!\n\n' +
                    'Para hacer una reserva necesitas iniciar sesión.\n\n' +
                    '¿Deseas iniciar sesión ahora?'
                );
                
                if (respuesta) {
                    // Guardar que venía del index para volver después
                    localStorage.setItem('paginaAnterior', window.location.href);
                    window.location.href = 'src/pages/Login.html';
                } else {
                    // Puede ver habitaciones sin reservar
                    const verHabitaciones = confirm(
                        '¿Quieres ver las habitaciones disponibles de todas formas?'
                    );
                    
                    if (verHabitaciones) {
                        window.location.href = 'src/pages/Habitaciones.html';
                    }
                }
            }
        });
    });
    
    // ========== MOSTRAR USUARIO EN HEADER ==========
    
    /**
     * Muestra el nombre del usuario en el header si está logueado
     */
    function mostrarUsuarioHeader() {
        const usuario = verificarSesion();
        const btnReservaHeader = document.querySelector('header .btn-reserva');
        
        if (usuario && btnReservaHeader) {
            // Cambiar el texto del botón para mostrar el usuario
            btnReservaHeader.innerHTML = `👤 ${usuario.nombre.split(' ')[0]}`;
            btnReservaHeader.title = 'Haz clic para ver habitaciones';
        }
    }
    
    // Ejecutar al cargar
    mostrarUsuarioHeader();
    
    // ========== NAVEGACIÓN SUAVE A SECCIONES ==========
    
    /**
     * Hace scroll suave a una sección específica
     * @param {string} seccionId - ID de la sección (sin #)
     */
    function scrollASección(seccionId) {
        const seccion = document.getElementById(seccionId);
        if (seccion) {
            seccion.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            console.log(`✅ Navegando a sección: ${seccionId}`);
        }
    }
    
    /**
     * Verifica si viene de otra página con hash en la URL
     */
    function verificarHashEnURL() {
        const hash = window.location.hash;
        if (hash) {
            // Remover el # del hash
            const seccionId = hash.substring(1);
            
            // Esperar un poco para que cargue el DOM completamente
            setTimeout(() => {
                scrollASección(seccionId);
            }, 300);
        }
    }
    
    // Ejecutar al cargar la página
    verificarHashEnURL();
    
    /**
     * Agregar listeners a todos los enlaces internos
     */
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');
    enlacesInternos.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const seccionId = href.substring(1);
                scrollASección(seccionId);
                
                // Actualizar la URL sin recargar la página
                history.pushState(null, null, href);
            }
        });
    });
    
    // ========== MENÚ MÓVIL ==========
    
    const menuBtn = document.querySelector('.menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // ========== BOTONES DE EXPERIENCIAS ==========
    
    /**
     * Información detallada de cada experiencia
     */
    const experienciasInfo = {
        'Tour por Santiago': {
            precio: '$45.000 por persona',
            incluye: ['Guía profesional', 'Transporte privado', 'Entradas a monumentos', 'Agua embotellada'],
            nota: 'Disponible todos los días excepto lunes'
        },
        'Ruta del Vino': {
            precio: '$89.000 por persona',
            incluye: ['Transporte ida y vuelta', 'Visita a 3 viñedos', 'Degustación de 12 vinos', 'Almuerzo gourmet'],
            nota: 'Salida: 9:00 AM | Regreso: 6:00 PM'
        },
        'Spa & Wellness': {
            precio: 'Desde $35.000',
            incluye: ['Acceso a sauna y piscina', 'Masaje de 60 minutos', 'Tratamiento facial', 'Té herbal'],
            nota: 'Reserva con 24 horas de anticipación'
        },
        'Ski en la Cordillera': {
            precio: '$120.000 por persona',
            incluye: ['Transporte', 'Ticket de ski full day', 'Alquiler de equipamiento', 'Almuerzo en cafetería'],
            nota: 'Temporada: Junio a Septiembre'
        },
        'Arte & Cultura': {
            precio: '$38.000 por persona',
            incluye: ['Guía especializado en arte', 'Entrada a 3 museos', 'Visita a galería privada', 'Café en centro cultural'],
            nota: 'Martes a domingo, 10:00 AM'
        },
        'Food Tour Santiago': {
            precio: '$55.000 por persona',
            incluye: ['6 paradas gastronómicas', 'Degustaciones incluidas', 'Guía foodie local', 'Bebidas en cada parada'],
            nota: 'Almuerzo o cena disponible'
        }
    };
    
    /**
     * Maneja el click en los botones de experiencias
     */
    const botonesExperiencias = document.querySelectorAll('.btn-experiencia');
    botonesExperiencias.forEach(boton => {
        boton.addEventListener('click', function() {
            const card = this.closest('.exp-card');
            const titulo = card.querySelector('h3').textContent;
            const info = experienciasInfo[titulo];
            
            if (info) {
                let mensaje = `🎯 ${titulo}\n\n`;
                mensaje += `💰 Precio: ${info.precio}\n\n`;
                mensaje += `✅ Incluye:\n`;
                info.incluye.forEach(item => {
                    mensaje += `  • ${item}\n`;
                });
                mensaje += `\n📌 ${info.nota}\n\n`;
                mensaje += `¿Deseas reservar esta experiencia?`;
                
                const reservar = confirm(mensaje);
                
                if (reservar) {
                    const usuario = verificarSesion();
                    if (usuario) {
                        alert(`¡Excelente elección, ${usuario.nombre}!\n\nNuestro concierge se pondrá en contacto contigo para confirmar los detalles.`);
                    } else {
                        const irLogin = confirm('Necesitas iniciar sesión para reservar experiencias.\n\n¿Deseas iniciar sesión ahora?');
                        if (irLogin) {
                            localStorage.setItem('paginaAnterior', window.location.href);
                            window.location.href = 'src/pages/Login.html';
                        }
                    }
                }
            }
        });
    });
    
    console.log('✅ Funcionalidad del index inicializada');
});
