// Motorgsa - Aplicación Principal
// Lógica global y funciones de utilidad

// Variables globales
let currentUser = null;
let cart = [];

// Inicialización de la aplicación
function initApp() {
    console.log('🚜 Motorgsa App iniciada');
    checkAuthStatus();
    loadCartFromStorage();
}

// Verificar estado de autenticación
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && userData) {
        currentUser = JSON.parse(userData);
        return true;
    }
    return false;
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
    }
}

// Función para navegar entre páginas
function navigateTo(page) {
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    
    let targetPath;
    if (isInPages) {
        targetPath = `${page}.html`;
    } else {
        targetPath = `pages/${page}.html`;
    }
    
    window.location.href = targetPath;
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cart');
    
    currentUser = null;
    cart = [];
    
    navigateTo('login');
}

// Función para mostrar mensajes
function showMessage(message, type = 'info', duration = 3000) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '10px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.minWidth = '250px';
    messageDiv.style.textAlign = 'center';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            document.body.removeChild(messageDiv);
        }
    }, duration);
}

// Función para formatear precios
function formatPrice(price, userRole = null) {
    let finalPrice = price;
    
    // Aplicar descuento de distribuidor
    if (userRole === 'distribuidor') {
        finalPrice = price * 0.9;
    }
    
    return `$${finalPrice.toFixed(2)}`;
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Función para agregar producto al carrito
function addToCart(productId) {
    if (!currentUser) {
        showMessage('Debes iniciar sesión', 'error');
        return;
    }
    
    if (typeof loadProductsFromStorage === 'function') { loadProductsFromStorage(); }
    const product = getProductById(productId);
    if (!product) {
        showMessage('Producto no encontrado', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        let price = product.price;
        if (currentUser.role === 'distribuidor') {
            const discountPercent = typeof product.distributorDiscountPercent === 'number' ? product.distributorDiscountPercent : 10;
            const discountFactor = Math.max(0, Math.min(100, discountPercent));
            price = product.price * (1 - discountFactor / 100);
        }
        
        cart.push({
            id: productId,
            name: product.name,
            price: price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount();
    
    showMessage('Producto agregado', 'success');
}

// Función para remover producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Si estamos en la página del carrito, recargar
    if (window.location.pathname.includes('cart.html')) {
        location.reload();
    }
}

// Función para actualizar cantidad en el carrito
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Si estamos en la página del carrito, recargar
            if (window.location.pathname.includes('cart.html')) {
                location.reload();
            }
        }
    }
}

// Función para obtener total del carrito
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Función para limpiar carrito
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
}

// Función para procesar compra
function processPurchase(paymentType) {
    if (cart.length === 0) {
        showMessage('Carrito vacío', 'error');
        return false;
    }
    
    const total = getCartTotal();
    
    // Crear objeto de compra
    const purchase = {
        id: Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        items: [...cart],
        total: total,
        paymentType: paymentType,
        date: new Date().toISOString(),
        status: paymentType === 'credit' ? 'Pendiente' : 'Completada'
    };
    
    // Guardar compra
    let purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    // Limpiar carrito
    clearCart();
    
    // Mensaje de confirmación
    let message = '';
    if (paymentType === 'credit') {
        message = 'Solicitud de crédito enviada';
    } else {
        message = `¡Compra exitosa! ${formatPrice(total)}`;
    }
    
    showMessage(message, 'success');
    return true;
}

// Función para verificar permisos de administrador
function checkAdminPermissions() {
    if (!currentUser || currentUser.role !== 'admin') {
        showMessage('Acceso denegado', 'error');
        navigateTo('login');
        return false;
    }
    return true;
}

// Event listeners globales
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // Prevenir envío de formularios vacíos
    document.addEventListener('submit', function(e) {
        const form = e.target;
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '#333';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showMessage('Completa todos los campos', 'error');
        }
    });
    
    // Mejorar UX en inputs
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, select')) {
            e.target.style.borderColor = e.target.value ? '#E50914' : '#333';
        }
    });
});

// Exportar funciones para uso global
window.AutoParts = {
    navigateTo,
    logout,
    showMessage,
    formatPrice,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    clearCart,
    processPurchase,
    checkAdminPermissions
};
