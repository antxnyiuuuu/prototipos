// Datos de productos para Motorgsa
let products = [
    // ACCESORIOS
    {
        id: 1,
        name: "ARCO TROZADOR",
        description: "ARCO TROZADOR",
        price: 9.99,
        category: "ACCESORIOS",
        stock: 25,
        image: "https://www.elferretero.com.ec/cdn/shop/products/00330878.jpg?v=1589629206",
        brand: "Motorgsa",
        distributorDiscountPercent: 15
    },
    {
        id: 2,
        name: "BANDEJA SEMILLA NUM CELULA 12 x 24 IGUAL288",
        description: "Bandeja de 406 células, Esta hecha para la atomización",
        price: 20.50,
        category: "ACCESORIOS",
        stock: 18,
        image: "https://m.media-amazon.com/images/I/71rMDrnXxeL._UF894,1000_QL80_.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 12
    },
    {
        id: 3,
        name: "BOQUILLAS PARA FUMIGADORAS",
        description: "BOQUILLAS PARA FUMIGADORAS",
        price: 32.75,
        category: "ACCESORIOS",
        stock: 30,
        image: "https://www.echo-latinamerica.com/getattachment/cc1de5a4-4970-4cf6-b606-516c7714f8b6/v2_ECHO_SprayerAcc_99944100340_StaticShot1.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 10
    },

    // ARADORAS - MOTOCULTORES - SEMBRADORAS
    {
        id: 4,
        name: "ARADORA GASOLINA GLT",
        description: "La aradora GLT 105 301 cuenta con motor de 4 tiempos OHV y 196 cc de desplazamiento.",
        price: 1250.00,
        category: "ARADORAS - MOTOCULTORES - SEMBRADORAS",
        stock: 8,
        image: "https://aradoras.com/wp-content/uploads/2023/06/Motoazada-de-jardin-de-gasolina-55752-motoazada-600-fresadora-de-tierra-fresadora-de-cultivador-ancho-de-trabajo-36-cm-60-cm-autopropulsada-AWZ.png",
        brand: "Motorgsa",
        distributorDiscountPercent: 20
    },
    {
        id: 5,
        name: "SEMBRADORA MANUAL",
        description: "Para abonar y sembrar todo tipo de semillas, maíz, fréjol, quinua, alverja, etc",
        price: 450.00,
        category: "ARADORAS - MOTOCULTORES - SEMBRADORAS",
        stock: 12,
        image: "https://s.alicdn.com/@sc04/kf/H1362902557444fc3a5543647dd56cc43d/Hand-Ploughing-Machine-Portable-Ploughing-Machine-Hand-Held-Ploughing-Machine.jpg_300x300.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 18
    },

    // BALANZAS
    {
        id: 6,
        name: "BALANZA 300 JC216PBY",
        description: "Resistente al agua, Luz Led, Plataforma de acero",
        price: 200.00,
        category: "BALANZAS",
        stock: 15,
        image: "https://balanzassanchezecu.com/wp-content/uploads/2024/08/Diseno_sin_titulo_-_2024-08-06T181021.415-removebg-preview-300x300.png",
        brand: "Motorgsa",
        distributorDiscountPercent: 12
    },

    // DESBROZADORAS - PODADORAS DE ALTURA - TIJERAS
    {
        id: 7,
        name: "CORTASETOS TSUMURA 3CX-600H",
        description: "La podadora de setos modelo 3CX-600 H está equipada con un motor de gasolina 2 tiempos de 25.4 cc, ideal para el mantenimiento profesional de jardines y arbustos.",
        price: 420.00,
        category: "DESBROZADORAS - PODADORAS DE ALTURA - TIJERAS",
        stock: 14,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTcr22h1JnZV9y3fCnVRN4jNXGhI-mycbMWudHPe5BPO-0J_Cv1",
        brand: "Motorgsa",
        distributorDiscountPercent: 18
    },
    // FUMIGADORAS - PULVERIZADORAS
    {
        id: 8,
        name: "DRONES DE FUMIGACIÓN 10L 20L",
        description: "DRONES DE FUMIGACIÓN 10L 20L",
        price: 95.00,
        category: "FUMIGADORAS - PULVERIZADORAS",
        stock: 18,
        image: "https://i0.wp.com/idc.apddrones.com/wp-content/uploads/2023/08/Imagenes-internas-blogs-drones-para-fumigar.jpg?fit=800%2C400&ssl=1",
        brand: "Motorgsa",
        distributorDiscountPercent: 15
    },


    // GENERADORES
    {
        id: 9,
        name: "GENERADOR GASOLINA BS2500-4",
        description: "Generador a gasolina, peso 41.9kg",
        price: 590.00,
        category: "GENERADORES",
        stock: 8,
        image: "https://image.made-in-china.com/202f0j00ScrosGfRYUkC/Generators-2-8kw-Gasoline-Generator-with-Handle-and-Wheel-for-RV-Camping-BS3000-IV.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 20
    },


    // HIDROLAVADORAS / ASPIRADORAS
    {
        id: 10,
        name: "ASPIRADORA WEST",
        description: "Esta aspiradora cuenta con 2 tubos de plástico y un tubo giratorio de 360°, lo que facilita el acceso a rincones difíciles. Incluye un cepillo anti-polvo ideal para superficies delicadas.",
        price: 280.00,
        category: "HIDROLVADORAS / ASPIRADORAS",
        stock: 15,
        image: "https://http2.mlstatic.com/D_NQ_NP_936353-MLU74272120622_022024-O.webp",
        brand: "Motorgsa",
        distributorDiscountPercent: 15
    },


    // MANGUERAS - ASPERSORES - COLLARINES - ACOPLES
    {
        id: 11 ,
        name: "ABRAZADERA ESPIRAL",
        description: "Material: Acero Galvanizado",
        price: 45.00,
        category: "MANGUERAS - ASPERSORES - COLLARINES - ACOPLES",
        stock: 25,
        image: "https://es.airhosecoupling.com/upload/7107/spiral-clamp-3871360.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 12
    },

    // MOTORES - MOTOBOMBAS - BOMBAS - TURBINAS
    {
        id: 12,
        name: "BOMBA CENTRIFUGA XA 100/40, 80/40, 125/32 Y 150/40",
        description: "La bomba centrífuga XA 100/40 ofrece alta eficiencia y caudal constante. Con varios modelos, es ideal para aplicaciones industriales exigentes.",
        price: 580.00,
        category: "MOTORES - MOTOBOMBAS - BOMBAS - TURBINAS",
        stock: 10,
        image: "https://image.made-in-china.com/2f0j00QTuMrNRFqzcY/Horizontal-Single-Stage-End-Suction-Centrifugal-Water-Pump-XA-100-40-.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 20
    },


    // PRODUCTOS INALÁMBRICOS
    {
        id: 13,
        name: "Taladro Inalámbrico 20V",
        description: "El modelo LCD787-1S es un taladro/destornillador inalámbrico de 20V DC, diseñado para tareas de perforación y fijación en madera, acero y metales.",
        price: 180.00,
        category: "PRODUCTOS INALÁMBRICOS",
        stock: 18,
        image: "https://ae01.alicdn.com/kf/S9f50e9212c7842d2aab07ae41d41e7e2h.jpg_960x960.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 15
    },


    // REPUESTOS
    {
        id: 14,
        name: "BATERIA P FUM ELECTRICA 20 LTRS",
        description: "BATERIA P FUM ELECTRICA 20 LTRS",
        price: 25.00,
        category: "REPUESTOS",
        stock: 50,
        image: "https://ws.diverzu.com.ec/api/get-image/K4tbvstRYV7uyHfkRpXOCIvQ.webp",
        brand: "Motorgsa",
        distributorDiscountPercent: 10
    },

    // TANQUES DE COMBUSTIBLE PORTÁTIL
    {
        id: 15,
        name: "LD-W-12 TANQUE DE AGUA 12LT PLASTICO",
        description: "Diseño de grifo único, grifo de diseño fácil de encender / apagar, evita fugas para transportar agua, no se preocupa por la dispersión",
        price: 65.00,
        category: "TANQUES DE COMBUSTIBLE PORTÁTIL",
        stock: 20,
        image: "https://ae01.alicdn.com/kf/S62e20fe78f8b444a93d34a271ec535ad8.jpg_640x640q90.jpg",
        brand: "Motorgsa",
        distributorDiscountPercent: 15
    },
];

