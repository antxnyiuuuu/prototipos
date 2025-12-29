# 📖 Guía de Uso - Ecuador Travel

## 🚀 Cómo usar la aplicación

### Para Clientes

#### 1. Acceder a la aplicación
- Abre `pages/index.html` en tu navegador
- Verás la página principal con los 3 paquetes disponibles

#### 2. Seleccionar un paquete
- **Paquete Normal** ($150): Ideal para conocer lo esencial
- **Paquete Premium** ($280): Experiencia completa con lujo
- **Paquete Superpremium** ($450): Máxima exclusividad

#### 3. Personalizar el paquete
- Selecciona el número de personas (1-8)
- Elige las actividades disponibles según tu paquete
- Selecciona las comidas incluidas
- Los cambios se guardan automáticamente

#### 4. Agregar tours adicionales (opcional)
- Ve a "Full Day Tours" desde el menú inferior
- Explora los 6 tours disponibles en Quito
- Agrega los que te interesen a tu paquete

#### 5. Seleccionar transporte
- Ve a "Transportes" desde el menú inferior
- Filtra por destino y número de personas
- Elige el transporte que mejor se adapte

#### 6. Enviar por WhatsApp
- Haz clic en "📱 Enviar por WhatsApp"
- Se abrirá WhatsApp con un mensaje completo
- El mensaje incluye todos los detalles de tu paquete

### Para Administradores

#### 1. Acceder al panel de administración
- Ve a "Admin" desde el menú inferior
- Usa las credenciales:
  - **Usuario**: `admin`
  - **Contraseña**: `admin123`

#### 2. Dashboard principal
- Ve estadísticas generales
- Paquetes más populares
- Paquetes recientes de clientes
- Acciones rápidas

#### 3. Gestionar paquetes
- Ve a "Gestionar Paquetes"
- Edita los paquetes base (Normal, Premium, Superpremium)
- Modifica precios, actividades, comidas
- Los cambios se reflejan inmediatamente

#### 4. Gestionar productos
- Ve a "Gestionar Productos"
- **Hoteles**: Agrega o edita hoteles disponibles
- **Comidas**: Gestiona opciones de comida
- **Actividades**: Modifica actividades turísticas

#### 5. Ver clientes
- Ve a "Clientes" para ver paquetes creados
- Filtra por tipo de paquete o estado
- Cambia el estado de los paquetes (Pendiente → Confirmado → Completado)
- Ve detalles completos de cada paquete

#### 6. Configuración del sistema
- En el dashboard, ajusta:
  - Número de WhatsApp del administrador
  - Mensaje de bienvenida
- Exporta datos para análisis

## 📱 Flujo completo de ejemplo

### Cliente armando un paquete Premium:

1. **Inicio**: Cliente ve los 3 paquetes y elige "Premium"
2. **Personalización**: 
   - Selecciona 4 personas
   - Elige 4 actividades: Centro Histórico, Teleférico, Mitad del Mundo, Otavalo
   - Selecciona comidas: Desayuno Americano, Almuerzo Gourmet
3. **Tours adicionales**: Agrega "Baños de Agua Santa" ($65)
4. **Transporte**: Selecciona "Van Privada" para 4 personas ($45/persona)
5. **Envío**: Genera mensaje de WhatsApp con:
   - Paquete Premium para 4 personas: $280 × 4 = $1,120
   - Tour adicional: $65
   - Transporte: $45 × 4 = $180
   - **Total**: $1,365

### Administrador gestionando:

1. **Login**: Accede con admin/admin123
2. **Dashboard**: Ve que hay 15 paquetes creados, $8,500 en ingresos
3. **Clientes**: Ve el paquete Premium recién creado en estado "Pendiente"
4. **Actualización**: Cambia el estado a "Confirmado"
5. **Configuración**: Actualiza el número de WhatsApp a su número real

## 🔧 Personalización avanzada

### Modificar precios de paquetes:
```javascript
// En el panel de admin, edita los paquetes base
// Los cambios se guardan en localStorage
```

### Agregar nuevos destinos:
```javascript
// Edita data/transportes.json
// Agrega nuevos destinos a los transportes existentes
```

### Personalizar mensajes de WhatsApp:
```javascript
// En el dashboard del admin
// Modifica el mensaje de bienvenida y plantillas
```

## 📊 Datos almacenados

### En localStorage se guarda:
- `customerPackages`: Paquetes creados por clientes
- `selectedFullDayTours`: Tours seleccionados
- `selectedTransport`: Transporte elegido
- `adminSession`: Sesión del administrador
- `systemSettings`: Configuración del sistema
- `package_normal/premium/superpremium`: Datos de cada paquete

### Estructura de un paquete de cliente:
```json
{
  "id": "1234567890",
  "packageType": "premium",
  "persons": 4,
  "activities": ["Centro Histórico", "Teleférico"],
  "meals": ["Desayuno Americano"],
  "fullDayTours": [{"nombre": "Baños", "precio": 65}],
  "transport": {"tipo": "Van Privada", "precio_por_persona": 45},
  "totalPrice": 1365,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "status": "pending"
}
```

## 🛠️ Solución de problemas

### La aplicación no carga:
- Verifica que todos los archivos estén en las carpetas correctas
- Asegúrate de que el navegador soporte JavaScript

### No se guardan los datos:
- Verifica que localStorage esté habilitado
- Limpia la caché del navegador si es necesario

### WhatsApp no funciona:
- Verifica que el número tenga el formato correcto (+593...)
- Asegúrate de tener WhatsApp instalado

### El admin no puede acceder:
- Verifica las credenciales: admin/admin123
- Limpia localStorage si hay problemas de sesión

## 📈 Mejores prácticas

### Para clientes:
- Completa todos los pasos antes de enviar por WhatsApp
- Revisa el resumen antes de confirmar
- Guarda tu selección si planeas continuar más tarde

### Para administradores:
- Revisa regularmente los paquetes pendientes
- Actualiza los estados de los paquetes
- Exporta datos periódicamente para respaldo
- Mantén actualizada la información de productos

---

¡Disfruta usando Ecuador Travel! 🎉

