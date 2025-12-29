// Funcionalidades específicas de la página de paquetes - Versión actualizada
document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    loadPackages();
    initSorting();
    initPagination();
    
    // Escuchar cambios en paquetes
    window.addEventListener('packagesChanged', function() {
        loadPackages();
    });
});

// Variables globales
let currentPackages = [];
let currentPage = 1;
const packagesPerPage = 6;

// Función para obtener paquetes del gestor centralizado
function getAllPackages() {
    return window.PackageManager ? window.PackageManager.getActivePackages() : [];
}

// Cargar paquetes
function loadPackages() {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;
    
    const packages = getFilteredPackages();
    const sortedPackages = sortPackages(packages);
    const paginatedPackages = paginatePackages(sortedPackages);
    
    displayPackages(paginatedPackages);
    updatePagination(sortedPackages.length);
}

// Obtener paquetes filtrados
function getFilteredPackages() {
    const allPackages = getAllPackages();
    let filteredPackages = [...allPackages];
    
    // Aplicar filtros
    const destinationFilter = document.getElementById('destinationFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (destinationFilter && destinationFilter.value) {
        filteredPackages = filteredPackages.filter(package => 
            package.destination === destinationFilter.value
        );
    }
    
    if (categoryFilter && categoryFilter.value) {
        filteredPackages = filteredPackages.filter(package => 
            package.category === categoryFilter.value
        );
    }
    
    if (priceFilter && priceFilter.value) {
        const maxPrice = parseInt(priceFilter.value);
        filteredPackages = filteredPackages.filter(package => 
            package.price <= maxPrice
        );
    }
    
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase();
        filteredPackages = filteredPackages.filter(package =>
            package.title.toLowerCase().includes(searchTerm) ||
            package.description.toLowerCase().includes(searchTerm) ||
            package.destination.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPackages = filteredPackages;
    return filteredPackages;
}

// Ordenar paquetes
function sortPackages(packages) {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return packages;
    
    const sortBy = sortSelect.value;
    
    return packages.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'duration-asc':
                return a.duration - b.duration;
            case 'duration-desc':
                return b.duration - a.duration;
            case 'rating-desc':
                return b.rating - a.rating;
            case 'name-asc':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
}

// Paginar paquetes
function paginatePackages(packages) {
    const startIndex = (currentPage - 1) * packagesPerPage;
    const endIndex = startIndex + packagesPerPage;
    return packages.slice(startIndex, endIndex);
}

// Mostrar paquetes
function displayPackages(packages) {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;
    
    if (packages.length === 0) {
        packagesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron paquetes</h3>
                <p>Intenta ajustar los filtros de búsqueda</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    packages.forEach(package => {
        html += createPackageCard(package);
    });
    
    packagesGrid.innerHTML = html;
    addReservationEventListeners();
}

// Crear tarjeta de paquete
function createPackageCard(package) {
    return `
        <div class="package-card" data-package-id="${package.id}">
            <div class="package-image">
                <img src="${package.image}" alt="${package.title}" onerror="this.src='../assets/img/placeholder.jpg'">
                <div class="package-category">${package.category}</div>
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
                <div class="package-actions">
                    <button class="btn btn-secondary reserve-btn" data-package-id="${package.id}">
                        <i class="fas fa-calendar-check"></i> Reservar
                    </button>
                    <button class="btn btn-primary add-cart-btn" data-package-id="${package.id}">
                        <i class="fas fa-shopping-cart"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Agregar event listeners a los botones de reserva
function addReservationEventListeners() {
    const reserveButtons = document.querySelectorAll('.reserve-btn');
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    
    reserveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageId = parseInt(this.dataset.packageId, 10);
            const pkg = getAllPackages().find(p => p.id === packageId);
            if (pkg) {
                // Agregar al carrito (la verificación de sesión está integrada en addToCart)
                if (window.ViajesMundo && window.ViajesMundo.addToCart) {
                    const success = window.ViajesMundo.addToCart(pkg);
                    if (success) {
                        // Redirigir a agenda solo si se agregó exitosamente
                        window.location.href = 'agenda.html';
                    }
                }
            }
        });
    });
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageId = parseInt(this.dataset.packageId, 10);
            const pkg = getAllPackages().find(p => p.id === packageId);
            if (pkg) {
                // Agregar al carrito (la verificación de sesión está integrada en addToCart)
                if (window.ViajesMundo && window.ViajesMundo.addToCart) {
                    const success = window.ViajesMundo.addToCart(pkg);
                    if (success) {
                        showNotification('Paquete agregado al carrito', 'success');
                    }
                }
            }
        });
    });
}

// Inicializar filtros
function initFilters() {
    const destinationFilter = document.getElementById('destinationFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    // Cargar opciones de filtros
    loadFilterOptions();
    
    // Event listeners para filtros
    if (destinationFilter) {
        destinationFilter.addEventListener('change', loadPackages);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadPackages);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', loadPackages);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(loadPackages, 300));
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
}

// Cargar opciones de filtros
function loadFilterOptions() {
    const allPackages = getAllPackages();
    
    // Destinos únicos
    const destinations = [...new Set(allPackages.map(p => p.destination))];
    const destinationFilter = document.getElementById('destinationFilter');
    if (destinationFilter) {
        destinationFilter.innerHTML = '<option value="">Todos los destinos</option>';
        destinations.forEach(dest => {
            destinationFilter.innerHTML += `<option value="${dest}">${dest}</option>`;
        });
    }
    
    // Categorías únicas
    const categories = [...new Set(allPackages.map(p => p.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">Todas las categorías</option>';
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
}

// Limpiar filtros
function clearFilters() {
    const destinationFilter = document.getElementById('destinationFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (destinationFilter) destinationFilter.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    loadPackages();
}

// Inicializar ordenamiento
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', loadPackages);
    }
}

// Inicializar paginación
function initPagination() {
    updatePagination(getAllPackages().length);
}

// Actualizar paginación
function updatePagination(totalPackages) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(totalPackages / packagesPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Botón anterior
    html += `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<span class="pagination-ellipsis">...</span>';
        }
    }
    
    // Botón siguiente
    html += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = html;
}

// Cambiar página
function changePage(page) {
    const totalPages = Math.ceil(getAllPackages().length / packagesPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadPackages();
    }
}

// Función debounce para búsqueda
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

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification(message, type);
    } else {
        // Fallback simple
        alert(message);
    }
}
