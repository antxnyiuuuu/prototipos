// Funcionalidades específicas de la página de login
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
    initRegisterButton();
    initAdminAccess();
});

// Inicializar formulario de login
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Validación en tiempo real
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Inicializar botón de registro
function initRegisterButton() {
    const registerBtn = document.getElementById('registerBtn');
    if (!registerBtn) return;
    
    registerBtn.addEventListener('click', function() {
        showRegistrationModal();
    });
}

// Inicializar acceso de administrador
function initAdminAccess() {
    const adminBtn = document.querySelector('.admin-section .btn');
    if (!adminBtn) return;
    
    
    adminBtn.addEventListener('click', function(e) {
        // Simular verificación de credenciales de administrador
        e.preventDefault();
        showAdminLoginModal();
    });
}

// Manejar login
async function handleLogin() {
    const form = document.getElementById('loginForm');
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const remember = form.querySelector('input[name="remember"]').checked;
    
    // Validar formulario
    if (!validateLoginForm(form)) {
        return;
    }
    
    try {
        // Simular proceso de login
        showLoadingState(form);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular verificación de credenciales
        if (isValidLogin(email, password)) {
            // Login exitoso
            const userData = {
                email: email,
                name: getUserName(email),
                role: getUserRole(email),
                loginTime: new Date().toISOString(),
                remember: remember
            };
            
            // Guardar datos de sesión
            saveUserSession(userData);
            
            // Actualizar visibilidad del menú de perfil si está disponible
            if (window.ProfileMenuManager && window.ProfileMenuManager.updateProfileMenuVisibility) {
                window.ProfileMenuManager.updateProfileMenuVisibility();
            }
            
            // Mostrar mensaje de éxito
            showNotification('¡Login exitoso! Redirigiendo...', 'success');
            
            // Redirigir según el rol
            setTimeout(() => {
                if (userData.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'usuario.html';
                }
            }, 1500);
            
        } else {
            // Credenciales inválidas
            showNotification('Email o contraseña incorrectos', 'error');
            clearLoadingState(form);
        }
        
    } catch (error) {
        console.error('Error en login:', error);
        showNotification('Error al procesar el login. Inténtalo de nuevo.', 'error');
        clearLoadingState(form);
    }
}

