/* =====================================================================
   INSCRIPCION.JS – Lógica de validación y captura de datos para RIdeC
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');

    if (!eventForm) return;

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Captura de datos usando FormData (ideal para análisis posterior)
        const formData = new FormData(eventForm);
        const data = Object.fromEntries(formData.entries());
        
        // Manejo especial para checkboxes (pueden ser múltiples valores)
        data.origen = formData.getAll('origen');

        // 2. Validación de seguridad / Integridad
        if (!data.consentimiento) {
            alert("Es necesario aceptar el consentimiento informado para participar.");
            return;
        }

        // 3. Simulación de envío (Aquí conectarías con tu backend o Firebase)
        try {
            console.log("Enviando datos de inscripción:", data);
            
            // Cambiar estado del botón para feedback visual
            const submitBtn = eventForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Procesando...";

            // Simulamos una petición de red
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 4. Éxito: Feedback al usuario
            mostrarExito();
            eventForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            console.error("Error al inscribir:", error);
            alert("Hubo un error al procesar tu inscripción. Por favor, intenta más tarde.");
        }
    });
});

/**
 * Función para mostrar un mensaje de éxito elegante
 */
function mostrarExito() {
    const container = document.querySelector('.form-container');
    const originalContent = container.innerHTML;

    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; color: var(--app-color-accent); margin-bottom: 1rem;">✓</div>
            <h2 style="color: var(--app-color-primary); margin-bottom: 1rem;">¡Inscripción Exitosa!</h2>
            <p>Hemos registrado tus datos. Te enviaremos un correo con los detalles del evento en breve.</p>
            <button onclick="location.reload()" class="btn-submit" style="margin-top: 2rem; max-width: 200px;">Volver</button>
        </div>
    `;
}