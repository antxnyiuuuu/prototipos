// Funcionalidad del menú de perfil desplegable
document.addEventListener('DOMContentLoaded', function() {
    initProfileMenu();
});

function initProfileMenu() {
    const profileAvatar = document.getElementById('profileAvatar');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (!profileAvatar || !profileDropdown) {
        // Si no existe el menú de perfil, no hacer nada
        return;
    }
    
    // Verificar si el usuario está logueado
    if (!isUserLoggedIn()) {
        hideProfileMenu();
        return;
    }
    
    // Mostrar el menú de perfil si el usuario está logueado
    showProfileMenu();
    
    // Abrir/cerrar menú al hacer clic en el avatar
    profileAvatar.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        
        // Agregar efecto visual al avatar
        this.style.transform = profileDropdown.classList.contains('active') 
            ? 'scale(1.05)' 
            : 'scale(1)';
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!profileAvatar.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
            profileAvatar.style.transform = 'scale(1)';
        }
    });
    
    // Cerrar menú al hacer clic en una opción del menú
    const dropdownItems = profileDropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Si es el enlace de cerrar sesión, ejecutar la función de logout
            if (this.textContent.includes('Cerrar sesión')) {
                e.preventDefault();
                logout();
                return;
            }
            
            // Para otros enlaces, cerrar el menú y permitir la navegación
            setTimeout(() => {
                profileDropdown.classList.remove('active');
                profileAvatar.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
            profileAvatar.style.transform = 'scale(1)';
        }
    });
    
    // Cargar información del usuario desde localStorage si existe
    loadUserInfo();
    
    // Agregar enlace de perfil dinámicamente si no existe
    addProfileLink();
}

function loadUserInfo() {
    // Intentar cargar información del usuario desde las sesiones
    let userData = null;
    let isAdmin = false;
    
    try {
        const userSession = localStorage.getItem('userSession');
        
        if (userSession) {
            userData = JSON.parse(userSession);
            isAdmin = userData.role === 'admin';
        }
    } catch (error) {
        console.error('Error al cargar información del usuario:', error);
    }
    
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownUserInfo = document.querySelector('.dropdown-user-info');
    
    if (dropdownHeader && dropdownUserInfo && userData) {
        const headerImg = dropdownHeader.querySelector('img');
        const userName = dropdownUserInfo.querySelector('h4');
        const userEmail = dropdownUserInfo.querySelector('p');
        
        // Actualizar información según el tipo de usuario
        if (isAdmin) {
            userName.textContent = userData.name || 'Administrador';
            userEmail.textContent = userData.email || 'admin@viajesmundo.com';
        } else {
            userName.textContent = userData.name || 'Usuario';
            userEmail.textContent = userData.email || 'usuario@viajesmundo.com';
        }
        
        // Actualizar avatar si existe
        if (userData.avatar) {
            headerImg.src = userData.avatar;
            const profileAvatarImg = document.querySelector('#profileAvatar img');
            if (profileAvatarImg) {
                profileAvatarImg.src = userData.avatar;
            }
        }
        
        // Actualizar enlaces del menú según el tipo de usuario
        updateMenuLinks(isAdmin);
    }
}

// Función para agregar el enlace de perfil al menú
function addProfileLink() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;
    
    // Verificar si ya existe el enlace de perfil
    let profileLink = dropdownMenu.querySelector('.dropdown-item[data-profile]');
    
    if (!profileLink) {
        // Crear el enlace de perfil
        profileLink = document.createElement('a');
        profileLink.className = 'dropdown-item';
        profileLink.setAttribute('data-profile', 'true');
        profileLink.innerHTML = '<i class="fas fa-user"></i><span>Mi Perfil</span>';
        
        // Insertar al principio del menú
        const firstItem = dropdownMenu.querySelector('.dropdown-item');
        if (firstItem) {
            dropdownMenu.insertBefore(profileLink, firstItem);
        } else {
            dropdownMenu.appendChild(profileLink);
        }
        
        console.log('ProfileMenu: Enlace de perfil agregado al menú');
    }
    
    // Actualizar el enlace según el tipo de usuario
    updateProfileLink();
}

