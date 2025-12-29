// JavaScript específico para el registro de actividades

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar formulario de registro de actividades
    initRegistroActividades();
    
    // Configurar eventos
    setupRegistroActividadesEvents();
});

function initRegistroActividades() {
    console.log('Inicializando registro de actividades...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para registrar actividades');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.ACTIVIDADES) {
        Notification.error('No tienes permisos para registrar actividades');
        Navigation.goToDashboard();
        return;
    }
    
    // Cargar datos existentes si es edición
    loadExistingActividadData();
}

function setupRegistroActividadesEvents() {
    // Configurar eventos del formulario
    const form = document.getElementById('registroActividadesForm');
    if (form) {
        form.addEventListener('submit', handleRegistroActividadesSubmit);
    }
    
    // Configurar validaciones en tiempo real
    setupRealTimeValidation();
}

function setupRealTimeValidation() {
    // Validación de precio
    const precioInput = document.getElementById('precioActividad');
    if (precioInput) {
        precioInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value < 0) {
                this.value = 0;
            }
        });
    }
    
    // Validación de participantes
    const minParticipantes = document.getElementById('minParticipantes');
    const maxParticipantes = document.getElementById('maxParticipantes');
    
    if (minParticipantes && maxParticipantes) {
        minParticipantes.addEventListener('input', function() {
            const min = parseInt(this.value) || 1;
            const max = parseInt(maxParticipantes.value) || 1;
            
            if (min > max) {
                maxParticipantes.value = min;
            }
        });
        
        maxParticipantes.addEventListener('input', function() {
            const min = parseInt(minParticipantes.value) || 1;
            const max = parseInt(this.value) || 1;
            
            if (max < min) {
                this.value = min;
            }
        });
    }
}

function loadExistingActividadData() {
    // Cargar datos existentes si estamos editando
    const actividades = Storage.load('actividades') || [];
    const user = UserManager.getCurrentUser();
    
    if (user && user.id) {
        const actividadExistente = actividades.find(a => a.propietarioId === user.id);
        
        if (actividadExistente) {
            populateFormWithExistingData(actividadExistente);
        }
    }
}