// Función para obtener todos los productos
function getProducts() {
    return products;
}

// Función para obtener un producto por ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Función para agregar un nuevo producto
function addProduct(product) {
    product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
    saveProductsToStorage();
    return product;
}

// Función para actualizar un producto
function updateProduct(id, updatedProduct) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        saveProductsToStorage();
        return true;
    }
    return false;
}

// Función para eliminar un producto
function deleteProduct(id) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        saveProductsToStorage();
        return true;
    }
    return false;
}

// Función auxiliar para evitar conflictos de nombres
function deleteProductFromFile(id) {
    return deleteProduct(id);
}

// Hacer la función disponible globalmente
window.deleteProductFromFile = deleteProductFromFile;

// Función para guardar productos en localStorage
function saveProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Función para cargar productos desde localStorage
function loadProductsFromStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
}

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Función para buscar productos por nombre
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
}

// Cargar productos al inicializar solo si no hay productos en localStorage
// o si hay menos de 36 productos (indicando datos desactualizados)
const storedProducts = localStorage.getItem('products');
if (!storedProducts || JSON.parse(storedProducts).length < 36) {
    // Forzar recarga desde el archivo si los datos están desactualizados
    localStorage.removeItem('products');
    console.log('Productos cargados desde archivo:', products.length);
} else {
    // Usar productos del localStorage si están actualizados
    products = JSON.parse(storedProducts);
    console.log('Productos cargados desde localStorage:', products.length);
}

