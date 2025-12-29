// JavaScript específico para la página de destinos

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de destinos
    initDestinosPage();
    
    // Configurar eventos
    setupDestinosEvents();
});

function initDestinosPage() {
    console.log('Inicializando página de destinos...');
    
    // Cargar datos de destinos
    loadDestinosData();
    
    // Cargar destinos populares
    loadDestinosPopulares();
}

function setupDestinosEvents() {
    // Evento del formulario de búsqueda
    const destinoForm = document.getElementById('destinoForm');
    if (destinoForm) {
        destinoForm.addEventListener('submit', handleDestinoSearch);
    }
    
    // Evento de búsqueda en tiempo real
    const searchInput = document.getElementById('destinoSearch');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
}

function loadDestinosData() {
    // Cargar destinos desde localStorage o datos de ejemplo
    const destinos = Storage.load('destinos');
    if (!destinos) {
        // Cargar datos de ejemplo desde el archivo JSON
        fetch('../data/destinos.json')
            .then(response => response.json())
            .then(data => {
                Storage.save('destinos', data);
                console.log('Datos de destinos cargados');
            })
            .catch(error => {
                console.error('Error cargando destinos:', error);
                // Usar datos de ejemplo si falla la carga
                const sampleDestinos = getSampleDestinos();
                Storage.save('destinos', sampleDestinos);
            });
    }
}

function getSampleDestinos() {
    return [
        {
            id: 1,
            nombre: "Cancún",
            pais: "México",
            estado: "Quintana Roo",
            descripcion: "Destino paradisíaco con playas de arena blanca y aguas cristalinas del Caribe mexicano.",
            clima: "Tropical",
            mejor_epoca: "Noviembre - Abril",
            atracciones_principales: ["Playa Delfines", "Zona Hotelera", "Isla Mujeres", "Xcaret", "Chichén Itzá"],
            actividades_populares: ["Snorkel", "Buceo", "Tours Arqueológicos", "Parques Temáticos", "Vida Nocturna"],
            gastronomia: ["Mariscos Frescos", "Cocina Internacional", "Ceviche", "Tacos de Pescado"],
            imagen: "🏖️",
            activo: true,
            popularidad: 5,
            precio_promedio: "$$$",
            distancia_ciudad_mas_cercana: "Cancún Centro - 0 km"
        },
        {
            id: 2,
            nombre: "Ciudad de México",
            pais: "México",
            estado: "CDMX",
            descripcion: "Capital cultural y gastronómica de México, rica en historia, arte y tradiciones.",
            clima: "Templado",
            mejor_epoca: "Octubre - Mayo",
            atracciones_principales: ["Centro Histórico", "Museo Nacional de Antropología", "Chapultepec", "Coyoacán", "Xochimilco"],
            actividades_populares: ["Tours Culturales", "Gastronomía", "Museos", "Mercados Tradicionales", "Arte Urbano"],
            gastronomia: ["Tacos al Pastor", "Mole", "Chiles en Nogada", "Pozole", "Tortas"],
            imagen: "🏙️",
            activo: true,
            popularidad: 5,
            precio_promedio: "$$",
            distancia_ciudad_mas_cercana: "Centro - 0 km"
        }
    ];
}

function loadDestinosPopulares() {
    const destinosGrid = document.getElementById('destinosGrid');
    if (!destinosGrid) return;
    
    // Obtener destinos
    const destinos = Storage.load('destinos') || [];
    
    // Mostrar todos los destinos activos
    const destinosActivos = destinos.filter(d => d.activo);
    
    destinosGrid.innerHTML = '';
    
    destinosActivos.forEach(destino => {
        const destinoCard = createDestinoCard(destino);
        destinosGrid.appendChild(destinoCard);
    });
}

