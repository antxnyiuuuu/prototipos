// Variable global para el paquete seleccionado
let selectedPackage = null;

// Funcionalidades específicas de la página de agenda
document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    loadPackages();
    initReservationModal();
    
    // Escuchar cambios en paquetes
    window.addEventListener('packagesChanged', function() {
        loadPackages();
    });
});

// Función para obtener paquetes del gestor centralizado
function getAgendaPackages() {
    return window.PackageManager ? window.PackageManager.getActivePackages() : [];
}

// Calendario
function initCalendar() {
    const calendarDates = document.getElementById('calendarDates');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Función para renderizar el calendario
    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
        
        let calendarHTML = '';
        const currentDateObj = new Date();
        
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isToday = date.toDateString() === currentDateObj.toDateString();
            const isPast = date < currentDateObj;
            
            let dateClass = 'calendar-date';
            if (!isCurrentMonth) dateClass += ' other-month';
            if (isToday) dateClass += ' today';
            if (isPast) dateClass += ' past';
            
            calendarHTML += `
                <div class="${dateClass}" data-date="${date.toISOString().split('T')[0]}">
                    ${date.getDate()}
                </div>
            `;
        }
        
        calendarDates.innerHTML = calendarHTML;
        currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric'
        });
        
        // Agregar event listeners a las fechas
        addDateEventListeners();
    }
    
    // Event listeners para navegación del calendario
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Renderizar calendario inicial
    renderCalendar();
}

