# TravelApp - Prototipo de App de Viajes y Marketing Digital

## 📱 Descripción del Proyecto

TravelApp es un prototipo completo de aplicación móvil para viajes y marketing digital desarrollado para **Juan KAJSK**. La aplicación permite a los usuarios explorar destinos, reservar servicios de viaje, y gestionar diferentes tipos de proveedores de servicios turísticos.

## 🎯 Características Principales

### 👥 Sistema de Roles
- **Usuario**: Explora destinos y realiza reservas
- **Administrador**: Supervisa y aprueba registros
- **Hotel**: Gestiona reservas y servicios de hospedaje
- **Restaurante**: Administra menús y reservas
- **Actividades**: Gestiona tours y actividades turísticas

### 🚀 Funcionalidades

#### Para Usuarios
- ✅ Exploración de destinos populares
- ✅ Búsqueda y filtrado de servicios
- ✅ Sistema de reservas integrado
- ✅ Gestión de transporte (propio o rentado)
- ✅ Proceso de pago simulado
- ✅ Dashboard personalizado

#### Para Proveedores
- ✅ Registro de servicios (hoteles, restaurantes, actividades)
- ✅ Gestión de reservas
- ✅ Panel de administración personalizado
- ✅ Sistema de verificación

#### Para Administradores
- ✅ Panel de control completo
- ✅ Gestión de usuarios y verificaciones
- ✅ Reportes y estadísticas
- ✅ Configuración del sistema

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo y moderno
- **JavaScript Vanilla**: Funcionalidad interactiva
- **LocalStorage**: Persistencia de datos local
- **JSON**: Datos simulados y configuración

## 📁 Estructura del Proyecto

```
TravelApp/
├── index.html                 # Página principal
├── pages/                     # Páginas de la aplicación
│   ├── login.html            # Sistema de login
│   ├── dashboard-user.html   # Dashboard del usuario
│   ├── dashboard-admin.html  # Dashboard del administrador
│   ├── dashboard-hotel.html  # Dashboard del hotel
│   ├── registro-hotel.html   # Registro de hoteles
│   ├── vehiculos.html        # Gestión de transporte
│   ├── destinos.html         # Exploración de destinos
│   └── pagos.html            # Sistema de pagos
├── assets/                   # Recursos estáticos
│   ├── css/                  # Hojas de estilo
│   │   ├── global.css        # Estilos globales
│   │   ├── home.css          # Estilos de la página principal
│   │   ├── login.css         # Estilos del login
│   │   ├── dashboard.css     # Estilos de dashboards
│   │   ├── admin.css         # Estilos del panel admin
│   │   ├── provider.css      # Estilos de proveedores
│   │   ├── vehiculos.css     # Estilos de vehículos
│   │   ├── destinos.css      # Estilos de destinos
│   │   ├── registro.css      # Estilos de registro
│   │   └── pagos.css         # Estilos de pagos
│   └── js/                   # Scripts JavaScript
│       ├── global.js         # Funciones globales
│       ├── home.js           # Lógica de la página principal
│       ├── login.js          # Lógica del login
│       ├── dashboard-user.js # Lógica del dashboard usuario
│       ├── dashboard-admin.js# Lógica del dashboard admin
│       ├── dashboard-hotel.js# Lógica del dashboard hotel
│       ├── vehiculos.js      # Lógica de vehículos
│       ├── destinos.js       # Lógica de destinos
│       ├── registro-hotel.js # Lógica de registro hotel
│       └── pagos.js          # Lógica de pagos
└── data/                     # Datos simulados
    ├── hoteles.json          # Datos de hoteles
    ├── restaurantes.json     # Datos de restaurantes
    ├── actividades.json      # Datos de actividades
    ├── vehiculos.json        # Datos de vehículos
    └── destinos.json         # Datos de destinos
```

## 🚀 Cómo Usar la Aplicación

### 1. Acceso Rápido
La aplicación incluye **5 botones de login rápido** para testing:
- 👤 **Usuario**: Acceso como cliente
- 👨‍💼 **Admin**: Acceso como administrador
- 🏨 **Hotel**: Acceso como propietario de hotel
- 🍽️ **Restaurante**: Acceso como propietario de restaurante
- 🎯 **Actividades**: Acceso como proveedor de actividades

