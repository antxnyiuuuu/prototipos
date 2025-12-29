// Funciones globales para la aplicación TravelApp

// Configuración global
const APP_CONFIG = {
    name: 'TravelApp',
    version: '1.0.0',
    author: 'Juan KAJSK',
    storageKey: 'travelapp_data'
};

// Utilidades para localStorage
const Storage = {
    // Guardar datos
    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    },

    // Cargar datos
    load: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error cargando de localStorage:', error);
            return null;
        }
    },

    // Eliminar datos
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    },

    // Limpiar todo
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
            return false;
        }
    }
};

// Gestión de usuarios y roles
const UserManager = {
    currentUser: null,
    
    // Roles disponibles
    roles: {
        USER: 'usuario',
        ADMIN: 'admin',
        HOTEL: 'hotel',
        RESTAURANT: 'restaurante',
        ACTIVIDADES: 'actividades'
    },

    // Inicializar usuario desde localStorage
    init: function() {
        this.currentUser = Storage.load('current_user');
        return this.currentUser;
    },

    // Login rápido para testing
    quickLogin: function(role) {
        const users = {
            [this.roles.USER]: {
                id: 1,
                name: 'Usuario Test',
                email: 'usuario@test.com',
                role: this.roles.USER,
                avatar: '👤'
            },
            [this.roles.ADMIN]: {
                id: 2,
                name: 'Admin Test',
                email: 'admin@test.com',
                role: this.roles.ADMIN,
                avatar: '👨‍💼'
            },
            [this.roles.HOTEL]: {
                id: 3,
                name: 'Hotel Paradise',
                email: 'hotel@test.com',
                role: this.roles.HOTEL,
                avatar: '🏨'
            },
            [this.roles.RESTAURANT]: {
                id: 4,
                name: 'Restaurante Deluxe',
                email: 'restaurante@test.com',
                role: this.roles.RESTAURANT,
                avatar: '🍽️'
            },
            [this.roles.ACTIVIDADES]: {
                id: 5,
                name: 'Aventuras Plus',
                email: 'actividades@test.com',
                role: this.roles.ACTIVIDADES,
                avatar: '🎯'
            }
        };

        this.currentUser = users[role];
        Storage.save('current_user', this.currentUser);
        return this.currentUser;
    },

    // Logout
    logout: function() {
        this.currentUser = null;
        Storage.remove('current_user');
    },

    // Limpiar sesión completamente
    clearSession: function() {
        this.currentUser = null;
        Storage.remove('current_user');
        // También limpiar otros datos de sesión si los hay
        Storage.remove('user_preferences');
        Storage.remove('temp_data');
    },

    // Verificar si el usuario está logueado
    isLoggedIn: function() {
        // Si no hay usuario en memoria, intentar cargar del localStorage
        if (!this.currentUser) {
            this.currentUser = Storage.load('current_user');
        }
        return this.currentUser !== null;
    },

    // Obtener usuario actual
    getCurrentUser: function() {
        // Si no hay usuario en memoria, intentar cargar del localStorage
        if (!this.currentUser) {
            this.currentUser = Storage.load('current_user');
        }
        return this.currentUser;
    },

    // Verificar rol
    hasRole: function(role) {
        return this.currentUser && this.currentUser.role === role;
    }
};

// Gestión de modales
const Modal = {
    // Mostrar modal
    show: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    // Ocultar modal
    hide: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    // Ocultar todos los modales
    hideAll: function() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
};

// Utilidades para formularios
const FormUtils = {
    // Validar email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validar teléfono
    validatePhone: function(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Limpiar formulario
    clearForm: function(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    },

    // Obtener datos del formulario
    getFormData: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return null;

        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
};

// Utilidades para notificaciones
const Notification = {
    // Mostrar notificación
    show: function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.maxWidth = '300px';
        notification.style.animation = 'slideIn 0.3s ease';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    },

    // Notificaciones específicas
    success: function(message) {
        this.show(message, 'success');
    },

    error: function(message) {
        this.show(message, 'danger');
    },

    warning: function(message) {
        this.show(message, 'warning');
    },

    info: function(message) {
        this.show(message, 'info');
    }
};

// Utilidades para navegación
const Navigation = {
    // Navegar a página
    goTo: function(url) {
        window.location.href = url;
    },

    // Navegar según rol
    goToDashboard: function() {
        const user = UserManager.getCurrentUser();
        if (!user) {
            this.goTo('pages/login.html');
            return;
        }

        const dashboards = {
            [UserManager.roles.USER]: 'pages/dashboard-user.html',
            [UserManager.roles.ADMIN]: 'pages/dashboard-admin.html',
            [UserManager.roles.HOTEL]: 'pages/dashboard-hotel.html',
            [UserManager.roles.RESTAURANT]: 'pages/dashboard-restaurante.html',
            [UserManager.roles.ACTIVIDADES]: 'pages/dashboard-actividades.html'
        };

        const dashboard = dashboards[user.role];
        if (dashboard) {
            this.goTo(dashboard);
        } else {
            Notification.error('Rol de usuario no válido');
        }
    }
};

