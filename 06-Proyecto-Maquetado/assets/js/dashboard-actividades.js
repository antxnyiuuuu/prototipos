// JavaScript específico para el dashboard de actividades

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard de actividades
    initActividadesDashboard();
    
    // Configurar eventos
    setupActividadesDashboardEvents();
});

function initActividadesDashboard() {
    console.log('Inicializando dashboard de actividades...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para acceder al panel de actividades');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.ACTIVIDADES) {
        Notification.error('No tienes permisos para acceder al panel de actividades');
        Navigation.goToDashboard();
        return;
    }
    
    // Actualizar información del usuario
    updateActividadesInfo(user);
    
    // Cargar datos del dashboard
    loadActividadesDashboardData();
}

function setupActividadesDashboardEvents() {
    // Eventos específicos del dashboard de actividades
    console.log('Configurando eventos del dashboard de actividades...');
}

function updateActividadesInfo(user) {
    // Actualizar saludo de actividades
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Panel de Actividades - ${user.name}`;
    }
    
    // Actualizar avatar
    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        avatarElement.textContent = user.avatar;
    }
    
    // Actualizar título de la página
    document.title = `Actividades Dashboard - ${user.name} - TravelApp`;
}

function loadActividadesDashboardData() {
    // Cargar estadísticas de actividades
    loadActividadesStats();
    
    // Cargar información de actividades
    loadActividadesInfo();
}

function loadActividadesStats() {
    // Obtener reservas de actividades
    const reservas = Storage.load('actividades_reservas') || [];
    const totalReservas = reservas.length;
    const ingresosTotales = reservas.reduce((total, r) => total + (r.precio || 0), 0);
    const calificacionPromedio = calcularCalificacionPromedio();
    const actividadesActivas = obtenerActividadesActivas();
    
    // Actualizar estadísticas
    updateActividadesStats(totalReservas, ingresosTotales, calificacionPromedio, actividadesActivas);
}

function updateActividadesStats(reservas, ingresos, calificacion, actividades) {
    const elements = {
        totalReservas: document.getElementById('totalReservas'),
        ingresosTotales: document.getElementById('ingresosTotales'),
        calificacionPromedio: document.getElementById('calificacionPromedio'),
        actividadesActivas: document.getElementById('actividadesActivas')
    };
    
    if (elements.totalReservas) elements.totalReservas.textContent = reservas;
    if (elements.ingresosTotales) elements.ingresosTotales.textContent = `$${ingresos}`;
    if (elements.calificacionPromedio) elements.calificacionPromedio.textContent = calificacion.toFixed(1);
    if (elements.actividadesActivas) elements.actividadesActivas.textContent = actividades;
}

function calcularCalificacionPromedio() {
    // Simular cálculo de calificación promedio
    const calificaciones = Storage.load('actividades_calificaciones') || [];
    if (calificaciones.length === 0) return 4.5; // Calificación por defecto
    
    const suma = calificaciones.reduce((total, cal) => total + cal.puntuacion, 0);
    return suma / calificaciones.length;
}

function obtenerActividadesActivas() {
    // Obtener actividades del proveedor
    const actividades = Storage.load('actividades') || [];
    return actividades.filter(a => a.activo).length;
}

function loadActividadesInfo() {
    const actividadesInfoCard = document.getElementById('actividadesInfoCard');
    if (!actividadesInfoCard) return;
    
    // Obtener información de actividades
    const actividades = Storage.load('actividades') || [];
    const actividadesActivas = actividades.filter(a => a.activo);
    
    if (actividadesActivas.length === 0) {
        actividadesInfoCard.innerHTML = `
            <div class="no-actividades-info">
                <div class="no-actividades-icon">🎯</div>
                <h4>No hay actividades registradas</h4>
                <p>Registra tus actividades para comenzar a recibir reservas</p>
                <button class="btn btn-primary" onclick="Navigation.goTo('registro-actividades.html')">
                    Registrar Actividades
                </button>
            </div>
        `;
        return;
    }
    
    // Mostrar información de actividades
    actividadesInfoCard.innerHTML = `
        <div class="info-header">
            <div class="info-icon">🎯</div>
            <div class="info-details">
                <h3>Mis Actividades</h3>
                <p>${actividadesActivas.length} actividades activas</p>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <span class="info-item-icon">🎯</span>
                <span><strong>Total Actividades:</strong> ${actividadesActivas.length}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">⭐</span>
                <span><strong>Calificación Promedio:</strong> ${calcularCalificacionPromedio().toFixed(1)}/5</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">💰</span>
                <span><strong>Precio Promedio:</strong> $${calcularPrecioPromedio()}</span>
            </div>
            <div class="info-item">
                <span class="info-item-icon">✅</span>
                <span class="estado-verificado">
                    <strong>Estado:</strong> Activo
                </span>
            </div>
        </div>
        
        <div class="actividades-description">
            <h4>Actividades Disponibles</h4>
            <div class="actividades-list">
                ${actividadesActivas.map(actividad => `
                    <div class="actividad-item">
                        <strong>${actividad.nombre}</strong> - $${actividad.precio} (${actividad.duracion})
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function calcularPrecioPromedio() {
    const actividades = Storage.load('actividades') || [];
    const actividadesActivas = actividades.filter(a => a.activo);
    
    if (actividadesActivas.length === 0) return 0;
    
    const suma = actividadesActivas.reduce((total, a) => total + a.precio, 0);
    return Math.round(suma / actividadesActivas.length);
}

function showReservas() {
    const modal = document.getElementById('reservasModal');
    if (!modal) return;
    
    // Cargar reservas de actividades
    loadActividadesReservas();
    
    // Mostrar modal
    Modal.show('reservasModal');
}

function loadActividadesReservas() {
    const reservasList = document.getElementById('reservasList');
    if (!reservasList) return;
    
    // Obtener reservas de actividades
    const reservas = Storage.load('actividades_reservas') || getSampleActividadesReservas();
    
    if (reservas.length === 0) {
        reservasList.innerHTML = `
            <div class="no-reservas">
                <div class="no-reservas-icon">📋</div>
                <h4>No hay reservas aún</h4>
                <p>Las reservas aparecerán aquí cuando los clientes reserven tus actividades</p>
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

function getSampleActividadesReservas() {
    return [
        {
            id: 1,
            cliente: 'Ana García',
            email: 'ana@email.com',
            telefono: '+52 55 1234 5678',
            actividad: 'Tour Arqueológico',
            fecha: '2024-03-15',
            hora: '09:00',
            participantes: 4,
            precio: 300,
            estado: 'confirmada',
            referencia: 'ACT-001'
        },
        {
            id: 2,
            cliente: 'Carlos López',
            email: 'carlos@email.com',
            telefono: '+52 55 2345 6789',
            actividad: 'Snorkel en Cozumel',
            fecha: '2024-03-20',
            hora: '10:00',
            participantes: 2,
            precio: 90,
            estado: 'pendiente',
            referencia: 'ACT-002'
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
        <p>Actividad: ${reserva.actividad} - Referencia: ${reserva.referencia}</p>
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
                <strong>Participantes:</strong> ${reserva.participantes}
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
    const reservas = Storage.load('actividades_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'confirmada';
    reserva.fechaConfirmacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('actividades_reservas', reservas);
    
    // Mostrar notificación
    Notification.success('Reserva confirmada exitosamente');
    
    // Recargar reservas
    loadActividadesReservas();
    loadActividadesStats();
}

function cancelarReserva(reservaId) {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        return;
    }
    
    const reservas = Storage.load('actividades_reservas') || [];
    const reserva = reservas.find(r => r.id == reservaId);
    
    if (!reserva) {
        Notification.error('Reserva no encontrada');
        return;
    }
    
    // Actualizar estado
    reserva.estado = 'cancelada';
    reserva.fechaCancelacion = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('actividades_reservas', reservas);
    
    // Mostrar notificación
    Notification.warning('Reserva cancelada');
    
    // Recargar reservas
    loadActividadesReservas();
    loadActividadesStats();
}

function verDetallesReserva(reservaId) {
    const reservas = Storage.load('actividades_reservas') || [];
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
        Actividad: ${reserva.actividad}
        Fecha: ${DateUtils.format(reserva.fecha)}
        Hora: ${reserva.hora}
        Participantes: ${reserva.participantes}
        Precio Total: $${reserva.precio}
        Estado: ${reserva.estado}
        Referencia: ${reserva.referencia}
    `;
    
    alert(detalles);
}

function showActividades() {
    Notification.info('Función de gestión de actividades en desarrollo');
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
window.showActividades = showActividades;
window.showHorarios = showHorarios;
window.showPerfil = showPerfil;
window.confirmarReserva = confirmarReserva;
window.cancelarReserva = cancelarReserva;
window.verDetallesReserva = verDetallesReserva;
window.logout = logout;
