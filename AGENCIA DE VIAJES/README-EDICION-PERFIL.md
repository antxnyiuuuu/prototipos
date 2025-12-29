# 🎯 Funcionalidad de Edición de Perfil - ViajesMundo

## 📋 Descripción

Se ha implementado una pantalla completa de edición de perfil que permite a los usuarios y administradores modificar su información personal, incluyendo foto de perfil, datos de contacto y preferencias.

## ✨ Características Principales

### 🔐 Gestión de Usuarios
- **Sistema de login simulado** con usuarios predefinidos
- **Gestión de sesiones** usando localStorage
- **Roles diferenciados** (Usuario y Administrador)
- **Persistencia de datos** entre sesiones

### 👤 Edición de Perfil
- **Información personal**: nombre, email, teléfono, fecha de nacimiento, país, ciudad
- **Foto de perfil**: carga desde dispositivo o URL
- **Preferencias**: idioma y notificaciones
- **Vista previa** de imagen antes de guardar

### 🎨 Interfaz de Usuario
- **Diseño moderno** con paleta azul consistente
- **Responsive** para móviles y escritorio
- **Avatar circular** con overlay de cámara
- **Formularios estilizados** con validación

## 🚀 Cómo Usar

### 1. Acceso a la Funcionalidad

#### Para Usuarios:
- Navegar a `pages/usuario.html`
- Hacer clic en el botón **"Editar Perfil"**

#### Para Administradores:
- Navegar a `pages/admin.html`
- Hacer clic en el botón **"Editar Perfil"**

### 2. Credenciales de Prueba

#### Administrador:
- **Email**: `admin@viajesmundo.com`
- **Contraseña**: `admin123`

#### Usuarios:
- **Email**: `maria@ejemplo.com`
- **Contraseña**: `maria123`
- **Email**: `carlos@ejemplo.com`
- **Contraseña**: `carlos123`

### 3. Funcionalidades Disponibles

#### Cambio de Foto de Perfil:
1. **Desde dispositivo**: Hacer clic en el área de carga o en el avatar
2. **Desde URL**: Ingresar URL de imagen en el campo correspondiente
3. **Vista previa**: La imagen se muestra inmediatamente para confirmar

#### Edición de Información:
1. Modificar los campos deseados
2. Hacer clic en **"Guardar Cambios"**
3. Los cambios se aplican automáticamente

#### Cancelación:
- Hacer clic en **"Cancelar"** para volver sin guardar cambios

## 🛠️ Archivos Implementados

### HTML:
- `pages/editarPerfil.html` - Página principal de edición

### JavaScript:
- `assets/js/editarPerfil.js` - Lógica de edición de perfil
- `assets/js/userData.js` - Gestión de datos de usuario

### CSS:
- Estilos agregados a `assets/css/style.css`

### Imágenes:
- `assets/img/default-avatar.svg` - Avatar por defecto

## 🔧 Funcionalidades Técnicas

### Gestión de Estado:
- **localStorage** para persistencia de datos
- **Sesiones de usuario** con información completa
- **Sincronización** entre diferentes páginas

### Validaciones:
- **Campos requeridos** (nombre, email)
- **Formato de imagen** (archivos de imagen válidos)
- **URLs válidas** para imágenes externas

### Notificaciones:
- **Sistema integrado** con el proyecto existente
- **Notificaciones personalizadas** como fallback
- **Feedback visual** para todas las acciones

## 📱 Responsive Design

### Breakpoints:
- **Desktop**: > 768px - Layout completo
- **Tablet**: ≤ 768px - Ajustes de padding y tamaños
- **Mobile**: ≤ 480px - Layout vertical optimizado

### Adaptaciones:
- **Avatar**: Tamaño reducido en móviles
- **Formulario**: Campos apilados verticalmente
- **Botones**: Ancho completo en dispositivos pequeños

## 🔄 Flujo de Datos

1. **Carga inicial**: Se verifica la sesión del usuario
2. **Formulario**: Se llenan los campos con datos actuales
3. **Edición**: El usuario modifica la información
4. **Validación**: Se verifican los campos requeridos
5. **Guardado**: Los datos se almacenan en localStorage
6. **Sincronización**: Se actualizan todas las vistas relacionadas
7. **Redirección**: Se regresa a la página correspondiente

## 🎯 Casos de Uso

### Usuario Regular:
- Actualizar información de contacto
- Cambiar foto de perfil
- Modificar preferencias de idioma
- Ajustar configuración de notificaciones

### Administrador:
- Mantener perfil actualizado
- Gestionar información de contacto
- Personalizar avatar del sistema
- Configurar preferencias administrativas

## 🚨 Consideraciones

### Limitaciones:
- **Sin backend real**: Todos los datos se almacenan en localStorage
- **Imágenes simuladas**: No se suben archivos reales al servidor
- **Sesiones temporales**: Los datos se pierden al limpiar el navegador

### Recomendaciones:
- **Usar navegadores modernos** para mejor compatibilidad
- **Mantener localStorage habilitado** para persistencia
- **Verificar permisos** de archivos en dispositivos móviles

## 🔮 Futuras Mejoras

### Posibles Extensiones:
- **Autenticación real** con backend
- **Subida de archivos** a servidor
- **Validación de contraseñas** más robusta
- **Historial de cambios** en el perfil
- **Sincronización en tiempo real** entre dispositivos

## 📞 Soporte

Para cualquier consulta o problema con la funcionalidad de edición de perfil, revisar:
1. **Consola del navegador** para errores JavaScript
2. **localStorage** para verificar datos guardados
3. **Permisos del navegador** para acceso a archivos

---

**Desarrollado para ViajesMundo** - Sistema de gestión de agencia de viajes
