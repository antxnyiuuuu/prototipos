// JavaScript específico para la página de vehículos

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de vehículos
    initVehiculosPage();
    
    // Configurar eventos
    setupVehiculosEvents();
});

function initVehiculosPage() {
    console.log('Inicializando página de vehículos...');
    
    // Cargar datos de vehículos si no existen
    loadVehiculosData();
}

function setupVehiculosEvents() {
    // Evento del formulario de transporte
    const transportForm = document.getElementById('transportForm');
    if (transportForm) {
        transportForm.addEventListener('submit', handleTransportSearch);
    }
    
    // Eventos de radio buttons
    const radioButtons = document.querySelectorAll('input[name="ownTransport"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleOwnTransportChange);
    });
}

function loadVehiculosData() {
    // Cargar vehículos desde localStorage o datos de ejemplo
    const vehiculos = Storage.load('vehiculos');
    if (!vehiculos) {
        // Cargar datos de ejemplo desde el archivo JSON
        fetch('../data/vehiculos.json')
            .then(response => response.json())
            .then(data => {
                Storage.save('vehiculos', data);
                console.log('Datos de vehículos cargados');
            })
            .catch(error => {
                console.error('Error cargando vehículos:', error);
                // Usar datos de ejemplo si falla la carga
                const sampleVehiculos = getSampleVehiculos();
                Storage.save('vehiculos', sampleVehiculos);
            });
    }
}

function getSampleVehiculos() {
    return [
        {
            id: 1,
            tipo: "Autobús",
            marca: "Mercedes-Benz",
            modelo: "Tourismo",
            capacidad: 50,
            precio_dia: 200,
            precio_hora: 25,
            servicios: ["Aire Acondicionado", "WiFi", "Asientos Reclinables", "Baño", "Televisión", "Chofer Profesional"],
            disponible: true,
            ubicacion: "Cancún, México",
            imagen: "🚌",
            descripcion: "Autobús de lujo para grupos grandes, ideal para tours y traslados corporativos.",
            activo: true,
            verificado: true,
            calificacion: 4.7,
            telefono: "+52 998 123 4567",
            email: "renta@autobuspremium.com",
            fecha_registro: "2024-01-15"
        },
        {
            id: 2,
            tipo: "Van",
            marca: "Ford",
            modelo: "Transit",
            capacidad: 12,
            precio_dia: 80,
            precio_hora: 12,
            servicios: ["Aire Acondicionado", "Asientos Cómodos", "Equipaje Extra", "Chofer Profesional"],
            disponible: true,
            ubicacion: "Ciudad de México, México",
            imagen: "🚐",
            descripcion: "Van espaciosa perfecta para grupos medianos, tours familiares y traslados al aeropuerto.",
            activo: true,
            verificado: true,
            calificacion: 4.5,
            telefono: "+52 55 2345 6789",
            email: "info@vancomfort.com",
            fecha_registro: "2024-01-20"
        },
        {
            id: 3,
            tipo: "Automóvil",
            marca: "Toyota",
            modelo: "Corolla",
            capacidad: 4,
            precio_dia: 40,
            precio_hora: 8,
            servicios: ["Aire Acondicionado", "Radio Bluetooth", "Seguro Incluido", "Kilometraje Libre"],
            disponible: true,
            ubicacion: "Cancún, México",
            imagen: "🚗",
            descripcion: "Automóvil compacto y económico, perfecto para parejas o familias pequeñas.",
            activo: true,
            verificado: true,
            calificacion: 4.3,
            telefono: "+52 998 345 6789",
            email: "renta@autoscompactos.com",
            fecha_registro: "2024-01-25"
        }
    ];
}

