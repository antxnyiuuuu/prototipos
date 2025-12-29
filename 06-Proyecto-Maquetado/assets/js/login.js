// JavaScript específico para la página de login

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página de login
    initLoginPage();
    
    // Configurar eventos
    setupLoginEvents();
});

function initLoginPage() {
    console.log('Inicializando página de login...');
    
    // Verificar si ya hay usuario logueado
    const user = UserManager.getCurrentUser();
    if (user) {
        // Mostrar opción de cambiar usuario
        showUserAlreadyLoggedIn(user);
    }
    
    // Configurar formulario
    setupLoginForm();
}

function showUserAlreadyLoggedIn(user) {
    // Mostrar mensaje informativo
    Notification.info(`Actualmente logueado como: ${user.name} (${user.role})`);
    
    // Agregar botón para cambiar usuario
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        const changeUserDiv = document.createElement('div');
        changeUserDiv.className = 'change-user-section';
        changeUserDiv.innerHTML = `
            <div class="current-user-info">
                <p>Usuario actual: <strong>${user.name}</strong></p>
                <p>Rol: <strong>${user.role}</strong></p>
            </div>
            <div class="change-user-actions">
                <button class="btn btn-secondary" onclick="goToDashboard()">
                    Ir al Dashboard
                </button>
                <button class="btn btn-primary" onclick="changeUser()">
                    Cambiar Usuario
                </button>
            </div>
        `;
        
        // Insertar al principio del contenedor
        loginContainer.insertBefore(changeUserDiv, loginContainer.firstChild);
    }
}

function setupLoginEvents() {
    // Evento del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Evento del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Eventos de los campos del formulario
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const roleField = document.getElementById('role');
    
    if (emailField) {
        emailField.addEventListener('input', validateEmailField);
    }
    
    if (passwordField) {
        passwordField.addEventListener('input', validatePasswordField);
    }
    
    if (roleField) {
        roleField.addEventListener('change', validateRoleField);
    }
}

function setupLoginForm() {
    // Configurar validación en tiempo real
    const form = document.getElementById('loginForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
        });
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('loginForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Validar datos
    if (!validateLoginData(formData)) {
        return;
    }
    
    // Simular proceso de login
    performLogin(formData);
}

