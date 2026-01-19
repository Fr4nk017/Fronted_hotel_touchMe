# 🔄 Sistema de Vista 360° - Hotel TouchMe

## 📋 Descripción

Este sistema permite a los usuarios visualizar las habitaciones del hotel en **vista panorámica 360°**, proporcionando una experiencia inmersiva antes de hacer su reserva.

## ✨ Características

- ✅ **Visor panorámico interactivo** con rotación automática
- ✅ **Controles de zoom** (+ / -)
- ✅ **Pantalla completa**
- ✅ **Hot spots informativos** en puntos de interés
- ✅ **Diseño responsive** para móviles y tablets
- ✅ **Integración con modal de detalles** de habitaciones

## 🎯 Cómo Funciona

1. El usuario hace clic en **"Ver detalles"** de una habitación
2. Se abre el modal con información de la habitación
3. El usuario hace clic en el botón **"🔄 Ver en 360°"**
4. Se abre el visor panorámico en pantalla completa
5. El usuario puede:
   - Arrastrar para rotar la vista
   - Hacer scroll para zoom
   - Hacer clic en hot spots para ver información
   - Usar controles de zoom y pantalla completa

## 📁 Archivos Involucrados

```
Fronted_Hotel_TouchMe/
├── src/
│   ├── pages/
│   │   └── Habitaciones.html         (botón y modal 360°)
│   ├── styles/
│   │   └── p_Habitaciones_styles.css (estilos del visor)
│   └── assets/
│       └── images/
│           └── 360/                   (carpeta para imágenes 360°)
└── js/
    └── vista360.js                    (lógica del visor)
```

## 📸 Cómo Obtener Imágenes 360° de Tus Habitaciones

### Opción 1: Usar una Cámara 360° (Recomendado)

#### Cámaras Populares:
- **Ricoh Theta V** (~$350 USD) - Excelente calidad
- **Insta360 One X2** (~$400 USD) - Muy versátil
- **GoPro MAX** (~$450 USD) - Resistente y profesional
- **Xiaomi Mi Sphere** (~$200 USD) - Económica

#### Pasos:
1. Coloca la cámara en el centro de la habitación
2. Usa un trípode a altura de ojos (~1.5m)
3. Asegúrate de buena iluminación natural o artificial
4. Toma la foto/video 360°
5. Exporta en formato equirectangular (2:1 ratio)

### Opción 2: Fotografía Manual + Software

Si no tienes cámara 360°, puedes crear panoramas con fotos normales:

