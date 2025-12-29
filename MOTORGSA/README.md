# 🚗 AutoParts - Sistema de Gestión de Repuestos

## 📋 Descripción
Sistema web completo para la gestión de repuestos automotrices con panel de administración, carrito de compras y gestión de usuarios.

## ✨ Características Principales

### 🛍️ Funcionalidades del Cliente
- **Catálogo de productos** con filtros por categoría
- **Carrito de compras** con gestión de cantidades
- **Sistema de usuarios** (cliente, distribuidor, admin)
- **Perfil de usuario** personalizable
- **Historial de compras** detallado

### 🔧 Panel de Administración
- **Gestión de usuarios** registrados
- **Historial de pagos** y compras
- **Gestión de productos** (agregar, editar, eliminar)
- **Carga masiva** desde archivos Excel
- **Soporte para imágenes locales** y URLs
- **Estadísticas** del sistema

### 🖼️ Manejo de Imágenes
- **Subida de imágenes locales** con conversión a Base64
- **Compatibilidad con URLs** de imágenes
- **Vista previa** en tiempo real
- **Validación de archivos** (tamaño máximo 5MB)
- **Formatos soportados**: JPG, PNG, GIF
- **Aplicable en**:
  - Agregar productos
  - Editar productos
  - Foto de perfil de administrador

## 🎨 Diseño y UX
- **Mobile-first** (máximo 420px ancho)
- **Tema rojo y negro** consistente
- **Interfaz intuitiva** y responsive
- **Animaciones suaves** y transiciones
- **Iconografía FontAwesome**

## 🛠️ Tecnologías Utilizadas
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Funcionalidad dinámica
- **LocalStorage** - Persistencia de datos
- **SheetJS** - Procesamiento de archivos Excel

## 📱 Responsive Design
- **Mobile-first approach**
- **Máximo ancho**: 420px
- **Navegación optimizada** para móviles
- **Controles táctiles** mejorados

## 🔐 Sistema de Autenticación
- **Roles de usuario**:
  - Cliente: Acceso básico al catálogo
  - Distribuidor: Acceso extendido
  - Administrador: Panel completo de gestión
- **Persistencia de sesión** con LocalStorage

## 📊 Gestión de Datos
- **Almacenamiento local** con LocalStorage
- **Estructura de datos** organizada
- **Backup automático** de configuraciones
- **Exportación** de datos en formato Excel

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno
- JavaScript habilitado
- Acceso a internet (para CDNs)

### Instalación
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

### Uso Inicial
1. **Registra un usuario administrador**
2. **Inicia sesión** con las credenciales
3. **Accede al panel de administración**
4. **Agrega productos** y gestiona el sistema

## 📁 Estructura del Proyecto
```
02-Proyecto-Maquetado/
├── index.html              # Página principal
├── assets/
│   └── styles.css          # Estilos principales
├── data/
│   ├── products.js         # Datos de productos
│   └── users.js           # Datos de usuarios
├── pages/
│   ├── home.html          # Página de inicio
│   ├── login.html         # Página de login
│   ├── admin.html         # Panel de administración
│   ├── admin-profile.html # Perfil de administrador
│   ├── cart.html          # Carrito de compras
│   ├── profile.html       # Perfil de usuario
│   └── about.html         # Página de información
└── README.md              # Documentación
```

## 🔧 Funcionalidades Avanzadas

### Gestión de Imágenes
- **Subida local**: Selecciona archivos de tu dispositivo
- **URL externa**: Pega enlaces de imágenes
- **Vista previa**: Visualiza antes de guardar
- **Validación**: Verifica formato y tamaño
- **Conversión automática**: Base64 para almacenamiento

### Carga Masiva de Productos
- **Formato Excel**: .xlsx y .xls
- **Columnas requeridas**: nombre, precio, categoria, imagen
- **Validación automática** de datos
- **Importación en lote** eficiente

### Panel de Administración Mejorado
- **Gestión de usuarios** completa
- **Historial de transacciones** detallado
- **Estadísticas en tiempo real**
- **Interfaz optimizada** para móviles

## 🎯 Características Destacadas

### UX/UI
- **Navegación intuitiva** con iconos
- **Feedback visual** inmediato
- **Mensajes de confirmación** claros
- **Diseño consistente** en todas las páginas

### Rendimiento
- **Carga rápida** de páginas
- **Optimización** de imágenes
- **Gestión eficiente** de memoria
- **Responsive** en todos los dispositivos

### Seguridad
- **Validación de datos** en cliente
- **Sanitización** de inputs
- **Control de acceso** por roles
- **Protección** contra inyección

## 🔄 Actualizaciones Recientes

### v2.0 - Soporte de Imágenes Locales
- ✅ **Subida de imágenes locales** con `<input type="file">`
- ✅ **Conversión automática** a Base64
- ✅ **Compatibilidad** con URLs existentes
- ✅ **Vista previa** en tiempo real
- ✅ **Validación** de archivos (5MB máximo)
- ✅ **Aplicación** en productos y perfil de admin
- ✅ **Diseño mejorado** del panel admin
- ✅ **Aprovechamiento** del espacio de pantalla

## 📞 Soporte
Para consultas o reportes de bugs, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para la gestión eficiente de repuestos automotrices**
