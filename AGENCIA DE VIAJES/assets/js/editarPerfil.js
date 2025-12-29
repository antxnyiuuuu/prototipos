// Gestión de edición de perfil
class ProfileManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupEventListeners();
        this.loadProfileData();
    }

    // Cargar usuario actual desde localStorage
    loadCurrentUser() {
        // Usar el gestor de datos de usuario si está disponible
        if (window.UserDataManager) {
            this.currentUser = window.UserDataManager.getCurrentUser();
        } else {
            const userSession = localStorage.getItem('userSession');
            if (userSession) {
                this.currentUser = JSON.parse(userSession);
            }
        }

        // Si no hay usuario, redirigir al login
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }
    }

    // Configurar event listeners
    setupEventListeners() {
        // Cambio de imagen desde archivo
        const imageFileInput = document.getElementById('imageFile');
        if (imageFileInput) {
            imageFileInput.addEventListener('change', (e) => this.handleImageFileChange(e));
        }

        // Cambio de imagen desde URL
        const imageUrlInput = document.getElementById('imageUrl');
        if (imageUrlInput) {
            imageUrlInput.addEventListener('input', (e) => this.handleImageUrlChange(e));
        }

        // Envío del formulario
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Botón cancelar
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.handleCancel());
        }

        // Click en avatar para abrir selector de archivo
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) {
            profileAvatar.addEventListener('click', () => imageFileInput.click());
        }
    }

    // Cargar datos del perfil en el formulario
    loadProfileData() {
        if (!this.currentUser) return;

        // Actualizar avatar y nombre en la sección superior
        const profileAvatar = document.getElementById('profileAvatar');
        const profileName = document.getElementById('profileName');
        const profileRole = document.getElementById('profileRole');

        if (profileAvatar) {
            profileAvatar.src = this.currentUser.avatar || '../assets/images/default-avatar.jpg';
        }

        if (profileName) {
            profileName.textContent = this.currentUser.name || 'Usuario';
        }

        if (profileRole) {
            profileRole.textContent = this.currentUser.role === 'admin' ? 'Administrador' : 'Usuario';
        }

        // Llenar campos del formulario
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const birthDateInput = document.getElementById('birthDate');
        const countryInput = document.getElementById('country');
        const cityInput = document.getElementById('city');
        const languageInput = document.getElementById('language');
        const notificationsInput = document.getElementById('notifications');

        if (fullNameInput) fullNameInput.value = this.currentUser.name || '';
        if (emailInput) emailInput.value = this.currentUser.email || '';
        if (phoneInput) phoneInput.value = this.currentUser.phone || '';
        if (birthDateInput) birthDateInput.value = this.currentUser.birthDate || '';
        if (countryInput) countryInput.value = this.currentUser.country || '';
        if (cityInput) cityInput.value = this.currentUser.city || '';
        if (languageInput) languageInput.value = this.currentUser.language || 'es';
        if (notificationsInput) notificationsInput.value = this.currentUser.notifications || 'all';
    }

    // Manejar cambio de imagen desde archivo
    handleImageFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor selecciona un archivo de imagen válido', 'error');
            return;
        }

        // Crear URL temporal para previsualización
        const reader = new FileReader();
        reader.onload = (e) => {
            this.showImagePreview(e.target.result);
            this.updateProfileAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Manejar cambio de imagen desde URL
    handleImageUrlChange(event) {
        const url = event.target.value.trim();
        if (!url) {
            this.hideImagePreview();
            return;
        }

        // Validar URL
        try {
            new URL(url);
            this.showImagePreview(url);
            this.updateProfileAvatar(url);
        } catch (error) {
            this.showNotification('Por favor ingresa una URL válida', 'error');
        }
    }

    // Mostrar vista previa de imagen
    showImagePreview(imageSrc) {
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');

        if (imagePreview && previewImage) {
            previewImage.src = imageSrc;
            imagePreview.style.display = 'block';
        }
    }

    // Ocultar vista previa de imagen
    hideImagePreview() {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.style.display = 'none';
        }
    }

    // Actualizar avatar del perfil
    updateProfileAvatar(imageSrc) {
        const profileAvatar = document.getElementById('profileAvatar');
        if (profileAvatar) {
            profileAvatar.src = imageSrc;
        }
    }

    // Manejar envío del formulario
    handleFormSubmit(event) {
        event.preventDefault();

        // Recopilar datos del formulario
        const formData = new FormData(event.target);
        const profileData = {
            id: this.currentUser.id,
            name: formData.get('fullName'),
            email: formData.get('email'),
            role: this.currentUser.role,
            avatar: this.getCurrentAvatarSrc(),
            phone: formData.get('phone'),
            birthDate: formData.get('birthDate'),
            country: formData.get('country'),
            city: formData.get('city'),
            language: formData.get('language'),
            notifications: formData.get('notifications')
        };

        // Validar datos requeridos
        if (!profileData.name || !profileData.email) {
            this.showNotification('Por favor completa todos los campos requeridos', 'error');
            return;
        }

        // Guardar en localStorage
        this.saveProfileData(profileData);

        // Mostrar confirmación
        this.showNotification('Perfil actualizado correctamente', 'success');

        // Redirigir según el rol
        setTimeout(() => {
            if (profileData.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'usuario.html';
            }
        }, 1500);
    }

    // Obtener la fuente actual del avatar
    getCurrentAvatarSrc() {
        const profileAvatar = document.getElementById('profileAvatar');
        return profileAvatar ? profileAvatar.src : '../assets/img/default-avatar.svg';
    }

    // Guardar datos del perfil en localStorage
    saveProfileData(profileData) {
        // Usar el gestor de datos de usuario si está disponible
        if (window.UserDataManager) {
            window.UserDataManager.updateUser(profileData.id, profileData);
            // Actualizar sesión del usuario
            localStorage.setItem('userSession', JSON.stringify(profileData));
        } else {
            // Fallback al método anterior
            localStorage.setItem('userSession', JSON.stringify(profileData));
            
            // Actualizar lista de usuarios si es administrador
            if (profileData.role === 'admin') {
                this.updateAdminProfile(profileData);
            }
        }

        // Actualizar usuario actual
        this.currentUser = profileData;

        // Disparar evento personalizado para notificar cambios
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profileData }));
        
        // Actualizar avatar global
        if (window.updateGlobalAvatar) {
            window.updateGlobalAvatar();
        }
    }

    // Actualizar perfil de administrador en la lista de usuarios (fallback)
    updateAdminProfile(profileData) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const adminIndex = users.findIndex(user => user.id === profileData.id);
        
        if (adminIndex !== -1) {
            users[adminIndex] = { ...users[adminIndex], ...profileData };
        } else {
            users.push(profileData);
        }
        
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Manejar cancelación
    handleCancel() {
        if (confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
            // Redirigir según el rol
            if (this.currentUser.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'usuario.html';
            }
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        // Usar el sistema de notificaciones existente si está disponible
        if (window.ViajesMundo && window.ViajesMundo.showNotification) {
            window.ViajesMundo.showNotification(message, type);
        } else {
            // Crear notificación personalizada si no está disponible
            this.createCustomNotification(message, type);
        }
    }

    // Crear notificación personalizada
    createCustomNotification(message, type) {
        // Remover notificaciones existentes
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `custom-notification custom-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Agregar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        // Agregar al DOM
        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Obtener icono de notificación
    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // Obtener color de notificación
    getNotificationColor(type) {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            default: return '#3b82f6';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});

// Función global para obtener datos del perfil actualizado
window.getCurrentProfile = function() {
    const userSession = localStorage.getItem('userSession');
    return userSession ? JSON.parse(userSession) : null;
};

// Función global para actualizar avatar en otras páginas
window.updateGlobalAvatar = function() {
    const profile = window.getCurrentProfile();
    if (profile && profile.avatar) {
        // Buscar y actualizar todos los avatares en la página
        const avatars = document.querySelectorAll('.user-avatar, .profile-avatar, .admin-avatar');
        avatars.forEach(avatar => {
            if (avatar.tagName === 'IMG') {
                avatar.src = profile.avatar;
            }
        });
    }
};
