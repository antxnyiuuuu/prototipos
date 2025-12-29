// JavaScript específico para el dashboard del usuario

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard del usuario
    initUserDashboard();
    
    // Configurar eventos
    setupUserDashboardEvents();
});

function initUserDashboard() {
    console.log('Inicializando dashboard del usuario...');
    
    // Verificar autenticación
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para acceder al dashboard');
        Navigation.goTo('login.html');
        return;
    }
    
    // Actualizar información del usuario
    updateUserInfo(user);
    
    // Cargar datos del dashboard
    loadDashboardData();
    
    // Cargar destinos populares
    loadDestinosPopulares();
}

function setupUserDashboardEvents() {
    // Eventos específicos del dashboard del usuario
    console.log('Configurando eventos del dashboard del usuario...');
}

function updateUserInfo(user) {
    // Actualizar saludo del usuario
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `¡Hola ${user.name}!`;
    }
    
    // Actualizar avatar
    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        avatarElement.textContent = user.avatar;
    }
    
    // Actualizar título de la página
    document.title = `Dashboard - ${user.name} - TravelApp`;
}

function loadDashboardData() {
    // Cargar estadísticas del usuario
    loadUserStats();
    
    // Cargar actividad reciente
    loadRecentActivity();
}

function loadUserStats() {
    // Obtener reservas del usuario
    const reservas = Storage.load('user_reservas') || [];
    const viajesPlanificados = reservas.length;
    const reservasActivas = reservas.filter(r => r.estado === 'activa').length;
    const totalAhorrado = reservas.reduce((total, r) => total + (r.descuento || 0), 0);
    
    // Actualizar estadísticas
    updateStats(viajesPlanificados, reservasActivas, totalAhorrado);
}

function updateStats(viajes, reservas, ahorrado) {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards[0]) {
        statCards[0].querySelector('h3').textContent = viajes;
    }
    
    if (statCards[1]) {
        statCards[1].querySelector('h3').textContent = reservas;
    }
    
    if (statCards[2]) {
        statCards[2].querySelector('h3').textContent = `$${ahorrado}`;
    }
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    // Obtener actividad del usuario
    const actividades = Storage.load('user_actividad') || [];
    
    // Si no hay actividad, mantener el mensaje de bienvenida
    if (actividades.length === 0) {
        return;
    }
    
    // Limpiar lista actual
    activityList.innerHTML = '';
    
    // Agregar actividades
    actividades.slice(0, 5).forEach(actividad => {
        const activityItem = createActivityItem(actividad);
        activityList.appendChild(activityItem);
    });
}

function createActivityItem(actividad) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    item.innerHTML = `
        <div class="activity-icon">${actividad.icono}</div>
        <div class="activity-content">
            <h4>${actividad.titulo}</h4>
            <p>${actividad.descripcion}</p>
            <span class="activity-time">${formatActivityTime(actividad.fecha)}</span>
        </div>
    `;
    
    return item;
}

function formatActivityTime(fecha) {
    const now = new Date();
    const activityDate = new Date(fecha);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Hace unos minutos';
    } else if (diffInHours < 24) {
        return `Hace ${diffInHours} horas`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `Hace ${diffInDays} días`;
    }
}

function loadDestinosPopulares() {
    const destinosGrid = document.getElementById('destinosGrid');
    if (!destinosGrid) return;
    
    // Cargar destinos desde localStorage o datos de ejemplo
    const destinos = Storage.load('destinos') || [];
    
    // Mostrar solo los 3 más populares
    const destinosPopulares = destinos
        .filter(d => d.activo)
        .sort((a, b) => b.popularidad - a.popularidad)
        .slice(0, 3);
    
    destinosGrid.innerHTML = '';
    
    destinosPopulares.forEach(destino => {
        const destinoCard = createDestinoCard(destino);
        destinosGrid.appendChild(destinoCard);
    });
}

function createDestinoCard(destino) {
    const card = document.createElement('div');
    card.className = 'destino-card';
    card.onclick = () => Navigation.goTo('destinos.html');
    
    card.innerHTML = `
        <div class="destino-header">
            <div class="destino-icon">${destino.imagen}</div>
            <div class="destino-info">
                <h3>${destino.nombre}</h3>
                <p>${destino.estado}, ${destino.pais}</p>
            </div>
        </div>
        <p class="destino-descripcion">${destino.descripcion}</p>
        <div class="destino-details">
            <div class="destino-detail">
                <span class="destino-detail-icon">🌡️</span>
                <span>${destino.clima}</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">💰</span>
                <span>${destino.precio_promedio}</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">⭐</span>
                <span>${destino.popularidad}/5</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">📅</span>
                <span>${destino.mejor_epoca}</span>
            </div>
        </div>
    `;
    
    return card;
}

function showReservas() {
    const modal = document.getElementById('reservasModal');
    if (!modal) return;
    
    // Cargar reservas del usuario
    loadUserReservas();
    
    // Mostrar modal
    Modal.show('reservasModal');
}

