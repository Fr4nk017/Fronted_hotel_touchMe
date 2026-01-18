/* ========================================
   SISTEMA DE AUTENTICACIÓN - LOGIN
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ELEMENTOS DEL DOM ==========
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const loginFormContainer = document.getElementById('login-form');
    const registroFormContainer = document.getElementById('registro-form');
    const mostrarRegistroBtn = document.getElementById('mostrar-registro');
    const mostrarLoginBtn = document.getElementById('mostrar-login');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // ========== CAMBIAR ENTRE LOGIN Y REGISTRO ==========
    
    /**
     * Muestra el formulario de registro y oculta el de login
     */
    if (mostrarRegistroBtn) {
        mostrarRegistroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormContainer.style.display = 'none';
            registroFormContainer.style.display = 'block';
            limpiarMensajes();
        });
    }
    
    /**
     * Muestra el formulario de login y oculta el de registro
     */
    if (mostrarLoginBtn) {
        mostrarLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registroFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
            limpiarMensajes();
        });
    }
    
    // ========== MOSTRAR/OCULTAR CONTRASEÑA ==========
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈 Ocultar';
            } else {
                input.type = 'password';
                this.textContent = '👁️ Mostrar';
            }
        });
    });
    
    // ========== GESTIÓN DE USUARIOS ==========
    
    /**
     * Obtiene todos los usuarios registrados
     * @returns {Array} Array de usuarios
     */
    function obtenerUsuarios() {
        const usuarios = localStorage.getItem('usuariosHotel');
        return usuarios ? JSON.parse(usuarios) : [];
    }
    
    /**
     * Guarda un nuevo usuario
     * @param {Object} usuario - Datos del usuario
     * @returns {boolean} true si se guardó correctamente
     */
    function guardarUsuario(usuario) {
        try {
            const usuarios = obtenerUsuarios();
            usuarios.push(usuario);
            localStorage.setItem('usuariosHotel', JSON.stringify(usuarios));
            console.log('✅ Usuario registrado:', usuario.email);
            return true;
        } catch (error) {
            console.error('❌ Error al guardar usuario:', error);
            return false;
        }
    }
    
    /**
     * Busca un usuario por email
     * @param {string} email - Email del usuario
     * @returns {Object|null} Usuario encontrado o null
     */
    function buscarUsuarioPorEmail(email) {
        const usuarios = obtenerUsuarios();
        return usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    
    /**
     * Guarda la sesión del usuario
     * @param {Object} usuario - Datos del usuario
     */
    function guardarSesion(usuario, recordar = false) {
        // Guardar en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        
        // Si seleccionó "recordarme", guardar en sessionStorage también
        if (recordar) {
            sessionStorage.setItem('recordarUsuario', 'true');
        }
        
        console.log('✅ Sesión iniciada para:', usuario.email);
    }
    
    /**
     * Cierra la sesión del usuario
     */
    function cerrarSesion() {
        localStorage.removeItem('usuarioLogueado');
        sessionStorage.removeItem('recordarUsuario');
        console.log('✅ Sesión cerrada');
    }
    
    // ========== VALIDACIONES ==========
    
    /**
     * Valida el formato del email
     * @param {string} email - Email a validar
     * @returns {boolean} true si es válido
     */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    /**
     * Valida la contraseña
     * @param {string} password - Contraseña a validar
     * @returns {Object} Resultado de la validación
     */
    function validarPassword(password) {
        if (password.length < 6) {
            return {
                valido: false,
                mensaje: 'La contraseña debe tener al menos 6 caracteres'
            };
        }
        return {
            valido: true,
            mensaje: 'Contraseña válida'
        };
    }
    
    /**
     * Valida el teléfono chileno
     * @param {string} telefono - Teléfono a validar
     * @returns {boolean} true si es válido
     */
    function validarTelefono(telefono) {
        // Acepta formatos: +56912345678, 912345678, +56 9 1234 5678, etc.
        const regex = /^(\+?56)?[\s-]?9[\s-]?\d{4}[\s-]?\d{4}$/;
        return regex.test(telefono.replace(/\s/g, ''));
    }
    
    // ========== MENSAJES ==========
    
    /**
     * Muestra un mensaje de error
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - 'login' o 'registro'
     */
    function mostrarError(mensaje, tipo) {
        const errorDiv = document.getElementById(`mensaje-error-${tipo}`);
        if (errorDiv) {
            errorDiv.textContent = mensaje;
            errorDiv.classList.add('mostrar');
            
            // Ocultar después de 5 segundos
            setTimeout(() => {
                errorDiv.classList.remove('mostrar');
            }, 5000);
        }
    }
    
    /**
     * Limpia todos los mensajes de error
     */
    function limpiarMensajes() {
        const mensajes = document.querySelectorAll('.mensaje-error, .mensaje-exito');
        mensajes.forEach(msg => msg.classList.remove('mostrar'));
    }
    
    // ========== PROCESAMIENTO DE LOGIN ==========
    
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            limpiarMensajes();
            
            // Obtener valores
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const recordar = document.getElementById('recordar').checked;
            
            // Validar email
            if (!validarEmail(email)) {
                mostrarError('Por favor ingresa un email válido', 'login');
                return;
            }
            
            // Buscar usuario
            const usuario = buscarUsuarioPorEmail(email);
            
            if (!usuario) {
                mostrarError('No existe una cuenta con este email', 'login');
                return;
            }
            
            // Verificar contraseña
            if (usuario.password !== password) {
                mostrarError('Contraseña incorrecta', 'login');
                return;
            }
            
            // Login exitoso
            guardarSesion(usuario, recordar);
            
            // Mostrar mensaje de éxito
            alert(`¡Bienvenido de vuelta, ${usuario.nombre}! 🎉`);
            
            // Redirigir a la página anterior o al inicio
            const paginaAnterior = localStorage.getItem('paginaAnterior');
            if (paginaAnterior) {
                localStorage.removeItem('paginaAnterior');
                window.location.href = paginaAnterior;
            } else {
                window.location.href = '../../index.html';
            }
        });
    }
    
    // ========== PROCESAMIENTO DE REGISTRO ==========
    
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            limpiarMensajes();
            
            // Obtener valores
            const nombre = document.getElementById('registro-nombre').value.trim();
            const email = document.getElementById('registro-email').value.trim();
            const telefono = document.getElementById('registro-telefono').value.trim();
            const password = document.getElementById('registro-password').value;
            const passwordConfirmar = document.getElementById('registro-password-confirmar').value;
            const aceptaTerminos = document.getElementById('aceptar-terminos').checked;
            
            // Validaciones
            if (nombre.length < 3) {
                mostrarError('El nombre debe tener al menos 3 caracteres', 'registro');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarError('Por favor ingresa un email válido', 'registro');
                return;
            }
            
            if (!validarTelefono(telefono)) {
                mostrarError('Por favor ingresa un teléfono válido (ej: +56 9 1234 5678)', 'registro');
                return;
            }
            
            const validacionPassword = validarPassword(password);
            if (!validacionPassword.valido) {
                mostrarError(validacionPassword.mensaje, 'registro');
                return;
            }
            
            if (password !== passwordConfirmar) {
                mostrarError('Las contraseñas no coinciden', 'registro');
                return;
            }
            
            if (!aceptaTerminos) {
                mostrarError('Debes aceptar los términos y condiciones', 'registro');
                return;
            }
            
            // Verificar si el email ya existe
            if (buscarUsuarioPorEmail(email)) {
                mostrarError('Ya existe una cuenta con este email', 'registro');
                return;
            }
            
            // Crear nuevo usuario
            const nuevoUsuario = {
                id: Date.now().toString(),
                nombre: nombre,
                email: email,
                telefono: telefono,
                password: password,
                fechaRegistro: new Date().toISOString()
            };
            
            // Guardar usuario
            if (guardarUsuario(nuevoUsuario)) {
                // Iniciar sesión automáticamente
                guardarSesion(nuevoUsuario, true);
                
                // Mostrar mensaje de éxito
                alert(`¡Cuenta creada exitosamente! Bienvenido, ${nombre} 🎉`);
                
                // Redirigir
                const paginaAnterior = localStorage.getItem('paginaAnterior');
                if (paginaAnterior) {
                    localStorage.removeItem('paginaAnterior');
                    window.location.href = paginaAnterior;
                } else {
                    window.location.href = '../../index.html';
                }
            } else {
                mostrarError('Error al crear la cuenta. Por favor intenta nuevamente.', 'registro');
            }
        });
    }
    
    // ========== VERIFICAR SI YA ESTÁ LOGUEADO ==========
    
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        console.log('Usuario ya logueado:', usuario.email);
        
        // Opcional: Redirigir automáticamente si ya está logueado
        // window.location.href = '../../index.html';
    }
    
    console.log('✅ Sistema de autenticación inicializado');
});
