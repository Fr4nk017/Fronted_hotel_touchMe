Informe Técnico Detallado – Frontend Hotel Touch Me
React + Vite | Separación de roles (Usuario público / Administrador) | Navegación SPA | Panel protegido
Este informe explica al máximo detalle el proyecto frontend desarrollado, cubriendo el porqué de la estructura de carpetas, qué contiene cada carpeta, cómo se relacionan los archivos, el flujo completo de navegación y la lógica implementada. El documento está redactado en español claro y profesional para que cualquier lector pueda entenderlo, incluso sin ser experto.
Índice
1. Alcance y objetivo del proyecto
2. Tecnologías y decisiones técnicas
3. Creación inicial del proyecto y configuración
4. Estructura de carpetas: por qué existe cada carpeta y qué contiene
5. Extensiones y tipos de archivos (.js, .jsx, .css)
6. Arquitectura del sistema: roles, layouts y navegación
7. Carpeta routes: en detalle (AppRouter y protección de rutas)
8. Carpeta layouts: en detalle (PublicLayout / AdminLayout)
9. Carpeta components: en detalle (menús, badge, piezas reutilizables)
10. Carpeta pages: en detalle (cada pantalla y su lógica)
11. Flujo completo de usuario público (paso a paso)
12. Flujo completo de administrador (paso a paso)
13. Validaciones, estados y manejo de formularios
14. Persistencia sin backend (localStorage) y por qué se usa
15. Pruebas y verificación (cómo comprobar que funciona)
16. Preparación para GitHub y buenas prácticas
17. Conclusión
1. Alcance y objetivo del proyecto
El proyecto es un frontend de hotel con dos perfiles claramente separados:
• Usuario público: navega por la web del hotel, revisa habitaciones, crea una reserva y recibe confirmación.
• Administrador: accede a un panel protegido (requiere login demo) para gestionar usuarios, reservas y habitaciones.
Importante: el proyecto se desarrolló SIN backend. Por lo tanto, las operaciones (crear/editar/listar) se simulan en frontend, y la sesión de administrador se controla con un mecanismo simple (localStorage) para que el flujo sea realista y demostrable.
2. Tecnologías y decisiones técnicas
• React: permite construir la interfaz en componentes reutilizables.
• Vite: acelera el desarrollo con servidor rápido y empaquetado moderno.
• React Router DOM: gestiona rutas internas sin recargar la página (SPA).
• CSS personalizado: mantiene estilos coherentes sin depender de frameworks externos.
Decisión clave: separar roles con layouts y proteger el panel admin. Esto mejora la claridad del sistema, permite explicar arquitectura en evaluación y deja el proyecto listo para integrar backend a futuro.
3. Creación inicial del proyecto y configuración
El proyecto se trabaja con Vite (plantilla React). La estructura típica incluye un archivo package.json, que define scripts y dependencias.
Comandos típicos en la carpeta donde existe package.json:
npm install   # instala dependencias del proyecto
npm run dev   # levanta el servidor de desarrollo de Vite
Regla práctica: si ejecutas npm install o npm run dev en una carpeta que NO tiene package.json, aparecen errores como 'Missing script: dev'. Por eso siempre se entra a la carpeta correcta antes de ejecutar comandos.
4. Estructura de carpetas: por qué existe cada carpeta y qué contiene
Dentro de src/ está todo el código fuente. La separación por carpetas evita archivos mezclados y hace que el proyecto sea mantenible.
4.1 src/assets
Propósito: guardar recursos estáticos (imágenes, íconos, etc.).
Qué se programa aquí: normalmente NADA. Solo archivos estáticos que luego se importan desde componentes o páginas.
Quién lo usa: cualquier componente/página que necesite mostrar una imagen o ícono.
4.2 src/styles
Propósito: centralizar estilos CSS reutilizables del sistema (colores, tarjetas, botones, tipografías).
Qué se programa aquí: archivos .css con clases como .container, .card, .muted, .row, .form, etc.
Quién lo usa: layouts y/o páginas importan estos estilos para aplicar una apariencia consistente.
4.3 src/components
Propósito: componentes reutilizables (UI) que se usan en varias páginas.
Ejemplos típicos: menús de navegación (PublicMenu/AdminMenu), badge de rol, botones comunes.
Por qué existe: evita duplicar código. Si el menú cambia, se edita en un solo archivo.
4.4 src/layouts
Propósito: definir la 'maqueta' (estructura) común de un conjunto de páginas.
Idea clave: Un layout decide qué elementos son permanentes (menú, contenedor) y dónde se renderiza el contenido dinámico.
Ejemplo: AdminLayout siempre muestra el menú admin y un contenedor. El contenido cambia según la ruta.
Relación: Layouts trabajan con <Outlet /> (React Router) para pintar las páginas hijas.
4.5 src/pages
Propósito: pantallas completas (vistas) asociadas a rutas.
Ejemplo: PublicHomePage, PublicReservePage, AdminDashboard, UsersListPage, etc.
Regla: una 'page' representa una pantalla. Un 'component' representa una pieza reutilizable.
4.6 src/routes
Propósito: centralizar la definición de rutas y, si aplica, componentes de control de acceso (route guards).
Aquí se define el mapa URL → Página/Componente a renderizar.
Esto hace que el flujo de navegación sea fácil de entender y modificar.
4.7 src/context
Propósito: gestionar estado global compartido (por ejemplo, sesión/rol).
Se usa cuando múltiples componentes necesitan la misma información sin pasar props manualmente por muchos niveles.
5. Extensiones y tipos de archivos (.js, .jsx, .css)
5.1 ¿Qué es .jsx y para qué sirve?
JSX es una sintaxis que permite escribir etiquetas tipo HTML dentro de JavaScript. React usa JSX para describir la interfaz de usuario.
Se usa .jsx en archivos que contienen componentes React con retorno visual (return (...)).
Ejemplo simple:
export default function Example() {
  return <h1>Hola</h1>;
}
5.2 Diferencia entre .js y .jsx
• .jsx: común cuando el archivo contiene JSX (interfaz).
• .js: puede usarse para lógica sin interfaz (helpers, servicios).
En la práctica, un proyecto puede usar ambos; aquí usamos .jsx porque la mayoría de archivos renderiza UI.
5.3 .css
Archivos de estilos. Se importan en componentes/pages/layouts con import './archivo.css';. React/Vite los empaqueta y aplica en la app.
6. Arquitectura del sistema: roles, layouts y navegación
Para que el sistema sea intuitivo y profesional, se adoptó el flujo real de una web de hotel:
• El visitante entra directamente al sitio público (no elige rol).
• El personal accede a un login de administración (ruta /admin/login).
• El panel admin está protegido. Sin login, se redirige al login.
Esto evita que el usuario público se confunda y replica el comportamiento de sistemas reales.
El corazón de esta arquitectura se logra con:
1) Layout público y layout admin
2) Router centralizado
3) Guard de rutas (RequireAdmin)
4) AuthContext para guardar rol/sesión demo
7. Carpeta routes: en detalle
7.1 ¿Qué va dentro de routes/?
Dentro de routes/ se colocan los archivos que definen el enrutamiento de la aplicación.
En este proyecto, el archivo principal es AppRouter.jsx, responsable de:
• Definir rutas públicas y rutas admin
• Aplicar layouts
• Aplicar protección de rutas admin
• Definir la ruta fallback (si una URL no existe)
7.2 AppRouter.jsx – lógica y flujo
AppRouter usa <Routes> y <Route> de react-router-dom. Cada Route conecta una URL con un componente a mostrar.
Los layouts se aplican agrupando rutas dentro de un Route padre que renderiza el layout y dentro usa <Outlet />.
El guard RequireAdmin se ubica por encima de las rutas /admin para impedir acceso si no hay rol admin.
Ejemplo conceptual:
Routes
 ├─ PublicLayout
 │   ├─ /        -> PublicHomePage
 │   ├─ /reservar -> PublicReservePage
 │   └─ /reserva/confirmacion -> PublicReservationSuccessPage
 └─ RequireAdmin
     └─ AdminLayout (/admin)
         ├─ /admin -> Dashboard
         ├─ /admin/usuarios -> UsersListPage
         └─ /admin/reservas/:id/editar -> AdminReservationEditPage
