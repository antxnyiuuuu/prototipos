
// Aplicación de viajes - Versión sin servidor
class TravelApp {
  constructor() {
    this.currentUser = null;
    this.currentPackage = null;
    this.selectedLocalidad = null;
  }

  // Inicializar la aplicación
  init() {
    console.log('Inicializando aplicación de viajes...');
    this.showLoginPage();
  }

  // Mostrar página de login
  showLoginPage() {
      const main = document.querySelector('main');
      if (main) {
      main.innerHTML = this.getLoginPageContent();
      this.setupLoginForm();
    }
  }

  // Cargar página
  async loadPage(pagePath) {
    console.log('Cargando página:', pagePath);
      
    try {
      // En lugar de fetch, usar un sistema de páginas predefinidas
      const pageContent = this.getPageContent(pagePath);
      if (pageContent) {
      const main = document.querySelector('main');
      if (main) {
          main.innerHTML = pageContent;
          console.log('Página cargada exitosamente:', pagePath);
          
          // Configurar la página según su tipo
          this.setupPage(pagePath);
          
          return Promise.resolve();
      } else {
        console.error('Elemento main no encontrado');
          return Promise.reject('Elemento main no encontrado');
        }
    } else {
        console.error('Página no encontrada:', pagePath);
        return Promise.reject('Página no encontrada');
      }
    } catch (error) {
      console.error('Error cargando página:', error);
      return Promise.reject(error);
    }
  }

  // Obtener contenido de página predefinida
  getPageContent(pagePath) {
    const pages = {
      'pages/login.html': this.getLoginPageContent(),
      'pages/home_user.html': this.getHomeUserPageContent(),
      'pages/home_admin.html': this.getHomeAdminPageContent(),
      'pages/packages_user.html': this.getPackagesUserPageContent(),
      'pages/search_user.html': this.getSearchUserPageContent(),
      'pages/profile_user.html': this.getProfileUserPageContent(),
      'pages/new-package.html': this.getNewPackagePageContent(),
      'pages/admin-products.html': this.getAdminProductsPageContent(),
      'pages/admin-packages.html': this.getAdminPackagesPageContent(),
      'pages/admin-transport.html': this.getAdminTransportPageContent(),
      'pages/profile_admin.html': this.getProfileAdminPageContent()
    };
    
    return pages[pagePath] || null;
  }

  // Configurar página según su tipo
  setupPage(pagePath) {
    console.log('Configurando página:', pagePath);
    
    if (pagePath.includes('home_user')) {
      this.setupHomeUserPage();
    } else if (pagePath.includes('packages_user')) {
      this.setupPackagesUserPage();
    } else if (pagePath.includes('search_user')) {
      this.setupSearchUserPage();
    } else if (pagePath.includes('profile_user')) {
      this.setupProfileUserPage();
    } else if (pagePath.includes('new-package')) {
      this.setupNewPackagePage();
    } else if (pagePath.includes('admin')) {
      this.setupAdminPage(pagePath);
    }
    // Botón flotante por página
    try { this.setupFloatingButtonForPage(pagePath); } catch (e) { console.warn('FAB no inicializado:', e); }
  }

  // Contenido de página de login
  getLoginPageContent() {
    return `
      <div class="login-container">
        <div class="login-form">
          <h2>Iniciar Sesión</h2>
          <form id="loginForm">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
          </div>
            <div class="form-group">
              <label for="password">Contraseña:</label>
              <input type="password" id="password" name="password" required>
              </div>
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          </form>
          <div class="login-info">
            <p><strong>Usuario de prueba:</strong></p>
            <p>Email: maria@email.com | Contraseña: user123</p>
            <p><strong>Admin:</strong></p>
            <p>Email: admin@viajes.com | Contraseña: admin123</p>
            </div>
                      </div>
                    </div>
    `;
  }

  // Contenido de página de inicio usuario
  getHomeUserPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Viajes Ecuador</h1>
          <p class="header-subtitle">Descubre las maravillas de nuestro país</p>
                </div>
      </header>

      <main class="main-content">
        <!-- Barra superior de categorías -->
        <div class="top-categories">
          <button class="category-btn active" data-category="all">
            <i class="fas fa-th"></i>
            <span>Todos</span>
              </button>
          <button class="category-btn" data-category="paquetes">
            <i class="fas fa-suitcase-rolling"></i>
            <span>Paquetes</span>
              </button>
          <button class="category-btn" data-category="hoteles">
            <i class="fas fa-hotel"></i>
            <span>Hoteles</span>
                </button>
          <button class="category-btn" data-category="restaurantes">
            <i class="fas fa-utensils"></i>
            <span>Restaurantes</span>
          </button>
          <button class="category-btn" data-category="actividades">
            <i class="fas fa-hiking"></i>
            <span>Actividades</span>
              </button>
            </div>

        <!-- Paquetes Precargados -->
        <section class="preloaded-packages-section">
          <div class="section-header">
            <h2>Paquetes disponibles</h2>
            <p>Disfruta tu viaje con estos paquetes especiales</p>
          </div>
          
          <div id="preloadedPackagesGrid" class="packages-grid">
            <!-- Los paquetes precargados se cargarán dinámicamente aquí -->
          </div>
        </section>
          
        <!-- Productos recomendados -->
        <section class="recommended-section">
          <div class="section-header">
            <h2 id="sectionTitle">Recomendaciones para ti</h2>
            <p id="sectionDescription">Descubre opciones increíbles para tu próximo viaje</p>
            </div>
            
          <div id="productsGrid" class="products-grid">
            <!-- Los productos se cargarán dinámicamente aquí -->
            </div>
            
          <!-- Estado vacío -->
          <div id="emptyState" class="empty-state" style="display: none;">
            <div class="empty-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar los filtros o selecciona otra categoría</p>
        </div>
        </section>
      </main>

