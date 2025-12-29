// Ecuador Travel - Aplicación Principal
// Funciones globales y utilidades

// Variables globales
let currentUser = null;
let currentPackage = null;

// Inicializar la aplicación
function initializeApp() {
    console.log('Inicializando Ecuador Travel...');
    
    // Cargar configuración del sistema
    loadSystemSettings();
    
    // Inicializar datos por defecto si no existen
    initializeDefaultData();
    
    // Configurar eventos globales
    setupGlobalEvents();
}

// Configuración del sistema
function loadSystemSettings() {
    const defaultSettings = {
        whatsappNumber: '593987654321',
        welcomeMessage: '¡Bienvenido a Ecuador Travel! Arma tu paquete turístico perfecto y vive una experiencia única en Ecuador.',
        lastUpdated: new Date().toISOString()
    };
    
    const settings = localStorage.getItem('systemSettings');
    if (!settings) {
        localStorage.setItem('systemSettings', JSON.stringify(defaultSettings));
    }
}

function getSystemSettings() {
    const settings = localStorage.getItem('systemSettings');
    return settings ? JSON.parse(settings) : {
        whatsappNumber: '593987654321',
        welcomeMessage: '¡Bienvenido a Ecuador Travel! Arma tu paquete turístico perfecto y vive una experiencia única en Ecuador.'
    };
}

// Datos por defecto
function initializeDefaultData() {
    // Verificar si ya existen datos
    if (!localStorage.getItem('customerPackages')) {
        localStorage.setItem('customerPackages', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('selectedFullDayTours')) {
        localStorage.setItem('selectedFullDayTours', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('selectedTransport')) {
        localStorage.setItem('selectedTransport', JSON.stringify(null));
    }
}

// Eventos globales
function setupGlobalEvents() {
    // Prevenir envío de formularios por defecto
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM' && !e.target.hasAttribute('data-allow-submit')) {
            e.preventDefault();
        }
    });
    
    // Configurar tooltips y ayuda
    setupTooltips();
}