function validateLoginData(data) {
    // Validar email
    if (!FormUtils.validateEmail(data.email)) {
        Notification.error('Por favor, ingresa un email válido');
        return false;
    }
    
    // Validar contraseña
    if (data.password.length < 6) {
        Notification.error('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    // Validar rol
    if (!data.role) {
        Notification.error('Por favor, selecciona un tipo de usuario');
        return false;
    }
    
    return true;
}

function performLogin(formData) {
    // Mostrar estado de carga
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    // Simular delay de login
    setTimeout(() => {
        // Crear usuario basado en el rol seleccionado
        const user = createUserFromForm(formData);
        
        // Guardar usuario en localStorage
        UserManager.currentUser = user;
        Storage.save('current_user', user);
        
        // Mostrar mensaje de éxito
        Notification.success(`¡Bienvenido ${user.name}!`);
        
        // Redirigir al dashboard
        setTimeout(() => {
            Navigation.goToDashboard();
        }, 1000);
        
    }, 1500);
}

function createUserFromForm(formData) {
    const role = formData.role;
    const baseUser = {
        id: Date.now(),
        email: formData.email,
        role: role,
        loginTime: new Date().toISOString()
    };
    
    // Personalizar según el rol
    switch(role) {
        case 'usuario':
            return {
                ...baseUser,
                name: 'Usuario',
                avatar: '👤',
                permissions: ['view_destinations', 'book_services', 'view_promotions']
            };
        case 'admin':
            return {
                ...baseUser,
                name: 'Administrador',
                avatar: '👨‍💼',
                permissions: ['manage_all', 'approve_registrations', 'view_analytics']
            };
        case 'hotel':
            return {
                ...baseUser,
                name: 'Hotel Manager',
                avatar: '🏨',
                permissions: ['manage_hotel', 'view_bookings', 'update_services']
            };
        case 'restaurante':
            return {
                ...baseUser,
                name: 'Restaurante Manager',
                avatar: '🍽️',
                permissions: ['manage_restaurant', 'view_reservations', 'update_menu']
            };
        case 'actividades':
            return {
                ...baseUser,
                name: 'Actividades Manager',
                avatar: '🎯',
                permissions: ['manage_activities', 'view_bookings', 'update_schedule']
            };
        default:
            return baseUser;
    }
}

function quickLogin(role) {
    console.log(`Login rápido como: ${role}`);
    
    // Mostrar notificación
    Notification.info(`Iniciando sesión como ${role}...`);
    
    // Realizar login rápido
    const user = UserManager.quickLogin(role);
    
    if (user) {
        // Actualizar formulario con datos del usuario
        updateFormWithUserData(user);
        
        // Mostrar mensaje de éxito
        Notification.success(`¡Bienvenido ${user.name}!`);
        
        // Redirigir al dashboard
        setTimeout(() => {
            Navigation.goToDashboard();
        }, 1000);
    } else {
        Notification.error('Error en el login rápido');
    }
}

function updateFormWithUserData(user) {
    const emailField = document.getElementById('email');
    const roleField = document.getElementById('role');
    
    if (emailField) {
        emailField.value = user.email;
    }
    
    if (roleField) {
        roleField.value = user.role;
    }
}

function showRegisterModal(role) {
    const modal = document.getElementById('registerModal');
    const title = document.getElementById('registerModalTitle');
    const roleField = document.getElementById('regRole');
    
    if (modal && title && roleField) {
        // Actualizar título del modal
        const roleNames = {
            'hotel': 'Registrar Hotel',
            'restaurante': 'Registrar Restaurante',
            'actividades': 'Registrar Actividades'
        };
        
        title.textContent = roleNames[role] || 'Registro';
        roleField.value = role;
        
        // Mostrar modal
        Modal.show('registerModal');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const formData = FormUtils.getFormData('registerForm');
    if (!formData) {
        Notification.error('Error al obtener datos del formulario');
        return;
    }
    
    // Validar datos
    if (!validateRegisterData(formData)) {
        return;
    }
    
    // Procesar registro
    processRegister(formData);
}

function validateRegisterData(data) {
    // Validar nombre
    if (!data.name || data.name.trim().length < 2) {
        Notification.error('El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    // Validar email
    if (!FormUtils.validateEmail(data.email)) {
        Notification.error('Por favor, ingresa un email válido');
        return false;
    }
    
    // Validar teléfono
    if (!FormUtils.validatePhone(data.phone)) {
        Notification.error('Por favor, ingresa un teléfono válido');
        return false;
    }
    
    // Validar ubicación
    if (!data.location || data.location.trim().length < 2) {
        Notification.error('La ubicación debe tener al menos 2 caracteres');
        return false;
    }
    
    // Validar contraseña
    if (data.password.length < 6) {
        Notification.error('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    return true;
}

function processRegister(formData) {
    // Mostrar estado de carga
    const submitBtn = document.querySelector('#registerForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
    
    // Simular delay de registro
    setTimeout(() => {
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            role: formData.role,
            avatar: getAvatarForRole(formData.role),
            status: 'pending_verification',
            registrationDate: new Date().toISOString()
        };
        
        // Guardar en localStorage
        const users = Storage.load('registered_users') || [];
        users.push(newUser);
        Storage.save('registered_users', users);
        
        // Mostrar mensaje de éxito
        Notification.success('¡Registro exitoso! Tu cuenta está pendiente de verificación.');
        
        // Cerrar modal
        Modal.hide('registerModal');
        
        // Limpiar formulario
        FormUtils.clearForm('registerForm');
        
        // Restaurar botón
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
        
    }, 2000);
}

function getAvatarForRole(role) {
    const avatars = {
        'hotel': '🏨',
        'restaurante': '🍽️',
        'actividades': '🎯'
    };
    return avatars[role] || '👤';
}

// Validaciones en tiempo real
function validateEmailField(event) {
    const field = event.target;
    const email = field.value;
    
    if (email && !FormUtils.validateEmail(email)) {
        field.style.borderColor = '#dc3545';
        showFieldError(field, 'Email inválido');
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field);
    }
}

function validatePasswordField(event) {
    const field = event.target;
    const password = field.value;
    
    if (password && password.length < 6) {
        field.style.borderColor = '#dc3545';
        showFieldError(field, 'Mínimo 6 caracteres');
    } else {
        field.style.borderColor = '#e9ecef';
        hideFieldError(field);
    }
}

function validateRoleField(event) {
    const field = event.target;
    const role = field.value;
    
    if (!role) {
        field.style.borderColor = '#dc3545';
    } else {
        field.style.borderColor = '#e9ecef';
    }
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#dc3545';
    } else {
        field.style.borderColor = '#e9ecef';
    }
}

function showFieldError(field, message) {
    // Remover error anterior
    hideFieldError(field);
    
    // Crear elemento de error
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.color = '#dc3545';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    
    // Insertar después del campo
    field.parentNode.insertBefore(error, field.nextSibling);
}

function hideFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

function goToDashboard() {
    Navigation.goToDashboard();
}

function changeUser() {
    // Limpiar sesión completamente
    UserManager.clearSession();
    
    // Recargar la página para mostrar el formulario de login
    window.location.reload();
}

// Exportar funciones para uso global
window.handleLogin = handleLogin;
window.quickLogin = quickLogin;
window.showRegisterModal = showRegisterModal;
window.goToDashboard = goToDashboard;
window.changeUser = changeUser;
