// Datos de usuarios y roles
const users = [
    {
        id: 1,
        username: "cliente1",
        password: "123456",
        name: "Juan Pérez",
        email: "juan@email.com",
        role: "cliente",
        phone: "555-0101",
        estado: "activo",
        fechaRegistro: "2024-01-01T00:00:00.000Z"
    },
    {
        id: 2,
        username: "cliente2", 
        password: "123456",
        name: "María García",
        email: "maria@email.com",
        role: "cliente",
        phone: "555-0102",
        estado: "activo",
        fechaRegistro: "2024-01-01T00:00:00.000Z"
    },
    {
        id: 3,
        username: "distribuidor1",
        password: "123456",
        name: "Carlos López",
        email: "carlos@distribuidor.com",
        role: "distribuidor",
        phone: "555-0201",
        company: "Motorgsa Distribuidor",
        estado: "activo",
        fechaRegistro: "2024-01-01T00:00:00.000Z"
    },
    {
        id: 4,
        username: "distribuidor2",
        password: "123456", 
        name: "Ana Rodríguez",
        email: "ana@distribuidor.com",
        role: "distribuidor",
        phone: "555-0202",
        company: "Agrícola Express",
        estado: "activo",
        fechaRegistro: "2024-01-01T00:00:00.000Z"
    },
    {
        id: 5,
        username: "admin",
        password: "admin123",
        name: "Administrador",
        email: "admin@motorgsa.com",
        role: "admin",
        phone: "555-0001",
        estado: "activo",
        fechaRegistro: "2024-01-01T00:00:00.000Z"
    }
];

// Función para obtener usuarios
function getUsers() {
    return users;
}

// Función para autenticar usuario
function authenticateUser(usernameOrEmail, password) {
    return users.find(user => 
        (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
    );
}

// Función para obtener usuario por ID
function getUserById(id) {
    return users.find(user => user.id === id);
}

// Función para obtener solicitudes pendientes
function getPendingRequests() {
    return users.filter(user => user.estado === 'pendiente');
}

// Función para aprobar usuario
function approveUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.estado = 'activo';
        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
}

// Función para rechazar usuario
function rejectUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.estado = 'rechazado';
        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
}

// Función para sincronizar usuarios con localStorage
function syncUsersWithLocalStorage() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers.length > 0) {
        // Actualizar la lista de usuarios con los datos del localStorage
        users.length = 0; // Limpiar array
        users.push(...storedUsers); // Agregar usuarios del localStorage
    }
}