### 2. Flujo de Usuario
1. **Explorar**: Navegar por destinos y servicios
2. **Transporte**: Elegir entre transporte propio o rentado
3. **Reservar**: Seleccionar hoteles, restaurantes y actividades
4. **Pagar**: Completar el proceso de pago simulado
5. **Confirmar**: Recibir confirmación de la reserva

### 3. Flujo de Proveedor
1. **Registrarse**: Completar formulario de registro
2. **Verificar**: Esperar aprobación del administrador
3. **Gestionar**: Administrar reservas y servicios
4. **Actualizar**: Mantener información actualizada

## 📱 Diseño Responsivo

La aplicación está optimizada para dispositivos móviles con:
- **Ancho mínimo**: 320px
- **Ancho máximo**: 480px
- **Navegación**: Barra inferior fija
- **Interfaz**: Diseño touch-friendly

## 🔧 Características Técnicas

### Gestión de Estado
- **LocalStorage**: Persistencia de datos del usuario
- **Sesiones**: Gestión de login y roles
- **Datos**: Simulación con archivos JSON

### Validaciones
- **Formularios**: Validación en tiempo real
- **Tarjetas**: Validación de números de tarjeta (algoritmo Luhn)
- **Email**: Validación de formato de correo
- **Teléfonos**: Validación de números telefónicos

### Seguridad
- **Autenticación**: Sistema de roles y permisos
- **Verificación**: Proceso de aprobación para proveedores
- **Datos**: Encriptación básica de información sensible

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Gradiente azul-púrpura (#667eea → #764ba2)
- **Secundario**: Grises neutros (#6c757d, #e9ecef)
- **Éxito**: Verde (#28a745)
- **Error**: Rojo (#dc3545)
- **Advertencia**: Amarillo (#ffc107)

### Componentes
- **Cards**: Diseño moderno con sombras
- **Botones**: Efectos hover y estados de carga
- **Modales**: Overlays centrados y responsivos
- **Formularios**: Validación visual en tiempo real

## 📊 Datos Simulados

La aplicación incluye datos de ejemplo para:
- **7 destinos** populares en México
- **5 hoteles** con diferentes categorías
- **5 restaurantes** de diversos tipos
- **5 actividades** turísticas
- **7 vehículos** de diferentes tipos

## 🔄 Flujo de Verificación

1. **Registro**: Proveedor completa formulario
2. **Pendiente**: Estado "pending_verification"
3. **Revisión**: Administrador revisa información
4. **Aprobación**: Cambio a estado "verified"
5. **Activación**: Proveedor puede gestionar servicios

## 💳 Sistema de Pagos

- **Simulación**: Proceso de pago completo
- **Validación**: Números de tarjeta, fechas, CVV
- **Seguridad**: Modal de procesamiento
- **Confirmación**: Voucher y detalles de pago

## 🚀 Instalación y Uso

1. **Clonar/Descargar** el proyecto
2. **Abrir** `index.html` en un navegador web
3. **Usar** los botones de login rápido para testing
4. **Explorar** todas las funcionalidades

## 📝 Notas de Desarrollo

- **Sin Backend**: Todo funciona con JavaScript y LocalStorage
- **Modular**: Código organizado en módulos reutilizables
- **Escalable**: Fácil agregar nuevas funcionalidades
- **Mantenible**: Comentarios y estructura clara

## 🎯 Próximas Mejoras

- [ ] Integración con APIs reales
- [ ] Sistema de notificaciones push
- [ ] Chat en tiempo real
- [ ] Geolocalización
- [ ] PWA (Progressive Web App)
- [ ] Múltiples idiomas
- [ ] Sistema de calificaciones
- [ ] Integración con redes sociales

## 👨‍💻 Desarrollado para

**Juan KAJSK** - Prototipo de aplicación de viajes y marketing digital

---

*Este es un prototipo funcional desarrollado con tecnologías web estándar. Todas las funcionalidades están implementadas y listas para demostración.*
