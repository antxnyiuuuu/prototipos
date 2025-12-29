// JavaScript específico para el registro de restaurantes

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de registro de restaurantes
    initRegistroRestaurante();
    
    // Configurar eventos
    setupRegistroRestauranteEvents();
});

function initRegistroRestaurante() {
    console.log('Inicializando registro de restaurante...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para registrar restaurantes');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.RESTAURANT) {
        Notification.error('No tienes permisos para registrar restaurantes');
        Navigation.goToDashboard();
        return;
    }
    
    // Cargar datos existentes si es edición
    loadExistingRestauranteData();
}

function setupRegistroRestauranteEvents() {
    // Configurar eventos del formulario
    const form = document.getElementById('registroRestauranteForm');
    if (form) {
        form.addEventListener('submit', handleRegistroRestauranteSubmit);
    }
    
    // Configurar validaciones en tiempo real
    setupRealTimeValidation();
}

function setupRealTimeValidation() {
    // Validación de capacidad
    const capacidadInput = document.getElementById('capacidadRestaurante');
    if (capacidadInput) {
        capacidadInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 1) {
                this.value = 1;
            }
        });
    }
    
    // Validación de experiencia
    const experienciaInput = document.getElementById('experienciaRestaurante');
    if (experienciaInput) {
        experienciaInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 0) {
                this.value = 0;
            }
        });
    }
}

function loadExistingRestauranteData() {
    // Cargar datos existentes si estamos editando
    const restaurantes = Storage.load('restaurantes') || [];
    const user = UserManager.getCurrentUser();
    
    if (user && user.id) {
        const restauranteExistente = restaurantes.find(r => r.propietarioId === user.id);
        
        if (restauranteExistente) {
            populateFormWithExistingData(restauranteExistente);
        }
    }
}

