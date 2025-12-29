// JavaScript específico para la página de pagos

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de pagos
    initPagosPage();
    
    // Configurar eventos
    setupPagosEvents();
});

function initPagosPage() {
    console.log('Inicializando página de pagos...');
    
    // Verificar si hay usuario logueado
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.warning('Debes iniciar sesión para procesar pagos');
        Navigation.goTo('login.html');
        return;
    }
    
    // Cargar resumen de reserva
    loadReservaSummary();
    
    // Configurar validación de tarjeta
    setupCardValidation();
}

function setupPagosEvents() {
    // Evento del formulario de pago
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePayment);
    }
    
    // Eventos de validación en tiempo real
    const cardNumberField = document.getElementById('cardNumber');
    if (cardNumberField) {
        cardNumberField.addEventListener('input', formatCardNumber);
        cardNumberField.addEventListener('input', validateCardNumber);
    }
    
    const expiryField = document.getElementById('expiryDate');
    if (expiryField) {
        expiryField.addEventListener('input', formatExpiryDate);
        expiryField.addEventListener('input', validateExpiryDate);
    }
    
    const cvvField = document.getElementById('cvv');
    if (cvvField) {
        cvvField.addEventListener('input', validateCVV);
    }
    
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', validateEmail);
    }
    
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', validatePhone);
    }
}

function loadReservaSummary() {
    const reservaSummary = document.getElementById('reservaSummary');
    if (!reservaSummary) return;
    
    // Obtener reservas del usuario
    const reservas = Storage.load('user_reservas') || [];
    const reservaActiva = reservas.find(r => r.estado === 'pendiente');
    
    if (!reservaActiva) {
        // Crear reserva de ejemplo
        const reservaEjemplo = createSampleReserva();
        displayReservaSummary(reservaEjemplo);
        calculateTotal(reservaEjemplo);
    } else {
        displayReservaSummary(reservaActiva);
        calculateTotal(reservaActiva);
    }
}

function createSampleReserva() {
    return {
        id: Date.now(),
        titulo: 'Paquete de Viaje Completo',
        items: [
            {
                tipo: 'hotel',
                nombre: 'Hotel Paradise Resort',
                descripcion: '3 noches en habitación doble',
                precio: 450,
                icono: '🏨'
            },
            {
                tipo: 'transporte',
                nombre: 'Transfer Aeropuerto',
                descripcion: 'Traslado ida y vuelta',
                precio: 80,
                icono: '🚗'
            },
            {
                tipo: 'actividad',
                nombre: 'Tour Arqueológico',
                descripcion: 'Visita a Chichén Itzá',
                precio: 75,
                icono: '🏛️'
            }
        ],
        subtotal: 605,
        impuestos: 97,
        total: 702
    };
}

function displayReservaSummary(reserva) {
    const reservaSummary = document.getElementById('reservaSummary');
    
    if (reserva.items) {
        // Mostrar items individuales
        reservaSummary.innerHTML = reserva.items.map(item => `
            <div class="summary-item">
                <div class="summary-item-header">
                    <div class="summary-item-icon">${item.icono}</div>
                    <div class="summary-item-info">
                        <h4>${item.nombre}</h4>
                        <p>${item.descripcion}</p>
                    </div>
                </div>
                <div class="summary-item-price">$${item.precio}</div>
            </div>
        `).join('');
    } else {
        // Mostrar reserva simple
        reservaSummary.innerHTML = `
            <div class="summary-item">
                <div class="summary-item-header">
                    <div class="summary-item-icon">🎯</div>
                    <div class="summary-item-info">
                        <h4>${reserva.titulo}</h4>
                        <p>${reserva.descripcion}</p>
                    </div>
                </div>
                <div class="summary-item-price">$${reserva.precio}</div>
            </div>
        `;
    }
}