// Función para actualizar el enlace de perfil según el tipo de usuario
function updateProfileLink() {
    const profileLink = document.querySelector('.dropdown-item[data-profile]');
    if (!profileLink) return;
    
    const userSession = localStorage.getItem('userSession');
    const userData = userSession ? JSON.parse(userSession) : null;
    const isAdmin = userData && userData.role === 'admin';
    
    // Determinar la ruta correcta según la página actual
    const currentPath = window.location.pathname;
    let profilePath = '';
    
    if (isAdmin) {
        profilePath = 'admin.html';
        profileLink.querySelector('span').textContent = 'Panel de Admin';
        profileLink.querySelector('i').className = 'fas fa-cog';
    } else {
        profilePath = 'usuario.html';
        profileLink.querySelector('span').textContent = 'Mi Perfil';
        profileLink.querySelector('i').className = 'fas fa-user';
    }
    
    // Ajustar la ruta según la página actual
    if (currentPath.includes('/index.html') || currentPath.endsWith('/')) {
        profilePath = 'pages/' + profilePath;
    }
    
    profileLink.href = profilePath;
    console.log('ProfileMenu: Enlace de perfil actualizado:', profilePath);
}

// Función para actualizar los enlaces del menú según el tipo de usuario
function updateMenuLinks(isAdmin) {
    updateProfileLink();
}

// Función para actualizar la información del usuario (puede ser llamada desde otros scripts)
function updateUserInfo(userData) {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    loadUserInfo();
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    try {
        const userSession = localStorage.getItem('userSession');
        
        console.log('ProfileMenu: userSession:', userSession);
        
        const hasUserSession = userSession !== null && userSession !== 'null' && userSession !== '';
        
        console.log('ProfileMenu: hasUserSession:', hasUserSession);
        
        const isLoggedIn = hasUserSession;
        console.log('ProfileMenu: isLoggedIn:', isLoggedIn);
        
        return isLoggedIn;
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return false;
    }
}

// Función para mostrar el menú de perfil
function showProfileMenu() {
    const profileMenuContainer = document.querySelector('.profile-menu-container');
    if (profileMenuContainer) {
        profileMenuContainer.classList.add('show');
        console.log('ProfileMenu: Menú mostrado');
    } else {
        console.log('ProfileMenu: No se pudo mostrar el menú - contenedor no encontrado');
    }
    
    // Ocultar enlace de login
    hideLoginLink();
}

// Función para ocultar el menú de perfil
function hideProfileMenu() {
    const profileMenuContainer = document.querySelector('.profile-menu-container');
    if (profileMenuContainer) {
        profileMenuContainer.classList.remove('show');
        console.log('ProfileMenu: Menú ocultado');
    } else {
        console.log('ProfileMenu: No se pudo ocultar el menú - contenedor no encontrado');
    }
    
    // Mostrar enlace de login
    showLoginLink();
}

