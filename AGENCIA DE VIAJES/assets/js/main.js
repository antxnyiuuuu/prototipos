// Funcionalidades principales del sitio
document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    initMobileNav();
    
    // Carrusel de destinos
    initCarousel();
    
    // Menú hamburguesa
    initHamburger();
    
    // Smooth scroll para enlaces internos
    initSmoothScroll();
    
    // Animaciones al hacer scroll
    initScrollAnimations();
    
    // Inicializar funciones globales de verificación de sesión
    initSessionValidation();
});

// Navegación móvil
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Menú hamburguesa
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Animación de las líneas
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Carrusel de destinos
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentSlide = 0;
    
    // Función para mostrar slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
            slide.classList.toggle('active', i === index);
        });
    }
    
    // Función para siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Función para slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-play del carrusel
    setInterval(nextSlide, 5000);
    
    // Inicializar primer slide
    showSlide(0);
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animateElements = document.querySelectorAll('.package-card, .service-card, .stat-card');
    animateElements.forEach(el => observer.observe(el));
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

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
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

// Función para formatear precios
function formatPrice(price, currency = '€') {
    return `${currency}${parseFloat(price).toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Función para formatear fechas
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para debounce
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

// Función para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Función para manejar errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    showNotification(`Ha ocurrido un error: ${error.message}`, 'error');
}

// Función para cargar datos desde localStorage
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
        return defaultValue;
    }
}

// Función para guardar datos en localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}

// Función para limpiar localStorage
function clearStorage(key) {
    try {
        if (key) {
            localStorage.removeItem(key);
        } else {
            localStorage.clear();
        }
        return true;
    } catch (error) {
        console.error('Error al limpiar localStorage:', error);
        return false;
    }
}

// Función para hacer peticiones HTTP simuladas
async function makeRequest(url, options = {}) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular respuesta exitosa
    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, message: 'Operación completada' })
    };
}

// Función para manejar respuestas de API
function handleApiResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    try {
        const userSession = localStorage.getItem('userSession');
        
        const hasUserSession = userSession !== null && userSession !== 'null' && userSession !== '';
        
        return hasUserSession;
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return false;
    }
}

// Función para mostrar modal de login requerido
function showLoginRequiredModal(action = 'continuar') {
    const modalHtml = `
        <div class="login-required-modal" id="loginRequiredModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-lock"></i> Inicia sesión para ${action}</h3>
                    <button class="close-modal" onclick="closeLoginRequiredModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Necesitas estar logueado para poder ${action}.</p>
                    <div class="modal-actions">
                        <a href="login.html" class="btn btn-primary">
                            <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                        </a>
                        <button class="btn btn-outline" onclick="closeLoginRequiredModal()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('loginRequiredModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal con animación
    setTimeout(() => {
        const modal = document.getElementById('loginRequiredModal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 10);
}

// Función para cerrar modal de login requerido
function closeLoginRequiredModal() {
    const modal = document.getElementById('loginRequiredModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Función para verificar sesión antes de realizar acciones
function requireLogin(action = 'continuar', callback = null) {
    if (!isUserLoggedIn()) {
        showLoginRequiredModal(action);
        return false;
    }
    
    if (callback && typeof callback === 'function') {
        callback();
    }
    return true;
}

// Función para agregar productos al carrito
function addToCart(product) {
    try {
        // Verificar si el usuario está logueado
        if (!isUserLoggedIn()) {
            showLoginRequiredModal('agregar al carrito');
            return false;
        }
        
        // Cargar carrito actual
        let cart = [];
        try {
            const stored = localStorage.getItem('vm_cart');
            cart = stored ? JSON.parse(stored) : [];
        } catch (e) {
            cart = [];
        }
        
        // Buscar si el producto ya existe en el carrito
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Incrementar cantidad si ya existe
            existingItem.qty += 1;
        } else {
            // Agregar nuevo producto
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                qty: 1,
                image: product.image
            });
        }
        
        // Guardar carrito actualizado
        localStorage.setItem('vm_cart', JSON.stringify(cart));
        
        console.log('Producto agregado al carrito:', product.title);
        return true;
        
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        return false;
    }
}

// Inicializar funciones de verificación de sesión
function initSessionValidation() {
    // Agregar estilos CSS para el modal si no existen
    if (!document.getElementById('sessionValidationStyles')) {
        const styles = `
            <style id="sessionValidationStyles">
                .login-required-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .login-required-modal.active {
                    opacity: 1;
                }
                
                .login-required-modal .modal-content {
                    background: white;
                    border-radius: 12px;
                    padding: 0;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                }
                
                .login-required-modal.active .modal-content {
                    transform: scale(1);
                }
                
                .login-required-modal .modal-header {
                    background: #3B82F6;
                    color: white;
                    padding: 1.5rem;
                    border-radius: 12px 12px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .login-required-modal .modal-header h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .login-required-modal .close-modal {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: background-color 0.2s ease;
                }
                
                .login-required-modal .close-modal:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .login-required-modal .modal-body {
                    padding: 2rem;
                    text-align: center;
                }
                
                .login-required-modal .modal-body p {
                    margin-bottom: 1.5rem;
                    color: #6B7280;
                    font-size: 1rem;
                    line-height: 1.5;
                }
                
                .login-required-modal .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .login-required-modal .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .login-required-modal .btn-primary {
                    background: #3B82F6;
                    color: white;
                    border: none;
                }
                
                .login-required-modal .btn-primary:hover {
                    background: #2563EB;
                    transform: translateY(-2px);
                }
                
                .login-required-modal .btn-outline {
                    background: transparent;
                    color: #6B7280;
                    border: 2px solid #E5E7EB;
                }
                
                .login-required-modal .btn-outline:hover {
                    background: #F9FAFB;
                    border-color: #D1D5DB;
                }
                
                @media (max-width: 480px) {
                    .login-required-modal .modal-content {
                        width: 95%;
                        margin: 1rem;
                    }
                    
                    .login-required-modal .modal-actions {
                        flex-direction: column;
                    }
                    
                    .login-required-modal .btn {
                        width: 100%;
                        justify-content: center;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Exportar funciones para uso en otros archivos
window.ViajesMundo = {
    showNotification,
    validateForm,
    formatPrice,
    formatDate,
    generateId,
    debounce,
    throttle,
    handleError,
    loadFromStorage,
    saveToStorage,
    clearStorage,
    makeRequest,
    handleApiResponse,
    isUserLoggedIn,
    requireLogin,
    showLoginRequiredModal,
    closeLoginRequiredModal,
    addToCart
};
