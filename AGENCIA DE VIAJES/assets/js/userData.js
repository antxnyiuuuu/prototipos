// Gestión de datos de usuario
class UserDataManager {
    constructor() {
        this.initDefaultUsers();
    }

    // Inicializar usuarios por defecto
    initDefaultUsers() {
        const existingUsers = localStorage.getItem('users');
        if (!existingUsers) {
            const defaultUsers = [
                {
                    id: 'admin1',
                    name: 'Administrador',
                    email: 'admin@viajesmundo.com',
                    role: 'admin',
                    avatar: '../assets/img/default-avatar.svg',
                    phone: '+34 600 000 001',
                    birthDate: '1985-03-15',
                    country: 'Ecuador',
                    city: 'Quito',
                    language: 'es',
                    notifications: 'all',
                    memberSince: '2020-01-01',
                    status: 'active'
                },
                {
                    id: 'user1',
                    name: 'María García',
                    email: 'maria@ejemplo.com',
                    role: 'user',
                    avatar: '../assets/img/default-avatar.svg',
                    phone: '+34 600 000 002',
                    birthDate: '1990-07-22',
                    country: 'Ecuador',
                    city: 'Guayaquil',
                    language: 'es',
                    notifications: 'important',
                    memberSince: '2023-06-15',
                    status: 'active'
                },
                {
                    id: 'user2',
                    name: 'Carlos López',
                    email: 'carlos@ejemplo.com',
                    role: 'user',
                    avatar: '../assets/img/default-avatar.svg',
                    phone: '+34 600 000 003',
                    birthDate: '1988-11-08',
                    country: 'Ecuador',
                    city: 'Cuenca',
                    language: 'es',
                    notifications: 'all',
                    memberSince: '2022-09-20',
                    status: 'active'
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }
    }

    // Obtener todos los usuarios
    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Obtener usuario por ID
    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === id);
    }

    // Obtener usuario por email
    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    // Crear nuevo usuario
    createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: this.generateUserId(),
            ...userData,
            memberSince: new Date().toISOString().split('T')[0],
            status: 'active'
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return newUser;
    }

    // Actualizar usuario
    updateUser(id, userData) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            localStorage.setItem('users', JSON.stringify(users));
            return users[userIndex];
        }
        return null;
    }

    // Eliminar usuario
    deleteUser(id) {
        const users = this.getUsers();
        const filteredUsers = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
    }

    // Generar ID único para usuario
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Simular login
    login(email, password) {
        // En un sistema real, aquí se validaría la contraseña
        const user = this.getUserByEmail(email);
        if (user) {
            // Simular contraseñas simples para demo
            const validPasswords = {
                'admin@viajesmundo.com': 'admin123',
                'maria@ejemplo.com': 'maria123',
                'carlos@ejemplo.com': 'carlos123'
            };
            
            if (validPasswords[email] === password) {
                // Guardar sesión del usuario
                localStorage.setItem('userSession', JSON.stringify(user));
                return { success: true, user: user };
            }
        }
        return { success: false, message: 'Credenciales inválidas' };
    }

    // Cerrar sesión
    logout() {
        localStorage.removeItem('userSession');
    }

    // Verificar si hay sesión activa
    isLoggedIn() {
        return localStorage.getItem('userSession') !== null;
    }

    // Obtener usuario de la sesión actual
    getCurrentUser() {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    // Verificar si el usuario actual es administrador
    isAdmin() {
        const currentUser = this.getCurrentUser();
        return currentUser && currentUser.role === 'admin';
    }
}

// Inicializar el gestor de datos de usuario
window.UserDataManager = new UserDataManager();

// Función global para login (para usar en otras páginas)
window.loginUser = function(email, password) {
    return window.UserDataManager.login(email, password);
};

// Función global para logout
window.logoutUser = function() {
    window.UserDataManager.logout();
    window.location.href = 'login.html';
};

// Función global para verificar si está logueado
window.isUserLoggedIn = function() {
    return window.UserDataManager.isLoggedIn();
};

// Función global para obtener usuario actual
window.getCurrentUser = function() {
    return window.UserDataManager.getCurrentUser();
};