7.3 RequireAdmin.jsx – por qué existe y qué hace
RequireAdmin es un componente que se renderiza antes de mostrar rutas admin.
Funciona así:
1) Lee el rol desde AuthContext (estado global).
2) Si el rol NO es 'admin', redirige al login /admin/login.
3) Si el rol sí es 'admin', permite renderizar las rutas admin con <Outlet />.
Esto es equivalente a un 'middleware' en backend, pero aplicado a frontend.
Beneficio: mejora seguridad y experiencia. Evita que un usuario vea el panel por accidente.
8. Carpeta layouts: en detalle
8.1 ¿Qué es un Layout?
Un Layout es un componente que define una estructura repetida. Por ejemplo: un menú fijo + un contenedor central.
En vez de repetir ese HTML en todas las páginas, se hace una sola vez en el layout.
8.2 PublicLayout.jsx
PublicLayout se usa para todas las rutas públicas.
Contiene:
• PublicMenu: navegación del sitio público (Inicio, Habitaciones, Reservar, Acceso administración).
• <main className='container'>: limita el ancho y centra contenido.
• <Outlet />: aquí se renderiza la página concreta según la ruta.
Flujo: Usuario entra a '/', React Router usa PublicLayout, y dentro del Outlet muestra PublicHomePage.
8.3 AdminLayout.jsx
AdminLayout se usa para el panel admin y sólo se puede ver si RequireAdmin lo permite.
Contiene:
• AdminMenu: enlaces a gestión interna (Usuarios, Reservas, Habitaciones).
• RoleBadge: indicador de rol admin y botón 'Cerrar sesión'.
• <Outlet /> para renderizar páginas admin.
Flujo: Admin entra a '/admin/reservas', se muestra AdminLayout y en el Outlet se renderiza ReservationsListPage.
9. Carpeta components: en detalle
9.1 ¿Por qué separar components/ y pages/?
Porque un componente puede reutilizarse en múltiples páginas.
Ejemplo: el menú se repite en todas las páginas de su área (público o admin).
9.2 PublicMenu.jsx
PublicMenu muestra enlaces para el usuario público. Incluye un acceso discreto a administración.
Esto se hace así para mantener la web como un sitio real: el cliente no ve opciones de gestión interna.
9.3 AdminMenu.jsx
AdminMenu muestra enlaces del panel. Es diferente al menú público porque el administrador necesita opciones de gestión.
9.4 RoleBadge.jsx
RoleBadge muestra el rol actual (Admin) y permite cerrar sesión.
Al cerrar sesión, se borra el rol del localStorage y se redirige al login.
Esto hace que el panel se sienta profesional: el usuario siempre sabe dónde está y puede salir.
10. Carpeta pages: en detalle
Las páginas representan pantallas completas. Se asocian directamente a rutas.
10.1 PublicHomePage.jsx (Inicio público)
Función: dar bienvenida y explicar acciones principales con botones claros (Ver habitaciones / Reservar).
Incluye un bloque de contacto y políticas (horarios, dirección, check-in/check-out) para realismo.
10.2 PublicReservePage.jsx (Formulario de reserva)
Función: capturar datos de reserva.
Lógica: usa useState para controlar inputs (formulario controlado).
Validaciones:
• Requiere check-in y check-out
• Check-out debe ser posterior a check-in
Al enviar: genera un código demo y navega a la página de confirmación, enviando datos con state.
10.3 PublicReservationSuccessPage.jsx (Confirmación)
Función: mostrar resumen de la reserva (código, fechas, tipo habitación).
Obtiene datos desde useLocation().state. Si no existen, usa valores de respaldo (fallback).
10.4 AdminLoginPage.jsx (Login admin demo)
Función: simular autenticación admin para que el flujo se vea real.
Lógica: valida credenciales demo (admin/1234). Si correctas, guarda role='admin' y navega al panel /admin.
10.5 DashboardPage.jsx (Panel)
Función: vista general del panel admin (información o accesos rápidos).
10.6 UsersListPage / UserCreatePage / UserEditPage
Función: simular CRUD de usuarios (listado, creación, edición).
Notas: al no existir backend, el CRUD puede ser demostrativo (console.log + navegación).
10.7 ReservationsListPage / ReservationCreatePage / AdminReservationEditPage
ReservationsListPage: lista reservas (demo) y ofrece editar.
ReservationCreatePage: formulario para crear reserva desde el panel.
AdminReservationEditPage: edición de reserva, con cálculo de noches y total y manejo de estado (Pendiente/Confirmada/Cancelada).
10.8 RoomsPage.jsx
Función: gestión de habitaciones (alta/estado). En modo público puede funcionar como catálogo si se desea.
11. Flujo completo de usuario público (paso a paso)
1) El usuario entra al sitio: /
2) Ve botones principales y políticas (PublicHomePage).
3) Entra a /reservar y completa el formulario.
4) El sistema valida fechas y genera un código de reserva demo.
5) El sistema redirige a /reserva/confirmacion y muestra el resumen.
Resultado: flujo completo de reserva sin backend, pero demostrable y coherente.
12. Flujo completo de administrador (paso a paso)
1) El administrador hace clic en 'Acceso administración' (o escribe /admin).
2) Si no hay sesión admin, el guard lo redirige a /admin/login.
3) Ingresa credenciales demo (admin/1234).
4) Se guarda role='admin' en localStorage y se entra al panel /admin.
5) Puede navegar a:
   • /admin/usuarios (gestión de usuarios)
   • /admin/reservas (listado)
   • /admin/reservas/:id/editar (editar una reserva, estados, total)
   • /admin/habitaciones (gestión)
