// Funcionalidades específicas del panel de usuario
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    if (!checkUserSession()) {
        window.location.href = 'login.html';
        return;
    }
    
    initUserDashboard();
    initTabs();
    loadUserData();
    loadUserBookings();
    loadPaymentHistory();
    loadActiveBookings();
    initPreferencesForm();
    
    // Escuchar cambios en el perfil del usuario
    window.addEventListener('profileUpdated', function(event) {
        updateUserProfileDisplay(event.detail);
    });
    
    // Actualizar avatar global si está disponible
    if (window.updateGlobalAvatar) {
        window.updateGlobalAvatar();
    }
});

// Verificar sesión de usuario
function checkUserSession() {
    try {
        const session = localStorage.getItem('userSession');
        if (!session) return false;
        
        const userData = JSON.parse(session);
        return userData && userData.email && userData.role !== 'admin';
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return false;
    }
}

// Inicializar dashboard del usuario
function initUserDashboard() {
    // Cargar información del usuario
    displayUserInfo();
}



// Mostrar información del usuario
function displayUserInfo() {
    const userSession = getUserSession();
    if (!userSession) return;
    
    const userNameElement = document.getElementById('userName');
    const memberSinceElement = document.getElementById('memberSince');
    const userAvatarElement = document.getElementById('userAvatar');
    
    if (userNameElement) {
        userNameElement.textContent = userSession.name || 'Usuario';
    }
    
    if (memberSinceElement) {
        const loginTime = new Date(userSession.loginTime);
        memberSinceElement.textContent = loginTime.toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric'
        });
    }
    
    if (userAvatarElement) {
        userAvatarElement.src = userSession.avatar || '../assets/img/default-avatar.svg';
    }
}

// Actualizar información del perfil del usuario
function updateUserProfileDisplay(profileData) {
    const userSession = getUserSession();
    if (!userSession || !profileData) return;
    
    // Actualizar nombre del usuario
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = profileData.name || 'Usuario';
    }
    
    // Actualizar avatar del usuario
    const userAvatarElement = document.getElementById('userAvatar');
    if (userAvatarElement) {
        userAvatarElement.src = profileData.avatar || '../assets/img/default-avatar.svg';
    }
    
    // Actualizar otros elementos que puedan mostrar información del usuario
    const userInfoElements = document.querySelectorAll('.user-info, .user-name, .user-avatar');
    userInfoElements.forEach(element => {
        if (element.classList.contains('user-name')) {
            element.textContent = profileData.name || 'Usuario';
        } else if (element.classList.contains('user-avatar') && element.tagName === 'IMG') {
            element.src = profileData.avatar || '../assets/img/default-avatar.svg';
        }
    });
    
    // Mostrar notificación de actualización
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification('Perfil actualizado correctamente', 'success');
    }
}

// Inicializar sistema de tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remover clase active de todos los tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activar tab seleccionado
            this.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Cargar datos del usuario
function loadUserData() {
    const userSession = getUserSession();
    if (!userSession) return;
    
    // Cargar estadísticas
    loadUserStats();
    
    // Cargar preferencias guardadas
    loadUserPreferences();
}

// Cargar estadísticas del usuario
function loadUserStats() {
    const totalTripsElement = document.getElementById('totalTrips');
    const activeBookingsElement = document.getElementById('activeBookings');
    const userRatingElement = document.getElementById('userRating');
    
    // Obtener reservas del usuario
    const userReservations = getUserReservations();
    
    // Calcular estadísticas
    const totalTrips = userReservations.filter(r => r.status === 'completed').length;
    const activeBookings = userReservations.filter(r => r.status === 'active' || r.status === 'pending').length;
    const averageRating = calculateAverageRating(userReservations);
    
    // Actualizar elementos
    if (totalTripsElement) totalTripsElement.textContent = totalTrips;
    if (activeBookingsElement) activeBookingsElement.textContent = activeBookings;
    if (userRatingElement) userRatingElement.textContent = averageRating.toFixed(1);
}

// Cargar reservas del usuario
function loadUserBookings() {
    loadActiveBookings();
    loadCompletedBookings();
    loadCancelledBookings();
}

// Cargar reservas activas
function loadActiveBookings() {
    const grid = document.getElementById('activeBookingsGrid');
    if (!grid) return;
    
    const activeReservations = getUserReservations().filter(r => 
        r.status === 'active' || r.status === 'pending'
    );
    
    if (activeReservations.length === 0) {
        grid.innerHTML = '<p class="no-bookings">No tienes reservas activas</p>';
        return;
    }
    
    let html = '';
    activeReservations.forEach(reservation => {
        const package = getPackageById(reservation.packageId);
        if (!package) return;
        
        html += createBookingCard(reservation, package);
    });
    
    grid.innerHTML = html;
    
    // Agregar event listeners a los botones
    addBookingEventListeners();
}