function handleTransportSearch(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('transportForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Verificar si tiene transporte propio
    if (formData.ownTransport === 'yes') {
        showOwnTransportSection();
        return;
    }
    
    // Buscar vehículos disponibles
    searchVehiculos(formData);
}

function handleOwnTransportChange(event) {
    const ownTransportSection = document.getElementById('ownTransportSection');
    const resultsSection = document.getElementById('resultsSection');
    
    if (event.target.value === 'yes') {
        ownTransportSection.style.display = 'block';
        resultsSection.style.display = 'none';
    } else {
        ownTransportSection.style.display = 'none';
        resultsSection.style.display = 'none';
    }
}

function showOwnTransportSection() {
    const ownTransportSection = document.getElementById('ownTransportSection');
    const resultsSection = document.getElementById('resultsSection');
    
    ownTransportSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Scroll suave a la sección
    ownTransportSection.scrollIntoView({ behavior: 'smooth' });
}

function searchVehiculos(criteria) {
    const vehiculos = Storage.load('vehiculos') || [];
    const passengers = parseInt(criteria.passengers) || 1;
    const transportType = criteria.transportType;
    
    // Filtrar vehículos según criterios
    let filteredVehiculos = vehiculos.filter(vehiculo => {
        // Verificar disponibilidad
        if (!vehiculo.disponible || !vehiculo.activo) {
            return false;
        }
        
        // Verificar capacidad
        if (vehiculo.capacidad < passengers) {
            return false;
        }
        
        // Verificar tipo de transporte
        if (transportType && vehiculo.tipo.toLowerCase() !== transportType.toLowerCase()) {
            return false;
        }
        
        return true;
    });
    
    // Mostrar resultados
    displayVehiculosResults(filteredVehiculos);
}

function displayVehiculosResults(vehiculos) {
    const resultsSection = document.getElementById('resultsSection');
    const vehiculosGrid = document.getElementById('vehiculosGrid');
    const ownTransportSection = document.getElementById('ownTransportSection');
    
    // Ocultar sección de transporte propio
    ownTransportSection.style.display = 'none';
    
    if (vehiculos.length === 0) {
        vehiculosGrid.innerHTML = `
            <div class="no-vehiculos">
                <div class="no-vehiculos-icon">🚗</div>
                <h4>No se encontraron vehículos</h4>
                <p>No hay vehículos disponibles que cumplan con tus criterios de búsqueda.</p>
                <button class="btn btn-primary" onclick="clearSearch()">
                    Nueva Búsqueda
                </button>
            </div>
        `;
    } else {
        vehiculosGrid.innerHTML = '';
        vehiculos.forEach(vehiculo => {
            const vehiculoCard = createVehiculoCard(vehiculo);
            vehiculosGrid.appendChild(vehiculoCard);
        });
    }
    
    // Mostrar sección de resultados
    resultsSection.style.display = 'block';
    
    // Scroll suave a los resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function createVehiculoCard(vehiculo) {
    const card = document.createElement('div');
    card.className = 'vehiculo-card';
    card.onclick = () => showVehiculoDetails(vehiculo);
    
    card.innerHTML = `
        <div class="vehiculo-header">
            <div class="vehiculo-icon">${vehiculo.imagen}</div>
            <div class="vehiculo-info">
                <h3>${vehiculo.marca} ${vehiculo.modelo}</h3>
                <p>${vehiculo.tipo} - ${vehiculo.ubicacion}</p>
            </div>
        </div>
        
        <p class="vehiculo-descripcion">${vehiculo.descripcion}</p>
        
        <div class="vehiculo-details">
            <div class="vehiculo-detail">
                <span class="vehiculo-detail-icon">👥</span>
                <span><strong>Capacidad:</strong> ${vehiculo.capacidad} personas</span>
            </div>
            <div class="vehiculo-detail">
                <span class="vehiculo-detail-icon">⭐</span>
                <span><strong>Calificación:</strong> ${vehiculo.calificacion}/5</span>
            </div>
            <div class="vehiculo-detail">
                <span class="vehiculo-detail-icon">📍</span>
                <span><strong>Ubicación:</strong> ${vehiculo.ubicacion}</span>
            </div>
            <div class="vehiculo-detail">
                <span class="vehiculo-detail-icon">✅</span>
                <span class="${vehiculo.disponible ? 'disponible' : 'no-disponible'}">
                    ${vehiculo.disponible ? 'Disponible' : 'No Disponible'}
                </span>
            </div>
        </div>
        
        <div class="vehiculo-pricing">
            <div class="vehiculo-price">
                $${vehiculo.precio_dia}
                <span class="vehiculo-price-period">/día</span>
            </div>
            <div class="vehiculo-actions">
                <button class="vehiculo-btn secondary" onclick="event.stopPropagation(); showVehiculoDetails('${vehiculo.id}')">
                    Ver Detalles
                </button>
                <button class="vehiculo-btn primary" onclick="event.stopPropagation(); reservarVehiculo('${vehiculo.id}')">
                    Reservar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function showVehiculoDetails(vehiculoId) {
    const vehiculos = Storage.load('vehiculos') || [];
    const vehiculo = typeof vehiculoId === 'string' ? 
        vehiculos.find(v => v.id == vehiculoId) : vehiculoId;
    
    if (!vehiculo) {
        Notification.error('Vehículo no encontrado');
        return;
    }
    
    const modal = document.getElementById('vehiculoModal');
    const title = document.getElementById('vehiculoModalTitle');
    const details = document.getElementById('vehiculoDetails');
    
    if (title) {
        title.textContent = `${vehiculo.marca} ${vehiculo.modelo}`;
    }
    
    if (details) {
        details.innerHTML = `
            <div class="detail-section">
                <h4>Información General</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Tipo</div>
                        <div class="detail-value">${vehiculo.tipo}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Capacidad</div>
                        <div class="detail-value">${vehiculo.capacidad} personas</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Precio por Día</div>
                        <div class="detail-value">$${vehiculo.precio_dia}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Precio por Hora</div>
                        <div class="detail-value">$${vehiculo.precio_hora}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Servicios Incluidos</h4>
                <div class="services-list">
                    ${vehiculo.servicios.map(servicio => `
                        <div class="service-item">${servicio}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Información de Contacto</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Teléfono</div>
                        <div class="detail-value">${vehiculo.telefono}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${vehiculo.email}</div>
                    </div>
                </div>
            </div>
            
            <div class="vehiculo-actions" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="reservarVehiculo('${vehiculo.id}')">
                    Reservar Ahora
                </button>
                <button class="btn btn-secondary" onclick="Modal.hide('vehiculoModal')">
                    Cerrar
                </button>
            </div>
        `;
    }
    
    Modal.show('vehiculoModal');
}

function reservarVehiculo(vehiculoId) {
    const user = UserManager.getCurrentUser();
    
    if (!user) {
        Notification.warning('Debes iniciar sesión para hacer una reserva');
        Navigation.goTo('login.html');
        return;
    }
    
    const vehiculos = Storage.load('vehiculos') || [];
    const vehiculo = vehiculos.find(v => v.id == vehiculoId);
    
    if (!vehiculo) {
        Notification.error('Vehículo no encontrado');
        return;
    }
    
    // Simular proceso de reserva
    Notification.info('Procesando reserva...');
    
    setTimeout(() => {
        // Crear reserva
        const reserva = {
            id: Date.now(),
            usuarioId: user.id,
            vehiculoId: vehiculo.id,
            titulo: `Reserva de ${vehiculo.marca} ${vehiculo.modelo}`,
            descripcion: `Transporte: ${vehiculo.tipo} para ${vehiculo.capacidad} personas`,
            precio: vehiculo.precio_dia,
            fecha: new Date().toISOString(),
            estado: 'pendiente',
            referencia: `TR-${Date.now()}`,
            destino: 'Por definir'
        };
        
        // Guardar reserva
        const reservas = Storage.load('user_reservas') || [];
        reservas.push(reserva);
        Storage.save('user_reservas', reservas);
        
        // Mostrar confirmación
        Notification.success('¡Reserva realizada exitosamente!');
        
        // Cerrar modal
        Modal.hide('vehiculoModal');
        
        // Redirigir a destinos
        setTimeout(() => {
            Navigation.goTo('destinos.html');
        }, 1500);
        
    }, 2000);
}

function showRutas() {
    const modal = document.getElementById('rutasModal');
    const content = document.getElementById('rutasContent');
    
    if (content) {
        content.innerHTML = `
            <div class="ruta-item">
                <div class="ruta-header">
                    <h4 class="ruta-titulo">Ruta Principal</h4>
                    <span class="ruta-duracion">4-5 horas</span>
                </div>
                <p>Ruta más directa y rápida hacia tu destino</p>
                <div class="ruta-details">
                    <div class="ruta-detail">
                        <strong>Distancia:</strong> 320 km
                    </div>
                    <div class="ruta-detail">
                        <strong>Peaje:</strong> $150 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Gasolina:</strong> ~$400 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Estado:</strong> Excelente
                    </div>
                </div>
            </div>
            
            <div class="ruta-item">
                <div class="ruta-header">
                    <h4 class="ruta-titulo">Ruta Escénica</h4>
                    <span class="ruta-duracion">6-7 horas</span>
                </div>
                <p>Ruta con paisajes hermosos, ideal para disfrutar del viaje</p>
                <div class="ruta-details">
                    <div class="ruta-detail">
                        <strong>Distancia:</strong> 450 km
                    </div>
                    <div class="ruta-detail">
                        <strong>Peaje:</strong> $200 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Gasolina:</strong> ~$550 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Estado:</strong> Bueno
                    </div>
                </div>
            </div>
            
            <div class="ruta-item">
                <div class="ruta-header">
                    <h4 class="ruta-titulo">Ruta Económica</h4>
                    <span class="ruta-duracion">5-6 horas</span>
                </div>
                <p>Ruta más económica, evita peajes costosos</p>
                <div class="ruta-details">
                    <div class="ruta-detail">
                        <strong>Distancia:</strong> 380 km
                    </div>
                    <div class="ruta-detail">
                        <strong>Peaje:</strong> $50 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Gasolina:</strong> ~$450 MXN
                    </div>
                    <div class="ruta-detail">
                        <strong>Estado:</strong> Regular
                    </div>
                </div>
            </div>
        `;
    }
    
    Modal.show('rutasModal');
}

function clearSearch() {
    // Limpiar formulario
    FormUtils.clearForm('transportForm');
    
    // Ocultar secciones
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('ownTransportSection').style.display = 'none';
    
    // Scroll al formulario
    document.querySelector('.filters-section').scrollIntoView({ behavior: 'smooth' });
}

// Exportar funciones para uso global
window.showVehiculoDetails = showVehiculoDetails;
window.reservarVehiculo = reservarVehiculo;
window.showRutas = showRutas;
window.clearSearch = clearSearch;
