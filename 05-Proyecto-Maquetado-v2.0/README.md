# 🇪🇨 Ecuador Travel - Aplicación Web de Paquetes Turísticos

Una aplicación web responsive para armar y personalizar paquetes turísticos en Ecuador, con panel de administración completo.

## 📋 Características

### Para Clientes
- **Login Personalizado**: Acceso con email y nombre (sin contraseña)
- **3 Paquetes Base**: Normal ($150), Premium ($280), Superpremium ($450)
- **Personalización**: Selección de actividades, comidas, número de personas
- **Tours Full Day**: 6 tours adicionales disponibles
- **Transportes**: 5 opciones de transporte según destino y capacidad
- **Envío por WhatsApp**: Generación automática de mensajes con todos los detalles
- **Diseño Responsive**: Optimizado para escritorio con navegación superior

### Para Administradores
- **Login Local**: Acceso seguro con credenciales por defecto
- **Dashboard**: Estadísticas y resumen de paquetes
- **Gestión de Paquetes**: Edición de paquetes base
- **Gestión de Productos**: Hoteles, comidas y actividades
- **Gestión de Clientes**: Visualización de paquetes creados por clientes
- **Configuración**: Número de WhatsApp y mensajes del sistema

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Descarga o clona el proyecto
2. Abre `login.html` en tu navegador (página principal)
3. Inicia sesión con tu información personal
4. Accede a los paquetes turísticos
5. ¡Listo! La aplicación funciona completamente offline

### Estructura del Proyecto
```
/
├── assets/
│   ├── styles.css          # Estilos CSS responsive
│   ├── app.js             # Lógica JavaScript principal
│   ├── images/            # Imágenes (crear según necesidad)
│   └── icons/             # Íconos SVG/PNG
├── login.html             # Página principal (login de clientes)
├── index.html             # Dashboard de paquetes (después del login)
├── pages/
│   ├── normal.html        # Paquete Normal
│   ├── premium.html       # Paquete Premium
│   ├── superpremium.html  # Paquete Superpremium
│   ├── fullday.html       # Tours Full Day
│   ├── transportes.html   # Selección de transportes
│   ├── admin-login.html   # Login de administrador
│   ├── admin-home.html    # Dashboard del admin
│   ├── admin-packages.html # Gestión de paquetes
│   ├── admin-products.html # Gestión de productos
│   └── admin-customers.html # Gestión de clientes
└── data/
    ├── packages.json      # Paquetes base
    ├── products.json      # Hoteles, comidas, actividades
    └── transportes.json   # Opciones de transporte
```

## 🔐 Acceso de Administrador

### Credenciales por Defecto
- **Usuario**: `admin`
- **Contraseña**: `admin123`

### Funciones del Admin
1. **Dashboard**: Ver estadísticas generales
2. **Paquetes**: Editar paquetes base (Normal, Premium, Superpremium)
3. **Productos**: Gestionar hoteles, comidas y actividades
4. **Clientes**: Ver paquetes creados por clientes y cambiar estados
5. **Configuración**: Ajustar número de WhatsApp y mensajes

## 📱 Funcionalidades Principales

### Flujo del Cliente
1. **Selección de Paquete**: Elegir entre Normal, Premium o Superpremium
2. **Personalización**: 
   - Número de personas (1-8)
   - Actividades disponibles según el paquete
   - Comidas incluidas
3. **Tours Adicionales**: Agregar tours Full Day opcionales
4. **Transporte**: Seleccionar según destino y capacidad
5. **Envío**: Generar mensaje de WhatsApp con todos los detalles

### Almacenamiento Local
- **localStorage**: Todos los datos se guardan localmente
- **Persistencia**: Los datos se mantienen entre sesiones
- **Sin Servidor**: Funciona completamente offline

## 🎨 Diseño

### Colores
- **Primario**: Azul (#1e3a8a, #3b82f6)
- **Secundario**: Turquesa (#06b6d4)
- **Acentos**: Verde (#10b981), Amarillo (#f59e0b)
- **Neutros**: Grises (#f3f4f6, #4b5563, #1f2937)

### Responsive
- **Móvil**: 360-420px (optimizado)
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 🔧 Personalización

### Modificar Paquetes
1. Accede al panel de administración
2. Ve a "Gestionar Paquetes"
3. Edita los paquetes existentes o crea nuevos

### Agregar Productos
1. En "Gestionar Productos"
2. Agrega hoteles, comidas o actividades
3. Los cambios se reflejan inmediatamente

### Configurar WhatsApp
1. En el dashboard del admin
2. Cambia el número de WhatsApp
3. Personaliza mensajes del sistema

## 📊 Datos y Estadísticas

### Información Almacenada
- Paquetes creados por clientes
- Selecciones de actividades y comidas
- Tours Full Day seleccionados
- Transportes elegidos
- Fechas y horarios de creación

### Exportación
- Los administradores pueden exportar todos los datos
- Formato JSON para análisis posterior

## 🛠️ Desarrollo

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsive con variables CSS
- **JavaScript ES6+**: Lógica de la aplicación
- **localStorage**: Almacenamiento local
- **Fetch API**: Carga de datos JSON

### Características Técnicas
- **Sin Dependencias**: Solo HTML, CSS y JavaScript puro
- **Modular**: Código organizado en funciones reutilizables
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Accesible**: Navegación por teclado y lectores de pantalla

## 📞 Soporte

### Problemas Comunes
1. **No cargan los datos**: Verifica que los archivos JSON estén en la carpeta `data/`
2. **No funciona WhatsApp**: Verifica el número de teléfono en la configuración
3. **Datos no se guardan**: Verifica que el navegador soporte localStorage

### Contacto
Para soporte técnico o consultas sobre la aplicación, contacta al administrador del sistema.

---

**Ecuador Travel** - Desarrollado con ❤️ para promover el turismo en Ecuador
