# Viajes Ecuador - Aplicación de Turismo

Una aplicación web completa para la gestión de paquetes turísticos personalizados en Ecuador, con sistema de localidades, filtros por categoría y funcionalidades avanzadas de búsqueda.

## 🚀 Funcionalidades Principales

### 1. Sistema de Localidades
- **8 localidades disponibles**: Quito, Guayaquil, Cuenca, Baños, Manta, Otavalo, Galápagos, Mindo
- **Filtrado por localidad**: Todos los productos están asociados a una localidad específica
- **Integración con transporte**: Sistema basado en destinos de bus disponibles

### 2. Creación de Paquetes Turísticos
- **Flujo de 3 pasos**:
  1. **Selección de localidad**: El usuario elige el destino del paquete
  2. **Información del paquete**: Nombre, descripción, precio, duración, dificultad, etc.
  3. **Agregar productos**: Selección de hoteles, restaurantes y actividades de la localidad elegida

- **Características del paquete**:
  - Foto opcional (con preview)
  - Inclusión de servicios (alojamiento, alimentación, transporte, guía, equipamiento, seguros)
  - Notas adicionales
  - Cálculo automático de precios totales

### 3. Gestión de Paquetes del Usuario
- **Lista de paquetes**: Vista completa de todos los paquetes creados
- **Botón de eliminar**: Con confirmación y actualización en tiempo real
- **Estado vacío**: Mensaje amigable cuando no hay paquetes
- **Información detallada**: Productos incluidos, precios, localidad, duración

### 4. Sistema de Búsqueda Avanzada
- **Búsqueda por texto**: Input de búsqueda que filtra por nombre, descripción y creador
- **Filtros por categoría**: Hoteles, Restaurantes, Actividades
- **Filtro por localidad**: Restringe resultados a una localidad específica
- **Resultados en tiempo real**: Actualización inmediata de resultados

### 5. Navegación y Filtros en Home
- **Botones de categoría funcionales**: Hoteles, Restaurantes, Actividades
- **Filtro por localidad**: Selector de localidad para filtrar productos
- **Productos recomendados**: Vista dinámica según filtros seleccionados
- **Navegación responsiva**: Sistema de navegación inferior funcional

### 6. Categoría de Actividades
- **Reemplazo de "Comidas"**: Cambiado por "Actividades" en toda la aplicación
- **Nuevas actividades de ejemplo**:
  - Caminata Nocturna (Quito)
  - Paseo Matutino (Quito)
  - Tour Guiado (Cuenca)
  - Escalada Ligera (Baños)
  - Ciclismo Urbano (Guayaquil)
  - Kayak en Laguna (Otavalo)
  - Senderismo Ecológico (Mindo)
  - Parapente (Baños)
  - Rafting en Río (Baños)

## 🏗️ Arquitectura del Sistema

### Estructura de Datos
- **Localidades**: Sistema centralizado de destinos turísticos
- **Productos**: Categorizados por tipo y localidad
- **Paquetes**: Asociados a usuario, localidad y productos
- **Persistencia**: localStorage para datos del usuario

### Funciones Principales
- `getLocalidades()`: Obtiene todas las localidades disponibles
- `getProductsByCategoryAndLocalidad()`: Filtra productos por categoría y localidad
- `searchProductsByTextAndLocalidad()`: Búsqueda avanzada con filtros
- `createUserPackage()`: Crea nuevos paquetes
- `deleteUserPackage()`: Elimina paquetes existentes
- `addProductToPackage()`: Agrega productos a paquetes

## 📱 Páginas y Componentes

### 1. `new-package.html`
- **Selector de localidad**: Grid de tarjetas para elegir destino
- **Formulario de paquete**: Campos completos para información del paquete
- **Selector de productos**: Tabs para hoteles, restaurantes y actividades
- **Resumen del paquete**: Vista previa antes de finalizar

### 2. `packages_user.html`
- **Lista de paquetes**: Vista en grid con información completa
- **Botón eliminar**: Funcionalidad de eliminación con confirmación
- **Estado vacío**: Mensaje y botón para crear primer paquete
- **Navegación**: Botones de editar y eliminar por paquete

### 3. `search_user.html`
- **Barra de búsqueda**: Input de texto con botón de búsqueda
- **Filtros de categoría**: Botones para filtrar por tipo de producto
- **Filtro de localidad**: Selector para restringir por destino
- **Resultados dinámicos**: Actualización en tiempo real

