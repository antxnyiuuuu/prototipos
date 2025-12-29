// Datos estáticos para la aplicación de viajes

// Localidades disponibles (destinos del bus)
const localidades = [
  {
    id: 1,
    nombre: "Quito",
    provincia: "Pichincha",
    descripcion: "Capital del Ecuador, ciudad patrimonio de la humanidad"
  },
  {
    id: 2,
    nombre: "Guayaquil",
    provincia: "Guayas", 
    descripcion: "Perla del Pacífico, puerto principal del Ecuador"
  },
  {
    id: 3,
    nombre: "Cuenca",
    provincia: "Azuay",
    descripcion: "Ciudad patrimonio, joya arquitectónica de la sierra"
  },
  {
    id: 4,
    nombre: "Baños",
    provincia: "Tungurahua",
    descripcion: "Puerta del oriente, ciudad de las aguas termales"
  },
  {
    id: 5,
    nombre: "Manta",
    provincia: "Manabí",
    descripcion: "Ciudad costera, capital del atún"
  },
  {
    id: 6,
    nombre: "Otavalo",
    provincia: "Imbabura",
    descripcion: "Valle de los lagos, famoso por su mercado artesanal"
  },
  {
    id: 8,
    nombre: "Mindo",
    provincia: "Pichincha",
    descripcion: "Bosque nublado, paraíso de aves y mariposas"
  }
];

