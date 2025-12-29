# 🌍 ViajesMundo - Agencia de Viajes

Un sitio web estático completo para una agencia de viajes, construido con HTML, CSS y JavaScript puro. Incluye todas las funcionalidades solicitadas: navegación, carruseles, modales, calendario simulado, y paneles de usuario y administrador.

## ✨ Características

- **Diseño Moderno y Responsive**: Utiliza CSS Grid y Flexbox para un diseño adaptable
- **Navegación Completa**: Menú hamburguesa para móviles y navegación sticky
- **Carrusel Interactivo**: Rotación automática de destinos destacados
- **Sistema de Reservas**: Calendario simulado y modal de confirmación
- **Panel de Usuario**: Gestión de reservas, historial de pagos y preferencias
- **Panel de Administrador**: Gestión de paquetes, estadísticas y usuarios
- **Formularios Validados**: Con validación en tiempo real y manejo de errores
- **Almacenamiento Local**: Simula base de datos usando localStorage

## 🚀 Páginas Incluidas

### 1. **Inicio (index.html)**
- Header con navegación completa
- Banner principal con CTA
- Carrusel de destinos destacados
- Paquetes destacados
- Servicios (vuelos, hoteles, transporte)
- Footer con información de contacto

### 2. **Inicio de Sesión (pages/login.html)**
- Formulario de login con validación
- Modal de registro de usuario
- Acceso directo al panel de administrador
- Credenciales de prueba incluidas

### 3. **Agenda/Reservas (pages/agenda.html)**
- Calendario interactivo simulado
- Lista de paquetes disponibles
- Modal de confirmación de reserva
- Formulario de reserva completo

### 4. **Panel de Usuario (pages/usuario.html)**
- Dashboard con estadísticas
- Gestión de reservas (activas, completadas, canceladas)
- Historial de pagos
- Preferencias de viaje
- Sistema de tabs

### 5. **Panel de Administrador (pages/admin.html)**
- Estadísticas generales del sistema
- Gestión de paquetes (crear, editar, eliminar)
- Historial de pagos con filtros
- Usuarios recientes
- Exportación de datos

### 6. **Paquetes (pages/paquetes.html)**
- Catálogo completo de paquetes
- Filtros por destino, duración, precio y puntuación
- Ordenamiento personalizable
- Paginación
- Modal de detalles del paquete

### 7. **Contacto (pages/contacto.html)**
- Formulario de contacto validado
- Información de la empresa
- FAQ interactivo
- Enlaces a redes sociales
- Mapa placeholder interactivo

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Grid, Flexbox, animaciones y responsive design
- **JavaScript ES6+**: Funcionalidades interactivas y manejo de estado
- **Font Awesome**: Iconografía completa
- **localStorage**: Simulación de base de datos

## 📁 Estructura del Proyecto

```
01-Proyecto-Maquetado/
├── index.html                 # Página principal
├── pages/                     # Páginas del sitio
│   ├── login.html            # Inicio de sesión
│   ├── agenda.html           # Agenda y reservas
│   ├── usuario.html          # Panel de usuario
│   ├── admin.html            # Panel de administrador
│   ├── paquetes.html         # Catálogo de paquetes
│   └── contacto.html         # Página de contacto
├── assets/                    # Recursos estáticos
│   ├── css/
│   │   └── style.css         # Estilos principales
│   ├── js/
│   │   ├── main.js           # Funcionalidades comunes
│   │   ├── login.js          # Lógica de login
│   │   ├── agenda.js         # Gestión de agenda
│   │   ├── usuario.js        # Panel de usuario
│   │   ├── admin.js          # Panel de administrador
│   │   ├── paquetes.js       # Gestión de paquetes
│   │   └── contacto.js       # Formulario de contacto
│   └── img/                  # Imágenes del sitio
├── data/                      # Datos del proyecto
└── README.md                  # Este archivo
```

## 🎯 Funcionalidades Destacadas

### Sistema de Autenticación
- **Usuarios de Prueba**:
  - `usuario@test.com` / `123456` (Usuario normal)
  - `admin@test.com` / `admin123` (Administrador)
  - `maria@test.com` / `maria123` (Usuario normal)
  - `juan@test.com` / `juan123` (Usuario normal)

### Carrusel de Destinos
- Rotación automática cada 5 segundos
- Navegación manual con botones
- Transiciones suaves entre slides

### Calendario Interactivo
- Navegación entre meses
- Selección de fechas
- Integración con sistema de reservas

