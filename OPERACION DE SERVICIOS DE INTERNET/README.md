# 🚀 Sistema de Gestión de Telecomunicaciones

Un prototipo funcional para la gestión de clientes, técnicos, tareas y el núcleo de 24 hilos de una empresa de telecomunicaciones.

## 🎯 Características

- **Mobile-First**: Diseño optimizado para dispositivos móviles
- **Dos Roles**: Coordinador/Administrador y Técnico
- **Gestión Completa**: Clientes, tareas, técnicos y núcleo de red
- **Sistema de Notificaciones**: Mensajería en tiempo real entre roles
- **Asignación Automática**: Las tareas se asignan automáticamente a técnicos
- **Validación de Tareas**: Flujo completo de validación por coordinadores
- **Sin Servidor**: Funciona completamente con datos locales
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## 🚀 Cómo Usar

### Opción 1: Servidor Local (Recomendado)

1. **Instalar Python** (si no lo tienes):
   - Descarga desde [python.org](https://python.org)
   - Asegúrate de marcar "Add Python to PATH" durante la instalación

2. **Iniciar el servidor**:
   - **Windows**: Doble clic en `iniciar_servidor.bat`
   - **Mac/Linux**: Ejecuta `python3 server.py` en la terminal

3. **Abrir en el navegador**:
   - Ve a: `http://localhost:8000`
   - El sistema estará listo para usar

### Opción 2: Archivo Directo

1. Abre `index.html` directamente en tu navegador
2. **Nota**: Algunas funciones pueden no funcionar debido a restricciones de CORS

## 🔐 Cómo Iniciar Sesión

### Para Coordinador/Administrador:
1. **Usuario**: Cualquier nombre
2. **Rol**: Selecciona "Coordinador/Administrador"
3. **Contraseña**: Cualquier contraseña
4. **¡Listo!** Acceso completo al sistema

### Para Técnicos:
1. **Usuario**: Cualquier nombre
2. **Rol**: Selecciona "Técnico"
3. **Técnico**: Elige uno de los 3 perfiles:
   - **Juan Pérez** - Instalaciones de Red (Norte y Centro)
   - **Pedro García** - Mantenimiento y Reparaciones (Sur y Este)
   - **Miguel López** - Configuración y Soporte (Oeste y Centro)
4. **Contraseña**: Cualquier contraseña
5. **¡Listo!** Acceso a las tareas específicas del técnico seleccionado

## 👥 Roles del Sistema

### 🔧 Coordinador/Administrador
- Gestionar clientes y técnicos
- Asignar y supervisar tareas
- Administrar núcleo de 24 hilos
- Validar tareas completadas por técnicos
- **Recibir notificaciones** cuando técnicos aceptan/completan tareas
- **Bandeja de entrada** con todas las notificaciones del sistema

### 🛠️ Técnico
- Ver tareas asignadas
- **Recibir notificaciones** cuando se asignan nuevas tareas
- **Aceptar tareas** desde la bandeja de notificaciones
- Reportar finalización de tareas
- Subir observaciones y fotografías
- Actualizar estado de trabajo

## 📱 Navegación

### Para Coordinadores:
- **Inicio** → Dashboard con estadísticas
- **Clientes** → Gestión de base de datos de clientes
- **Tareas** → Asignar y supervisar tareas
- **Técnicos** → Gestión del equipo técnico
- **Núcleo** → Administración del núcleo de 24 hilos
- **Notificaciones** → Bandeja de entrada con notificaciones

### Para Técnicos:
- **Inicio** → Mis tareas asignadas
- **Notificaciones** → Bandeja de entrada con nuevas tareas
- **Salir** → Cerrar sesión

## 🎨 Funcionalidades

### ✅ Gestión de Clientes
- Agregar, editar y eliminar clientes
- Búsqueda y filtros
- Servicios contratados
- Estados de cliente

### ✅ Gestión de Tareas
- **Asignación automática** a técnicos con notificación
- **Estados**: Pendiente, En Progreso, Completada, Validada
- **Flujo completo**: Asignar → Aceptar → Completar → Validar
- **Notificaciones en tiempo real** entre roles
- **Validación por coordinador** con observaciones y fotografías

### ✅ Núcleo de 24 Hilos
- Visualización con colores únicos
- Edición de coordenadas
- Asignación a clientes
- Estados: Activo, Disponible, Mantenimiento

### ✅ Sistema de Notificaciones
- **Bandeja de entrada** para cada rol
- **Notificaciones en tiempo real** (cada 5 segundos)
- **Badges de notificación** en la navegación
- **Flujo bidireccional**: Admin ↔ Técnico
- **Estados de notificación**: Leída/No leída

### ✅ Perfil de Usuario
- Editar información personal
- Cambiar datos de contacto
- Gestión de sesión

## 🔧 Datos de Prueba

El sistema incluye datos de ejemplo:
- **5 Clientes** con diferentes servicios
- **8 Tareas** en diversos estados asignadas a técnicos
- **5 Hilos** del núcleo asignados
- **3 Técnicos especializados** con diferentes áreas de expertise

### 👨‍🔧 Equipo Técnico Disponible:

1. **Juan Pérez** - Instalaciones de Red
   - Zona: Norte y Centro
   - Experiencia: 5 años
   - Tareas completadas: 45

2. **Pedro García** - Mantenimiento y Reparaciones
   - Zona: Sur y Este
   - Experiencia: 7 años
   - Tareas completadas: 62

3. **Miguel López** - Configuración y Soporte
   - Zona: Oeste y Centro
   - Experiencia: 4 años
   - Tareas completadas: 38

## 📁 Estructura del Proyecto

```
📂 Proyecto/
├── 📄 index.html (página principal)
├── 📄 server.py (servidor local)
├── 📄 iniciar_servidor.bat (Windows)
├── 📂 pages/
│   ├── 📄 login.html
│   ├── 📄 dashboard-coordinador.html
│   ├── 📄 dashboard-tecnico.html
│   ├── 📄 clientes.html
│   ├── 📄 tareas.html
│   └── 📄 nucleo.html
├── 📂 assets/
│   └── 📄 styles.css
└── 📂 data/
    ├── 📄 clientes.json
    ├── 📄 tareas.json
    ├── 📄 nucleo.json
    └── 📄 tecnicos.json
```

## 🎨 Diseño

- **Colores**: Azul como color principal (#2196F3)
- **Tipografía**: Segoe UI, limpia y moderna
- **Componentes**: Tarjetas con sombras y efectos hover
- **Navegación**: Barra inferior fija tipo app móvil
- **Responsive**: Grid adaptativo para diferentes pantallas

## 🔒 Seguridad

- **Sesiones**: Gestión con localStorage
- **Validación**: Formularios con validación HTML5
- **Roles**: Acceso diferenciado por tipo de usuario
- **Datos**: Persistencia local sin servidor externo

## 🚨 Solución de Problemas

### Error de CORS
Si ves errores de CORS, usa el servidor local:
```bash
python server.py
```

### Datos no se cargan
Los datos se cargan automáticamente desde localStorage. Si no aparecen, recarga la página.

### Navegación no funciona
Asegúrate de que todos los archivos estén en la estructura correcta.

## 📞 Soporte

Este es un prototipo funcional para demostración. Para implementación en producción, se recomienda:
- Base de datos real
- Autenticación segura
- Servidor backend
- Validación de datos robusta

---

**¡Disfruta usando el sistema! 🎉**
