/**
 * SISTEMA DE RECUPERACIÓN DE CONTRASEÑA
 * Hotel TouchMe - Santiago, Chile
 * 
 * Funcionalidad:
 * - Generación de código de 6 dígitos
 * - Validación de email registrado
 * - Almacenamiento temporal de código con expiración
 * - Verificación de código ingresado
 * - Actualización de contraseña
 * - Navegación entre los 3 pasos del wizard
 */

// ===== DATOS TEMPORALES DE RECUPERACIÓN =====
// Almacena el código y email temporalmente durante el proceso
let datosRecuperacion = {
    email: '',
    codigo: '',
    expiracion: null
};

// ===== ELEMENTOS DEL DOM =====
const modal = document.getElementById('modal-recuperar');
const btnCerrar = document.querySelector('.modal-recuperar-cerrar');
const linkRecuperar = document.querySelector('.link-recuperar');

// Pasos del wizard
const pasoEmail = document.getElementById('paso-email');
const pasoCodigo = document.getElementById('paso-codigo');
const pasoNuevaPassword = document.getElementById('paso-nueva-password');

// Formularios
const formEmail = document.getElementById('form-recuperar-email');
const formCodigo = document.getElementById('form-verificar-codigo');
const formNuevaPassword = document.getElementById('form-nueva-password');

// Inputs
const inputEmailRecuperar = document.getElementById('recuperar-email');
const inputCodigo = document.getElementById('codigo-recuperacion');
const inputNuevaPassword = document.getElementById('nueva-password');
const inputConfirmarPassword = document.getElementById('confirmar-nueva-password');

// Botones de toggle de contraseña
const toggleNuevaPassword = document.getElementById('toggle-nueva-password');
const toggleConfirmarPassword = document.getElementById('toggle-confirmar-password');

// Mensajes de error
const errorEmail = document.getElementById('error-recuperar-email');
const errorCodigo = document.getElementById('error-codigo');
const errorNuevaPassword = document.getElementById('error-nueva-password');

// Link de reenvío
const linkReenviar = document.getElementById('link-reenviar-codigo');

// ===== FUNCIONES AUXILIARES =====

/**
 * Genera un código aleatorio de 6 dígitos
 */
function generarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Verifica si un email está registrado en el sistema
 */
function verificarEmailRegistrado(email) {
    const usuarios = JSON.parse(localStorage.getItem('usuariosHotel') || '[]');
    return usuarios.find(user => user.email === email);
}

/**
 * Actualiza la contraseña de un usuario
 */
function actualizarPassword(email, nuevaPassword) {
    const usuarios = JSON.parse(localStorage.getItem('usuariosHotel') || '[]');
    const index = usuarios.findIndex(user => user.email === email);
    
    if (index !== -1) {
        usuarios[index].password = nuevaPassword;
        localStorage.setItem('usuariosHotel', JSON.stringify(usuarios));
        return true;
    }
    return false;
}

/**
 * Muestra un mensaje de error
 */
function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = 'block';
}

/**
 * Oculta un mensaje de error
 */
function ocultarError(elemento) {
    elemento.textContent = '';
    elemento.style.display = 'none';
}

/**
 * Cambia al paso especificado del wizard
 */
function irAPaso(paso) {
    // Ocultar todos los pasos
    pasoEmail.classList.remove('active');
    pasoCodigo.classList.remove('active');
    pasoNuevaPassword.classList.remove('active');
    
    // Mostrar el paso solicitado
    switch(paso) {
        case 1:
            pasoEmail.classList.add('active');
            inputEmailRecuperar.focus();
            break;
        case 2:
            pasoCodigo.classList.add('active');
            inputCodigo.focus();
            break;
        case 3:
            pasoNuevaPassword.classList.add('active');
            inputNuevaPassword.focus();
            break;
    }
}

/**
 * Reinicia el proceso de recuperación
 */
function reiniciarRecuperacion() {
    datosRecuperacion = {
        email: '',
        codigo: '',
        expiracion: null
    };
    
    // Limpiar todos los inputs
    inputEmailRecuperar.value = '';
    inputCodigo.value = '';
    inputNuevaPassword.value = '';
    inputConfirmarPassword.value = '';
    
    // Ocultar errores
    ocultarError(errorEmail);
    ocultarError(errorCodigo);
    ocultarError(errorNuevaPassword);
    
    // Volver al primer paso
    irAPaso(1);
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        reiniciarRecuperacion();
    }, 300);
}

/**
 * Abre el modal
 */
function abrirModal() {
    modal.classList.add('show');
    reiniciarRecuperacion();
}