function loadUserReservas() {
    const reservasList = document.getElementById('reservasList');
    if (!reservasList) return;
    
    // Obtener reservas del usuario
    const reservas = Storage.load('user_reservas') || [];
    
    if (reservas.length === 0) {
        // Mostrar mensaje de no reservas
        reservasList.innerHTML = `
            <div class="no-reservas">
                <div class="no-reservas-icon">📋</div>
                <h4>No tienes reservas aún</h4>
                <p>¡Comienza explorando nuestros destinos!</p>
                <button class="btn btn-primary" onclick="Modal.hide('reservasModal'); Navigation.goTo('destinos.html')">
                    Explorar Destinos
                </button>
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

function createReservaItem(reserva) {
    const item = document.createElement('div');
    item.className = 'reserva-item';
    
    const estadoClass = reserva.estado === 'activa' ? 'activa' : 
                       reserva.estado === 'pendiente' ? 'pendiente' : 'cancelada';
    
    item.innerHTML = `
        <div class="reserva-header">
            <h4 class="reserva-titulo">${reserva.titulo}</h4>
            <span class="reserva-estado ${estadoClass}">${reserva.estado}</span>
        </div>
        <p>${reserva.descripcion}</p>
        <div class="reserva-details">
            <div class="reserva-detail">
                <strong>Fecha:</strong> ${DateUtils.format(reserva.fecha)}
            </div>
            <div class="reserva-detail">
                <strong>Precio:</strong> $${reserva.precio}
            </div>
            <div class="reserva-detail">
                <strong>Destino:</strong> ${reserva.destino}
            </div>
            <div class="reserva-detail">
                <strong>Referencia:</strong> ${reserva.referencia}
            </div>
        </div>
    `;
    
    return item;
}

function showPromociones() {
    const modal = document.getElementById('promocionesModal');
    if (!modal) return;
    
    // Cargar promociones
    loadPromociones();
    
    // Mostrar modal
    Modal.show('promocionesModal');
}

function loadPromociones() {
    const promocionesList = document.getElementById('promocionesList');
    if (!promocionesList) return;
    
    // Obtener promociones
    const promociones = Storage.load('promociones') || getDefaultPromociones();
    
    promocionesList.innerHTML = '';
    
    promociones.forEach(promo => {
        const promocionItem = createPromocionItem(promo);
        promocionesList.appendChild(promocionItem);
    });
}

function createPromocionItem(promo) {
    const item = document.createElement('div');
    item.className = 'promocion-item';
    
    item.innerHTML = `
        <div class="promocion-header">
            <h4 class="promocion-titulo">${promo.titulo}</h4>
            <span class="promocion-descuento">${promo.descuento || '30% OFF'}</span>
        </div>
        <p class="promocion-descripcion">${promo.descripcion}</p>
        <div class="promocion-accion">
            <button class="promocion-btn" onclick="aplicarPromocion('${promo.id}')">
                Aplicar Promoción
            </button>
        </div>
    `;
    
    return item;
}

function getDefaultPromociones() {
    return [
        {
            id: 1,
            titulo: 'Hoteles con 30% OFF',
            descripcion: 'Reserva ahora y ahorra en tu estadía en hoteles seleccionados',
            descuento: '30% OFF',
            activa: true
        },
        {
            id: 2,
            titulo: 'Transporte Gratis',
            descripcion: 'Tu primera reserva de transporte es completamente gratis',
            descuento: '100% OFF',
            activa: true
        },
        {
            id: 3,
            titulo: 'Restaurantes Premium',
            descripcion: 'Descuentos exclusivos en restaurantes de alta cocina',
            descuento: '25% OFF',
            activa: true
        }
    ];
}

function aplicarPromocion(promoId) {
    // Simular aplicación de promoción
    Notification.success('¡Promoción aplicada exitosamente!');
    
    // Agregar a la actividad del usuario
    addUserActivity({
        titulo: 'Promoción Aplicada',
        descripcion: 'Has aplicado una promoción especial',
        icono: '🎉',
        fecha: new Date().toISOString()
    });
    
    // Cerrar modal
    Modal.hide('promocionesModal');
}

function addUserActivity(actividad) {
    const actividades = Storage.load('user_actividad') || [];
    actividades.unshift(actividad);
    
    // Mantener solo las últimas 10 actividades
    if (actividades.length > 10) {
        actividades.splice(10);
    }
    
    Storage.save('user_actividad', actividades);
    
    // Recargar actividad reciente
    loadRecentActivity();
}

function logout() {
    // Confirmar logout
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        UserManager.logout();
        Notification.success('Sesión cerrada exitosamente');
        Navigation.goTo('login.html');
    }
}

// Funciones de utilidad
function refreshDashboard() {
    loadDashboardData();
    loadDestinosPopulares();
    Notification.info('Dashboard actualizado');
}

// Exportar funciones para uso global
window.showReservas = showReservas;
window.showPromociones = showPromociones;
window.aplicarPromocion = aplicarPromocion;
window.logout = logout;
window.refreshDashboard = refreshDashboard;