// Cargar viajes completados
function loadCompletedBookings() {
    const grid = document.getElementById('completedBookingsGrid');
    if (!grid) return;
    
    const completedReservations = getUserReservations().filter(r => r.status === 'completed');
    
    if (completedReservations.length === 0) {
        grid.innerHTML = '<p class="no-bookings">No tienes viajes completados</p>';
        return;
    }
    
    let html = '';
    completedReservations.forEach(reservation => {
        const package = getPackageById(reservation.packageId);
        if (!package) return;
        
        html += createBookingCard(reservation, package);
    });
    
    grid.innerHTML = html;
}

// Cargar reservas canceladas
function loadCancelledBookings() {
    const grid = document.getElementById('cancelledBookingsGrid');
    if (!grid) return;
    
    const cancelledReservations = getUserReservations().filter(r => r.status === 'cancelled');
    
    if (cancelledReservations.length === 0) {
        grid.innerHTML = '<p class="no-bookings">No tienes reservas canceladas</p>';
        return;
    }
    
    let html = '';
    cancelledReservations.forEach(reservation => {
        const package = getPackageById(reservation.packageId);
        if (!package) return;
        
        html += createBookingCard(reservation, package);
    });
    
    grid.innerHTML = html;
}

// Crear tarjeta de reserva
function createBookingCard(reservation, package) {
    const statusClass = getStatusClass(reservation.status);
    const statusText = getStatusText(reservation.status);
    
    return `
        <div class="booking-card" data-booking-id="${reservation.id}">
            <div class="booking-image">
                <img src="${package.image}" alt="${package.title}" onerror="this.src='../assets/img/placeholder.svg'">
                <div class="booking-status ${statusClass}">${statusText}</div>
            </div>
            <div class="booking-content">
                <h3>${package.title}</h3>
                <p>${package.description}</p>
                <div class="booking-details">
                    <span><i class="fas fa-calendar"></i> ${formatDate(reservation.date)}</span>
                    <span><i class="fas fa-users"></i> ${reservation.passengers} pasajeros</span>
                    <span><i class="fas fa-euro-sign"></i> €${package.price}</span>
                </div>
                <div class="booking-actions">
                    ${getBookingActions(reservation)}
                </div>
            </div>
        </div>
    `;
}

// Obtener clase CSS para el estado
function getStatusClass(status) {
    switch (status) {
        case 'active': return 'status-active';
        case 'pending': return 'status-pending';
        case 'completed': return 'status-completed';
        case 'cancelled': return 'status-cancelled';
        default: return 'status-default';
    }
}

// Obtener texto del estado
function getStatusText(status) {
    switch (status) {
        case 'active': return 'Activa';
        case 'pending': return 'Pendiente';
        case 'completed': return 'Completado';
        case 'cancelled': return 'Cancelado';
        default: return 'Desconocido';
    }
}

// Obtener acciones disponibles para la reserva
function getBookingActions(reservation) {
    let actions = '';
    
    if (reservation.status === 'active' || reservation.status === 'pending') {
        actions += `
            <button class="btn btn-outline btn-sm" onclick="cancelBooking(${reservation.id})">
                <i class="fas fa-times"></i> Cancelar
            </button>
        `;
    }
    
    if (reservation.status === 'completed') {
        actions += `
            <button class="btn btn-outline btn-sm" onclick="rateBooking(${reservation.id})">
                <i class="fas fa-star"></i> Valorar
            </button>
        `;
    }
    
    return actions;
}

// Agregar event listeners a las reservas
function addBookingEventListeners() {
    const cancelButtons = document.querySelectorAll('[onclick*="cancelBooking"]');
    const rateButtons = document.querySelectorAll('[onclick*="rateBooking"]');
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookingId = this.closest('.booking-card').dataset.bookingId;
            cancelBooking(parseInt(bookingId));
        });
    });
    
    rateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookingId = this.closest('.booking-card').dataset.bookingId;
            rateBooking(parseInt(bookingId));
        });
    });
}

