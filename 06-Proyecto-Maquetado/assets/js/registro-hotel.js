// JavaScript específico para el registro de hoteles

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de registro de hotel
    initRegistroHotelPage();
    
    // Configurar eventos
    setupRegistroHotelEvents();
});

function initRegistroHotelPage() {
    console.log('Inicializando página de registro de hotel...');
    
    // Configurar validación en tiempo real
    setupFormValidation();
}

function setupRegistroHotelEvents() {
    // Evento del formulario de registro
    const registroForm = document.getElementById('registroHotelForm');
    if (registroForm) {
        registroForm.addEventListener('submit', handleRegistroHotel);
    }
    
    // Eventos de validación en tiempo real
    const inputs = registroForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function setupFormValidation() {
    // Configurar validación específica para campos de hotel
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('input', validateEmailField);
    }
    
    const telefonoField = document.getElementById('telefono');
    if (telefonoField) {
        telefonoField.addEventListener('input', validatePhoneField);
    }
    
    const sitioWebField = document.getElementById('sitio_web');
    if (sitioWebField) {
        sitioWebField.addEventListener('input', validateUrlField);
    }
    
    const habitacionesField = document.getElementById('habitaciones');
    if (habitacionesField) {
        habitacionesField.addEventListener('input', validateNumberField);
    }
    
    const precioField = document.getElementById('precio_noche');
    if (precioField) {
        precioField.addEventListener('input', validateNumberField);
    }
}