// ===== PASO 1: VALIDAR EMAIL =====
formEmail.addEventListener('submit', (e) => {
    e.preventDefault();
    ocultarError(errorEmail);
    
    const email = inputEmailRecuperar.value.trim();
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarError(errorEmail, 'Por favor ingresa un email válido');
        return;
    }
    
    // Verificar si el email está registrado
    const usuario = verificarEmailRegistrado(email);
    if (!usuario) {
        mostrarError(errorEmail, 'Este email no está registrado en el sistema');
        return;
    }
    
    // Generar código de recuperación
    const codigo = generarCodigo();
    datosRecuperacion.email = email;
    datosRecuperacion.codigo = codigo;
    datosRecuperacion.expiracion = Date.now() + (10 * 60 * 1000); // 10 minutos
    
    // Simular envío de email (en consola para desarrollo)
    console.log('=== CÓDIGO DE RECUPERACIÓN ===');
    console.log(`Email: ${email}`);
    console.log(`Código: ${codigo}`);
    console.log(`Expira en: 10 minutos`);
    console.log('===============================');
    
    // Mostrar alerta al usuario (simulación de email enviado)
    alert(`Se ha enviado un código de 6 dígitos al correo ${email}\n\n[MODO DESARROLLO]\nTu código es: ${codigo}`);
    
    // Pasar al siguiente paso
    irAPaso(2);
});

// ===== PASO 2: VERIFICAR CÓDIGO =====
formCodigo.addEventListener('submit', (e) => {
    e.preventDefault();
    ocultarError(errorCodigo);
    
    const codigoIngresado = inputCodigo.value.trim();
    
    // Validar formato
    if (!/^\d{6}$/.test(codigoIngresado)) {
        mostrarError(errorCodigo, 'El código debe tener 6 dígitos');
        return;
    }
    
    // Verificar expiración
    if (Date.now() > datosRecuperacion.expiracion) {
        mostrarError(errorCodigo, 'El código ha expirado. Solicita uno nuevo');
        return;
    }
    
    // Verificar código
    if (codigoIngresado !== datosRecuperacion.codigo) {
        mostrarError(errorCodigo, 'El código ingresado es incorrecto');
        return;
    }
    
    // Código correcto - pasar al siguiente paso
    irAPaso(3);
});

// ===== PASO 3: NUEVA CONTRASEÑA =====
formNuevaPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    ocultarError(errorNuevaPassword);
    
    const nuevaPassword = inputNuevaPassword.value;
    const confirmarPassword = inputConfirmarPassword.value;
    
    // Validar longitud mínima
    if (nuevaPassword.length < 6) {
        mostrarError(errorNuevaPassword, 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Validar que coincidan
    if (nuevaPassword !== confirmarPassword) {
        mostrarError(errorNuevaPassword, 'Las contraseñas no coinciden');
        return;
    }
    
    // Actualizar contraseña
    const exito = actualizarPassword(datosRecuperacion.email, nuevaPassword);
    
    if (exito) {
        // Animación de éxito
        const contenido = document.querySelector('.modal-recuperar-contenido');
        contenido.classList.add('success-animation');
        
        // Mostrar mensaje de éxito
        alert('✅ Contraseña actualizada con éxito\n\nYa puedes iniciar sesión con tu nueva contraseña');
        
        // Cerrar modal
        cerrarModal();
        
        // Enfocar el input de email del login
        setTimeout(() => {
            document.getElementById('login-email').focus();
        }, 400);
    } else {
        mostrarError(errorNuevaPassword, 'Error al actualizar la contraseña. Intenta nuevamente');
    }
});

// ===== REENVIAR CÓDIGO =====
linkReenviar.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Generar nuevo código
    const codigo = generarCodigo();
    datosRecuperacion.codigo = codigo;
    datosRecuperacion.expiracion = Date.now() + (10 * 60 * 1000);
    
    // Simular reenvío
    console.log('=== CÓDIGO REENVIADO ===');
    console.log(`Email: ${datosRecuperacion.email}`);
    console.log(`Nuevo Código: ${codigo}`);
    console.log('========================');
    
    alert(`Se ha enviado un nuevo código al correo ${datosRecuperacion.email}\n\n[MODO DESARROLLO]\nTu nuevo código es: ${codigo}`);
    
    // Limpiar input y enfocar
    inputCodigo.value = '';
    inputCodigo.focus();
    ocultarError(errorCodigo);
});

// ===== TOGGLE DE CONTRASEÑAS =====
toggleNuevaPassword.addEventListener('click', () => {
    const tipo = inputNuevaPassword.type === 'password' ? 'text' : 'password';
    inputNuevaPassword.type = tipo;
    toggleNuevaPassword.textContent = tipo === 'password' ? '👁️' : '🙈';
});

toggleConfirmarPassword.addEventListener('click', () => {
    const tipo = inputConfirmarPassword.type === 'password' ? 'text' : 'password';
    inputConfirmarPassword.type = tipo;
    toggleConfirmarPassword.textContent = tipo === 'password' ? '👁️' : '🙈';
});

// ===== EVENTOS DE APERTURA/CIERRE =====
linkRecuperar.addEventListener('click', (e) => {
    e.preventDefault();
    abrirModal();
});

btnCerrar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        cerrarModal();
    }
});

// ===== VALIDACIÓN EN TIEMPO REAL =====
inputCodigo.addEventListener('input', () => {
    // Solo permitir números
    inputCodigo.value = inputCodigo.value.replace(/\D/g, '');
    
    // Limitar a 6 dígitos
    if (inputCodigo.value.length > 6) {
        inputCodigo.value = inputCodigo.value.slice(0, 6);
    }
});

console.log('✅ Sistema de recuperación de contraseña inicializado');