// Usuarios del sistema
const usuarios = [
  {
    id: 1,
    nombre: "María González",
    email: "maria@email.com",
    password: "user123",
    tipo: "usuario",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    nombre: "Carlos Mendoza",
    email: "carlos@email.com",
    password: "user456",
    tipo: "usuario",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    nombre: "Ana Torres",
    email: "ana@email.com",
    password: "user789",
    tipo: "usuario",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

// Productos por categoría
const products = {
  actividades: [
    {
      id: 301,
      nombre: "Caminata Nocturna",
      descripcion: "Explora la ciudad bajo las estrellas con guías expertos",
      precio: 25,
      creador: "Aventuras Ecuador",
      imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Quito"
    },
    {
      id: 302,
      nombre: "Paseo Matutino",
      descripcion: "Disfruta del amanecer en los mejores miradores de la ciudad",
      precio: 15,
      creador: "Turismo Local",
      imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Quito"
    },
    {
      id: 303,
      nombre: "Tour Guiado",
      descripcion: "Conoce la historia y cultura de la ciudad con expertos",
      precio: 30,
      creador: "Guías Certificados",
      imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Cuenca"
    },
    {
      id: 304,
      nombre: "Escalada Ligera",
      descripcion: "Aventura de escalada para principiantes en roca natural",
      precio: 45,
      creador: "Deportes Extremos",
      imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Baños"
    },
    {
      id: 305,
      nombre: "Ciclismo Urbano",
      descripcion: "Recorre la ciudad en bicicleta por rutas seguras y pintorescas",
      precio: 20,
      creador: "Bici Tours",
      imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Guayaquil"
    },
    {
      id: 306,
      nombre: "Kayak en Laguna",
      descripcion: "Navega por lagunas cristalinas en kayak individual o doble",
      precio: 35,
      creador: "Aventuras Acuáticas",
      imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Otavalo"
    },
    {
      id: 307,
      nombre: "Senderismo Ecológico",
      descripcion: "Explora senderos naturales con guías especializados",
      precio: 28,
      creador: "Eco Tours",
      imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Mindo"
    },
    {
      id: 308,
      nombre: "Parapente",
      descripcion: "Vuela sobre valles y montañas con instructores certificados",
      precio: 80,
      creador: "Vuelo Libre Ecuador",
      imagen: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Baños"
    },
    {
      id: 309,
      nombre: "Rafting en Río",
      descripcion: "Aventura en aguas bravas con equipos de seguridad",
      precio: 55,
      creador: "Ríos Salvajes",
      imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      categoria: "actividades",
      localidad: "Baños"
    }
  ],
  hoteles: [
    {
      id: 101,
      nombre: "Hotel Quito",
      descripcion: "Hotel de lujo en el centro histórico de Quito",
      precio: 120,
      creador: "Hotel Quito",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 5,
      localidad: "Quito",
      capacidad: 4
    },
    {
      id: 102,
      nombre: "Hotel Guayaquil",
      descripcion: "Hotel moderno en el centro de Guayaquil",
      precio: 95,
      creador: "Hotel Guayaquil",
      imagen: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 4,
      localidad: "Guayaquil",
      capacidad: 6
    },
    {
      id: 103,
      nombre: "Hotel Cuenca",
      descripcion: "Hotel boutique en la ciudad patrimonio",
      precio: 85,
      creador: "Hotel Cuenca",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 4,
      localidad: "Cuenca",
      capacidad: 4
    },
    {
      id: 105,
      nombre: "Hotel Baños",
      descripcion: "Hotel termal en la puerta del oriente",
      precio: 75,
      creador: "Hotel Baños",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 4,
      localidad: "Baños",
      capacidad: 8
    },
    {
      id: 106,
      nombre: "Hotel Manta",
      descripcion: "Hotel de playa en la costa del Pacífico",
      precio: 110,
      creador: "Hotel Manta",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 4,
      localidad: "Manta",
      capacidad: 6
    },
    {
      id: 107,
      nombre: "Hotel Otavalo",
      descripcion: "Hotel en el valle de los lagos",
      precio: 65,
      creador: "Hotel Otavalo",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 3,
      localidad: "Otavalo",
      capacidad: 4
    },
    {
      id: 108,
      nombre: "Hotel Mindo",
      descripcion: "Ecolodge en el bosque nublado",
      precio: 90,
      creador: "Hotel Mindo",
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      categoria: "hoteles",
      estrellas: 4,
      localidad: "Mindo",
      capacidad: 2
    }
  ],
  restaurantes: [
    {
      id: 201,
      nombre: "Restaurante La Mar",
      descripcion: "Gastronomía peruana de autor con vista al mar",
      precio: 45,
      creador: "Chef Gastón",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 5,
      localidad: "Guayaquil",
      comidas: [
        {
          id: 2011,
          nombre: "Ceviche de Pescado",
          descripcion: "Pescado fresco marinado en leche de tigre con cebolla morada",
          precio: 22,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2012,
          nombre: "Lomo Saltado",
          descripcion: "Carne salteada con cebolla, tomate y papas fritas",
          precio: 28,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2013,
          nombre: "Arroz Chaufa",
          descripcion: "Arroz frito con pollo, huevo y vegetales",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2014,
          nombre: "Pisco Sour",
          descripcion: "Cóctel tradicional peruano con pisco y limón",
          precio: 12,
          tipo: "Bebida",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 202,
      nombre: "Café Galápagos",
      descripcion: "Café temático con productos de las islas",
      precio: 25,
      creador: "Café Galápagos",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Quito",
      comidas: [
        {
          id: 2021,
          nombre: "Café Galápagos Premium",
          descripcion: "Café de altura de las islas con notas de chocolate",
          precio: 8,
          tipo: "Bebida",
          tiempo_preparacion: "3 min"
        },
        {
          id: 2022,
          nombre: "Tortuga de Chocolate",
          descripcion: "Postre de chocolate con forma de tortuga galápagos",
          precio: 14,
          tipo: "Postre",
          tiempo_preparacion: "5 min"
        },
        {
          id: 2023,
          nombre: "Sandwich de Atún",
          descripcion: "Sandwich con atún fresco y vegetales locales",
          precio: 16,
          tipo: "Plato principal",
          tiempo_preparacion: "10 min"
        },
        {
          id: 2024,
          nombre: "Smoothie Tropical",
          descripcion: "Smoothie con frutas tropicales de las islas",
          precio: 12,
          tipo: "Bebida",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 203,
      nombre: "Pizzería Andes",
      descripcion: "Pizza artesanal con ingredientes locales",
      precio: 35,
      creador: "Pizzería Andes",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Cuenca",
      comidas: [
        {
          id: 2031,
          nombre: "Pizza Margherita",
          descripcion: "Pizza clásica con tomate, mozzarella y albahaca",
          precio: 20,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2032,
          nombre: "Pizza Andina",
          descripcion: "Pizza con ingredientes locales: quinua, aguacate y queso",
          precio: 24,
          tipo: "Plato principal",
          tiempo_preparacion: "18 min"
        },
        {
          id: 2033,
          nombre: "Pizza de Mariscos",
          descripcion: "Pizza con camarones, pulpo y mejillones",
          precio: 28,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2034,
          nombre: "Calzone Vegetariano",
          descripcion: "Calzone relleno de vegetales frescos y queso",
          precio: 22,
          tipo: "Plato principal",
          tiempo_preparacion: "16 min"
        }
      ]
    },
    {
      id: 204,
      nombre: "Restaurante El Cebiche",
      descripcion: "Especialistas en mariscos frescos de la costa",
      precio: 40,
      creador: "Chef Carlos",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Manta",
      comidas: [
        {
          id: 2041,
          nombre: "Ceviche de Camarón",
          descripcion: "Camarones frescos marinados en limón con cebolla y cilantro",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "12 min"
        },
        {
          id: 2042,
          nombre: "Encebollado",
          descripcion: "Sopa de pescado con yuca y encurtido de cebolla",
          precio: 15,
          tipo: "Sopa",
          tiempo_preparacion: "25 min"
        },
        {
          id: 2043,
          nombre: "Arroz con Menestra",
          descripcion: "Arroz con menestra de lentejas y carne asada",
          precio: 16,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2044,
          nombre: "Patacones con Queso",
          descripcion: "Patacones fritos con queso fresco y ají",
          precio: 12,
          tipo: "Entrada",
          tiempo_preparacion: "10 min"
        }
      ]
    },
    {
      id: 205,
      nombre: "Café Andino",
      descripcion: "Café de altura con vista a los volcanes",
      precio: 20,
      creador: "Café Andino",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Baños",
      comidas: [
        {
          id: 2051,
          nombre: "Café de Altura",
          descripcion: "Café premium cultivado en las alturas andinas",
          precio: 6,
          tipo: "Bebida",
          tiempo_preparacion: "3 min"
        },
        {
          id: 2052,
          nombre: "Pan de Yuca",
          descripcion: "Pan artesanal de yuca con queso fresco",
          precio: 8,
          tipo: "Entrada",
          tiempo_preparacion: "8 min"
        },
        {
          id: 2053,
          nombre: "Empanadas de Viento",
          descripcion: "Empanadas fritas rellenas de queso",
          precio: 10,
          tipo: "Entrada",
          tiempo_preparacion: "12 min"
        },
        {
          id: 2054,
          nombre: "Chocolate Caliente",
          descripcion: "Chocolate artesanal con canela y especias",
          precio: 7,
          tipo: "Bebida",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 206,
      nombre: "Restaurante El Patio",
      descripcion: "Gastronomía tradicional en ambiente colonial",
      precio: 30,
      creador: "Chef María",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 5,
      localidad: "Cuenca",
      comidas: [
        {
          id: 2061,
          nombre: "Seco de Chivo",
          descripcion: "Carne de chivo cocida a fuego lento con cerveza",
          precio: 22,
          tipo: "Plato principal",
          tiempo_preparacion: "45 min"
        },
        {
          id: 2062,
          nombre: "Hornado",
          descripcion: "Cerdo asado lentamente con especias y mote",
          precio: 20,
          tipo: "Plato principal",
          tiempo_preparacion: "4 horas"
        },
        {
          id: 2063,
          nombre: "Cuy Asado",
          descripcion: "Cuy asado tradicional de la sierra",
          precio: 25,
          tipo: "Plato principal",
          tiempo_preparacion: "1 hora"
        },
        {
          id: 2064,
          nombre: "Mote Pillo",
          descripcion: "Mote cocido con huevo, cebolla y especias",
          precio: 14,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        }
      ]
    },
    {
      id: 207,
      nombre: "Sushi Bar Pacifico",
      descripcion: "Sushi fresco con influencias ecuatorianas",
      precio: 50,
      creador: "Chef Hiroshi",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Guayaquil",
      comidas: [
        {
          id: 2071,
          nombre: "Roll California",
          descripcion: "Roll de cangrejo, aguacate y pepino",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "10 min"
        },
        {
          id: 2072,
          nombre: "Sashimi de Atún",
          descripcion: "Cortes frescos de atún con wasabi y jengibre",
          precio: 24,
          tipo: "Plato principal",
          tiempo_preparacion: "8 min"
        },
        {
          id: 2073,
          nombre: "Roll Ecuador",
          descripcion: "Roll con camarón, aguacate y salsa picante",
          precio: 20,
          tipo: "Plato principal",
          tiempo_preparacion: "12 min"
        },
        {
          id: 2074,
          nombre: "Miso Soup",
          descripcion: "Sopa tradicional japonesa con tofu y algas",
          precio: 8,
          tipo: "Sopa",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 208,
      nombre: "Parrilla Los Andes",
      descripcion: "Carnes a la parrilla con vista a la cordillera",
      precio: 38,
      creador: "Chef Roberto",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Quito",
      comidas: [
        {
          id: 2081,
          nombre: "Bife de Chorizo",
          descripcion: "Corte premium de carne a la parrilla con chimichurri",
          precio: 25,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2082,
          nombre: "Costillas BBQ",
          descripcion: "Costillas de cerdo marinadas en salsa barbacoa",
          precio: 22,
          tipo: "Plato principal",
          tiempo_preparacion: "35 min"
        },
        {
          id: 2083,
          nombre: "Pollo a la Brasa",
          descripcion: "Pollo marinado en hierbas y especias, cocido a la brasa",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "45 min"
        },
        {
          id: 2084,
          nombre: "Ensalada César",
          descripcion: "Lechuga fresca con aderezo césar y crutones",
          precio: 12,
          tipo: "Entrada",
          tiempo_preparacion: "10 min"
        }
      ]
    },
    {
      id: 209,
      nombre: "Restaurante El Mirador",
      descripcion: "Gastronomía internacional con vista panorámica",
      precio: 55,
      creador: "Chef Internacional",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 5,
      localidad: "Mindo",
      comidas: [
        {
          id: 2091,
          nombre: "Risotto de Hongos",
          descripcion: "Arroz cremoso con hongos porcini y parmesano",
          precio: 28,
          tipo: "Plato principal",
          tiempo_preparacion: "25 min"
        },
        {
          id: 2092,
          nombre: "Salmón a la Plancha",
          descripcion: "Filete de salmón con vegetales asados y salsa de limón",
          precio: 32,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2093,
          nombre: "Pasta Carbonara",
          descripcion: "Pasta con panceta, huevo y queso parmesano",
          precio: 24,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2094,
          nombre: "Tiramisú",
          descripcion: "Postre italiano con café y mascarpone",
          precio: 16,
          tipo: "Postre",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 210,
      nombre: "Café del Mar",
      descripcion: "Especialistas en mariscos y pescados frescos",
      precio: 42,
      creador: "Chef Marino",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Manta",
      comidas: [
        {
          id: 2101,
          nombre: "Ceviche Mixto",
          descripcion: "Mezcla de pescado, camarón y pulpo marinados en limón",
          precio: 20,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2102,
          nombre: "Pescado Frito",
          descripcion: "Pescado fresco frito con arroz y patacones",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2103,
          nombre: "Camarones al Ajillo",
          descripcion: "Camarones salteados con ajo, vino blanco y perejil",
          precio: 24,
          tipo: "Plato principal",
          tiempo_preparacion: "12 min"
        },
        {
          id: 2104,
          nombre: "Sopa de Mariscos",
          descripcion: "Sopa cremosa con variedad de mariscos frescos",
          precio: 16,
          tipo: "Sopa",
          tiempo_preparacion: "25 min"
        }
      ]
    },
    {
      id: 211,
      nombre: "Restaurante La Terraza",
      descripcion: "Cocina fusión con ingredientes locales",
      precio: 48,
      creador: "Chef Fusion",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Otavalo",
      comidas: [
        {
          id: 2111,
          nombre: "Quinoa con Pollo",
          descripcion: "Quinoa orgánica con pollo a la plancha y vegetales",
          precio: 22,
          tipo: "Plato principal",
          tiempo_preparacion: "20 min"
        },
        {
          id: 2112,
          nombre: "Lomo Saltado",
          descripcion: "Carne salteada con cebolla, tomate y papas fritas",
          precio: 26,
          tipo: "Plato principal",
          tiempo_preparacion: "18 min"
        },
        {
          id: 2113,
          nombre: "Ensalada Andina",
          descripcion: "Mezcla de vegetales andinos con aderezo de aguacate",
          precio: 14,
          tipo: "Entrada",
          tiempo_preparacion: "10 min"
        },
        {
          id: 2114,
          nombre: "Helado de Lucuma",
          descripcion: "Helado artesanal de lúcuma con canela",
          precio: 12,
          tipo: "Postre",
          tiempo_preparacion: "5 min"
        }
      ]
    },
    {
      id: 212,
      nombre: "Restaurante El Jardín",
      descripcion: "Cocina vegetariana y vegana con productos orgánicos",
      precio: 35,
      creador: "Chef Verde",
      imagen: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      categoria: "restaurantes",
      estrellas: 4,
      localidad: "Baños",
      comidas: [
        {
          id: 2121,
          nombre: "Bowl de Acai",
          descripcion: "Bowl de acai con frutas frescas y granola",
          precio: 16,
          tipo: "Desayuno",
          tiempo_preparacion: "8 min"
        },
        {
          id: 2122,
          nombre: "Hamburguesa Vegana",
          descripcion: "Hamburguesa de quinoa con vegetales frescos",
          precio: 20,
          tipo: "Plato principal",
          tiempo_preparacion: "15 min"
        },
        {
          id: 2123,
          nombre: "Wrap de Vegetales",
          descripcion: "Wrap con vegetales asados y hummus",
          precio: 18,
          tipo: "Plato principal",
          tiempo_preparacion: "12 min"
        },
        {
          id: 2124,
          nombre: "Smoothie Verde",
          descripcion: "Smoothie de espinaca, mango y jengibre",
          precio: 10,
          tipo: "Bebida",
          tiempo_preparacion: "5 min"
        }
      ]
    }
  ],
  comidas: [
    {
      id: 401,
      nombre: "Ceviche de Camarón",
      descripcion: "Camarones frescos marinados en limón con cebolla, cilantro y ají",
      precio: 18,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Guayaquil",
      tipo: "Plato principal",
      tiempo_preparacion: "15 min"
    },
    {
      id: 402,
      nombre: "Encebollado",
      descripcion: "Sopa de pescado con yuca, encurtido de cebolla y chifles",
      precio: 12,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Guayaquil",
      tipo: "Sopa",
      tiempo_preparacion: "20 min"
    },
    {
      id: 403,
      nombre: "Arroz con Pollo",
      descripcion: "Arroz amarillo con pollo, verduras y especias ecuatorianas",
      precio: 14,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Quito",
      tipo: "Plato principal",
      tiempo_preparacion: "25 min"
    },
    {
      id: 404,
      nombre: "Locro de Papa",
      descripcion: "Sopa espesa de papa con queso, aguacate y agrio",
      precio: 10,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Quito",
      tipo: "Sopa",
      tiempo_preparacion: "30 min"
    },
    {
      id: 405,
      nombre: "Seco de Chivo",
      descripcion: "Carne de chivo cocida a fuego lento con cerveza y especias",
      precio: 16,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Cuenca",
      tipo: "Plato principal",
      tiempo_preparacion: "45 min"
    },
    {
      id: 406,
      nombre: "Hornado",
      descripcion: "Cerdo asado lentamente con especias y acompañado de mote y papas",
      precio: 20,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Cuenca",
      tipo: "Plato principal",
      tiempo_preparacion: "4 horas"
    },
    {
      id: 407,
      nombre: "Empanadas de Viento",
      descripcion: "Empanadas fritas rellenas de queso y espolvoreadas con azúcar",
      precio: 8,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Quito",
      tipo: "Entrada",
      tiempo_preparacion: "20 min"
    },
    {
      id: 408,
      nombre: "Cuy Asado",
      descripcion: "Cuy asado tradicional de la sierra ecuatoriana",
      precio: 25,
      creador: "Chef Tradicional",
      imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      categoria: "comidas",
      localidad: "Cuenca",
      tipo: "Plato principal",
      tiempo_preparacion: "1 hora"
    }
  ]
};

// Paquetes turísticos
const paquetes = [
  {
    id: 2,
    nombre: "Ruta del Sol",
    descripcion: "Recorre la costa ecuatoriana desde Manta hasta Salinas",
    precio: 450,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    creador: "admin",
    productos: [],
    duracion: "3 días",
    dificultad: "Fácil"
  },
  {
    id: 3,
    nombre: "Andes Mágicos",
    descripcion: "Aventura en la sierra ecuatoriana con visitas a volcanes y lagunas",
    precio: 780,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    creador: "admin",
    productos: [],
    duracion: "4 días",
    dificultad: "Avanzada"
  }
];

// Transporte disponible
const transportes = [
  {
    id: 1,
    nombre: "Bus Quito - Guayaquil",
    descripcion: "Servicio directo entre las dos principales ciudades",
    horario: "06:00, 14:00, 22:00",
    empresa: "Flota Imbabura",
    precio: 25,
    localidad_origen: "Quito",
    localidad_destino: "Guayaquil",
    duracion: "8 horas"
  },
  {
    id: 2,
    nombre: "Bus Quito - Cuenca",
    descripcion: "Viaje directo a la ciudad patrimonio",
    horario: "07:00, 15:00, 23:00",
    empresa: "Cooperativa Azuay",
    precio: 20,
    localidad_origen: "Quito",
    localidad_destino: "Cuenca",
    duracion: "10 horas"
  },
  {
    id: 3,
    nombre: "Bus Quito - Baños",
    descripcion: "Servicio frecuente a la puerta del oriente",
    horario: "05:00, 08:00, 12:00, 16:00, 20:00",
    empresa: "Baños Tours",
    precio: 8,
    localidad_origen: "Quito",
    localidad_destino: "Baños",
    duracion: "3 horas"
  },
  {
    id: 4,
    nombre: "Bus Guayaquil - Manta",
    descripcion: "Viaje a la costa del Pacífico",
    horario: "06:30, 12:30, 18:30",
    empresa: "Flota Manta",
    precio: 12,
    localidad_origen: "Guayaquil",
    localidad_destino: "Manta",
    duracion: "4 horas"
  },
  {
    id: 5,
    nombre: "Bus Quito - Otavalo",
    descripcion: "Servicio al valle de los lagos",
    horario: "06:00, 09:00, 14:00, 17:00",
    empresa: "Cooperativa Otavalo",
    precio: 6,
    localidad_origen: "Quito",
    localidad_destino: "Otavalo",
    duracion: "2 horas"
  },
  {
    id: 6,
    nombre: "Bus Quito - Mindo",
    descripcion: "Viaje al bosque nublado",
    horario: "07:00, 12:00, 17:00",
    empresa: "Mindo Tours",
    precio: 5,
    localidad_origen: "Quito",
    localidad_destino: "Mindo",
    duracion: "1.5 horas"
  },
  {
    id: 8,
    nombre: "Bus Cuenca - Baños",
    descripcion: "Viaje directo entre ciudades andinas",
    horario: "06:00, 12:00, 18:00",
    empresa: "Cooperativa Baños",
    precio: 15,
    localidad_origen: "Cuenca",
    localidad_destino: "Baños",
    duracion: "6 horas"
  }
];

// Transporte único (empresa con un solo bus)
function getSingleTransport() {
  try {
    const stored = localStorage.getItem('single_transport');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  // Fallback: primer transporte de data quemada
  return transportes[0];
}

// Exponer lista con un solo transporte
function getTransportes() {
  // Devolver todos los transportes disponibles para que el usuario pueda elegir
  return getAvailableTransport();
}

// Funciones auxiliares
function getProductsByCategory(category) {
  return products[category] || [];
}

function getAllProducts() {
  return [
    ...products.actividades,
    ...products.hoteles,
    ...products.restaurantes,
    ...products.comidas
  ];
}

function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
}

function getPaquetesByCreator(creatorId) {
  return paquetes.filter(p => p.creador === creatorId);
}

function getUserFavorites(userId) {
  // Simulación de favoritos del usuario
  return [
    products.hoteles[0],
    products.restaurantes[0]
  ];
}

function loginUser(email, password) {
  // Simulación simple - en realidad debería validar contra backend
  if (email === "admin@viajes.com" && password === "admin123") {
    return { ...usuarios[0], tipo: "admin" };
  } else {
    return usuarios.find(u => u.email === email && u.password === password);
  }
}

// Funciones para gestión de transporte
function getAvailableTransport() {
  return transportes.filter(t => t.disponible !== false);
}

function getTransportById(id) {
  return transportes.find(t => t.id === id);
}

function updateTransportSchedule(id, newSchedule) {
  const transport = transportes.find(t => t.id === id);
  if (transport) {
    transport.horario = newSchedule;
    return true;
  }
  return false;
}

// Función para cargar datos de transporte desde JSON (para futuras actualizaciones)
async function loadTransportData() {
  try {
    const response = await fetch('data/transport.json');
    const data = await response.json();
    return data.transportes;
  } catch (error) {
    console.error('Error cargando datos de transporte:', error);
    return transportes; // Fallback a datos locales
  }
}

// Funciones para gestión de paquetes de usuario
// Función para cargar paquetes del usuario desde localStorage
async function loadUserPackages(userId) {
    console.log('loadUserPackages llamado:', { userId });
    try {
        const key = `packages_${userId}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            console.log('Paquetes cargados desde localStorage:', parsed);
            return parsed;
        }
        // Sin fetch: inicializar vacío (o con ejemplo mínimo) para evitar CORS
        const initial = [];
        localStorage.setItem(key, JSON.stringify(initial));
        console.log('Inicializado packages vacío en localStorage');
        return initial;
    } catch (error) {
        console.error('Error cargando paquetes:', error);
        return [];
    }
}

// Función para guardar paquetes del usuario en localStorage
async function saveUserPackages(userId, packages) {
    console.log('saveUserPackages llamado:', { userId, packages });
    
    try {
        localStorage.setItem(`packages_${userId}`, JSON.stringify(packages));
        console.log('Paquetes guardados en localStorage');
        return true;
    } catch (error) {
        console.error('Error guardando paquetes:', error);
        return false;
    }
}

// Función para crear un nuevo paquete
async function createUserPackage(userId, packageData) {
    console.log('createUserPackage llamado:', { userId, packageData });
    
    try {
        // Cargar paquetes existentes
        let packages = await loadUserPackages(userId);
        
        // Crear nuevo paquete con ID único
        const newPackage = {
            ...packageData,
            id: Date.now(), // ID único basado en timestamp
            usuario_id: userId,
            fecha_creacion: new Date().toISOString().split('T')[0],
            productos: [],
            transporte: null
        };
        
        // Agregar a la lista
        packages.push(newPackage);
        
        // Guardar en localStorage
        await saveUserPackages(userId, packages);
        
        console.log('Nuevo paquete creado:', newPackage);
        return newPackage;
    } catch (error) {
        console.error('Error creando paquete:', error);
        return null;
    }
}

// Función para actualizar un paquete existente
async function updateUserPackage(userId, packageId, updatedData) {
    console.log('updateUserPackage llamado:', { userId, packageId, updatedData });
    
    try {
        // Cargar paquetes existentes
        let packages = await loadUserPackages(userId);
        
        // Buscar y actualizar el paquete
        const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
        
        if (packageIndex !== -1) {
            packages[packageIndex] = { ...packages[packageIndex], ...updatedData };
            
            // Guardar en localStorage
            await saveUserPackages(userId, packages);
            
            console.log('Paquete actualizado:', packages[packageIndex]);
            return packages[packageIndex];
        } else {
            console.log('Paquete no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error actualizando paquete:', error);
        return null;
    }
}

// Funciones para gestión de favoritos
async function loadUserFavorites(userId) {
  try {
    const key = `favorites_${userId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    // Sin fetch: iniciar vacío para evitar CORS
    const initial = [];
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  } catch (error) {
    console.error('loadUserFavorites: error completo:', error);
    return [];
  }
}

async function addToFavorites(userId, product) {
  try {
    console.log('addToFavorites llamado:', { userId, product });
    
    // Cargar favoritos actuales
    let favorites = await loadUserFavorites(userId);
    
    // Verificar si el producto ya existe
    const existingIndex = favorites.findIndex(fav => fav.id === product.id);
    
    if (existingIndex === -1) {
      // Agregar nuevo producto a favoritos
      favorites.push(product);
      
      // Guardar en localStorage
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
      
      console.log('Producto agregado a favoritos:', product);
      console.log('Total de favoritos del usuario:', favorites.length);
      
      return true;
    } else {
      console.log('Producto ya existe en favoritos');
      return false;
    }
  } catch (error) {
    console.error('Error agregando a favoritos:', error);
    return false;
  }
}

async function removeFromFavorites(userId, productId) {
  try {
    console.log('removeFromFavorites llamado:', { userId, productId });
    
    // Cargar favoritos actuales
    let favorites = await loadUserFavorites(userId);
    
    // Buscar y remover el producto
    const productIndex = favorites.findIndex(fav => fav.id === productId);
    
    if (productIndex !== -1) {
      const removedProduct = favorites.splice(productIndex, 1)[0];
      
      // Guardar en localStorage
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
      
      console.log('Producto removido de favoritos:', removedProduct);
      console.log('Total de favoritos restantes:', favorites.length);
      
      return true;
    } else {
      console.log('Producto no encontrado en favoritos');
      return false;
    }
  } catch (error) {
    console.error('Error removiendo de favoritos:', error);
    return false;
  }
}

async function isProductInFavorites(userId, productId) {
  try {
    console.log('isProductInFavorites llamado:', { userId, productId });
    
    const favorites = await loadUserFavorites(userId);
    const isInFavorites = favorites.some(p => p.id === productId);
    
    console.log('Producto en favoritos:', isInFavorites);
    return isInFavorites;
  } catch (error) {
    console.error('Error verificando favoritos:', error);
    return false;
  }
}

// Función helper para obtener el nombre de la categoría
function getCategoryName(category) {
  const names = {
    'hoteles': 'Hotel',
    'restaurantes': 'Restaurante',
    'actividades': 'Actividad',
    'comidas': 'Comida'
  };
  return names[category] || 'Producto';
}

// Función para obtener todas las localidades disponibles
function getLocalidades() {
  return localidades;
}

// Funciones helper para obtener productos
function getProductsByCategory(category) {
  return products[category] || [];
}

function getAllProducts() {
  return [
    ...products.actividades,
    ...products.hoteles,
    ...products.restaurantes,
    ...products.comidas
  ];
}

function getProductById(id) {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
}

function getProductsByLocalidad(localidad) {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.localidad === localidad);
}

function getProductsByCategoryAndLocalidad(category, localidad) {
  const categoryProducts = getProductsByCategory(category);
  return categoryProducts.filter(product => product.localidad === localidad);
}

function searchProductsByTextAndLocalidad(searchText, localidad = null) {
  const allProducts = getAllProducts();
  let filteredProducts = allProducts;
  
  if (localidad) {
    filteredProducts = filteredProducts.filter(product => product.localidad === localidad);
  }
  
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.nombre.toLowerCase().includes(searchLower) ||
      product.descripcion.toLowerCase().includes(searchLower) ||
      product.creador.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredProducts;
}

// Función para eliminar un paquete del usuario
async function deleteUserPackage(userId, packageId) {
  try {
    console.log('deleteUserPackage llamado:', { userId, packageId });
    
    // Cargar paquetes existentes
    let packages = await loadUserPackages(userId);
    
    // Buscar y eliminar el paquete
    const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
    
    if (packageIndex !== -1) {
      const deletedPackage = packages.splice(packageIndex, 1)[0];
      
      // Guardar en localStorage
      await saveUserPackages(userId, packages);
      
      console.log('Paquete eliminado:', deletedPackage);
      return true;
    } else {
      console.log('Paquete no encontrado');
      return false;
    }
  } catch (error) {
    console.error('Error eliminando paquete:', error);
    return false;
  }
}

// Función para agregar producto a un paquete
async function addProductToPackage(userId, packageId, product) {
  try {
    console.log('addProductToPackage llamado:', { userId, packageId, product });
    
    // Cargar paquetes existentes
    let packages = await loadUserPackages(userId);
    
    // Buscar el paquete
    const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
    
    if (packageIndex !== -1) {
      // Verificar que el producto no esté ya en el paquete
      const existingProduct = packages[packageIndex].productos.find(p => p.id === product.id);
      
      if (!existingProduct) {
        packages[packageIndex].productos.push(product);
        
        // Guardar en localStorage
        await saveUserPackages(userId, packages);
        
        console.log('Producto agregado al paquete:', product);
        return true;
      } else {
        console.log('Producto ya existe en el paquete');
        return false;
      }
    } else {
      console.log('Paquete no encontrado');
      return false;
    }
  } catch (error) {
    console.error('Error agregando producto al paquete:', error);
    return false;
  }
}

// Función para remover producto de un paquete
async function removeProductFromPackage(userId, packageId, productId) {
  try {
    console.log('removeProductFromPackage llamado:', { userId, packageId, productId });
    
    // Cargar paquetes existentes
    let packages = await loadUserPackages(userId);
    
    // Buscar el paquete
    const packageIndex = packages.findIndex(pkg => pkg.id === packageId);
    
    if (packageIndex !== -1) {
      // Buscar y remover el producto
      const productIndex = packages[packageIndex].productos.findIndex(p => p.id === productId);
      
      if (productIndex !== -1) {
        const removedProduct = packages[packageIndex].productos.splice(productIndex, 1)[0];
        
        // Guardar en localStorage
        await saveUserPackages(userId, packages);
        
        console.log('Producto removido del paquete:', removedProduct);
        return true;
      } else {
        console.log('Producto no encontrado en el paquete');
        return false;
      }
    } else {
      console.log('Paquete no encontrado');
      return false;
    }
  } catch (error) {
    console.error('Error removiendo producto del paquete:', error);
    return false;
  }
}
