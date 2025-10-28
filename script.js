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

    const imagenesContainer = document.getElementById('imagenes-container');
    const addImagenBtn = document.getElementById('add-imagen-btn');

    function updateImageNumbers() {
        const imagenCards = document.querySelectorAll('.imagen-card');
        imagenCards.forEach((card, index) => {
            card.querySelector('.card-title').textContent = `Imagen ${index + 1}`;
        });
    }

    if (imagenesContainer) {
        imagenesContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-imagen-btn')) {
                e.target.closest('.imagen-card').remove();
                updateImageNumbers();
            }
        });
    }

    if (addImagenBtn) {
        addImagenBtn.addEventListener('click', function() {
            const newImagen = document.createElement('div');
            newImagen.classList.add('card', 'imagen-card', 'mb-3');
            const newImagenNumber = document.querySelectorAll('.imagen-card').length + 1;
            newImagen.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">Imagen ${newImagenNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción:</label>
                        <textarea class="form-control" name="imagen_descripcion[]" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Importar archivo (PNG o JPG):</label>
                        <input type="file" class="form-control" name="imagen_archivo[]" accept="image/png, image/jpeg">
                        <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                    </div>
                </div>
            `;
            imagenesContainer.appendChild(newImagen);
            updateImageNumbers();
        });
    }

    if (imagenesContainer) {
        imagenesContainer.addEventListener('change', handleImagePreview);
    }

    const descripcionDolorImagenesContainer = document.getElementById('descripcion-dolor-imagenes-container');
    const addDescripcionDolorImagenBtn = document.getElementById('add-descripcion-dolor-imagen-btn');

    function setupImageUploader(container, addButton, cardClass, titlePrefix) {
        function updateNumbers() {
            const cards = container.querySelectorAll(`.${cardClass}`);
            cards.forEach((card, index) => {
                card.querySelector('.card-title').textContent = `${titlePrefix} ${index + 1}`;
            });
        }

        container.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-imagen-btn')) {
                e.target.closest(`.${cardClass}`).remove();
                updateNumbers();
            }
        });

        addButton.addEventListener('click', function() {
            const newImage = document.createElement('div');
            newImage.classList.add('card', cardClass, 'mb-3');
            const newNumber = container.querySelectorAll(`.${cardClass}`).length + 1;
            newImage.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title mb-0">${titlePrefix} ${newNumber}</h6>
                        <button type="button" class="btn btn-danger btn-sm remove-imagen-btn">Quitar</button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Importar archivo (PNG o JPG):</label>
                        <input type="file" class="form-control" name="${cardClass}_archivo[]" accept="image/png, image/jpeg">
                        <img src="" alt="Vista previa de la imagen" class="img-fluid mt-2 d-none" style="max-height: 200px;">
                    </div>
                </div>
            `;
            container.appendChild(newImage);
            updateNumbers();
        });

        container.addEventListener('change', handleImagePreview);
    }
    if (descripcionDolorImagenesContainer && addDescripcionDolorImagenBtn) {
        setupImageUploader(descripcionDolorImagenesContainer, addDescripcionDolorImagenBtn, 'descripcion-dolor-imagen-card', 'Imagen');
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

            // Remove all but the first image entry
            const allImages = imagenesContainer.querySelectorAll('.imagen-card');
            for (let i = allImages.length - 1; i > 0; i--) {
                allImages[i].remove();
            }
            updateImageNumbers();
        });
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

        // Handle Inspeccion image display
        const inspeccionImg = document.querySelector('#inspeccion_archivo + img');
        if (data.exploracionGeneral['inspeccion_imagen'] && data.exploracionGeneral['inspeccion_imagen'].startsWith('data:image')) {
            inspeccionImg.src = data.exploracionGeneral['inspeccion_imagen'];
            inspeccionImg.classList.remove('d-none');
        }

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

        // Recreate images for "Imagenología"
        const imagenes = data.imagenologia ? data.imagenologia.imagenes || [] : [];
        const allImageCards = imagenesContainer.querySelectorAll('.imagen-card');
        allImageCards.forEach(card => card.remove());
        if (imagenes.length > 0) {
            imagenes.forEach((imagenData) => {
                addImagenBtn.click();
                const newCard = imagenesContainer.querySelector('.imagen-card:last-child');
                if (newCard) {
                    newCard.querySelector('textarea[name="imagen_descripcion[]"]').value = imagenData.descripcion;
                    const img = newCard.querySelector('img');
                    if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                        img.src = imagenData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }
        updateImageNumbers();

        // Recreate images for "Descripción del dolor"
        const descripcionDolorImagenes = data.exploracionGeneral.descripcionDolorImagenes || [];
        const allDescripcionDolorImageCards = descripcionDolorImagenesContainer.querySelectorAll('.descripcion-dolor-imagen-card');
        allDescripcionDolorImageCards.forEach(card => card.remove());
        if (descripcionDolorImagenes.length > 0) {
            descripcionDolorImagenes.forEach((imagenData) => {
                addDescripcionDolorImagenBtn.click();
                const newCard = descripcionDolorImagenesContainer.querySelector('.descripcion-dolor-imagen-card:last-child');
                if (newCard) {
                    const img = newCard.querySelector('img');
                    if (imagenData.imagen && imagenData.imagen.startsWith('data:image')) {
                        img.src = imagenData.imagen;
                        img.classList.remove('d-none');
                    }
                }
            });
        }
    }

    function exportToJson() {
        const data = {
            datosPersonales: {},
            anamnesisRemota: {},
            exploracionGeneral: {},
            exploracionAnalitica: {},
            exploracionVestibular: {},
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
                case 'exploracion-vestibular':
                    data.exploracionVestibular[id] = el.type === 'checkbox' ? el.checked : el.value;
                    break;
                case 'tratamiento':
                    if (id === 'objetivo_general') data.tratamiento.objetivoGeneral = el.value;
                    if (id === 'objetivos_especificos') data.tratamiento.objetivosEspecificos = el.value;
                    break;
            }
        });

        // Handle EVA separately
        data.exploracionGeneral['dolor-seleccionado'] = document.getElementById('dolor-seleccionado').textContent;

        // Handle Inspeccion image
        const inspeccionImg = document.querySelector('#inspeccion_archivo + img');
        if (inspeccionImg && inspeccionImg.src.startsWith('data:image')) {
            data.exploracionGeneral['inspeccion_imagen'] = inspeccionImg.src;
        } else {
            data.exploracionGeneral['inspeccion_imagen'] = '';
        }

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

        // Gather image data for "Imagenología"
        document.querySelectorAll('#imagenes-container .imagen-card').forEach(card => {
            const imagen = {
                descripcion: card.querySelector('textarea[name="imagen_descripcion[]"]').value,
                imagen: card.querySelector('img').src,
            };
            data.imagenologia.imagenes.push(imagen);
        });

        // Gather image data for "Descripción del dolor"
        data.exploracionGeneral.descripcionDolorImagenes = [];
        document.querySelectorAll('#descripcion-dolor-imagenes-container .descripcion-dolor-imagen-card').forEach(card => {
            const imagen = {
                imagen: card.querySelector('img').src,
            };
            data.exploracionGeneral.descripcionDolorImagenes.push(imagen);
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

    const controlMedicoSiRadio = document.getElementById('control_medico_si');
    const controlMedicoNoRadio = document.getElementById('control_medico_no');
    const controlMedicoDetalles = document.getElementById('control_medico_detalles');

    if (controlMedicoSiRadio && controlMedicoNoRadio && controlMedicoDetalles) {
        controlMedicoSiRadio.addEventListener('change', function() {
            if (this.checked) {
                controlMedicoDetalles.classList.remove('d-none');
            }
        });

        controlMedicoNoRadio.addEventListener('change', function() {
            if (this.checked) {
                controlMedicoDetalles.classList.add('d-none');
            }
        });
    }
});