function populateFormWithExistingData(restaurante) {
    // Llenar el formulario con datos existentes
    const form = document.getElementById('registroRestauranteForm');
    if (!form) return;
    
    // Información básica
    setFormValue('nombreRestaurante', restaurante.nombre);
    setFormValue('tipoRestaurante', restaurante.tipo);
    setFormValue('descripcionRestaurante', restaurante.descripcion);
    setFormValue('ubicacionRestaurante', restaurante.ubicacion);
    
    // Detalles
    setFormValue('capacidadRestaurante', restaurante.capacidad);
    setFormValue('precioRangoRestaurante', restaurante.precio_rango);
    setFormValue('especialidadesRestaurante', restaurante.especialidades);
    
    // Servicios
    if (restaurante.servicios) {
        restaurante.servicios.forEach(servicio => {
            const checkbox = form.querySelector(`input[name="servicios"][value="${servicio}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Horarios
    setFormValue('horariosRestaurante', restaurante.horarios);
    
    // Días de descanso
    if (restaurante.dias_descanso) {
        restaurante.dias_descanso.forEach(dia => {
            const checkbox = form.querySelector(`input[name="dias_descanso"][value="${dia}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Información de contacto
    setFormValue('nombrePropietario', restaurante.nombrePropietario);
    setFormValue('telefonoRestaurante', restaurante.telefono);
    setFormValue('emailRestaurante', restaurante.email);
    setFormValue('experienciaRestaurante', restaurante.experiencia);
}

function setFormValue(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.value = value;
    }
}

function handleRegistroRestauranteSubmit(event) {
    event.preventDefault();
    
    console.log('Procesando registro de restaurante...');
    
    // Validar formulario
    if (!validateRegistroRestauranteForm()) {
        return;
    }
    
    // Obtener datos del formulario
    const formData = getFormData();
    
    // Procesar registro
    processRegistroRestaurante(formData);
}

function validateRegistroRestauranteForm() {
    const form = document.getElementById('registroRestauranteForm');
    if (!form) return false;
    
    // Validar campos requeridos
    const requiredFields = [
        'nombreRestaurante', 'tipoRestaurante', 'descripcionRestaurante', 
        'ubicacionRestaurante', 'capacidadRestaurante', 'precioRangoRestaurante',
        'horariosRestaurante', 'nombrePropietario', 'telefonoRestaurante', 'emailRestaurante'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            Notification.error(`El campo ${fieldId.replace('Restaurante', '')} es requerido`);
            field.focus();
            return false;
        }
    }
    
    // Validar términos y condiciones
    const terminos = document.getElementById('terminosRestaurante');
    if (!terminos || !terminos.checked) {
        Notification.error('Debes aceptar los términos y condiciones');
        return false;
    }
    
    // Validar capacidad
    const capacidad = parseInt(document.getElementById('capacidadRestaurante').value);
    if (capacidad < 1) {
        Notification.error('La capacidad debe ser al menos 1');
        return false;
    }
    
    // Validar email
    const email = document.getElementById('emailRestaurante').value;
    if (!isValidEmail(email)) {
        Notification.error('Ingresa un email válido');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getFormData() {
    const form = document.getElementById('registroRestauranteForm');
    if (!form) return {};
    
    // Obtener datos básicos
    const formData = {
        nombre: form.nombre.value,
        tipo: form.tipo.value,
        descripcion: form.descripcion.value,
        ubicacion: form.ubicacion.value,
        capacidad: parseInt(form.capacidad.value),
        precio_rango: form.precio_rango.value,
        especialidades: form.especialidades.value,
        horarios: form.horarios.value,
        nombrePropietario: form.nombrePropietario.value,
        telefono: form.telefono.value,
        email: form.email.value,
        experiencia: parseInt(form.experiencia.value) || 0
    };
    
    // Obtener servicios seleccionados
    const serviciosCheckboxes = form.querySelectorAll('input[name="servicios"]:checked');
    formData.servicios = Array.from(serviciosCheckboxes).map(cb => cb.value);
    
    // Obtener días de descanso seleccionados
    const diasDescansoCheckboxes = form.querySelectorAll('input[name="dias_descanso"]:checked');
    formData.dias_descanso = Array.from(diasDescansoCheckboxes).map(cb => cb.value);
    
    // Obtener términos y verificación
    formData.terminos = form.terminos.checked;
    formData.verificacion = form.verificacion.checked;
    
    return formData;
}

function processRegistroRestaurante(formData) {
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Usuario no autenticado');
        return;
    }
    
    // Crear objeto de restaurante
    const restaurante = {
        id: generateRestauranteId(),
        propietarioId: user.id,
        propietarioNombre: user.name,
        ...formData,
        activo: true,
        verificado: false,
        fechaRegistro: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        imagen: '🍽️' // Emoji por defecto
    };
    
    // Guardar restaurante
    saveRestaurante(restaurante);
    
    // Mostrar mensaje de éxito
    Notification.success('Restaurante registrado exitosamente');
    
    // Redirigir al dashboard
    setTimeout(() => {
        Navigation.goTo('dashboard-restaurante.html');
    }, 1500);
}

function generateRestauranteId() {
    return 'RES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function saveRestaurante(restaurante) {
    // Obtener restaurantes existentes
    const restaurantes = Storage.load('restaurantes') || [];
    
    // Verificar si ya existe un restaurante del mismo propietario
    const existingIndex = restaurantes.findIndex(r => r.propietarioId === restaurante.propietarioId);
    
    if (existingIndex >= 0) {
        // Actualizar restaurante existente
        restaurantes[existingIndex] = restaurante;
    } else {
        // Agregar nuevo restaurante
        restaurantes.push(restaurante);
    }
    
    // Guardar en localStorage
    Storage.save('restaurantes', restaurantes);
    
    console.log('Restaurante guardado:', restaurante);
}

function showTerminos() {
    Modal.show('terminosModal');
}

function cancelarRegistro() {
    if (confirm('¿Estás seguro de que quieres cancelar el registro? Se perderán los datos ingresados.')) {
        Navigation.goTo('dashboard-restaurante.html');
    }
}

function logout() {
    // Confirmar logout
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        UserManager.logout();
        Notification.success('Sesión cerrada exitosamente');
        Navigation.goTo('login.html');
    }
}

// Exportar funciones para uso global
window.showTerminos = showTerminos;
window.cancelarRegistro = cancelarRegistro;
window.logout = logout;
