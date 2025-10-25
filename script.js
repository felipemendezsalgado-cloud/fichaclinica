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
                    <div class="mb-3">
                        <label class="form-label">Importar archivo (PNG o JPG):</label>
                        <input type="file" class="form-control" name="sesion_archivo[]" accept="image/png, image/jpeg">
                        <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                    </div>
                </div>
            `;
            sesionesContainer.appendChild(newSession);
            updateSessionNumbers();
        });
    }

    function handleImagePreview(e) {
        // Check if the event target is a file input
        if (e.target.matches('input[type="file"]')) {
            const file = e.target.files[0];
            const img = e.target.nextElementSibling;

            // Ensure we have a file and an adjacent img tag
            if (file && img && img.tagName === 'IMG') {
                const reader = new FileReader();
                reader.onload = function(event) {
                    img.src = event.target.result;
                    img.classList.remove('d-none');
                };
                reader.readAsDataURL(file);
            }
        }
    }

    // Attach the single event listener to a common ancestor (e.g., the main container)
    // This uses event delegation to handle clicks from multiple file inputs.
    const mainContent = document.getElementById('myTabContent');
    if (mainContent) {
        mainContent.addEventListener('change', handleImagePreview);
    }
    // Also attach to the sessions container for dynamically added sessions
    if (sesionesContainer) {
        sesionesContainer.addEventListener('change', handleImagePreview);
    }

    function setupImageUploader(containerId, buttonId, cardClassName, cardTitlePrefix) {
        const container = document.getElementById(containerId);
        const addButton = document.getElementById(buttonId);

        function updateNumbers() {
            const cards = container.querySelectorAll(`.${cardClassName}`);
            cards.forEach((card, index) => {
                card.querySelector('.card-title').textContent = `${cardTitlePrefix} ${index + 1}`;
            });
        }

        if (container) {
            container.addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-imagen-btn')) {
                    e.target.closest(`.${cardClassName}`).remove();
                    updateNumbers();
                }
            });
            container.addEventListener('change', handleImagePreview);
        }

        if (addButton) {
            addButton.addEventListener('click', function() {
                const newCard = document.createElement('div');
                newCard.classList.add('card', cardClassName, 'mb-3');
                const newNumber = container.querySelectorAll(`.${cardClassName}`).length + 1;
                newCard.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="card-title mb-0">${cardTitlePrefix} ${newNumber}</h6>
                            <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar</button>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Descripción:</label>
                            <textarea class="form-control" name="${containerId}_descripcion[]" rows="2"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Importar archivo (PNG o JPG):</label>
                            <input type="file" class="form-control" name="${containerId}_archivo[]" accept="image/png, image/jpeg">
                            <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                        </div>
                    </div>
                `;
                container.appendChild(newCard);
            });
        }
    }

    setupImageUploader('imagenes-container', 'add-imagen-btn', 'imagen-card', 'Imagen');
    setupImageUploader('inspeccion-imagenes-container', 'add-inspeccion-imagen-btn', 'inspeccion-imagen-card', 'Imagen de Inspección');
    setupImageUploader('evaluacion-funcional-imagenes-container', 'add-evaluacion-funcional-imagen-btn', 'evaluacion-funcional-imagen-card', 'Imagen de Exploración Funcional');

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

    const nuevaFichaBtn = document.getElementById('nueva-ficha-btn');
    if (nuevaFichaBtn) {
        nuevaFichaBtn.addEventListener('click', function() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => form.reset());

            // Clear the selected pain level display
            if (dolorSeleccionado) {
                dolorSeleccionado.textContent = '';
                dolorSeleccionado.classList.add('d-none');
            }

            // Remove all but the first treatment session
            const allSessions = sesionesContainer.querySelectorAll('.sesion-card');
            for (let i = allSessions.length - 1; i > 0; i--) {
                allSessions[i].remove();
            }
            updateSessionNumbers();

            // Reset image uploaders
            resetImageUploader('imagenes-container');
            resetImageUploader('inspeccion-imagenes-container');
            resetImageUploader('evaluacion-funcional-imagenes-container');
        });
    }

    function resetImageUploader(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            const allCards = container.querySelectorAll('.card');
            // Remove all but the first card if it exists, otherwise do nothing
            for (let i = allCards.length - 1; i > 0; i--) {
                allCards[i].remove();
            }
            // Clear the first card's fields
            if (allCards.length > 0) {
                const firstCard = allCards[0];
                firstCard.querySelector('textarea').value = '';
                const img = firstCard.querySelector('img');
                img.src = '';
                img.classList.add('d-none');
                firstCard.querySelector('input[type="file"]').value = '';
            }
        }
    }

    const exportarJsonBtn = document.getElementById('exportar-json-btn');
    if (exportarJsonBtn) {
        exportarJsonBtn.addEventListener('click', exportToJson);
    }

    const importarJsonBtn = document.getElementById('importar-json-btn');
    if (importarJsonBtn) {
        importarJsonBtn.addEventListener('click', function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.onchange = e => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        try {
                            const data = JSON.parse(event.target.result);
                            importFromJson(data);
                        } catch (error) {
                            console.error("Error parsing JSON file:", error);
                            alert("El archivo seleccionado no es un JSON válido.");
                        }
                    };
                    reader.readAsText(file);
                }
            };
            fileInput.click();
        });
    }

    function importFromJson(data) {
        // Clear the form first
        nuevaFichaBtn.click();

        // Populate simple fields
        for (const section in data) {
            if (section !== 'tratamiento') {
                for (const id in data[section]) {
                    const el = document.getElementById(id);
                    if (el) {
                        if (el.type === 'checkbox') {
                            el.checked = data[section][id];
                        } else {
                            el.value = data[section][id];
                        }
                    }
                }
            }
        }

        // Handle EVA display
        const dolorSeleccionado = document.getElementById('dolor-seleccionado');
        if (data.exploracionGeneral['dolor-seleccionado']) {
            dolorSeleccionado.textContent = data.exploracionGeneral['dolor-seleccionado'];
            dolorSeleccionado.classList.remove('d-none');
        }

        // Recreate image uploaders
        recreateImageUploader('imagenes-container', data.imagenologia.imagenes, 'add-imagen-btn');
        recreateImageUploader('inspeccion-imagenes-container', data.exploracionGeneral.inspeccionImagenes, 'add-inspeccion-imagen-btn');
        recreateImageUploader('evaluacion-funcional-imagenes-container', data.exploracionGeneral.evaluacionFuncionalImagenes, 'add-evaluacion-funcional-imagen-btn');

        // Handle AROM image display
        const aromImg = document.querySelector('#arom_archivo + img');
        if (data.exploracionAnalitica['arom_imagen'] && data.exploracionAnalitica['arom_imagen'].startsWith('data:image')) {
            aromImg.src = data.exploracionAnalitica['arom_imagen'];
            aromImg.classList.remove('d-none');
        }

        // Handle PROM image display
        const promImg = document.querySelector('#prom_archivo + img');
        if (data.exploracionAnalitica['prom_imagen'] && data.exploracionAnalitica['prom_imagen'].startsWith('data:image')) {
            promImg.src = data.exploracionAnalitica['prom_imagen'];
            promImg.classList.remove('d-none');
        }


        // Populate tratamiento goals
        document.getElementById('objetivo_general').value = data.tratamiento.objetivoGeneral;
        document.getElementById('objetivos_especificos').value = data.tratamiento.objetivosEspecificos;

        // Recreate sessions
        const sesiones = data.tratamiento.sesiones || [];
        const allSessionCards = sesionesContainer.querySelectorAll('.sesion-card');

        // Remove all sessions to start fresh
        allSessionCards.forEach(card => card.remove());

        if (sesiones.length === 0) {
            addSessionBtn.click(); // Add one empty session if there are none in the JSON
        } else {
            sesiones.forEach((sesionData, index) => {
                addSessionBtn.click();
                const newCard = sesionesContainer.querySelector('.sesion-card:last-child');
                if (newCard) {
                    newCard.querySelector('input[name="sesion_fecha[]"]').value = sesionData.fecha;
                    newCard.querySelector('textarea[name="sesion_evolucion[]"]').value = sesionData.evolucion;
                    newCard.querySelector('textarea[name="sesion_tratamiento[]"]').value = sesionData.tratamiento;
                    const img = newCard.querySelector('img');
                    if (sesionData.imagen && sesionData.imagen.startsWith('data:image')) {
                        img.src = sesionData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }
        updateSessionNumbers();

        // This function is no longer needed as the logic is handled by recreateImageUploader
    }

    function recreateImageUploader(containerId, imagesData, addButtonId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Remove all existing cards to start fresh
        const allCards = container.querySelectorAll('.card');
        allCards.forEach(card => card.remove());

        const addButton = document.getElementById(addButtonId);
        if (imagesData && imagesData.length > 0) {
            imagesData.forEach(imageData => {
                if (addButton) addButton.click();
                const newCard = container.querySelector('.card:last-child');
                if (newCard) {
                    newCard.querySelector('textarea').value = imageData.descripcion;
                    const img = newCard.querySelector('img');
                    if (imageData.imagen && imageData.imagen.startsWith('data:image')) {
                        img.src = imageData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        } else {
            // If there's no data, ensure there is at least one empty card
            if (addButton && container.children.length === 0) {
                addButton.click();
            }
        }
    }

    function exportToJson() {
        const data = {
            datosPersonales: {},
            anamnesisRemota: {},
            exploracionGeneral: {},
            exploracionAnalitica: {},
            imagenologia: {
                imagenes: []
            },
            tratamiento: {
                objetivoGeneral: '',
                objetivosEspecificos: '',
                sesiones: []
            }
        };

        // Gather data from all form elements
        document.querySelectorAll('input, textarea').forEach(el => {
            const section = el.closest('.tab-pane').id;
            const id = el.id;
            if (!id) return;

            switch(section) {
                case 'datos-personales':
                    data.datosPersonales[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'anamnesis-remota':
                    data.anamnesisRemota[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'exploracion-general':
                    data.exploracionGeneral[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'exploracion-analitica':
                    data.exploracionAnalitica[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'tratamiento':
                    if (id === 'objetivo_general') data.tratamiento.objetivoGeneral = el.value;
                    if (id === 'objetivos_especificos') data.tratamiento.objetivosEspecificos = el.value;
                    break;
            }
        });

        // Handle EVA separately
        data.exploracionGeneral['dolor-seleccionado'] = document.getElementById('dolor-seleccionado').textContent;

        // Gather image data from all uploaders
        data.imagenologia.imagenes = gatherImageData('imagenes-container');
        data.exploracionGeneral.inspeccionImagenes = gatherImageData('inspeccion-imagenes-container');
        data.exploracionGeneral.evaluacionFuncionalImagenes = gatherImageData('evaluacion-funcional-imagenes-container');

        // Handle AROM image
        const aromImg = document.querySelector('#arom_archivo + img');
        if (aromImg && aromImg.src.startsWith('data:image')) {
            data.exploracionAnalitica['arom_imagen'] = aromImg.src;
        } else {
            data.exploracionAnalitica['arom_imagen'] = '';
        }

        // Handle PROM image
        const promImg = document.querySelector('#prom_archivo + img');
        if (promImg && promImg.src.startsWith('data:image')) {
            data.exploracionAnalitica['prom_imagen'] = promImg.src;
        } else {
            data.exploracionAnalitica['prom_imagen'] = '';
        }

        // Gather session data
        document.querySelectorAll('.sesion-card').forEach(card => {
            const sesion = {
                fecha: card.querySelector('input[name="sesion_fecha[]"]').value,
                evolucion: card.querySelector('textarea[name="sesion_evolucion[]"]').value,
                tratamiento: card.querySelector('textarea[name="sesion_tratamiento[]"]').value,
                imagen: card.querySelector('img').src,
            };
            data.tratamiento.sesiones.push(sesion);
        });

        const nombre = data.datosPersonales.nombre || "sin-nombre";
        const fecha = new Date().toISOString().slice(0, 10);
        const filename = `ficha-clinica-${nombre}-${fecha}.json`;

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function gatherImageData(containerId) {
        const images = [];
        const container = document.getElementById(containerId);
        if (container) {
            container.querySelectorAll('.card').forEach(card => {
                const imageData = {
                    descripcion: card.querySelector('textarea').value,
                    imagen: card.querySelector('img').src,
                };
                images.push(imageData);
            });
        }
        return images;
    }
});
