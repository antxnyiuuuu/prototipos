// Funcionalidades específicas del panel de administrador
console.log('🚀 Archivo admin.js cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando panel de administrador...');
    
    // Verificar si el usuario está logueado como administrador
    if (!checkAdminSession()) {
        console.log('No es administrador, pero continuando para debug...');
        // window.location.href = 'login.html';
        // return;
    }
    
    console.log('Inicializando panel de administrador...');
    initAdminDashboard();
    loadAdminProfile();
    
    // Verificar que los managers estén disponibles
    console.log('🔍 Verificando managers disponibles...');
    console.log('PackageManager disponible:', !!window.PackageManager);
    console.log('UserDataManager disponible:', !!window.UserDataManager);
    
    // Cargar datos inmediatamente
    console.log('🚀 Cargando datos del administrador...');
    
    console.log('📊 Cargando estadísticas...');
    loadAdminStats();
    
    console.log('📦 Cargando tabla de paquetes...');
    loadPackagesTable();
    
    console.log('💰 Cargando historial de pagos...');
    loadPaymentsHistory();
    
    console.log('👥 Cargando usuarios...');
    loadUsers();
    
    initPackageModal();
    
    // Escuchar cambios en paquetes
    window.addEventListener('packagesChanged', function() {
        loadPackagesTable();
        loadAdminStats();
    });
    
    // Escuchar cambios en el perfil del usuario
    window.addEventListener('profileUpdated', function(event) {
        updateAdminProfileDisplay(event.detail);
    });
    
    // Actualizar avatar global si está disponible
    if (window.updateGlobalAvatar) {
        window.updateGlobalAvatar();
    }
});

// Verificar sesión de administrador
function checkAdminSession() {
    try {
        const session = localStorage.getItem('userSession');
        if (!session) return false;
        
        const userData = JSON.parse(session);
        return userData && userData.role === 'admin';
    } catch (error) {
        console.error('Error al verificar sesión de administrador:', error);
        return false;
    }
}

// Obtener sesión del usuario
function getUserSession() {
    try {
        const session = localStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.error('Error al obtener sesión del usuario:', error);
        return null;
    }
}

// Cargar perfil del administrador
function loadAdminProfile() {
    const userSession = getUserSession();
    if (!userSession) return;
    
    // Actualizar avatar
    const adminAvatar = document.getElementById('adminAvatar');
    if (adminAvatar) {
        adminAvatar.src = userSession.avatar || '../assets/img/default-avatar.svg';
    }
    
    // Actualizar nombre
    const adminName = document.getElementById('adminName');
    if (adminName) {
        adminName.textContent = userSession.name || 'Administrador';
    }
    
    // Actualizar email
    const adminEmail = document.getElementById('adminEmail');
    if (adminEmail) {
        adminEmail.textContent = userSession.email || 'admin@viajesmundo.com';
    }
    
    // Actualizar fecha de último acceso
    const lastLoginDate = document.getElementById('lastLoginDate');
    if (lastLoginDate) {
        const loginTime = new Date(userSession.loginTime || Date.now());
        lastLoginDate.textContent = loginTime.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Calcular días activo (simulado)
    const adminActiveDays = document.getElementById('adminActiveDays');
    if (adminActiveDays) {
        const daysActive = Math.floor((Date.now() - new Date(userSession.loginTime || Date.now())) / (1000 * 60 * 60 * 24));
        adminActiveDays.textContent = Math.max(1, daysActive);
    }
    
    // Calcular tareas completadas (simulado)
    const adminCompletedTasks = document.getElementById('adminCompletedTasks');
    if (adminCompletedTasks) {
        // Simular tareas basadas en paquetes y usuarios
        const packages = window.PackageManager ? window.PackageManager.getActivePackages() : [];
        const users = window.UserDataManager ? window.UserDataManager.getUsers() : [];
        const completedTasks = packages.length + users.length + Math.floor(Math.random() * 50);
        adminCompletedTasks.textContent = completedTasks;
    }
}

// Inicializar dashboard de administrador
function initAdminDashboard() {
    // Inicializar filtros
    initPaymentFilters();
    
    // Inicializar exportación
    initExportFunctionality();
    
    // Inicializar funcionalidades del perfil
    initProfileFunctionality();
}

// Actualizar información del perfil del administrador
function updateAdminProfileDisplay(profileData) {
    const userSession = getUserSession();
    if (!userSession || !profileData) return;
    
    // Actualizar nombre del administrador en el header si existe
    const adminNameElements = document.querySelectorAll('.admin-name, .user-name');
    adminNameElements.forEach(element => {
        if (element.classList.contains('admin-name') || element.classList.contains('user-name')) {
            element.textContent = profileData.name || 'Administrador';
        }
    });
    
    // Actualizar el componente de perfil del administrador
    const adminAvatar = document.getElementById('adminAvatar');
    if (adminAvatar) {
        adminAvatar.src = profileData.avatar || '../assets/img/default-avatar.svg';
    }
    
    const adminName = document.getElementById('adminName');
    if (adminName) {
        adminName.textContent = profileData.name || 'Administrador';
    }
    
    const adminEmail = document.getElementById('adminEmail');
    if (adminEmail) {
        adminEmail.textContent = profileData.email || 'admin@viajesmundo.com';
    }
    
    // Mostrar notificación de actualización
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification('Perfil actualizado correctamente', 'success');
    }
}



