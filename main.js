/* LÓGICA DE INTERACCIÓN - REFORMAS JF */

// --- 1. GESTIÓN DE MENÚ MÓVIL ---
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navList.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace (móvil)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// --- 2. EFECTO HEADER AL HACER SCROLL ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.background = '#00267a'; 
    } else {
        header.style.padding = '1rem 0';
        header.style.background = '#0033A0';
    }
});

// --- 3. ENVÍO DE FORMULARIO (LOGICA SENIOR) ---
/**
 * Objetivo: Validar datos en cliente y enviar vía AJAX para mejorar UX.
 */
const form = document.getElementById('form-reforma');
const responseMsg = document.getElementById('form-response');

form.addEventListener('submit', function(e) {
    // Bloqueamos la recarga de página para manejar el envío asíncronamente
    e.preventDefault(); 

    // Captura y limpieza de datos (Sanitización)
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();

    // Validación de requerimiento mínimo de contacto
    if (email === "" && whatsapp === "") {
        alert("Error: Debes proporcionar un Email o un WhatsApp para que podamos contactarte.");
        document.getElementById('email').focus(); 
        return; 
    }

    // Feedback Visual y bloqueo de seguridad contra múltiples clics
    const btn = form.querySelector('.btn-submit');
    const originalBtnText = btn.innerText;
    btn.innerText = 'Enviando presupuesto...';
    btn.disabled = true;

    /**
     * Envío mediante Fetch API. 
     * FormSubmit procesará el FormData basándose en los 'name' de tu HTML.
     */
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json' 
        }
    })
    .then(response => {
        if (response.ok) {
            // Caso de éxito: Transición visual de la interfaz
            form.style.display = 'none';
            responseMsg.style.display = 'block';
            form.reset(); 
        } else {
            throw new Error('Server Response Error');
        }
    })
    .catch(error => {
        // Log de error para debug y aviso amigable al usuario
        console.error("Critical Error en submit:", error);
        alert("Lo sentimos, hubo un problema técnico. Por favor, llámanos directamente.");
        
        // Rollback: Restauramos el botón para permitir reintentos
        btn.innerText = originalBtnText;
        btn.disabled = false;
    });
});