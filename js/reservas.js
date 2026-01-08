/* ========================================
   SISTEMA DE RESERVAS - HOTEL TOUCHME
   ======================================== */

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== VERIFICAR AUTENTICACIÓN ==========
    
    /**
     * Verifica si el usuario está logueado
     * @returns {Object|null} Datos del usuario o null si no está logueado
     */
    function verificarAutenticacion() {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            return JSON.parse(usuarioLogueado);
        }
        return null;
    }
    
    /**
     * Redirige al login si el usuario no está autenticado
     */
    function requerirAutenticacion() {
        const usuario = verificarAutenticacion();
        if (!usuario) {
            alert('Debes iniciar sesión para hacer una reserva');
            // Guardar la página actual para volver después del login
            localStorage.setItem('paginaAnterior', window.location.href);
            window.location.href = '../pages/Login.html';
            return false;
        }
        return true;
    }
    
    // ========== GESTIÓN DE RESERVAS ==========
    
    /**
     * Guarda una nueva reserva en localStorage
     * @param {Object} reserva - Objeto con los datos de la reserva
     * @returns {boolean} true si se guardó correctamente
     */
    function guardarReserva(reserva) {
        try {
            // Obtener reservas existentes
            let reservas = localStorage.getItem('reservasHotel');
            reservas = reservas ? JSON.parse(reservas) : [];
            
            // Agregar ID único y fecha de creación
            reserva.id = Date.now().toString();
            reserva.fechaCreacion = new Date().toISOString();
            reserva.estado = 'Pendiente'; // Estados: Pendiente, Confirmada, Cancelada
            
            // Agregar nueva reserva
            reservas.push(reserva);
            
            // Guardar en localStorage
            localStorage.setItem('reservasHotel', JSON.stringify(reservas));
            
            console.log('✅ Reserva guardada exitosamente:', reserva);
            return true;
        } catch (error) {
            console.error('❌ Error al guardar la reserva:', error);
            return false;
        }
    }
    
    /**
     * Obtiene todas las reservas del usuario actual
     * @returns {Array} Array de reservas del usuario
     */
    function obtenerReservasUsuario() {
        const usuario = verificarAutenticacion();
        if (!usuario) return [];
        
        let reservas = localStorage.getItem('reservasHotel');
        reservas = reservas ? JSON.parse(reservas) : [];
        
        // Filtrar solo las reservas del usuario actual
        return reservas.filter(r => r.usuario === usuario.email || r.usuario === usuario.nombre);
    }
    
    /**
     * Cancela una reserva por su ID
     * @param {string} reservaId - ID de la reserva a cancelar
     * @returns {boolean} true si se canceló correctamente
     */
    function cancelarReserva(reservaId) {
        try {
            let reservas = localStorage.getItem('reservasHotel');
            reservas = reservas ? JSON.parse(reservas) : [];
            
            // Encontrar la reserva y cambiar su estado
            const index = reservas.findIndex(r => r.id === reservaId);
            if (index !== -1) {
                reservas[index].estado = 'Cancelada';
                reservas[index].fechaCancelacion = new Date().toISOString();
                localStorage.setItem('reservasHotel', JSON.stringify(reservas));
                console.log('✅ Reserva cancelada:', reservaId);
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Error al cancelar la reserva:', error);
            return false;
        }
    }
    
    // ========== PROCESAMIENTO DE RESERVA ==========
    
    /**
     * Procesa una nueva reserva desde habitaciones.js
     * Esta función se llama cuando el usuario hace clic en "Reservar ahora"
     */
    function procesarReservaDesdeHabitaciones() {
        // Verificar autenticación primero
        if (!requerirAutenticacion()) {
            return;
        }
        
        // Obtener datos de la reserva temporal de localStorage
        const reservaTemporal = localStorage.getItem('reservaActual');
        if (!reservaTemporal) {
            console.error('❌ No hay datos de reserva');
            return;
        }
        
        const datosReserva = JSON.parse(reservaTemporal);
        const usuario = verificarAutenticacion();
        
        // Agregar información del usuario
        datosReserva.usuario = usuario.email || usuario.nombre;
        datosReserva.nombreCompleto = usuario.nombre;
        datosReserva.telefono = usuario.telefono || 'No especificado';
        
        // Guardar la reserva
        if (guardarReserva(datosReserva)) {
            // Limpiar reserva temporal
            localStorage.removeItem('reservaActual');
            
            // Mostrar confirmación
            mostrarConfirmacionReserva(datosReserva);
        } else {
            alert('❌ Error al procesar la reserva. Por favor intenta nuevamente.');
        }
    }
    
    /**
     * Muestra la confirmación de la reserva
     * @param {Object} reserva - Datos de la reserva confirmada
     */
    function mostrarConfirmacionReserva(reserva) {
        const mensaje = `
🎉 ¡Reserva Confirmada!

📋 Detalles de tu reserva:
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏨 Habitación: ${reserva.habitacion}
📅 Check-in: ${formatearFecha(reserva.fechaEntrada)}
📅 Check-out: ${formatearFecha(reserva.fechaSalida)}
🌙 Noches: ${reserva.noches}
👥 Huéspedes: ${reserva.huespedes}
💰 Total: $${reserva.precioTotal.toLocaleString('es-CL')}
━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Te enviaremos un correo de confirmación a tu email.

ID de reserva: ${reserva.id}
        `;
        
        alert(mensaje);
        
        // Opcional: Redirigir a una página de confirmación o mis reservas
        // window.location.href = 'MisReservas.html';
    }
    
    /**
     * Formatea una fecha en formato legible
     * @param {string} fecha - Fecha en formato YYYY-MM-DD
     * @returns {string} Fecha formateada
     */
    function formatearFecha(fecha) {
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const fechaObj = new Date(fecha + 'T00:00:00');
        return fechaObj.toLocaleDateString('es-CL', opciones);
    }
    
    // ========== CALCULAR PRECIO TOTAL ==========
    
    /**
     * Calcula el precio total de una reserva
     * @param {number} precioPorNoche - Precio por noche de la habitación
     * @param {number} noches - Número de noches
     * @param {number} huespedes - Número de huéspedes
     * @returns {Object} Objeto con desglose de precios
     */
    function calcularPrecioTotal(precioPorNoche, noches, huespedes) {
        const subtotal = precioPorNoche * noches;
        
        // Cargo adicional por huésped extra (si son más de 2)
        let cargoExtra = 0;
        if (huespedes > 2) {
            cargoExtra = (huespedes - 2) * 10000 * noches; // $10.000 por huésped extra por noche
        }
        
        // IVA (19% en Chile)
        const iva = Math.round((subtotal + cargoExtra) * 0.19);
        
        // Total
        const total = subtotal + cargoExtra + iva;
        
        return {
            subtotal,
            cargoExtra,
            iva,
            total
        };
    }
    
    // ========== VALIDACIONES ==========
    
    /**
     * Valida que las fechas de la reserva sean correctas
     * @param {string} fechaEntrada - Fecha de entrada (YYYY-MM-DD)
     * @param {string} fechaSalida - Fecha de salida (YYYY-MM-DD)
     * @returns {Object} Resultado de la validación
     */
    function validarFechas(fechaEntrada, fechaSalida) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const entrada = new Date(fechaEntrada + 'T00:00:00');
        const salida = new Date(fechaSalida + 'T00:00:00');
        
        // Validar que la fecha de entrada no sea en el pasado
        if (entrada < hoy) {
            return {
                valido: false,
                mensaje: 'La fecha de entrada no puede ser en el pasado'
            };
        }
        
        // Validar que la fecha de salida sea posterior a la de entrada
        if (salida <= entrada) {
            return {
                valido: false,
                mensaje: 'La fecha de salida debe ser posterior a la de entrada'
            };
        }
        
        // Validar que no sea más de 30 días
        const diferenciaDias = (salida - entrada) / (1000 * 60 * 60 * 24);
        if (diferenciaDias > 30) {
            return {
                valido: false,
                mensaje: 'La reserva no puede ser mayor a 30 días'
            };
        }
        
        return {
            valido: true,
            mensaje: 'Fechas válidas'
        };
    }
    
    // ========== EXPORTAR FUNCIONES GLOBALES ==========
    
    // Hacer las funciones disponibles globalmente
    window.ReservaSistema = {
        verificarAutenticacion,
        requerirAutenticacion,
        guardarReserva,
        obtenerReservasUsuario,
        cancelarReserva,
        procesarReservaDesdeHabitaciones,
        calcularPrecioTotal,
        validarFechas,
        formatearFecha
    };
    
    console.log('✅ Sistema de reservas inicializado correctamente');
});