#### Software Necesario:
- **PTGui** (profesional, $120 USD) - [ptgui.com](https://www.ptgui.com)
- **Hugin** (gratuito, open source) - [hugin.sourceforge.io](http://hugin.sourceforge.io)
- **Adobe Photoshop** (Camera Raw + Photomerge)

#### Pasos:
1. Toma 12-20 fotos superpuestas (50% overlap) en todas direcciones
2. Mantén la cámara nivelada y en el mismo punto
3. Usa modo manual (misma exposición en todas las fotos)
4. Importa las fotos al software
5. Alinea y fusiona automáticamente
6. Exporta como imagen equirectangular

### Opción 3: Servicios Profesionales

Contrata un fotógrafo especializado en 360°:
- **Matterport** - Tours virtuales profesionales
- **Fotógrafos locales** - Busca en LinkedIn o Instagram
- **Agencias inmobiliarias** - Suelen tener contactos

## 🖼️ Especificaciones de Imagen

### Formato Requerido:
- **Proyección:** Equirectangular
- **Ratio:** 2:1 (ancho:alto)
- **Resoluciones recomendadas:**
  - **Mínima:** 2048 x 1024 px
  - **Óptima:** 4096 x 2048 px
  - **Profesional:** 8192 x 4096 px
- **Formato:** JPG (alta calidad, 80-90%)
- **Peso:** Máximo 5 MB por imagen (comprimida)

### Herramientas de Optimización:
- **TinyPNG** - [tinypng.com](https://tinypng.com)
- **ImageOptim** - [imageoptim.com](https://imageoptim.com)
- **Squoosh** - [squoosh.app](https://squoosh.app)

## 🔧 Implementación en el Proyecto

### 1. Guardar las Imágenes

Crea la carpeta y guarda tus imágenes:
```
src/assets/images/360/
├── habitacion_individual_360.jpg
├── habitacion_doble_360.jpg
├── suite_presidencial_360.jpg
└── habitacion_familiar_360.jpg
```

### 2. Actualizar las Rutas en `vista360.js`

Edita el objeto `imagenes360` en el archivo `js/vista360.js`:

```javascript
const imagenes360 = {
    'Habitación Individual': {
        imagen: '../assets/images/360/habitacion_individual_360.jpg',
        hotSpots: [
            {
                "pitch": 0,
                "yaw": 90,
                "type": "info",
                "text": "Escritorio de trabajo",
                "createTooltipFunc": hotSpotTooltip
            }
        ]
    },
    'Habitación Doble': {
        imagen: '../assets/images/360/habitacion_doble_360.jpg',
        hotSpots: [...]
    },
    // ... resto de habitaciones
};
```

### 3. Configurar Hot Spots (Puntos de Interés)

Los hot spots son marcadores interactivos en la imagen:

```javascript
{
    "pitch": 0,      // Ángulo vertical: -90 (abajo) a 90 (arriba)
    "yaw": 90,       // Ángulo horizontal: -180 (izq) a 180 (der)
    "type": "info",  // Tipo: 'info' o 'scene'
    "text": "Cama matrimonial ortopédica",
    "createTooltipFunc": hotSpotTooltip
}
```

**Cómo encontrar las coordenadas:**
1. Abre el visor 360° en el navegador
2. Abre la consola (F12)
3. Ejecuta: `viewer.getConfig()`
4. Mueve la vista al punto deseado
5. Ejecuta: `console.log(viewer.getPitch(), viewer.getYaw())`
6. Usa esos valores en tu hot spot

## 🎨 Personalización

### Cambiar Colores del Visor

En `p_Habitaciones_styles.css`:

```css
.modal-360-header {
    background: linear-gradient(90deg, #TU_COLOR 0%, #TU_COLOR_2 100%);
}

.btn-control-360 {
    background: #TU_COLOR;
}
```

### Ajustar Velocidad de Auto-Rotación

En `vista360.js`:

```javascript
viewer = pannellum.viewer(panoramaViewer, {
    "autoRotate": -2,  // Cambia el valor (negativo = antihorario)
    // -5 = rápido, -1 = lento
});
```

### Cambiar Zoom Inicial

```javascript
"hfov": 100,      // Campo de visión (50-120)
"minHfov": 50,    // Zoom máximo
"maxHfov": 120,   // Zoom mínimo
```

## 🐛 Solución de Problemas

### La imagen no se carga
- ✅ Verifica que la ruta sea correcta
- ✅ Asegúrate que la imagen exista en la carpeta
- ✅ Comprueba la consola del navegador (F12)

### La imagen está distorsionada
- ✅ Verifica que sea formato equirectangular
- ✅ Comprueba el ratio 2:1 (ancho debe ser el doble del alto)

### El visor es muy lento
- ✅ Comprime las imágenes (máx 5 MB)
- ✅ Reduce la resolución a 2048x1024px
- ✅ Usa formato JPG con calidad 80%

### Los hot spots no aparecen
- ✅ Verifica las coordenadas pitch/yaw
- ✅ Asegúrate que `createTooltipFunc` esté definida

## 📱 Compatibilidad

✅ **Desktop:** Chrome, Firefox, Safari, Edge  
✅ **Mobile:** iOS Safari, Chrome Android  
✅ **Tablets:** iPad, Android tablets  

## 🚀 Mejoras Futuras

- [ ] **Tour virtual completo** con transiciones entre habitaciones
- [ ] **Modo VR** para gafas de realidad virtual
- [ ] **Audio ambiente** con sonidos de la habitación
- [ ] **Comparador de habitaciones** lado a lado
- [ ] **Anotaciones interactivas** con videos/imágenes
- [ ] **Integración con reservas** directas desde el visor
- [ ] **Analytics** para rastrear qué habitaciones se ven más

## 📚 Recursos Adicionales

### Tutoriales de Fotografía 360°:
- [Cómo tomar fotos 360°](https://www.youtube.com/watch?v=3oBkbUYqEMU)
- [Crear panoramas con Hugin](https://www.youtube.com/watch?v=9Q6SZ5bQXYk)
- [Fotografía inmobiliaria 360°](https://www.youtube.com/watch?v=T8zDqPqJKPE)

### Documentación Técnica:
- [Pannellum Docs](https://pannellum.org/documentation/overview/)
- [Equirectangular Projection](https://en.wikipedia.org/wiki/Equirectangular_projection)
- [WebGL Performance](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

### Bancos de Imágenes 360° Gratuitas:
- [Poly Haven](https://polyhaven.com/hdris) - HDRIs gratuitos
- [Flickr 360°](https://www.flickr.com/groups/equirectangular/)
- [Google Poly](https://poly.google.com) (archivo)

## 💡 Tips Profesionales

1. **Iluminación:** Toma fotos durante el día con luz natural
2. **Limpieza:** Asegúrate que la habitación esté impecable
3. **Decoración:** Añade detalles que hagan la habitación acogedora
4. **Perspectiva:** Coloca la cámara a 1.5m de altura (altura de ojos)
5. **Edición:** Ajusta brillo, contraste y saturación levemente
6. **Batch processing:** Usa las mismas configuraciones para todas

## 📞 Soporte

Si tienes problemas o preguntas:
- Revisa la consola del navegador (F12)
- Verifica que Pannellum esté cargado correctamente
- Contacta al desarrollador del proyecto

---

**¡Disfruta creando experiencias inmersivas para tus huéspedes!** 🏨✨