// Agregar event listeners a las fechas del calendario
function addDateEventListeners() {
    const dateElements = document.querySelectorAll('.calendar-date:not(.other-month):not(.past)');
    
    dateElements.forEach(dateElement => {
        dateElement.addEventListener('click', function() {
            const selectedDate = this.dataset.date;
            
            // Verificar si hay un paquete seleccionado y validar fechas disponibles
            if (selectedPackage && selectedPackage.availableDates) {
                const isAvailable = selectedPackage.availableDates.includes(selectedDate);
                
                if (!isAvailable) {
                    showNotification('La fecha seleccionada no está disponible para este paquete', 'error');
                    return;
                }
            }
            
            // Remover selección previa
            document.querySelectorAll('.calendar-date.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Agregar selección a la fecha clickeada
            this.classList.add('selected');
            
            showNotification(`Fecha seleccionada: ${formatDate(selectedDate)}`, 'info');
            
            // Actualizar fecha en el modal de reserva si está abierto
            const reservationDateInput = document.getElementById('reservationDate');
            if (reservationDateInput) {
                reservationDateInput.value = selectedDate;
            }
            
            // Calcular fecha de regreso si hay un paquete seleccionado
            if (selectedPackage) {
                calculateReturnDate();
            }
        });
    });
}

// Cargar paquetes disponibles
function loadPackages() {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;
    
    let packagesHTML = '';
    
    getAgendaPackages().forEach(package => {
        const availableDatesHtml = package.availableDates && package.availableDates.length > 0 
            ? `
                <div class="available-dates">
                    <h4><i class="fas fa-calendar-alt"></i> Fechas Disponibles</h4>
                    <div class="dates-display">
                        ${package.availableDates.slice(0, 3).map(date => 
                            `<span class="date-chip">${formatDateForDisplay(date)}</span>`
                        ).join('')}
                        ${package.availableDates.length > 3 
                            ? `<span class="date-chip">+${package.availableDates.length - 3} más</span>` 
                            : ''
                        }
                    </div>
                </div>
            ` 
            : '';
        
        packagesHTML += `
            <div class="package-card" data-package-id="${package.id}">
                <div class="package-image">
                    <img src="${package.image}" alt="${package.title}" onerror="this.src='../assets/img/placeholder.jpg'">
                    <div class="package-price">€${package.price}</div>
                </div>
                <div class="package-content">
                    <h3>${package.title}</h3>
                    <p>${package.description}</p>
                    <div class="package-details">
                        <span><i class="fas fa-calendar"></i> ${package.duration} días</span>
                        <span><i class="fas fa-star"></i> ${package.rating}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${package.destination}</span>
                    </div>
                    ${availableDatesHtml}
                    <button class="btn btn-secondary reserve-btn" onclick="openReservationModal(${package.id})">
                        Reservar
                    </button>
                </div>
            </div>
        `;
    });
    
    packagesGrid.innerHTML = packagesHTML;
}

// Modal de reserva
function initReservationModal() {
    const modal = document.getElementById('reservationModal');
    const closeModal = document.getElementById('closeModal');
    const cancelReservation = document.getElementById('cancelReservation');
    const confirmReservation = document.getElementById('confirmReservation');
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    if (cancelReservation) {
        cancelReservation.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Confirmar reserva
    if (confirmReservation) {
        confirmReservation.addEventListener('click', handleReservationConfirmation);
    }
    
    // Establecer fecha mínima en el input de fecha
    const reservationDateInput = document.getElementById('reservationDate');
    if (reservationDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        reservationDateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Event listener para calcular fecha de regreso automáticamente
        reservationDateInput.addEventListener('change', calculateReturnDate);
    }
}

// Abrir modal de reserva
function openReservationModal(packageId) {
    // Verificar sesión antes de abrir el modal de reserva
    if (window.ViajesMundo && window.ViajesMundo.requireLogin) {
        const canProceed = window.ViajesMundo.requireLogin('hacer una reserva', function() {
            // Callback que se ejecuta si el usuario está logueado
            openReservationModalInternal(packageId);
        });
        
        if (!canProceed) {
            return; // No continuar si no está logueado
        }
    } else {
        // Fallback si no está disponible la función de verificación
        openReservationModalInternal(packageId);
    }
}

// Función interna para abrir el modal de reserva
function openReservationModalInternal(packageId) {
    const package = getAgendaPackages().find(p => p.id === packageId);
    if (!package) return;
    
    selectedPackage = package;
    
    const modal = document.getElementById('reservationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDuration = document.getElementById('modalDuration');
    const modalRating = document.getElementById('modalRating');
    const modalPrice = document.getElementById('modalPrice');
    
    // Llenar información del paquete
    if (modalTitle) modalTitle.textContent = package.title;
    if (modalDescription) modalDescription.textContent = package.description;
    if (modalDuration) modalDuration.textContent = `${package.duration} días`;
    if (modalRating) modalRating.textContent = package.rating;
    if (modalPrice) modalPrice.textContent = `€${package.price}`;
    
    // Cargar carrusel de imágenes
    loadPackageImages(package);
    
    // Marcar fechas disponibles en el calendario
    markAvailableDates(package.availableDates || []);
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Guardar ID del paquete seleccionado
    modal.dataset.packageId = packageId;
    
    // Calcular fecha de regreso inicial
    calculateReturnDate();
}

// Manejar confirmación de reserva
function handleReservationConfirmation() {
    const modal = document.getElementById('reservationModal');
    const form = document.getElementById('reservationForm');
    const packageId = modal.dataset.packageId;
    
    if (!validateForm(form)) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    const formData = new FormData(form);
    const reservationData = {
        packageId: parseInt(packageId),
        date: formData.get('reservationDate'),
        passengers: formData.get('passengers'),
        specialRequests: formData.get('specialRequests'),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Simular guardado de reserva
    saveReservation(reservationData);
    
    // Cerrar modal
    modal.classList.remove('active');
    
    // Limpiar formulario
    form.reset();
    
    // Añadir al carrito con cantidad = pasajeros
    try {
        const passengersNum = Math.max(1, parseInt(reservationData.passengers || '1', 10));
        const pkg = getAgendaPackages().find(p => p.id === reservationData.packageId);
        if (pkg) {
            const cart = loadCart();
            const existing = cart.find(i => i.id === pkg.id);
            if (existing) {
                existing.qty += passengersNum;
            } else {
                cart.push({ id: pkg.id, title: pkg.title, price: pkg.price, qty: passengersNum, image: pkg.image });
            }
            saveCart(cart);
        }
    } catch (e) {
        console.error('Error al agregar al carrito desde agenda:', e);
    }

    // Confirmación y redirección al carrito
    showNotification('¡Reserva añadida al carrito!', 'success');
    setTimeout(() => {
        window.location.href = 'carrito.html';
    }, 800);
}

// Guardar reserva (simulado)
function saveReservation(reservationData) {
    try {
        // Obtener reservas existentes
        const existingReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
        
        // Agregar nueva reserva
        const newReservation = {
            id: Date.now(),
            ...reservationData
        };
        
        existingReservations.push(newReservation);
        
        // Guardar en localStorage
        localStorage.setItem('userReservations', JSON.stringify(existingReservations));
        
        console.log('Reserva guardada:', newReservation);
        return true;
    } catch (error) {
        console.error('Error al guardar la reserva:', error);
        return false;
    }
}

// Función para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatear fecha para mostrar en chips
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Marcar fechas disponibles en el calendario
function markAvailableDates(availableDates) {
    // Remover marcadores previos
    document.querySelectorAll('.calendar-date.available').forEach(el => {
        el.classList.remove('available');
    });
    
    // Marcar fechas disponibles
    availableDates.forEach(date => {
        const dateElement = document.querySelector(`.calendar-date[data-date="${date}"]`);
        if (dateElement) {
            dateElement.classList.add('available');
        }
    });
}

// Función para validar formularios
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e5e9';
        }
    });
    
    return isValid;
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

// Función para manejar errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    showNotification(`Ha ocurrido un error: ${error.message}`, 'error');
}

// Función para filtrar paquetes
function filterPackages(filters = {}) {
    let filteredPackages = [...mockPackages];
    
    if (filters.destination) {
        filteredPackages = filteredPackages.filter(p => 
            p.destination.toLowerCase().includes(filters.destination.toLowerCase())
        );
    }
    
    if (filters.minPrice) {
        filteredPackages = filteredPackages.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
        filteredPackages = filteredPackages.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.minRating) {
        filteredPackages = filteredPackages.filter(p => p.rating >= filters.minRating);
    }
    
    return filteredPackages;
}

