// Ecuador Travel - Configuración de la Aplicación
// Archivo de configuración para personalizar la aplicación

const CONFIG = {
    // Información de la empresa
    company: {
        name: "Ecuador Travel",
        slogan: "Descubre la magia de Ecuador",
        logo: "🇪🇨",
        website: "https://ecuadortravel.com",
        email: "info@ecuadortravel.com"
    },

    // Configuración de WhatsApp
    whatsapp: {
        defaultNumber: "593987654321", // Número por defecto del administrador
        countryCode: "+593", // Código de país Ecuador
        messageTemplate: "🇪🇨 *SOLICITUD DE PAQUETE TURÍSTICO - ECUADOR TRAVEL*"
    },

    // Configuración de paquetes
    packages: {
        normal: {
            name: "Paquete Normal",
            basePrice: 150,
            maxPersons: 8,
            maxActivities: 2,
            duration: "3 días / 2 noches"
        },
        premium: {
            name: "Paquete Premium", 
            basePrice: 280,
            maxPersons: 8,
            maxActivities: 4,
            duration: "5 días / 4 noches"
        },
        superpremium: {
            name: "Paquete Superpremium",
            basePrice: 450,
            maxPersons: 8,
            maxActivities: 6,
            duration: "7 días / 6 noches"
        }
    },

    // Configuración de administración
    admin: {
        defaultCredentials: {
            username: "admin",
            password: "admin123"
        },
        sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
        maxLoginAttempts: 3
    },

    // Configuración de la interfaz
    ui: {
        theme: {
            primary: "#1e3a8a",
            secondary: "#3b82f6", 
            accent: "#06b6d4",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444"
        },
        breakpoints: {
            mobile: 420,
            tablet: 768,
            desktop: 1024
        },
        animations: {
            duration: 300, // milisegundos
            easing: "ease"
        }
    },

    // Configuración de datos
    data: {
        autoSave: true,
        saveInterval: 5000, // 5 segundos
        maxStorageSize: 10 * 1024 * 1024, // 10MB
        backupEnabled: true
    },

    // Configuración de validación
    validation: {
        minPersons: 1,
        maxPersons: 20,
        minPrice: 0,
        maxPrice: 10000,
        phoneRegex: /^[\+]?[1-9][\d]{0,15}$/,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    // Configuración de mensajes
    messages: {
        welcome: "¡Bienvenido a Ecuador Travel! Arma tu paquete turístico perfecto y vive una experiencia única en Ecuador.",
        success: {
            packageSaved: "Paquete guardado correctamente",
            dataExported: "Datos exportados correctamente",
            loginSuccess: "Login exitoso"
        },
        error: {
            loginFailed: "Usuario o contraseña incorrectos",
            dataLoadFailed: "Error cargando datos",
            saveFailed: "Error guardando datos"
        },
        confirm: {
            deletePackage: "¿Estás seguro de que quieres eliminar este paquete?",
            logout: "¿Estás seguro de que quieres cerrar sesión?",
            clearData: "¿Estás seguro de que quieres limpiar todos los datos?"
        }
    },

    // Configuración de características
    features: {
        enableFullDayTours: true,
        enableTransportSelection: true,
        enableAdminPanel: true,
        enableDataExport: true,
        enableOfflineMode: true,
        enableNotifications: true
    },

    // Configuración de desarrollo
    development: {
        debugMode: false,
        logLevel: "info", // debug, info, warn, error
        enableConsoleLogs: true,
        mockData: false
    }
};

// Función para obtener configuración
function getConfig(path = null) {
    if (path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], CONFIG);
    }
    return CONFIG;
}

// Función para actualizar configuración
function updateConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key], CONFIG);
    target[lastKey] = value;
}

// Función para validar configuración
function validateConfig() {
    const required = [
        'company.name',
        'whatsapp.defaultNumber',
        'packages.normal.basePrice',
        'admin.defaultCredentials.username'
    ];

    for (const path of required) {
        if (!getConfig(path)) {
            console.error(`Configuración requerida faltante: ${path}`);
            return false;
        }
    }
    return true;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.getConfig = getConfig;
    window.updateConfig = updateConfig;
    window.validateConfig = validateConfig;
}

// Validar configuración al cargar
if (typeof window !== 'undefined' && window.document) {
    document.addEventListener('DOMContentLoaded', () => {
        if (!validateConfig()) {
            console.warn('La configuración tiene errores. Algunas funciones pueden no funcionar correctamente.');
        }
    });
}