function handleRegistroHotel(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('registroHotelForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Validar datos del formulario
    if (!validateRegistroData(formData)) {
        return;
    }
    
    // Procesar registro
    processRegistroHotel(formData);
}

function validateRegistroData(data) {
    let isValid = true;
    
    // Validar campos requeridos
    const requiredFields = [
        'nombre', 'categoria', 'descripcion', 'pais', 'estado', 'ciudad', 
        'direccion', 'telefono', 'email', 'habitaciones', 'precio_noche',
        'propietario_nombre', 'propietario_telefono', 'propietario_email'
    ];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, 'Este campo es requerido');
            isValid = false;
        }
    });
    
    // Validar email
    if (data.email && !FormUtils.validateEmail(data.email)) {
        showFieldError('email', 'Email inválido');
        isValid = false;
    }
    
    // Validar email del propietario
    if (data.propietario_email && !FormUtils.validateEmail(data.propietario_email)) {
        showFieldError('propietario_email', 'Email del propietario inválido');
        isValid = false;
    }
    
    // Validar teléfono
    if (data.telefono && !FormUtils.validatePhone(data.telefono)) {
        showFieldError('telefono', 'Teléfono inválido');
        isValid = false;
    }
    
    // Validar teléfono del propietario
    if (data.propietario_telefono && !FormUtils.validatePhone(data.propietario_telefono)) {
        showFieldError('propietario_telefono', 'Teléfono del propietario inválido');
        isValid = false;
    }
    
    // Validar sitio web si se proporciona
    if (data.sitio_web && !validateUrl(data.sitio_web)) {
        showFieldError('sitio_web', 'URL inválida');
        isValid = false;
    }
    
    // Validar números
    if (data.habitaciones && (isNaN(data.habitaciones) || data.habitaciones < 1)) {
        showFieldError('habitaciones', 'Número de habitaciones inválido');
        isValid = false;
    }
    
    if (data.precio_noche && (isNaN(data.precio_noche) || data.precio_noche < 1)) {
        showFieldError('precio_noche', 'Precio inválido');
        isValid = false;
    }
    
    // Validar términos y condiciones
    if (!data.terminos) {
        Notification.error('Debes aceptar los términos y condiciones');
        isValid = false;
    }
    
    if (!data.privacidad) {
        Notification.error('Debes aceptar la política de privacidad');
        isValid = false;
    }
    
    return isValid;
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function processRegistroHotel(formData) {
    // Mostrar estado de carga
    const submitBtn = document.querySelector('#registroHotelForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    // Simular delay de registro
    setTimeout(() => {
        // Crear nuevo hotel
        const nuevoHotel = createHotelFromForm(formData);
        
        // Guardar en localStorage
        const hoteles = Storage.load('hoteles') || [];
        hoteles.push(nuevoHotel);
        Storage.save('hoteles', hoteles);
        
        // Crear usuario del hotel
        const usuarioHotel = {
            id: Date.now(),
            name: formData.nombre,
            email: formData.email,
            role: UserManager.roles.HOTEL,
            avatar: '🏨',
            hotelId: nuevoHotel.id,
            status: 'pending_verification',
            registrationDate: new Date().toISOString()
        };
        
        // Guardar usuario
        const usuarios = Storage.load('registered_users') || [];
        usuarios.push(usuarioHotel);
        Storage.save('registered_users', usuarios);
        
        // Mostrar mensaje de éxito
        Notification.success('¡Hotel registrado exitosamente! Tu cuenta está pendiente de verificación.');
        
        // Limpiar formulario
        FormUtils.clearForm('registroHotelForm');
        
        // Restaurar botón
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
        
        // Redirigir al login después de un delay
        setTimeout(() => {
            Navigation.goTo('login.html');
        }, 2000);
        
    }, 3000);
}

function createHotelFromForm(formData) {
    // Obtener servicios seleccionados
    const servicios = Array.isArray(formData.servicios) ? formData.servicios : [formData.servicios].filter(Boolean);
    
    return {
        id: Date.now(),
        nombre: formData.nombre,
        estrellas: parseInt(formData.categoria),
        descripcion: formData.descripcion,
        pais: formData.pais,
        estado: formData.estado,
        ciudad: formData.ciudad,
        direccion: formData.direccion,
        ubicacion: `${formData.ciudad}, ${formData.estado}`,
        telefono: formData.telefono,
        email: formData.email,
        sitio_web: formData.sitio_web || null,
        habitaciones: parseInt(formData.habitaciones),
        precio_noche: parseInt(formData.precio_noche),
        servicios: servicios,
        propietario: {
            nombre: formData.propietario_nombre,
            telefono: formData.propietario_telefono,
            email: formData.propietario_email
        },
        imagen: '🏨',
        activo: true,
        verificado: false,
        calificacion: 0,
        fecha_registro: new Date().toISOString()
    };
}

// Validaciones en tiempo real
function validateEmailField(event) {
    const field = event.target;
    const email = field.value;
    
    if (email && !FormUtils.validateEmail(email)) {
        field.style.borderColor = '#dc3545';
        showFieldError(field.id, 'Email inválido');
    } else if (email) {
        field.style.borderColor = '#28a745';
        hideFieldError(field.id);
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function validatePhoneField(event) {
    const field = event.target;
    const phone = field.value;
    
    if (phone && !FormUtils.validatePhone(phone)) {
        field.style.borderColor = '#dc3545';
        showFieldError(field.id, 'Teléfono inválido');
    } else if (phone) {
        field.style.borderColor = '#28a745';
        hideFieldError(field.id);
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function validateUrlField(event) {
    const field = event.target;
    const url = field.value;
    
    if (url && !validateUrl(url)) {
        field.style.borderColor = '#dc3545';
        showFieldError(field.id, 'URL inválida');
    } else if (url) {
        field.style.borderColor = '#28a745';
        hideFieldError(field.id);
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function validateNumberField(event) {
    const field = event.target;
    const value = parseInt(field.value);
    
    if (field.value && (isNaN(value) || value < 1)) {
        field.style.borderColor = '#dc3545';
        showFieldError(field.id, 'Número inválido');
    } else if (field.value) {
        field.style.borderColor = '#28a745';
        hideFieldError(field.id);
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#dc3545';
        showFieldError(field.id, 'Este campo es requerido');
    } else if (value) {
        field.style.borderColor = '#28a745';
        hideFieldError(field.id);
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function clearFieldError(event) {
    const field = event.target;
    if (field.style.borderColor === 'rgb(220, 53, 69)') {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field.id);
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remover error anterior
    hideFieldError(fieldId);
    
    // Crear elemento de error
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.id = `error-${fieldId}`;
    
    // Insertar después del campo
    field.parentNode.insertBefore(error, field.nextSibling);
}

function hideFieldError(fieldId) {
    const error = document.getElementById(`error-${fieldId}`);
    if (error) {
        error.remove();
    }
}

function showTerminos() {
    Modal.show('terminosModal');
}

function showPrivacidad() {
    Modal.show('privacidadModal');
}

// Funciones de utilidad
function resetForm() {
    FormUtils.clearForm('registroHotelForm');
    
    // Limpiar estilos de validación
    const inputs = document.querySelectorAll('#registroHotelForm input, #registroHotelForm select, #registroHotelForm textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#e9ecef';
        hideFieldError(input.id);
    });
}

function saveDraft() {
    const formData = FormUtils.getFormData('registroHotelForm');
    Storage.save('hotel_draft', formData);
    Notification.info('Borrador guardado');
}

function loadDraft() {
    const draft = Storage.load('hotel_draft');
    if (draft) {
        // Cargar datos del borrador
        Object.keys(draft).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = draft[key];
                } else {
                    field.value = draft[key];
                }
            }
        });
        Notification.info('Borrador cargado');
    }
}

// Exportar funciones para uso global
window.showTerminos = showTerminos;
window.showPrivacidad = showPrivacidad;
window.resetForm = resetForm;
window.saveDraft = saveDraft;
window.loadDraft = loadDraft;
