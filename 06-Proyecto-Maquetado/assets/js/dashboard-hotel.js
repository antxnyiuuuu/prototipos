// JavaScript específico para el dashboard del hotel

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard del hotel
    initHotelDashboard();
    
    // Configurar eventos
    setupHotelDashboardEvents();
});

function initHotelDashboard() {
    console.log('Inicializando dashboard del hotel...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para acceder al panel del hotel');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.HOTEL) {
        Notification.error('No tienes permisos para acceder al panel del hotel');
        Navigation.goToDashboard();
        return;
    }
    
    // Actualizar información del usuario
    updateHotelInfo(user);
    
    // Cargar datos del dashboard
    loadHotelDashboardData();
}

function setupHotelDashboardEvents() {
    // Eventos específicos del dashboard del hotel
    console.log('Configurando eventos del dashboard del hotel...');
}

function updateHotelInfo(user) {
    // Actualizar saludo del hotel
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Panel de Hotel - ${user.name}`;
    }
    
    // Actualizar avatar
    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        avatarElement.textContent = user.avatar;
    }
    
    // Actualizar título de la página
    document.title = `Hotel Dashboard - ${user.name} - TravelApp`;
}

function loadHotelDashboardData() {
    // Cargar estadísticas del hotel
    loadHotelStats();
    
    // Cargar información del hotel
    loadHotelInfo();
}

function loadHotelStats() {
    // Obtener reservas del hotel
    const reservas = Storage.load('hotel_reservas') || [];
    const totalReservas = reservas.length;
    const ingresosTotales = reservas.reduce((total, r) => total + (r.precio || 0), 0);
    const calificacionPromedio = calcularCalificacionPromedio();
    const habitacionesDisponibles = obtenerHabitacionesDisponibles();
    
    // Actualizar estadísticas
    updateHotelStats(totalReservas, ingresosTotales, calificacionPromedio, habitacionesDisponibles);
}

function updateHotelStats(reservas, ingresos, calificacion, habitaciones) {
    const elements = {
        totalReservas: document.getElementById('totalReservas'),
        ingresosTotales: document.getElementById('ingresosTotales'),
        calificacionPromedio: document.getElementById('calificacionPromedio'),
        habitacionesDisponibles: document.getElementById('habitacionesDisponibles')
    };
    
    if (elements.totalReservas) elements.totalReservas.textContent = reservas;
    if (elements.ingresosTotales) elements.ingresosTotales.textContent = `$${ingresos}`;
    if (elements.calificacionPromedio) elements.calificacionPromedio.textContent = calificacion.toFixed(1);
    if (elements.habitacionesDisponibles) elements.habitacionesDisponibles.textContent = habitaciones;
}

function calcularCalificacionPromedio() {
    // Simular cálculo de calificación promedio
    const calificaciones = Storage.load('hotel_calificaciones') || [];
    if (calificaciones.length === 0) return 4.5; // Calificación por defecto
    
    const suma = calificaciones.reduce((total, cal) => total + cal.puntuacion, 0);
    return suma / calificaciones.length;
}

function obtenerHabitacionesDisponibles() {
    // Obtener información del hotel
    const hoteles = Storage.load('hoteles') || [];
    const hotel = hoteles.find(h => h.activo);
    
    if (!hotel) return 0;
    
    // Simular habitaciones disponibles
    const reservas = Storage.load('hotel_reservas') || [];
    const habitacionesOcupadas = reservas.filter(r => r.estado === 'confirmada').length;
    
    return Math.max(0, hotel.habitaciones - habitacionesOcupadas);
}

function loadHotelInfo() {
    const hotelInfoCard = document.getElementById('hotelInfoCard');
    if (!hotelInfoCard) return;
    
    // Obtener información del hotel
    const hoteles = Storage.load('hoteles') || [];
    const hotel = hoteles.find(h => h.activo);
    
    if (!hotel) {
        hotelInfoCard.innerHTML = `
            <div class="no-hotel-info">
                <div class="no-hotel-icon">🏨</div>
                <h4>No hay información del hotel</h4>
                <p>Registra tu hotel para comenzar a gestionar reservas</p>
                <button class="btn btn-primary" onclick="Navigation.goTo('registro-hotel.html')">
                    Registrar Hotel
                </button>
            </div>
        `;
        return;
    }
    
    // Mostrar información del hotel
    hotelInfoCard.innerHTML = `
        <div class="info-header">
            <div class="info-icon">${hotel.imagen}</div>
            <div class="info-details">
                <h3>${hotel.nombre}</h3>
                <p>${hotel.ubicacion}</p>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-item-icon">⭐</span>
                <span><strong>Estrellas:</strong> ${hotel.estrellas}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">🏨</span>
                <span><strong>Habitaciones:</strong> ${hotel.habitaciones}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">💰</span>
                <span><strong>Precio por noche:</strong> $${hotel.precio_noche}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">✅</span>
                <span class="${hotel.verificado ? 'estado-verificado' : 'estado-pendiente'}">
                    <strong>Estado:</strong> ${hotel.verificado ? 'Verificado' : 'Pendiente'}
                </span>
            </div>
        </div>
        
        <div class="hotel-description">
            <h4>Descripción</h4>
            <p>${hotel.descripcion}</p>
        </div>
        
        <div class="hotel-services">
            <h4>Servicios Incluidos</h4>
            <div class="services-list">
                ${hotel.servicios.map(servicio => `
                    <span class="service-tag">${servicio}</span>
                `).join('')}
            </div>
        </div>
    `;
}

function showReservas() {
    const modal = document.getElementById('reservasModal');
    if (!modal) return;
    
    // Cargar reservas del hotel
    loadHotelReservas();
    
    // Mostrar modal
    Modal.show('reservasModal');
}

function loadHotelReservas() {
    const reservasList = document.getElementById('reservasList');
    if (!reservasList) return;
    
    // Obtener reservas del hotel
    const reservas = Storage.load('hotel_reservas') || getSampleHotelReservas();
    
    if (reservas.length === 0) {
        reservasList.innerHTML = `
            <div class="no-reservas">
                <div class="no-reservas-icon">📋</div>
                <h4>No hay reservas aún</h4>
                <p>Las reservas aparecerán aquí cuando los clientes reserven tu hotel</p>
            </div>
        `;
        return;
    }
    
    // Mostrar reservas
    reservasList.innerHTML = '';
    reservas.forEach(reserva => {
        const reservaItem = createReservaItem(reserva);
        reservasList.appendChild(reservaItem);
    });
}

function getSampleHotelReservas() {
    return [
        {
            id: 1,
            cliente: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '+52 55 1234 5678',
            fechaEntrada: '2024-03-15',
            fechaSalida: '2024-03-18',
            habitaciones: 2,
            huespedes: 4,
            precio: 450,
            estado: 'confirmada',
            referencia: 'HTL-001'
        },
        {
            id: 2,
            cliente: 'María García',
            email: 'maria@email.com',
            telefono: '+52 55 2345 6789',
            fechaEntrada: '2024-03-20',
            fechaSalida: '2024-03-22',
            habitaciones: 1,
            huespedes: 2,
            precio: 300,
            estado: 'pendiente',
            referencia: 'HTL-002'
        }
    ];
}

function createReservaItem(reserva) {
    const item = document.createElement('div');
    item.className = 'reserva-item';
    
    const estadoClass = reserva.estado === 'confirmada' ? 'confirmada' : 
                       reserva.estado === 'pendiente' ? 'pendiente' : 'cancelada';
    
    item.innerHTML = `
        <div class="reserva-header">
            <h4 class="reserva-titulo">${reserva.cliente}</h4>
            <span class="reserva-estado ${estadoClass}">${reserva.estado}</span>
        </div>
        <p>Referencia: ${reserva.referencia}</p>
        <div class="reserva-details">
            <div class="reserva-detail">
                <strong>Email:</strong> ${reserva.email}
            </div>
            <div class="reserva-detail">
                <strong>Teléfono:</strong> ${reserva.telefono}
            </div>
            <div class="reserva-detail">
                <strong>Entrada:</strong> ${DateUtils.format(reserva.fechaEntrada)}
            </div>
            <div class="reserva-detail">
                <strong>Salida:</strong> ${DateUtils.format(reserva.fechaSalida)}
            </div>
            <div class="reserva-detail">
                <strong>Habitaciones:</strong> ${reserva.habitaciones}
            </div>
            <div class="reserva-detail">
                <strong>Huéspedes:</strong> ${reserva.huespedes}
            </div>
            <div class="reserva-detail">
                <strong>Precio:</strong> $${reserva.precio}
            </div>
            <div class="reserva-detail">
                <strong>Estado:</strong> ${reserva.estado}
            </div>
        </div>
        <div class="reserva-actions">
            ${reserva.estado === 'pendiente' ? `
                <button class="reserva-btn confirmar" onclick="confirmarReserva('${reserva.id}')">
                    Confirmar
                </button>
                <button class="reserva-btn cancelar" onclick="cancelarReserva('${reserva.id}')">
                    Cancelar
                </button>
            ` : ''}
            <button class="reserva-btn detalles" onclick="verDetallesReserva('${reserva.id}')">
                Detalles
            </button>
        </div>
    `;
    
    return item;
}

function confirmarReserva(reservaId) {
    const reservas = Storage.load('hotel_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'confirmada';
    reserva.fechaConfirmacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('hotel_reservas', reservas);
    
    // Mostrar notificación
    Notification.success('Reserva confirmada exitosamente');
    
    // Recargar reservas
    loadHotelReservas();
    loadHotelStats();
}

function cancelarReserva(reservaId) {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        return;
    }
    
    const reservas = Storage.load('hotel_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'cancelada';
    reserva.fechaCancelacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('hotel_reservas', reservas);
    
    // Mostrar notificación
    Notification.warning('Reserva cancelada');
    
    // Recargar reservas
    loadHotelReservas();
    loadHotelStats();
}

function verDetallesReserva(reservaId) {
    const reservas = Storage.load('hotel_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Mostrar detalles en un alert (en una implementación real sería un modal)
    const detalles = `
        Cliente: ${reserva.cliente}
        Email: ${reserva.email}
        Teléfono: ${reserva.telefono}
        Fecha de Entrada: ${DateUtils.format(reserva.fechaEntrada)}
        Fecha de Salida: ${DateUtils.format(reserva.fechaSalida)}
        Habitaciones: ${reserva.habitaciones}
        Huéspedes: ${reserva.huespedes}
        Precio Total: $${reserva.precio}
        Estado: ${reserva.estado}
        Referencia: ${reserva.referencia}
    `;
    
    alert(detalles);
}

function showHabitaciones() {
    const modal = document.getElementById('habitacionesModal');
    if (!modal) return;
    
    // Cargar habitaciones
    loadHabitaciones();
    
    // Mostrar modal
    Modal.show('habitacionesModal');
}

function loadHabitaciones() {
    const habitacionesContent = document.getElementById('habitacionesContent');
    if (!habitacionesContent) return;
    
    // Obtener habitaciones del hotel
    const habitaciones = Storage.load('hotel_habitaciones') || getSampleHabitaciones();
    
    habitacionesContent.innerHTML = `
        <div class="habitaciones-header">
            <h4>Gestión de Habitaciones</h4>
            <button class="btn btn-primary" onclick="agregarHabitacion()">
                Agregar Habitación
            </button>
        </div>
        
        <div class="habitaciones-list">
            ${habitaciones.map(habitacion => `
                <div class="habitacion-item">
                    <div class="habitacion-header">
                        <h5 class="habitacion-tipo">${habitacion.tipo}</h5>
                        <span class="habitacion-precio">$${habitacion.precio}/noche</span>
                    </div>
                    <div class="habitacion-details">
                        <div class="habitacion-detail">
                            <strong>Capacidad:</strong> ${habitacion.capacidad} personas
                        </div>
                        <div class="habitacion-detail">
                            <strong>Disponibles:</strong> ${habitacion.disponibles}
                        </div>
                        <div class="habitacion-detail">
                            <strong>Servicios:</strong> ${habitacion.servicios.join(', ')}
                        </div>
                        <div class="habitacion-detail">
                            <strong>Estado:</strong> ${habitacion.activa ? 'Activa' : 'Inactiva'}
                        </div>
                    </div>
                    <div class="habitacion-actions">
                        <button class="habitacion-btn editar" onclick="editarHabitacion('${habitacion.id}')">
                            Editar
                        </button>
                        <button class="habitacion-btn eliminar" onclick="eliminarHabitacion('${habitacion.id}')">
                            Eliminar
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function getSampleHabitaciones() {
    return [
        {
            id: 1,
            tipo: 'Habitación Estándar',
            capacidad: 2,
            precio: 150,
            disponibles: 5,
            servicios: ['WiFi', 'TV', 'Aire Acondicionado'],
            activa: true
        },
        {
            id: 2,
            tipo: 'Suite Deluxe',
            capacidad: 4,
            precio: 300,
            disponibles: 2,
            servicios: ['WiFi', 'TV', 'Aire Acondicionado', 'Minibar', 'Jacuzzi'],
            activa: true
        }
    ];
}

function agregarHabitacion() {
    Notification.info('Función de agregar habitación en desarrollo');
}

function editarHabitacion(habitacionId) {
    Notification.info('Función de editar habitación en desarrollo');
}

function eliminarHabitacion(habitacionId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
        Notification.success('Habitación eliminada');
        loadHabitaciones();
    }
}

function showServicios() {
    const modal = document.getElementById('serviciosModal');
    if (!modal) return;
    
    // Cargar servicios
    loadServicios();
    
    // Mostrar modal
    Modal.show('serviciosModal');
}

function loadServicios() {
    const serviciosContent = document.getElementById('serviciosContent');
    if (!serviciosContent) return;
    
    // Obtener servicios del hotel
    const servicios = Storage.load('hotel_servicios') || getSampleServicios();
    
    serviciosContent.innerHTML = `
        <div class="servicios-header">
            <h4>Servicios del Hotel</h4>
            <button class="btn btn-primary" onclick="agregarServicio()">
                Agregar Servicio
            </button>
        </div>
        
        <div class="servicios-list">
            ${servicios.map(servicio => `
                <div class="servicio-item">
                    <div class="servicio-header">
                        <h5 class="servicio-nombre">${servicio.nombre}</h5>
                        <span class="${servicio.disponible ? 'servicio-disponible' : 'servicio-no-disponible'}">
                            ${servicio.disponible ? 'Disponible' : 'No Disponible'}
                        </span>
                    </div>
                    <p>${servicio.descripcion}</p>
                    <div class="servicio-actions">
                        <button class="servicio-btn toggle" onclick="toggleServicio('${servicio.id}')">
                            ${servicio.disponible ? 'Desactivar' : 'Activar'}
                        </button>
                        <button class="servicio-btn editar" onclick="editarServicio('${servicio.id}')">
                            Editar
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function getSampleServicios() {
    return [
        {
            id: 1,
            nombre: 'Piscina',
            descripcion: 'Piscina al aire libre con vista al mar',
            disponible: true
        },
        {
            id: 2,
            nombre: 'Spa',
            descripcion: 'Spa completo con masajes y tratamientos',
            disponible: true
        },
        {
            id: 3,
            nombre: 'Gimnasio',
            descripcion: 'Gimnasio equipado con máquinas modernas',
            disponible: false
        }
    ];
}

function toggleServicio(servicioId) {
    const servicios = Storage.load('hotel_servicios') || [];
    const servicio = servicios.find(s => s.id == servicioId);
    
    if (!servicio) {
        Notification.error('Servicio no encontrado');
        return;
    }
    
    // Cambiar estado
    servicio.disponible = !servicio.disponible;
    
    // Guardar cambios
    Storage.save('hotel_servicios', servicios);
    
    // Mostrar notificación
    Notification.success(`Servicio ${servicio.disponible ? 'activado' : 'desactivado'}`);
    
    // Recargar servicios
    loadServicios();
}

function agregarServicio() {
    Notification.info('Función de agregar servicio en desarrollo');
}

function editarServicio(servicioId) {
    Notification.info('Función de editar servicio en desarrollo');
}

function showPerfil() {
    const modal = document.getElementById('perfilModal');
    if (!modal) return;
    
    // Cargar perfil
    loadPerfil();
    
    // Mostrar modal
    Modal.show('perfilModal');
}

function loadPerfil() {
    const perfilContent = document.getElementById('perfilContent');
    if (!perfilContent) return;
    
    // Obtener información del hotel
    const hoteles = Storage.load('hoteles') || [];
    const hotel = hoteles.find(h => h.activo);
    
    perfilContent.innerHTML = `
        <form class="perfil-form" id="perfilForm">
            <div class="perfil-section">
                <h4>Información Básica</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombre" class="form-label">Nombre del Hotel</label>
                        <input type="text" id="nombre" name="nombre" class="form-input" value="${hotel ? hotel.nombre : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="estrellas" class="form-label">Categoría (Estrellas)</label>
                        <select id="estrellas" name="estrellas" class="form-select" required>
                            <option value="1" ${hotel && hotel.estrellas == 1 ? 'selected' : ''}>1 Estrella</option>
                            <option value="2" ${hotel && hotel.estrellas == 2 ? 'selected' : ''}>2 Estrellas</option>
                            <option value="3" ${hotel && hotel.estrellas == 3 ? 'selected' : ''}>3 Estrellas</option>
                            <option value="4" ${hotel && hotel.estrellas == 4 ? 'selected' : ''}>4 Estrellas</option>
                            <option value="5" ${hotel && hotel.estrellas == 5 ? 'selected' : ''}>5 Estrellas</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="ubicacion" class="form-label">Ubicación</label>
                        <input type="text" id="ubicacion" name="ubicacion" class="form-input" value="${hotel ? hotel.ubicacion : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" id="direccion" name="direccion" class="form-input" value="${hotel ? hotel.direccion : ''}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea id="descripcion" name="descripcion" class="form-textarea" required>${hotel ? hotel.descripcion : ''}</textarea>
                </div>
            </div>
            
            <div class="perfil-section">
                <h4>Información de Contacto</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" class="form-input" value="${hotel ? hotel.telefono : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-input" value="${hotel ? hotel.email : ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="perfil-section">
                <h4>Configuración del Hotel</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="habitaciones" class="form-label">Número de Habitaciones</label>
                        <input type="number" id="habitaciones" name="habitaciones" class="form-input" value="${hotel ? hotel.habitaciones : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="precio_noche" class="form-label">Precio por Noche (USD)</label>
                        <input type="number" id="precio_noche" name="precio_noche" class="form-input" value="${hotel ? hotel.precio_noche : ''}" required>
                    </div>
                </div>
            </div>
            
            <div class="perfil-actions">
                <button type="submit" class="perfil-btn primary">
                    Guardar Cambios
                </button>
                <button type="button" class="perfil-btn secondary" onclick="Modal.hide('perfilModal')">
                    Cancelar
                </button>
            </div>
        </form>
    `;
    
    // Configurar evento del formulario
    const form = document.getElementById('perfilForm');
    if (form) {
        form.addEventListener('submit', handlePerfilSubmit);
    }
}

function handlePerfilSubmit(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('perfilForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Actualizar información del hotel
    updateHotelInfo(formData);
}

function updateHotelInfo(formData) {
    const hoteles = Storage.load('hoteles') || [];
    let hotel = hoteles.find(h => h.activo);
    
    if (!hotel) {
        // Crear nuevo hotel
        hotel = {
            id: Date.now(),
            activo: true,
            verificado: false,
            fecha_registro: new Date().toISOString()
        };
        hoteles.push(hotel);
    }
    
    // Actualizar datos
    hotel.nombre = formData.nombre;
    hotel.estrellas = parseInt(formData.estrellas);
    hotel.ubicacion = formData.ubicacion;
    hotel.direccion = formData.direccion;
    hotel.descripcion = formData.descripcion;
    hotel.telefono = formData.telefono;
    hotel.email = formData.email;
    hotel.habitaciones = parseInt(formData.habitaciones);
    hotel.precio_noche = parseInt(formData.precio_noche);
    hotel.imagen = '🏨';
    
    // Guardar cambios
    Storage.save('hoteles', hoteles);
    
    // Mostrar notificación
    Notification.success('Información del hotel actualizada exitosamente');
    
    // Cerrar modal
    Modal.hide('perfilModal');
    
    // Recargar información
    loadHotelInfo();
}

function logout() {
    // Confirmar logout
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        UserManager.logout();
        Notification.success('Sesión cerrada exitosamente');
        Navigation.goTo('login.html');
    }
}

// Exportar funciones para uso global
window.showReservas = showReservas;
window.showHabitaciones = showHabitaciones;
window.showServicios = showServicios;
window.showPerfil = showPerfil;
window.confirmarReserva = confirmarReserva;
window.cancelarReserva = cancelarReserva;
window.verDetallesReserva = verDetallesReserva;
window.agregarHabitacion = agregarHabitacion;
window.editarHabitacion = editarHabitacion;
window.eliminarHabitacion = eliminarHabitacion;
window.toggleServicio = toggleServicio;
window.agregarServicio = agregarServicio;
window.editarServicio = editarServicio;
window.logout = logout;