### Sistema de Reservas
- Modal de confirmación
- Validación de formularios
- Almacenamiento en localStorage
- Redirección automática al panel de usuario

### Gestión de Paquetes
- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Filtros avanzados
- Ordenamiento personalizable
- Paginación

### Responsive Design
- Adaptable a todos los dispositivos
- Menú hamburguesa para móviles
- Grid y Flexbox para layouts flexibles

## 🚀 Cómo Usar

### 1. **Instalación**
```bash
# Clona o descarga el proyecto
# No requiere instalación de dependencias
```

### 2. **Ejecución**
```bash
# Abre index.html en tu navegador
# O usa un servidor local:
python -m http.server 8000
# O con Node.js:
npx serve .
```

### 3. **Navegación**
1. **Inicio**: Explora la página principal
2. **Login**: Usa las credenciales de prueba
3. **Agenda**: Reserva un paquete
4. **Usuario**: Gestiona tus reservas
5. **Admin**: Gestiona el sistema (solo admin)

## 🔧 Personalización

### Cambiar Colores
Edita las variables CSS en `assets/css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #f093fb;
    --accent-color: #764ba2;
}
```

### Agregar Paquetes
Modifica el array `allPackages` en `assets/js/paquetes.js`:
```javascript
const allPackages = [
    {
        id: 13,
        title: 'Nuevo Destino',
        description: 'Descripción del paquete',
        price: 1500,
        duration: 7,
        rating: 4.8,
        image: '../assets/img/package13.jpg',
        destination: 'Europa',
        category: 'Cultural',
        available: true
    }
    // ... más paquetes
];
```

### Modificar Credenciales
Edita las funciones de autenticación en `assets/js/login.js`:
```javascript
function isValidLogin(email, password) {
    const users = [
        { email: 'tu@email.com', password: 'tucontraseña', name: 'Tu Nombre', role: 'user' }
        // ... más usuarios
    ];
    // ... lógica de validación
}
```

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resoluciones**: 320px - 1920px+

## 🎨 Características de Diseño

- **Paleta de Colores**: Gradientes modernos y colores vibrantes
- **Tipografía**: Segoe UI para máxima legibilidad
- **Iconografía**: Font Awesome para consistencia visual
- **Animaciones**: Transiciones suaves y efectos hover
- **Sombras**: Efectos de profundidad y modernidad

## 🔒 Seguridad

- **Simulación**: Todos los datos son simulados
- **localStorage**: Solo para demostración
- **Validación**: Formularios validados en frontend
- **Sin Backend**: Sitio completamente estático

## 📊 Funcionalidades Simuladas

- **Base de Datos**: localStorage como sustituto
- **API Calls**: Funciones que simulan peticiones HTTP
- **Autenticación**: Sistema de sesiones simulado
- **Pagos**: Estados de pago simulados
- **Email**: Notificaciones en lugar de emails reales

## 🚧 Limitaciones

- **Sin Backend**: No hay persistencia real de datos
- **Sin Base de Datos**: Los datos se pierden al limpiar el navegador
- **Sin Email**: Las notificaciones son solo visuales
- **Sin Pagos**: Los pagos son simulados

## 🔮 Futuras Mejoras

- [ ] Integración con backend real
- [ ] Base de datos persistente
- [ ] Sistema de pagos real
- [ ] Envío de emails
- [ ] PWA (Progressive Web App)
- [ ] API REST
- [ ] Autenticación JWT
- [ ] Subida de imágenes
- [ ] Sistema de notificaciones push

## 📝 Notas de Desarrollo

### Estructura de Archivos
- **HTML**: Estructura semántica y accesible
- **CSS**: Organizado por secciones y componentes
- **JavaScript**: Modular y reutilizable

### Convenciones de Código
- **Nombres**: camelCase para funciones y variables
- **Comentarios**: Explicativos y en español
- **Indentación**: 4 espacios
- **Archivos**: Nombres descriptivos y en minúsculas

### Manejo de Errores
- Try-catch en operaciones críticas
- Validación de formularios
- Notificaciones de usuario
- Fallbacks para funcionalidades

## 🤝 Contribución

Este es un proyecto de demostración, pero si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y de demostración.

## 📞 Soporte

Para preguntas o sugerencias:
- **Email**: info@viajesmundo.com
- **Teléfono**: +34 900 123 456

---

**¡Disfruta explorando ViajesMundo! 🌍✈️**