// Inicializar funcionalidades del perfil del administrador
function initProfileFunctionality() {
    // Botón de cambiar contraseña
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            showChangePasswordModal();
        });
    }
}

// Mostrar modal de cambio de contraseña
function showChangePasswordModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h3>Cambiar Contraseña</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <form id="changePasswordForm" class="form">
                    <div class="form-group">
                        <label for="currentPassword">Contraseña Actual</label>
                        <input type="password" id="currentPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Nueva Contraseña</label>
                        <input type="password" id="newPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Nueva Contraseña</label>
                        <input type="password" id="confirmPassword" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline" onclick="this.closest('.modal').remove()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Cambiar Contraseña</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listener para el formulario
    const form = modal.querySelector('#changePasswordForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePasswordChange();
        modal.remove();
    });
}

// Manejar cambio de contraseña
function handlePasswordChange() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        if (window.ViajesMundo && window.ViajesMundo.showNotification) {
            window.ViajesMundo.showNotification('Las contraseñas no coinciden', 'error');
        }
        return;
    }
    
    if (newPassword.length < 6) {
        if (window.ViajesMundo && window.ViajesMundo.showNotification) {
            window.ViajesMundo.showNotification('La nueva contraseña debe tener al menos 6 caracteres', 'error');
        }
        return;
    }
    
    // Simular cambio de contraseña exitoso
    if (window.ViajesMundo && window.ViajesMundo.showNotification) {
        window.ViajesMundo.showNotification('Contraseña cambiada exitosamente', 'success');
    }
}

// Cargar estadísticas del administrador
function loadAdminStats() {
    const totalUsersElement = document.getElementById('totalUsers');
    const totalPackagesElement = document.getElementById('totalPackages');
    const totalBookingsElement = document.getElementById('totalBookings');
    const totalRevenueElement = document.getElementById('totalRevenue');
    
    // Obtener datos
    const stats = calculateAdminStats();
    
    // Actualizar elementos
    if (totalUsersElement) totalUsersElement.textContent = stats.totalUsers;
    if (totalPackagesElement) totalUsersElement.textContent = stats.totalPackages;
    if (totalBookingsElement) totalBookingsElement.textContent = stats.totalBookings;
    if (totalRevenueElement) totalRevenueElement.textContent = `€${stats.totalRevenue}`;
}

