// JavaScript específico para el dashboard del administrador

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard del administrador
    initAdminDashboard();
    
    // Configurar eventos
    setupAdminDashboardEvents();
});

function initAdminDashboard() {
    console.log('Inicializando dashboard del administrador...');
    
    // Verificar autenticación y rol
    const user = UserManager.getCurrentUser();
    if (!user) {
        Notification.error('Debes iniciar sesión para acceder al panel de administración');
        Navigation.goTo('login.html');
        return;
    }
    
    if (user.role !== UserManager.roles.ADMIN) {
        Notification.error('No tienes permisos para acceder al panel de administración');
        Navigation.goToDashboard();
        return;
    }
    
    // Actualizar información del usuario
    updateAdminInfo(user);
    
    // Cargar datos del dashboard
    loadAdminDashboardData();
    
    // Cargar actividad del sistema
    loadSystemActivity();
}

function setupAdminDashboardEvents() {
    // Eventos específicos del dashboard del administrador
    console.log('Configurando eventos del dashboard del administrador...');
}

function updateAdminInfo(user) {
    // Actualizar saludo del administrador
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Panel de Administración - ${user.name}`;
    }
    
    // Actualizar avatar
    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        avatarElement.textContent = user.avatar;
    }
    
    // Actualizar título de la página
    document.title = `Admin Dashboard - ${user.name} - TravelApp`;
}

function loadAdminDashboardData() {
    // Cargar estadísticas generales
    loadGeneralStats();
}

function loadGeneralStats() {
    // Obtener datos de todas las entidades
    const usuarios = Storage.load('registered_users') || [];
    const hoteles = Storage.load('hoteles') || [];
    const restaurantes = Storage.load('restaurantes') || [];
    const actividades = Storage.load('actividades') || [];
    
    // Calcular estadísticas
    const totalUsuarios = usuarios.length;
    const totalHoteles = hoteles.filter(h => h.activo).length;
    const totalRestaurantes = restaurantes.filter(r => r.activo).length;
    const totalActividades = actividades.filter(a => a.activo).length;
    const pendientesVerificacion = usuarios.filter(u => u.status === 'pending_verification').length;
    const ingresosTotales = calcularIngresosTotales();
    
    // Actualizar estadísticas en la interfaz
    updateStatsDisplay(totalUsuarios, totalHoteles, totalRestaurantes, totalActividades, pendientesVerificacion, ingresosTotales);
}

function updateStatsDisplay(usuarios, hoteles, restaurantes, actividades, pendientes, ingresos) {
    const elements = {
        totalUsuarios: document.getElementById('totalUsuarios'),
        totalHoteles: document.getElementById('totalHoteles'),
        totalRestaurantes: document.getElementById('totalRestaurantes'),
        totalActividades: document.getElementById('totalActividades'),
        pendientesVerificacion: document.getElementById('pendientesVerificacion'),
        ingresosTotales: document.getElementById('ingresosTotales')
    };
    
    if (elements.totalUsuarios) elements.totalUsuarios.textContent = usuarios;
    if (elements.totalHoteles) elements.totalHoteles.textContent = hoteles;
    if (elements.totalRestaurantes) elements.totalRestaurantes.textContent = restaurantes;
    if (elements.totalActividades) elements.totalActividades.textContent = actividades;
    if (elements.pendientesVerificacion) elements.pendientesVerificacion.textContent = pendientes;
    if (elements.ingresosTotales) elements.ingresosTotales.textContent = `$${ingresos}`;
}

function calcularIngresosTotales() {
    // Simular cálculo de ingresos totales
    const reservas = Storage.load('user_reservas') || [];
    return reservas.reduce((total, reserva) => total + (reserva.precio || 0), 0);
}

function loadSystemActivity() {
    const activityList = document.getElementById('systemActivityList');
    if (!activityList) return;
    
    // Obtener actividad del sistema
    const actividades = Storage.load('system_activity') || getDefaultSystemActivity();
    
    // Limpiar lista actual
    activityList.innerHTML = '';
    
    // Agregar actividades
    actividades.slice(0, 5).forEach(actividad => {
        const activityItem = createSystemActivityItem(actividad);
        activityList.appendChild(activityItem);
    });
}

function getDefaultSystemActivity() {
    return [
        {
            titulo: 'Sistema Iniciado',
            descripcion: 'El sistema de administración ha sido iniciado',
            icono: '🚀',
            fecha: new Date().toISOString()
        }
    ];
}

function createSystemActivityItem(actividad) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    item.innerHTML = `
        <div class="activity-icon">${actividad.icono}</div>
        <div class="activity-content">
            <h4>${actividad.titulo}</h4>
            <p>${actividad.descripcion}</p>
            <span class="activity-time">${formatActivityTime(actividad.fecha)}</span>
        </div>
    `;
    
    return item;
}

function formatActivityTime(fecha) {
    const now = new Date();
    const activityDate = new Date(fecha);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
        return 'Hace unos minutos';
    } else if (diffInHours < 24) {
        return `Hace ${diffInHours} horas`;
    } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `Hace ${diffInDays} días`;
    }
}

function showVerificaciones() {
    const modal = document.getElementById('verificacionesModal');
    if (!modal) return;
    
    // Cargar verificaciones pendientes
    loadVerificacionesPendientes();
    
    // Mostrar modal
    Modal.show('verificacionesModal');
}

function loadVerificacionesPendientes() {
    const verificacionesList = document.getElementById('verificacionesList');
    if (!verificacionesList) return;
    
    // Obtener usuarios pendientes de verificación
    const usuarios = Storage.load('registered_users') || [];
    const pendientes = usuarios.filter(u => u.status === 'pending_verification');
    
    if (pendientes.length === 0) {
        verificacionesList.innerHTML = `
            <div class="no-verificaciones">
                <div class="no-verificaciones-icon">✅</div>
                <h4>No hay verificaciones pendientes</h4>
                <p>Todos los registros han sido procesados</p>
            </div>
        `;
        return;
    }
    
    // Mostrar verificaciones pendientes
    verificacionesList.innerHTML = '';
    pendientes.forEach(usuario => {
        const verificacionItem = createVerificacionItem(usuario);
        verificacionesList.appendChild(verificacionItem);
    });
}

function createVerificacionItem(usuario) {
    const item = document.createElement('div');
    item.className = 'verificacion-item';
    
    item.innerHTML = `
        <div class="verificacion-header">
            <h4 class="verificacion-titulo">${usuario.name}</h4>
            <span class="verificacion-tipo">${usuario.role}</span>
        </div>
        <p>Registro pendiente de verificación</p>
        <div class="verificacion-details">
            <div class="verificacion-detail">
                <strong>Email:</strong> ${usuario.email}
            </div>
            <div class="verificacion-detail">
                <strong>Teléfono:</strong> ${usuario.phone}
            </div>
            <div class="verificacion-detail">
                <strong>Ubicación:</strong> ${usuario.location}
            </div>
            <div class="verificacion-detail">
                <strong>Fecha:</strong> ${DateUtils.format(usuario.registrationDate)}
            </div>
        </div>
        <div class="verificacion-actions">
            <button class="verificacion-btn aprobar" onclick="aprobarVerificacion('${usuario.id}')">
                Aprobar
            </button>
            <button class="verificacion-btn rechazar" onclick="rechazarVerificacion('${usuario.id}')">
                Rechazar
            </button>
            <button class="verificacion-btn detalles" onclick="verDetallesUsuario('${usuario.id}')">
                Detalles
            </button>
        </div>
    `;
    
    return item;
}

function aprobarVerificacion(usuarioId) {
    // Obtener usuarios
    const usuarios = Storage.load('registered_users') || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    if (!usuario) {
        Notification.error('Usuario no encontrado');
        return;
    }
    
    // Actualizar estado
    usuario.status = 'verified';
    usuario.verificationDate = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('registered_users', usuarios);
    
    // Agregar a actividad del sistema
    addSystemActivity({
        titulo: 'Usuario Verificado',
        descripcion: `${usuario.name} (${usuario.role}) ha sido verificado`,
        icono: '✅',
        fecha: new Date().toISOString()
    });
    
    // Mostrar notificación
    Notification.success(`${usuario.name} ha sido verificado exitosamente`);
    
    // Recargar verificaciones
    loadVerificacionesPendientes();
    loadGeneralStats();
}

function rechazarVerificacion(usuarioId) {
    if (!confirm('¿Estás seguro de que quieres rechazar esta verificación?')) {
        return;
    }
    
    // Obtener usuarios
    const usuarios = Storage.load('registered_users') || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    if (!usuario) {
        Notification.error('Usuario no encontrado');
        return;
    }
    
    // Actualizar estado
    usuario.status = 'rejected';
    usuario.rejectionDate = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('registered_users', usuarios);
    
    // Agregar a actividad del sistema
    addSystemActivity({
        titulo: 'Verificación Rechazada',
        descripcion: `${usuario.name} (${usuario.role}) ha sido rechazado`,
        icono: '❌',
        fecha: new Date().toISOString()
    });
    
    // Mostrar notificación
    Notification.warning(`${usuario.name} ha sido rechazado`);
    
    // Recargar verificaciones
    loadVerificacionesPendientes();
    loadGeneralStats();
}

function verDetallesUsuario(usuarioId) {
    // Obtener usuario
    const usuarios = Storage.load('registered_users') || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    if (!usuario) {
        Notification.error('Usuario no encontrado');
        return;
    }
    
    // Mostrar detalles en un modal o alert
    const detalles = `
        Nombre: ${usuario.name}
        Email: ${usuario.email}
        Teléfono: ${usuario.phone}
        Ubicación: ${usuario.location}
        Rol: ${usuario.role}
        Estado: ${usuario.status}
        Fecha de Registro: ${DateUtils.format(usuario.registrationDate)}
    `;
    
    alert(detalles);
}

function showUsuarios() {
    const modal = document.getElementById('usuariosModal');
    if (!modal) return;
    
    // Cargar usuarios
    loadUsuarios();
    
    // Mostrar modal
    Modal.show('usuariosModal');
}

function loadUsuarios() {
    const usuariosList = document.getElementById('usuariosList');
    if (!usuariosList) return;
    
    // Obtener todos los usuarios
    const usuarios = Storage.load('registered_users') || [];
    
    if (usuarios.length === 0) {
        usuariosList.innerHTML = `
            <div class="no-usuarios">
                <div class="no-usuarios-icon">👥</div>
                <h4>No hay usuarios registrados</h4>
                <p>Los usuarios aparecerán aquí cuando se registren</p>
            </div>
        `;
        return;
    }
    
    // Mostrar usuarios
    usuariosList.innerHTML = '';
    usuarios.forEach(usuario => {
        const usuarioItem = createUsuarioItem(usuario);
        usuariosList.appendChild(usuarioItem);
    });
}

function createUsuarioItem(usuario) {
    const item = document.createElement('div');
    item.className = 'usuario-item';
    
    const estadoClass = usuario.status === 'verified' ? 'activo' : 
                       usuario.status === 'pending_verification' ? 'pendiente' : 'inactivo';
    
    item.innerHTML = `
        <div class="usuario-header">
            <div class="usuario-info">
                <span class="usuario-avatar">${getAvatarForRole(usuario.role)}</span>
                <span class="usuario-nombre">${usuario.name}</span>
            </div>
            <span class="usuario-rol estado-${estadoClass}">${usuario.status}</span>
        </div>
        <div class="usuario-details">
            <div class="usuario-detail">
                <strong>Email:</strong> ${usuario.email}
            </div>
            <div class="usuario-detail">
                <strong>Rol:</strong> ${usuario.role}
            </div>
            <div class="usuario-detail">
                <strong>Ubicación:</strong> ${usuario.location}
            </div>
            <div class="usuario-detail">
                <strong>Registro:</strong> ${DateUtils.format(usuario.registrationDate)}
            </div>
        </div>
        <div class="usuario-actions">
            <button class="usuario-btn editar" onclick="editarUsuario('${usuario.id}')">
                Editar
            </button>
            ${usuario.status === 'verified' ? 
                `<button class="usuario-btn desactivar" onclick="desactivarUsuario('${usuario.id}')">Desactivar</button>` :
                `<button class="usuario-btn activar" onclick="activarUsuario('${usuario.id}')">Activar</button>`
            }
        </div>
    `;
    
    return item;
}

function getAvatarForRole(role) {
    const avatars = {
        'hotel': '🏨',
        'restaurante': '🍽️',
        'actividades': '🎯',
        'usuario': '👤',
        'admin': '👨‍💼'
    };
    return avatars[role] || '👤';
}

function editarUsuario(usuarioId) {
    Notification.info('Función de edición en desarrollo');
}

function activarUsuario(usuarioId) {
    // Obtener usuarios
    const usuarios = Storage.load('registered_users') || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    if (!usuario) {
        Notification.error('Usuario no encontrado');
        return;
    }
    
    // Actualizar estado
    usuario.status = 'verified';
    usuario.activationDate = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('registered_users', usuarios);
    
    // Mostrar notificación
    Notification.success(`${usuario.name} ha sido activado`);
    
    // Recargar usuarios
    loadUsuarios();
    loadGeneralStats();
}

function desactivarUsuario(usuarioId) {
    if (!confirm('¿Estás seguro de que quieres desactivar este usuario?')) {
        return;
    }
    
    // Obtener usuarios
    const usuarios = Storage.load('registered_users') || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    if (!usuario) {
        Notification.error('Usuario no encontrado');
        return;
    }
    
    // Actualizar estado
    usuario.status = 'inactive';
    usuario.deactivationDate = new Date().toISOString();
    
    // Guardar cambios
    Storage.save('registered_users', usuarios);
    
    // Mostrar notificación
    Notification.warning(`${usuario.name} ha sido desactivado`);
    
    // Recargar usuarios
    loadUsuarios();
    loadGeneralStats();
}

function showReportes() {
    const modal = document.getElementById('reportesModal');
    if (!modal) return;
    
    // Cargar reportes
    loadReportes();
    
    // Mostrar modal
    Modal.show('reportesModal');
}

function loadReportes() {
    const reportesContent = document.getElementById('reportesContent');
    if (!reportesContent) return;
    
    // Generar reportes
    const reportes = generarReportes();
    
    reportesContent.innerHTML = `
        <div class="reporte-section">
            <h4>Estadísticas Generales</h4>
            <div class="reporte-grid">
                <div class="reporte-item">
                    <div class="reporte-valor">${reportes.totalUsuarios}</div>
                    <div class="reporte-etiqueta">Usuarios Totales</div>
                </div>
                <div class="reporte-item">
                    <div class="reporte-valor">${reportes.totalReservas}</div>
                    <div class="reporte-etiqueta">Reservas Totales</div>
                </div>
                <div class="reporte-item">
                    <div class="reporte-valor">$${reportes.ingresosTotales}</div>
                    <div class="reporte-etiqueta">Ingresos Totales</div>
                </div>
                <div class="reporte-item">
                    <div class="reporte-valor">${reportes.tasaConversion}%</div>
                    <div class="reporte-etiqueta">Tasa de Conversión</div>
                </div>
            </div>
        </div>
        
        <div class="reporte-section">
            <h4>Actividad por Mes</h4>
            <div class="reporte-grid">
                <div class="reporte-item">
                    <div class="reporte-valor">${reportes.registrosEsteMes}</div>
                    <div class="reporte-etiqueta">Registros Este Mes</div>
                </div>
                <div class="reporte-item">
                    <div class="reporte-valor">${reportes.reservasEsteMes}</div>
                    <div class="reporte-etiqueta">Reservas Este Mes</div>
                </div>
            </div>
        </div>
    `;
}

function generarReportes() {
    const usuarios = Storage.load('registered_users') || [];
    const reservas = Storage.load('user_reservas') || [];
    
    const totalUsuarios = usuarios.length;
    const totalReservas = reservas.length;
    const ingresosTotales = reservas.reduce((total, r) => total + (r.precio || 0), 0);
    const tasaConversion = totalUsuarios > 0 ? Math.round((totalReservas / totalUsuarios) * 100) : 0;
    
    // Calcular registros y reservas de este mes
    const ahora = new Date();
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    
    const registrosEsteMes = usuarios.filter(u => new Date(u.registrationDate) >= inicioMes).length;
    const reservasEsteMes = reservas.filter(r => new Date(r.fecha) >= inicioMes).length;
    
    return {
        totalUsuarios,
        totalReservas,
        ingresosTotales,
        tasaConversion,
        registrosEsteMes,
        reservasEsteMes
    };
}

function showConfiguracion() {
    const modal = document.getElementById('configuracionModal');
    if (!modal) return;
    
    // Cargar configuración
    loadConfiguracion();
    
    // Mostrar modal
    Modal.show('configuracionModal');
}

function loadConfiguracion() {
    const configuracionContent = document.getElementById('configuracionContent');
    if (!configuracionContent) return;
    
    // Obtener configuración actual
    const config = Storage.load('system_config') || getDefaultConfig();
    
    configuracionContent.innerHTML = `
        <div class="config-section">
            <h4>Configuración General</h4>
            <div class="config-item">
                <span class="config-label">Mantenimiento del Sistema</span>
                <div class="config-control">
                    <div class="config-toggle ${config.maintenance ? 'active' : ''}" onclick="toggleMaintenance()"></div>
                </div>
            </div>
            <div class="config-item">
                <span class="config-label">Registros Automáticos</span>
                <div class="config-control">
                    <div class="config-toggle ${config.autoRegistration ? 'active' : ''}" onclick="toggleAutoRegistration()"></div>
                </div>
            </div>
            <div class="config-item">
                <span class="config-label">Notificaciones por Email</span>
                <div class="config-control">
                    <div class="config-toggle ${config.emailNotifications ? 'active' : ''}" onclick="toggleEmailNotifications()"></div>
                </div>
            </div>
        </div>
        
        <div class="config-section">
            <h4>Límites del Sistema</h4>
            <div class="config-item">
                <span class="config-label">Máximo de Usuarios</span>
                <div class="config-control">
                    <input type="number" class="config-input" value="${config.maxUsers}" onchange="updateMaxUsers(this.value)">
                </div>
            </div>
            <div class="config-item">
                <span class="config-label">Tiempo de Sesión (minutos)</span>
                <div class="config-control">
                    <input type="number" class="config-input" value="${config.sessionTimeout}" onchange="updateSessionTimeout(this.value)">
                </div>
            </div>
        </div>
        
        <div class="config-section">
            <h4>Acciones del Sistema</h4>
            <div class="config-item">
                <span class="config-label">Limpiar Datos Temporales</span>
                <div class="config-control">
                    <button class="config-btn" onclick="limpiarDatosTemporales()">Limpiar</button>
                </div>
            </div>
            <div class="config-item">
                <span class="config-label">Exportar Datos</span>
                <div class="config-control">
                    <button class="config-btn" onclick="exportarDatos()">Exportar</button>
                </div>
            </div>
        </div>
    `;
}

function getDefaultConfig() {
    return {
        maintenance: false,
        autoRegistration: true,
        emailNotifications: true,
        maxUsers: 1000,
        sessionTimeout: 60
    };
}

function toggleMaintenance() {
    const config = Storage.load('system_config') || getDefaultConfig();
    config.maintenance = !config.maintenance;
    Storage.save('system_config', config);
    loadConfiguracion();
    Notification.info(`Mantenimiento ${config.maintenance ? 'activado' : 'desactivado'}`);
}

function toggleAutoRegistration() {
    const config = Storage.load('system_config') || getDefaultConfig();
    config.autoRegistration = !config.autoRegistration;
    Storage.save('system_config', config);
    loadConfiguracion();
    Notification.info(`Registro automático ${config.autoRegistration ? 'activado' : 'desactivado'}`);
}

function toggleEmailNotifications() {
    const config = Storage.load('system_config') || getDefaultConfig();
    config.emailNotifications = !config.emailNotifications;
    Storage.save('system_config', config);
    loadConfiguracion();
    Notification.info(`Notificaciones por email ${config.emailNotifications ? 'activadas' : 'desactivadas'}`);
}

function updateMaxUsers(value) {
    const config = Storage.load('system_config') || getDefaultConfig();
    config.maxUsers = parseInt(value) || 1000;
    Storage.save('system_config', config);
    Notification.info('Límite de usuarios actualizado');
}

function updateSessionTimeout(value) {
    const config = Storage.load('system_config') || getDefaultConfig();
    config.sessionTimeout = parseInt(value) || 60;
    Storage.save('system_config', config);
    Notification.info('Tiempo de sesión actualizado');
}

function limpiarDatosTemporales() {
    if (confirm('¿Estás seguro de que quieres limpiar los datos temporales?')) {
        // Limpiar datos temporales (simulado)
        Notification.success('Datos temporales limpiados exitosamente');
        
        addSystemActivity({
            titulo: 'Limpieza de Datos',
            descripcion: 'Datos temporales del sistema han sido limpiados',
            icono: '🧹',
            fecha: new Date().toISOString()
        });
    }
}

function exportarDatos() {
    // Simular exportación de datos
    Notification.info('Exportando datos del sistema...');
    
    setTimeout(() => {
        Notification.success('Datos exportados exitosamente');
        
        addSystemActivity({
            titulo: 'Exportación de Datos',
            descripcion: 'Datos del sistema han sido exportados',
            icono: '📤',
            fecha: new Date().toISOString()
        });
    }, 2000);
}

function addSystemActivity(actividad) {
    const actividades = Storage.load('system_activity') || [];
    actividades.unshift(actividad);
    
    // Mantener solo las últimas 20 actividades
    if (actividades.length > 20) {
        actividades.splice(20);
    }
    
    Storage.save('system_activity', actividades);
    
    // Recargar actividad del sistema
    loadSystemActivity();
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
window.showVerificaciones = showVerificaciones;
window.showUsuarios = showUsuarios;
window.showReportes = showReportes;
window.showConfiguracion = showConfiguracion;
window.aprobarVerificacion = aprobarVerificacion;
window.rechazarVerificacion = rechazarVerificacion;
window.verDetallesUsuario = verDetallesUsuario;
window.editarUsuario = editarUsuario;
window.activarUsuario = activarUsuario;
window.desactivarUsuario = desactivarUsuario;
window.toggleMaintenance = toggleMaintenance;
window.toggleAutoRegistration = toggleAutoRegistration;
window.toggleEmailNotifications = toggleEmailNotifications;
window.updateMaxUsers = updateMaxUsers;
window.updateSessionTimeout = updateSessionTimeout;
window.limpiarDatosTemporales = limpiarDatosTemporales;
window.exportarDatos = exportarDatos;
window.logout = logout;
