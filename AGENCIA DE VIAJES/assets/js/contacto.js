// Funcionalidades específicas de la página de contacto
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initSocialLinks();
    initMapPlaceholder();
});

// Inicializar formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmission();
    });
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateContactField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
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

// Inicializar enlaces sociales
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('twitter') ? 'Twitter' :
                           this.classList.contains('youtube') ? 'YouTube' : 'Red Social';
            
            showNotification(`Redirigiendo a ${platform}...`, 'info');
            
            // Simular redirección
            setTimeout(() => {
                showNotification(`Funcionalidad de ${platform} en desarrollo`, 'info');
            }, 1000);
        });
    });
}

// Inicializar placeholder del mapa
function initMapPlaceholder() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (!mapPlaceholder) return;
    
    mapPlaceholder.addEventListener('click', function() {
        showMapModal();
    });
    
    // Agregar cursor pointer
    mapPlaceholder.style.cursor = 'pointer';
}

// Manejar envío del formulario de contacto
async function handleContactSubmission() {
    const form = document.getElementById('contactForm');
    
    if (!validateContactForm(form)) {
        return;
    }
    
    const formData = new FormData(form);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on',
        submittedAt: new Date().toISOString()
    };
    
    try {
        // Simular envío
        showLoadingState(form);
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular envío exitoso
        saveContactSubmission(contactData);
        
        // Mostrar confirmación
        showNotification('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
        
        // Limpiar formulario
        form.reset();
        
        // Actualizar contador de mensajes
        updateContactStats();
        
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        clearLoadingState(form);
    }
}

// Validar formulario de contacto
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateContactField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validar campo individual de contacto
function validateContactField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.name === 'firstName' || field.name === 'lastName') {
        if (!value) {
            errorMessage = 'Este campo es requerido';
            isValid = false;
        } else if (value.length < 2) {
            errorMessage = 'Debe tener al menos 2 caracteres';
            isValid = false;
        }
    } else if (field.name === 'email') {
        if (!value) {
            errorMessage = 'El email es requerido';
            isValid = false;
        } else if (!isValidEmail(value)) {
            errorMessage = 'Formato de email inválido';
            isValid = false;
        }
    } else if (field.name === 'phone' && value) {
        if (!isValidPhone(value)) {
            errorMessage = 'Formato de teléfono inválido';
            isValid = false;
        }
    } else if (field.name === 'subject') {
        if (!value) {
            errorMessage = 'Por favor selecciona un asunto';
            isValid = false;
        }
    } else if (field.name === 'message') {
        if (!value) {
            errorMessage = 'El mensaje es requerido';
            isValid = false;
        } else if (value.length < 10) {
            errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        margin-bottom: 0.5rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar formato de teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

// Guardar envío de contacto (simulado)
function saveContactSubmission(contactData) {
    try {
        // Obtener envíos existentes
        const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        
        // Agregar nuevo envío
        const newSubmission = {
            id: Date.now(),
            ...contactData
        };
        
        existingSubmissions.push(newSubmission);
        
        // Guardar en localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
        
        console.log('Mensaje de contacto guardado:', newSubmission);
        return true;
    } catch (error) {
        console.error('Error al guardar mensaje de contacto:', error);
        return false;
    }
}

// Mostrar estado de carga
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    submitBtn.style.opacity = '0.7';
    
    // Guardar texto original para restaurarlo
    submitBtn.dataset.originalText = originalText;
}

// Limpiar estado de carga
function clearLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.dataset.originalText || 'Enviar Mensaje';
    
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.style.opacity = '1';
}