// Validar formulario de login
function validateLoginForm(form) {
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    let isValid = true;
    
    // Validar email
    if (!email.value.trim()) {
        showFieldError(email, 'El email es requerido');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Formato de email inválido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password.value.trim()) {
        showFieldError(password, 'La contraseña es requerida');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    
    if (field.type === 'email') {
        if (!value) {
            showFieldError(field, 'El email es requerido');
        } else if (!isValidEmail(value)) {
            showFieldError(field, 'Formato de email inválido');
        } else {
            clearFieldError(field);
        }
    } else if (field.type === 'password') {
        if (!value) {
            showFieldError(field, 'La contraseña es requerida');
        } else if (value.length < 6) {
            showFieldError(password, 'La contraseña debe tener al menos 6 caracteres');
        } else {
            clearFieldError(field);
        }
    }
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Verificar credenciales (simulado)
function isValidLogin(email, password) {
    // Simular base de datos de usuarios
    const users = [
        { email: 'usuario@test.com', password: '123456', name: 'Usuario Test', role: 'user' },
        { email: 'admin@test.com', password: 'admin123', name: 'Administrador', role: 'admin' },
        { email: 'maria@test.com', password: 'maria123', name: 'María García', role: 'user' },
        { email: 'juan@test.com', password: 'juan123', name: 'Juan López', role: 'user' }
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    return user !== undefined;
}

// Obtener nombre de usuario
function getUserName(email) {
    const users = [
        { email: 'usuario@test.com', name: 'Usuario Test' },
        { email: 'admin@test.com', name: 'Administrador' },
        { email: 'maria@test.com', name: 'María García' },
        { email: 'juan@test.com', name: 'Juan López' }
    ];
    
    const user = users.find(u => u.email === email);
    return user ? user.name : 'Usuario';
}

// Obtener rol de usuario
function getUserRole(email) {
    const users = [
        { email: 'usuario@test.com', role: 'user' },
        { email: 'admin@test.com', role: 'admin' },
        { email: 'maria@test.com', role: 'user' },
        { email: 'juan@test.com', role: 'user' }
    ];
    
    const user = users.find(u => u.email === email);
    return user ? user.role : 'user';
}

// Guardar sesión de usuario
function saveUserSession(userData) {
    try {
        // Guardar en localStorage
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        // Si se marcó "recordarme", guardar por más tiempo
        if (userData.remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        console.log('Sesión guardada:', userData);
        return true;
    } catch (error) {
        console.error('Error al guardar sesión:', error);
        return false;
    }
}

// Mostrar estado de carga
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Iniciando sesión...';
    submitBtn.style.opacity = '0.7';
    
    // Guardar texto original para restaurarlo
    submitBtn.dataset.originalText = originalText;
}

// Limpiar estado de carga
function clearLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.dataset.originalText || 'Iniciar Sesión';
    
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.style.opacity = '1';
}

// Mostrar modal de registro
function showRegistrationModal() {
    const modalHTML = `
        <div class="modal active" id="registerModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Crear Nueva Cuenta</h3>
                    <button class="modal-close" onclick="closeRegisterModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="registerForm" class="form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="regFirstName">Nombre</label>
                                <input type="text" id="regFirstName" name="firstName" required>
                            </div>
                            <div class="form-group">
                                <label for="regLastName">Apellidos</label>
                                <input type="text" id="regLastName" name="lastName" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="regEmail">Email</label>
                            <input type="email" id="regEmail" name="email" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="regPassword">Contraseña</label>
                                <input type="password" id="regPassword" name="password" required>
                            </div>
                            <div class="form-group">
                                <label for="regConfirmPassword">Confirmar Contraseña</label>
                                <input type="password" id="regConfirmPassword" name="confirmPassword" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox">
                                <input type="checkbox" name="terms" required>
                                <span>Acepto los términos y condiciones</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeRegisterModal()">Cancelar</button>
                    <button class="btn btn-primary" onclick="handleRegistration()">Crear Cuenta</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Agregar event listeners al formulario
    initRegisterFormValidation();
}

// Cerrar modal de registro
function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.remove();
    }
}

// Inicializar validación del formulario de registro
function initRegisterFormValidation() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateRegisterField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Validar campo de registro
function validateRegisterField(field) {
    const value = field.value.trim();
    
    if (field.name === 'firstName' || field.name === 'lastName') {
        if (!value) {
            showFieldError(field, 'Este campo es requerido');
        } else if (value.length < 2) {
            showFieldError(field, 'Debe tener al menos 2 caracteres');
        } else {
            clearFieldError(field);
        }
    } else if (field.name === 'email') {
        if (!value) {
            showFieldError(field, 'El email es requerido');
        } else if (!isValidEmail(value)) {
            showFieldError(field, 'Formato de email inválido');
        } else {
            clearFieldError(field);
        }
    } else if (field.name === 'password') {
        if (!value) {
            showFieldError(field, 'La contraseña es requerida');
        } else if (value.length < 6) {
            showFieldError(field, 'La contraseña debe tener al menos 6 caracteres');
        } else {
            clearFieldError(field);
        }
    } else if (field.name === 'confirmPassword') {
        const password = document.getElementById('regPassword').value;
        if (!value) {
            showFieldError(field, 'Confirma tu contraseña');
        } else if (value !== password) {
            showFieldError(field, 'Las contraseñas no coinciden');
        } else {
            clearFieldError(field);
        }
    }
}

// Manejar registro
function handleRegistration() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    // Validar formulario
    if (!validateRegisterForm(form)) {
        return;
    }
    
    // Simular proceso de registro
    showNotification('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.', 'success');
    
    // Cerrar modal
    closeRegisterModal();
    
    // Limpiar formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.reset();
    }
}

// Validar formulario de registro
function validateRegisterForm(form) {
    const requiredFields = form.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        validateRegisterField(field);
        if (field.parentNode.querySelector('.field-error')) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Mostrar modal de login de administrador
function showAdminLoginModal() {
    const modalHTML = `
        <div class="modal active" id="adminLoginModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Acceso Administrador</h3>
                    <button class="modal-close" onclick="closeAdminLoginModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Para acceder al panel de administrador, utiliza las siguientes credenciales:</p>
                    <div class="admin-credentials">
                        <p><strong>Email:</strong> admin@test.com</p>
                        <p><strong>Contraseña:</strong> admin123</p>
                    </div>
                    <p class="admin-note">Nota: Estas son credenciales de prueba para demostración.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeAdminLoginModal()">Cerrar</button>
                    <button class="btn btn-primary" onclick="goToAdminPanel()">Ir al Panel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Cerrar modal de login de administrador
function closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.remove();
    }
}

// Ir al panel de administrador
function goToAdminPanel() {
    closeAdminLoginModal();
    
    // Guardar sesión de administrador usando userSession con role 'admin'
    const adminData = {
        email: 'admin@test.com',
        name: 'Administrador',
        role: 'admin',
        loginTime: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('userSession', JSON.stringify(adminData));
        console.log('Sesión de administrador guardada:', adminData);
        
        // Actualizar visibilidad del menú de perfil si está disponible
        if (window.ProfileMenuManager && window.ProfileMenuManager.updateProfileMenuVisibility) {
            window.ProfileMenuManager.updateProfileMenuVisibility();
        }
    } catch (error) {
        console.error('Error al guardar sesión de administrador:', error);
    }
    
    window.location.href = 'admin.html';
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification(message, type);
    } else {
        // Fallback si no está disponible la función global
        alert(message);
    }
}

// Función para manejar errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    showNotification(`Ha ocurrido un error: ${error.message}`, 'error');
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    try {
        const session = localStorage.getItem('userSession');
        return session !== null;
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return false;
    }
}

// Función para obtener datos de sesión
function getUserSession() {
    try {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}

// Función para cerrar sesión
function logout() {
    try {
        localStorage.removeItem('userSession');
        localStorage.removeItem('rememberMe');
        
        // Actualizar visibilidad del menú de perfil si está disponible
        if (window.ProfileMenuManager && window.ProfileMenuManager.updateProfileMenuVisibility) {
            window.ProfileMenuManager.updateProfileMenuVisibility();
        }
        
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Exportar funciones para uso global
window.LoginManager = {
    handleLogin,
    handleRegistration,
    showRegistrationModal,
    showAdminLoginModal,
    isUserLoggedIn,
    getUserSession,
    logout
};
