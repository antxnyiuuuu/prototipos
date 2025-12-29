// JavaScript específico para la página principal

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página principal
    initHomePage();
    
    // Cargar datos de ejemplo si no existen
    loadSampleData();
});

function initHomePage() {
    console.log('Inicializando página principal...');
    
    // Verificar si hay usuario logueado
    const user = UserManager.getCurrentUser();
    if (user) {
        updateUserInfo(user);
    }
    
    // Configurar eventos de la página
    setupHomeEvents();
    
    // Cargar promociones dinámicas
    loadPromociones();
}

function updateUserInfo(user) {
    // En la página principal, siempre mantener el botón de "Iniciar Sesión"
    // No cambiar el comportamiento aunque haya usuario logueado
    console.log('Usuario logueado:', user ? user.name : 'No hay usuario');
}

function setupHomeEvents() {
    // Eventos para las tarjetas de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    servicioCards.forEach(card => {
        card.addEventListener('click', function() {
            const servicio = this.querySelector('h4').textContent.toLowerCase();
            handleServicioClick(servicio);
        });
    });
    
    // Eventos para las promociones
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach(card => {
        card.addEventListener('click', function() {
            const promo = this.querySelector('h4').textContent;
            showPromoDetails(promo);
        });
    });
}

function handleServicioClick(servicio) {
    // Siempre redirigir al login desde la página principal
    Navigation.goTo('login.html');
}

function showPromoDetails(promo) {
    // Siempre redirigir al login desde la página principal
    Navigation.goTo('login.html');
}

// Funciones simplificadas - todo redirige al login

function loadPromociones() {
    // Cargar promociones dinámicas desde localStorage o datos de ejemplo
    const promociones = Storage.load('promociones') || getDefaultPromociones();
    
    // Actualizar interfaz con promociones
    updatePromocionesUI(promociones);
}

function getDefaultPromociones() {
    return [
        {
            id: 1,
            titulo: 'Hoteles con 30% OFF',
            descripcion: 'Reserva ahora y ahorra en tu estadía',
            icono: '🏨',
            activa: true
        },
        {
            id: 2,
            titulo: 'Restaurantes Premium',
            descripcion: 'Degusta la mejor comida local',
            icono: '🍽️',
            activa: true
        },
        {
            id: 3,
            titulo: 'Transporte Gratis',
            descripcion: 'Primera reserva sin costo adicional',
            icono: '🚗',
            activa: true
        }
    ];
}

function updatePromocionesUI(promociones) {
    // Actualizar las tarjetas de promociones con datos dinámicos
    const promoCards = document.querySelectorAll('.promo-card');
    
    promociones.forEach((promo, index) => {
        if (promoCards[index]) {
            const iconElement = promoCards[index].querySelector('.promo-image');
            const titleElement = promoCards[index].querySelector('h4');
            const descElement = promoCards[index].querySelector('p');
            
            if (iconElement) iconElement.textContent = promo.icono;
            if (titleElement) titleElement.textContent = promo.titulo;
            if (descElement) descElement.textContent = promo.descripcion;
        }
    });
}

function loadSampleData() {
    // Cargar datos de ejemplo si no existen
    if (!Storage.load('hoteles')) {
        Storage.save('hoteles', getSampleHoteles());
    }
    
    if (!Storage.load('restaurantes')) {
        Storage.save('restaurantes', getSampleRestaurantes());
    }
    
    if (!Storage.load('actividades')) {
        Storage.save('actividades', getSampleActividades());
    }
    
    if (!Storage.load('vehiculos')) {
        Storage.save('vehiculos', getSampleVehiculos());
    }
    
    if (!Storage.load('destinos')) {
        Storage.save('destinos', getSampleDestinos());
    }
}

function getSampleHoteles() {
    return [
        {
            id: 1,
            nombre: 'Hotel Paradise',
            ubicacion: 'Cancún, México',
            estrellas: 5,
            precio: 150,
            habitaciones: 50,
            servicios: ['Piscina', 'Spa', 'WiFi', 'Restaurante'],
            imagen: '🏨',
            activo: true
        },
        {
            id: 2,
            nombre: 'Hotel City Center',
            ubicacion: 'Ciudad de México',
            estrellas: 4,
            precio: 80,
            habitaciones: 30,
            servicios: ['WiFi', 'Gimnasio', 'Restaurante'],
            imagen: '🏨',
            activo: true
        }
    ];
}

function getSampleRestaurantes() {
    return [
        {
            id: 1,
            nombre: 'Restaurante Deluxe',
            ubicacion: 'Cancún, México',
            tipo: 'Internacional',
            especialidades: ['Mariscos', 'Carnes', 'Postres'],
            precio: '$$$',
            imagen: '🍽️',
            activo: true
        },
        {
            id: 2,
            nombre: 'Café Central',
            ubicacion: 'Ciudad de México',
            tipo: 'Cafetería',
            especialidades: ['Café', 'Desayunos', 'Postres'],
            precio: '$',
            imagen: '☕',
            activo: true
        }
    ];
}

function getSampleActividades() {
    return [
        {
            id: 1,
            nombre: 'Tour Arqueológico',
            ubicacion: 'Chichén Itzá',
            tipo: 'Cultural',
            duracion: '8 horas',
            precio: 75,
            imagen: '🏛️',
            activo: true
        },
        {
            id: 2,
            nombre: 'Snorkel en Cozumel',
            ubicacion: 'Cozumel',
            tipo: 'Aventura',
            duracion: '4 horas',
            precio: 45,
            imagen: '🤿',
            activo: true
        }
    ];
}

function getSampleVehiculos() {
    return [
        {
            id: 1,
            tipo: 'Autobús',
            capacidad: 50,
            precio: 200,
            disponible: true,
            imagen: '🚌'
        },
        {
            id: 2,
            tipo: 'Van',
            capacidad: 12,
            precio: 80,
            disponible: true,
            imagen: '🚐'
        },
        {
            id: 3,
            tipo: 'Automóvil',
            capacidad: 4,
            precio: 40,
            disponible: true,
            imagen: '🚗'
        }
    ];
}

function getSampleDestinos() {
    return [
        {
            id: 1,
            nombre: 'Cancún',
            pais: 'México',
            descripcion: 'Playa paradisíaca con aguas cristalinas',
            imagen: '🏖️',
            activo: true
        },
        {
            id: 2,
            nombre: 'Ciudad de México',
            pais: 'México',
            descripcion: 'Capital cultural y gastronómica',
            imagen: '🏙️',
            activo: true
        },
        {
            id: 3,
            nombre: 'Playa del Carmen',
            pais: 'México',
            descripcion: 'Destino bohemio y vibrante',
            imagen: '🌴',
            activo: true
        }
    ];
}

// Funciones de utilidad para la página principal
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function refreshPage() {
    location.reload();
}

// Exportar funciones para uso global
window.scrollToSection = scrollToSection;
window.refreshPage = refreshPage;