// Mostrar modal del mapa
function showMapModal() {
    const modalHTML = `
        <div class="modal active" id="mapModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Nuestra Ubicación</h3>
                    <button class="modal-close" onclick="closeMapModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="map-info">
                        <div class="location-details">
                                                    <h4><i class="fas fa-map-marker-alt"></i> Dirección</h4>
                        <p>Calle 10 de Agosto<br>Quito, Ecuador</p>
                            
                            <h4><i class="fas fa-clock"></i> Horario de Atención</h4>
                            <p>Lunes - Viernes: 9:00 - 18:00<br>Sábados: 10:00 - 14:00</p>
                            
                            <h4><i class="fas fa-phone"></i> Contacto</h4>
                            <p>+34 900 123 456<br>+34 91 123 45 67</p>
                            
                            <h4><i class="fas fa-envelope"></i> Email</h4>
                            <p>info@viajesmundo.com<br>reservas@viajesmundo.com</p>
                        </div>
                        
                        <div class="map-placeholder-large">
                            <i class="fas fa-map"></i>
                            <p>Mapa interactivo de Google Maps</p>
                            <p class="map-note">Haz clic para ver la ubicación exacta</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeMapModal()">Cerrar</button>
                    <button class="btn btn-primary" onclick="openGoogleMaps()">
                        <i class="fas fa-external-link-alt"></i> Abrir en Google Maps
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Cerrar modal del mapa
function closeMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
        modal.remove();
    }
}

// Abrir Google Maps
function openGoogleMaps() {
    const address = 'Calle 10 de Agosto, Quito, Ecuador';
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Abrir en nueva pestaña
    window.open(googleMapsUrl, '_blank');
    
    // Cerrar modal
    closeMapModal();
    
    showNotification('Abriendo Google Maps...', 'info');
}

// Actualizar estadísticas de contacto
function updateContactStats() {
    try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const totalSubmissions = submissions.length;
        
        // Aquí se podrían actualizar contadores en la interfaz
        console.log(`Total de mensajes de contacto: ${totalSubmissions}`);
        
    } catch (error) {
        console.error('Error al actualizar estadísticas de contacto:', error);
    }
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

// Función para manejar errores
function handleError(error, context = '') {
    console.error(`Error en ${context}:`, error);
    showNotification(`Ha ocurrido un error: ${error.message}`, 'error');
}

// Función para validar formularios
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e5e9';
        }
    });
    
    return isValid;
}

// Función para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para hacer peticiones HTTP simuladas
async function makeRequest(url, options = {}) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular respuesta exitosa
    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, message: 'Mensaje enviado correctamente' })
    };
}

// Función para manejar respuestas de API
function handleApiResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

// Función para obtener envíos de contacto
function getContactSubmissions() {
    try {
        const submissions = localStorage.getItem('contactSubmissions');
        return submissions ? JSON.parse(submissions) : [];
    } catch (error) {
        console.error('Error al obtener envíos de contacto:', error);
        return [];
    }
}

// Función para limpiar envíos de contacto
function clearContactSubmissions() {
    try {
        localStorage.removeItem('contactSubmissions');
        return true;
    } catch (error) {
        console.error('Error al limpiar envíos de contacto:', error);
        return false;
    }
}

// Función para exportar envíos de contacto
function exportContactSubmissions() {
    try {
        const submissions = getContactSubmissions();
        
        if (submissions.length === 0) {
            showNotification('No hay mensajes de contacto para exportar', 'info');
            return;
        }
        
        // Crear CSV
        const csvContent = createCSVFromSubmissions(submissions);
        
        // Descargar archivo
        downloadCSV(csvContent, 'contactos_viajesmundo.csv');
        
        showNotification('Mensajes de contacto exportados exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al exportar envíos de contacto:', error);
        showNotification('Error al exportar los mensajes', 'error');
    }
}

// Crear CSV desde envíos
function createCSVFromSubmissions(submissions) {
    const headers = ['ID', 'Nombre', 'Apellidos', 'Email', 'Teléfono', 'Asunto', 'Mensaje', 'Newsletter', 'Fecha'];
    
    const csvRows = [headers.join(',')];
    
    submissions.forEach(submission => {
        const row = [
            submission.id,
            `"${submission.firstName}"`,
            `"${submission.lastName}"`,
            submission.email,
            submission.phone || '',
            `"${submission.subject}"`,
            `"${submission.message.replace(/"/g, '""')}"`,
            submission.newsletter ? 'Sí' : 'No',
            submission.submittedAt
        ];
        
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

// Descargar archivo CSV
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Función para obtener estadísticas de contacto
function getContactStats() {
    try {
        const submissions = getContactSubmissions();
        const totalSubmissions = submissions.length;
        
        // Agrupar por asunto
        const subjectStats = submissions.reduce((acc, submission) => {
            const subject = submission.subject;
            acc[subject] = (acc[subject] || 0) + 1;
            return acc;
        }, {});
        
        // Agrupar por mes
        const monthlyStats = submissions.reduce((acc, submission) => {
            const date = new Date(submission.submittedAt);
            const month = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
        
        return {
            total: totalSubmissions,
            bySubject: subjectStats,
            byMonth: monthlyStats,
            lastSubmission: submissions.length > 0 ? submissions[submissions.length - 1] : null
        };
    } catch (error) {
        console.error('Error al obtener estadísticas de contacto:', error);
        return {
            total: 0,
            bySubject: {},
            byMonth: {},
            lastSubmission: null
        };
    }
}

// Exportar funciones para uso global
window.ContactManager = {
    handleContactSubmission,
    validateContactForm,
    showMapModal,
    closeMapModal,
    openGoogleMaps,
    getContactSubmissions,
    clearContactSubmissions,
    exportContactSubmissions,
    getContactStats
};
