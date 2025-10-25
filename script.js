document.addEventListener("DOMContentLoaded", function() {
    const sesionesContainer = document.getElementById('sesiones-container');
    const addSessionBtn = document.getElementById('add-session-btn');

    function updateSessionNumbers() {
        const sessionCards = document.querySelectorAll('.sesion-card');
        sessionCards.forEach((card, index) => {
            card.querySelector('.card-title').textContent = `Sesión ${index + 1}`;
        });
    }

    if (sesionesContainer) {
        sesionesContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-session-btn')) {
                e.target.closest('.sesion-card').remove();
                updateSessionNumbers();
            }
        });
    }

    if (addSessionBtn) {
        addSessionBtn.addEventListener('click', function() {
            const newSession = document.createElement('div');
            newSession.classList.add('card', 'sesion-card', 'mb-3');
            const newSessionNumber = document.querySelectorAll('.sesion-card').length + 1;
            newSession.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">Sesión ${newSessionNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-session-btn">Quitar</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha:</label>
                        <input type="date" class="form-control" name="sesion_fecha[]">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Evolución:</label>
                        <textarea class="form-control" name="sesion_evolucion[]" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Tratamiento:</label>
                        <textarea class="form-control" name="sesion_tratamiento[]" rows="2"></textarea>
                    </div>
                </div>
            `;
            sesionesContainer.appendChild(newSession);
            updateSessionNumbers();
        });
    }

    const fechaNacimientoInput = document.getElementById('fecha_nacimiento');
    const edadInput = document.getElementById('edad');

    if (fechaNacimientoInput) {
        fechaNacimientoInput.addEventListener('change', function() {
            if (this.value) {
                const birthDate = new Date(this.value);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                edadInput.value = age;
            }
        });
    }

    const confirmarDolorBtn = document.getElementById('confirmar-dolor-btn');
    const dolorSlider = document.getElementById('dolor-slider');
    const dolorSeleccionado = document.getElementById('dolor-seleccionado');

    if (confirmarDolorBtn) {
        confirmarDolorBtn.addEventListener('click', function() {
            const formattedValue = parseFloat(dolorSlider.value).toFixed(1);
            dolorSeleccionado.textContent = `${formattedValue} cm`;
            dolorSeleccionado.classList.remove('d-none');
        });
    }

    // --- Image Uploader Logic ---

    function handleImagePreview(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            const previewImg = event.target.closest('.image-upload-item').querySelector('.image-preview');
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    }

    function addImageUploader(container, prefix) {
        const newImageDiv = document.createElement('div');
        newImageDiv.classList.add('col-md-4', 'image-upload-item', 'mb-3');
        newImageDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <input type="file" class="form-control mb-2" name="${prefix}_imagen[]" accept="image/*">
                    <textarea class="form-control" name="${prefix}_descripcion[]" rows="2" placeholder="Descripción"></textarea>
                    <img class="image-preview mt-2" src="#" alt="Vista previa de la imagen" style="display: none; max-width: 100%;">
                    <button type="button" class="btn btn-danger btn-sm mt-2 remove-imagen-btn">Quitar</button>
                </div>
            </div>
        `;
        container.appendChild(newImageDiv);
        newImageDiv.querySelector('input[type="file"]').addEventListener('change', handleImagePreview);
    }

    const addInspeccionBtn = document.getElementById('add-inspeccion-imagen-btn');
    const inspeccionContainer = document.getElementById('inspeccion-imagenes-container');

    if (addInspeccionBtn && inspeccionContainer) {
        addInspeccionBtn.addEventListener('click', function() {
            addImageUploader(inspeccionContainer, 'inspeccion');
        });
    }

    const addEvalFuncionalBtn = document.getElementById('add-evaluacion-funcional-imagen-btn');
    const evalFuncionalContainer = document.getElementById('evaluacion-funcional-imagenes-container');

    if (addEvalFuncionalBtn && evalFuncionalContainer) {
        addEvalFuncionalBtn.addEventListener('click', function() {
            addImageUploader(evalFuncionalContainer, 'evaluacion_funcional');
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-imagen-btn')) {
            e.target.closest('.image-upload-item').remove();
        }
    });
});