function calculateTotal(reserva) {
    let subtotal = 0;
    
    if (reserva.items) {
        subtotal = reserva.items.reduce((total, item) => total + item.precio, 0);
    } else {
        subtotal = reserva.precio || 0;
    }
    
    const impuestos = Math.round(subtotal * 0.16);
    const total = subtotal + impuestos;
    
    // Actualizar totales en la interfaz
    const subtotalElement = document.getElementById('subtotal');
    const impuestosElement = document.getElementById('impuestos');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal}`;
    if (impuestosElement) impuestosElement.textContent = `$${impuestos}`;
    if (totalElement) totalElement.textContent = `$${total}`;
    
    // Guardar total para uso posterior
    window.currentTotal = total;
}

function nextStep(stepNumber) {
    // Ocultar paso actual
    const currentStep = document.querySelector('.step-content:not([style*="display: none"])');
    if (currentStep) {
        currentStep.style.display = 'none';
    }
    
    // Mostrar siguiente paso
    const nextStepElement = document.getElementById(`step${stepNumber}`);
    if (nextStepElement) {
        nextStepElement.style.display = 'block';
    }
    
    // Actualizar progreso
    updateProgress(stepNumber);
}

function prevStep(stepNumber) {
    // Ocultar paso actual
    const currentStep = document.querySelector('.step-content:not([style*="display: none"])');
    if (currentStep) {
        currentStep.style.display = 'none';
    }
    
    // Mostrar paso anterior
    const prevStepElement = document.getElementById(`step${stepNumber}`);
    if (prevStepElement) {
        prevStepElement.style.display = 'block';
    }
    
    // Actualizar progreso
    updateProgress(stepNumber);
}

function updateProgress(currentStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function setupCardValidation() {
    // Configurar validación de tarjeta en tiempo real
    console.log('Configurando validación de tarjeta...');
}

function formatCardNumber(event) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substr(0, 19);
    }
    
    event.target.value = formattedValue;
}

function formatExpiryDate(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    event.target.value = value;
}

function validateCardNumber(event) {
    const cardNumber = event.target.value.replace(/\s/g, '');
    const isValid = validateLuhn(cardNumber) && cardNumber.length >= 13;
    
    if (cardNumber.length > 0) {
        event.target.classList.toggle('valid', isValid);
        event.target.classList.toggle('invalid', !isValid);
    } else {
        event.target.classList.remove('valid', 'invalid');
    }
}

function validateLuhn(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

function validateExpiryDate(event) {
    const value = event.target.value;
    const isValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
    
    if (value.length > 0) {
        event.target.classList.toggle('valid', isValid);
        event.target.classList.toggle('invalid', !isValid);
    } else {
        event.target.classList.remove('valid', 'invalid');
    }
}

function validateCVV(event) {
    const cvv = event.target.value;
    const isValid = /^\d{3,4}$/.test(cvv);
    
    if (cvv.length > 0) {
        event.target.classList.toggle('valid', isValid);
        event.target.classList.toggle('invalid', !isValid);
    } else {
        event.target.classList.remove('valid', 'invalid');
    }
}

function validateEmail(event) {
    const email = event.target.value;
    const isValid = FormUtils.validateEmail(email);
    
    if (email.length > 0) {
        event.target.classList.toggle('valid', isValid);
        event.target.classList.toggle('invalid', !isValid);
    } else {
        event.target.classList.remove('valid', 'invalid');
    }
}

function validatePhone(event) {
    const phone = event.target.value;
    const isValid = FormUtils.validatePhone(phone);
    
    if (phone.length > 0) {
        event.target.classList.toggle('valid', isValid);
        event.target.classList.toggle('invalid', !isValid);
    } else {
        event.target.classList.remove('valid', 'invalid');
    }
}

function handlePayment(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('paymentForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Validar datos del pago
    if (!validatePaymentData(formData)) {
        return;
    }
    
    // Procesar pago
    processPayment(formData);
}

function validatePaymentData(data) {
    let isValid = true;
    
    // Validar número de tarjeta
    const cardNumber = data.cardNumber.replace(/\s/g, '');
    if (!validateLuhn(cardNumber) || cardNumber.length < 13) {
        Notification.error('Número de tarjeta inválido');
        isValid = false;
    }
    
    // Validar fecha de vencimiento
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
        Notification.error('Fecha de vencimiento inválida');
        isValid = false;
    }
    
    // Validar CVV
    if (!/^\d{3,4}$/.test(data.cvv)) {
        Notification.error('CVV inválido');
        isValid = false;
    }
    
    // Validar email
    if (!FormUtils.validateEmail(data.email)) {
        Notification.error('Email inválido');
        isValid = false;
    }
    
    // Validar teléfono
    if (!FormUtils.validatePhone(data.phone)) {
        Notification.error('Teléfono inválido');
        isValid = false;
    }
    
    return isValid;
}

function processPayment(formData) {
    // Mostrar modal de seguridad
    Modal.show('securityModal');
    
    // Simular procesamiento de pago
    setTimeout(() => {
        // Ocultar modal de seguridad
        Modal.hide('securityModal');
        
        // Simular éxito del pago
        const paymentSuccess = Math.random() > 0.1; // 90% de éxito
        
        if (paymentSuccess) {
            // Pago exitoso
            completePayment(formData);
        } else {
            // Pago fallido
            handlePaymentError();
        }
    }, 3000);
}

function completePayment(formData) {
    // Crear confirmación de pago
    const paymentConfirmation = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        monto: window.currentTotal,
        metodo: 'Tarjeta de Crédito',
        numero: formData.cardNumber.replace(/\s/g, '').substr(-4),
        email: formData.email,
        telefono: formData.phone,
        estado: 'confirmado'
    };
    
    // Guardar confirmación
    const confirmaciones = Storage.load('payment_confirmations') || [];
    confirmaciones.push(paymentConfirmation);
    Storage.save('payment_confirmations', confirmaciones);
    
    // Actualizar reservas del usuario
    updateUserReservas(paymentConfirmation);
    
    // Mostrar confirmación
    showPaymentConfirmation(paymentConfirmation);
    
    // Ir al paso 3
    nextStep(3);
}

function updateUserReservas(paymentConfirmation) {
    const reservas = Storage.load('user_reservas') || [];
    const reservaPendiente = reservas.find(r => r.estado === 'pendiente');
    
    if (reservaPendiente) {
        reservaPendiente.estado = 'confirmada';
        reservaPendiente.fechaConfirmacion = paymentConfirmation.fecha;
        reservaPendiente.paymentId = paymentConfirmation.id;
        
        Storage.save('user_reservas', reservas);
    }
}

function showPaymentConfirmation(paymentConfirmation) {
    const confirmationDetails = document.getElementById('confirmationDetails');
    
    if (confirmationDetails) {
        confirmationDetails.innerHTML = `
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Número de Confirmación:</span>
                <span class="confirmation-detail-value">#${paymentConfirmation.id}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Fecha de Pago:</span>
                <span class="confirmation-detail-value">${DateUtils.format(paymentConfirmation.fecha)}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Monto Pagado:</span>
                <span class="confirmation-detail-value">$${paymentConfirmation.monto}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Método de Pago:</span>
                <span class="confirmation-detail-value">${paymentConfirmation.metodo} ****${paymentConfirmation.numero}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Email de Confirmación:</span>
                <span class="confirmation-detail-value">${paymentConfirmation.email}</span>
            </div>
            <div class="confirmation-detail">
                <span class="confirmation-detail-label">Estado:</span>
                <span class="confirmation-detail-value" style="color: #28a745; font-weight: 600;">${paymentConfirmation.estado.toUpperCase()}</span>
            </div>
        `;
    }
}

function handlePaymentError() {
    Notification.error('Error al procesar el pago. Por favor, intenta nuevamente.');
}

function downloadVoucher() {
    // Simular descarga de voucher
    Notification.info('Descargando voucher...');
    
    setTimeout(() => {
        Notification.success('Voucher descargado exitosamente');
    }, 2000);
}

function goToDashboard() {
    const user = UserManager.getCurrentUser();
    if (user) {
        Navigation.goToDashboard();
    } else {
        Navigation.goTo('login.html');
    }
}

// Funciones de utilidad
function resetPaymentForm() {
    FormUtils.clearForm('paymentForm');
    
    // Limpiar estilos de validación
    const inputs = document.querySelectorAll('#paymentForm input');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
}

// Exportar funciones para uso global
window.nextStep = nextStep;
window.prevStep = prevStep;
window.downloadVoucher = downloadVoucher;
window.goToDashboard = goToDashboard;
window.resetPaymentForm = resetPaymentForm;