// Función para ordenar paquetes
function sortPackages(packages, sortBy = 'popularity') {
    const sortedPackages = [...packages];
    
    switch (sortBy) {
        case 'price-low':
            sortedPackages.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedPackages.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedPackages.sort((a, b) => b.rating - a.rating);
            break;
        case 'duration':
            sortedPackages.sort((a, b) => a.duration - b.duration);
            break;
        default:
            // Por popularidad (mantener orden original)
            break;
    }
    
    return sortedPackages;
}

// Función para buscar paquetes
function searchPackages(query) {
    if (!query.trim()) return mockPackages;
    
    const searchTerm = query.toLowerCase();
    return mockPackages.filter(package => 
        package.title.toLowerCase().includes(searchTerm) ||
        package.description.toLowerCase().includes(searchTerm) ||
        package.destination.toLowerCase().includes(searchTerm)
    );
}

// Función para obtener estadísticas de paquetes
function getPackageStats() {
    const totalPackages = mockPackages.length;
    const totalPrice = mockPackages.reduce((sum, p) => sum + p.price, 0);
    const averagePrice = totalPrice / totalPackages;
    const averageRating = mockPackages.reduce((sum, p) => sum + p.rating, 0) / totalPackages;
    
    return {
        total: totalPackages,
        averagePrice: Math.round(averagePrice),
        averageRating: Math.round(averageRating * 10) / 10,
        destinations: [...new Set(mockPackages.map(p => p.destination))]
    };
}

// Exportar funciones para uso global
window.AgendaManager = {
    openReservationModal,
    filterPackages,
    sortPackages,
    searchPackages,
    getPackageStats,
    saveReservation
};

// Utilidades simples de carrito (compartidas)
function loadCart() {
    try {
        const raw = localStorage.getItem('vm_cart');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(data) {
    localStorage.setItem('vm_cart', JSON.stringify(data));
}

// Calcular fecha de regreso automáticamente
function calculateReturnDate() {
    const reservationDateInput = document.getElementById('reservationDate');
    const returnDateInput = document.getElementById('returnDate');
    const modal = document.getElementById('reservationModal');
    
    if (!reservationDateInput || !returnDateInput || !modal.dataset.packageId) return;
    
    const departureDate = reservationDateInput.value;
    if (!departureDate) {
        returnDateInput.value = '';
        return;
    }
    
    // Obtener la duración del paquete seleccionado
    const packageId = parseInt(modal.dataset.packageId);
    const selectedPackage = getAgendaPackages().find(p => p.id === packageId);
    
    if (!selectedPackage) {
        returnDateInput.value = '';
        return;
    }
    
    // Calcular fecha de regreso
    const departure = new Date(departureDate);
    const returnDate = new Date(departure);
    returnDate.setDate(departure.getDate() + selectedPackage.duration);
    
    // Formatear fecha para el input
    const formattedReturnDate = returnDate.toISOString().split('T')[0];
    returnDateInput.value = formattedReturnDate;
}

// Funciones para el carrusel de imágenes del paquete
function loadPackageImages(package) {
    const carouselContainer = document.getElementById('imagesCarousel');
    if (!carouselContainer) return;
    
    // Obtener imágenes del paquete (simuladas)
    const images = getPackageImages(package);
    
    let html = '';
    images.forEach((image, index) => {
        html += `
            <div class="carousel-image ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${image}" alt="${package.title} - Imagen ${index + 1}" onerror="this.src='../assets/img/placeholder.jpg'">
            </div>
        `;
    });
    
    carouselContainer.innerHTML = html;
    initImagesCarousel();
}

function getPackageImages(package) {
    // Simular múltiples imágenes para cada paquete
    const baseImage = package.image;
    const imageName = baseImage.split('/').pop().split('.')[0];
    const extension = baseImage.split('.').pop();
    
    // Generar 3-5 imágenes simuladas basadas en la imagen principal
    const imageCount = Math.floor(Math.random() * 3) + 3; // 3-5 imágenes
    const images = [baseImage]; // La imagen principal siempre está incluida
    
    for (let i = 2; i <= imageCount; i++) {
        // Simular diferentes imágenes del mismo destino
        const simulatedImage = baseImage.replace(`package${package.id}`, `package${package.id}_${i}`);
        images.push(simulatedImage);
    }
    
    return images;
}

function initImagesCarousel() {
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const carousel = document.getElementById('imagesCarousel');
    
    if (!prevBtn || !nextBtn || !carousel) return;
    
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-image');
    const totalImages = images.length;
    
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        currentIndex = index;
        updateImageButtons();
    }
    
    function updateImageButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalImages - 1;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalImages - 1) {
            showImage(currentIndex + 1);
        }
    });
    
    // Auto-slide cada 5 segundos
    let autoSlideInterval = setInterval(() => {
        if (currentIndex < totalImages - 1) {
            showImage(currentIndex + 1);
        } else {
            showImage(0);
        }
    }, 5000);
    
    // Pausar auto-slide al hacer hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < totalImages - 1) {
                showImage(currentIndex + 1);
            } else {
                showImage(0);
            }
        }, 5000);
    });
    
    // Inicializar botones
    updateImageButtons();
}