function createDestinoCard(destino) {
    const card = document.createElement('div');
    card.className = 'destino-card';
    card.onclick = () => showDestinoDetails(destino);
    
    const popularidadClass = `popularidad-${destino.popularidad}`;
    
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
                <span><strong>Clima:</strong> ${destino.clima}</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">💰</span>
                <span><strong>Precio:</strong> ${destino.precio_promedio}</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">⭐</span>
                <span class="${popularidadClass}"><strong>Popularidad:</strong> ${destino.popularidad}/5</span>
            </div>
            <div class="destino-detail">
                <span class="destino-detail-icon">📅</span>
                <span><strong>Mejor época:</strong> ${destino.mejor_epoca}</span>
            </div>
        </div>
        
        <div class="destino-actions">
            <button class="destino-btn secondary" onclick="event.stopPropagation(); showDestinoDetails('${destino.id}')">
                Ver Detalles
            </button>
            <button class="destino-btn primary" onclick="event.stopPropagation(); explorarDestino('${destino.id}')">
                Explorar
            </button>
        </div>
    `;
    
    return card;
}

function handleDestinoSearch(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('destinoForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Buscar destinos
    searchDestinos(formData);
}

function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (searchTerm.length < 2) {
        loadDestinosPopulares();
        return;
    }
    
    // Búsqueda en tiempo real
    const destinos = Storage.load('destinos') || [];
    const destinosFiltrados = destinos.filter(destino => 
        destino.nombre.toLowerCase().includes(searchTerm) ||
        destino.estado.toLowerCase().includes(searchTerm) ||
        destino.pais.toLowerCase().includes(searchTerm)
    );
    
    displayDestinosResults(destinosFiltrados);
}

function searchDestinos(criteria) {
    const destinos = Storage.load('destinos') || [];
    let filteredDestinos = destinos.filter(destino => destino.activo);
    
    // Filtrar por búsqueda de texto
    if (criteria.destinoSearch) {
        const searchTerm = criteria.destinoSearch.toLowerCase();
        filteredDestinos = filteredDestinos.filter(destino =>
            destino.nombre.toLowerCase().includes(searchTerm) ||
            destino.estado.toLowerCase().includes(searchTerm) ||
            destino.pais.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por tipo de destino
    if (criteria.tipoDestino) {
        filteredDestinos = filteredDestinos.filter(destino => {
            const tipo = criteria.tipoDestino.toLowerCase();
            return destino.actividades_populares.some(actividad => 
                actividad.toLowerCase().includes(tipo)
            );
        });
    }
    
    // Filtrar por rango de precio
    if (criteria.precioRango) {
        filteredDestinos = filteredDestinos.filter(destino => 
            destino.precio_promedio === criteria.precioRango
        );
    }
    
    // Mostrar resultados
    displayDestinosResults(filteredDestinos);
}

function displayDestinosResults(destinos) {
    const destinosGrid = document.getElementById('destinosGrid');
    
    if (destinos.length === 0) {
        destinosGrid.innerHTML = `
            <div class="no-destinos">
                <div class="no-destinos-icon">🌍</div>
                <h4>No se encontraron destinos</h4>
                <p>No hay destinos que cumplan con tus criterios de búsqueda.</p>
                <button class="btn btn-primary" onclick="clearDestinoSearch()">
                    Limpiar Búsqueda
                </button>
            </div>
        `;
    } else {
        destinosGrid.innerHTML = '';
        destinos.forEach(destino => {
            const destinoCard = createDestinoCard(destino);
            destinosGrid.appendChild(destinoCard);
        });
    }
}

function filtrarPorCategoria(categoria) {
    const destinos = Storage.load('destinos') || [];
    let destinosFiltrados = [];
    
    switch(categoria) {
        case 'playa':
            destinosFiltrados = destinos.filter(destino => 
                destino.actividades_populares.some(actividad => 
                    actividad.toLowerCase().includes('playa') ||
                    actividad.toLowerCase().includes('snorkel') ||
                    actividad.toLowerCase().includes('buceo')
                )
            );
            break;
        case 'ciudad':
            destinosFiltrados = destinos.filter(destino => 
                destino.actividades_populares.some(actividad => 
                    actividad.toLowerCase().includes('cultural') ||
                    actividad.toLowerCase().includes('museos') ||
                    actividad.toLowerCase().includes('gastronomía')
                )
            );
            break;
        case 'cultural':
            destinosFiltrados = destinos.filter(destino => 
                destino.actividades_populares.some(actividad => 
                    actividad.toLowerCase().includes('cultural') ||
                    actividad.toLowerCase().includes('histórico') ||
                    actividad.toLowerCase().includes('tradicional')
                )
            );
            break;
        case 'aventura':
            destinosFiltrados = destinos.filter(destino => 
                destino.actividades_populares.some(actividad => 
                    actividad.toLowerCase().includes('aventura') ||
                    actividad.toLowerCase().includes('extremo') ||
                    actividad.toLowerCase().includes('escalada')
                )
            );
            break;
        default:
            destinosFiltrados = destinos.filter(d => d.activo);
    }
    
    displayDestinosResults(destinosFiltrados);
}

function showDestinoDetails(destinoId) {
    const destinos = Storage.load('destinos') || [];
    const destino = typeof destinoId === 'string' ? 
        destinos.find(d => d.id == destinoId) : destinoId;
    
    if (!destino) {
        Notification.error('Destino no encontrado');
        return;
    }
    
    const modal = document.getElementById('destinoModal');
    const title = document.getElementById('destinoModalTitle');
    const details = document.getElementById('destinoDetails');
    
    if (title) {
        title.textContent = destino.nombre;
    }
    
    if (details) {
        details.innerHTML = `
            <div class="detail-section">
                <h4>Información General</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Ubicación</div>
                        <div class="detail-value">${destino.estado}, ${destino.pais}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Clima</div>
                        <div class="detail-value">${destino.clima}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Mejor Época</div>
                        <div class="detail-value">${destino.mejor_epoca}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Precio Promedio</div>
                        <div class="detail-value">${destino.precio_promedio}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Descripción</h4>
                <p>${destino.descripcion}</p>
            </div>
            
            <div class="detail-section">
                <h4>Atracciones Principales</h4>
                <div class="atracciones-list">
                    ${destino.atracciones_principales.map(atraccion => `
                        <div class="atraccion-item">${atraccion}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Actividades Populares</h4>
                <div class="atracciones-list">
                    ${destino.actividades_populares.map(actividad => `
                        <div class="atraccion-item">${actividad}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Gastronomía</h4>
                <div class="atracciones-list">
                    ${destino.gastronomia.map(comida => `
                        <div class="atraccion-item">${comida}</div>
                    `).join('')}
                </div>
            </div>
            
            <div class="destino-actions" style="margin-top: 20px;">
                <button class="btn btn-primary" onclick="explorarDestino('${destino.id}')">
                    Explorar Destino
                </button>
                <button class="btn btn-secondary" onclick="Modal.hide('destinoModal')">
                    Cerrar
                </button>
            </div>
        `;
    }
    
    Modal.show('destinoModal');
}

function explorarDestino(destinoId) {
    // Los destinos son públicos, no requieren login
    
    const destinos = Storage.load('destinos') || [];
    const destino = destinos.find(d => d.id == destinoId);
    
    if (!destino) {
        Notification.error('Destino no encontrado');
        return;
    }
    
    // Mostrar servicios disponibles para el destino
    showServiciosDestino(destino);
}

function showServiciosDestino(destino) {
    const modal = document.getElementById('serviciosModal');
    const title = document.getElementById('serviciosModalTitle');
    const content = document.getElementById('serviciosContent');
    
    if (title) {
        title.textContent = `Servicios en ${destino.nombre}`;
    }
    
    if (content) {
        // Obtener servicios disponibles para el destino
        const hoteles = Storage.load('hoteles') || [];
        const restaurantes = Storage.load('restaurantes') || [];
        const actividades = Storage.load('actividades') || [];
        
        // Filtrar servicios por ubicación (simulado)
        const hotelesDestino = hoteles.filter(h => h.activo).slice(0, 3);
        const restaurantesDestino = restaurantes.filter(r => r.activo).slice(0, 3);
        const actividadesDestino = actividades.filter(a => a.activo).slice(0, 3);
        
        content.innerHTML = `
            <div class="servicio-section">
                <h4>🏨 Hoteles Disponibles</h4>
                <div class="servicios-grid">
                    ${hotelesDestino.map(hotel => `
                        <div class="servicio-item">
                            <div class="servicio-header">
                                <h5 class="servicio-nombre">${hotel.nombre}</h5>
                                <span class="servicio-precio">$${hotel.precio_noche}/noche</span>
                            </div>
                            <p class="servicio-descripcion">${hotel.descripcion}</p>
                            <div class="servicio-details">
                                <div class="servicio-detail">
                                    <strong>Estrellas:</strong> ${hotel.estrellas}
                                </div>
                                <div class="servicio-detail">
                                    <strong>Habitaciones:</strong> ${hotel.habitaciones}
                                </div>
                            </div>
                            <div class="servicio-actions">
                                <button class="servicio-btn primary" onclick="reservarServicio('hotel', '${hotel.id}')">
                                    Reservar
                                </button>
                                <button class="servicio-btn secondary" onclick="verDetallesServicio('hotel', '${hotel.id}')">
                                    Detalles
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="servicio-section">
                <h4>🍽️ Restaurantes Recomendados</h4>
                <div class="servicios-grid">
                    ${restaurantesDestino.map(restaurante => `
                        <div class="servicio-item">
                            <div class="servicio-header">
                                <h5 class="servicio-nombre">${restaurante.nombre}</h5>
                                <span class="servicio-precio">${restaurante.precio_rango}</span>
                            </div>
                            <p class="servicio-descripcion">${restaurante.descripcion}</p>
                            <div class="servicio-details">
                                <div class="servicio-detail">
                                    <strong>Tipo:</strong> ${restaurante.tipo}
                                </div>
                                <div class="servicio-detail">
                                    <strong>Capacidad:</strong> ${restaurante.capacidad}
                                </div>
                            </div>
                            <div class="servicio-actions">
                                <button class="servicio-btn primary" onclick="reservarServicio('restaurante', '${restaurante.id}')">
                                    Reservar
                                </button>
                                <button class="servicio-btn secondary" onclick="verDetallesServicio('restaurante', '${restaurante.id}')">
                                    Detalles
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="servicio-section">
                <h4>🎯 Actividades Disponibles</h4>
                <div class="servicios-grid">
                    ${actividadesDestino.map(actividad => `
                        <div class="servicio-item">
                            <div class="servicio-header">
                                <h5 class="servicio-nombre">${actividad.nombre}</h5>
                                <span class="servicio-precio">$${actividad.precio}</span>
                            </div>
                            <p class="servicio-descripcion">${actividad.descripcion}</p>
                            <div class="servicio-details">
                                <div class="servicio-detail">
                                    <strong>Duración:</strong> ${actividad.duracion}
                                </div>
                                <div class="servicio-detail">
                                    <strong>Tipo:</strong> ${actividad.tipo}
                                </div>
                            </div>
                            <div class="servicio-actions">
                                <button class="servicio-btn primary" onclick="reservarServicio('actividad', '${actividad.id}')">
                                    Reservar
                                </button>
                                <button class="servicio-btn secondary" onclick="verDetallesServicio('actividad', '${actividad.id}')">
                                    Detalles
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    Modal.show('serviciosModal');
}

function reservarServicio(tipo, servicioId) {
    const user = UserManager.getCurrentUser();
    
    if (!user) {
        Notification.warning('Debes iniciar sesión para hacer una reserva');
        Navigation.goTo('login.html');
        return;
    }
    
    // Simular proceso de reserva
    Notification.info('Procesando reserva...');
    
    setTimeout(() => {
        // Crear reserva
        const reserva = {
            id: Date.now(),
            usuarioId: user.id,
            tipoServicio: tipo,
            servicioId: servicioId,
            titulo: `Reserva de ${tipo}`,
            descripcion: `Servicio: ${tipo} - ID: ${servicioId}`,
            precio: Math.floor(Math.random() * 200) + 50,
            fecha: new Date().toISOString(),
            estado: 'pendiente',
            referencia: `${tipo.toUpperCase()}-${Date.now()}`,
            destino: 'Por definir'
        };
        
        // Guardar reserva
        const reservas = Storage.load('user_reservas') || [];
        reservas.push(reserva);
        Storage.save('user_reservas', reservas);
        
        // Mostrar confirmación
        Notification.success('¡Reserva realizada exitosamente!');
        
        // Cerrar modal
        Modal.hide('serviciosModal');
        
    }, 2000);
}

function verDetallesServicio(tipo, servicioId) {
    Notification.info(`Detalles del ${tipo} en desarrollo`);
}

function clearDestinoSearch() {
    // Limpiar formulario
    FormUtils.clearForm('destinoForm');
    
    // Recargar destinos populares
    loadDestinosPopulares();
}

// Exportar funciones para uso global
window.showDestinoDetails = showDestinoDetails;
window.explorarDestino = explorarDestino;
window.filtrarPorCategoria = filtrarPorCategoria;
window.reservarServicio = reservarServicio;
window.verDetallesServicio = verDetallesServicio;
window.clearDestinoSearch = clearDestinoSearch;
