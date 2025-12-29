// Carrito de Compras - Maquetado sin backend
document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotalAmount');
    const taxEl = document.getElementById('taxAmount');
    const totalEl = document.getElementById('totalAmount');
    const paymentContent = document.getElementById('paymentContent');
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');

    const TAX_RATE = 0.12; // 12% simulado

    // Verificar si el usuario está logueado
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

    // Cargar carrito desde localStorage
    let cart = loadCart();
    
    // Si no hay sesión, limpiar el carrito
    if (!isUserLoggedIn()) {
        cart = [];
        saveCart(cart);
        console.log('Carrito: Usuario no logueado, carrito limpiado');
    } else {
        // Solo cargar mock si está vacío y el usuario está logueado
        if (cart.length === 0) {
            cart = getMockCart();
            saveCart(cart);
            console.log('Carrito: Usuario logueado, carrito con datos de ejemplo cargado');
        }
    }

    renderCartItems();
    updateSummary();
    initPaymentMethods();

    confirmPaymentBtn.addEventListener('click', onConfirmPayment);
    
    // Escuchar cambios en localStorage para verificar sesión
    window.addEventListener('storage', function(e) {
        if (e.key === 'userSession') {
            // Recargar la página si cambia el estado de sesión
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    });

    function loadCart() {
        try {
            const stored = localStorage.getItem('vm_cart');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(data) {
        localStorage.setItem('vm_cart', JSON.stringify(data));
    }

    function getMockCart() {
        return [
            { id: 1, title: 'Europa Clásica', price: 1299, qty: 1, image: '../assets/img/package1.jpg' },
            { id: 2, title: 'Caribe Exótico', price: 899, qty: 2, image: '../assets/img/package2.jpg' }
        ];
    }

    function renderCartItems() {
        if (!cartItemsContainer) return;
        
        // Verificar si el usuario está logueado
        const isLoggedIn = isUserLoggedIn();
        
        if (cart.length === 0) {
            if (!isLoggedIn) {
                // Mensaje para usuarios no logueados
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-user-lock"></i>
                        <h3>Inicia sesión para ver tu carrito</h3>
                        <p>Necesitas estar logueado para acceder a tu carrito de compras.</p>
                        <a href="login.html" class="btn btn-primary">Iniciar Sesión</a>
                    </div>
                `;
            } else {
                // Mensaje para usuarios logueados con carrito vacío
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Tu carrito está vacío</h3>
                        <p>Explora nuestros <a href="paquetes.html">paquetes</a> y añade tus favoritos.</p>
                    </div>
                `;
            }
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.src='../assets/img/placeholder.jpg'"/>
                </div>
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <div class="item-price">€${item.price}</div>
                    <div class="item-qty">
                        <button class="qty-btn" data-action="decrease">-</button>
                        <input type="number" min="1" value="${item.qty}" class="qty-input" />
                        <button class="qty-btn" data-action="increase">+</button>
                    </div>
                </div>
                <div class="item-total">
                    <span>€${(item.price * item.qty).toFixed(2)}</span>
                    <button class="remove-item"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');

        bindItemEvents();
    }

    function bindItemEvents() {
        cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = getItemId(this);
                const action = this.dataset.action;
                const item = cart.find(p => p.id === id);
                if (!item) return;
                if (action === 'increase') item.qty += 1;
                if (action === 'decrease') item.qty = Math.max(1, item.qty - 1);
                saveCart(cart);
                renderCartItems();
                updateSummary();
            });
        });

        cartItemsContainer.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = getItemId(this);
                const item = cart.find(p => p.id === id);
                if (!item) return;
                const val = parseInt(this.value || '1', 10);
                item.qty = Math.max(1, val);
                saveCart(cart);
                renderCartItems();
                updateSummary();
            });
        });

        cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = getItemId(this);
                cart = cart.filter(p => p.id !== id);
                saveCart(cart);
                renderCartItems();
                updateSummary();
            });
        });
    }

    function getItemId(el) {
        const itemEl = el.closest('.cart-item');
        return parseInt(itemEl.dataset.id, 10);
    }

    function updateSummary() {
        const subtotal = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;
        subtotalEl.textContent = formatPrice(subtotal);
        taxEl.textContent = formatPrice(tax);
        totalEl.textContent = formatPrice(total);
        
        // Verificar si el usuario está logueado para habilitar/deshabilitar el botón de pago
        const isLoggedIn = isUserLoggedIn();
        if (confirmPaymentBtn) {
            if (!isLoggedIn) {
                confirmPaymentBtn.disabled = true;
                confirmPaymentBtn.textContent = 'Inicia sesión para continuar';
                confirmPaymentBtn.classList.add('btn-disabled');
            } else if (cart.length === 0) {
                confirmPaymentBtn.disabled = true;
                confirmPaymentBtn.textContent = 'Carrito vacío';
                confirmPaymentBtn.classList.add('btn-disabled');
            } else {
                confirmPaymentBtn.disabled = false;
                confirmPaymentBtn.textContent = 'Confirmar Pago';
                confirmPaymentBtn.classList.remove('btn-disabled');
            }
        }
    }

    function initPaymentMethods() {
        const radios = document.querySelectorAll('input[name="paymentMethod"]');
        radios.forEach(r => r.addEventListener('change', renderPaymentContent));
        renderPaymentContent();
    }

    function renderPaymentContent() {
        const method = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (method === 'card') {
            paymentContent.innerHTML = `
                <div class="payment-card form">
                    <div class="form-group">
                        <label for="cardNumber">Número de tarjeta</label>
                        <input type="text" id="cardNumber" maxlength="19" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-group">
                        <label for="cardName">Nombre en la tarjeta</label>
                        <input type="text" id="cardName" placeholder="Como aparece en la tarjeta" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cardExp">Expiración (MM/AA)</label>
                            <input type="text" id="cardExp" maxlength="5" placeholder="MM/AA" required>
                        </div>
                        <div class="form-group">
                            <label for="cardCvv">CVV</label>
                            <input type="password" id="cardCvv" maxlength="3" placeholder="123" required>
                        </div>
                    </div>
                </div>
            `;

            // Máscaras básicas
            const numberInput = document.getElementById('cardNumber');
            numberInput.addEventListener('input', () => {
                numberInput.value = numberInput.value
                    .replace(/\D/g, '')
                    .slice(0, 16)
                    .replace(/(\d{4})(?=\d)/g, '$1 ');
            });

            const expInput = document.getElementById('cardExp');
            expInput.addEventListener('input', () => {
                expInput.value = expInput.value
                    .replace(/\D/g, '')
                    .slice(0, 4)
                    .replace(/(\d{2})(?=\d)/, '$1/');
            });

            const cvvInput = document.getElementById('cardCvv');
            cvvInput.addEventListener('input', () => {
                cvvInput.value = cvvInput.value.replace(/\D/g, '').slice(0, 3);
            });
        }

        if (method === 'paypal') {
            paymentContent.innerHTML = `
                <div class="payment-paypal">
                    <button class="btn btn-secondary btn-full" id="paypalBtn">
                        <i class="fab fa-paypal"></i> Pagar con PayPal
                    </button>
                </div>
            `;
        }

        if (method === 'pichincha') {
            paymentContent.innerHTML = `
                <div class="payment-bank">
                    <div class="bank-details">
                        <p><strong>Banco Pichincha</strong></p>
                        <p>Número de cuenta: <strong>1234567890</strong></p>
                        <p>Titular: ViajesMundo S.A.</p>
                        <p>Referencia: <strong>VM-${Date.now().toString().slice(-6)}</strong></p>
                    </div>
                    <p>Realiza la transferencia y luego confirma el pago.</p>
                </div>
            `;
        }
    }

    function onConfirmPayment() {
        const method = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (cart.length === 0) {
            notify('Tu carrito está vacío', 'info');
            return;
        }
        if (method === 'card') {
            const number = (document.getElementById('cardNumber') || {}).value || '';
            const name = (document.getElementById('cardName') || {}).value || '';
            const exp = (document.getElementById('cardExp') || {}).value || '';
            const cvv = (document.getElementById('cardCvv') || {}).value || '';
            const digits = number.replace(/\s/g, '');
            const valid = digits.length === 16 && /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) && /^\d{3}$/.test(cvv) && name.trim().length > 2;
            if (!valid) {
                notify('Revisa los datos de la tarjeta', 'error');
                return;
            }
        }
        notify('Pago confirmado (simulado). ¡Gracias por tu compra!', 'success');
        // Vaciar carrito simulado
        cart = [];
        saveCart(cart);
        renderCartItems();
        updateSummary();
    }

    function formatPrice(amount) {
        if (window.ViajesMundo && window.ViajesMundo.formatPrice) {
            return window.ViajesMundo.formatPrice(amount, '€');
        }
        return `€${Number(amount).toFixed(2)}`;
    }

    function notify(message, type) {
        if (window.ViajesMundo && window.ViajesMundo.showNotification) {
            window.ViajesMundo.showNotification(message, type);
        } else {
            alert(message);
        }
    }
});