### 4. `home_user.html`
- **Botones de categoría**: Hoteles, Restaurantes, Actividades funcionales
- **Filtro de localidad**: Selector para filtrar productos mostrados
- **Productos recomendados**: Vista dinámica según filtros
- **Navegación inferior**: Sistema de navegación completo

## 🎨 Estilos y Diseño

### CSS Variables
- Sistema de colores consistente
- Espaciado y tipografía estandarizados
- Transiciones y animaciones suaves

### Componentes Estilizados
- **Tarjetas de localidad**: Diseño atractivo con hover effects
- **Formularios**: Campos de entrada estilizados y responsivos
- **Productos**: Grid de tarjetas con información completa
- **Paquetes**: Vista detallada con acciones y metadatos

### Responsive Design
- Adaptación a diferentes tamaños de pantalla
- Grid layouts flexibles
- Navegación móvil optimizada

## 🔧 Funcionalidades Técnicas

### Gestión de Estado
- **Paquete activo**: Mantiene estado durante la creación
- **Productos seleccionados**: Lista dinámica con totales
- **Filtros activos**: Persistencia de selecciones del usuario

### Validaciones
- **Campos requeridos**: Validación de formularios
- **Localidad obligatoria**: Selección de destino antes de continuar
- **Productos mínimos**: Verificación antes de finalizar paquete

### Persistencia de Datos
- **localStorage**: Almacenamiento local de paquetes del usuario
- **Sincronización**: Actualización en tiempo real de cambios
- **Backup**: Datos de ejemplo disponibles para nuevos usuarios

## 📋 Checklist de Funcionalidades

### ✅ Implementado
- [x] Creación de paquetes con selector de localidad
- [x] Agregar productos solo de la localidad seleccionada
- [x] Funcionalidad "Agregar productos" con vista en columna
- [x] Botón "Eliminar paquete" con confirmación y actualización
- [x] Estado vacío con botón centrado para crear paquete
- [x] "Crear nuevo paquete" funcional desde todas las páginas
- [x] Búsqueda por texto con resultados filtrados
- [x] Filtros por categoría y localidad en búsqueda
- [x] Botones de Home (Hoteles/Restaurantes/Actividades) funcionales
- [x] Categoría "Actividades" reemplazando "Comidas"
- [x] Actividades de ejemplo cargadas correctamente

### 🔄 En Desarrollo
- [ ] Funcionalidad de edición de paquetes
- [ ] Sistema de favoritos avanzado
- [ ] Integración con sistema de transporte
- [ ] Modo offline completo

## 🚀 Cómo Usar

### 1. Crear un Paquete
1. Navegar a "Paquetes" → "Crear Nuevo Paquete"
2. Seleccionar localidad/destino
3. Completar información del paquete
4. Agregar productos de la localidad seleccionada
5. Finalizar y guardar

### 2. Buscar Productos
1. Ir a "Buscar"
2. Escribir término de búsqueda
3. Usar filtros de categoría y localidad
4. Ver resultados filtrados

### 3. Gestionar Paquetes
1. Navegar a "Mis Paquetes"
2. Ver lista de paquetes creados
3. Eliminar paquetes no deseados
4. Crear nuevos paquetes

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript ES6+**: Funcionalidad dinámica y asíncrona
- **Font Awesome**: Iconografía consistente
- **localStorage**: Persistencia de datos del cliente

## 📁 Estructura de Archivos

```
├── assets/
│   ├── styles.css          # Estilos principales
│   ├── additional-styles.css # Estilos de nuevos componentes
│   └── app.js             # Lógica principal de la aplicación
├── data/
│   ├── products.js        # Datos de productos y funciones auxiliares
│   ├── transport.json     # Datos de transporte
│   └── favorites.json     # Datos de favoritos
├── pages/
│   ├── new-package.html   # Creación de paquetes
│   ├── packages_user.html # Gestión de paquetes
│   ├── search_user.html   # Búsqueda avanzada
│   ├── home_user.html     # Página principal
│   └── profile_user.html  # Perfil del usuario
└── README.md              # Documentación completa
```

## 🔮 Próximas Mejoras

- **Sistema de edición**: Modificar paquetes existentes
- **Favoritos avanzados**: Gestión completa de productos favoritos
- **Transporte integrado**: Selección de rutas de bus
- **Modo offline**: Funcionalidad sin conexión
- **Notificaciones**: Alertas y recordatorios
- **Estadísticas**: Análisis de uso y preferencias

## 📞 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, por favor crear un issue en el repositorio del proyecto.

---

**Desarrollado con ❤️ para el turismo ecuatoriano**