      <nav class="bottom-nav user-nav">
        <div class="nav-item active" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
          </div>
        <div class="nav-item" data-page="search">
          <i class="fas fa-search"></i>
          <span>Buscar</span>
          </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
      </div>
      </nav>
    `;
  }

  // Contenido de página de inicio admin
  getHomeAdminPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Panel de Administración</h1>
          <p class="header-subtitle">Resumen y accesos rápidos</p>
        </div>
      </header>

      <main class="main-content">
        <div class="profile-section">
          <div class="admin-stats">
            <div class="stat-card">
              <span class="stat-label">Productos</span>
              <span class="stat-value" id="statProductsHome">0</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Paquetes</span>
              <span class="stat-value" id="statPackagesHome">0</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Transportes</span>
              <span class="stat-value" id="statTransportHome">0</span>
            </div>
          </div>

          <div class="profile-actions">
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-products.html')">
              <i class="fas fa-box"></i> Gestionar Productos
            </button>
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-packages.html')">
              <i class="fas fa-suitcase"></i> Gestionar Paquetes
            </button>
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-transport.html')">
              <i class="fas fa-bus"></i> Gestionar Transporte
            </button>
            <button class="btn btn-secondary" onclick="app.loadPage('pages/profile_admin.html')">
              <i class="fas fa-user-cog"></i> Mi Perfil
            </button>
          </div>
        </div>
      </main>

      <nav class="bottom-nav admin-nav">
        <div class="nav-item active" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </div>
        <div class="nav-item" data-page="products">
          <i class="fas fa-box"></i>
          <span>Productos</span>
        </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  // Contenido de página de paquetes usuario
  getPackagesUserPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Mis Paquetes</h1>
          <p class="header-subtitle">Gestiona tus paquetes de viaje</p>
        </div>
      </header>

      <main class="main-content">
        <div class="packages-section">
          
          <div id="packagesContainer" class="packages-container">
            <!-- Los paquetes se cargarán dinámicamente aquí -->
          </div>
          
          <div id="emptyPackagesState" class="empty-state" style="display: none;">
            <div class="empty-icon">
              <i class="fas fa-suitcase"></i>
            </div>
            <h3>No tienes paquetes creados</h3>
            <p>Crea tu primer paquete de viaje personalizado</p>
          </div>
        </div>
      </main>

      <nav class="bottom-nav user-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
          </div>
        <div class="nav-item" data-page="search">
          <i class="fas fa-search"></i>
          <span>Buscar</span>
            </div>
        <div class="nav-item active" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
          </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  // Contenido de página de búsqueda usuario
  getSearchUserPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Buscar Productos</h1>
          <p class="header-subtitle">Encuentra lo que necesitas para tu viaje</p>
        </div>
      </header>

      <main class="main-content">
        <div class="search-section">
          <div class="search-form">
            <input type="text" id="searchInput" placeholder="Buscar productos..." class="search-input">
            <button id="searchButton" class="btn btn-primary">
              <i class="fas fa-search"></i> Buscar
            </button>
          </div>
          
          <div class="search-filters">
            <select id="categoryFilter" class="filter-select">
              <option value="">Todas las categorías</option>
              <option value="hoteles">Hoteles</option>
              <option value="restaurantes">Restaurantes</option>
              <option value="actividades">Actividades</option>
            </select>
            
            <select id="locationFilter" class="filter-select">
              <option value="">Todas las localidades</option>
            </select>
          </div>
          
          <div id="searchResults" class="search-results">
            <!-- Los resultados se mostrarán aquí -->
          </div>
        </div>
      </main>

      <nav class="bottom-nav user-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
            </div>
        <div class="nav-item active" data-page="search">
          <i class="fas fa-search"></i>
          <span>Buscar</span>
            </div>
        <div class="nav-item" data-page="packages">
                  <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
              </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
            </div>
      </nav>
    `;
  }

  // Contenido de página de perfil usuario
  getProfileUserPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Mi Perfil</h1>
          <p class="header-subtitle">Gestiona tu cuenta y preferencias</p>
                      </div>
      </header>

      <main class="main-content">
        <div class="profile-section">
          <div class="profile-info">
            <div class="profile-avatar">
              <img id="userAvatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Avatar">
                    </div>
            <div class="profile-details">
              <h2 id="userName">Usuario</h2>
              <p id="userEmail">email@ejemplo.com</p>
                </div>
            </div>
            
          <div class="profile-actions">
            <button class="btn btn-primary" onclick="app.loadPage('pages/new-package.html')">
              <i class="fas fa-plus"></i> Crear Nuevo Paquete
              </button>
            <button class="btn btn-secondary" onclick="app.loadPage('pages/packages_user.html')">
              <i class="fas fa-suitcase"></i> Ver Mis Paquetes
                </button>
            <button class="btn btn-danger" onclick="app.logout()">
              <i class="fas fa-sign-out-alt"></i> Cerrar sesión
              </button>
            </div>
              
          <div class="favorites-section">
            <h3>Mis Favoritos</h3>
            <div id="favoritesContainer" class="favorites-container">
              <!-- Los favoritos se cargarán dinámicamente aquí -->
          </div>
        </div>

          <div class="favorites-section">
            <h3>Transportes Disponibles</h3>
            <div id="userTransportCard" class="admin-transport-item"></div>
      </div>
        </div>
      </main>

      <nav class="bottom-nav user-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
            </div>
        <div class="nav-item" data-page="search">
          <i class="fas fa-search"></i>
          <span>Buscar</span>
          </div>
        <div class="nav-item" data-page="packages">
            <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
          </div>
        <div class="nav-item active" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  // Contenido de página de nuevo paquete
  getNewPackagePageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Crear Nuevo Paquete</h1>
          <p class="header-subtitle">Personaliza tu experiencia de viaje</p>
          </div>
      </header>

      <main class="main-content">
        <div class="new-package-section">
          <div class="package-steps">
            <div class="step active" data-step="1">
              <span class="step-number">1</span>
            </div>
            <div class="step" data-step="2">
              <span class="step-number">2</span>
            </div>
            <div class="step" data-step="3">
              <span class="step-number">3</span>
            </div>
          </div>
            
          <div id="stepContent" class="step-content">
            <!-- El contenido del paso se cargará dinámicamente -->
            </div>
        </div>
      </main>

      <nav class="bottom-nav user-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
            </div>
        <div class="nav-item" data-page="search">
          <i class="fas fa-search"></i>
          <span>Buscar</span>
        </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
      </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  // Funciones para páginas admin
  getAdminProductsPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Gestión de Productos</h1>
          <p class="header-subtitle">Administra hoteles, restaurantes y actividades</p>
        </div>
      </header>

      <main class="main-content">
        <div class="admin-section">
          <div class="admin-actions">
            <button class="btn btn-primary" id="addProductBtn">
              <i class="fas fa-plus"></i> Agregar Producto
            </button>
          </div>
          
          <div class="admin-tabs">
            <button class="admin-tab active" data-category="hoteles">Hoteles</button>
            <button class="admin-tab" data-category="restaurantes">Restaurantes</button>
            <button class="admin-tab" data-category="actividades">Actividades</button>
          </div>
          
          <div id="adminProductsList" class="admin-products-list">
            <!-- Los productos se cargarán dinámicamente -->
          </div>
        </div>
      </main>

      <nav class="bottom-nav admin-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </div>
        <div class="nav-item active" data-page="products">
          <i class="fas fa-box"></i>
          <span>Productos</span>
        </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  getAdminPackagesPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Gestión de Paquetes</h1>
          <p class="header-subtitle">Administra paquetes de viaje</p>
        </div>
      </header>

      <main class="main-content">
        <div class="admin-section">
          <div class="admin-actions">
            <button class="btn btn-primary" id="createPackageBtn">
              <i class="fas fa-plus"></i> Crear Nuevo Paquete
            </button>
          </div>
          
          <div id="adminPackagesList" class="admin-packages-list">
            <!-- Los paquetes se cargarán dinámicamente -->
          </div>
          </div>
      </main>

      <nav class="bottom-nav admin-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </div>
        <div class="nav-item" data-page="products">
          <i class="fas fa-box"></i>
          <span>Productos</span>
        </div>
        <div class="nav-item active" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  getAdminTransportPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Gestión de Transporte</h1>
          <p class="header-subtitle">Transporte único del cliente</p>
          </div>
      </header>

      <main class="main-content">
        <div class="admin-section">
          <div class="admin-actions">
            <button class="btn btn-primary" id="addTransportBtn">
              <i class="fas fa-edit"></i> Editar Transporte
            </button>
            <button class="btn btn-secondary" id="addTripBtn">
              <i class="fas fa-plus"></i> Agregar Viaje
             </button>
          </div>
          
          <div id="adminTransportList" class="admin-transport-list">
            <!-- El transporte se cargará dinámicamente -->
        </div>
          <div id="adminTripsList" class="admin-transport-list"></div>
      </div>
      </main>

      <nav class="bottom-nav admin-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </div>
        <div class="nav-item" data-page="products">
          <i class="fas fa-box"></i>
          <span>Productos</span>
        </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item active" data-page="transport">
          <i class="fas fa-bus"></i>
          <span>Transporte</span>
        </div>
        <div class="nav-item" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  getProfileAdminPageContent() {
    return `
      <header class="header">
        <div class="header-content">
          <h1 class="header-title">Perfil de Administrador</h1>
          <p class="header-subtitle">Gestiona tu cuenta y configuración</p>
          </div>
      </header>

      <main class="main-content">
        <div class="profile-section">
          <div class="profile-info">
            <div class="profile-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Admin">
            </div>
            <div class="profile-details">
              <h2 id="adminName">Administrador</h2>
              <p id="adminEmail">admin@viajes.com</p>
            </div>
          </div>
          
          <div class="admin-stats">
            <div class="stat-card">
              <span class="stat-label">Productos</span>
              <span class="stat-value" id="statProducts">0</span>
          </div>
            <div class="stat-card">
              <span class="stat-label">Paquetes</span>
              <span class="stat-value" id="statPackages">0</span>
          </div>
            <div class="stat-card">
              <span class="stat-label">Transportes</span>
              <span class="stat-value" id="statTransport">0</span>
          </div>
        </div>
          
          <div class="profile-actions">
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-products.html')">
              <i class="fas fa-box"></i> Gestionar Productos
            </button>
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-packages.html')">
              <i class="fas fa-suitcase"></i> Gestionar Paquetes
            </button>
            <button class="btn btn-primary" onclick="app.loadPage('pages/admin-transport.html')">
              <i class="fas fa-bus"></i> Gestionar Transporte
            </button>
            <button class="btn btn-danger" onclick="app.logout()">
              <i class="fas fa-sign-out-alt"></i> Cerrar sesión
            </button>
          </div>
        </div>
      </main>

      <nav class="bottom-nav admin-nav">
        <div class="nav-item" data-page="home">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </div>
        <div class="nav-item" data-page="products">
          <i class="fas fa-box"></i>
          <span>Productos</span>
        </div>
        <div class="nav-item" data-page="packages">
          <i class="fas fa-suitcase"></i>
          <span>Paquetes</span>
        </div>
        <div class="nav-item active" data-page="profile">
          <i class="fas fa-user"></i>
          <span>Perfil</span>
        </div>
      </nav>
    `;
  }

  // Configurar página de inicio usuario
  setupHomeUserPage() {
    console.log('Configurando página de inicio usuario');
    this.inPackageCreationFlow = false;
    this.loadHomeProductsDirectly();
    this.loadPreloadedPackages();
    this.setupHomeFilterButtons();
    this.setupLocationFilter();
    this.setupUserNavigation();
  }

  // Configurar página de paquetes usuario
  setupPackagesUserPage() {
    console.log('Configurando página de paquetes usuario');
    this.inPackageCreationFlow = false;
    this.loadUserPackages();
    this.setupUserNavigation();
  }

  // Configurar página de búsqueda usuario
  setupSearchUserPage() {
    console.log('Configurando página de búsqueda usuario');
    this.inPackageCreationFlow = false;
    this.setupUserNavigation();
    this.setupSearchFunctionality();
    this.loadSearchResults();
  }

  // Configurar página de perfil usuario
  setupProfileUserPage() {
    console.log('Configurando página de perfil usuario');
    this.inPackageCreationFlow = false;
    this.setupUserNavigation();
    this.setupProfileActions();
    // Renderizar transportes disponibles
    this.renderAdminSingleTransport();
  }


  // Configurar flujo de creación de paquetes
  setupPackageCreationFlow() {
    console.log('Configurando flujo de creación de paquetes');
    this.inPackageCreationFlow = true;
    
    // Verificar si hay un paquete precargado para editar
    const preloadedPackageData = localStorage.getItem('editingPreloadedPackage');
    
    if (preloadedPackageData) {
      // Cargar paquete precargado
      const preloadedPackage = JSON.parse(preloadedPackageData);
      console.log('Cargando paquete precargado:', preloadedPackage);
      
      // Separar productos de transporte
      const productos = preloadedPackage.productos.filter(p => p.categoria !== 'transporte');
      const transporte = preloadedPackage.productos.find(p => p.categoria === 'transporte');
      
      // Inicializar estado del paquete con datos precargados
      this.currentPackage = {
        id: Date.now(),
        nombre: preloadedPackage.nombre,
        descripcion: preloadedPackage.descripcion,
        localidad: preloadedPackage.localidad,
        productos: [...productos], // Solo productos, no transporte
        precioTotal: preloadedPackage.precio_total,
        fechaCreacion: new Date().toISOString(),
        usuarioId: this.currentUser ? this.currentUser.id : 1
      };
      
      // Si hay transporte en el paquete precargado, configurarlo
      if (transporte) {
        // Buscar un transporte real que coincida con la localidad
        const transportes = getTransportes();
        const matchingTransport = transportes.find(t => 
          t.localidad_destino === preloadedPackage.localidad || 
          t.localidad_destino.toLowerCase().includes(preloadedPackage.localidad.toLowerCase())
        );
        
        if (matchingTransport) {
          this.currentPackage.transporteId = matchingTransport.id;
          console.log('Transporte configurado automáticamente:', matchingTransport);
        }
      }
      
      // Limpiar el paquete precargado del localStorage
      localStorage.removeItem('editingPreloadedPackage');
      
      // Mostrar mensaje de confirmación
      alert(`¡Perfecto! Has cargado el paquete "${preloadedPackage.nombre}" como base. Ahora puedes modificar los productos según tus preferencias.`);
      
    } else {
      // Inicializar estado del paquete vacío
      this.currentPackage = {
        id: Date.now(),
        nombre: '',
        descripcion: '',
        localidad: '',
        productos: [],
        precioTotal: 0,
        fechaCreacion: new Date().toISOString(),
        usuarioId: this.currentUser ? this.currentUser.id : 1
      };
    }
    
    // Mostrar primer paso
    this.showPackageStep(1);
    
    // Configurar botones de navegación entre pasos
    this.setupStepNavigation();
  }

  // Mostrar paso específico del paquete
  showPackageStep(stepNumber) {
    console.log('Mostrando paso:', stepNumber);
    
    // Actualizar indicadores de pasos
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
      if (index + 1 === stepNumber) {
        step.classList.add('active');
    } else {
        step.classList.remove('active');
      }
    });
    
    // Mostrar contenido del paso
    const stepContent = document.getElementById('stepContent');
    if (stepContent) {
      stepContent.innerHTML = this.getStepContent(stepNumber);
      
      // Configurar funcionalidad específica del paso
      this.setupStepFunctionality(stepNumber);
    }
  }

  // Obtener contenido del paso
  getStepContent(stepNumber) {
    switch(stepNumber) {
      case 1:
        return this.getStep1Content();
      case 2:
        return this.getStep2Content();
      case 3:
        return this.getStep3Content();
      default:
        return '<p>Paso no válido</p>';
    }
  }

  // Contenido del paso 1: Seleccionar transporte
  getStep1Content() {
    const transportes = getTransportes();
    const options = transportes.map(transporte => 
      `<option value="${transporte.localidad_destino}" data-transporte-id="${transporte.id}">
        ${transporte.nombre} - ${transporte.localidad_destino} ($${transporte.precio})
      </option>`
    ).join('');
    
    return `
      <div class="step-content-inner">
        <h3>Paso 1: Selecciona tu transporte</h3>
        <p>Elige el transporte que te llevará a tu destino</p>
        
        <div class="form-group">
          <label for="transporteSelect">Transporte:</label>
          <select id="transporteSelect" class="location-select">
            <option value="">Selecciona un transporte</option>
            ${options}
          </select>
            </div>
        
        <div class="step-actions">
          <button class="btn btn-primary" id="nextStep1">Continuar</button>
            </div>
          </div>
    `;
  }

  // Contenido del paso 2: Agregar productos
  getStep2Content() {
    if (!this.currentPackage.localidad) {
      return `
        <div class="step-content-inner">
          <p>Primero debes seleccionar un transporte en el paso 1</p>
          <button class="btn btn-secondary" onclick="app.showPackageStep(1)">Volver al paso 1</button>
            </div>
      `;
    }
    
    const transporte = this.getTransporteById(this.currentPackage.transporteId);
    const transporteInfo = transporte ? 
      `${transporte.nombre} - ${transporte.empresa} ($${transporte.precio})` : 
      this.currentPackage.localidad;
    
    return `
      <div class="step-content-inner">
        <h3>Paso 2: Agrega productos a tu paquete</h3>
        <p>Destino: <strong>${this.currentPackage.localidad}</strong></p>
        <p>Transporte: <strong>${transporteInfo}</strong></p>
        
        <div class="products-selection">
          <div class="category-tabs">
            <button class="category-tab active" data-category="hoteles">Hoteles</button>
            <button class="category-tab" data-category="restaurantes">Restaurantes</button>
            <button class="category-tab" data-category="actividades">Actividades</button>
              </div>
              
          <div id="productsList" class="products-list">
            <!-- Los productos se cargarán dinámicamente -->
                </div>
              </div>
              
        <div class="package-summary">
          <h4>Resumen del paquete <span id="productCounter" class="product-counter">(0 productos)</span></h4>
          <div id="packageProducts" class="package-products-list">
            <!-- Productos agregados se mostrarán aquí -->
                  </div>
          <div class="package-total">
            <strong>Total: $<span id="packageTotal">0</span></strong>
                  </div>
              </div>
        
        <div class="step-actions">
          <button class="btn btn-secondary" onclick="app.showPackageStep(1)">Anterior</button>
          <button class="btn btn-primary" id="nextStep2">Continuar</button>
          </div>
        </div>
      `;
  }

  // Contenido del paso 3: Confirmar paquete
  getStep3Content() {
    if (this.currentPackage.productos.length === 0) {
      return `
        <div class="step-content-inner">
          <div class="empty-state">
            <div class="empty-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Paquete incompleto</h3>
            <p>Debes agregar al menos un producto a tu paquete antes de continuar</p>
            <button class="btn btn-secondary" onclick="app.showPackageStep(2)">
              <i class="fas fa-arrow-left"></i> Volver al paso 2
            </button>
          </div>
        </div>
      `;
    }
    
    const transporte = this.getTransporteById(this.currentPackage.transporteId);
    const transporteInfo = transporte ? `${transporte.nombre} - $${transporte.precio}` : 'No especificado';
    
    return `
      <div class="step-content-inner">
        <h3>Paso 3: Confirma tu paquete</h3>
        
        <div class="package-final-summary">
          <div class="package-summary-grid">
            <div class="package-details-column">
              <h4><i class="fas fa-info-circle"></i> Detalles del paquete</h4>
              <div class="package-details">
                <p><strong>Destino:</strong> ${this.currentPackage.localidad || 'No especificado'}</p>
                <p><strong>Transporte:</strong> ${transporteInfo}</p>
                <p><strong>Productos incluidos:</strong> ${this.currentPackage.productos.length} productos</p>
                <p><strong>Duración:</strong> ${this.currentPackage.duracion || 'No especificada'}</p>
                <p><strong>Dificultad:</strong> ${this.currentPackage.dificultad || 'No especificada'}</p>
              </div>
            </div>
            
            <div class="package-products-column">
              <h5><i class="fas fa-list"></i> Productos seleccionados</h5>
              <div id="finalProductsList">
                <!-- Lista final de productos se cargará dinámicamente -->
              </div>
            </div>
            
            <div class="package-total-summary">
              <h4><i class="fas fa-calculator"></i> Resumen de costos</h4>
              <div class="total-amount">$${this.currentPackage.precioTotal || 0}</div>
            </div>
          </div>
        </div>
        
        <div class="step-actions">
          <button class="btn btn-secondary" onclick="app.showPackageStep(2)">
            <i class="fas fa-arrow-left"></i> Anterior
          </button>
          <button class="btn btn-primary" id="createPackage">
            <i class="fas fa-check"></i> Crear Paquete
          </button>
        </div>
      </div>
    `;
  }

  // Configurar funcionalidad del paso
  setupStepFunctionality(stepNumber) {
    switch(stepNumber) {
      case 1:
        this.setupStep1Functionality();
        break;
      case 2:
        this.setupStep2Functionality();
        break;
      case 3:
        this.setupStep3Functionality();
        break;
    }
  }

  // Configurar funcionalidad del paso 1
  setupStep1Functionality() {
    const transporteSelect = document.getElementById('transporteSelect');
    const nextButton = document.getElementById('nextStep1');
    
    if (transporteSelect && nextButton) {
      transporteSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const localidad = e.target.value;
        const transporteId = selectedOption.dataset.transporteId;
        
        this.currentPackage.localidad = localidad;
        this.currentPackage.transporteId = transporteId;
        this.selectedLocalidad = localidad;
        
        console.log('Transporte seleccionado:', {
          localidad: this.currentPackage.localidad,
          transporteId: this.currentPackage.transporteId
        });
        
        // Actualizar resumen inmediatamente cuando se selecciona transporte
        this.updatePackageSummary();
      });
      
      nextButton.addEventListener('click', () => {
        if (this.currentPackage.localidad) {
          this.showPackageStep(2);
        } else {
          alert('Por favor selecciona un transporte');
        }
      });
    }
  }

  // Configurar funcionalidad del paso 2
  setupStep2Functionality() {
    this.loadProductsForLocalidad();
    this.setupCategoryTabs();
    this.updatePackageSummary();
    
    // Configurar botón continuar
    const nextButton = document.getElementById('nextStep2');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (this.currentPackage.productos.length > 0) {
          this.showPackageStep(3);
        } else {
          alert('Debes agregar al menos un producto al paquete');
        }
      });
    }
  }

  // Configurar botones de agregar producto
  setupAddProductButtons() {
    const addButtons = document.querySelectorAll('.add-product-btn');
    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        console.log('Click en botón agregar para producto:', productId);
        this.addProductToPackage(productId);
      });
    });
  }

  // Configurar funcionalidad del paso 3
  setupStep3Functionality() {
    this.updateFinalPackageSummary();
    
    const createButton = document.getElementById('createPackage');
    if (createButton) {
      createButton.addEventListener('click', () => {
        this.createPackage();
      });
    }
  }

  // Cargar productos para la localidad seleccionada
  loadProductsForLocalidad() {
    if (!this.currentPackage.localidad) return;
    
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    // Mostrar hoteles por defecto
    this.showProductsByCategory('hoteles');
  }

  // Configurar pestañas de categorías
  setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover activo de todas las pestañas
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Mostrar productos de la categoría seleccionada
        const category = tab.dataset.category;
        this.showProductsByCategory(category);
      });
    });
  }

  // Mostrar productos por categoría
  showProductsByCategory(category) {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    const products = getProductsByCategory(category);
    const filteredProducts = products.filter(product => 
      product.localidad === this.currentPackage.localidad
    );
    
    if (filteredProducts.length === 0) {
      productsList.innerHTML = `
        <div class="no-products">
          <p>No hay productos de ${category} disponibles en ${this.currentPackage.localidad}</p>
        </div>
      `;
      return;
    }

    productsList.innerHTML = filteredProducts.map(product => `
      <div class="product-item" data-product-id="${product.id}">
        <div class="product-item-image">
          <img src="${product.imagen}" alt="${product.nombre}">
                </div>
        <div class="product-item-info">
          <h4>${product.nombre}</h4>
          <p>${product.descripcion}</p>
          <p class="product-price">$${product.precio}</p>
              </div>
        <div class="product-item-actions">
          <button class="btn btn-primary btn-small add-product-btn" data-product-id="${product.id}">
            Agregar
             </button>
        </div>
      </div>
    `).join('');
    
    // Agregar event listeners a los botones de agregar
    this.setupAddProductButtons();
  }

  // Agregar producto al paquete (abre componente según tipo y luego confirma)
  addProductToPackage(productId) {
    console.log('=== DEBUG addProductToPackage ===');
    console.log('ID del producto recibido:', productId);
    console.log('Tipo de ID:', typeof productId);
    
    const product = this.findProductById(productId);
    if (!product) {
      console.error('❌ No se pudo encontrar el producto con ID:', productId);
      return;
    }
    
    console.log('✅ Producto encontrado:', product);
    console.log('Categoría del producto:', product.categoria);
    
    // Establecer flag de que estamos en flujo de creación de paquete
    window.inPackageCreationFlow = true;
    
    // Si estamos en flujo de creación o desde home/search, abrir el componente correspondiente
    if (product.categoria === 'hoteles') {
      console.log('🏨 Abriendo modal de hotel para:', product.nombre);
      this.showHotelSelectionModal(product);
      return;
    }
    if (product.categoria === 'actividades') {
      console.log('🎡 Abriendo modal de actividad para:', product.nombre);
      this.showActivitySelectionModal(product);
      return;
    }
    if (product.categoria === 'restaurantes') {
      console.log('🍽️ Abriendo modal de restaurante para:', product.nombre);
      this.showRestaurantMealSelectionModal(product);
      return;
    }
    if (product.categoria === 'comidas') {
      console.log('🍽️ Abriendo modal de comida para:', product.nombre);
      this.showComidaSelectionModal(product);
      return;
    }
    
    console.log('📦 Abriendo modal de paquete para:', product.nombre);
    // Para otros tipos, abrir directamente modal de paquete
    this.showAddToPackageModal(product);
  }

  // Remover producto del paquete
  removeProductFromPackage(productId) {
    const productIndex = this.currentPackage.productos.findIndex(p => p.id === productId);
    if (productIndex === -1) return;
    
    const product = this.currentPackage.productos[productIndex];
    this.currentPackage.productos.splice(productIndex, 1);
    this.currentPackage.precioTotal -= product.precio;
    
    console.log('Producto removido del paquete:', product.nombre);
    
    // Actualizar resumen
    this.updatePackageSummary();
  }

  // Actualizar resumen del paquete
  updatePackageSummary() {
    const packageProducts = document.getElementById('packageProducts');
    const packageTotal = document.getElementById('packageTotal');
    const productCounter = document.getElementById('productCounter');
    
    if (packageProducts && packageTotal) {
      let productsHtml = '';
      
      // Agregar transporte si está seleccionado
      if (this.currentPackage.transporteId) {
        const transporte = this.getTransporteById(this.currentPackage.transporteId);
        if (transporte) {
          productsHtml += `
            <div class="package-product-item package-transporte-item">
              <div class="product-name">${transporte.nombre}</div>
              <div class="product-details">
                <span class="product-category">Transporte</span>
                <span class="product-price">$${transporte.precio}</span>
              </div>
            </div>
          `;
        }
      }
      
      // Agregar productos
      productsHtml += this.currentPackage.productos.map(product => {
        const categoryIcon = this.getProductIcon(product.categoria);
        const categoryName = this.getCategoryDisplayName(product.categoria);
        
        // Si es un restaurante con comidas seleccionadas, mostrar detalles
        if (product.categoria === 'restaurantes' && product.comidasSeleccionadas && product.comidasSeleccionadas.length > 0) {
          const comidasHtml = product.comidasSeleccionadas.map(comida => 
            `<div class="meal-detail">• ${comida.nombre} - $${comida.precio}</div>`
          ).join('');
          
          return `
            <div class="package-product-item">
              <div class="product-name">${categoryIcon} ${product.nombre}</div>
              <div class="product-details">
                <span class="product-category">${categoryName}</span>
                <span class="product-price">$${product.precioTotal || product.precio}</span>
              </div>
              <div class="restaurant-meals">
                ${comidasHtml}
              </div>
            </div>
          `;
        } else {
          // Producto normal
          return `
            <div class="package-product-item">
              <div class="product-name">${categoryIcon} ${product.nombre}</div>
              <div class="product-details">
                <span class="product-category">${categoryName}</span>
                <span class="product-price">$${product.precioTotal || product.precio}</span>
              </div>
            </div>
          `;
        }
      }).join('');
      
      packageProducts.innerHTML = productsHtml;
      
      // Actualizar contador de productos
      if (productCounter) {
        const productCount = this.currentPackage.productos.length;
        productCounter.textContent = `(${productCount} ${productCount === 1 ? 'producto' : 'productos'})`;
      }
      
      // Calcular total incluyendo transporte
      let total = this.currentPackage.precioTotal;
      if (this.currentPackage.transporteId) {
        const transporte = this.getTransporteById(this.currentPackage.transporteId);
        if (transporte) {
          total += transporte.precio;
        }
      }
      packageTotal.textContent = total;
    }
  }

  // Actualizar resumen final del paquete
  updateFinalPackageSummary() {
    const finalProductsList = document.getElementById('finalProductsList');
    if (finalProductsList) {
      if (this.currentPackage.productos.length === 0) {
        finalProductsList.innerHTML = `
          <div class="empty-state">
            <p>No hay productos agregados al paquete</p>
          </div>
        `;
        return;
      }

      finalProductsList.innerHTML = this.currentPackage.productos.map(product => {
        const categoryIcon = this.getProductIcon(product.categoria);
        const categoryName = this.getCategoryDisplayName(product.categoria);
        
        // Si es un restaurante con comidas seleccionadas, mostrar detalles
        if (product.categoria === 'restaurantes' && product.comidasSeleccionadas && product.comidasSeleccionadas.length > 0) {
          const comidasHtml = product.comidasSeleccionadas.map(comida => 
            `<div class="meal-detail">• ${comida.nombre} - $${comida.precio}</div>`
          ).join('');
          
          return `
            <div class="final-product-item">
              <div class="product-name">${categoryIcon} ${product.nombre}</div>
              <div class="product-details">
                <span class="product-category">${categoryName}</span>
                <span class="product-price">$${product.precioTotal || product.precio}</span>
              </div>
              <div class="restaurant-meals">
                ${comidasHtml}
              </div>
            </div>
          `;
        }
        
          // Producto normal
          return `
            <div class="final-product-item">
            <div class="product-name">${categoryIcon} ${product.nombre}</div>
            <div class="product-details">
              <span class="product-category">${categoryName}</span>
              <span class="product-price">$${product.precioTotal || product.precio}</span>
            </div>
            </div>
          `;
      }).join('');
    }
  }

  // Crear el paquete final
  createPackage() {
    if (this.currentPackage.productos.length === 0) {
      alert('Debes agregar al menos un producto al paquete');
      return;
    }
    
    // Generar nombre del paquete si no tiene
    if (!this.currentPackage.nombre) {
      this.currentPackage.nombre = `Paquete ${this.currentPackage.localidad} - ${new Date().toLocaleDateString()}`;
    }
    
    // Generar descripción si no tiene
    if (!this.currentPackage.descripcion) {
      this.currentPackage.descripcion = `Paquete personalizado para ${this.currentPackage.localidad} con ${this.currentPackage.productos.length} productos`;
    }
    
    // Agregar información del transporte
    const transporte = this.getTransporteById(this.currentPackage.transporteId);
    if (transporte) {
      this.currentPackage.transporte = {
        id: transporte.id,
        nombre: transporte.nombre,
        empresa: transporte.empresa,
        precio: transporte.precio,
        horario: transporte.horario,
        duracion: transporte.duracion
      };
      // Agregar precio del transporte al total
      this.currentPackage.precioTotal += transporte.precio;
    }
    
    // Guardar paquete
    this.savePackage();
    
    // Mostrar confirmación
    alert('¡Paquete creado exitosamente!');
    
    // Navegar a la página de paquetes
    this.navigateToPage('packages');
  }

  // Guardar paquete en localStorage por usuario
  savePackage() {
    try {
      const userId = this.currentUser?.id || 1;
      const key = `packages_${userId}`;
      const existingPackages = JSON.parse(localStorage.getItem(key) || '[]');
      
      // Calcular precio_total (productos + transporte)
      const transporte = this.currentPackage.transporteId ? this.getTransporteById(this.currentPackage.transporteId) : null;
      const totalProductos = this.currentPackage.productos.reduce((acc, p) => acc + (p.precio || 0), 0);
      const precioTransporte = transporte ? (transporte.precio || 0) : 0;
      this.currentPackage.precio_total = totalProductos + precioTransporte;
      
      // Imagen predeterminada estilo hoteles si no hay imagen en el paquete
      if (!this.currentPackage.imagen) {
        this.currentPackage.imagen = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop';
      }
      
      existingPackages.push({ ...this.currentPackage });
      localStorage.setItem(key, JSON.stringify(existingPackages));
      console.log('Paquete guardado exitosamente en', key);
      
      this.currentPackage = null;
      this.selectedLocalidad = null;
      
    } catch (error) {
      console.error('Error guardando paquete:', error);
      alert('Error al guardar el paquete');
    }
  }

  // Buscar producto por ID
  findProductById(productId) {
    // Versión unificada: prioriza datos de data/products.js y fallback a internos
    return this.resolveProductById(Number(productId));
  }

  // Buscar transporte por ID
  getTransporteById(transporteId) {
    const transportes = getTransportes();
    return transportes.find(transporte => transporte.id === parseInt(transporteId));
  }

  // Mostrar mensaje de producto agregado
  showProductAddedMessage(productName) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'product-notification';
    notification.innerHTML = `
      <i class="fas fa-check"></i>
      <span>${productName} agregado al paquete</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // Configurar navegación entre pasos
  setupStepNavigation() {
    // Esta función se puede expandir para manejar navegación entre pasos
    console.log('Navegación entre pasos configurada');
  }

  // Configurar acciones del perfil
  setupProfileActions() {
    const createPackageBtn = document.querySelector('.btn-create-package');
    if (createPackageBtn) {
      createPackageBtn.addEventListener('click', () => {
        this.loadPage('pages/new-package.html');
      });
    }
  }

  // Configurar página de nuevo paquete
  setupNewPackagePage() {
    console.log('Configurando página de nuevo paquete');
    this.setupUserNavigation();
    this.setupPackageCreationFlow();
  }

  // Configurar página admin
  setupAdminPage(pagePath) {
    console.log('Configurando página admin:', pagePath);
    
    // Configurar solo navegación de admin
    this.setupAdminNavigation();
    
    // Debug: verificar contenido de la página
    this.debugAdminPageContent();
    
    // Verificar que la navegación se configuró correctamente después de un delay
    setTimeout(() => {
      const adminNavItems = document.querySelectorAll('.admin-nav .nav-item');
      if (adminNavItems.length === 0) {
        console.error('Error: La navegación admin no se configuró correctamente');
        console.log('Reintentando configuración...');
        this.setupAdminNavigation();
      } else {
        console.log('Navegación admin verificada correctamente:', adminNavItems.length, 'elementos');
      }
    }, 300);
    
    if (pagePath.includes('profile_admin') || pagePath.includes('home_admin')) {
      // Setear counters en perfil admin
      const statProducts = document.getElementById('statProducts') || document.getElementById('statProductsHome');
      const statPackages = document.getElementById('statPackages') || document.getElementById('statPackagesHome');
      const statTransport = document.getElementById('statTransport') || document.getElementById('statTransportHome');

      if (statProducts) {
        const totalProducts = getAllProducts().length;
        statProducts.textContent = totalProducts;
      }
      if (statPackages) {
        // Paquetes demo: contar de localStorage de admin o total demo
        const userId = this.currentUser?.id || 1;
        const key = `packages_${userId}`;
        const pkgs = JSON.parse(localStorage.getItem(key) || '[]');
        statPackages.textContent = pkgs.length;
      }
      if (statTransport) {
        statTransport.textContent = (getTransportes() || []).length;
      }
    }

    if (pagePath.includes('admin-products')) {
      this.setupAdminProductsPage();
    }
    if (pagePath.includes('admin-packages')) {
      this.setupAdminPackagesPage();
    }
    if (pagePath.includes('admin-transport')) {
      this.setupAdminTransportSingle();
    }
  }

  // Botón flotante por página (admin → transportes, usuario → menú agregar)
  setupFloatingButtonForPage(pagePath) {
    try {
      // No mostrar en login
      if (pagePath.includes('login')) {
        const prev = document.getElementById('globalFab');
        if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
      return;
    }
      // Limpiar si existe
      const existing = document.getElementById('globalFab');
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

      const isAdmin = this.currentUser && this.currentUser.tipo === 'admin';
      const fab = document.createElement('button');
      fab.id = 'globalFab';
      fab.className = 'fab-button';
      fab.type = 'button';
      fab.setAttribute('aria-label', isAdmin ? 'Ir a transportes' : 'Agregar');
      fab.innerHTML = isAdmin ? '<i class="fas fa-bus"></i>' : '<i class="fas fa-plus"></i>';
      fab.onclick = () => isAdmin ? this.loadPage('pages/admin-transport.html') : this.showUserAddMenu();

      document.body.appendChild(fab);
    } catch (e) {
      console.warn('Error creando FAB:', e);
    }
  }

  // Menú de usuario al pulsar FAB: muestra paquetes y opción crear
  async showUserAddMenu() {
    try {
      const prev = document.getElementById('fabMenuOverlay');
      if (prev && prev.parentNode) prev.parentNode.removeChild(prev);

      const overlay = document.createElement('div');
      overlay.id = 'fabMenuOverlay';
      overlay.className = 'fab-overlay';

      const sheet = document.createElement('div');
      sheet.className = 'fab-sheet';
      sheet.innerHTML = `
        <div class="fab-sheet-header">
          <span class="drag-handle"></span>
          <h3>Mis Paquetes</h3>
          <button class="close-fab-sheet" aria-label="Cerrar">&times;</button>
        </div>
        <div class="fab-sheet-body">
          <div id="fabPackagesList" class="fab-packages-list"></div>
        </div>
        <div class="fab-sheet-actions">
          <button class="btn btn-primary" id="fabCreatePackage"><i class="fas fa-plus"></i> Crear nuevo paquete</button>
          <button class="btn" id="fabGoPackages"><i class="fas fa-suitcase"></i> Ver todos</button>
        </div>
      `;

      overlay.appendChild(sheet);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeFabMenu(); });
      sheet.querySelector('.close-fab-sheet').addEventListener('click', () => this.closeFabMenu());

      document.getElementById('fabCreatePackage').onclick = () => { this.closeFabMenu(); this.loadPage('pages/new-package.html'); };
      document.getElementById('fabGoPackages').onclick = () => { this.closeFabMenu(); this.loadPage('pages/packages_user.html'); };

      const userId = this.currentUser?.id || 1;
      let packages = [];
      try { packages = await loadUserPackages(userId); } catch (e) { packages = JSON.parse(localStorage.getItem(`packages_${userId}`) || '[]'); }
      // Separado del flujo de agregar: el FAB no agrega productos
      this.lastSelectedProductId = null;
      this.renderUserFabPackagesList(packages);
    } catch (e) { console.warn('Error abriendo menú FAB', e); }
  }

  closeFabMenu() {
    const overlay = document.getElementById('fabMenuOverlay');
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  renderUserFabPackagesList(packages, productIdToAdd) {
    const list = document.getElementById('fabPackagesList');
    if (!list) return;
    if (!packages || packages.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fas fa-suitcase-rolling"></i></div>
          <h3>No tienes paquetes</h3>
          <p>Crea tu primer paquete y empieza a planificar tu viaje</p>
        </div>
      `;
      return;
    }

    // Si venimos desde un botón Agregar con producto, filtrar por localidad del producto
    let effectivePackages = packages;
    let productForAdd = null;
    if (productIdToAdd) {
      productForAdd = this.findProductById(productIdToAdd);
      const targetLocalidad = (productForAdd?.localidad || '').toLowerCase();
      effectivePackages = packages.filter(p => (p.localidad || '').toLowerCase() === targetLocalidad);

      // Si no hay paquetes con la misma localidad, mostrar CTA para crear uno en esa localidad
      if (effectivePackages.length === 0) {
        list.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>Sin paquetes en ${productForAdd?.localidad || 'esta localidad'}</h3>
            <p>Crea un paquete para agregar \"${productForAdd?.nombre || 'este producto'}\" en ${productForAdd?.localidad || ''}.</p>
            <div class="fab-package-actions" style="margin-top:12px;text-align:center;">
              <button class="btn btn-primary" data-create-package-matching><i class="fas fa-plus"></i> Crear paquete</button>
            </div>
          </div>
        `;
        const createBtn = list.querySelector('[data-create-package-matching]');
        if (createBtn) {
          createBtn.addEventListener('click', () => {
            try {
              if (productForAdd?.localidad) {
                localStorage.setItem('prefill_package_localidad', productForAdd.localidad);
              }
            } catch (e) {}
            this.closeFabMenu();
            this.loadPage('pages/new-package.html');
          });
        }
        return;
      }
    }

    list.innerHTML = effectivePackages.map(pkg => `
      <div class="fab-package-item">
        <div class="fab-package-main">
          <h4>${pkg.nombre || 'Paquete'}</h4>
          <p>${pkg.localidad || 'Sin localidad'} • $${pkg.precio_total || pkg.precio || 0}</p>
        </div>
        <div class="fab-package-actions">
          ${productIdToAdd ? `
            <button class="btn btn-small" data-add-to-package data-package-id="${pkg.id}"><i class="fas fa-plus"></i> Agregar</button>
          ` : `
          <button class="btn btn-small" data-open-packages><i class="fas fa-eye"></i> Ver</button>
          `}
        </div>
      </div>
    `).join('');

    if (productIdToAdd) {
      list.querySelectorAll('[data-add-to-package]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const pkgIdStr = e.currentTarget.getAttribute('data-package-id');
          const packageId = parseInt(pkgIdStr || '0', 10);
          const product = this.findProductById(productIdToAdd);
          if (!product || !packageId) {
            alert('No se pudo agregar el producto al paquete');
            return;
          }
          // Revalidar localidad por seguridad
          try {
            const userId = this.currentUser?.id || 1;
            const stored = localStorage.getItem(`packages_${userId}`);
            const pkgs = stored ? JSON.parse(stored) : [];
            const pkg = pkgs.find(p => p.id === packageId);
            const pkgLoc = (pkg?.localidad || '').toLowerCase();
            const prodLoc = (product?.localidad || '').toLowerCase();
            if (!pkg || pkgLoc !== prodLoc) {
              alert('La localidad del paquete no coincide con la del producto.');
              return;
            }
          } catch (e) {}
          try {
            const userId = this.currentUser?.id || 1;
            const success = await addProductToPackage(userId, packageId, product);
            if (success) {
              alert(`Producto "${product.nombre}" agregado al paquete`);
              this.lastSelectedProductId = null;
              this.closeFabMenu();
            } else {
              alert('No se pudo agregar el producto');
            }
          } catch (err) {
            console.error('Error al agregar producto al paquete:', err);
            alert('Error al agregar el producto al paquete');
          }
        });
      });
    } else {
    list.querySelectorAll('[data-open-packages]').forEach(btn => {
      btn.addEventListener('click', () => { this.closeFabMenu(); this.loadPage('pages/packages_user.html'); });
    });
    }
  }

  // ===== Admin: Productos =====
  setupAdminProductsPage() {
    // Cargar extras guardados por admin
    this.mergeAdminNewProducts();

    // Tabs
    const tabs = document.querySelectorAll('.admin-tab');
    let current = 'hoteles';
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        current = tab.dataset.category;
        this.renderAdminProducts(current);
      });
    });

    // Botón agregar
    const addBtn = document.getElementById('addProductBtn');
    if (addBtn) {
      addBtn.onclick = () => this.showAdminProductForm(current);
    }

    // Render inicial
    this.renderAdminProducts(current);

    // Delegación: Editar/Eliminar en la lista
    const productsList = document.getElementById('adminProductsList');
    if (productsList) {
      productsList.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const idAttr = button.getAttribute('data-id');
        if (!idAttr) return;
        const productId = parseInt(idAttr);
        if (Number.isNaN(productId)) return;

        if (button.classList.contains('btn-secondary')) {
          // Editar
          this.editAdminProduct(productId, current);
        } else if (button.classList.contains('btn-danger')) {
          // Eliminar
          this.deleteAdminProduct(current, productId);
        }
      });
    }
  }

  renderAdminProducts(category) {
    const list = document.getElementById('adminProductsList');
    if (!list) return;
    const items = getProductsByCategory(category) || [];
    if (!items.length) {
      list.innerHTML = '<p class="no-products">Sin productos en esta categoría</p>';
      return;
    }
    list.innerHTML = items.map(p => `
      <div class="admin-product-item">
        <div class="admin-item-info">
          <h4>${p.nombre}</h4>
          <p>${p.localidad || 'Sin localidad'} • $${p.precio}</p>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-secondary btn-sm" data-id="${p.id}"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn btn-danger btn-sm" data-id="${p.id}"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  // Editar producto por id
  editAdminProduct(productId, category) {
    const items = getProductsByCategory(category) || [];
    const product = items.find(p => p.id === productId);
    if (!product) { alert('Producto no encontrado'); return; }
    this.showAdminProductEditForm(category, product);
  }

  // Formulario de edición de producto
  showAdminProductEditForm(category, product) {
    // Crear modal de edición como en user
    const modalHTML = `
      <div id="editAdminProductModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Editar ${this.getCategoryDisplayName(category)}</h3>
            <button class="modal-close" onclick="app.closeEditAdminProductModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre</label>
              <input id="af_nombre" type="text" class="form-input" placeholder="Nombre" value="${product.nombre || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="af_desc" class="form-input" placeholder="Descripción">${product.descripcion || ''}</textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio</label>
              <input id="af_precio" type="number" class="form-input" placeholder="0" value="${product.precio || 0}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input id="af_localidad" type="text" class="form-input" placeholder="Quito, Baños..." value="${product.localidad || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Creador/Proveedor</label>
              <input id="af_creador" type="text" class="form-input" placeholder="Proveedor" value="${product.creador || 'Admin'}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">URL de imagen</label>
              <input id="af_imagen" type="text" class="form-input" placeholder="https://..." value="${product.imagen || ''}" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeEditAdminProductModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.updateAdminProductFromModal('${category}', ${product.id})">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de edición de producto admin
  closeEditAdminProductModal() {
    const modal = document.getElementById('editAdminProductModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Actualizar producto desde modal
  updateAdminProductFromModal(category, productId) {
    const data = {
      nombre: document.getElementById('af_nombre').value.trim(),
      descripcion: document.getElementById('af_desc').value.trim(),
      precio: parseFloat(document.getElementById('af_precio').value) || 0,
      localidad: document.getElementById('af_localidad').value.trim(),
      creador: document.getElementById('af_creador').value.trim() || 'Admin',
      imagen: document.getElementById('af_imagen').value.trim() || ''
    };
    this.updateAdminProduct(category, productId, data);
    this.closeEditAdminProductModal();
    this.renderAdminProducts(category);
  }

  // Actualizar producto en memoria y localStorage
  updateAdminProduct(category, productId, data) {
    const items = getProductsByCategory(category) || [];
    const index = items.findIndex(p => p.id === productId);
    if (index !== -1) {
      items[index] = { ...items[index], ...data, id: productId, categoria: category };
    }
    // Actualizar persistencia de admin
    const key = 'admin_new_products';
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (!saved[category]) saved[category] = [];
    const sidx = saved[category].findIndex(p => p.id === productId);
    if (sidx !== -1) {
      saved[category][sidx] = { ...saved[category][sidx], ...data, id: productId, categoria: category };
    } else {
      // Si el producto era de data base, creamos una sobreescritura en saved
      const base = items.find(p => p.id === productId);
      if (base) saved[category].push({ ...base });
    }
    localStorage.setItem(key, JSON.stringify(saved));
  }

  // Eliminar producto
  deleteAdminProduct(category, productId) {
    const items = getProductsByCategory(category) || [];
    const idx = items.findIndex(p => p.id === productId);
    if (idx === -1) { alert('Producto no encontrado'); return; }
    if (!confirm('¿Eliminar este producto?')) return;
    items.splice(idx, 1);
    const key = 'admin_new_products';
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (saved[category]) {
      saved[category] = saved[category].filter(p => p.id !== productId);
      localStorage.setItem(key, JSON.stringify(saved));
    }
    this.renderAdminProducts(category);
  }

  showAdminProductForm(category) {
    // Crear modal de agregar producto como en user
    const modalHTML = `
      <div id="addAdminProductModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Agregar ${this.getCategoryDisplayName(category)}</h3>
            <button class="modal-close" onclick="app.closeAddAdminProductModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre</label>
              <input id="af_nombre" type="text" class="form-input" placeholder="Nombre" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="af_desc" class="form-input" placeholder="Descripción"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio</label>
              <input id="af_precio" type="number" class="form-input" placeholder="0" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input id="af_localidad" type="text" class="form-input" placeholder="Quito, Baños..." />
            </div>
            
            <div class="form-group">
              <label class="form-label">Creador/Proveedor</label>
              <input id="af_creador" type="text" class="form-input" placeholder="Proveedor" />
            </div>
            
            <div class="form-group">
              <label class="form-label">URL de imagen</label>
              <input id="af_imagen" type="text" class="form-input" placeholder="https://..." />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeAddAdminProductModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.addAdminProductFromModal('${category}')">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de agregar producto admin
  closeAddAdminProductModal() {
    const modal = document.getElementById('addAdminProductModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Agregar producto desde modal
  addAdminProductFromModal(category) {
    const data = {
      nombre: document.getElementById('af_nombre').value.trim(),
      descripcion: document.getElementById('af_desc').value.trim(),
      precio: parseFloat(document.getElementById('af_precio').value) || 0,
      localidad: document.getElementById('af_localidad').value.trim(),
      creador: document.getElementById('af_creador').value.trim() || 'Admin',
      imagen: document.getElementById('af_imagen').value.trim() || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop',
    };
    this.addAdminProduct(category, data);
    this.closeAddAdminProductModal();
    this.renderAdminProducts(category);
  }

  addAdminProduct(category, data) {
    const all = getAllProducts();
    const nextId = (all.reduce((m, p) => Math.max(m, p.id || 0), 0) || 0) + 1;
    const product = {
      id: nextId,
      categoria: category,
      nombre: data.nombre || `Nuevo ${this.getCategoryDisplayName(category)}`,
      descripcion: data.descripcion || 'Sin descripción',
      precio: data.precio || 0,
      creador: data.creador || 'Admin',
      imagen: data.imagen,
      localidad: data.localidad || '',
    };
    // Mutar data quemada en memoria
    (products[category] = products[category] || []).push(product);
    // Persistir en localStorage para no perder en recarga
    const storeKey = 'admin_new_products';
    const saved = JSON.parse(localStorage.getItem(storeKey) || '{}');
    if (!saved[category]) saved[category] = [];
    saved[category].push(product);
    localStorage.setItem(storeKey, JSON.stringify(saved));
  }

  mergeAdminNewProducts() {
    const saved = JSON.parse(localStorage.getItem('admin_new_products') || '{}');
    Object.keys(saved).forEach(cat => {
      const arr = saved[cat] || [];
      if (!products[cat]) products[cat] = [];
      // Evitar duplicados por id
      const existingIds = new Set(products[cat].map(p => p.id));
      arr.forEach(p => { if (!existingIds.has(p.id)) products[cat].push(p); });
    });
  }

  // ===== Admin: Paquetes =====
  setupAdminPackagesPage() {
    this.mergeAdminNewPackages();
    const btn = document.getElementById('createPackageBtn');
    if (btn) btn.onclick = () => this.showAdminPackageForm();
    this.renderAdminPackages();

    // Delegación: Editar/Eliminar en lista de paquetes
    const packagesList = document.getElementById('adminPackagesList');
    if (packagesList) {
      packagesList.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const idAttr = button.getAttribute('data-id');
        if (!idAttr) return;
        const packageId = parseInt(idAttr);
        if (Number.isNaN(packageId)) return;

        if (button.classList.contains('btn-secondary')) {
          this.editAdminPackage(packageId);
        } else if (button.classList.contains('btn-danger')) {
          this.deleteAdminPackage(packageId);
        }
      });
    }
  }

  renderAdminPackages() {
    const list = document.getElementById('adminPackagesList');
    if (!list) return;
    const items = this.getAllAdminPackages();
    if (!items.length) {
      list.innerHTML = '<p class="no-products">Sin paquetes creados</p>';
      return;
    }
    list.innerHTML = items.map(pkg => `
      <div class="admin-package-item">
        <div class="admin-item-info">
          <h4>${pkg.nombre}</h4>
          <p>${pkg.localidad || 'Sin localidad'} • $${pkg.precio_total || pkg.precio || 0}</p>
          </div>
        <div class="admin-item-actions">
          <button class="btn btn-secondary btn-sm" data-id="${pkg.id}"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn btn-danger btn-sm" data-id="${pkg.id}"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  // Editar paquete
  editAdminPackage(packageId) {
    const items = this.getAllAdminPackages();
    const pkg = items.find(p => p.id === packageId);
    if (!pkg) { alert('Paquete no encontrado'); return; }
    this.showAdminPackageEditForm(pkg);
  }

  showAdminPackageEditForm(pkg) {
    // Crear modal de edición como en user
    const modalHTML = `
      <div id="editAdminPackageModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Editar Paquete</h3>
            <button class="modal-close" onclick="app.closeEditAdminPackageModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre del Paquete</label>
              <input id="apk_nombre" type="text" class="form-input" placeholder="Nombre del paquete" value="${pkg.nombre || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="apk_desc" class="form-input" placeholder="Descripción">${pkg.descripcion || ''}</textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input id="apk_localidad" type="text" class="form-input" placeholder="Quito, Baños..." value="${pkg.localidad || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio base</label>
              <input id="apk_precio" type="number" class="form-input" placeholder="0" value="${pkg.precio_total || pkg.precio || 0}" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeEditAdminPackageModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.updateAdminPackageFromModal(${pkg.id})">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de edición de paquete admin
  closeEditAdminPackageModal() {
    const modal = document.getElementById('editAdminPackageModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Actualizar paquete desde modal
  updateAdminPackageFromModal(packageId) {
    const items = this.getAllAdminPackages();
    const pkg = items.find(p => p.id === packageId);
    if (!pkg) return;
    
    const updated = {
      ...pkg,
      nombre: document.getElementById('apk_nombre').value.trim() || pkg.nombre,
      descripcion: document.getElementById('apk_desc').value.trim() || pkg.descripcion,
      localidad: document.getElementById('apk_localidad').value.trim() || pkg.localidad,
      precio_total: parseFloat(document.getElementById('apk_precio').value) || pkg.precio_total || pkg.precio || 0
    };
    this.updateAdminPackage(updated);
    this.closeEditAdminPackageModal();
    this.renderAdminPackages();
  }

  updateAdminPackage(pkg) {
    const key = 'admin_new_packages';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const idx = saved.findIndex(p => p.id === pkg.id);
    if (idx !== -1) {
      saved[idx] = pkg;
    } else {
      // Si era de data base, lo guardamos como edición del admin
      saved.push(pkg);
    }
    localStorage.setItem(key, JSON.stringify(saved));
  }

  deleteAdminPackage(packageId) {
    if (!confirm('¿Eliminar este paquete?')) return;
    const key = 'admin_new_packages';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const newSaved = saved.filter(p => p.id !== packageId);
    if (newSaved.length !== saved.length) {
      localStorage.setItem(key, JSON.stringify(newSaved));
    } else {
      // Si era base, marcamos como eliminado
      const delKey = 'admin_deleted_packages';
      const deleted = JSON.parse(localStorage.getItem(delKey) || '[]');
      if (!deleted.includes(packageId)) deleted.push(packageId);
      localStorage.setItem(delKey, JSON.stringify(deleted));
    }
    this.renderAdminPackages();
  }

  showAdminPackageForm() {
    // Crear modal de creación como en user
    const modalHTML = `
      <div id="createAdminPackageModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Crear Paquete</h3>
            <button class="modal-close" onclick="app.closeCreateAdminPackageModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre del Paquete</label>
              <input id="apk_nombre" type="text" class="form-input" placeholder="Nombre del paquete" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="apk_desc" class="form-input" placeholder="Descripción"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input id="apk_localidad" type="text" class="form-input" placeholder="Quito, Baños..." />
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio base</label>
              <input id="apk_precio" type="number" class="form-input" placeholder="0" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeCreateAdminPackageModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.createAdminPackageFromModal()">Crear Paquete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de creación de paquete admin
  closeCreateAdminPackageModal() {
    const modal = document.getElementById('createAdminPackageModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Crear paquete desde modal
  createAdminPackageFromModal() {
    const pkg = {
      id: Date.now(),
      nombre: document.getElementById('apk_nombre').value.trim() || 'Nuevo paquete',
      descripcion: document.getElementById('apk_desc').value.trim() || 'Paquete creado por admin',
      localidad: document.getElementById('apk_localidad').value.trim() || '',
      precio_total: parseFloat(document.getElementById('apk_precio').value) || 0,
      creador: 'admin',
      productos: [],
      imagen: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop'
    };
    this.addAdminPackage(pkg);
    this.closeCreateAdminPackageModal();
    this.renderAdminPackages();
  }

  getAllAdminPackages() {
    // Unir paquetes de data quemada + nuevos del admin (localStorage) y filtrar eliminados
    const builtIn = (typeof paquetes !== 'undefined' && Array.isArray(paquetes)) ? paquetes : [];
    const saved = JSON.parse(localStorage.getItem('admin_new_packages') || '[]');
    const deleted = JSON.parse(localStorage.getItem('admin_deleted_packages') || '[]');
    return [...builtIn, ...saved].filter(p => !deleted.includes(p.id));
  }

  addAdminPackage(pkg) {
    const saved = JSON.parse(localStorage.getItem('admin_new_packages') || '[]');
    saved.push(pkg);
    localStorage.setItem('admin_new_packages', JSON.stringify(saved));
  }

  mergeAdminNewPackages() {
    // No mutamos "paquetes" para mantener separación; usamos getAllAdminPackages en render
  }

  // ===== Admin: Transporte único =====
  setupAdminTransportSingle() {
    // Cambiar texto del botón si existe
    const addBtn = document.getElementById('addTransportBtn');
    if (addBtn) {
      addBtn.onclick = () => this.showAdminTransportForm();
    }
    const addTrip = document.getElementById('addTripBtn');
    if (addTrip) addTrip.onclick = () => this.showAdminTripForm();
    this.renderAdminSingleTransport();
    this.renderAdminTrips();
  }

  renderAdminSingleTransport() {
    // Renderizar en admin
    const adminList = document.getElementById('adminTransportList');
    if (adminList) {
      const ts = getTransportes() || [];
      if (!ts.length) {
        adminList.innerHTML = '<p class="no-products">No hay transportes configurados</p>';
      } else {
        adminList.innerHTML = ts.map(t => `
          <div class="admin-transport-item">
            <div class="admin-item-info">
              <h4>${t.nombre}</h4>
              <p>${t.empresa || ''} • $${t.precio || 0}</p>
              <p>${t.localidad_origen || ''} → ${t.localidad_destino || ''}</p>
              <p>Horario: ${t.horario || ''} • Duración: ${t.duracion || ''}</p>
            </div>
            <div class="admin-item-actions">
              <button class="btn btn-secondary btn-sm" data-edit-transport-id="${t.id}"><i class="fas fa-edit"></i> Editar</button>
              <button class="btn btn-danger btn-sm" data-delete-transport-id="${t.id}"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
          </div>
        `).join('');
      }
    }

    // Renderizar en user (sin botones de acción)
    const userCard = document.getElementById('userTransportCard');
    if (userCard) {
      const ts = getTransportes() || [];
      if (!ts.length) {
        userCard.innerHTML = '<p class="no-products">No hay transportes disponibles</p>';
      } else {
        userCard.innerHTML = ts.map(t => `
          <div class="admin-transport-item">
            <div class="admin-item-info">
              <h4>${t.nombre}</h4>
              <p>${t.empresa || ''} • $${t.precio || 0}</p>
              <p>${t.localidad_origen || ''} → ${t.localidad_destino || ''}</p>
              <p>Horario: ${t.horario || ''} • Duración: ${t.duracion || ''}</p>
            </div>
          </div>
        `).join('');
      }
    }

    // Delegación para editar transporte (solo en admin)
    if (adminList) {
      adminList.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-edit-transport-id]');
        if (!btn) return;
        this.showAdminTransportForm();
      });
    }
  }

  showAdminTransportForm() {
    // Crear modal de editar transporte como en user
    const t = (getTransportes() || [])[0] || {};
    const modalHTML = `
      <div id="editAdminTransportModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Editar Transporte</h3>
            <button class="modal-close" onclick="app.closeEditAdminTransportModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre</label>
              <input id="tr_nombre" class="form-input" value="${t.nombre || ''}" placeholder="Nombre del transporte" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input id="tr_empresa" class="form-input" value="${t.empresa || ''}" placeholder="Empresa de transporte" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio</label>
              <input id="tr_precio" type="number" class="form-input" value="${t.precio || 0}" placeholder="0" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Origen</label>
              <input id="tr_origen" class="form-input" value="${t.localidad_origen || ''}" placeholder="Ciudad de origen" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Destino</label>
              <input id="tr_destino" class="form-input" value="${t.localidad_destino || ''}" placeholder="Ciudad de destino" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Horario</label>
              <input id="tr_horario" class="form-input" value="${t.horario || ''}" placeholder="Horario de salida" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Duración</label>
              <input id="tr_duracion" class="form-input" value="${t.duracion || ''}" placeholder="Duración del viaje" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeEditAdminTransportModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.saveAdminTransportFromModal()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de editar transporte admin
  closeEditAdminTransportModal() {
    const modal = document.getElementById('editAdminTransportModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Guardar transporte desde modal
  saveAdminTransportFromModal() {
    const updated = {
      id: 1,
      nombre: (document.getElementById('tr_nombre').value || '').trim(),
      empresa: (document.getElementById('tr_empresa').value || '').trim(),
      precio: parseFloat(document.getElementById('tr_precio').value) || 0,
      localidad_origen: (document.getElementById('tr_origen').value || '').trim(),
      localidad_destino: (document.getElementById('tr_destino').value || '').trim(),
      horario: (document.getElementById('tr_horario').value || '').trim(),
      duracion: (document.getElementById('tr_duracion').value || '').trim(),
    };
    try {
      localStorage.setItem('single_transport', JSON.stringify(updated));
      this.closeEditAdminTransportModal();
      this.renderAdminSingleTransport();
      // Transporte se actualiza automáticamente
      alert('Transporte actualizado');
    } catch (e) {
      console.error('Error guardando transporte', e);
      alert('Error guardando transporte');
    }
  }

  saveSingleTransport(container) {
    const updated = {
      id: 1,
      nombre: (document.getElementById('tr_nombre').value || '').trim(),
      empresa: (document.getElementById('tr_empresa').value || '').trim(),
      precio: parseFloat(document.getElementById('tr_precio').value) || 0,
      localidad_origen: (document.getElementById('tr_origen').value || '').trim(),
      localidad_destino: (document.getElementById('tr_destino').value || '').trim(),
      horario: (document.getElementById('tr_horario').value || '').trim(),
      duracion: (document.getElementById('tr_duracion').value || '').trim(),
    };
    try {
      localStorage.setItem('single_transport', JSON.stringify(updated));
      container.innerHTML = '';
      this.renderAdminSingleTransport();
      // Transporte se actualiza automáticamente
      alert('Transporte actualizado');
    } catch (e) {
      console.error('Error guardando transporte', e);
      alert('Error guardando transporte');
    }
  }

  // ===== Admin: Viajes (Trips) =====
  getAdminTrips() {
    try {
      return JSON.parse(localStorage.getItem('admin_trips') || '[]');
    } catch (e) {
      console.warn('No se pudieron leer viajes', e);
      return [];
    }
  }

  addAdminTrip(trip) {
    const trips = this.getAdminTrips();
    trips.push(trip);
    localStorage.setItem('admin_trips', JSON.stringify(trips));
  }

  deleteAdminTrip(id) {
    if (!confirm('¿Eliminar este viaje?')) return;
    const trips = this.getAdminTrips().filter(t => t.id !== id);
    localStorage.setItem('admin_trips', JSON.stringify(trips));
    this.renderAdminTrips();
  }

  editAdminTrip(id) {
    const trips = this.getAdminTrips();
    const trip = trips.find(t => t.id === id);
    if (!trip) { alert('Viaje no encontrado'); return; }
    this.showAdminTripEditForm(trip);
  }

  showAdminTripEditForm(trip) {
    // Crear modal de editar viaje con listas de opciones
    const modalHTML = `
      <div id="editAdminTripModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Editar Viaje</h3>
            <button class="modal-close" onclick="app.closeEditAdminTripModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Origen</label>
              <select id="edit_trip_origen" class="form-input">
                <option value="">Seleccionar origen</option>
                <option value="Quito" ${trip.origen === 'Quito' ? 'selected' : ''}>Quito</option>
                <option value="Guayaquil" ${trip.origen === 'Guayaquil' ? 'selected' : ''}>Guayaquil</option>
                <option value="Cuenca" ${trip.origen === 'Cuenca' ? 'selected' : ''}>Cuenca</option>
                <option value="Ambato" ${trip.origen === 'Ambato' ? 'selected' : ''}>Ambato</option>
                <option value="Riobamba" ${trip.origen === 'Riobamba' ? 'selected' : ''}>Riobamba</option>
                <option value="Loja" ${trip.origen === 'Loja' ? 'selected' : ''}>Loja</option>
                <option value="Manta" ${trip.origen === 'Manta' ? 'selected' : ''}>Manta</option>
                <option value="Esmeraldas" ${trip.origen === 'Esmeraldas' ? 'selected' : ''}>Esmeraldas</option>
                <option value="Machala" ${trip.origen === 'Machala' ? 'selected' : ''}>Machala</option>
                <option value="Portoviejo" ${trip.origen === 'Portoviejo' ? 'selected' : ''}>Portoviejo</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Destino</label>
              <select id="edit_trip_destino" class="form-input">
                <option value="">Seleccionar destino</option>
                <option value="Quito" ${trip.destino === 'Quito' ? 'selected' : ''}>Quito</option>
                <option value="Guayaquil" ${trip.destino === 'Guayaquil' ? 'selected' : ''}>Guayaquil</option>
                <option value="Cuenca" ${trip.destino === 'Cuenca' ? 'selected' : ''}>Cuenca</option>
                <option value="Ambato" ${trip.destino === 'Ambato' ? 'selected' : ''}>Ambato</option>
                <option value="Riobamba" ${trip.destino === 'Riobamba' ? 'selected' : ''}>Riobamba</option>
                <option value="Loja" ${trip.destino === 'Loja' ? 'selected' : ''}>Loja</option>
                <option value="Manta" ${trip.destino === 'Manta' ? 'selected' : ''}>Manta</option>
                <option value="Esmeraldas" ${trip.destino === 'Esmeraldas' ? 'selected' : ''}>Esmeraldas</option>
                <option value="Machala" ${trip.destino === 'Machala' ? 'selected' : ''}>Machala</option>
                <option value="Portoviejo" ${trip.destino === 'Portoviejo' ? 'selected' : ''}>Portoviejo</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input id="edit_trip_fecha" type="date" class="form-input" value="${trip.fecha || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Capacidad</label>
              <input id="edit_trip_capacidad" type="number" min="1" class="form-input" placeholder="40" value="${trip.capacidad || ''}" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio</label>
              <input id="edit_trip_precio" type="number" min="0" class="form-input" placeholder="25" value="${trip.precio || ''}" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeEditAdminTripModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.updateAdminTripFromModal(${trip.id})">Actualizar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de editar viaje admin
  closeEditAdminTripModal() {
    const modal = document.getElementById('editAdminTripModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Actualizar viaje desde modal
  updateAdminTripFromModal(tripId) {
    const origen = (document.getElementById('edit_trip_origen').value || '').trim();
    const destino = (document.getElementById('edit_trip_destino').value || '').trim();
    const fecha = (document.getElementById('edit_trip_fecha').value || '').trim();
    const capacidad = parseInt(document.getElementById('edit_trip_capacidad').value, 10) || 0;
    const precio = parseFloat(document.getElementById('edit_trip_precio').value) || 0;

    if (!origen || !destino || !fecha || capacidad <= 0 || precio < 0) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const trips = this.getAdminTrips();
    const tripIndex = trips.findIndex(t => t.id === tripId);
    if (tripIndex === -1) {
      alert('Viaje no encontrado');
      return;
    }

    trips[tripIndex] = {
      ...trips[tripIndex],
      origen,
      destino,
      fecha,
      capacidad,
      precio,
    };

    localStorage.setItem('admin_trips', JSON.stringify(trips));
    this.closeEditAdminTripModal();
    this.renderAdminTrips();
    alert('Viaje actualizado');
  }

  showAdminTripForm() {
    // Crear modal de agregar viaje como en user
    const modalHTML = `
      <div id="addAdminTripModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Agregar Viaje</h3>
            <button class="modal-close" onclick="app.closeAddAdminTripModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Origen</label>
              <select id="trip_origen" class="form-input">
                <option value="">Seleccionar origen</option>
                <option value="Quito">Quito</option>
                <option value="Guayaquil">Guayaquil</option>
                <option value="Cuenca">Cuenca</option>
                <option value="Ambato">Ambato</option>
                <option value="Riobamba">Riobamba</option>
                <option value="Loja">Loja</option>
                <option value="Manta">Manta</option>
                <option value="Esmeraldas">Esmeraldas</option>
                <option value="Machala">Machala</option>
                <option value="Portoviejo">Portoviejo</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Destino</label>
              <select id="trip_destino" class="form-input">
                <option value="">Seleccionar destino</option>
                <option value="Quito">Quito</option>
                <option value="Guayaquil">Guayaquil</option>
                <option value="Cuenca">Cuenca</option>
                <option value="Ambato">Ambato</option>
                <option value="Riobamba">Riobamba</option>
                <option value="Loja">Loja</option>
                <option value="Manta">Manta</option>
                <option value="Esmeraldas">Esmeraldas</option>
                <option value="Machala">Machala</option>
                <option value="Portoviejo">Portoviejo</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input id="trip_fecha" type="date" class="form-input" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Capacidad</label>
              <input id="trip_capacidad" type="number" min="1" class="form-input" placeholder="40" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio</label>
              <input id="trip_precio" type="number" min="0" class="form-input" placeholder="25" />
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeAddAdminTripModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.addAdminTripFromModal()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Agregar modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Cerrar modal de agregar viaje admin
  closeAddAdminTripModal() {
    const modal = document.getElementById('addAdminTripModal');
    if (modal) {
      modal.remove();
    }
  }
  
  // Agregar viaje desde modal
  addAdminTripFromModal() {
    const origen = (document.getElementById('trip_origen').value || '').trim();
    const destino = (document.getElementById('trip_destino').value || '').trim();
    const fecha = (document.getElementById('trip_fecha').value || '').trim();
    const capacidad = parseInt(document.getElementById('trip_capacidad').value, 10) || 0;
    const precio = parseFloat(document.getElementById('trip_precio').value) || 0;

    if (!origen || !destino || !fecha || capacidad <= 0 || precio < 0) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const trip = {
      id: Date.now(),
      origen,
      destino,
      fecha,
      capacidad,
      precio,
    };

    this.addAdminTrip(trip);
    this.closeAddAdminTripModal();
    this.renderAdminTrips();
    alert('Viaje agregado');
  }

  renderAdminTrips() {
    const list = document.getElementById('adminTripsList');
    if (!list) return;
    const trips = this.getAdminTrips();
    if (!trips.length) {
      list.innerHTML = '<p class="no-products">Sin viajes programados</p>';
      return;
    }
    list.innerHTML = trips.map(t => `
      <div class="admin-transport-item">
        <div class="admin-item-info">
          <h4>${t.origen} → ${t.destino}</h4>
          <p>${t.fecha} • ${t.hora}</p>
          <p>Capacidad: ${t.capacidad} • $${t.precio}</p>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-secondary btn-sm" data-edit-trip="${t.id}"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn btn-danger btn-sm" data-del-trip="${t.id}"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    `).join('');

    // Bind delete buttons
    list.querySelectorAll('[data-del-trip]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-del-trip'), 10);
        this.deleteAdminTrip(id);
      });
    });

    // Bind edit buttons
    list.querySelectorAll('[data-edit-trip]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-edit-trip'), 10);
        this.editAdminTrip(id);
      });
    });
  }

  // Configurar navegación
  setupNavigation() {
    console.log('Configurando navegación...');
    
    // Limpiar eventos previos
    const existingNavItems = document.querySelectorAll('.nav-item');
    existingNavItems.forEach(item => {
      if (item.navClickHandler) {
        item.removeEventListener('click', item.navClickHandler);
      }
    });
    
    // Obtener elementos de navegación tanto de admin como de usuario
    const adminNavItems = document.querySelectorAll('.admin-nav .nav-item');
    const userNavItems = document.querySelectorAll('.user-nav .nav-item');
    
    console.log('Elementos de navegación admin encontrados:', adminNavItems.length);
    console.log('Elementos de navegación usuario encontrados:', userNavItems.length);
    
    // Configurar navegación de admin
    adminNavItems.forEach((item, index) => {
      console.log(`Configurando elemento admin ${index}:`, item.dataset.page);
      
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const page = item.dataset.page;
        console.log('Click en navegación admin:', page);
        
        // Actualizar estado activo solo en navegación admin
        adminNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Navegar a la página admin correspondiente
        this.navigateToAdminPage(page);
      };
      
      item.navClickHandler = clickHandler;
      item.addEventListener('click', clickHandler);
      item.style.cursor = 'pointer';
      item.style.userSelect = 'none';
    });
    
    // Configurar navegación de usuario
    userNavItems.forEach((item, index) => {
      console.log(`Configurando elemento usuario ${index}:`, item.dataset.page);
      
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const page = item.dataset.page;
        console.log('Click en navegación usuario:', page);
        
        // Actualizar estado activo solo en navegación usuario
        userNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Navegar a la página usuario correspondiente
        this.navigateToUserPage(page);
      };
      
      item.navClickHandler = clickHandler;
      item.addEventListener('click', clickHandler);
      item.style.cursor = 'pointer';
      item.style.userSelect = 'none';
    });
    
    console.log('Navegación configurada exitosamente');
  }

  // Navegar a página
  navigateToPage(page) {
    console.log('Navegando a página:', page);
    
    const isAdmin = this.currentUser && this.currentUser.tipo === 'admin';
    
    switch(page) {
      case 'home':
        this.loadPage(isAdmin ? 'pages/home_admin.html' : 'pages/home_user.html');
        break;
      case 'search':
        this.loadPage(isAdmin ? 'pages/admin-products.html' : 'pages/search_user.html');
        break;
      case 'packages':
        this.loadPage(isAdmin ? 'pages/admin-packages.html' : 'pages/packages_user.html');
        break;
      case 'profile':
        this.loadPage(isAdmin ? 'pages/profile_admin.html' : 'pages/profile_user.html');
        break;
      default:
        console.log('Página no reconocida:', page);
    }
  }

  // Navegar a página admin específica
  navigateToAdminPage(page) {
    console.log('Navegando a página admin:', page);
    
    // Verificar que el usuario actual sea admin
    if (!this.currentUser || this.currentUser.tipo !== 'admin') {
      console.error('Acceso denegado: Usuario no es admin');
      alert('Acceso denegado. Solo administradores pueden acceder a esta sección.');
      return;
    }
    
    switch(page) {
      case 'home':
        this.loadPage('pages/home_admin.html');
        break;
      case 'products':
        this.loadPage('pages/admin-products.html');
        break;
      case 'packages':
        this.loadPage('pages/admin-packages.html');
        break;
      case 'transport':
        this.loadPage('pages/admin-transport.html');
        break;
      case 'profile':
        this.loadPage('pages/profile_admin.html');
        break;
      default:
        console.log('Página admin no reconocida:', page);
    }
  }

  // Navegar a página usuario específica
  navigateToUserPage(page) {
    console.log('Navegando a página usuario:', page);
    
    // Verificar que el usuario actual sea usuario normal
    if (!this.currentUser || this.currentUser.tipo === 'admin') {
      console.error('Acceso denegado: Usuario no es usuario normal');
      alert('Acceso denegado. Solo usuarios normales pueden acceder a esta sección.');
      return;
    }
    
    switch(page) {
      case 'home':
        this.loadPage('pages/home_user.html');
        break;
      case 'search':
        this.loadPage('pages/search_user.html');
        break;
      case 'packages':
        this.loadPage('pages/packages_user.html');
        break;
      case 'profile':
        this.loadPage('pages/profile_user.html');
        break;
      default:
        console.log('Página usuario no reconocida:', page);
    }
  }

  // Configurar filtro de localidad en home
  setupLocationFilter() {
    const locationSelect = document.getElementById('homeLocationSelect');
    if (locationSelect) {
      const localidades = getLocalidades();
      localidades.forEach(localidad => {
        const option = document.createElement('option');
        option.value = localidad.nombre;
        option.textContent = localidad.nombre;
        locationSelect.appendChild(option);
      });
    }
  }

  // Configurar formulario de login
  setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }
  }

  // Manejar login
  handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = loginUser(email, password);
    if (user) {
      this.currentUser = user;
      this.loginSuccess(user);
    } else {
      this.showError('Credenciales inválidas');
    }
  }

  // Cerrar sesión
  logout() {
    try {
      console.log('Cerrando sesión y recargando página...');
      
      // Limpiar estado de la aplicación
      this.currentUser = null;
      this.currentPackage = null;
      this.selectedLocalidad = null;
      
      // Limpiar cualquier dato temporal del localStorage si es necesario
      // localStorage.removeItem('temp_data'); // Descomenta si tienes datos temporales
      
      // Recargar la página completa para limpiar todo el estado
      window.location.reload();
      
    } catch (e) {
      console.error('Error cerrando sesión:', e);
      // Fallback: recargar la página incluso si hay error
      window.location.reload();
    }
  }

  // Login exitoso
  loginSuccess(user) {
    // Limpiar cualquier error previo
    this.clearLoginErrors();
    
    // Redirigir según el tipo de usuario
    if (user.tipo === 'admin') {
      this.loadPage('pages/home_admin.html');
    } else {
      this.loadPage('pages/home_user.html').then(() => {
        // Asegurar que los productos se carguen después de que la página esté lista
    setTimeout(() => {
          this.loadHomeProductsDirectly();
        }, 300);
      });
    }
  }

  // Cargar productos directamente desde app.js
  async loadHomeProductsDirectly() {
    const productGrid = document.getElementById('productsGrid');
    if (!productGrid) return;
    
    // Obtener productos recomendados
    const products = [
      ...getProductsByCategory('hoteles').slice(0, 2),
      ...getProductsByCategory('restaurantes').slice(0, 1),
      ...getProductsByCategory('actividades').slice(0, 1),
      ...getProductsByCategory('comidas').slice(0, 2)
    ];
    
    // Renderizar productos
    productGrid.innerHTML = products.map(product => `
      <div class="product-card" data-category="${product.categoria}">
        <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.nombre}</h3>
          <p class="product-creator">${product.creador}</p>
          <p class="product-price">$${product.precio}</p>
          <div class="product-actions">
            <button class="btn btn-favorite btn-small" onclick="app.toggleFavorite(${product.id}, event)">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-primary btn-small" onclick="app.addProductToPackageFromHome(${product.id})">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Configurar botones de filtro
    this.setupHomeFilterButtons();
  }

  setupHomeFilterButtons() {
    console.log('Configurando botones de filtro de categorías...');
    const filterButtons = document.querySelectorAll('.top-categories .category-btn');
    console.log('Botones de filtro encontrados:', filterButtons.length);
    
    filterButtons.forEach((button, index) => {
      console.log(`Configurando botón ${index}:`, button.dataset.category);
      
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        console.log('Click en botón de categoría:', category);
        
        // Actualizar botones activos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Cargar productos filtrados
        this.loadHomeProductsDirectly(category);
      });
    });
    
    console.log('Botones de filtro configurados exitosamente');
  }

  async loadHomeProductsDirectly(category = 'all') {
    console.log('Cargando productos para categoría:', category);
    const productGrid = document.getElementById('productsGrid');
    const preloadedPackagesSection = document.querySelector('.preloaded-packages-section');
    
    if (!productGrid) {
      console.error('No se encontró el grid de productos');
      return;
    }
    
    // Si es la categoría "paquetes", mostrar solo paquetes precargados
    if (category === 'paquetes') {
      // Ocultar productos y mostrar paquetes precargados
      productGrid.style.display = 'none';
      if (preloadedPackagesSection) {
        preloadedPackagesSection.style.display = 'block';
      }
      // Cargar todos los paquetes precargados para la categoría "Paquetes"
      this.loadPreloadedPackages();
      return;
    } else if (category === 'all') {
      // Para "Todos", mostrar productos y algunos paquetes precargados
      productGrid.style.display = 'grid';
      if (preloadedPackagesSection) {
        preloadedPackagesSection.style.display = 'block';
      }
      // Cargar solo 3 paquetes precargados para la categoría "Todos"
      this.loadPreloadedPackages(3);
    } else {
      // Para otras categorías, mostrar productos y ocultar paquetes precargados
      productGrid.style.display = 'grid';
      if (preloadedPackagesSection) {
        preloadedPackagesSection.style.display = 'none';
      }
    }
    
    // Obtener productos según la categoría
    let products = [];
    if (category === 'all') {
      // Para "Todos" mostrar una mezcla de productos recomendados
      products = [
        ...getProductsByCategory('hoteles').slice(0, 2),
        ...getProductsByCategory('restaurantes').slice(0, 2),
        ...getProductsByCategory('actividades').slice(0, 2),
        ...getProductsByCategory('comidas').slice(0, 2)
      ];
      console.log('Productos para "Todos":', products.length);
    } else {
      // Para categorías específicas mostrar todos los productos de esa categoría
      products = getProductsByCategory(category);
      console.log(`Productos para "${category}":`, products.length);
    }
    
    // Si no hay productos, mostrar estado vacío
    if (!products || products.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>No se encontraron productos</h3>
          <p>No hay productos disponibles en la categoría "${this.getCategoryDisplayName(category)}"</p>
        </div>
      `;
      return;
    }
    
    // Renderizar productos
    productGrid.innerHTML = products.map(product => `
      <div class="product-card" data-category="${product.categoria}">
        <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.nombre}</h3>
          <p class="product-creator">${product.creador}</p>
          <p class="product-price">$${product.precio}</p>
          <div class="product-actions">
            <button class="btn btn-favorite btn-small" onclick="app.toggleFavorite(${product.id}, event)">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-primary btn-small" onclick="app.addProductToPackageFromHome(${product.id})">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Actualizar título y descripción de la sección
    this.updateSectionHeader(category);
    
    // Ocultar estado vacío si existe
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
      emptyState.style.display = 'none';
    }
  }

  // Actualizar el encabezado de la sección según la categoría
  updateSectionHeader(category) {
    const sectionTitle = document.getElementById('sectionTitle');
    const sectionDescription = document.getElementById('sectionDescription');
    
    if (sectionTitle) {
      const categoryNames = {
        'all': 'Recomendaciones para ti',
        'paquetes': 'Paquetes disponibles',
        'hoteles': 'Hoteles Disponibles',
        'restaurantes': 'Restaurantes Disponibles',
        'actividades': 'Actividades Disponibles'
      };
      sectionTitle.textContent = categoryNames[category] || 'Productos';
    }
    
    if (sectionDescription) {
      const categoryDescriptions = {
        'all': 'Descubre opciones increíbles para tu próximo viaje',
        'paquetes': 'Disfruta tu viaje con estos paquetes especiales',
        'hoteles': 'Encuentra el alojamiento perfecto para tu estadía',
        'restaurantes': 'Disfruta de la mejor gastronomía local',
        'actividades': 'Explora emocionantes actividades y aventuras'
      };
      sectionDescription.textContent = categoryDescriptions[category] || 'Descubre productos increíbles';
    }
  }

  // Obtener nombre de categoría para mostrar
  getCategoryDisplayName(category) {
    const categoryNames = {
      'all': 'Todas las categorías',
      'paquetes': 'Paquetes',
      'hoteles': 'Hoteles',
      'restaurantes': 'Restaurantes',
      'actividades': 'Actividades'
    };
    return categoryNames[category] || 'Productos';
  }

  // Cargar paquetes precargados
  loadPreloadedPackages(limit = null) {
    const packagesGrid = document.getElementById('preloadedPackagesGrid');
    if (!packagesGrid) return;

    // Paquetes precargados predeterminados
    const preloadedPackages = [
      {
        id: 'preloaded-1',
        nombre: 'Aventura en Baños',
        descripcion: 'Descubre las cascadas y aguas termales de Baños de Agua Santa',
        localidad: 'Baños',
        precio_total: 180,
        duracion: '2 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 1, nombre: 'Hotel Monte Selva', categoria: 'hoteles', precio: 80 },
          { id: 2, nombre: 'Restaurante Casa Hood', categoria: 'restaurantes', precio: 25 },
          { id: 3, nombre: 'Cascada del Pailón del Diablo', categoria: 'actividades', precio: 15 },
          { id: 4, nombre: 'Aguas Termales', categoria: 'actividades', precio: 20 },
          { id: 5, nombre: 'Transporte Quito-Baños', categoria: 'transporte', precio: 40 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-2',
        nombre: 'Costa del Pacífico',
        descripcion: 'Relájate en las hermosas playas de la costa ecuatoriana',
        localidad: 'Manta',
        precio_total: 220,
        duracion: '3 días',
        imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
        productos: [
          { id: 6, nombre: 'Hotel Oro Verde', categoria: 'hoteles', precio: 120 },
          { id: 7, nombre: 'Restaurante Mar y Tierra', categoria: 'restaurantes', precio: 35 },
          { id: 8, nombre: 'Tour de Avistamiento de Ballenas', categoria: 'actividades', precio: 45 },
          { id: 9, nombre: 'Playa de Murciélago', categoria: 'actividades', precio: 10 },
          { id: 10, nombre: 'Transporte Quito-Manta', categoria: 'transporte', precio: 10 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-3',
        nombre: 'Valle de los Lagos',
        descripcion: 'Descubre la belleza natural del valle de Otavalo y sus lagos',
        localidad: 'Otavalo',
        precio_total: 169,
        duracion: '4 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 11, nombre: 'Hotel Otavalo', categoria: 'hoteles', precio: 65 },
          { id: 12, nombre: 'Restaurante La Terraza', categoria: 'restaurantes', precio: 48 },
          { id: 13, nombre: 'Kayak en Laguna', categoria: 'actividades', precio: 35 },
          { id: 14, nombre: 'Mercado Artesanal', categoria: 'actividades', precio: 15 },
          { id: 15, nombre: 'Transporte Quito-Otavalo', categoria: 'transporte', precio: 6 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-4',
        nombre: 'Ciudad Colonial',
        descripcion: 'Recorre la historia colonial de Quito y sus alrededores',
        localidad: 'Quito',
        precio_total: 160,
        duracion: '2 días',
        imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        productos: [
          { id: 16, nombre: 'Hotel Plaza Grande', categoria: 'hoteles', precio: 90 },
          { id: 17, nombre: 'Restaurante Zazu', categoria: 'restaurantes', precio: 30 },
          { id: 18, nombre: 'Centro Histórico de Quito', categoria: 'actividades', precio: 20 },
          { id: 19, nombre: 'Mitad del Mundo', categoria: 'actividades', precio: 20 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-5',
        nombre: 'Bosque Nublado',
        descripcion: 'Explora el bosque nublado de Mindo y su biodiversidad única',
        localidad: 'Mindo',
        precio_total: 198,
        duracion: '3 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 20, nombre: 'Hotel Mindo', categoria: 'hoteles', precio: 90 },
          { id: 21, nombre: 'Restaurante El Mirador', categoria: 'restaurantes', precio: 55 },
          { id: 22, nombre: 'Senderismo Ecológico', categoria: 'actividades', precio: 28 },
          { id: 23, nombre: 'Avistamiento de Aves', categoria: 'actividades', precio: 25 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
    ];

    // Aplicar límite si se especifica
    const packagesToShow = limit ? preloadedPackages.slice(0, limit) : preloadedPackages;

    packagesGrid.innerHTML = packagesToShow.map(pkg => `
      <div class="package-card preloaded-package" data-package-id="${pkg.id}">
        <div class="package-image">
          <img src="${pkg.imagen}" alt="${pkg.nombre}">
          <div class="package-badge">
            <i class="fas fa-star"></i>
            Precargado
          </div>
        </div>
        
        <div class="package-content">
          <h3 class="package-title">${pkg.nombre}</h3>
          <p class="package-description">${pkg.descripcion}</p>
          
          <div class="package-meta">
            <span class="package-location">
              <i class="fas fa-map-marker-alt"></i>
              ${pkg.localidad}
            </span>
            
            <span class="package-duration">
              <i class="fas fa-clock"></i>
              ${pkg.duracion}
            </span>
            
            <span class="package-price">
              <i class="fas fa-dollar-sign"></i>
              $${pkg.precio_total}
            </span>
          </div>
          
          <div class="package-products-preview">
            <h4>Incluye:</h4>
            <div class="products-list">
              ${pkg.productos.slice(0, 3).map(prod => `
                <span class="product-item">
                  <i class="fas fa-${this.getProductIcon(prod.categoria)}"></i>
                  ${prod.nombre}
                </span>
              `).join('')}
              ${pkg.productos.length > 3 ? `<span class="more-items">+${pkg.productos.length - 3} más</span>` : ''}
            </div>
          </div>
          
          <div class="package-actions">
            <button class="btn btn-primary btn-small edit-preloaded-btn" data-package-id="${pkg.id}" style="position: relative; z-index: 10;">
              <i class="fas fa-edit"></i> Editar este paquete
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Agregar event listeners para los botones de editar
    packagesGrid.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.edit-preloaded-btn');
      if (editBtn) {
        e.preventDefault();
        e.stopPropagation();
        const packageId = editBtn.getAttribute('data-package-id');
        this.editPreloadedPackage(packageId);
      }
    });
  }

  // Obtener icono para categoría de producto
  getProductIcon(category) {
    const icons = {
      'hoteles': 'bed',
      'restaurantes': 'utensils',
      'actividades': 'hiking',
      'transporte': 'bus'
    };
    return icons[category] || 'tag';
  }

  // Editar paquete precargado
  editPreloadedPackage(packageId) {
    // Redirigir directamente a la página de paquetes
    this.navigateToPage('packages');
  }


  // Cargar paquetes del usuario
  async loadUserPackages() {
    if (!this.currentUser) return;
    
    const userId = this.currentUser.id;
    const userPackages = await loadUserPackages(userId);
    
    // Agregar paquetes precargados
    const preloadedPackages = this.getPreloadedPackages();
    
    // Combinar paquetes del usuario con paquetes precargados
    const allPackages = [...preloadedPackages, ...userPackages];
    
    this.renderUserPackages(allPackages);
  }

  // Obtener paquetes precargados
  getPreloadedPackages() {
    return [
      {
        id: 'preloaded-1',
        nombre: 'Aventura en Baños',
        descripcion: 'Descubre las cascadas y aguas termales de Baños de Agua Santa',
        localidad: 'Baños',
        precio_total: 180,
        duracion: '2 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 1, nombre: 'Hotel Monte Selva', categoria: 'hoteles', precio: 80 },
          { id: 2, nombre: 'Restaurante Casa Hood', categoria: 'restaurantes', precio: 25 },
          { id: 3, nombre: 'Cascada del Pailón del Diablo', categoria: 'actividades', precio: 15 },
          { id: 4, nombre: 'Aguas Termales', categoria: 'actividades', precio: 20 },
          { id: 5, nombre: 'Transporte Quito-Baños', categoria: 'transporte', precio: 40 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-2',
        nombre: 'Costa del Pacífico',
        descripcion: 'Relájate en las hermosas playas de la costa ecuatoriana',
        localidad: 'Manta',
        precio_total: 220,
        duracion: '3 días',
        imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
        productos: [
          { id: 6, nombre: 'Hotel Oro Verde', categoria: 'hoteles', precio: 120 },
          { id: 7, nombre: 'Restaurante Mar y Tierra', categoria: 'restaurantes', precio: 35 },
          { id: 8, nombre: 'Tour de Avistamiento de Ballenas', categoria: 'actividades', precio: 45 },
          { id: 9, nombre: 'Playa de Murciélago', categoria: 'actividades', precio: 10 },
          { id: 10, nombre: 'Transporte Quito-Manta', categoria: 'transporte', precio: 10 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-3',
        nombre: 'Valle de los Lagos',
        descripcion: 'Descubre la belleza natural del valle de Otavalo y sus lagos',
        localidad: 'Otavalo',
        precio_total: 169,
        duracion: '4 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 11, nombre: 'Hotel Otavalo', categoria: 'hoteles', precio: 65 },
          { id: 12, nombre: 'Restaurante La Terraza', categoria: 'restaurantes', precio: 48 },
          { id: 13, nombre: 'Kayak en Laguna', categoria: 'actividades', precio: 35 },
          { id: 14, nombre: 'Mercado Artesanal', categoria: 'actividades', precio: 15 },
          { id: 15, nombre: 'Transporte Quito-Otavalo', categoria: 'transporte', precio: 6 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-4',
        nombre: 'Ciudad Colonial',
        descripcion: 'Recorre la historia colonial de Quito y sus alrededores',
        localidad: 'Quito',
        precio_total: 160,
        duracion: '2 días',
        imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        productos: [
          { id: 16, nombre: 'Hotel Plaza Grande', categoria: 'hoteles', precio: 90 },
          { id: 17, nombre: 'Restaurante Zazu', categoria: 'restaurantes', precio: 30 },
          { id: 18, nombre: 'Centro Histórico de Quito', categoria: 'actividades', precio: 20 },
          { id: 19, nombre: 'Mitad del Mundo', categoria: 'actividades', precio: 20 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
      {
        id: 'preloaded-5',
        nombre: 'Bosque Nublado',
        descripcion: 'Explora el bosque nublado de Mindo y su biodiversidad única',
        localidad: 'Mindo',
        precio_total: 198,
        duracion: '3 días',
        imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        productos: [
          { id: 20, nombre: 'Hotel Mindo', categoria: 'hoteles', precio: 90 },
          { id: 21, nombre: 'Restaurante El Mirador', categoria: 'restaurantes', precio: 55 },
          { id: 22, nombre: 'Senderismo Ecológico', categoria: 'actividades', precio: 28 },
          { id: 23, nombre: 'Avistamiento de Aves', categoria: 'actividades', precio: 25 }
        ],
        fechaCreacion: '2024-01-01T00:00:00.000Z',
        usuarioId: 'preloaded',
        isPreloaded: true
      },
    ];
  }

  // Renderizar paquetes del usuario
  renderUserPackages(packages) {
    const container = document.getElementById('packagesContainer');
    const emptyState = document.getElementById('emptyPackagesState');
    
    if (!container) return;
    
    if (!packages || packages.length === 0) {
      if (emptyState) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
      }
      return;
    }
    
    if (emptyState) {
      emptyState.style.display = 'none';
    }
    container.style.display = 'grid';
    
    container.innerHTML = packages.map(pkg => `
      <div class="package-card ${pkg.isPreloaded ? 'preloaded-package' : ''}" data-id="${pkg.id}">
        <div class="package-image">
          <img src="${pkg.imagen || 'https://placehold.co/600x300/1e3a8a/FFFFFF?text=Paquete'}" alt="${pkg.nombre}" style="object-fit:cover;pointer-events:none;user-select:none;">
          ${pkg.isPreloaded ? `
            <div class="package-badge preloaded-badge">
              <i class="fas fa-star"></i>
              Precargado
            </div>
          ` : ''}
        </div>
        <div class="package-content">
          <h3 class="package-title">${pkg.nombre}</h3>
          <p class="package-description">${pkg.descripcion}</p>
          
          <div class="package-meta">
            <span class="package-location">
              <i class="fas fa-map-marker-alt"></i>
              ${pkg.localidad || 'Sin localidad'}
            </span>
            <span class="package-duration">
              <i class="fas fa-clock"></i>
              ${pkg.duracion || 'Sin duración'}
            </span>
          </div>
          
          <div class="package-products">
            <h4>Productos incluidos:</h4>
            <div class="products-summary">
              ${pkg.productos && pkg.productos.length > 0 
                ? pkg.productos.map(product => `
                    <span class="product-tag ${product.categoria}">
                      <i class="fas fa-${this.getProductIcon(product.categoria)}"></i>
                      ${product.nombre}
                    </span>
                  `).join('')
                : '<p class="no-products">No hay productos agregados</p>'
              }
            </div>
          </div>
          
          <div class="package-footer">
            <div class="package-price">
              <span class="price-label">Precio:</span>
              <span class="price-value">$${pkg.precio_total || pkg.precio || 0}</span>
            </div>
            
            <div class="package-actions">
              <button class="btn btn-secondary btn-sm edit-package-btn" data-package-id="${pkg.id}" style="position: relative; z-index: 10;">
                <i class="fas fa-edit"></i> Editar
              </button>
              ${!pkg.isPreloaded ? `
                <button class="btn btn-danger btn-sm delete-package-btn" data-package-id="${pkg.id}" style="position: relative; z-index: 10;">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Agregar event listeners para los botones de editar y eliminar
    container.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.edit-package-btn');
      const deleteBtn = e.target.closest('.delete-package-btn');
      
      if (editBtn) {
        e.preventDefault();
        e.stopPropagation();
        const packageId = editBtn.getAttribute('data-package-id');
        this.editPackage(packageId);
      } else if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const packageId = parseInt(deleteBtn.getAttribute('data-package-id'));
        this.deletePackage(packageId);
      }
    });
  }

  // Obtener ícono del producto según la categoría
  getProductIcon(category) {
    const icons = {
      'hoteles': 'hotel',
      'restaurantes': 'utensils',
      'actividades': 'hiking'
    };
    return icons[category] || 'tag';
  }

  // Obtener transportes disponibles
  getTransportes() {
    try {
      // Intentar cargar desde localStorage primero
      const stored = localStorage.getItem('transportes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.log('Error cargando transportes desde localStorage');
    }
    
    // Fallback a datos por defecto
    return [
      {
        id: 1,
        nombre: "Bus Quito - Guayaquil",
        descripcion: "Servicio directo entre las principales ciudades del Ecuador",
        empresa: "Transportes Ecuador",
        horario: "08:00 - 12:00",
        precio: 25,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Quito",
        localidad_destino: "Guayaquil",
        duracion: "4 horas"
      },
      {
        id: 2,
        nombre: "Bus Guayaquil - Cuenca",
        descripcion: "Conexión directa a la ciudad patrimonio de la humanidad",
        empresa: "Transportes Andes",
        horario: "14:00 - 18:00",
        precio: 18,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Guayaquil",
        localidad_destino: "Cuenca",
        duracion: "4 horas"
      },
      {
        id: 3,
        nombre: "Bus Quito - Baños",
        descripcion: "Ruta hacia la puerta del oriente ecuatoriano",
        empresa: "Transportes Sierra",
        horario: "09:00 - 11:30",
        precio: 12,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Quito",
        localidad_destino: "Baños",
        duracion: "2.5 horas"
      },
      {
        id: 4,
        nombre: "Bus Cuenca - Guayaquil",
        descripcion: "Retorno desde la ciudad patrimonio",
        empresa: "Transportes Andes",
        horario: "16:00 - 20:00",
        precio: 18,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Cuenca",
        localidad_destino: "Guayaquil",
        duracion: "4 horas"
      },
      {
        id: 5,
        nombre: "Bus Quito - Otavalo",
        descripcion: "Ruta hacia el mercado artesanal más famoso",
        empresa: "Transportes Sierra",
        horario: "07:30 - 09:00",
        precio: 8,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Quito",
        localidad_destino: "Otavalo",
        duracion: "1.5 horas"
      },
      {
        id: 6,
        nombre: "Bus Quito - Baños (Express)",
        descripcion: "Servicio expreso hacia Baños con menor tiempo de viaje",
        empresa: "Transportes Express",
        horario: "06:30 - 09:00",
        precio: 13,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Quito",
        localidad_destino: "Baños",
        duracion: "2.5 horas"
      },
      {
        id: 7,
        nombre: "Bus Quito - Mindo",
        descripcion: "Ruta hacia el bosque nublado de Mindo",
        empresa: "Transportes Noroccidente",
        horario: "08:00 - 10:00",
        precio: 9,
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d7117?w=300&h=200&fit=crop",
        disponible: true,
        localidad_origen: "Quito",
        localidad_destino: "Mindo",
        duracion: "2 horas"
      }
    ];
  }

  // Editar paquete
  editPackage(packageId) {
    if (!this.currentUser) {
      this.showError('Debes iniciar sesión para editar paquetes');
      return;
    }
    
    const userId = this.currentUser.id;
    let packages = [];
    
    try {
      const stored = localStorage.getItem(`packages_${userId}`);
      if (stored) {
        packages = JSON.parse(stored);
      }
    } catch (e) {
      console.log('Error cargando paquetes');
    }
    
    // Convertir packageId a número si es posible, sino mantener como string
    const numericId = !isNaN(packageId) ? parseInt(packageId) : packageId;
    
    // Buscar en paquetes del usuario (comparar tanto como número como string)
    let pkg = packages.find(p => p.id === packageId || p.id === numericId);
    
    // Si no se encuentra, buscar en paquetes precargados
    if (!pkg) {
      const preloadedPackages = this.getPreloadedPackages();
      pkg = preloadedPackages.find(p => p.id === packageId || p.id === numericId);
    }
    
    if (!pkg) {
      console.log('Paquete no encontrado. ID buscado:', packageId, 'Tipo:', typeof packageId);
      this.showError('Paquete no encontrado');
      return;
    }
    
    this.showUserPackageEditForm(pkg, userId);
  }

  // Mostrar formulario de edición para paquetes de usuario
  showUserPackageEditForm(pkg, userId) {
    // Establecer variables globales para el flujo de edición
    window.editingPackageId = pkg.id;
    window.editingPackageUserId = userId;
    window.inEditPackageFlow = true;
    
    // Crear modal de edición
    const modalHTML = `
      <div id="editPackageModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Editar Paquete</h3>
            <button class="modal-close close-edit-modal-btn">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre del Paquete</label>
              <input type="text" id="edit_pkg_nombre" class="form-input" value="${pkg.nombre || ''}" placeholder="Nombre del paquete">
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="edit_pkg_descripcion" class="form-input" placeholder="Descripción del paquete">${pkg.descripcion || ''}</textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input type="text" id="edit_pkg_localidad" class="form-input" value="${pkg.localidad || ''}" placeholder="Quito, Guayaquil, Baños...">
            </div>
            
            <div class="form-group">
              <label class="form-label">Duración</label>
              <input type="text" id="edit_pkg_duracion" class="form-input" value="${pkg.duracion || ''}" placeholder="3 días, 1 semana...">
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio Total</label>
              <input type="number" id="edit_pkg_precio" class="form-input" value="${pkg.precio_total || pkg.precio || 0}" placeholder="0" step="0.01">
            </div>
            
            <div class="form-group">
              <label class="form-label">Productos del Paquete</label>
              <div class="package-products-edit">
                <div class="current-products">
                  <h4>Productos actuales (${pkg.productos ? pkg.productos.length : 0})</h4>
                  <div id="editPackageProductsList" class="edit-products-list">
                    ${pkg.productos ? pkg.productos.map(product => `
                      <div class="edit-product-item">
                        <span>${product.nombre}</span>
                        <span>$${product.precio}</span>
                        <button class="btn btn-danger btn-sm remove-product-btn" data-product-id="${product.id}" data-package-id="${pkg.id}">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    `).join('') : '<p>No hay productos agregados</p>'}
                  </div>
                </div>
                <button class="btn btn-outline btn-full add-products-btn" data-package-id="${pkg.id}" data-user-id="${userId}">
                  <i class="fas fa-plus"></i> Agregar
                </button>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary close-edit-modal-btn">Cancelar</button>
              <button class="btn btn-primary save-edit-modal-btn" data-package-id="${pkg.id}" data-user-id="${userId}">Guardar Cambios</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('editPackageModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Agregar event listeners para botones del modal
    const modal = document.getElementById('editPackageModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-product-btn');
        const addBtn = e.target.closest('.add-products-btn');
        const closeBtn = e.target.closest('.close-edit-modal-btn');
        const saveBtn = e.target.closest('.save-edit-modal-btn');
        
        if (removeBtn) {
          e.preventDefault();
          e.stopPropagation();
          const productId = parseInt(removeBtn.getAttribute('data-product-id'));
          const packageId = removeBtn.getAttribute('data-package-id');
          this.removeProductFromEditPackage(productId, packageId);
        } else if (addBtn) {
          e.preventDefault();
          e.stopPropagation();
          const packageId = addBtn.getAttribute('data-package-id');
          const userId = addBtn.getAttribute('data-user-id');
          this.openAddProductsToEditPackage(packageId, userId);
        } else if (closeBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.closeEditPackageModal();
        } else if (saveBtn) {
          e.preventDefault();
          e.stopPropagation();
          const packageId = saveBtn.getAttribute('data-package-id');
          const userId = saveBtn.getAttribute('data-user-id');
          this.updateUserPackage(packageId, userId);
        }
      });
    }
  }

  // Cerrar modal de edición
  closeEditPackageModal() {
    const modal = document.getElementById('editPackageModal');
    if (modal) {
      modal.remove();
    }
  }

  // Abrir modal para agregar productos al paquete en edición
  openAddProductsToEditPackage(packageId, userId) {
    // Cerrar modal de edición actual
    this.closeEditPackageModal();
    
    // Guardar información del paquete que estamos editando
    window.editingPackageId = packageId;
    window.editingPackageUserId = userId;
    
    // Abrir modal de selección de productos
    this.showAddProductsToPackageModal(packageId, userId);
  }

  // Mostrar modal para agregar productos a un paquete específico
  showAddProductsToPackageModal(packageId, userId) {
    const modalHTML = `
      <div id="addProductsToPackageModal" class="modal-overlay">
        <div class="modal modal-large">
          <div class="modal-header">
            <h3 class="modal-title">Agregar Productos</h3>
            <button class="modal-close" onclick="app.closeAddProductsToPackageModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="products-selection">
              <div class="location-filter-info">
                <p><i class="fas fa-map-marker-alt"></i> Mostrando productos para: <strong id="packageLocationDisplay">Cargando...</strong></p>
              </div>
              <div class="category-tabs">
                <button class="category-tab active" data-category="hoteles">Hoteles</button>
                <button class="category-tab" data-category="restaurantes">Restaurantes</button>
                <button class="category-tab" data-category="actividades">Actividades</button>
                <button class="category-tab" data-category="comidas">Comidas</button>
              </div>
              
              <div id="addProductsList" class="products-list">
                <!-- Los productos se cargarán dinámicamente -->
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeAddProductsToPackageModal()">
                <i class="fas fa-arrow-left"></i> Anterior
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('addProductsToPackageModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Cargar productos y configurar eventos
    this.loadProductsForAddToPackage();
    this.setupCategoryTabsForAddProducts();
    this.updateLocationDisplay();
  }

  // Cerrar modal de agregar productos
  closeAddProductsToPackageModal() {
    const modal = document.getElementById('addProductsToPackageModal');
    if (modal) {
      modal.remove();
    }
    
    // Regresar al modal de edición del paquete
    if (window.editingPackageId && window.editingPackageUserId) {
      this.returnToEditPackageModal(window.editingPackageId, window.editingPackageUserId);
    }
    
    // Limpiar variables globales
    window.editingPackageId = null;
    window.editingPackageUserId = null;
  }

  // Regresar al modal de edición del paquete
  async returnToEditPackageModal(packageId, userId) {
    try {
      const packages = await loadUserPackages(userId);
      const pkg = packages.find(p => p.id === packageId);
      if (pkg) {
        this.showUserPackageEditForm(pkg, userId);
      }
    } catch (error) {
      console.error('Error regresando al modal de edición:', error);
    }
  }

  // Cargar productos para agregar al paquete
  async loadProductsForAddToPackage() {
    const productsList = document.getElementById('addProductsList');
    if (!productsList) return;
    
    console.log('=== DEBUG loadProductsForAddToPackage ===');
    console.log('window.editingPackageId:', window.editingPackageId);
    console.log('window.editingPackageUserId:', window.editingPackageUserId);
    
    // Obtener la localidad del paquete que estamos editando
    const packageLocalidad = await this.getPackageLocalidad(window.editingPackageId, window.editingPackageUserId);
    console.log('packageLocalidad obtenida:', packageLocalidad);
    
    if (!packageLocalidad) {
      productsList.innerHTML = '<p>No se pudo obtener la localidad del paquete</p>';
      return;
    }
    
    const hoteles = this.getHotels().filter(hotel => hotel.localidad === packageLocalidad);
    console.log('Hoteles filtrados:', hoteles);
    const productsHTML = hoteles.map(hotel => `
      <div class="product-card hoteles">
        <div class="product-image">
          <img src="${hotel.imagen}" alt="${hotel.nombre}">
          <div class="product-category-badge">Hotel</div>
        </div>
        
        <div class="product-content">
          <h3 class="product-title">${hotel.nombre}</h3>
          <p class="product-creator">${hotel.creador}</p>
          <p class="product-description">${hotel.descripcion}</p>
          
          <div class="product-meta">
            <span class="product-location">
              <i class="fas fa-map-marker-alt"></i>
              ${hotel.localidad}
            </span>
            
            <span class="product-price">
              <i class="fas fa-dollar-sign"></i>
              $${hotel.precio}
            </span>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary btn-small add-product-to-edit-btn" data-product-id="${hotel.id}">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    productsList.innerHTML = productsHTML;
    
    // Configurar eventos de los botones
    this.setupAddProductToEditButtons();
  }

  // Configurar botones de agregar producto en edición
  setupAddProductToEditButtons() {
    const addButtons = document.querySelectorAll('.add-product-to-edit-btn');
    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        this.addProductToEditPackage(productId);
      });
    });
  }

  // Agregar producto al paquete en edición
  addProductToEditPackage(productId) {
    console.log('=== DEBUG addProductToEditPackage ===');
    console.log('ID del producto recibido:', productId);
    console.log('Tipo de ID:', typeof productId);
    
    let product = this.findProductById(productId);
    
    // Si no se encuentra en productos normales, buscar en paquetes precargados
    if (!product) {
      const preloadedPackages = this.getPreloadedPackages();
      for (const pkg of preloadedPackages) {
        const foundProduct = pkg.productos.find(p => p.id === productId);
        if (foundProduct) {
          product = foundProduct;
          break;
        }
      }
    }
    
    if (!product) {
      console.error('❌ No se pudo encontrar el producto con ID:', productId);
      this.showError('Producto no encontrado');
      return;
    }
    
    console.log('✅ Producto encontrado:', product);
    console.log('Categoría del producto:', product.categoria);
    
    // Establecer flag de que estamos en flujo de edición de paquete
    window.inEditPackageFlow = true;
    window.editingPackageId = window.editingPackageId;
    window.editingPackageUserId = window.editingPackageUserId;
    
    // Cerrar el modal de agregar productos
    this.closeAddProductsToPackageModal();
    
    // Abrir el modal específico según el tipo de producto
    if (product.categoria === 'hoteles') {
      console.log('🏨 Abriendo modal de hotel para:', product.nombre);
      this.showHotelSelectionModal(product);
      return;
    }
    if (product.categoria === 'actividades') {
      console.log('🎡 Abriendo modal de actividad para:', product.nombre);
      this.showActivitySelectionModal(product);
      return;
    }
    if (product.categoria === 'restaurantes') {
      console.log('🍽️ Abriendo modal de restaurante para:', product.nombre);
      this.showRestaurantMealSelectionModal(product);
      return;
    }
    if (product.categoria === 'comidas') {
      console.log('🍽️ Abriendo modal de comida para:', product.nombre);
      this.showComidaSelectionModal(product);
      return;
    }
    
    console.log('📦 Abriendo modal genérico para:', product.nombre);
    // Para otros tipos, abrir directamente modal de paquete
    this.showAddToPackageModal(product);
  }

  // Agregar producto directamente al paquete en edición
  async addProductToEditPackageDirect(product) {
    if (!window.editingPackageId || !window.editingPackageUserId) {
      this.showError('Error: No se encontró información del paquete');
      return;
    }
    
    try {
      const userId = window.editingPackageUserId;
      const packageId = window.editingPackageId;
      
      // Verificar si es un paquete precargado
      const preloadedPackages = this.getPreloadedPackages();
      const isPreloadedPackage = preloadedPackages.some(p => p.id === packageId);
      
      if (isPreloadedPackage) {
        // Para paquetes precargados, mostrar mensaje informativo
        this.showError('No se pueden agregar productos a paquetes precargados. Crea una copia del paquete para editarlo.');
        return;
      }
      
      // Cargar paquetes del usuario
      const packages = await loadUserPackages(userId);
      
      // Encontrar el paquete
      const numericId = !isNaN(packageId) ? parseInt(packageId) : packageId;
      const packageIndex = packages.findIndex(pkg => pkg.id === packageId || pkg.id === numericId);
      if (packageIndex === -1) {
        this.showError('Paquete no encontrado');
        return;
      }
      
      // Verificar si el producto ya está en el paquete
      const existingProduct = packages[packageIndex].productos.find(p => p.id === product.id);
      if (existingProduct) {
        this.showError('Este producto ya está en el paquete');
        return;
      }
      
      // Agregar el producto
      packages[packageIndex].productos.push({
        ...product,
        fechaAgregado: new Date().toISOString()
      });
      
      // Actualizar precio total (usar precioTotal si existe, sino usar precio)
      const precioProducto = product.precioTotal || product.precio;
      packages[packageIndex].precio_total += precioProducto;
      
      // Guardar en localStorage
      await saveUserPackages(userId, packages);
      
      this.showSuccess('Producto agregado al paquete');
      
      // Regresar al modal de edición
      this.returnToEditPackageModal(packageId, userId);
      
      // Limpiar flags de edición
      window.inEditPackageFlow = false;
      
    } catch (error) {
      console.error('Error agregando producto al paquete:', error);
      this.showError('Error al agregar producto al paquete');
    }
  }

  // Remover producto del paquete en edición
  async removeProductFromEditPackage(productId, packageId) {
    if (!this.currentUser) {
      this.showError('Debes iniciar sesión');
      return;
    }
    
    try {
      const userId = this.currentUser.id;
      const packages = await loadUserPackages(userId);
      
      const numericId = !isNaN(packageId) ? parseInt(packageId) : packageId;
      const packageIndex = packages.findIndex(pkg => pkg.id === packageId || pkg.id === numericId);
      if (packageIndex === -1) {
        this.showError('Paquete no encontrado');
        return;
      }
      
      // Remover el producto
      packages[packageIndex].productos = packages[packageIndex].productos.filter(p => p.id !== productId);
      
      // Actualizar precio total
      packages[packageIndex].precio_total = packages[packageIndex].productos.reduce((total, p) => total + p.precio, 0);
      
      // Guardar en localStorage
      await saveUserPackages(userId, packages);
      
      this.showSuccess('Producto removido del paquete');
      
      // Recargar el modal de edición
      const pkg = packages[packageIndex];
      this.showUserPackageEditForm(pkg, userId);
      
    } catch (error) {
      console.error('Error removiendo producto del paquete:', error);
      this.showError('Error al remover producto del paquete');
    }
  }

  // Configurar tabs de categorías para agregar productos
  setupCategoryTabsForAddProducts() {
    const tabs = document.querySelectorAll('#addProductsToPackageModal .category-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover clase active de todos los tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Agregar clase active al tab clickeado
        tab.classList.add('active');
        
        // Cargar productos de la categoría seleccionada
        const category = tab.dataset.category;
        this.loadProductsByCategoryForAdd(category);
      });
    });
  }

  // Obtener la localidad de un paquete específico
  async getPackageLocalidad(packageId, userId) {
    try {
      console.log('=== DEBUG getPackageLocalidad ===');
      console.log('packageId:', packageId);
      console.log('userId:', userId);
      
      // Primero buscar en paquetes del usuario
      const packages = await loadUserPackages(userId);
      console.log('packages cargados:', packages);
      
      // Convertir packageId a número si es posible para comparación
      const numericId = !isNaN(packageId) ? parseInt(packageId) : packageId;
      
      let pkg = packages.find(p => p.id === packageId || p.id === numericId);
      console.log('paquete encontrado en usuario:', pkg);
      
      // Si no se encuentra, buscar en paquetes precargados
      if (!pkg) {
        const preloadedPackages = this.getPreloadedPackages();
        console.log('buscando en paquetes precargados:', preloadedPackages);
        pkg = preloadedPackages.find(p => p.id === packageId || p.id === numericId);
        console.log('paquete encontrado en precargados:', pkg);
      }
      
      if (pkg) {
        console.log('localidad del paquete:', pkg.localidad);
        return pkg.localidad;
      } else {
        console.log('No se encontró el paquete con ID:', packageId);
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo localidad del paquete:', error);
      return null;
    }
  }

  // Actualizar el display de localidad en el modal
  async updateLocationDisplay() {
    const locationDisplay = document.getElementById('packageLocationDisplay');
    if (!locationDisplay) return;
    
    const packageLocalidad = await this.getPackageLocalidad(window.editingPackageId, window.editingPackageUserId);
    if (packageLocalidad) {
      locationDisplay.textContent = packageLocalidad;
    } else {
      locationDisplay.textContent = 'No disponible';
    }
  }

  // Cargar productos por categoría para agregar
  async loadProductsByCategoryForAdd(category) {
    const productsList = document.getElementById('addProductsList');
    if (!productsList) return;
    
    // Obtener la localidad del paquete que estamos editando
    const packageLocalidad = await this.getPackageLocalidad(window.editingPackageId, window.editingPackageUserId);
    if (!packageLocalidad) {
      productsList.innerHTML = '<p>No se pudo obtener la localidad del paquete</p>';
      return;
    }
    
    let products = [];
    switch (category) {
      case 'hoteles':
        products = this.getHotels();
        break;
      case 'restaurantes':
        products = this.getRestaurants();
        break;
      case 'actividades':
        products = this.getActivities();
        break;
      case 'comidas':
        products = this.getComidas();
        break;
    }
    
    // Filtrar productos por localidad
    const filteredProducts = products.filter(product => product.localidad === packageLocalidad);
    
    if (filteredProducts.length === 0) {
      const categoryNames = {
        'hoteles': 'Hoteles',
        'restaurantes': 'Restaurantes', 
        'actividades': 'Actividades',
        'comidas': 'Comidas'
      };
      const categoryName = categoryNames[category] || 'Productos';
      
      productsList.innerHTML = `
        <div class="no-products">
          <p>No hay productos de ${categoryName} disponibles en ${packageLocalidad}</p>
        </div>
      `;
      return;
    }
    
    const categoryNames = {
      'hoteles': 'Hotel',
      'restaurantes': 'Restaurante', 
      'actividades': 'Actividad',
      'comidas': 'Comida'
    };
    const categoryName = categoryNames[category] || 'Producto';
    
    const productsHTML = filteredProducts.map(product => `
      <div class="product-card ${category}">
        <div class="product-image">
          <img src="${product.imagen}" alt="${product.nombre}">
          <div class="product-category-badge">${categoryName}</div>
        </div>
        
        <div class="product-content">
          <h3 class="product-title">${product.nombre}</h3>
          <p class="product-creator">${product.creador}</p>
          <p class="product-description">${product.descripcion}</p>
          
          <div class="product-meta">
            <span class="product-location">
              <i class="fas fa-map-marker-alt"></i>
              ${product.localidad}
            </span>
            
            <span class="product-price">
              <i class="fas fa-dollar-sign"></i>
              $${product.precio}
            </span>
          </div>
          
          <div class="product-actions">
            <button class="btn btn-primary btn-small add-product-to-edit-btn" data-product-id="${product.id}">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    productsList.innerHTML = productsHTML;
    
    // Configurar eventos de los botones
    this.setupAddProductToEditButtons();
  }

  // Actualizar paquete de usuario
  async updateUserPackage(packageId, userId) {
    try {
      const updatedPackage = {
        nombre: document.getElementById('edit_pkg_nombre').value.trim(),
        descripcion: document.getElementById('edit_pkg_descripcion').value.trim(),
        localidad: document.getElementById('edit_pkg_localidad').value.trim(),
        duracion: document.getElementById('edit_pkg_duracion').value.trim(),
        precio_total: parseFloat(document.getElementById('edit_pkg_precio').value) || 0
      };
      
      // Validar campos requeridos
      if (!updatedPackage.nombre.trim()) {
        this.showError('El nombre del paquete es obligatorio');
        return;
      }
      
      if (!updatedPackage.localidad.trim()) {
        this.showError('La localidad es obligatoria');
        return;
      }
      
      // Cargar paquetes existentes
      let packages = [];
      try {
        const stored = localStorage.getItem(`packages_${userId}`);
        if (stored) {
          packages = JSON.parse(stored);
        }
      } catch (e) {
        console.log('Error cargando paquetes');
      }
      
      // Encontrar y actualizar el paquete
      const numericId = !isNaN(packageId) ? parseInt(packageId) : packageId;
      const packageIndex = packages.findIndex(p => p.id === packageId || p.id === numericId);
      if (packageIndex === -1) {
        this.showError('Paquete no encontrado');
        return;
      }
      
      // Mantener datos existentes que no se editan
      packages[packageIndex] = {
        ...packages[packageIndex],
        ...updatedPackage,
        id: packageId,
        imagen: packages[packageIndex].imagen || 'https://placehold.co/600x300/1e3a8a/FFFFFF?text=Paquete',
        productos: packages[packageIndex].productos || []
      };
      
      // Guardar en localStorage
      localStorage.setItem(`packages_${userId}`, JSON.stringify(packages));
      
      // Cerrar modal
      this.closeEditPackageModal();
      
      // Recargar paquetes
      this.loadUserPackages();
      
      // Mostrar mensaje de éxito
      this.showSuccess('Paquete actualizado exitosamente');
      
    } catch (error) {
      console.error('Error actualizando paquete:', error);
      this.showError('Error al actualizar el paquete');
    }
  }

  // Eliminar paquete
  async deletePackage(packageId) {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete? Esta acción no se puede deshacer.')) {
      try {
        const userId = this.currentUser?.id || 1;
        const success = await deleteUserPackage(userId, packageId);
        
        if (success) {
          // Recargar la lista de paquetes
          this.loadUserPackages();
          this.showError('Paquete eliminado exitosamente');
        } else {
          this.showError('Error al eliminar el paquete');
        }
      } catch (error) {
        console.error('Error eliminando paquete:', error);
        this.showError('Error al eliminar el paquete');
      }
    }
  }

  // Agregar producto a paquete desde home
  addProductToPackageFromHome(productId) {
    console.log('=== DEBUG addProductToPackageFromHome ===');
    console.log('ID del producto recibido:', productId);
    
    if (!this.currentUser) {
      this.showError('Debes iniciar sesión para agregar productos');
      return;
    }
    
    // Buscar el producto usando findProductById (que ya tiene debugging)
    const product = this.findProductById(productId);
    if (!product) {
      console.error('❌ No se pudo encontrar el producto con ID:', productId);
      this.showError('Producto no encontrado');
      return;
    }
    
    console.log('✅ Producto encontrado:', product);
    console.log('Categoría del producto:', product.categoria);
    console.log('Localidad del producto:', product.localidad);
    
    // Establecer flag de que NO estamos en flujo de creación de paquete
    window.inPackageCreationFlow = false;
    
    // Mostrar modal específico según el tipo de producto
    switch (product.categoria) {
      case 'hoteles':
        console.log('🏨 Abriendo modal de hotel para:', product.nombre);
        this.showHotelSelectionModal(product);
        break;
      case 'actividades':
        console.log('🎡 Abriendo modal de actividad para:', product.nombre);
        this.showActivitySelectionModal(product);
        break;
      case 'restaurantes':
        console.log('🍽️ Abriendo modal de restaurante para:', product.nombre);
        // Para restaurantes, mostrar opción de crear comida personalizada o elegir comidas
        this.showRestaurantMealSelectionModal(product);
        break;
      case 'comidas':
        console.log('🍽️ Abriendo modal de comida para:', product.nombre);
        // Para comidas, mostrar modal de selección directa
        this.showComidaSelectionModal(product);
        break;
      default:
        console.log('📦 Abriendo modal genérico para:', product.nombre);
        // Para otros productos, mostrar modal genérico de agregar a paquete
        this.showAddToPackageModal(product);
    }
  }

  // Mostrar modal de selección de comidas para restaurantes
  showRestaurantMealSelectionModal(restaurant) {
    const userId = this.currentUser?.id || 1;
    const customMeals = this.getUserCustomMeals(userId).filter(meal => meal.restaurantId === restaurant.id);
    
    // Obtener comidas del restaurante desde la nueva estructura
    const restaurantMeals = restaurant.comidas || [];
    
    const modalHTML = `
      <div id="restaurantMealSelectionModal" class="modal-overlay">
        <div class="modal modal-large">
          <div class="modal-header">
            <h3 class="modal-title">${restaurant.nombre}</h3>
            <button class="modal-close" onclick="app.closeRestaurantMealSelectionModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="restaurant-preview">
              <img src="${restaurant.imagen}" alt="${restaurant.nombre}">
              <div class="restaurant-info">
                <h4>${restaurant.nombre}</h4>
                <p>${restaurant.descripcion}</p>
                <p class="restaurant-price">$${restaurant.precio} por persona</p>
              </div>
            </div>
            
            <div class="meal-selection-section">
              <h4>Selecciona las comidas que deseas</h4>
              
              ${restaurantMeals.length > 0 ? `
                <div class="restaurant-meals">
                  <h5>Menú del restaurante:</h5>
                  <div class="meals-grid">
                    ${restaurantMeals.map(meal => `
                      <div class="meal-card" data-meal-id="${meal.id}">
                        <div class="meal-info">
                          <h6 class="meal-name">${meal.nombre}</h6>
                          <p class="meal-description">${meal.descripcion}</p>
                          <div class="meal-meta">
                            <span class="meal-type">${meal.tipo}</span>
                            <span class="meal-time">${meal.tiempo_preparacion}</span>
                          </div>
                        </div>
                        <div class="meal-actions">
                          <span class="meal-price">$${meal.precio}</span>
                          <input type="checkbox" id="meal_${meal.id}" value="${meal.id}" class="meal-checkbox">
                          <label for="meal_${meal.id}" class="meal-label">
                            <i class="fas fa-plus"></i>
                          </label>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              ${customMeals.length > 0 ? `
                <div class="custom-meals">
                  <h5>Tus comidas personalizadas:</h5>
                  <div class="meals-list">
                    ${customMeals.map(meal => `
                      <div class="meal-item" data-meal-id="${meal.id}">
                        <input type="checkbox" id="custom_meal_${meal.id}" value="${meal.id}">
                        <label for="custom_meal_${meal.id}">
                          <span class="meal-name">${meal.nombre}</span>
                          <span class="meal-price">$${meal.precio}</span>
                        </label>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              
              <div class="meal-actions">
                <button class="btn btn-outline" onclick="app.showCreateCustomMealModal(${restaurant.id})">
                  <i class="fas fa-plus"></i> Crear Nueva Comida
                </button>
                
                <button class="btn btn-primary" onclick="app.confirmRestaurantSelection(${restaurant.id})" id="confirmRestaurantBtn">
                  <i class="fas fa-suitcase"></i> Continuar al Paquete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('restaurantMealSelectionModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos para las comidas seleccionadas
    this.setupRestaurantMealSelectionEvents(restaurant.id);
  }

  // Configurar eventos para selección de comidas
  setupRestaurantMealSelectionEvents(restaurantId) {
    const checkboxes = document.querySelectorAll('#restaurantMealSelectionModal input[type="checkbox"]');
    const confirmBtn = document.getElementById('confirmRestaurantBtn');
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateRestaurantSelection(restaurantId);
        this.updateMealCardSelection(checkbox);
      });
    });
  }

  // Actualizar visual de selección de comidas
  updateMealCardSelection(checkbox) {
    const mealCard = checkbox.closest('.meal-card');
    if (mealCard) {
      if (checkbox.checked) {
        mealCard.classList.add('selected');
      } else {
        mealCard.classList.remove('selected');
      }
    }
  }

  // Actualizar selección de restaurante
  updateRestaurantSelection(restaurantId) {
    const checkboxes = document.querySelectorAll('#restaurantMealSelectionModal input[type="checkbox"]:checked');
    const selectedMeals = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    // Guardar comidas seleccionadas en el restaurante
    const restaurant = this.findProductById(restaurantId) || this.resolveProductById(restaurantId);
    if (restaurant) {
      restaurant.comidasSeleccionadas = selectedMeals;
    }
  }

  // Confirmar selección de restaurante
  confirmRestaurantSelection(restaurantId) {
    const restaurant = this.findProductById(restaurantId) || this.resolveProductById(restaurantId);
    if (restaurant) {
      // Obtener comidas seleccionadas
      const selectedMealIds = this.getSelectedMealIds();
      const selectedMeals = this.getSelectedMealsDetails(restaurant, selectedMealIds);
      
      // Crear objeto del restaurante con comidas seleccionadas
      const restaurantWithMeals = {
        ...restaurant,
        comidasSeleccionadas: selectedMeals,
        precioComidas: selectedMeals.reduce((total, meal) => total + meal.precio, 0),
        precioTotal: restaurant.precio + selectedMeals.reduce((total, meal) => total + meal.precio, 0)
      };
      
      console.log('Restaurante con comidas:', restaurantWithMeals);
      
      // Cerrar modal de restaurante
      this.closeRestaurantMealSelectionModal();

      // Si estamos en flujo de creación de paquete, agregar directo al paquete
      if (window.inPackageCreationFlow && this.currentPackage) {
        // Guardar el producto seleccionado antes de agregarlo
        window.selectedProductForPackage = restaurantWithMeals;
        this.lastSelectedProduct = restaurantWithMeals; // Respaldo en el contexto de la clase
        console.log('Producto guardado para agregar:', restaurantWithMeals);
        this.addProductToCurrentPackage();
      } else if (window.inEditPackageFlow) {
        // Si estamos en flujo de edición de paquete, agregar al paquete específico
        this.addProductToEditPackageDirect(restaurantWithMeals);
      } else {
        // Desde Home/Buscar, abrir modal de agregar a paquete
        this.showAddToPackageModal(restaurantWithMeals);
      }
    }
  }

  // Obtener IDs de comidas seleccionadas
  getSelectedMealIds() {
    const checkboxes = document.querySelectorAll('#restaurantMealSelectionModal input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => parseInt(cb.value));
  }

  // Obtener detalles de comidas seleccionadas
  getSelectedMealsDetails(restaurant, selectedMealIds) {
    if (!restaurant.comidas) return [];
    
    return restaurant.comidas.filter(meal => selectedMealIds.includes(meal.id));
  }

  // Mostrar modal de selección de comida
  showComidaSelectionModal(comida) {
    const modalHTML = `
      <div id="comidaSelectionModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Seleccionar ${comida.nombre}</h3>
            <button class="modal-close" onclick="app.closeComidaSelectionModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="comida-preview">
              <img src="${comida.imagen}" alt="${comida.nombre}">
              <div class="comida-info">
                <h4>${comida.nombre}</h4>
                <p>${comida.descripcion}</p>
                <p class="comida-price">$${comida.precio}</p>
                <p class="comida-type">${comida.tipo} - ${comida.tiempo_preparacion}</p>
              </div>
            </div>
            
            <div class="comida-selection-section">
              <h4>Detalles de la comida</h4>
              
              <div class="form-group">
                <label class="form-label">Cantidad de porciones</label>
                <select id="comida_cantidad" class="form-input">
                  ${Array.from({length: 10}, (_, i) => `<option value="${i + 1}">${i + 1} ${i === 0 ? 'porción' : 'porciones'}</option>`).join('')}
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Notas especiales</label>
                <textarea id="comida_notas" class="form-input" placeholder="Ej: sin cebolla, extra picante, etc." rows="3"></textarea>
              </div>
              
              <div class="comida-summary">
                <h4>Resumen de la selección</h4>
                <p><strong>Comida:</strong> ${comida.nombre}</p>
                <p><strong>Precio por porción:</strong> $${comida.precio}</p>
                <p><strong>Total:</strong> $<span id="comida_precio_total">${comida.precio}</span></p>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeComidaSelectionModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.confirmComidaSelection(${comida.id})">Confirmar Selección</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('comidaSelectionModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos para calcular precio total
    this.setupComidaModalEvents(comida);
  }

  // Configurar eventos del modal de comida
  setupComidaModalEvents(comida) {
    const cantidadSelect = document.getElementById('comida_cantidad');
    
    if (cantidadSelect) {
      cantidadSelect.addEventListener('change', () => {
        this.updateComidaPrice(comida.precio);
      });
    }
  }

  // Actualizar precio de la comida
  updateComidaPrice(precioBase) {
    const cantidadSelect = document.getElementById('comida_cantidad');
    const precioTotalSpan = document.getElementById('comida_precio_total');
    
    if (cantidadSelect && precioTotalSpan) {
      const cantidad = parseInt(cantidadSelect.value);
      const precioTotal = precioBase * cantidad;
      precioTotalSpan.textContent = precioTotal;
    }
  }

  // Cerrar modal de selección de comida
  closeComidaSelectionModal() {
    const modal = document.getElementById('comidaSelectionModal');
    if (modal) {
      modal.remove();
    }
  }

  // Confirmar selección de comida
  confirmComidaSelection(comidaId) {
    const comida = this.findProductById(comidaId);
    if (comida) {
      // Obtener detalles de la selección
      const cantidad = parseInt(document.getElementById('comida_cantidad')?.value || 1);
      const notas = document.getElementById('comida_notas')?.value || '';
      
      // Agregar información de la selección a la comida
      comida.seleccionComida = {
        cantidad: cantidad,
        notas: notas,
        precioTotal: comida.precio * cantidad,
        fechaSeleccion: new Date().toISOString()
      };
      
      // Cerrar modal de comida
      this.closeComidaSelectionModal();

      // Si estamos en flujo de creación de paquete, agregar directo al paquete
      if (window.inPackageCreationFlow && this.currentPackage) {
        // Guardar el producto seleccionado antes de agregarlo
        window.selectedProductForPackage = comida;
        this.lastSelectedProduct = comida; // Respaldo en el contexto de la clase
        console.log('Producto guardado para agregar:', comida);
        this.addProductToCurrentPackage();
      } else {
        // Desde Home/Buscar, abrir modal de agregar a paquete
        this.showAddToPackageModal(comida);
      }
    }
  }

  // Cerrar modal de selección de comidas de restaurante
  closeRestaurantMealSelectionModal() {
    const modal = document.getElementById('restaurantMealSelectionModal');
    if (modal) {
      modal.remove();
    }
  }

  // Configurar funcionalidad de búsqueda
  setupSearchFunctionality() {
    console.log('Configurando funcionalidad de búsqueda...');
    
    // Configurar botón de búsqueda
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        this.performSearch();
      });
    }
    
    // Configurar búsqueda al presionar Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch();
        }
      });
    }
    
    // Configurar filtros
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (categoryFilter) {
      categoryFilter.addEventListener('change', () => {
        this.performSearch();
      });
    }
    
    if (locationFilter) {
      locationFilter.addEventListener('change', () => {
        this.performSearch();
      });
    }
    
    // Cargar opciones de localidades
    this.loadLocationOptions();
    
    console.log('Funcionalidad de búsqueda configurada');
  }

  // Cargar opciones de localidades
  loadLocationOptions() {
    const locationFilter = document.getElementById('locationFilter');
    if (!locationFilter) return;
    
    // Obtener localidades únicas de los productos
    const allProducts = getAllProducts();
    const locations = [...new Set(allProducts.map(p => p.localidad).filter(Boolean))];
    
    // Limpiar opciones existentes (mantener la primera)
    locationFilter.innerHTML = '<option value="">Todas las localidades</option>';
    
    // Agregar opciones de localidades
    locations.forEach(location => {
      const option = document.createElement('option');
      option.value = location;
      option.textContent = location;
      locationFilter.appendChild(option);
    });
  }

  // Realizar búsqueda
  performSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    if (!searchInput || !categoryFilter || !locationFilter) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedLocation = locationFilter.value;
    
    console.log('Realizando búsqueda:', { searchTerm, selectedCategory, selectedLocation });
    
    // Realizar búsqueda y mostrar resultados
    this.loadSearchResults(searchTerm, selectedCategory, selectedLocation);
  }

  // Cargar resultados de búsqueda
  loadSearchResults(searchTerm = '', category = '', location = '') {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    // Obtener todos los productos
    let products = getAllProducts();
    
    // Aplicar filtros
    if (category) {
      products = products.filter(p => p.categoria === category);
    }
    
    if (location) {
      products = products.filter(p => p.localidad === location);
    }
    
    if (searchTerm) {
      products = products.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm) ||
        p.descripcion.toLowerCase().includes(searchTerm) ||
        p.creador.toLowerCase().includes(searchTerm)
      );
    }
    
    console.log(`Resultados de búsqueda: ${products.length} productos encontrados`);
    
    // Mostrar resultados
    this.renderSearchResults(products, searchTerm, category, location);
  }

  // Renderizar resultados de búsqueda
  renderSearchResults(products, searchTerm, category, location) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (!products || products.length === 0) {
      searchResults.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>No se encontraron resultados</h3>
          <p>
            ${searchTerm ? `No hay productos que coincidan con "${searchTerm}"` : ''}
            ${category ? `en la categoría ${this.getCategoryDisplayName(category)}` : ''}
            ${location ? `en ${location}` : ''}
          </p>
          <p>Intenta ajustar los filtros o usar términos de búsqueda diferentes</p>
        </div>
      `;
      return;
    }
    
    // Mostrar resumen de búsqueda
    const searchSummary = this.getSearchSummary(searchTerm, category, location);
    
    // Renderizar productos
    const productsHTML = products.map(product => `
      <div class="product-card" data-category="${product.categoria}">
        <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.nombre}</h3>
          <p class="product-creator">${product.creador}</p>
          <p class="product-price">$${product.precio}</p>
          <div class="product-actions">
            <button class="btn btn-favorite btn-small" onclick="app.toggleFavorite(${product.id}, event)">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-primary btn-small" onclick="app.addProductToPackageFromHome(${product.id})">
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    searchResults.innerHTML = `
      <div class="search-summary">
        <h3>${searchSummary}</h3>
        <p>Se encontraron ${products.length} productos</p>
      </div>
      <div class="products-grid">
        ${productsHTML}
      </div>
    `;
  }

  // Obtener resumen de búsqueda
  getSearchSummary(searchTerm, category, location) {
    let summary = 'Resultados de búsqueda';
    
    if (searchTerm) {
      summary += ` para "${searchTerm}"`;
    }
    
    if (category) {
      summary += ` en ${this.getCategoryDisplayName(category)}`;
    }
    
    if (location) {
      summary += ` en ${location}`;
    }
    
    return summary;
  }

  // Toggle favorito
  async toggleFavorite(productId, event) {
    if (!this.currentUser) {
      this.showError('Debes iniciar sesión para agregar favoritos');
      return;
    }
    
    try {
      const userId = this.currentUser.id;
      const product = getProductById(productId);
      
      if (!product) {
        this.showError('Producto no encontrado');
        return;
      }
      
      const isInFavorites = await isProductInFavorites(userId, productId);
      
      if (isInFavorites) {
        // Remover de favoritos
        const success = await removeFromFavorites(userId, productId);
        if (success) {
          event.target.classList.remove('active');
          this.showError('Producto removido de favoritos');
        }
      } else {
        // Agregar a favoritos
        const success = await addToFavorites(userId, product);
        if (success) {
          event.target.classList.add('active');
          this.showError('Producto agregado a favoritos');
        }
      }
    } catch (error) {
      console.error('Error toggle favorito:', error);
      this.showError('Error al gestionar favoritos');
    }
  }

  // Mostrar error
  showError(message) {
    // Por ahora usar alert, se puede mejorar con un sistema de notificaciones
    alert(message);
  }

  // Mostrar éxito
  showSuccess(message) {
    // Por ahora usar alert, se puede mejorar con un sistema de notificaciones
    alert(message);
  }

  // Limpiar errores de login
  clearLoginErrors() {
    const errorDiv = document.querySelector('.login-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Configurar solo navegación de admin
  setupAdminNavigation() {
    console.log('Configurando navegación de admin...');
    
    // Limpiar eventos previos solo de admin
    const existingAdminNavItems = document.querySelectorAll('.admin-nav .nav-item');
    existingAdminNavItems.forEach(item => {
      if (item.navClickHandler) {
        item.removeEventListener('click', item.navClickHandler);
      }
    });
    
    // Obtener solo elementos de navegación de admin
    const adminNavItems = document.querySelectorAll('.admin-nav .nav-item');
    console.log('Elementos de navegación admin encontrados:', adminNavItems.length);
    
    // Si no se encontraron elementos, no configurar nada
    if (adminNavItems.length === 0) {
      console.error('Error: No se encontraron elementos de navegación admin');
      console.log('Elementos .admin-nav encontrados:', document.querySelectorAll('.admin-nav').length);
      console.log('Elementos .nav-item encontrados:', document.querySelectorAll('.nav-item').length);
      console.log('Elementos .bottom-nav encontrados:', document.querySelectorAll('.bottom-nav').length);
      
      // Debug: mostrar todo el contenido del body para ver qué está pasando
      console.log('Contenido del DOM:', document.body.innerHTML);
      
      console.log('Navegación de admin NO se configuró - no hay elementos');
      return;
    }
    
    // Configurar navegación de admin
    adminNavItems.forEach((item, index) => {
      console.log(`Configurando elemento admin ${index}:`, item.dataset.page);
      
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const page = item.dataset.page;
        console.log('Click en navegación admin:', page);
        
        // Actualizar estado activo solo en navegación admin
        adminNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Navegar a la página admin correspondiente
        this.navigateToAdminPage(page);
      };
      
      item.navClickHandler = clickHandler;
      item.addEventListener('click', clickHandler);
      item.style.cursor = 'pointer';
      item.style.userSelect = 'none';
    });
    
    console.log('Navegación de admin configurada exitosamente');
  }

  // Configurar solo navegación de usuario
  setupUserNavigation() {
    console.log('Configurando navegación de usuario...');
    
    // Limpiar eventos previos solo de usuario
    const existingUserNavItems = document.querySelectorAll('.user-nav .nav-item');
    existingUserNavItems.forEach(item => {
      if (item.navClickHandler) {
        item.removeEventListener('click', item.navClickHandler);
      }
    });
    
    // Obtener solo elementos de navegación de usuario
    const userNavItems = document.querySelectorAll('.user-nav .nav-item');
    console.log('Elementos de navegación usuario encontrados:', userNavItems.length);
    
    // Configurar navegación de usuario
    userNavItems.forEach((item, index) => {
      console.log(`Configurando elemento usuario ${index}:`, item.dataset.page);
      
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const page = item.dataset.page;
        console.log('Click en navegación usuario:', page);
        
        // Actualizar estado activo solo en navegación usuario
        userNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Navegar a la página usuario correspondiente
        this.navigateToUserPage(page);
      };
      
      item.navClickHandler = clickHandler;
      item.addEventListener('click', clickHandler);
      item.style.cursor = 'pointer';
      item.style.userSelect = 'none';
    });
    
    console.log('Navegación de usuario configurada exitosamente');
  }

  // Función de debug para verificar contenido HTML de páginas admin
  debugAdminPageContent() {
    console.log('=== DEBUG: Contenido de Página Admin ===');
    console.log('Elemento main:', document.querySelector('main'));
    console.log('Contenido del main:', document.querySelector('main')?.innerHTML);
    console.log('Elementos .admin-nav:', document.querySelectorAll('.admin-nav'));
    console.log('Elementos .user-nav:', document.querySelectorAll('.user-nav'));
    console.log('Elementos .bottom-nav:', document.querySelectorAll('.bottom-nav'));
    console.log('Elementos .nav-item:', document.querySelectorAll('.nav-item'));
    console.log('=== FIN DEBUG ===');
  }

  // ===== FUNCIONES DEL MODAL PARA AGREGAR A PAQUETE =====
  
  // Función global para agregar producto a paquete (llamada desde home_user.html)
  addToPackage(productId) {
    // Resolver producto desde las fuentes reales de datos
    const product = this.resolveProductById(productId);
    if (!product) {
      alert('Producto no encontrado');
      return;
    }
    
    // Mostrar modal
    this.showAddToPackageModal(product);
  }
 
  // Abrir modal específico de agregar (distinto al FAB)
  addProductToPackageFromHome(productId) {
    try {
      const product = this.resolveProductById(productId);
      if (!product) {
        alert('Producto no encontrado');
        return;
      }
      this.showAddToPackageModal(product);
    } catch (e) {
      console.warn('No se pudo abrir el modal de agregar:', e);
      alert('No se pudo abrir el modal de agregar');
    }
  }

  // Buscar producto por ID en todas las categorías
  findProductById(productId) {
    console.log('=== DEBUG findProductById ===');
    console.log('Buscando producto con ID:', productId);
    console.log('Tipo de ID:', typeof productId);

    const hoteles = this.getHotels();
    const restaurantes = this.getRestaurants();
    const actividades = this.getActivities();
    const comidas = this.getComidas();

    console.log('Hoteles disponibles:', hoteles.map(h => ({ id: h.id, nombre: h.nombre })));
    console.log('Restaurantes disponibles:', restaurantes.map(r => ({ id: r.id, nombre: r.nombre })));
    console.log('Actividades disponibles:', actividades.map(a => ({ id: a.id, nombre: a.nombre })));
    console.log('Comidas disponibles:', comidas.map(c => ({ id: c.id, nombre: c.nombre })));

    const allProducts = [...hoteles, ...restaurantes, ...actividades, ...comidas];
    const idNum = Number(productId);

    console.log('ID numérico:', idNum);
    console.log('Total de productos:', allProducts.length);

    const foundProduct = allProducts.find(p => Number(p.id) === idNum);

    if (foundProduct) {
      console.log('✅ Producto encontrado:', foundProduct);
    } else {
      console.log('❌ Producto NO encontrado con ID:', idNum);
      console.log('IDs disponibles:', allProducts.map(p => p.id));
    }

    return foundProduct;
  }

  // Resolver producto usando data/products.js si está disponible
  resolveProductById(productId) {
    const idNum = Number(productId);
    try {
      if (typeof getProductById === 'function') {
        const prod = getProductById(idNum);
        if (prod) return prod;
      }
    } catch (e) {}
    try {
      if (window.products && typeof window.products === 'object') {
        const categories = Object.keys(window.products);
        for (const cat of categories) {
          const arr = window.products[cat] || [];
          const found = arr.find(p => Number(p.id) === idNum);
          if (found) return found;
        }
      }
    } catch (e) {}
    // Fallback a los datos de ejemplo
    return this.findProductById(idNum);
  }

  // Obtener hoteles
  getHotels() {
    // Usar datos de data/products.js si está disponible
    if (typeof products !== 'undefined' && products.hoteles) {
      return products.hoteles;
    }
    // Fallback a datos hardcodeados
    return [
      { id: 101, nombre: 'Hotel Quito Premium', descripcion: 'Hotel de lujo en el centro histórico', imagen: 'https://placehold.co/300x200/4F46E5/FFFFFF?text=Hotel+Quito', precio: 200, categoria: 'hoteles', localidad: 'Quito', creador: 'Hotel Quito', capacidad: 4, tipo: 'hotel' },
      { id: 102, nombre: 'Hotel Guayaquil Plaza', descripcion: 'Hotel moderno en el centro comercial', imagen: 'https://placehold.co/300x200/DC2626/FFFFFF?text=Hotel+Guayaquil', precio: 180, categoria: 'hoteles', localidad: 'Guayaquil', creador: 'Hotel Guayaquil', capacidad: 6, tipo: 'hotel' },
      { id: 103, nombre: 'Hostal Baños del Valle', descripcion: 'Hostal acogedor con vista al valle', imagen: 'https://placehold.co/300x200/059669/FFFFFF?text=Hostal+Baños', precio: 45, categoria: 'hoteles', localidad: 'Baños', creador: 'Hostal Valle', capacidad: 8, tipo: 'hostal' },
      { id: 104, nombre: 'Hotel Cuenca Colonial', descripcion: 'Hotel boutique en el centro histórico', imagen: 'https://placehold.co/300x200/7C3AED/FFFFFF?text=Hotel+Cuenca', precio: 150, categoria: 'hoteles', localidad: 'Cuenca', creador: 'Hotel Cuenca', capacidad: 4, tipo: 'hotel' },
      { id: 105, nombre: 'Resort Galápagos', descripcion: 'Resort de lujo con vista al mar', imagen: 'https://placehold.co/300x200/10B981/FFFFFF?text=Resort+Galapagos', precio: 350, categoria: 'hoteles', localidad: 'Galápagos', creador: 'Resort Galápagos', capacidad: 6, tipo: 'resort' }
    ];
  }

  // Obtener restaurantes
  getRestaurants() {
    // Usar datos de data/products.js si está disponible
    if (typeof products !== 'undefined' && products.restaurantes) {
      return products.restaurantes;
    }
    // Fallback a datos hardcodeados
    return [
      { id: 201, nombre: 'Restaurante La Casona', descripcion: 'Cocina tradicional ecuatoriana', imagen: 'https://placehold.co/300x200/059669/FFFFFF?text=Restaurante', precio: 45, categoria: 'restaurantes', localidad: 'Guayaquil', creador: 'La Casona', comidas: [] },
      { id: 202, nombre: 'Café del Centro', descripcion: 'Café artesanal y pastelería', imagen: 'https://placehold.co/300x200/7C3AED/FFFFFF?text=Cafe', precio: 25, categoria: 'restaurantes', localidad: 'Quito', creador: 'Café del Centro', comidas: [] },
      { id: 203, nombre: 'Pizzería Bella Italia', descripcion: 'Pizza auténtica italiana', imagen: 'https://placehold.co/300x200/DC2626/FFFFFF?text=Pizzeria', precio: 35, categoria: 'restaurantes', localidad: 'Quito', creador: 'Bella Italia', comidas: [] },
      { id: 204, nombre: 'Sushi Bar Asia', descripcion: 'Sushi fresco y sashimi', imagen: 'https://placehold.co/300x200/1F2937/FFFFFF?text=Sushi', precio: 55, categoria: 'restaurantes', localidad: 'Guayaquil', creador: 'Asia Fusion', comidas: [] },
      { id: 205, nombre: 'Cevichería El Mar', descripcion: 'Ceviche y mariscos frescos', imagen: 'https://placehold.co/300x200/0EA5E9/FFFFFF?text=Ceviche', precio: 40, categoria: 'restaurantes', localidad: 'Manta', creador: 'El Mar', comidas: [] }
    ];
  }

  // Crear nueva comida personalizada
  createCustomMeal(restaurantId, mealData) {
    const userId = this.currentUser?.id || 1;
    const key = `custom_meals_${userId}`;
    
    let customMeals = [];
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        customMeals = JSON.parse(stored);
      }
    } catch (e) {
      console.log('Error cargando comidas personalizadas');
    }
    
    const newMeal = {
      id: Date.now(),
      restaurantId: restaurantId,
      nombre: mealData.nombre,
      descripcion: mealData.descripcion,
      imagen: mealData.imagen || 'https://placehold.co/300x200/FF6B6B/FFFFFF?text=Comida',
      precio: mealData.precio || 0,
      categoria: 'comidas_personalizadas',
      localidad: mealData.localidad,
      creador: this.currentUser?.nombre || 'Usuario',
      fechaCreacion: new Date().toISOString()
    };
    
    customMeals.push(newMeal);
    localStorage.setItem(key, JSON.stringify(customMeals));
    
    return newMeal;
  }

  // Obtener comidas personalizadas de un usuario
  getUserCustomMeals(userId) {
    const key = `custom_meals_${userId}`;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.log('Error cargando comidas personalizadas');
    }
    return [];
  }

  // Mostrar modal para crear comida personalizada
  showCreateCustomMealModal(restaurantId) {
    const modalHTML = `
      <div id="createCustomMealModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Crear Nueva Comida</h3>
            <button class="modal-close" onclick="app.closeCreateCustomMealModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label class="form-label">Nombre de la Comida</label>
              <input type="text" id="custom_meal_nombre" class="form-input" placeholder="Ej: Ceviche de camarón">
            </div>
            
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea id="custom_meal_descripcion" class="form-input" placeholder="Describe tu comida personalizada"></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Localidad</label>
              <input type="text" id="custom_meal_localidad" class="form-input" placeholder="Quito, Guayaquil, Baños...">
            </div>
            
            <div class="form-group">
              <label class="form-label">Precio (opcional)</label>
              <input type="number" id="custom_meal_precio" class="form-input" placeholder="0" step="0.01">
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeCreateCustomMealModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.saveCustomMeal(${restaurantId})">Crear Comida</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('createCustomMealModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Cerrar modal de crear comida
  closeCreateCustomMealModal() {
    const modal = document.getElementById('createCustomMealModal');
    if (modal) {
      modal.remove();
    }
  }

  // Guardar comida personalizada
  saveCustomMeal(restaurantId) {
    const nombre = document.getElementById('custom_meal_nombre').value.trim();
    const descripcion = document.getElementById('custom_meal_descripcion').value.trim();
    const localidad = document.getElementById('custom_meal_localidad').value.trim();
    const precio = parseFloat(document.getElementById('custom_meal_precio').value) || 0;
    
    if (!nombre.trim()) {
      this.showError('El nombre de la comida es obligatorio');
      return;
    }
    
    if (!localidad.trim()) {
      this.showError('La localidad es obligatoria');
      return;
    }
    
    const newMeal = this.createCustomMeal(restaurantId, {
      nombre,
      descripcion,
      localidad,
      precio
    });
    
    this.closeCreateCustomMealModal();
    this.showSuccess('Comida personalizada creada exitosamente');
    
    // Recargar la página de restaurantes para mostrar la nueva comida
    if (window.location.hash.includes('restaurantes')) {
      this.loadPage('pages/search_user.html');
    }
  }

  // Obtener actividades
  getActivities() {
    // Usar datos de data/products.js si está disponible
    if (typeof products !== 'undefined' && products.actividades) {
      return products.actividades;
    }
    // Fallback a datos hardcodeados
    return [
      { id: 301, nombre: 'Tour Mitad del Mundo', descripcion: 'Visita al monumento de la Mitad del Mundo', imagen: 'https://placehold.co/300x200/F59E0B/FFFFFF?text=Tour', precio: 60, categoria: 'actividades', localidad: 'Quito', creador: 'Tour Ecuador', duracion: '4 horas', horarios: ['09:00', '14:00'] },
      { id: 302, nombre: 'Paseo en Barco', descripcion: 'Paseo por el río Guayas', imagen: 'https://placehold.co/300x200/10B981/FFFFFF?text=Barco', precio: 80, categoria: 'actividades', localidad: 'Guayaquil', creador: 'Turismo Guayas', duracion: '2 horas', horarios: ['10:00', '15:00', '18:00'] },
      { id: 303, nombre: 'Rafting en Baños', descripcion: 'Aventura en río con rápidos clase III', imagen: 'https://placehold.co/300x200/7C2D12/FFFFFF?text=Rafting', precio: 75, categoria: 'actividades', localidad: 'Baños', creador: 'Aventura Ecuador', duracion: '3 horas', horarios: ['08:00', '13:00'] },
      { id: 304, nombre: 'Buceo en Galápagos', descripcion: 'Exploración submarina con tortugas marinas', imagen: 'https://placehold.co/300x200/0F766E/FFFFFF?text=Buceo', precio: 120, categoria: 'actividades', localidad: 'Galápagos', creador: 'Galápagos Dive', duracion: '5 horas', horarios: ['07:00', '14:00'] },
      { id: 305, nombre: 'Trekking Cotopaxi', descripcion: 'Caminata por el Parque Nacional Cotopaxi', imagen: 'https://placehold.co/300x200/374151/FFFFFF?text=Trekking', precio: 90, categoria: 'actividades', localidad: 'Cotopaxi', creador: 'Andes Trek', duracion: '6 horas', horarios: ['06:00', '12:00'] }
    ];
  }

  // Obtener comidas disponibles
  getComidas() {
    // Usar datos de data/products.js si está disponible
    if (typeof products !== 'undefined' && products.comidas) {
      return products.comidas;
    }
    // Fallback a datos hardcodeados
    return [
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
    ];
  }

  // Mostrar modal para seleccionar hotel con detalles
  showHotelSelectionModal(hotel) {
    // Obtener información del transporte para sincronizar días
    const transportInfo = this.getTransportInfoForHotel(hotel.localidad);
    
    const modalHTML = `
      <div id="hotelSelectionModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Seleccionar ${hotel.nombre}</h3>
            <button class="modal-close" onclick="app.closeHotelSelectionModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="hotel-preview">
              <img src="${hotel.imagen}" alt="${hotel.nombre}">
              <div class="hotel-info">
                <h4>${hotel.nombre}</h4>
                <p>${hotel.descripcion}</p>
                <p class="hotel-price">$${hotel.precio} por noche</p>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Número de Personas</label>
              <select id="hotel_personas" class="form-input">
                ${Array.from({length: hotel.capacidad}, (_, i) => `<option value="${i + 1}">${i + 1} ${i === 0 ? 'persona' : 'personas'}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Fecha de Llegada</label>
              <input type="date" id="hotel_fecha_llegada" class="form-input" value="${transportInfo?.fechaSalida || ''}">
            </div>
            
            <div class="form-group">
              <label class="form-label">Fecha de Salida</label>
              <input type="date" id="hotel_fecha_salida" class="form-input" value="${transportInfo?.fechaRegreso || ''}">
            </div>
            
            <div class="form-group">
              <label class="form-label">Número de Noches (Calculado automáticamente)</label>
              <input type="number" id="hotel_noches" class="form-input" value="${transportInfo?.noches || 1}" min="1" max="30" readonly style="background-color: #f5f5f5; cursor: not-allowed;">
            </div>
            
            <div class="hotel-summary">
              <h4>Resumen de Reserva</h4>
              <p><strong>Total noches:</strong> <span id="hotel_total_noches">${transportInfo?.noches || 1}</span></p>
              <p><strong>Precio total:</strong> $<span id="hotel_precio_total">${hotel.precio * (transportInfo?.noches || 1)}</span></p>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeHotelSelectionModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.confirmHotelSelection(${hotel.id})">Confirmar Reserva</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('hotelSelectionModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos para calcular precio total
    this.setupHotelModalEvents(hotel);
  }

  // Configurar eventos del modal de hotel
  setupHotelModalEvents(hotel) {
    const nochesInput = document.getElementById('hotel_noches');
    const personasSelect = document.getElementById('hotel_personas');
    const fechaLlegadaInput = document.getElementById('hotel_fecha_llegada');
    const fechaSalidaInput = document.getElementById('hotel_fecha_salida');
    
    // Función para calcular noches automáticamente
    const calculateNights = () => {
      const fechaLlegada = fechaLlegadaInput?.value;
      const fechaSalida = fechaSalidaInput?.value;
      
      if (fechaLlegada && fechaSalida) {
        const llegada = new Date(fechaLlegada);
        const salida = new Date(fechaSalida);
        
        // Validar que la fecha de salida sea posterior a la de llegada
        if (salida <= llegada) {
          this.showError('La fecha de salida debe ser posterior a la fecha de llegada');
          if (nochesInput) {
            nochesInput.value = 1;
          }
          this.updateHotelPrice(hotel.precio);
          return;
        }
        
        // Calcular diferencia en días
        const diffTime = salida - llegada;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Actualizar el campo de noches
        if (nochesInput) {
          nochesInput.value = diffDays;
        }
        
        // Actualizar el precio
        this.updateHotelPrice(hotel.precio);
      }
    };
    
    // Event listeners para las fechas
    if (fechaLlegadaInput) {
      fechaLlegadaInput.addEventListener('change', () => {
        // Si hay una fecha de llegada, ajustar la fecha mínima de salida
        const fechaLlegada = fechaLlegadaInput.value;
        if (fechaSalidaInput && fechaLlegada) {
          const llegada = new Date(fechaLlegada);
          llegada.setDate(llegada.getDate() + 1); // Mínimo 1 día después
          fechaSalidaInput.min = llegada.toISOString().split('T')[0];
        }
        calculateNights();
      });
    }
    
    if (fechaSalidaInput) {
      fechaSalidaInput.addEventListener('change', calculateNights);
    }
    
    if (personasSelect) {
      personasSelect.addEventListener('change', () => {
        this.updateHotelPrice(hotel.precio);
      });
    }
  }

  // Actualizar precio del hotel
  updateHotelPrice(precioPorNoche) {
    const noches = parseInt(document.getElementById('hotel_noches')?.value) || 1;
    const personas = parseInt(document.getElementById('hotel_personas')?.value) || 1;
    
    const totalNoches = document.getElementById('hotel_total_noches');
    const precioTotal = document.getElementById('hotel_precio_total');
    
    if (totalNoches) totalNoches.textContent = noches;
    if (precioTotal) precioTotal.textContent = precioPorNoche * noches * personas;
  }

  // Obtener información del transporte para sincronizar con hotel
  getTransportInfoForHotel(localidad) {
    const userId = this.currentUser?.id || 1;
    const key = `transport_${userId}`;
    
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const transport = JSON.parse(stored);
        if (transport.localidad === localidad) {
          const fechaSalida = new Date(transport.fechaSalida);
          const fechaRegreso = new Date(transport.fechaRegreso);
          const noches = Math.ceil((fechaRegreso - fechaSalida) / (1000 * 60 * 60 * 24));
          
          return {
            fechaSalida: transport.fechaSalida,
            fechaRegreso: transport.fechaRegreso,
            noches: noches > 0 ? noches : 1
          };
        }
      }
    } catch (e) {
      console.log('Error obteniendo información del transporte');
    }
    
    return null;
  }

  // Cerrar modal de selección de hotel
  closeHotelSelectionModal() {
    const modal = document.getElementById('hotelSelectionModal');
    if (modal) {
      modal.remove();
    }
  }

  // Confirmar selección de hotel
  confirmHotelSelection(hotelId) {
    const personas = document.getElementById('hotel_personas')?.value;
    const fechaLlegada = document.getElementById('hotel_fecha_llegada')?.value;
    const fechaSalida = document.getElementById('hotel_fecha_salida')?.value;
    const noches = document.getElementById('hotel_noches')?.value;
    
    if (!personas || !fechaLlegada || !fechaSalida || !noches) {
      this.showError('Por favor completa todos los campos');
      return;
    }
    
    // Guardar datos del hotel seleccionado para el paquete
    const hotel = this.findProductById(hotelId) || this.resolveProductById(hotelId);
    if (hotel) {
      hotel.reservaSeleccionada = {
        personas: parseInt(personas),
        fechaLlegada,
        fechaSalida,
        noches: parseInt(noches),
        precioTotal: hotel.precio * parseInt(noches) * parseInt(personas)
      };
      
      // Cerrar modal de hotel
      this.closeHotelSelectionModal();
      
      // Si estamos en flujo de creación de paquete, agregar directo al paquete
      if (window.inPackageCreationFlow && this.currentPackage) {
        // Guardar el producto seleccionado antes de agregarlo
        window.selectedProductForPackage = hotel;
        this.lastSelectedProduct = hotel; // Respaldo en el contexto de la clase
        console.log('Producto guardado para agregar:', hotel);
        this.addProductToCurrentPackage();
      } else if (window.inEditPackageFlow) {
        // Si estamos en flujo de edición de paquete, agregar al paquete específico
        this.addProductToEditPackageDirect(hotel);
      } else {
        // Desde Home/Buscar, abrir modal de agregar a paquete
        this.showAddToPackageModal(hotel);
      }
    }
  }

  // Mostrar modal para seleccionar actividad con detalles
  showActivitySelectionModal(activity) {
    const modalHTML = `
      <div id="activitySelectionModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Seleccionar ${activity.nombre}</h3>
            <button class="modal-close" onclick="app.closeActivitySelectionModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="activity-preview">
              <img src="${activity.imagen}" alt="${activity.nombre}">
              <div class="activity-info">
                <h4>${activity.nombre}</h4>
                <p>${activity.descripcion}</p>
                <p class="activity-price">$${activity.precio} por persona</p>
                <p class="activity-duration"><i class="fas fa-clock"></i> ${activity.duracion}</p>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Número de Personas</label>
              <select id="activity_personas" class="form-input">
                ${Array.from({length: 10}, (_, i) => `<option value="${i + 1}">${i + 1} ${i === 0 ? 'persona' : 'personas'}</option>`).join('')}
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Fecha de Actividad</label>
              <input type="date" id="activity_fecha" class="form-input" value="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div class="form-group">
              <label class="form-label">Hora de Inicio</label>
              <select id="activity_hora" class="form-input">
                ${activity.horarios ? activity.horarios.map(hora => `<option value="${hora}">${hora}</option>`).join('') : 
                  Array.from({length: 24}, (_, i) => `<option value="${String(i).padStart(2, '0')}:00">${String(i).padStart(2, '0')}:00</option>`).join('')}
              </select>
            </div>
            
            <div class="activity-summary">
              <h4>Resumen de Actividad</h4>
              <p><strong>Duración:</strong> ${activity.duracion}</p>
              <p><strong>Precio total:</strong> $<span id="activity_precio_total">${activity.precio}</span></p>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeActivitySelectionModal()">Cancelar</button>
              <button class="btn btn-primary" onclick="app.confirmActivitySelection(${activity.id})">Confirmar Actividad</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remover modal existente si hay uno
    const existingModal = document.getElementById('activitySelectionModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Insertar nuevo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos para calcular precio total
    this.setupActivityModalEvents(activity);
  }

  // Configurar eventos del modal de actividad
  setupActivityModalEvents(activity) {
    const personasSelect = document.getElementById('activity_personas');
    
    if (personasSelect) {
      personasSelect.addEventListener('change', () => {
        this.updateActivityPrice(activity.precio);
      });
    }
  }

  // Actualizar precio de la actividad
  updateActivityPrice(precioPorPersona) {
    const personas = parseInt(document.getElementById('activity_personas')?.value) || 1;
    const precioTotal = document.getElementById('activity_precio_total');
    
    if (precioTotal) precioTotal.textContent = precioPorPersona * personas;
  }

  // Cerrar modal de selección de actividad
  closeActivitySelectionModal() {
    const modal = document.getElementById('activitySelectionModal');
    if (modal) {
      modal.remove();
    }
  }

  // Confirmar selección de actividad
  confirmActivitySelection(activityId) {
    const personas = document.getElementById('activity_personas')?.value;
    const fecha = document.getElementById('activity_fecha')?.value;
    const hora = document.getElementById('activity_hora')?.value;
    
    if (!personas || !fecha || !hora) {
      this.showError('Por favor completa todos los campos');
      return;
    }
    
    // Guardar datos de la actividad seleccionada para el paquete
    const activity = this.findProductById(activityId) || this.resolveProductById(activityId);
    if (activity) {
      activity.reservaSeleccionada = {
        personas: parseInt(personas),
        fecha,
        hora,
        precioTotal: activity.precio * parseInt(personas)
      };
      
      // Cerrar modal de actividad
      this.closeActivitySelectionModal();
      
      // Si estamos en flujo de creación de paquete, agregar directo al paquete
      if (window.inPackageCreationFlow && this.currentPackage) {
        // Guardar el producto seleccionado antes de agregarlo
        window.selectedProductForPackage = activity;
        this.lastSelectedProduct = activity; // Respaldo en el contexto de la clase
        console.log('Producto guardado para agregar:', activity);
        this.addProductToCurrentPackage();
      } else if (window.inEditPackageFlow) {
        // Si estamos en flujo de edición de paquete, agregar al paquete específico
        this.addProductToEditPackageDirect(activity);
      } else {
        // Desde Home/Buscar, abrir modal de agregar a paquete
        this.showAddToPackageModal(activity);
      }
    }
  }

  // Mostrar modal para agregar a paquete
  showAddToPackageModal(product) {
    // Crear el modal si no existe
    this.createAddToPackageModal();
    
    const modal = document.getElementById('addToPackageModal');
    const productPreview = document.getElementById('productPreview');
    const packagesList = document.getElementById('packagesList');
    const confirmBtn = document.getElementById('confirmAddToPackage');
    
    // Configurar vista previa del producto
    let previewHTML = `
      <img src="${product.imagen}" alt="${product.nombre}">
      <div class="product-preview-info">
        <h4>${product.nombre}</h4>
        <p>${product.descripcion}</p>
        <p class="product-preview-price">$${product.precio}</p>
    `;
    
    // Agregar información de reserva si existe
    if (product.reservaSeleccionada) {
      if (product.categoria === 'hoteles') {
        previewHTML += `
          <div class="reservation-details">
            <p><strong>Reserva:</strong> ${product.reservaSeleccionada.personas} personas, ${product.reservaSeleccionada.noches} noches</p>
            <p><strong>Total:</strong> $${product.reservaSeleccionada.precioTotal}</p>
          </div>
        `;
      } else if (product.categoria === 'actividades') {
        previewHTML += `
          <div class="reservation-details">
            <p><strong>Reserva:</strong> ${product.reservaSeleccionada.personas} personas</p>
            <p><strong>Fecha:</strong> ${product.reservaSeleccionada.fecha} a las ${product.reservaSeleccionada.hora}</p>
            <p><strong>Total:</strong> $${product.reservaSeleccionada.precioTotal}</p>
          </div>
        `;
      }
    }
    
    // Agregar información de comidas si es restaurante
    if (product.categoria === 'restaurantes' && product.comidasSeleccionadas) {
      const userId = this.currentUser?.id || 1;
      const customMeals = this.getUserCustomMeals(userId);
      const selectedMeals = customMeals.filter(meal => product.comidasSeleccionadas.includes(meal.id));
      
      if (selectedMeals.length > 0) {
        previewHTML += `
          <div class="meals-selected">
            <p><strong>Comidas seleccionadas:</strong></p>
            ${selectedMeals.map(meal => `<p>• ${meal.nombre} - $${meal.precio}</p>`).join('')}
          </div>
        `;
      }
    }
    
    previewHTML += `</div>`;
    productPreview.innerHTML = previewHTML;
    
    // Verificar si estamos en flujo de creación de paquete
    if (window.inPackageCreationFlow && this.currentPackage) {
      // En creación de paquete: ocultar sección de paquetes y mostrar botón para agregar directo
      const packagesSection = document.getElementById('packagesSection');
      if (packagesSection) {
        packagesSection.style.display = 'none';
      }
      
      packagesList.innerHTML = `
        <div class="package-creation-flow">
          <h4>Paquete en construcción: ${this.currentPackage.nombre || 'Nuevo Paquete'}</h4>
          <p>Este producto se agregará directamente al paquete que estás creando.</p>
          <button class="btn btn-primary" onclick="app.addProductToCurrentPackage()">
            Agregar al Paquete en Construcción
          </button>
        </div>
      `;
    } else {
      // Desde Home/Buscar: mostrar sección de paquetes y cargar paquetes existentes
      const packagesSection = document.getElementById('packagesSection');
      if (packagesSection) {
        packagesSection.style.display = 'block';
      }
      
      this.loadUserPackagesForModal(packagesList, product.id);
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
    
    // Guardar referencia del producto seleccionado
    window.selectedProductForPackage = product;
  }

  // Crear el modal en el DOM
  createAddToPackageModal() {
    // Solo crear si no existe
    if (document.getElementById('addToPackageModal')) {
      return;
    }

    const modalHTML = `
      <div id="addToPackageModal" class="modal-overlay hidden">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">Agregar a Paquete</h3>
            <button class="modal-close" onclick="app.closeAddToPackageModal()">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="product-preview" id="productPreview">
              <!-- Vista previa del producto seleccionado -->
            </div>
            
            <div class="packages-section" id="packagesSection">
              <h4>Selecciona un paquete</h4>
              <div id="packagesList" class="packages-list">
                <!-- Lista de paquetes del usuario -->
              </div>
              
              <div class="create-package-option">
                <button class="btn btn-outline" onclick="app.createNewPackage()">
                  <i class="fas fa-plus"></i> Crear Nuevo Paquete
                </button>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" onclick="app.closeAddToPackageModal()">Cancelar</button>
              <button class="btn btn-primary" id="confirmAddToPackage" onclick="app.confirmAddToPackage()" disabled>
                Agregar al Paquete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Cargar paquetes del usuario para el modal
  async loadUserPackagesForModal(packagesList, productId) {
    try {
      const userId = this.currentUser?.id || 1;
      let packages = [];
      
      // Intentar cargar paquetes del localStorage
      try {
        const stored = localStorage.getItem(`packages_${userId}`);
        if (stored) {
          packages = JSON.parse(stored);
        }
      } catch (e) {
        console.log('No hay paquetes guardados');
      }
      
      // Crear paquetes de prueba si no existen
      if (!packages || packages.length === 0) {
        packages = this.createTestPackages(userId);
      }
      
      if (!packages || packages.length === 0) {
        packagesList.innerHTML = `
          <div class="no-packages">
            <p>No tienes paquetes creados</p>
            <button class="btn btn-primary" onclick="app.createNewPackage()">
              <i class="fas fa-plus"></i> Crear nuevo paquete
            </button>
          </div>
        `;
        return;
      }
      
      // Filtrar por localidad del producto si corresponde
      let effectivePackages = packages;
      let productForAdd = null;
      if (productId) {
        // Usar findProductById en lugar de resolveProductById para consistencia
        productForAdd = this.findProductById(productId);
        console.log('🔍 Filtrando paquetes para localidad:', productForAdd?.localidad);
        
        if (productForAdd && productForAdd.localidad) {
          const targetLocalidad = productForAdd.localidad.toLowerCase();
          console.log('📍 Localidad objetivo:', targetLocalidad);
          console.log('📦 Paquetes antes del filtro:', packages.length);
          
          effectivePackages = packages.filter(p => {
            const packageLocalidad = (p.localidad || '').toLowerCase();
            const matches = packageLocalidad === targetLocalidad;
            console.log(`Paquete "${p.nombre}": ${packageLocalidad} === ${targetLocalidad} = ${matches}`);
            return matches;
          });
          
          console.log('✅ Paquetes después del filtro:', effectivePackages.length);
        } else {
          console.log('⚠️ Producto sin localidad, mostrando todos los paquetes');
        }
      }

      if (productId && effectivePackages.length === 0) {
        packagesList.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fas fa-map-marker-alt"></i></div>
            <h3>No hay paquetes creados para esta localidad</h3>
            <p>Puedes crear un paquete nuevo para agregar este producto.</p>
            <div style="margin-top:12px;text-align:center;">
              <button class="btn btn-primary" id="createPackageFromModal"><i class="fas fa-plus"></i> Crear paquete</button>
            </div>
          </div>
        `;
        const btn = document.getElementById('createPackageFromModal');
        if (btn) {
          btn.onclick = () => {
            try { if (productForAdd?.localidad) localStorage.setItem('prefill_package_localidad', productForAdd.localidad); } catch {}
            this.closeAddToPackageModal();
            this.loadPage('pages/new-package.html');
          };
        }
        return;
      }

      packagesList.innerHTML = effectivePackages.map(pkg => `
        <div class="package-option" data-package-id="${pkg.id}">
          <div class="package-option-info">
            <h4>${pkg.nombre || 'Paquete'}</h4>
            <p>${pkg.localidad || 'Sin localidad'}</p>
            <p class="package-option-products">${pkg.productos ? pkg.productos.length : 0} productos</p>
            <p class="package-option-price">$${pkg.precio_total || pkg.precio || 0}</p>
          </div>
          <input type="radio" name="selectedPackage" value="${pkg.id}" onchange="app.enableConfirmButton()">
        </div>
      `).join('');
      
      // Agregar evento para crear nuevo paquete
      packagesList.innerHTML += `
        <div class="create-new-section">
          <button class="btn btn-outline" onclick="app.createNewPackage()">
            <i class="fas fa-plus"></i> Crear nuevo paquete
          </button>
        </div>
      `;
      
    } catch (error) {
      console.error('Error cargando paquetes:', error);
      packagesList.innerHTML = '<p class="error">Error cargando paquetes</p>';
    }
  }

  // Crear paquetes de prueba
  createTestPackages(userId) {
    const testPackages = [
      {
        id: 1,
        nombre: 'Paquete Quito',
        imagen: 'https://placehold.co/600x300/1e3a8a/FFFFFF?text=Paquete',
        localidad: 'Quito',
        productos: [],
        precio_total: 0
      },
      {
        id: 2,
        nombre: 'Paquete Guayaquil',
        imagen: 'https://placehold.co/600x300/1e3a8a/FFFFFF?text=Paquete',
        localidad: 'Guayaquil',
        productos: [],
        precio_total: 0
      }
    ];
    
    localStorage.setItem(`packages_${userId}`, JSON.stringify(testPackages));
    return testPackages;
  }

  // Habilitar botón de confirmación
  enableConfirmButton() {
    const confirmBtn = document.getElementById('confirmAddToPackage');
    const selectedPackage = document.querySelector('input[name="selectedPackage"]:checked');
    
    if (selectedPackage) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = `Agregar al Paquete`;
    } else {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Agregar al Paquete';
    }
  }

  // Confirmar agregar producto al paquete
  confirmAddToPackage() {
    const selectedPackage = document.querySelector('input[name="selectedPackage"]:checked');
    const product = window.selectedProductForPackage;
    
    if (!selectedPackage || !product) {
      alert('Por favor selecciona un paquete');
      return;
    }
    
    try {
      const userId = this.currentUser?.id || 1;
      const packageId = parseInt(selectedPackage.value);
      
      // Simular agregar producto al paquete (por ahora)
      alert(`¡Producto "${product.nombre}" agregado exitosamente al paquete ${packageId}!`);
      this.closeAddToPackageModal();
      
    } catch (error) {
      console.error('Error agregando producto al paquete:', error);
      alert('Error al agregar el producto al paquete');
    }
  }

  // Crear nuevo paquete
  createNewPackage() {
    this.closeAddToPackageModal();
    // Navegar a la página de crear paquete
    this.loadPage('pages/new-package.html');
  }

  // Cerrar modal
  closeAddToPackageModal() {
    const modal = document.getElementById('addToPackageModal');
    if (modal) {
      modal.classList.add('hidden');
      
      // Limpiar selección
      const selectedPackage = document.querySelector('input[name="selectedPackage"]:checked');
      if (selectedPackage) {
        selectedPackage.checked = false;
      }
      
      // Limpiar referencia del producto
      window.selectedProductForPackage = null;
      
      // Deshabilitar botón de confirmación
      const confirmBtn = document.getElementById('confirmAddToPackage');
      if (confirmBtn) {
        confirmBtn.disabled = true;
      }
    }
  }

  // Agregar producto al paquete en construcción
  addProductToCurrentPackage() {
    console.log('=== DEBUG addProductToCurrentPackage ===');
    console.log('window.selectedProductForPackage:', window.selectedProductForPackage);
    console.log('this.currentPackage:', this.currentPackage);
    console.log('window.inPackageCreationFlow:', window.inPackageCreationFlow);
    console.log('this:', this);
    
    const product = window.selectedProductForPackage;
    if (!product) {
      console.error('Error: No hay producto seleccionado');
      console.log('Estado actual de window.selectedProductForPackage:', window.selectedProductForPackage);
      console.log('Verificando si el producto se perdió en el proceso...');
      
      // Intentar recuperar el producto del contexto
      if (this.lastSelectedProduct) {
        console.log('Recuperando producto del contexto:', this.lastSelectedProduct);
        window.selectedProductForPackage = this.lastSelectedProduct;
        return this.addProductToCurrentPackage(); // Recursión con el producto recuperado
      }
      
      alert('Error: No hay producto seleccionado. Por favor, intenta nuevamente.');
      return;
    }
    
    if (!this.currentPackage) {
      console.error('Error: No hay paquete en construcción');
      console.log('Intentando inicializar currentPackage...');
      
      // Intentar inicializar el paquete si no existe
      if (window.inPackageCreationFlow) {
        this.currentPackage = {
          id: Date.now(),
          nombre: 'Nuevo Paquete',
          descripcion: 'Paquete en construcción',
          localidad: '',
          productos: [],
          precioTotal: 0,
          precio_total: 0,
          fechaCreacion: new Date().toISOString(),
          usuarioId: this.currentUser ? this.currentUser.id : 1
        };
        console.log('Paquete inicializado:', this.currentPackage);
      } else {
        alert('Error: No se puede agregar el producto al paquete');
        return;
      }
    }
    
    console.log('Agregando producto:', product);
    console.log('Paquete actual:', this.currentPackage);
    
    // Agregar producto al paquete actual
    this.currentPackage.productos.push({
      ...product,
      fechaAgregado: new Date().toISOString()
    });
    
    // Actualizar precio total (usar precioTotal si existe, sino usar precio)
    const precioProducto = product.precioTotal || product.precio;
    this.currentPackage.precio_total += precioProducto;
    this.currentPackage.precioTotal += precioProducto;
    
    console.log('Producto agregado exitosamente. Nuevo estado del paquete:', this.currentPackage);
    
    // Limpiar el producto seleccionado después de agregarlo
    window.selectedProductForPackage = null;
    this.lastSelectedProduct = null;
    
    // Mostrar mensaje de éxito
    this.showSuccess(`¡${product.nombre} agregado al paquete en construcción!`);
    
    // Cerrar modal
    this.closeAddToPackageModal();
    
    // Actualizar vista del paquete en construcción si estamos en esa página
    if (window.location.hash.includes('new-package') || window.inPackageCreationFlow) {
      this.updatePackageSummary();
    }
    
    // Asegurar que el resumen se actualice siempre
    setTimeout(() => {
      this.updatePackageSummary();
    }, 100);
  }

  // Obtener paquete por ID (función auxiliar)
  async getPackageById(packageId) {
    if (!this.currentUser) {
      return null;
    }
    
    try {
      const userId = this.currentUser.id;
      const packages = await loadUserPackages(userId);
      return packages.find(pkg => pkg.id === packageId) || null;
    } catch (error) {
      console.error('Error obteniendo paquete:', error);
      return null;
    }
  }
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, inicializando aplicación...');
  console.log('Elemento main encontrado:', document.querySelector('main'));
  
  window.app = new TravelApp();
  window.app.init();
});