// Utilidades para fechas
const DateUtils = {
    // Formatear fecha
    format: function(date, format = 'dd/mm/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('dd', day)
            .replace('mm', month)
            .replace('yyyy', year);
    },

    // Obtener fecha actual
    now: function() {
        return new Date();
    },

    // Agregar días a una fecha
    addDays: function(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos globales
    setupGlobalEvents();
    
    console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} inicializada`);
});

// Configurar eventos globales
function setupGlobalEvents() {
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            Modal.hideAll();
        }
    });

    // Cerrar modales con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            Modal.hideAll();
        }
    });

    // Prevenir envío de formularios vacíos
    document.addEventListener('submit', function(event) {
        const form = event.target;
        if (form.tagName === 'FORM') {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '#e9ecef';
                }
            });

            if (!isValid) {
                event.preventDefault();
                Notification.error('Por favor, completa todos los campos requeridos');
            }
        }
    });
    
    // Configurar navegación dinámica (desactivado temporalmente)
    // setupDynamicNavigation();
}

// Configurar navegación dinámica según el estado de login
function setupDynamicNavigation() {
    // Solo aplicar navegación dinámica en páginas específicas
    const currentPage = window.location.pathname;
    const pagesWithDynamicNav = [
        'destinos.html',
        'vehiculos.html',
        'pagos.html'
    ];
    
    // Verificar si la página actual necesita navegación dinámica
    const needsDynamicNav = pagesWithDynamicNav.some(page => currentPage.includes(page));
    
    if (!needsDynamicNav) {
        return; // No modificar la navegación en otras páginas
    }
    
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const user = UserManager.getCurrentUser();
    
    if (user) {
        // Usuario logueado - actualizar enlaces existentes
        updateNavbarLinksForLoggedInUser(user);
    } else {
        // Usuario no logueado - mantener navegación original
        return;
    }
}

// Actualizar enlaces del navbar para usuario logueado (método más seguro)
function updateNavbarLinksForLoggedInUser(user) {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const role = user.role;
    
    // Buscar el enlace de "Inicio" y actualizarlo
    const inicioLink = navbar.querySelector('a[href="../index.html"]');
    if (inicioLink) {
        if (role === 'usuario') {
            inicioLink.href = 'dashboard-user.html';
        } else if (role === 'admin') {
            inicioLink.href = 'dashboard-admin.html';
        } else if (role === 'hotel') {
            inicioLink.href = 'dashboard-hotel.html';
        } else if (role === 'restaurante') {
            inicioLink.href = 'dashboard-restaurante.html';
        } else if (role === 'actividades') {
            inicioLink.href = 'dashboard-actividades.html';
        }
    }
    
    // Buscar el enlace de "Login" y ocultarlo o cambiarlo
    const loginLink = navbar.querySelector('a[href="login.html"]');
    if (loginLink) {
        // Cambiar el enlace de login por el menú de usuario
        loginLink.href = '#';
        loginLink.onclick = function(e) {
            e.preventDefault();
            showUserMenu();
        };
        
        // Cambiar el icono y texto
        const icon = loginLink.querySelector('.nav-icon');
        const text = loginLink.querySelector('span:last-child');
        if (icon) icon.textContent = '👤';
        if (text) {
            if (role === 'usuario') text.textContent = 'Mi Cuenta';
            else if (role === 'admin') text.textContent = 'Admin';
            else if (role === 'hotel') text.textContent = 'Hotel';
            else if (role === 'restaurante') text.textContent = 'Restaurante';
            else if (role === 'actividades') text.textContent = 'Actividades';
        }
    }
}

// Actualizar navbar para usuario no logueado
function updateNavbarForGuest() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    const navbarHTML = `
        <div class="navbar-content">
            <a href="../index.html" class="nav-item">
                <span class="nav-icon">🏠</span>
                <span>Inicio</span>
            </a>
            <a href="login.html" class="nav-item">
                <span class="nav-icon">🔐</span>
                <span>Login</span>
            </a>
            <a href="destinos.html" class="nav-item">
                <span class="nav-icon">🌍</span>
                <span>Destinos</span>
            </a>
            <a href="vehiculos.html" class="nav-item">
                <span class="nav-icon">🚗</span>
                <span>Transporte</span>
            </a>
        </div>
    `;
    
    navbar.innerHTML = navbarHTML;
}

// Mostrar menú de usuario (dropdown)
function showUserMenu() {
    const user = UserManager.getCurrentUser();
    if (!user) return;
    
    // Crear modal para el menú de usuario
    const modalHTML = `
        <div id="userMenuModal" class="modal">
            <div class="modal-content user-menu-modal">
                <div class="modal-header">
                    <h3 class="modal-title">Mi Cuenta</h3>
                    <span class="close" onclick="Modal.hide('userMenuModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="user-menu-content">
                        <div class="user-info-display">
                            <div class="user-avatar-large">👤</div>
                            <h4>${user.name}</h4>
                            <p class="user-role">${getRoleDisplayName(user.role)}</p>
                        </div>
                        
                        <div class="user-menu-actions">
                            <button class="btn btn-primary w-100" onclick="goToUserProfile()">
                                <span class="btn-icon">👤</span>
                                Mi Perfil
                            </button>
                            <button class="btn btn-secondary w-100" onclick="logout()">
                                <span class="btn-icon">🚪</span>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('userMenuModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    Modal.show('userMenuModal');
}

// Obtener nombre de rol para mostrar
function getRoleDisplayName(role) {
    const roleNames = {
        'usuario': 'Usuario',
        'admin': 'Administrador',
        'hotel': 'Hotel',
        'restaurante': 'Restaurante',
        'actividades': 'Actividades'
    };
    return roleNames[role] || role;
}

// Ir al perfil del usuario
function goToUserProfile() {
    const user = UserManager.getCurrentUser();
    if (!user) return;
    
    Modal.hide('userMenuModal');
    
    // Redirigir según el rol
    const role = user.role;
    if (role === 'usuario') {
        Navigation.goTo('pages/dashboard-user.html');
    } else if (role === 'admin') {
        Navigation.goTo('pages/dashboard-admin.html');
    } else if (role === 'hotel') {
        Navigation.goTo('pages/dashboard-hotel.html');
    } else if (role === 'restaurante') {
        Navigation.goTo('pages/dashboard-restaurante.html');
    } else if (role === 'actividades') {
        Navigation.goTo('pages/dashboard-actividades.html');
    }
}

// Función de logout
function logout() {
    UserManager.logout();
    Modal.hide('userMenuModal');
    
    // Redirigir al login
    Navigation.goTo('pages/login.html');
}

// Función para restaurar navegación original (en caso de problemas)
function restoreOriginalNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Restaurar navegación básica
    const navbarHTML = `
        <div class="navbar-content">
            <a href="../index.html" class="nav-item">
                <span class="nav-icon">🏠</span>
                <span>Inicio</span>
            </a>
            <a href="login.html" class="nav-item">
                <span class="nav-icon">🔐</span>
                <span>Login</span>
            </a>
            <a href="destinos.html" class="nav-item">
                <span class="nav-icon">🌍</span>
                <span>Destinos</span>
            </a>
            <a href="vehiculos.html" class="nav-item">
                <span class="nav-icon">🚗</span>
                <span>Transporte</span>
            </a>
        </div>
    `;
    
    navbar.innerHTML = navbarHTML;
}