function setupTooltips() {
    // Agregar tooltips básicos a elementos con data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Gestión de paquetes
function getPackageData(packageType) {
    const key = `package_${packageType}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {
        persons: 2,
        activities: [],
        meals: [],
        fullDayTours: [],
        transport: null
    };
}

function savePackageData(packageType, data) {
    const key = `package_${packageType}`;
    localStorage.setItem(key, JSON.stringify(data));
}

function getPackageActivities(packageType) {
    // Simular carga de actividades según el tipo de paquete
    const activities = [
        { id: 1, nombre: "Tour Centro Histórico", precio: 20, descripcion: "Recorrido por el centro histórico de Quito" },
        { id: 2, nombre: "Teleférico Quito", precio: 18, descripcion: "Subida al teleférico con vista panorámica" },
        { id: 3, nombre: "Mitad del Mundo", precio: 25, descripcion: "Visita al monumento de la Mitad del Mundo" },
        { id: 4, nombre: "Mercado de Otavalo", precio: 30, descripcion: "Tour al famoso mercado indígena" },
        { id: 5, nombre: "Baños de Agua Santa", precio: 40, descripcion: "Tour a Baños con cascadas y aventura" },
        { id: 6, nombre: "Cotopaxi National Park", precio: 45, descripcion: "Excursión al Parque Nacional Cotopaxi" }
    ];
    
    switch (packageType) {
        case 'normal':
            return activities.slice(0, 3);
        case 'premium':
            return activities.slice(0, 5);
        case 'superpremium':
            return activities;
        default:
            return activities;
    }
}

function getPackageMeals(packageType) {
    const meals = [
        { id: 1, nombre: "Desayuno Continental", precio: 8, descripcion: "Café, jugo, pan, mantequilla, mermelada, frutas" },
        { id: 2, nombre: "Desayuno Americano", precio: 12, descripcion: "Huevos, tocino, pan tostado, café, jugo" },
        { id: 3, nombre: "Almuerzo Tradicional", precio: 15, descripcion: "Sopa, plato fuerte, postre, bebida" },
        { id: 4, nombre: "Almuerzo Gourmet", precio: 25, descripcion: "Entrada, plato principal gourmet, postre, vino" },
        { id: 5, nombre: "Cena Romántica", precio: 35, descripcion: "Cena a la luz de velas con vista panorámica" }
    ];
    
    switch (packageType) {
        case 'normal':
            return meals.slice(0, 2);
        case 'premium':
            return meals.slice(0, 4);
        case 'superpremium':
            return meals;
        default:
            return meals;
    }
}

// Gestión de paquetes de clientes
function getCustomerPackages() {
    const packages = localStorage.getItem('customerPackages');
    return packages ? JSON.parse(packages) : [];
}

function saveCustomerPackage(packageData) {
    const packages = getCustomerPackages();
    const newPackage = {
        id: Date.now().toString(),
        ...packageData,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    packages.push(newPackage);
    localStorage.setItem('customerPackages', JSON.stringify(packages));
    
    return newPackage;
}

// Gestión de tours Full Day
function getSelectedFullDayTours() {
    const tours = localStorage.getItem('selectedFullDayTours');
    return tours ? JSON.parse(tours) : [];
}

function saveSelectedFullDayTours(tours) {
    localStorage.setItem('selectedFullDayTours', JSON.stringify(tours));
}

// Gestión de transporte
function getSelectedTransport() {
    const transport = localStorage.getItem('selectedTransport');
    return transport ? JSON.parse(transport) : null;
}

function saveSelectedTransport(transport) {
    localStorage.setItem('selectedTransport', JSON.stringify(transport));
}

// Generación de mensajes de WhatsApp
function generateWhatsAppMessage(packageType, packageData) {
    const settings = getSystemSettings();
    const basePrice = getBasePrice(packageType);
    const totalPrice = basePrice * packageData.persons;
    const customerSession = getCustomerSession();
    
    let message = `🇪🇨 *SOLICITUD DE PAQUETE TURÍSTICO - ECUADOR TRAVEL*\n\n`;
    
    // Información del cliente
    if (customerSession && !customerSession.isGuest) {
        message += `👤 *Cliente:* ${customerSession.name}\n`;
        message += `📧 *Email:* ${customerSession.email}\n`;
        if (customerSession.phone) {
            message += `📱 *Teléfono:* ${customerSession.phone}\n`;
        }
        message += `\n`;
    }
    
    message += `📦 *Paquete:* ${packageType.charAt(0).toUpperCase() + packageType.slice(1)}\n`;
    message += `👥 *Personas:* ${packageData.persons}\n`;
    message += `💰 *Precio Base:* $${basePrice} x ${packageData.persons} = $${totalPrice}\n\n`;
    
    if (packageData.activities && packageData.activities.length > 0) {
        message += `🎯 *Actividades Seleccionadas:*\n`;
        packageData.activities.forEach(activity => {
            message += `• ${activity}\n`;
        });
        message += `\n`;
    }
    
    if (packageData.meals && packageData.meals.length > 0) {
        message += `🍽️ *Comidas Seleccionadas:*\n`;
        packageData.meals.forEach(meal => {
            message += `• ${meal}\n`;
        });
        message += `\n`;
    }
    
    const fullDayTours = getSelectedFullDayTours();
    if (fullDayTours.length > 0) {
        message += `🌟 *Tours Full Day:*\n`;
        fullDayTours.forEach(tour => {
            message += `• ${tour.nombre} - $${tour.precio}\n`;
        });
        message += `\n`;
    }
    
    const transport = getSelectedTransport();
    if (transport) {
        message += `🚗 *Transporte:* ${transport.tipo} - $${transport.precio_por_persona}/persona\n\n`;
    }
    
    message += `📅 *Fecha de solicitud:* ${new Date().toLocaleDateString()}\n`;
    message += `⏰ *Hora:* ${new Date().toLocaleTimeString()}\n\n`;
    message += `¡Gracias por elegir Ecuador Travel! 🎉`;
    
    return message;
}

function generateCompleteWhatsAppMessage(packageData) {
    const settings = getSystemSettings();
    
    let message = `🇪🇨 *PAQUETE TURÍSTICO COMPLETO - ECUADOR TRAVEL*\n\n`;
    message += `📦 *Paquete:* ${packageData.packageType}\n`;
    message += `👥 *Personas:* ${packageData.persons}\n`;
    message += `💰 *Precio Total:* $${packageData.totalPrice}\n\n`;
    
    if (packageData.activities && packageData.activities.length > 0) {
        message += `🎯 *Actividades:*\n`;
        packageData.activities.forEach(activity => {
            message += `• ${activity}\n`;
        });
        message += `\n`;
    }
    
    if (packageData.meals && packageData.meals.length > 0) {
        message += `🍽️ *Comidas:*\n`;
        packageData.meals.forEach(meal => {
            message += `• ${meal}\n`;
        });
        message += `\n`;
    }
    
    if (packageData.fullDayTours && packageData.fullDayTours.length > 0) {
        message += `🌟 *Tours Full Day:*\n`;
        packageData.fullDayTours.forEach(tour => {
            message += `• ${tour.nombre} - $${tour.precio}\n`;
        });
        message += `\n`;
    }
    
    if (packageData.transport) {
        message += `🚗 *Transporte:* ${packageData.transport.tipo} - $${packageData.transport.precio_por_persona}/persona\n\n`;
    }
    
    message += `📅 *Fecha:* ${new Date().toLocaleDateString()}\n`;
    message += `⏰ *Hora:* ${new Date().toLocaleTimeString()}\n\n`;
    message += `¡Listo para confirmar tu viaje! 🎉`;
    
    return message;
}

function getCompletePackageData() {
    // Obtener datos del paquete actual desde localStorage
    const packageTypes = ['normal', 'premium', 'superpremium'];
    let currentPackageData = null;
    
    for (const type of packageTypes) {
        const data = getPackageData(type);
        if (data.persons > 0) {
            currentPackageData = {
                packageType: type,
                ...data,
                fullDayTours: getSelectedFullDayTours(),
                transport: getSelectedTransport(),
                totalPrice: calculateTotalPrice(type, data)
            };
            break;
        }
    }
    
    return currentPackageData;
}

function calculateTotalPrice(packageType, packageData) {
    const basePrice = getBasePrice(packageType);
    let total = basePrice * packageData.persons;
    
    // Agregar tours Full Day
    const fullDayTours = getSelectedFullDayTours();
    fullDayTours.forEach(tour => {
        total += tour.precio;
    });
    
    // Agregar transporte
    const transport = getSelectedTransport();
    if (transport) {
        total += transport.precio_por_persona * packageData.persons;
    }
    
    return total;
}

function getBasePrice(packageType) {
    switch (packageType) {
        case 'normal': return 150;
        case 'premium': return 280;
        case 'superpremium': return 450;
        default: return 0;
    }
}

// Gestión de administración
function isAdminLoggedIn() {
    const session = localStorage.getItem('adminSession');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        return sessionData.isLoggedIn === true;
    } catch (error) {
        return false;
    }
}

// Gestión de clientes
function isCustomerLoggedIn() {
    const session = localStorage.getItem('customerSession');
    if (!session) return false;
    
    try {
        const sessionData = JSON.parse(session);
        return sessionData.isLoggedIn === true;
    } catch (error) {
        return false;
    }
}

function getCustomerSession() {
    const session = localStorage.getItem('customerSession');
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch (error) {
        return null;
    }
}

function logoutCustomer() {
    localStorage.removeItem('customerSession');
}

// Utilidades de UI
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function showAlert(message, type = 'info') {
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '10000';
    alert.style.maxWidth = '300px';
    alert.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(alert);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 300);
    }, 3000);
}

function updatePackageSummary() {
    const summaryElement = document.getElementById('current-package-summary');
    const contentElement = document.getElementById('package-summary-content');
    
    if (!summaryElement || !contentElement) return;
    
    const packageData = getCompletePackageData();
    
    if (packageData) {
        contentElement.innerHTML = `
            <div class="summary-item">
                <span>Paquete:</span>
                <span>${packageData.packageType}</span>
            </div>
            <div class="summary-item">
                <span>Personas:</span>
                <span>${packageData.persons}</span>
            </div>
            <div class="summary-item">
                <span>Total:</span>
                <span>$${packageData.totalPrice}</span>
            </div>
        `;
        summaryElement.classList.remove('hidden');
    } else {
        summaryElement.classList.add('hidden');
    }
}

// Funciones de utilidad
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Validaciones
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Gestión de errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    showAlert(`Error: ${error.message || 'Algo salió mal'}`, 'error');
}

// Funciones adicionales para la página de paquetes
function getSavedPackages() {
    return getCustomerPackages();
}

function savePackage(packages) {
    localStorage.setItem('customerPackages', JSON.stringify(packages));
}

function showMessage(title, content, type = 'info') {
    showAlert(title, content, type);
}

// Exportar funciones para uso global
window.EcuadorTravel = {
    initializeApp,
    getPackageData,
    savePackageData,
    getCustomerPackages,
    saveCustomerPackage,
    generateWhatsAppMessage,
    generateCompleteWhatsAppMessage,
    getCompletePackageData,
    isAdminLoggedIn,
    isCustomerLoggedIn,
    getCustomerSession,
    logoutCustomer,
    showModal,
    closeModal,
    showAlert,
    updatePackageSummary,
    formatCurrency,
    formatDate,
    validateEmail,
    validatePhone,
    handleError,
    getSavedPackages,
    savePackage,
    showMessage
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