// Cancelar reserva
function cancelBooking(bookingId) {
    if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
        return;
    }
    
    try {
        const userReservations = getUserReservations();
        const reservationIndex = userReservations.findIndex(r => r.id === bookingId);
        
        if (reservationIndex !== -1) {
            userReservations[reservationIndex].status = 'cancelled';
            userReservations[reservationIndex].cancelledAt = new Date().toISOString();
            
            // Guardar cambios
            localStorage.setItem('userReservations', JSON.stringify(userReservations));
            
            // Recargar reservas
            loadUserBookings();
            loadUserData();
            
            showNotification('Reserva cancelada exitosamente', 'success');
        }
    } catch (error) {
        console.error('Error al cancelar reserva:', error);
        showNotification('Error al cancelar la reserva', 'error');
    }
}

// Valorar reserva
function rateBooking(bookingId) {
    const rating = prompt('¿Cómo calificarías tu experiencia? (1-5 estrellas)');
    
    if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
        try {
            const userReservations = getUserReservations();
            const reservationIndex = userReservations.findIndex(r => r.id === bookingId);
            
            if (reservationIndex !== -1) {
                userReservations[reservationIndex].rating = parseInt(rating);
                userReservations[reservationIndex].ratedAt = new Date().toISOString();
                
                // Guardar cambios
                localStorage.setItem('userReservations', JSON.stringify(userReservations));
                
                showNotification('¡Gracias por tu valoración!', 'success');
            }
        } catch (error) {
            console.error('Error al valorar reserva:', error);
            showNotification('Error al guardar la valoración', 'error');
        }
    }
}