6) Al cerrar sesión, el rol se elimina y se vuelve al login.
13. Validaciones, estados y manejo de formularios
Los formularios se implementan como 'formularios controlados': cada input está enlazado a un estado useState.
Ventajas:
• Permite validar antes de enviar
• Permite mostrar valores precargados en edición
• Hace el flujo predecible y mantenible
Ejemplo de patrón: onChange actualiza el estado y value toma el estado actual.
14. Persistencia sin backend (localStorage)
Sin backend, el sistema necesita una forma de recordar si el admin inició sesión.
localStorage es un almacenamiento del navegador. Se usa para guardar el rol admin.
Beneficio: si recargas la página, la sesión demo continúa (más realista).
Limitación: es sólo una simulación local. En un sistema real, esto se reemplaza por token/JWT y backend.
15. Pruebas y verificación (cómo comprobar que funciona)
Pruebas recomendadas:
A) Público
• Entrar a /
• Ir a /reservar, completar y enviar, verificar /reserva/confirmacion
B) Admin
• Entrar a /admin → debe redirigir a /admin/login
• Login con admin/1234 → debe entrar a /admin
• Ir a /admin/reservas → editar una reserva → verificar cálculo y estado
• Cerrar sesión → intentar /admin nuevamente → debe pedir login
16. Preparación para GitHub y buenas prácticas
• No se sube node_modules (muy pesado). Se usa .gitignore.
• README.md debe incluir: descripción, instalación, rutas principales y credenciales demo.
• Estructura por carpetas facilita evaluación y mantenimiento.
• El proyecto queda listo para conectar API: se reemplazan datos demo por llamadas fetch/axios y se mantienen páginas/routers/layouts.
17. Conclusión
El frontend final se comporta como un sistema real: sitio público para usuarios y panel protegido para administración, con navegación SPA, separación clara de responsabilidades, componentes reutilizables y estructura escalable. Además, se documentó por qué existe cada carpeta, cómo se relacionan los archivos y cuál es el 