// Mostrar menú de edición del admin
function showAdminEditMenu() {
    const modalHTML = `
        <div id="adminEditModal" class="modal">
            <div class="modal-content user-menu-modal">
                <div class="modal-header">
                    <h3 class="modal-title">Editar Sistema</h3>
                    <span class="close" onclick="Modal.hide('adminEditModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="user-menu-content">
                        <div class="user-menu-actions">
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminEditModal'); Navigation.goTo('registro-hotel.html')">
                                <span class="btn-icon">🏨</span>
                                Editar Hoteles
                            </button>
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminEditModal'); Navigation.goTo('registro-restaurante.html')">
                                <span class="btn-icon">🍽️</span>
                                Editar Restaurantes
                            </button>
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminEditModal'); Navigation.goTo('registro-actividades.html')">
                                <span class="btn-icon">🎯</span>
                                Editar Actividades
                            </button>
                            <button class="btn btn-secondary w-100" onclick="Modal.hide('adminEditModal')">
                                <span class="btn-icon">❌</span>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('adminEditModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    Modal.show('adminEditModal');
}

// Mostrar menú de visualización del admin
function showAdminViewMenu() {
    const modalHTML = `
        <div id="adminViewModal" class="modal">
            <div class="modal-content user-menu-modal">
                <div class="modal-header">
                    <h3 class="modal-title">Ver Sistema</h3>
                    <span class="close" onclick="Modal.hide('adminViewModal')">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="user-menu-content">
                        <div class="user-menu-actions">
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminViewModal'); Navigation.goTo('destinos.html')">
                                <span class="btn-icon">🌍</span>
                                Ver Destinos
                            </button>
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminViewModal'); Navigation.goTo('vehiculos.html')">
                                <span class="btn-icon">🚗</span>
                                Ver Transporte
                            </button>
                            <button class="btn btn-primary w-100" onclick="Modal.hide('adminViewModal'); showReportes()">
                                <span class="btn-icon">📊</span>
                                Ver Reportes
                            </button>
                            <button class="btn btn-secondary w-100" onclick="Modal.hide('adminViewModal')">
                                <span class="btn-icon">❌</span>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('adminViewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    Modal.show('adminViewModal');
}

// Exportar utilidades para uso global
window.Storage = Storage;
window.UserManager = UserManager;
window.Modal = Modal;
window.FormUtils = FormUtils;
window.Notification = Notification;
window.Navigation = Navigation;
window.DateUtils = DateUtils;
window.showUserMenu = showUserMenu;
window.goToUserProfile = goToUserProfile;
window.logout = logout;
window.restoreOriginalNavigation = restoreOriginalNavigation;
window.showAdminEditMenu = showAdminEditMenu;
window.showAdminViewMenu = showAdminViewMenu;