// Calcular estadísticas del administrador
function calculateAdminStats() {
    console.log('🧮 Iniciando calculateAdminStats...');
    
    if (!window.PackageManager) {
        console.error('❌ PackageManager no está disponible en calculateAdminStats');
        console.log('🔍 Usando estadísticas simuladas...');
        
        const stats = {
            totalUsers: 1247, // Simulado
            totalPackages: 3, // Simulado
            totalBookings: 89, // Simulado
            totalRevenue: 156789 // Simulado
        };
        
        console.log('📊 Estadísticas simuladas:', stats);
        return stats;
    }
    
    const packages = window.PackageManager.getPackages();
    console.log('🎒 Paquetes obtenidos del PackageManager:', packages);
    
    const stats = {
        totalUsers: 1247, // Simulado
        totalPackages: packages.length,
        totalBookings: 89, // Simulado
        totalRevenue: 156789 // Simulado
    };
    
    console.log('📊 Estadísticas calculadas:', stats);
    return stats;
}

// Cargar tabla de paquetes
function loadPackagesTable() {
    console.log('📦 Iniciando loadPackagesTable...');
    
    const tableBody = document.getElementById('packagesTableBody');
    console.log('📋 TableBody paquetes encontrado:', tableBody);
    
    if (!tableBody) {
        console.error('❌ No se encontró packagesTableBody');
        return;
    }
    
    if (!window.PackageManager) {
        console.error('❌ PackageManager no está disponible');
        console.log('🔍 Intentando usar datos simulados...');
        
        // Usar datos simulados como fallback
        const mockPackages = [
            {
                id: 1,
                title: 'Europa Clásica',
                duration: 7,
                price: 1299,
                rating: 4.5,
                description: 'Descubre las maravillas de Europa',
                image: '../assets/img/europa.jpg',
                status: 'active'
            }
        ];
        
        let html = '';
        mockPackages.forEach(package => {
            html += `
                <tr data-package-id="${package.id}">
                    <td>
                        <img src="${package.image}" alt="${package.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" onerror="this.src='../assets/img/placeholder.jpg'">
                    </td>
                    <td>${package.title}</td>
                    <td>${package.duration} días</td>
                    <td>€${package.price}</td>
                    <td>
                        <span class="status ${package.status}">Activo</span>
                    </td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="editPackage(${package.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="deletePackage(${package.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = html;
        console.log('✅ Tabla de paquetes actualizada con datos simulados');
        return;
    }
    
    const packages = window.PackageManager.getPackages();
    console.log('🎒 Paquetes cargados:', packages);
    
    let html = '';
    if (packages && packages.length > 0) {
        console.log(`📊 Generando HTML para ${packages.length} paquetes...`);
        packages.forEach((package, index) => {
            console.log(`📝 Generando fila ${index + 1} para paquete:`, package);
            html += `
                <tr data-package-id="${package.id}">
                    <td>
                        <img src="${package.image}" alt="${package.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" onerror="this.src='../assets/img/placeholder.jpg'">
                    </td>
                    <td>${package.title}</td>
                    <td>${package.duration} días</td>
                    <td>€${package.price}</td>
                    <td>
                        <span class="status ${package.status}">${getPackageStatusText(package.status)}</span>
                    </td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="editPackage(${package.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="deletePackage(${package.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        console.log('⚠️ No hay paquetes, mostrando mensaje de "no hay datos"');
        html = '<tr><td colspan="6">No hay paquetes disponibles</td></tr>';
    }
    
    console.log('🔄 HTML paquetes generado:', html);
    tableBody.innerHTML = html;
    console.log('✅ Tabla de paquetes actualizada');
}

// Funciones para editar y eliminar paquetes
function editPackage(id) {
    const package = window.PackageManager.getPackageById(id);
    if (!package) {
        alert('Paquete no encontrado');
        return;
    }
    
    // Llenar el formulario con los datos del paquete
    document.getElementById('packageDestination').value = package.title;
    document.getElementById('packageDuration').value = package.duration;
    document.getElementById('packagePrice').value = package.price;
    document.getElementById('packageRating').value = package.rating;
    document.getElementById('packageDescription').value = package.description;
    document.getElementById('packageImage').value = package.image;
    document.getElementById('packageStatus').value = package.status;
    
    // Cambiar el título del modal
    document.getElementById('modalTitle').textContent = 'Editar Paquete';
    
    // Guardar el ID del paquete que se está editando
    document.getElementById('packageForm').dataset.editId = id;
    
    // Mostrar el modal
    document.getElementById('packageModal').classList.add('active');
}

function deletePackage(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete? Esta acción no se puede deshacer.')) {
        window.PackageManager.deletePackage(id);
        showNotification('Paquete eliminado correctamente', 'success');
    }
}

// Obtener texto del estado del paquete
function getPackageStatusText(status) {
    switch (status) {
        case 'active': return 'Activo';
        case 'inactive': return 'Inactivo';
        case 'draft': return 'Borrador';
        default: return 'Desconocido';
    }
}

// Cargar historial de pagos
function loadPaymentsHistory() {
    console.log('🔍 Iniciando loadPaymentsHistory...');
    
    const tableBody = document.getElementById('paymentsTableBody');
    console.log('📋 TableBody encontrado:', tableBody);
    
    if (!tableBody) {
        console.error('❌ No se encontró paymentsTableBody');
        return;
    }
    
    const payments = getAdminPayments();
    console.log('💰 Pagos cargados:', payments);
    
    let html = '';
    if (payments && payments.length > 0) {
        console.log(`📊 Generando HTML para ${payments.length} pagos...`);
        payments.forEach((payment, index) => {
            console.log(`📝 Generando fila ${index + 1} para pago:`, payment);
            html += `
                <tr>
                    <td>#${payment.id}</td>
                    <td>${payment.user}</td>
                    <td>${payment.package}</td>
                    <td>${formatDate(payment.date)}</td>
                    <td>€${payment.amount}</td>
                    <td><span class="status ${payment.status}">${getPaymentStatusText(payment.status)}</span></td>
                    <td>${payment.method}</td>
                </tr>
            `;
        });
    } else {
        console.log('⚠️ No hay pagos, mostrando mensaje de "no hay datos"');
        html = '<tr><td colspan="7">No hay pagos disponibles</td></tr>';
    }
    
    console.log('🔄 HTML generado:', html);
    tableBody.innerHTML = html;
    console.log('✅ Historial de pagos actualizado');
}

// Obtener pagos para administrador
function getAdminPayments() {
    console.log('🔄 Generando pagos simulados...');
    
    // Por ahora, usar datos simulados
    // En el futuro, esto podría conectarse a una base de datos real
    const payments = [
        {
            id: 1001,
            user: 'maria@test.com',
            package: 'Europa Clásica',
            date: '2024-12-15',
            amount: 1299,
            status: 'completed',
            method: 'Tarjeta'
        },
        {
            id: 1002,
            user: 'juan@test.com',
            package: 'Caribe Exótico',
            date: '2024-12-14',
            amount: 899,
            status: 'pending',
            method: 'PayPal'
        },
        {
            id: 1003,
            user: 'ana@test.com',
            package: 'Asia Misteriosa',
            date: '2024-12-13',
            amount: 1599,
            status: 'completed',
            method: 'Tarjeta'
        },
        {
            id: 1004,
            user: 'carlos@test.com',
            package: 'Safari Africano',
            date: '2024-12-12',
            amount: 1899,
            status: 'failed',
            method: 'Transferencia'
        },
        {
            id: 1005,
            user: 'lucia@test.com',
            package: 'Australia y Nueva Zelanda',
            date: '2024-12-11',
            amount: 2499,
            status: 'completed',
            method: 'Transferencia'
        },
        {
            id: 1006,
            user: 'pedro@test.com',
            package: 'Islas Griegas',
            date: '2024-12-10',
            amount: 1199,
            status: 'pending',
            method: 'PayPal'
        }
    ];
    
    console.log('💰 Pagos simulados generados:', payments);
    return payments;
}

// Cargar usuarios
function loadUsers() {
    console.log('👥 Iniciando loadUsers...');
    
    const tableBody = document.getElementById('usersTableBody');
    console.log('📋 TableBody usuarios encontrado:', tableBody);
    
    if (!tableBody) {
        console.error('❌ No se encontró usersTableBody');
        return;
    }
    
    const users = getUsers();
    console.log('👤 Usuarios cargados:', users);
    console.log('🔍 UserDataManager disponible en loadUsers:', !!window.UserDataManager);
    
    let html = '';
    if (users && users.length > 0) {
        console.log(`📊 Generando HTML para ${users.length} usuarios...`);
        users.forEach((user, index) => {
            console.log(`📝 Generando fila ${index + 1} para usuario:`, user);
            html += `
                <tr>
                    <td>${user.id}</td>
                    <td>
                        <div class="user-avatar-small">
                            <i class="fas fa-user"></i>
                        </div>
                    </td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${formatDate(user.registeredAt)}</td>
                    <td>
                        <span class="status ${user.status}">${getStatusText(user.status)}</span>
                    </td>
                    <td>
                        <button class="btn btn-outline btn-sm" onclick="viewUserDetails(${user.id})" title="Ver detalles">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="editUser(${user.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        console.log('⚠️ No hay usuarios, mostrando mensaje de "no hay datos"');
        html = '<tr><td colspan="7">No hay usuarios disponibles</td></tr>';
    }
    
    console.log('🔄 HTML usuarios generado:', html);
    tableBody.innerHTML = html;
    console.log('✅ Tabla de usuarios actualizada');
}

// Obtener usuarios
function getUsers() {
    console.log('🔄 Generando usuarios simulados...');
    console.log('🔍 UserDataManager disponible en getUsers:', !!window.UserDataManager);
    
    // Intentar usar UserDataManager si está disponible
    if (window.UserDataManager) {
        try {
            const userDataUsers = window.UserDataManager.getUsers();
            console.log('👥 Usuarios del UserDataManager:', userDataUsers);
            if (userDataUsers && userDataUsers.length > 0) {
                return userDataUsers;
            }
        } catch (error) {
            console.error('❌ Error al obtener usuarios del UserDataManager:', error);
        }
    }
    
    // Simular base de datos de usuarios como fallback
    const users = [
        {
            id: 1,
            name: 'María García',
            email: 'maria@test.com',
            registeredAt: '2024-12-10',
            status: 'active'
        },
        {
            id: 2,
            name: 'Juan López',
            email: 'juan@test.com',
            registeredAt: '2024-12-09',
            status: 'active'
        },
        {
            id: 3,
            name: 'Ana Martínez',
            email: 'ana@test.com',
            registeredAt: '2024-12-08',
            status: 'pending'
        },
        {
            id: 4,
            name: 'Carlos Rodríguez',
            email: 'carlos@test.com',
            registeredAt: '2024-12-07',
            status: 'active'
        },
        {
            id: 5,
            name: 'Laura Fernández',
            email: 'laura@test.com',
            registeredAt: '2024-12-06',
            status: 'inactive'
        },
        {
            id: 6,
            name: 'Roberto Silva',
            email: 'roberto@test.com',
            registeredAt: '2024-12-05',
            status: 'active'
        }
    ];
    
    console.log('👤 Usuarios simulados generados:', users);
    return users;
}

// Función auxiliar para obtener el texto del estado
function getStatusText(status) {
    const statusMap = {
        'active': 'Activo',
        'pending': 'Pendiente',
        'inactive': 'Inactivo'
    };
    return statusMap[status] || status;
}

// Función placeholder para ver detalles del usuario
function viewUserDetails(userId) {
    console.log('Ver detalles del usuario:', userId);
    // Aquí se implementaría la lógica para mostrar detalles del usuario
    alert(`Ver detalles del usuario ${userId}`);
}

// Función placeholder para editar usuario
function editUser(userId) {
    console.log('Editar usuario:', userId);
    // Aquí se implementaría la lógica para editar el usuario
    alert(`Editar usuario ${userId}`);
}

// Inicializar modal de paquetes
function initPackageModal() {
    const addPackageBtn = document.getElementById('addPackageBtn');
    const packageModal = document.getElementById('packageModal');
    const closeModal = document.getElementById('closePackageModal');
    const cancelBtn = document.getElementById('cancelPackage');
    const saveBtn = document.getElementById('savePackage');
    const addDateBtn = document.getElementById('addDateBtn');
    
    // Abrir modal para nuevo paquete
    if (addPackageBtn) {
        addPackageBtn.addEventListener('click', function() {
            openPackageModal();
        });
    }
    
    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closePackageModal();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closePackageModal();
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (packageModal) {
        packageModal.addEventListener('click', (e) => {
            if (e.target === packageModal) {
                closePackageModal();
            }
        });
    }
    
    // Guardar paquete
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSavePackage);
    }
    
    // Agregar fecha disponible
    if (addDateBtn) {
        addDateBtn.addEventListener('click', addAvailableDate);
    }
    
    // Inicializar gestión de fechas
    initDatesManagement();
}

// Abrir modal de paquete
function openPackageModal(packageId = null) {
    const modal = document.getElementById('packageModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('packageForm');
    
    if (packageId) {
        // Modo edición
        modalTitle.textContent = 'Editar Paquete';
        loadPackageData(packageId);
        form.dataset.editId = packageId;
    } else {
        // Modo creación
        modalTitle.textContent = 'Nuevo Paquete';
        form.reset();
        delete form.dataset.editId;
        // Limpiar fechas para nuevo paquete
        loadAvailableDates([]);
    }
    
    modal.classList.add('active');
}

// Cerrar modal de paquete
function closePackageModal() {
    const modal = document.getElementById('packageModal');
    modal.classList.remove('active');
}

// Cargar datos del paquete para edición
function loadPackageData(packageId) {
    const package = window.PackageManager.getPackageById(packageId);
    
    if (!package) return;
    
    // Llenar formulario
    document.getElementById('packageDestination').value = package.title;
    document.getElementById('packageDuration').value = package.duration;
    document.getElementById('packagePrice').value = package.price;
    document.getElementById('packageRating').value = package.rating;
    document.getElementById('packageDescription').value = package.description;
    document.getElementById('packageImage').value = package.image;
    document.getElementById('packageStatus').value = package.status;
    
    // Cargar fechas disponibles
    loadAvailableDates(package.availableDates || []);
}

// Manejar guardado de paquete
function handleSavePackage() {
    const form = document.getElementById('packageForm');
    const editId = form.dataset.editId;
    
    if (!validatePackageForm(form)) {
        return;
    }
    
    const packageData = {
        title: document.getElementById('packageDestination').value,
        duration: parseInt(document.getElementById('packageDuration').value),
        price: parseInt(document.getElementById('packagePrice').value),
        rating: parseFloat(document.getElementById('packageRating').value),
        description: document.getElementById('packageDescription').value,
        image: document.getElementById('packageImage').value,
        status: document.getElementById('packageStatus').value,
        destination: 'Europa', // Por defecto, se puede mejorar
        category: 'Cultural',   // Por defecto, se puede mejorar
        availableDates: getAvailableDatesFromForm()
    };
    
    try {
        if (editId) {
            // Editar paquete existente
            window.PackageManager.updatePackage(parseInt(editId), packageData);
            showNotification('Paquete actualizado exitosamente', 'success');
        } else {
            // Crear nuevo paquete
            window.PackageManager.addPackage(packageData);
            showNotification('Paquete creado exitosamente', 'success');
        }
        
        // Cerrar modal y limpiar formulario
        closePackageModal();
        form.reset();
        delete form.dataset.editId;
        
        // Limpiar fechas
        loadAvailableDates([]);
        
    } catch (error) {
        console.error('Error al guardar paquete:', error);
        showNotification('Error al guardar el paquete', 'error');
    }
}

// Validar formulario de paquete
function validatePackageForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e1e5e9';
        }
    });
    
    return isValid;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Ver detalles del usuario
function viewUserDetails(userId) {
    showNotification('Funcionalidad de detalles de usuario en desarrollo', 'info');
}

// Inicializar filtros de pagos
function initPaymentFilters() {
    const statusFilter = document.getElementById('paymentStatusFilter');
    const dateFilter = document.getElementById('paymentDateFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterPayments();
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterPayments();
        });
    }
}

// Filtrar pagos
function filterPayments() {
    const statusFilter = document.getElementById('paymentStatusFilter');
    const dateFilter = document.getElementById('paymentDateFilter');
    
    const status = statusFilter ? statusFilter.value : '';
    const date = dateFilter ? dateFilter.value : '';
    
    // Aquí se implementaría la lógica de filtrado
    console.log('Filtros aplicados:', { status, date });
    
    // Recargar tabla con filtros
    loadPaymentsHistory();
}

// Inicializar funcionalidad de exportación
function initExportFunctionality() {
    const exportBtn = document.getElementById('exportPayments');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportPayments();
        });
    }
}

// Exportar pagos
function exportPayments() {
    showNotification('Exportando datos de pagos...', 'info');
    
    // Simular exportación
    setTimeout(() => {
        showNotification('Datos exportados exitosamente', 'success');
    }, 2000);
}

// Inicializar FAQ
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle respuesta
            answer.classList.toggle('active');
            
            // Rotar icono
            if (answer.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Obtener texto del estado de pago
function getPaymentStatusText(status) {
    switch (status) {
        case 'completed': return 'Completado';
        case 'pending': return 'Pendiente';
        case 'failed': return 'Fallido';
        default: return 'Desconocido';
    }
}

// Cerrar sesión
function logout() {
    try {
        localStorage.removeItem('userSession');
        localStorage.removeItem('rememberMe');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// ==========================
// Gestión de Fechas Disponibles
// ==========================

// Inicializar gestión de fechas
function initDatesManagement() {
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('packageDate');
    if (dateInput) {
        dateInput.min = today;
    }
}

// Agregar fecha disponible
function addAvailableDate() {
    const dateInput = document.getElementById('packageDate');
    const datesList = document.getElementById('datesList');
    
    if (!dateInput || !datesList) return;
    
    const selectedDate = dateInput.value;
    if (!selectedDate) {
        showNotification('Por favor selecciona una fecha', 'error');
        return;
    }
    
    // Verificar si la fecha ya existe
    const existingDates = Array.from(datesList.querySelectorAll('.date-tag'))
        .map(tag => tag.dataset.date);
    
    if (existingDates.includes(selectedDate)) {
        showNotification('Esta fecha ya está agregada', 'error');
        return;
    }
    
    // Crear tag de fecha
    const dateTag = document.createElement('div');
    dateTag.className = 'date-tag';
    dateTag.dataset.date = selectedDate;
    dateTag.innerHTML = `
        <span>${formatDateForDisplay(selectedDate)}</span>
        <button type="button" class="remove-date" onclick="removeAvailableDate(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    datesList.appendChild(dateTag);
    dateInput.value = '';
    
    showNotification('Fecha agregada correctamente', 'success');
}

// Remover fecha disponible
function removeAvailableDate(button) {
    const dateTag = button.closest('.date-tag');
    if (dateTag) {
        dateTag.remove();
        showNotification('Fecha removida', 'info');
    }
}

// Cargar fechas disponibles en el formulario
function loadAvailableDates(dates = []) {
    const datesList = document.getElementById('datesList');
    if (!datesList) return;
    
    datesList.innerHTML = '';
    
    dates.forEach(date => {
        const dateTag = document.createElement('div');
        dateTag.className = 'date-tag';
        dateTag.dataset.date = date;
        dateTag.innerHTML = `
            <span>${formatDateForDisplay(date)}</span>
            <button type="button" class="remove-date" onclick="removeAvailableDate(this)">
                <i class="fas fa-times"></i>
            </button>
        `;
        datesList.appendChild(dateTag);
    });
}

// Obtener fechas disponibles del formulario
function getAvailableDatesFromForm() {
    const datesList = document.getElementById('datesList');
    if (!datesList) return [];
    
    return Array.from(datesList.querySelectorAll('.date-tag'))
        .map(tag => tag.dataset.date)
        .sort();
}

// Formatear fecha para mostrar
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
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

// Exportar funciones para uso global
window.AdminManager = {
    editPackage,
    deletePackage,
    viewUserDetails,
    exportPayments,
    logout
};