// Función para cerrar sesión
function logout() {
    try {
        console.log('ProfileMenu: Ejecutando logout...');
        
        // Limpiar todas las sesiones
        localStorage.removeItem('userSession');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('rememberMe');
        
        // Limpiar el carrito cuando el usuario cierra sesión
        localStorage.removeItem('vm_cart');
        console.log('ProfileMenu: Carrito limpiado al cerrar sesión');
        
        console.log('ProfileMenu: Sesiones limpiadas');
        
        // Ocultar el menú de perfil y mostrar enlace de login
        hideProfileMenu();
        showLoginLink();
        
        console.log('ProfileMenu: Redirigiendo a login...');
        
        // Determinar la ruta correcta para el login
        const currentPath = window.location.pathname;
        let loginPath = 'login.html';
        
        // Si estamos en la página principal, ajustar la ruta
        if (currentPath.includes('/index.html') || currentPath.endsWith('/')) {
            loginPath = 'pages/login.html';
        }
        
        // Redirigir al login
        window.location.href = loginPath;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Función para actualizar el menú cuando cambie el estado de la sesión
function updateProfileMenuVisibility() {
    if (isUserLoggedIn()) {
        showProfileMenu();
        loadUserInfo();
    } else {
        hideProfileMenu();
    }
}

// Escuchar cambios en localStorage para actualizar el menú
window.addEventListener('storage', function(e) {
            if (e.key === 'userSession') {
        updateProfileMenuVisibility();
    }
});

// Exportar funciones para uso global
window.ProfileMenuManager = {
    isUserLoggedIn,
    showProfileMenu,
    hideProfileMenu,
    updateProfileMenuVisibility,
    loadUserInfo,
    logout,
    cleanResidualSessions,
    hideLoginLink,
    showLoginLink,
    addProfileLink,
    updateProfileLink
};

// Función global para limpiar todas las sesiones (útil para debugging)
window.clearAllSessions = function() {
    try {
        localStorage.removeItem('userSession');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('rememberMe');
        console.log('ProfileMenu: Todas las sesiones han sido limpiadas');
        checkAndUpdateProfileMenu();
    } catch (error) {
        console.error('Error al limpiar sesiones:', error);
    }
};

// Verificar estado de sesión inmediatamente al cargar el script
(function() {
    // Limpiar sesiones residuales al cargar la página
    cleanResidualSessions();
    
    // Verificar si el DOM ya está listo
    if (document.readyState === 'loading') {
        // Si el DOM aún no está listo, esperar
        document.addEventListener('DOMContentLoaded', function() {
            checkAndUpdateProfileMenu();
        });
    } else {
        // Si el DOM ya está listo, ejecutar inmediatamente
        checkAndUpdateProfileMenu();
    }
    
    // Verificación adicional después de un pequeño delay para asegurar que todo esté cargado
    setTimeout(function() {
        checkAndUpdateProfileMenu();
    }, 100);
})();

// Función para ocultar el enlace de login
function hideLoginLink() {
    const loginLinks = document.querySelectorAll('.nav-list a[href*="login.html"]');
    loginLinks.forEach(link => {
        link.classList.add('hidden');
    });
    console.log('ProfileMenu: Enlace de login ocultado');
}

// Función para mostrar el enlace de login
function showLoginLink() {
    const loginLinks = document.querySelectorAll('.nav-list a[href*="login.html"]');
    loginLinks.forEach(link => {
        link.classList.remove('hidden');
    });
    console.log('ProfileMenu: Enlace de login mostrado');
}

// Función para limpiar sesiones residuales
function cleanResidualSessions() {
    try {
        const userSession = localStorage.getItem('userSession');
        
        // Limpiar sesiones que sean 'null', vacías o inválidas
        if (userSession === 'null' || userSession === '' || userSession === 'undefined') {
            localStorage.removeItem('userSession');
            console.log('ProfileMenu: Sesión de usuario residual eliminada');
        }
        
        // Verificar si las sesiones tienen formato JSON válido
        if (userSession && userSession !== 'null') {
            try {
                JSON.parse(userSession);
            } catch (e) {
                localStorage.removeItem('userSession');
                console.log('ProfileMenu: Sesión de usuario inválida eliminada');
            }
        }
        
    } catch (error) {
        console.error('Error al limpiar sesiones residuales:', error);
    }
}

// Función para verificar y actualizar el menú de perfil
function checkAndUpdateProfileMenu() {
    const profileMenuContainer = document.querySelector('.profile-menu-container');
    if (!profileMenuContainer) {
        console.log('ProfileMenu: No se encontró el contenedor del menú de perfil');
        return;
    }
    
    const isLoggedIn = isUserLoggedIn();
    console.log('ProfileMenu: Estado de sesión:', isLoggedIn);
    
    if (isLoggedIn) {
        console.log('ProfileMenu: Usuario logueado, mostrando menú');
        showProfileMenu();
        loadUserInfo();
        addProfileLink(); // Agregar enlace de perfil
    } else {
        console.log('ProfileMenu: Usuario no logueado, ocultando menú');
        hideProfileMenu();
        
        // Limpiar carrito si no hay sesión
        if (localStorage.getItem('vm_cart')) {
            localStorage.removeItem('vm_cart');
            console.log('ProfileMenu: Carrito limpiado - usuario no logueado');
        }
    }
}
