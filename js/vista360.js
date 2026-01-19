/**
 * SISTEMA DE VISTA 360° - HOTEL TOUCHME
 * Permite visualizar las habitaciones en vista panorámica 360°
 * Utiliza la biblioteca Pannellum para renderizar panoramas
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ELEMENTOS DEL DOM ==========
    const btnVer360 = document.getElementById('btn-ver-360');
    const modal360 = document.getElementById('modal-360');
    const btnCerrar360 = document.querySelector('.modal-360-cerrar');
    const titulo360 = document.getElementById('titulo-360');
    const panoramaViewer = document.getElementById('panorama-viewer');
    
    // Botones de control
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    
    // Variable para el visor Pannellum
    let viewer = null;
    let habitacionActual = '';
    
    // ========== BASE DE DATOS DE IMÁGENES 360° ==========
    
    /**
     * Mapeo de habitaciones a sus imágenes panorámicas 360°
     * NOTA: Habitación Individual usa tu imagen real (Prueba360.jpg)
     * Las demás habitaciones usan imágenes de ejemplo temporales.
     */
    const imagenes360 = {
        'Habitación Individual': {
            imagen: '../assets/images/360/habitacion_individual.jpg', // ✅ TU IMAGEN REAL
            hotSpots: [
                {
                    "pitch": 0,
                    "yaw": 90,
                    "type": "info",
                    "text": "Escritorio de trabajo con WiFi de alta velocidad",
                    "createTooltipFunc": hotSpotTooltip
                },
                {
                    "pitch": -10,
                    "yaw": 180,
                    "type": "info",
                    "text": "Cama individual con colchón ortopédico",
                    "createTooltipFunc": hotSpotTooltip
                }
            ]
        },
        'Habitación Doble': {
            imagen: 'https://pannellum.org/images/cerro-toco-0.jpg', // Imagen de ejemplo
            hotSpots: [
                {
                    "pitch": 0,
                    "yaw": 0,
                    "type": "info",
                    "text": "Cama matrimonial o dos individuales",
                    "createTooltipFunc": hotSpotTooltip
                },
                {
                    "pitch": -5,
                    "yaw": 270,
                    "type": "info",
                    "text": "TV Cable 42 pulgadas",
                    "createTooltipFunc": hotSpotTooltip
                }
            ]
        },
        'Suite Presidencial': {
            imagen: 'https://pannellum.org/images/jfk.jpg', // Imagen de ejemplo
            hotSpots: [
                {
                    "pitch": 0,
                    "yaw": 45,
                    "type": "info",
                    "text": "Jacuzzi privado con hidromasaje",
                    "createTooltipFunc": hotSpotTooltip
                },
                {
                    "pitch": 5,
                    "yaw": 180,
                    "type": "info",
                    "text": "Sala de estar independiente",
                    "createTooltipFunc": hotSpotTooltip
                },
                {
                    "pitch": 0,
                    "yaw": 270,
                    "type": "info",
                    "text": "Vista panorámica de Santiago",
                    "createTooltipFunc": hotSpotTooltip
                }
            ]
        },
        'Habitación Familiar': {
            imagen: '../assets/images/360/HFamiliar360.jpg', // Imagen de ejemplo
            hotSpots: [
                {
                    "pitch": 0,
                    "yaw": 90,
                    "type": "info",
                    "text": "Dos camas matrimoniales",
                    "createTooltipFunc": hotSpotTooltip
                },
                {
                    "pitch": -5,
                    "yaw": 0,
                    "type": "info",
                    "text": "Área de juegos para niños",
                    "createTooltipFunc": hotSpotTooltip
                }
            ]
        }
    };
    
    // ========== FUNCIONES DE TOOLTIP ==========
    
    /**
     * Crea un tooltip personalizado para los hot spots
     */
    function hotSpotTooltip(hotSpotDiv, args) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <span class="tooltip-icon">ℹ️</span>
                <span class="tooltip-text">${args}</span>
            </div>
        `;
        hotSpotDiv.appendChild(tooltip);
        
        // Estilos inline para el tooltip
        tooltip.style.cssText = `
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #181818;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            white-space: nowrap;
            pointer-events: none;
            transform: translateY(-10px);
        `;
    }
    
    // ========== INICIALIZAR VISOR 360° ==========
    
    /**
     * Inicializa el visor panorámico con Pannellum
     */
    function inicializarVisor360(habitacion) {
        habitacionActual = habitacion;
        const datos = imagenes360[habitacion];
        
        if (!datos) {
            console.error('No hay imagen 360° para:', habitacion);
            alert('⚠️ Vista 360° no disponible para esta habitación.');
            return;
        }
        
        // Actualizar título
        titulo360.textContent = `Vista 360° - ${habitacion}`;
        
        // Destruir visor anterior si existe
        if (viewer) {
            viewer.destroy();
        }
        
        // Crear nuevo visor
        viewer = pannellum.viewer(panoramaViewer, {
            "type": "equirectangular",
            "panorama": datos.imagen,
            "autoLoad": true,
            "autoRotate": -2,
            "autoRotateInactivityDelay": 3000,
            "showControls": false,
            "mouseZoom": true,
            "draggable": true,
            "friction": 0.15,
            "hfov": 100,
            "minHfov": 50,
            "maxHfov": 120,
            "pitch": 0,
            "yaw": 0,
            "hotSpots": datos.hotSpots || [],
            "compass": true,
            "northOffset": 0,
            "strings": {
                "loadButtonLabel": "Haz clic para cargar la vista 360°",
                "loadingLabel": "Cargando...",
                "bylineLabel": "Hotel TouchMe"
            }
        });
        
        console.log('✅ Visor 360° inicializado para:', habitacion);
    }
    
    // ========== EVENTOS ==========
    
    /**
     * Abrir modal 360° al hacer clic en el botón
     */
    if (btnVer360) {
        btnVer360.addEventListener('click', function() {
            // Obtener el nombre de la habitación del modal actual
            const tituloHabitacion = document.getElementById('modal-titulo').textContent;
            
            // Abrir modal 360°
            modal360.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Inicializar visor con pequeño delay para que el DOM esté listo
            setTimeout(() => {
                inicializarVisor360(tituloHabitacion);
            }, 100);
        });
    }
    
    /**
     * Cerrar modal 360°
     */
    function cerrarModal360() {
        modal360.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Detener auto-rotación
        if (viewer) {
            viewer.stopAutoRotate();
        }
    }
    
    if (btnCerrar360) {
        btnCerrar360.addEventListener('click', cerrarModal360);
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal360.classList.contains('show')) {
            cerrarModal360();
        }
    });
    
    // Cerrar al hacer clic fuera
    modal360.addEventListener('click', function(e) {
        if (e.target === modal360) {
            cerrarModal360();
        }
    });
    
    // ========== CONTROLES ==========
    
    /**
     * Zoom In
     */
    if (btnZoomIn) {
        btnZoomIn.addEventListener('click', function() {
            if (viewer) {
                const currentHfov = viewer.getHfov();
                viewer.setHfov(Math.max(currentHfov - 10, 50));
            }
        });
    }
    
    /**
     * Zoom Out
     */
    if (btnZoomOut) {
        btnZoomOut.addEventListener('click', function() {
            if (viewer) {
                const currentHfov = viewer.getHfov();
                viewer.setHfov(Math.min(currentHfov + 10, 120));
            }
        });
    }
    
    /**
     * Pantalla completa
     */
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', function() {
            if (viewer) {
                viewer.toggleFullscreen();
            }
        });
    }
    
    console.log('✅ Sistema de vista 360° inicializado');
});

// ========== GUÍA PARA USAR TUS PROPIAS IMÁGENES 360° ==========
/**
 * CÓMO OBTENER IMÁGENES 360° DE TUS HABITACIONES:
 * 
 * 1. FOTOGRAFÍA:
 *    - Usa una cámara 360° (Ricoh Theta, Insta360, etc.)
 *    - O toma múltiples fotos y usa software como:
 *      * PTGui (profesional)
 *      * Hugin (gratuito)
 *      * Adobe Photoshop (Camera Raw)
 * 
 * 2. FORMATO:
 *    - La imagen debe ser equirectangular
 *    - Ratio 2:1 (ejemplo: 4096x2048px)
 *    - Formato: JPG o PNG
 * 
 * 3. IMPLEMENTACIÓN:
 *    - Guarda las imágenes en: src/assets/images/360/
 *    - Actualiza las rutas en el objeto imagenes360:
 *      
 *      'Habitación Individual': {
 *          imagen: '../assets/images/360/habitacion_individual_360.jpg',
 *          hotSpots: [...]
 *      }
 * 
 * 4. HOT SPOTS:
 *    - pitch: ángulo vertical (-90 a 90)
 *    - yaw: ángulo horizontal (-180 a 180)
 *    - type: 'info' o 'scene'
 *    - text: descripción del punto
 * 
 * 5. OPTIMIZACIÓN:
 *    - Comprime las imágenes (TinyPNG, ImageOptim)
 *    - Tamaño recomendado: 2048x1024px (buena calidad, buen peso)
 *    - Usa lazy loading para mejor performance
 */
