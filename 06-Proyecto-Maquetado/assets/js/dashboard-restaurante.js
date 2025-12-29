// JavaScript específico para el dashboard del restaurante

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard del restaurante
    initRestauranteDashboard();
    
    // Configurar eventos
    setupRestauranteDashboardEvents();
});

function initRestauranteDashboard() {
    console.log('Inicializando dashboard del restaurante...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para acceder al panel del restaurante');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.RESTAURANT) {
        Notification.error('No tienes permisos para acceder al panel del restaurante');
        Navigation.goToDashboard();
        return;
    }
    
    // Actualizar información del usuario
    updateRestauranteInfo(user);
    
    // Cargar datos del dashboard
    loadRestauranteDashboardData();
}

function setupRestauranteDashboardEvents() {
    // Eventos específicos del dashboard del restaurante
    console.log('Configurando eventos del dashboard del restaurante...');
}

function updateRestauranteInfo(user) {
    // Actualizar saludo del restaurante
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Panel de Restaurante - ${user.name}`;
    }
    
    // Actualizar avatar
    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        avatarElement.textContent = user.avatar;
    }
    
    // Actualizar título de la página
    document.title = `Restaurante Dashboard - ${user.name} - TravelApp`;
}

function loadRestauranteDashboardData() {
    // Cargar estadísticas del restaurante
    loadRestauranteStats();
    
    // Cargar información del restaurante
    loadRestauranteInfo();
}

function loadRestauranteStats() {
    // Obtener reservas del restaurante
    const reservas = Storage.load('restaurante_reservas') || [];
    const totalReservas = reservas.length;
    const ingresosTotales = reservas.reduce((total, r) => total + (r.precio || 0), 0);
    const calificacionPromedio = calcularCalificacionPromedio();
    const capacidadTotal = obtenerCapacidadTotal();
    
    // Actualizar estadísticas
    updateRestauranteStats(totalReservas, ingresosTotales, calificacionPromedio, capacidadTotal);
}

function updateRestauranteStats(reservas, ingresos, calificacion, capacidad) {
    const elements = {
        totalReservas: document.getElementById('totalReservas'),
        ingresosTotales: document.getElementById('ingresosTotales'),
        calificacionPromedio: document.getElementById('calificacionPromedio'),
        capacidadTotal: document.getElementById('capacidadTotal')
    };
    
    if (elements.totalReservas) elements.totalReservas.textContent = reservas;
    if (elements.ingresosTotales) elements.ingresosTotales.textContent = `$${ingresos}`;
    if (elements.calificacionPromedio) elements.calificacionPromedio.textContent = calificacion.toFixed(1);
    if (elements.capacidadTotal) elements.capacidadTotal.textContent = capacidad;
}

function calcularCalificacionPromedio() {
    // Simular cálculo de calificación promedio
    const calificaciones = Storage.load('restaurante_calificaciones') || [];
    if (calificaciones.length === 0) return 4.5; // Calificación por defecto
    
    const suma = calificaciones.reduce((total, cal) => total + cal.puntuacion, 0);
    return suma / calificaciones.length;
}

function obtenerCapacidadTotal() {
    // Obtener información del restaurante
    const restaurantes = Storage.load('restaurantes') || [];
    const restaurante = restaurantes.find(r => r.activo);
    
    if (!restaurante) return 0;
    
    return restaurante.capacidad || 0;
}

function loadRestauranteInfo() {
    const restauranteInfoCard = document.getElementById('restauranteInfoCard');
    if (!restauranteInfoCard) return;
    
    // Obtener información del restaurante
    const restaurantes = Storage.load('restaurantes') || [];
    const restaurante = restaurantes.find(r => r.activo);
    
    if (!restaurante) {
        restauranteInfoCard.innerHTML = `
            <div class="no-restaurante-info">
                <div class="no-restaurante-icon">🍽️</div>
                <h4>No hay información del restaurante</h4>
                <p>Registra tu restaurante para comenzar a gestionar reservas</p>
                <button class="btn btn-primary" onclick="Navigation.goTo('registro-restaurante.html')">
                    Registrar Restaurante
                </button>
            </div>
        `;
        return;
    }
    
    // Mostrar información del restaurante
    restauranteInfoCard.innerHTML = `
        <div class="info-header">
            <div class="info-icon">${restaurante.imagen}</div>
            <div class="info-details">
                <h3>${restaurante.nombre}</h3>
                <p>${restaurante.ubicacion}</p>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-item-icon">🍽️</span>
                <span><strong>Tipo:</strong> ${restaurante.tipo}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">👥</span>
                <span><strong>Capacidad:</strong> ${restaurante.capacidad} personas</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">💰</span>
                <span><strong>Precio:</strong> ${restaurante.precio_rango}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">✅</span>
                <span class="${restaurante.verificado ? 'estado-verificado' : 'estado-pendiente'}">
                    <strong>Estado:</strong> ${restaurante.verificado ? 'Verificado' : 'Pendiente'}
                </span>
            </div>
        </div>
        
        <div class="restaurante-description">
            <h4>Descripción</h4>
            <p>${restaurante.descripcion}</p>
        </div>
        
        <div class="restaurante-specialties">
            <h4>Especialidades</h4>
            <div class="specialties-list">
                ${restaurante.especialidades.map(especialidad => `
                    <span class="specialty-tag">${especialidad}</span>
                `).join('')}
            </div>
        </div>
    `;
}

function showReservas() {
    const modal = document.getElementById('reservasModal');
    if (!modal) return;
    
    // Cargar reservas del restaurante
    loadRestauranteReservas();
    
    // Mostrar modal
    Modal.show('reservasModal');
}

function loadRestauranteReservas() {
    const reservasList = document.getElementById('reservasList');
    if (!reservasList) return;
    
    // Obtener reservas del restaurante
    const reservas = Storage.load('restaurante_reservas') || getSampleRestauranteReservas();
    
    if (reservas.length === 0) {
        reservasList.innerHTML = `
            <div class="no-reservas">
                <div class="no-reservas-icon">📋</div>
                <h4>No hay reservas aún</h4>
                <p>Las reservas aparecerán aquí cuando los clientes reserven tu restaurante</p>
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

function getSampleRestauranteReservas() {
    return [
        {
            id: 1,
            cliente: 'María Rodríguez',
            email: 'maria@email.com',
            telefono: '+52 55 1234 5678',
            fecha: '2024-03-15',
            hora: '19:00',
            personas: 4,
            precio: 120,
            estado: 'confirmada',
            referencia: 'RES-001'
        },
        {
            id: 2,
            cliente: 'Pedro Sánchez',
            email: 'pedro@email.com',
            telefono: '+52 55 2345 6789',
            fecha: '2024-03-20',
            hora: '20:30',
            personas: 2,
            precio: 80,
            estado: 'pendiente',
            referencia: 'RES-002'
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
                <strong>Fecha:</strong> ${DateUtils.format(reserva.fecha)}
            </div>
            <div class="reserva-detail">
                <strong>Hora:</strong> ${reserva.hora}
            </div>
            <div class="reserva-detail">
                <strong>Personas:</strong> ${reserva.personas}
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
    const reservas = Storage.load('restaurante_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'confirmada';
    reserva.fechaConfirmacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('restaurante_reservas', reservas);
    
    // Mostrar notificación
    Notification.success('Reserva confirmada exitosamente');
    
    // Recargar reservas
    loadRestauranteReservas();
    loadRestauranteStats();
}

function cancelarReserva(reservaId) {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        return;
    }
    
    const reservas = Storage.load('restaurante_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'cancelada';
    reserva.fechaCancelacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('restaurante_reservas', reservas);
    
    // Mostrar notificación
    Notification.warning('Reserva cancelada');
    
    // Recargar reservas
    loadRestauranteReservas();
    loadRestauranteStats();
}

function verDetallesReserva(reservaId) {
    const reservas = Storage.load('restaurante_reservas') || [];
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
        Fecha: ${DateUtils.format(reserva.fecha)}
        Hora: ${reserva.hora}
        Personas: ${reserva.personas}
        Precio Total: $${reserva.precio}
        Estado: ${reserva.estado}
        Referencia: ${reserva.referencia}
    `;
    
    alert(detalles);
}

function showMenu() {
    Notification.info('Función de gestión de menú en desarrollo');
}

function showHorarios() {
    Notification.info('Función de gestión de horarios en desarrollo');
}

function showPerfil() {
    Notification.info('Función de gestión de perfil en desarrollo');
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
window.showMenu = showMenu;
window.showHorarios = showHorarios;
window.showPerfil = showPerfil;
window.confirmarReserva = confirmarReserva;
window.cancelarReserva = cancelarReserva;
window.verDetallesReserva = verDetallesReserva;
window.logout = logout;
