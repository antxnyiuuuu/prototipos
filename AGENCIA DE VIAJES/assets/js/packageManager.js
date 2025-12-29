// Gestor de Paquetes - Sistema centralizado para manejar paquetes con localStorage
class PackageManager {
    constructor() {
        this.storageKey = 'vm_packages';
        this.initDefaultPackages();
    }

    // Inicializar paquetes por defecto si no existen
    initDefaultPackages() {
        if (!this.getPackages().length) {
            const defaultPackages = [
                {
                    id: 1,
                    title: 'Europa Clásica',
                    description: '8 días visitando París, Roma y Barcelona',
                    price: 1299,
                    duration: 8,
                    rating: 4.8,
                    image: '../assets/img/package1.jpg',
                    destination: 'Europa',
                    category: 'Cultural',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-15', '2024-09-22', '2024-10-01', '2024-10-15']
                },
                {
                    id: 2,
                    title: 'Caribe Exótico',
                    description: '6 días en Cancún con todo incluido',
                    price: 899,
                    duration: 6,
                    rating: 4.9,
                    image: '../assets/img/package2.jpg',
                    destination: 'América',
                    category: 'Playa',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-20', '2024-10-05', '2024-10-20', '2024-11-01']
                },
                {
                    id: 3,
                    title: 'Asia Misteriosa',
                    description: '10 días explorando Tailandia y Vietnam',
                    price: 1599,
                    duration: 10,
                    rating: 4.7,
                    image: '../assets/img/package3.jpg',
                    destination: 'Asia',
                    category: 'Cultural',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-25', '2024-10-10', '2024-10-25', '2024-11-10']
                },
                {
                    id: 4,
                    title: 'Safari Africano',
                    description: '7 días en Kenia y Tanzania',
                    price: 1899,
                    duration: 7,
                    rating: 4.9,
                    image: '../assets/img/package4.jpg',
                    destination: 'África',
                    category: 'Aventura',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-30', '2024-10-15', '2024-11-01', '2024-11-15']
                },
                {
                    id: 5,
                    title: 'Australia y Nueva Zelanda',
                    description: '14 días explorando Oceanía',
                    price: 2499,
                    duration: 14,
                    rating: 4.6,
                    image: '../assets/img/package5.jpg',
                    destination: 'Oceanía',
                    category: 'Aventura',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-10-05', '2024-10-20', '2024-11-05', '2024-11-20']
                },
                {
                    id: 6,
                    title: 'Islas Griegas',
                    description: '5 días en Santorini y Mykonos',
                    price: 799,
                    duration: 5,
                    rating: 4.8,
                    image: '../assets/img/package6.jpg',
                    destination: 'Europa',
                    category: 'Playa',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-18', '2024-10-02', '2024-10-16', '2024-10-30']
                },
                {
                    id: 7,
                    title: 'Japón Tradicional',
                    description: '9 días en Tokio, Kioto y Osaka',
                    price: 1799,
                    duration: 9,
                    rating: 4.9,
                    image: '../assets/img/package7.jpg',
                    destination: 'Asia',
                    category: 'Cultural',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-28', '2024-10-12', '2024-10-26', '2024-11-09']
                },
                {
                    id: 8,
                    title: 'Machu Picchu y Cusco',
                    description: '6 días en Perú',
                    price: 1199,
                    duration: 6,
                    rating: 4.7,
                    image: '../assets/img/package8.jpg',
                    destination: 'América',
                    category: 'Cultural',
                    available: true,
                    status: 'active',
                    availableDates: ['2024-09-22', '2024-10-06', '2024-10-20', '2024-11-03']
                }
            ];
            this.savePackages(defaultPackages);
        }
    }

    // Obtener todos los paquetes
    getPackages() {
        try {
            const packages = localStorage.getItem(this.storageKey);
            return packages ? JSON.parse(packages) : [];
        } catch (error) {
            console.error('Error al obtener paquetes:', error);
            return [];
        }
    }

    // Obtener paquetes activos (para mostrar en páginas públicas)
    getActivePackages() {
        return this.getPackages().filter(pkg => pkg.status === 'active' && pkg.available);
    }

    // Obtener paquete por ID
    getPackageById(id) {
        const packages = this.getPackages();
        return packages.find(pkg => pkg.id === id);
    }

    // Guardar paquetes en localStorage
    savePackages(packages) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(packages));
            this.notifyPackageChange();
        } catch (error) {
            console.error('Error al guardar paquetes:', error);
        }
    }

    // Agregar nuevo paquete
    addPackage(packageData) {
        const packages = this.getPackages();
        const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
        
        const newPackage = {
            ...packageData,
            id: newId,
            available: true,
            status: 'active'
        };
        
        packages.push(newPackage);
        this.savePackages(packages);
        return newPackage;
    }

    // Actualizar paquete existente
    updatePackage(id, packageData) {
        const packages = this.getPackages();
        const index = packages.findIndex(pkg => pkg.id === id);
        
        if (index !== -1) {
            packages[index] = { ...packages[index], ...packageData };
            this.savePackages(packages);
            return packages[index];
        }
        
        return null;
    }

    // Eliminar paquete
    deletePackage(id) {
        const packages = this.getPackages();
        const filteredPackages = packages.filter(pkg => pkg.id !== id);
        this.savePackages(filteredPackages);
    }

    // Notificar cambios a otras páginas
    notifyPackageChange() {
        // Disparar evento personalizado para notificar cambios
        window.dispatchEvent(new CustomEvent('packagesChanged'));
    }

    // Filtrar paquetes
    filterPackages(filters = {}) {
        let packages = this.getActivePackages();
        
        if (filters.destination) {
            packages = packages.filter(pkg => pkg.destination === filters.destination);
        }
        
        if (filters.category) {
            packages = packages.filter(pkg => pkg.category === filters.category);
        }
        
        if (filters.minPrice) {
            packages = packages.filter(pkg => pkg.price >= filters.minPrice);
        }
        
        if (filters.maxPrice) {
            packages = packages.filter(pkg => pkg.price <= filters.maxPrice);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            packages = packages.filter(pkg => 
                pkg.title.toLowerCase().includes(searchTerm) ||
                pkg.description.toLowerCase().includes(searchTerm) ||
                pkg.destination.toLowerCase().includes(searchTerm)
            );
        }
        
        return packages;
    }

    // Ordenar paquetes
    sortPackages(packages, sortBy = 'title', order = 'asc') {
        return packages.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (order === 'desc') {
                return bValue > aValue ? 1 : -1;
            } else {
                return aValue > bValue ? 1 : -1;
            }
        });
    }
}

// Instancia global del gestor de paquetes
window.PackageManager = new PackageManager();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PackageManager;
}