// Cargar historial de pagos
function loadPaymentHistory() {
    const tableBody = document.getElementById('paymentsTableBody');
    if (!tableBody) return;
    
    const userReservations = getUserReservations();
    const payments = generatePaymentHistory(userReservations);
    
    if (payments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay pagos registrados</td></tr>';
        return;
    }
    
    let html = '';
    payments.forEach(payment => {
        html += `
            <tr>
                <td>${formatDate(payment.date)}</td>
                <td>${payment.concept}</td>
                <td>€${payment.amount}</td>
                <td><span class="status ${payment.status}">${getPaymentStatusText(payment.status)}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm" onclick="downloadInvoice(${payment.id})">
                        <i class="fas fa-download"></i> Factura
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Generar historial de pagos
function generatePaymentHistory(reservations) {
    const payments = [];
    
    // Agregar datos ficticios de pagos para demostración
    const mockPayments = [
        {
            id: 1,
            date: '2024-01-15',
            concept: 'Reserva: Europa Clásica',
            amount: 1299,
            status: 'completed'
        },
        {
            id: 2,
            date: '2024-02-20',
            concept: 'Reserva: Caribe Exótico',
            amount: 899,
            status: 'completed'
        },
        {
            id: 3,
            date: '2024-03-10',
            concept: 'Reserva: Asia Misteriosa',
            amount: 1599,
            status: 'pending'
        },
        {
            id: 4,
            date: '2024-04-05',
            concept: 'Reserva: Islas Griegas',
            amount: 799,
            status: 'completed'
        },
        {
            id: 5,
            date: '2024-05-12',
            concept: 'Reserva: Safari Africano',
            amount: 1899,
            status: 'refunded'
        }
    ];
    
    // Agregar pagos de las reservas reales si existen
    reservations.forEach(reservation => {
        const package = getPackageById(reservation.packageId);
        if (!package) return;
        
        payments.push({
            id: reservation.id,
            date: reservation.createdAt,
            concept: `Reserva: ${package.title}`,
            amount: package.price,
            status: reservation.status === 'completed' ? 'completed' : 
                   reservation.status === 'cancelled' ? 'refunded' : 'pending'
        });
    });
    
    // Combinar pagos ficticios con pagos reales
    const allPayments = [...mockPayments, ...payments];
    
    return allPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Obtener texto del estado de pago
function getPaymentStatusText(status) {
    switch (status) {
        case 'completed': return 'Completado';
        case 'pending': return 'Pendiente';
        case 'refunded': return 'Reembolsado';
        default: return 'Desconocido';
    }
}

// Descargar factura (simulado)
function downloadInvoice(paymentId) {
    showNotification('Descargando factura...', 'info');
    // Aquí se simularía la descarga de la factura
    setTimeout(() => {
        showNotification('Factura descargada exitosamente', 'success');
    }, 2000);
}

// Cargar preferencias del usuario
function loadUserPreferences() {
    const preferences = getUserPreferences();
    
    if (preferences.destinations) {
        document.getElementById('preferredDestinations').value = preferences.destinations;
    }
    if (preferences.budgetRange) {
        document.getElementById('budgetRange').value = preferences.budgetRange;
    }
    if (preferences.travelStyle) {
        document.getElementById('travelStyle').value = preferences.travelStyle;
    }
    if (preferences.groupSize) {
        document.getElementById('groupSize').value = preferences.groupSize;
    }
}

// Inicializar formulario de preferencias
function initPreferencesForm() {
    const form = document.querySelector('.preferences-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveUserPreferences();
    });
}

// Guardar preferencias del usuario
function saveUserPreferences() {
    const form = document.querySelector('.preferences-form');
    const formData = new FormData(form);
    
    const preferences = {
        destinations: formData.get('preferredDestinations'),
        budgetRange: formData.get('budgetRange'),
        travelStyle: formData.get('travelStyle'),
        groupSize: formData.get('groupSize'),
        updatedAt: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        showNotification('Preferencias guardadas exitosamente', 'success');
    } catch (error) {
        console.error('Error al guardar preferencias:', error);
        showNotification('Error al guardar las preferencias', 'error');
    }
}

// Obtener preferencias del usuario
function getUserPreferences() {
    try {
        const preferences = localStorage.getItem('userPreferences');
        return preferences ? JSON.parse(preferences) : {};
    } catch (error) {
        console.error('Error al obtener preferencias:', error);
        return {};
    }
}

// Obtener reservas del usuario
function getUserReservations() {
    try {
        const reservations = localStorage.getItem('userReservations');
        const savedReservations = reservations ? JSON.parse(reservations) : [];
        
        // Agregar datos ficticios para demostración si no hay reservas guardadas
        if (savedReservations.length === 0) {
            const mockReservations = [
                {
                    id: 1,
                    packageId: 1,
                    date: '2024-06-15',
                    passengers: 2,
                    status: 'active',
                    createdAt: '2024-01-15T10:30:00Z',
                    rating: 5
                },
                {
                    id: 2,
                    packageId: 2,
                    date: '2024-07-10',
                    passengers: 1,
                    status: 'pending',
                    createdAt: '2024-02-20T14:15:00Z'
                },
                {
                    id: 3,
                    packageId: 3,
                    date: '2024-05-20',
                    passengers: 3,
                    status: 'completed',
                    createdAt: '2024-03-10T09:45:00Z',
                    rating: 4
                },
                {
                    id: 4,
                    packageId: 6,
                    date: '2024-04-15',
                    passengers: 2,
                    status: 'completed',
                    createdAt: '2024-04-05T16:20:00Z',
                    rating: 5
                },
                {
                    id: 5,
                    packageId: 4,
                    date: '2024-08-30',
                    passengers: 4,
                    status: 'cancelled',
                    createdAt: '2024-05-12T11:00:00Z',
                    cancelledAt: '2024-05-25T13:30:00Z'
                }
            ];
            
            // Guardar las reservas ficticias en localStorage
            localStorage.setItem('userReservations', JSON.stringify(mockReservations));
            return mockReservations;
        }
        
        return savedReservations;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return [];
    }
}

// Obtener paquete por ID
function getPackageById(id) {
    // Simular base de datos de paquetes
    const packages = [
        { id: 1, title: 'Europa Clásica', description: '8 días visitando París, Roma y Barcelona', price: 1299, image: '../assets/img/package1.jpg' },
        { id: 2, title: 'Caribe Exótico', description: '6 días en Cancún con todo incluido', price: 899, image: '../assets/img/package2.jpg' },
        { id: 3, title: 'Asia Misteriosa', description: '10 días explorando Tailandia y Vietnam', price: 1599, image: '../assets/img/package3.jpg' },
        { id: 4, title: 'Safari Africano', description: '7 días en Kenia y Tanzania', price: 1899, image: '../assets/img/package4.jpg' },
        { id: 5, title: 'Australia y Nueva Zelanda', description: '14 días explorando Oceanía', price: 2499, image: '../assets/img/package5.jpg' },
        { id: 6, title: 'Islas Griegas', description: '5 días en Santorini y Mykonos', price: 799, image: '../assets/img/package6.jpg' }
    ];
    
    return packages.find(p => p.id === id);
}

// Calcular puntuación promedio
function calculateAverageRating(reservations) {
    const ratedReservations = reservations.filter(r => r.rating);
    
    if (ratedReservations.length === 0) return 0;
    
    const totalRating = ratedReservations.reduce((sum, r) => sum + r.rating, 0);
    return totalRating / ratedReservations.length;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Obtener sesión del usuario
function getUserSession() {
    try {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}

// Cerrar sesión
function logout() {
    try {
        localStorage.removeItem('userSession');
        localStorage.removeItem('rememberMe');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification(message, type);
    } else {
        // Fallback si no está disponible la función global
        alert(message);
    }
}

// Exportar funciones para uso global
window.UserManager = {
    cancelBooking,
    rateBooking,
    downloadInvoice,
    saveUserPreferences,
    logout
};

// Funciones para el carrusel de reservas activas
function loadActiveBookings() {
    const carouselContainer = document.getElementById('bookingsCarousel');
    if (!carouselContainer) return;
    
    const activeBookings = getActiveBookings();
    
    if (activeBookings.length === 0) {
        carouselContainer.innerHTML = `
            <div class="no-bookings">
                <i class="fas fa-calendar-check"></i>
                <h3>No tienes reservas activas</h3>
                <p>¡Reserva tu próximo viaje y aparecerá aquí!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    activeBookings.forEach(booking => {
        html += createBookingCard(booking);
    });
    
    carouselContainer.innerHTML = html;
    initBookingsCarousel();
}

function getActiveBookings() {
    // Simular reservas activas (futuras)
    return [
        {
            id: 1,
            title: 'Europa Clásica',
            destination: 'París, Roma, Barcelona',
            startDate: '2024-06-15',
            endDate: '2024-06-23',
            image: '../assets/img/package1.jpg',
            status: 'confirmed'
        },
        {
            id: 2,
            title: 'Caribe Exótico',
            destination: 'Cancún, México',
            startDate: '2024-07-10',
            endDate: '2024-07-16',
            image: '../assets/img/package2.jpg',
            status: 'confirmed'
        },
        {
            id: 3,
            title: 'Asia Misteriosa',
            destination: 'Tailandia, Vietnam',
            startDate: '2024-08-05',
            endDate: '2024-08-15',
            image: '../assets/img/package3.jpg',
            status: 'pending'
        },
        {
            id: 4,
            title: 'Islas Griegas',
            destination: 'Santorini, Mykonos',
            startDate: '2024-09-20',
            endDate: '2024-09-25',
            image: '../assets/img/package6.jpg',
            status: 'confirmed'
        }
    ];
}

function createBookingCard(booking) {
    const statusClass = booking.status === 'confirmed' ? 'confirmed' : 'pending';
    const statusText = booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente';
    
    return `
        <div class="booking-card">
            <img src="${booking.image}" alt="${booking.title}" onerror="this.src='../assets/img/placeholder.svg'">
            <div class="booking-card-content">
                <h3>${booking.title}</h3>
                <p>${booking.destination}</p>
                <div class="booking-dates">
                    <span><i class="fas fa-calendar"></i> ${formatDate(booking.startDate)}</span>
                    <span><i class="fas fa-calendar-check"></i> ${formatDate(booking.endDate)}</span>
                </div>
                <div class="booking-status ${statusClass}">
                    <i class="fas fa-circle"></i> ${statusText}
                </div>
                <button class="btn btn-outline" onclick="viewBookingDetails(${booking.id})">
                    Ver Detalles
                </button>
            </div>
        </div>
    `;
}

function initBookingsCarousel() {
    const prevBtn = document.getElementById('prevBooking');
    const nextBtn = document.getElementById('nextBooking');
    const carousel = document.getElementById('bookingsCarousel');
    
    if (!prevBtn || !nextBtn || !carousel) return;
    
    let scrollPosition = 0;
    const scrollAmount = 320; // Ancho de la tarjeta + gap
    
    prevBtn.addEventListener('click', () => {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateBookingsCarouselButtons();
    });
    
    nextBtn.addEventListener('click', () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateBookingsCarouselButtons();
    });
    
    // Actualizar botones al cargar
    updateBookingsCarouselButtons();
    
    // Actualizar botones al hacer scroll
    carousel.addEventListener('scroll', updateBookingsCarouselButtons);
}

function updateBookingsCarouselButtons() {
    const prevBtn = document.getElementById('prevBooking');
    const nextBtn = document.getElementById('nextBooking');
    const carousel = document.getElementById('bookingsCarousel');
    
    if (!prevBtn || !nextBtn || !carousel) return;
    
    const isAtStart = carousel.scrollLeft === 0;
    const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1;
    
    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
}

function viewBookingDetails(bookingId) {
    // Simular vista de detalles de la reserva
    showNotification('Funcionalidad de detalles en desarrollo', 'info');
}
