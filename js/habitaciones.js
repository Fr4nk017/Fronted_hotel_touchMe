/* ========================================
   FUNCIONALIDAD DE PÁGINA DE HABITACIONES
   ======================================== */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ELEMENTOS DEL DOM ==========
    const habitacionesCards = document.querySelectorAll('.habitacion-card');
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const fechaEntrada = document.getElementById('fecha-entrada');
    const fechaSalida = document.getElementById('fecha-salida');
    const numHuespedes = document.getElementById('num-huespedes');
    const btnBuscar = document.querySelector('.btn-buscar');
    
    // ========== BASE DE DATOS DE RESEÑAS ==========
    
    /**
     * Reseñas organizadas por tipo de habitación
     * Cada habitación tiene un array de reseñas con usuario, estrellas, fecha y comentario
     */
    const reseñasPorHabitacion = {
        'Habitación Individual': [
            {
                usuario: 'María González',
                estrellas: 5,
                fecha: '15 Dic 2025',
                comentario: 'Perfecta para viaje de negocios. Muy limpia y cómoda. El escritorio es amplio y el WiFi excelente.'
            },
            {
                usuario: 'Carlos Ruiz',
                estrellas: 4,
                fecha: '8 Dic 2025',
                comentario: 'Buena relación calidad-precio. La cama es muy cómoda y el baño impecable.'
            },
            {
                usuario: 'Andrea Silva',
                estrellas: 5,
                fecha: '2 Dic 2025',
                comentario: 'Excelente ubicación y muy silenciosa. Ideal para descansar después de un día largo.'
            }
        ],
        'Habitación Doble': [
            {
                usuario: 'Javier y Paula',
                estrellas: 5,
                fecha: '20 Dic 2025',
                comentario: 'Perfecta para nuestra luna de miel. Espaciosa, romántica y con una vista increíble de Santiago.'
            },
            {
                usuario: 'Roberto Martínez',
                estrellas: 4,
                fecha: '14 Dic 2025',
                comentario: 'Muy cómoda para dos personas. Las camas son excelentes y el aire acondicionado funciona perfecto.'
            },
            {
                usuario: 'Camila Torres',
                estrellas: 5,
                fecha: '5 Dic 2025',
                comentario: 'Nos encantó! El servicio impecable y la habitación súper acogedora. Volveremos sin duda.'
            },
            {
                usuario: 'Fernando Lagos',
                estrellas: 4,
                fecha: '28 Nov 2025',
                comentario: 'Buena experiencia. La TV cable tiene buenos canales y todo estaba muy limpio.'
            }
        ],
        'Suite Presidencial': [
            {
                usuario: 'Diego Valenzuela',
                estrellas: 5,
                fecha: '22 Dic 2025',
                comentario: 'Simplemente espectacular! El jacuzzi, la vista panorámica, el minibar... todo de lujo. Vale cada peso.'
            },
            {
                usuario: 'Isabella Rojas',
                estrellas: 5,
                fecha: '18 Dic 2025',
                comentario: 'La mejor suite en la que he estado. La sala de estar es perfecta para reuniones y el servicio es 5 estrellas.'
            },
            {
                usuario: 'Patricio Soto',
                estrellas: 5,
                fecha: '10 Dic 2025',
                comentario: 'Celebramos nuestro aniversario aquí. Inolvidable! La cama king es enorme y el jacuzzi tiene vista a la ciudad.'
            },
            {
                usuario: 'Valentina Morales',
                estrellas: 4,
                fecha: '3 Dic 2025',
                comentario: 'Lujosa y elegante. El único detalle es que el minibar podría tener más variedad, pero todo lo demás perfecto.'
            }
        ],
        'Habitación Familiar': [
            {
                usuario: 'Familia Ramírez',
                estrellas: 5,
                fecha: '19 Dic 2025',
                comentario: 'Perfecta para viajar con niños. Espaciosa, segura y con todo lo necesario. Los niños quedaron encantados.'
            },
            {
                usuario: 'Claudia y José',
                estrellas: 4,
                fecha: '12 Dic 2025',
                comentario: 'Muy buena para familias. Tiene suficiente espacio y las camas son cómodas. Recomendada!'
            },
            {
                usuario: 'Daniela Pérez',
                estrellas: 5,
                fecha: '6 Dic 2025',
                comentario: 'Excelente para pasar vacaciones en familia. El personal muy atento con los niños.'
            }
        ]
    };
    
    // ========== INICIALIZACIÓN ==========
    
    // Establecer fecha mínima en los inputs (hoy)
    const hoy = new Date().toISOString().split('T')[0];
    if (fechaEntrada) {
        fechaEntrada.min = hoy;
        fechaEntrada.value = hoy;
    }
    
    // Establecer fecha de salida mínima (mañana)
    if (fechaSalida) {
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        fechaSalida.min = manana.toISOString().split('T')[0];
        fechaSalida.value = manana.toISOString().split('T')[0];
    }
    
    // ========== SISTEMA DE FILTROS ==========
    
    /**
     * Filtra las habitaciones según el tipo seleccionado
     * @param {string} tipo - El tipo de habitación a mostrar ('todas', 'individual', 'doble', 'suite')
     */
    function filtrarHabitaciones(tipo) {
        habitacionesCards.forEach(card => {
            // Si el filtro es "todas" o coincide con el data-tipo de la card
            if (tipo === 'todas' || card.dataset.tipo === tipo) {
                card.style.display = 'flex';
                // Pequeña animación de entrada
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transition = 'opacity 0.3s ease';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    /**
     * Maneja el click en los botones de filtro
     */
    filtroButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtroButtons.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el tipo de habitación del data-tipo
            const tipo = this.dataset.tipo;
            
            // Filtrar habitaciones
            filtrarHabitaciones(tipo);
        });
    });
    
    // ========== VALIDACIÓN DE FECHAS ==========
    
    /**
     * Valida que la fecha de salida sea posterior a la de entrada
     */
    if (fechaEntrada && fechaSalida) {
        fechaEntrada.addEventListener('change', function() {
            // La fecha de salida debe ser al menos un día después de la entrada
            const entrada = new Date(this.value);
            entrada.setDate(entrada.getDate() + 1);
            fechaSalida.min = entrada.toISOString().split('T')[0];
            
            // Si la fecha de salida es anterior, ajustarla
            if (fechaSalida.value && new Date(fechaSalida.value) <= new Date(this.value)) {
                fechaSalida.value = entrada.toISOString().split('T')[0];
            }
        });
    }
    
    // ========== CÁLCULO DE NOCHES Y PRECIO ==========
    
    /**
     * Calcula el número de noches entre dos fechas
     * @param {string} entrada - Fecha de entrada (formato YYYY-MM-DD)
     * @param {string} salida - Fecha de salida (formato YYYY-MM-DD)
     * @returns {number} Número de noches
     */
    function calcularNoches(entrada, salida) {
        const fecha1 = new Date(entrada);
        const fecha2 = new Date(salida);
        const diferencia = fecha2.getTime() - fecha1.getTime();
        return Math.ceil(diferencia / (1000 * 3600 * 24));
    }
    
    /**
     * Actualiza el precio mostrado según las noches seleccionadas
     */
    function actualizarPrecios() {
        if (!fechaEntrada.value || !fechaSalida.value) return;
        
        const noches = calcularNoches(fechaEntrada.value, fechaSalida.value);
        
        habitacionesCards.forEach(card => {
            const precioPorNoche = parseInt(card.dataset.precio);
            const precioTotal = precioPorNoche * noches;
            
            // Actualizar el texto del precio
            const precioValor = card.querySelector('.precio-valor');
            const precioPeriodo = card.querySelector('.precio-periodo');
            
            if (precioValor) {
                precioValor.textContent = `$${precioTotal.toLocaleString('es-CL')}`;
            }
            
            if (precioPeriodo) {
                precioPeriodo.textContent = `${noches} noche${noches > 1 ? 's' : ''}`;
            }
        });
    }
    
    // Escuchar cambios en las fechas
    if (fechaEntrada) fechaEntrada.addEventListener('change', actualizarPrecios);
    if (fechaSalida) fechaSalida.addEventListener('change', actualizarPrecios);
    
    // ========== BOTÓN BUSCAR ==========
    
    /**
     * Maneja el click en el botón buscar
     * Valida fechas y muestra habitaciones disponibles
     */
    if (btnBuscar) {
        btnBuscar.addEventListener('click', function() {
            // Validar que se hayan seleccionado fechas
            if (!fechaEntrada.value || !fechaSalida.value) {
                alert('Por favor selecciona las fechas de entrada y salida');
                return;
            }
            
            // Calcular noches
            const noches = calcularNoches(fechaEntrada.value, fechaSalida.value);
            
            // Mostrar mensaje de confirmación
            console.log(`Buscando habitaciones para ${noches} noche(s) y ${numHuespedes.value} huésped(es)`);
            
            // Actualizar precios
            actualizarPrecios();
            
            // Hacer scroll suave hasta las habitaciones
            const habitacionesGrid = document.querySelector('.habitaciones-grid');
            if (habitacionesGrid) {
                habitacionesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // ========== BOTONES DE ACCIÓN DE HABITACIONES ==========
    
    // Obtener elementos del modal
    const modal = document.getElementById('modal-detalles');
    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const modalCaracteristicas = document.getElementById('modal-caracteristicas');
    const modalResenasContainer = document.getElementById('modal-resenas-container');
    const modalPrecio = document.getElementById('modal-precio');
    const modalBtnReservar = document.getElementById('modal-btn-reservar');
    const modalCerrar = document.querySelector('.modal-cerrar');
    
    // Variable para guardar la habitación actual del modal
    let habitacionActualModal = null;
    
    /**
     * Crea el HTML para una reseña
     * @param {Object} resena - Objeto con datos de la reseña
     * @returns {string} HTML de la reseña
     */
    function crearHtmlResena(resena) {
        const estrellas = '⭐'.repeat(resena.estrellas);
        return `
            <div class="resena-item">
                <div class="resena-header">
                    <span class="resena-usuario">${resena.usuario}</span>
                    <span class="resena-estrellas">${estrellas}</span>
                </div>
                <div class="resena-fecha">${resena.fecha}</div>
                <p class="resena-comentario">"${resena.comentario}"</p>
            </div>
        `;
    }
    
    /**
     * Maneja el click en "Ver detalles"
     * Abre un modal con información completa de la habitación
     */
    document.querySelectorAll('.btn-detalles').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.habitacion-card');
            habitacionActualModal = card; // Guardar referencia
            
            // Obtener información de la habitación
            const titulo = card.querySelector('h2').textContent;
            const descripcion = card.querySelector('.habitacion-descripcion').textContent;
            const imagen = card.querySelector('.habitacion-imagen img').src;
            const precio = card.dataset.precio;
            const caracteristicas = card.querySelectorAll('.habitacion-caracteristicas li');
            
            // Llenar el modal con la información
            modalImg.src = imagen;
            modalImg.alt = titulo;
            modalTitulo.textContent = titulo;
            modalDescripcion.textContent = descripcion;
            modalPrecio.textContent = `$${parseInt(precio).toLocaleString('es-CL')}`;
            
            // Limpiar y llenar características
            modalCaracteristicas.innerHTML = '';
            caracteristicas.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.textContent;
                modalCaracteristicas.appendChild(li);
            });
            
            // Limpiar y llenar reseñas
            modalResenasContainer.innerHTML = '';
            const resenasHabitacion = reseñasPorHabitacion[titulo] || [];
            
            if (resenasHabitacion.length > 0) {
                resenasHabitacion.forEach(resena => {
                    modalResenasContainer.innerHTML += crearHtmlResena(resena);
                });
            } else {
                modalResenasContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 1rem;">No hay reseñas disponibles aún.</p>';
            }
            
            // Mostrar el modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Evitar scroll del body
            
            console.log(`Modal abierto: ${titulo}`);
        });
    });
    
    /**
     * Cerrar modal al hacer clic en la X
     */
    if (modalCerrar) {
        modalCerrar.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    /**
     * Cerrar modal al hacer clic fuera del contenido
     */
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    /**
     * Botón de reservar en el modal
     */
    if (modalBtnReservar) {
        modalBtnReservar.addEventListener('click', function() {
            // Cerrar modal
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            // Simular click en el botón de reservar de la tarjeta original
            if (habitacionActualModal) {
                const btnReservar = habitacionActualModal.querySelector('.btn-reservar');
                if (btnReservar) {
                    btnReservar.click();
                }
            }
        });
    }
    
    /**
     * Maneja el click en "Reservar ahora"
     */
    document.querySelectorAll('.btn-reservar').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.habitacion-card');
            const titulo = card.querySelector('h2').textContent;
            const precio = card.dataset.precio;
            
            // Validar fechas
            if (!fechaEntrada.value || !fechaSalida.value) {
                alert('Por favor selecciona las fechas de tu estadía');
                fechaEntrada.focus();
                return;
            }
            
            const noches = calcularNoches(fechaEntrada.value, fechaSalida.value);
            const precioTotal = parseInt(precio) * noches;
            
            // Crear objeto de reserva
            const reserva = {
                habitacion: titulo,
                tipo: card.dataset.tipo,
                fechaEntrada: fechaEntrada.value,
                fechaSalida: fechaSalida.value,
                noches: noches,
                huespedes: numHuespedes.value,
                precioTotal: precioTotal
            };
            
            // Guardar en localStorage (para usar en página de reserva)
            localStorage.setItem('reservaActual', JSON.stringify(reserva));
            
            // Verificar si el sistema de reservas está disponible
            if (typeof window.ReservaSistema !== 'undefined') {
                // Usar el sistema de reservas (requiere login)
                if (window.ReservaSistema.requerirAutenticacion()) {
                    // Usuario está logueado, procesar reserva
                    window.ReservaSistema.procesarReservaDesdeHabitaciones();
                }
            } else {
                // Sistema de reservas no cargado, mostrar mensaje simple
                const confirmar = confirm(
                    `Reserva de ${titulo}\n` +
                    `${noches} noche(s): $${precioTotal.toLocaleString('es-CL')}\n\n` +
                    `¿Deseas continuar con la reserva?\n\n` +
                    `Nota: Necesitas iniciar sesión para completar tu reserva.`
                );
                
                if (confirmar) {
                    // Redirigir al login
                    localStorage.setItem('paginaAnterior', window.location.href);
                    window.location.href = 'Login.html';
                }
            }
        });
    });
    
    // ========== ANIMACIONES AL SCROLL ==========
    
    /**
     * Observador para animar elementos al entrar en viewport
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación inicial y observar
    habitacionesCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // ========== BOTÓN DE RESERVA DEL HEADER ==========
    
    /**
     * Maneja el click en el botón "RESERVA AHORA" del header
     * Este botón funciona igual que en el index.html
     */
    const btnReservaHeader = document.querySelector('header .btn-reserva');
    
    if (btnReservaHeader) {
        btnReservaHeader.addEventListener('click', function() {
            // Verificar si hay usuario logueado
            const usuarioLogueado = localStorage.getItem('usuarioLogueado');
            
            if (usuarioLogueado) {
                // Usuario logueado - Scroll a la sección de habitaciones
                const habitacionesGrid = document.querySelector('.habitaciones-grid');
                if (habitacionesGrid) {
                    habitacionesGrid.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
                
                // Mostrar mensaje amigable
                const usuario = JSON.parse(usuarioLogueado);
                setTimeout(() => {
                    alert(`👋 Hola ${usuario.nombre}!\n\nSelecciona las fechas y la habitación que prefieras.`);
                }, 500);
            } else {
                // Usuario NO logueado - Preguntar si quiere iniciar sesión
                const respuesta = confirm(
                    '🏨 ¡Bienvenido a Hotel TouchMe!\n\n' +
                    'Para hacer una reserva necesitas iniciar sesión.\n\n' +
                    '¿Deseas iniciar sesión ahora?'
                );
                
                if (respuesta) {
                    // Guardar la página actual para volver después
                    localStorage.setItem('paginaAnterior', window.location.href);
                    window.location.href = 'Login.html';
                }
            }
        });
    }
    
    /**
     * Mostrar nombre del usuario en el botón del header si está logueado
     */
    function mostrarUsuarioEnHeader() {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado && btnReservaHeader) {
            const usuario = JSON.parse(usuarioLogueado);
            btnReservaHeader.innerHTML = `👤 ${usuario.nombre.split(' ')[0]}`;
            btnReservaHeader.title = 'Usuario logueado';
        }
    }
    
    // Ejecutar al cargar
    mostrarUsuarioEnHeader();
    
    console.log('Sistema de habitaciones inicializado correctamente ✅');
});