function populateFormWithExistingData(actividad) {
    // Llenar el formulario con datos existentes
    const form = document.getElementById('registroActividadesForm');
    if (!form) return;
    
    // Información básica
    setFormValue('nombreActividad', actividad.nombre);
    setFormValue('tipoActividad', actividad.tipo);
    setFormValue('descripcionActividad', actividad.descripcion);
    setFormValue('ubicacionActividad', actividad.ubicacion);
    
    // Detalles
    setFormValue('duracionActividad', actividad.duracion);
    setFormValue('precioActividad', actividad.precio);
    setFormValue('minParticipantes', actividad.minParticipantes);
    setFormValue('maxParticipantes', actividad.maxParticipantes);
    setFormValue('incluyeActividad', actividad.incluye);
    setFormValue('requisitosActividad', actividad.requisitos);
    
    // Horarios
    setFormValue('horariosActividad', actividad.horarios);
    setFormValue('temporadaActividad', actividad.temporada);
    
    // Idiomas
    if (actividad.idiomas) {
        actividad.idiomas.forEach(idioma => {
            const checkbox = form.querySelector(`input[name="idiomas"][value="${idioma}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Información de contacto
    setFormValue('nombreGuia', actividad.nombreGuia);
    setFormValue('telefonoActividad', actividad.telefono);
    setFormValue('emailActividad', actividad.email);
    setFormValue('experienciaActividad', actividad.experiencia);
}

function setFormValue(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.value = value;
    }
}

function handleRegistroActividadesSubmit(event) {
    event.preventDefault();
    
    console.log('Procesando registro de actividades...');
    
    // Validar formulario
    if (!validateRegistroActividadesForm()) {
        return;
    }
    
    // Obtener datos del formulario
    const formData = getFormData();
    
    // Procesar registro
    processRegistroActividades(formData);
}

function validateRegistroActividadesForm() {
    const form = document.getElementById('registroActividadesForm');
    if (!form) return false;
    
    // Validar campos requeridos
    const requiredFields = [
        'nombreActividad', 'tipoActividad', 'descripcionActividad', 
        'ubicacionActividad', 'duracionActividad', 'precioActividad',
        'horariosActividad', 'nombreGuia', 'telefonoActividad', 'emailActividad'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            Notification.error(`El campo ${fieldId.replace('Actividad', '')} es requerido`);
            field.focus();
            return false;
        }
    }
    
    // Validar términos y condiciones
    const terminos = document.getElementById('terminosActividad');
    if (!terminos || !terminos.checked) {
        Notification.error('Debes aceptar los términos y condiciones');
        return false;
    }
    
    // Validar precio
    const precio = parseFloat(document.getElementById('precioActividad').value);
    if (precio < 0) {
        Notification.error('El precio no puede ser negativo');
        return false;
    }
    
    // Validar participantes
    const minParticipantes = parseInt(document.getElementById('minParticipantes').value) || 1;
    const maxParticipantes = parseInt(document.getElementById('maxParticipantes').value) || 1;
    
    if (minParticipantes > maxParticipantes) {
        Notification.error('El mínimo de participantes no puede ser mayor al máximo');
        return false;
    }
    
    return true;
}

function getFormData() {
    const form = document.getElementById('registroActividadesForm');
    if (!form) return {};
    
    // Obtener datos básicos
    const formData = {
        nombre: form.nombre.value,
        tipo: form.tipo.value,
        descripcion: form.descripcion.value,
        ubicacion: form.ubicacion.value,
        duracion: form.duracion.value,
        precio: parseFloat(form.precio.value),
        minParticipantes: parseInt(form.minParticipantes.value) || 1,
        maxParticipantes: parseInt(form.maxParticipantes.value) || 20,
        incluye: form.incluye.value,
        requisitos: form.requisitos.value,
        horarios: form.horarios.value,
        temporada: form.temporada.value,
        nombreGuia: form.nombreGuia.value,
        telefono: form.telefono.value,
        email: form.email.value,
        experiencia: parseInt(form.experiencia.value) || 0
    };
    
    // Obtener idiomas seleccionados
    const idiomasCheckboxes = form.querySelectorAll('input[name="idiomas"]:checked');
    formData.idiomas = Array.from(idiomasCheckboxes).map(cb => cb.value);
    
    // Obtener términos y verificación
    formData.terminos = form.terminos.checked;
    formData.verificacion = form.verificacion.checked;
    
    return formData;
}

function processRegistroActividades(formData) {
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Usuario no autenticado');
        return;
    }
    
    // Crear objeto de actividad
    const actividad = {
        id: generateActividadId(),
        propietarioId: user.id,
        propietarioNombre: user.name,
        ...formData,
        activo: true,
        verificado: false,
        fechaRegistro: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        imagen: '🎯' // Emoji por defecto
    };
    
    // Guardar actividad
    saveActividad(actividad);
    
    // Mostrar mensaje de éxito
    Notification.success('Actividad registrada exitosamente');
    
    // Redirigir al dashboard
    setTimeout(() => {
        Navigation.goTo('dashboard-actividades.html');
    }, 1500);
}

function generateActividadId() {
    return 'ACT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function saveActividad(actividad) {
    // Obtener actividades existentes
    const actividades = Storage.load('actividades') || [];
    
    // Verificar si ya existe una actividad del mismo propietario
    const existingIndex = actividades.findIndex(a => a.propietarioId === actividad.propietarioId);
    
    if (existingIndex >= 0) {
        // Actualizar actividad existente
        actividades[existingIndex] = actividad;
    } else {
        // Agregar nueva actividad
        actividades.push(actividad);
    }
    
    // Guardar en localStorage
    Storage.save('actividades', actividades);
    
    console.log('Actividad guardada:', actividad);
}

function showTerminos() {
    Modal.show('terminosModal');
}

function cancelarRegistro() {
    if (confirm('¿Estás seguro de que quieres cancelar el registro? Se perderán los datos ingresados.')) {
        Navigation.goTo('dashboard-actividades.html');
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
