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

    if (sesionesContainer) {
        sesionesContainer.addEventListener('change', function(e) {
            if (e.target.matches('input[type="file"][name="sesion_archivo[]"]')) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = e.target.nextElementSibling;
                        img.src = event.target.result;
                        img.classList.remove('d-none');
                    };
                    reader.readAsDataURL(file);
                }
            }
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
        });
    }

    const exportarPdfBtn = document.getElementById('exportar-pdf-btn');
    if (exportarPdfBtn) {
        exportarPdfBtn.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Title
            doc.setFontSize(20);
            doc.text("Ficha Clínica", 10, 10);

            // Datos Personales
            doc.setFontSize(16);
            doc.text("Datos Personales", 10, 20);
            doc.setFontSize(12);
            let y = 30;
            const datosPersonales = [
                { label: "Nombre", value: document.getElementById('nombre').value },
                { label: "RUT", value: document.getElementById('rut').value },
                { label: "Fecha de ingreso", value: document.getElementById('fecha_ingreso').value },
                { label: "Ocupación", value: document.getElementById('ocupacion').value },
                { label: "Fecha de nacimiento", value: document.getElementById('fecha_nacimiento').value },
                { label: "Edad", value: document.getElementById('edad').value },
                { label: "Teléfono", value: document.getElementById('telefono').value },
                { label: "Correo", value: document.getElementById('correo').value },
                { label: "Dirección", value: document.getElementById('direccion').value },
            ];
            datosPersonales.forEach(item => {
                doc.text(`${item.label}: ${item.value}`, 10, y);
                y += 10;
            });

            // Anamnesis Remota
            doc.addPage();
            doc.setFontSize(16);
            doc.text("Anamnesis Remota", 10, 20);
            y = 30;
            const anamnesisRemota = [
                { label: "Comorbilidades", value: document.getElementById('comorbilidades').value },
                { label: "Hábitos", value: document.getElementById('habitos').value },
                { label: "Medicamentos de uso actual", value: document.getElementById('medicamentos').value },
                { label: "Cirugías", value: document.getElementById('cirugias').value },
                { label: "Antecedentes familiares", value: document.getElementById('antecedentes_familiares').value },
            ];
            anamnesisRemota.forEach(item => {
                doc.text(item.label, 10, y);
                const text = doc.splitTextToSize(item.value, 180);
                doc.text(text, 10, y + 5);
                y += (text.length * 5) + 10;
            });

            // Anamnesis Próxima
            doc.addPage();
            doc.setFontSize(16);
            doc.text("Anamnesis Próxima", 10, 20);
            y = 30;
            const anamnesisProxima = [
                { label: "Motivo de consulta", value: document.getElementById('motivo_consulta').value },
                { label: "Fecha de inicio de síntomas", value: document.getElementById('fecha_inicio_sintomas').value },
                { label: "Diagnóstico médico", value: document.getElementById('diagnostico_medico').value },
                { label: "Historia de motivo de consulta", value: document.getElementById('historia_motivo_consulta').value },
                { label: "EVA", value: document.getElementById('dolor-seleccionado').textContent },
                { label: "PA", value: document.getElementById('pa').value },
                { label: "FC", value: document.getElementById('fc').value },
                { label: "SaO2", value: document.getElementById('sao2').value },
                { label: "D", value: document.getElementById('d').value },
                { label: "Palpación", value: document.getElementById('palpacion').value },
                { label: "ROM", value: document.getElementById('rom').value },
                { label: "Evaluación funcional", value: document.getElementById('evaluacion_funcional').value },
                { label: "Evaluación neurológica", value: document.getElementById('evaluacion_neurologica').value },
                { label: "Pruebas ortopédicas", value: document.getElementById('pruebas_ortopedicas').value },
            ];
            anamnesisProxima.forEach(item => {
                doc.text(item.label, 10, y);
                const text = doc.splitTextToSize(item.value, 180);
                doc.text(text, 10, y + 5);
                y += (text.length * 5) + 10;
            });

            // Tratamiento
            doc.addPage();
            doc.setFontSize(16);
            doc.text("Tratamiento", 10, 20);
            y = 30;
            doc.text("Objetivo general:", 10, y);
            const objetivoGeneral = doc.splitTextToSize(document.getElementById('objetivo_general').value, 180);
            doc.text(objetivoGeneral, 10, y + 5);
            y += (objetivoGeneral.length * 5) + 10;
            doc.text("Objetivos específicos:", 10, y);
            const objetivosEspecificos = doc.splitTextToSize(document.getElementById('objetivos_especificos').value, 180);
            doc.text(objetivosEspecificos, 10, y + 5);
            y += (objetivosEspecificos.length * 5) + 10;

            const sesiones = [];
            document.querySelectorAll('.sesion-card').forEach((card, index) => {
                const fecha = card.querySelector('input[name="sesion_fecha[]"]').value;
                const evolucion = card.querySelector('textarea[name="sesion_evolucion[]"]').value;
                const tratamiento = card.querySelector('textarea[name="sesion_tratamiento[]"]').value;
                sesiones.push([index + 1, fecha, evolucion, tratamiento]);

                const img = card.querySelector('img');
                if (img && img.src) {
                    try {
                        doc.addImage(img.src, 'JPEG', 10, y, 180, 100);
                        y += 110;
                    } catch (e) {
                        console.error(e);
                    }
                }
            });

            doc.autoTable({
                head: [['Sesión', 'Fecha', 'Evolución', 'Tratamiento']],
                body: sesiones,
                startY: y,
            });

            doc.save('ficha-clinica.pdf');
        });
    }

    const exportarExcelBtn = document.getElementById('exportar-excel-btn');
    if (exportarExcelBtn) {
        exportarExcelBtn.addEventListener('click', function() {
            const data = [];

            // Datos Personales
            const datosPersonales = {
                "Sheet 1": [
                    { "Nombre": document.getElementById('nombre').value },
                    { "RUT": document.getElementById('rut').value },
                    { "Fecha de ingreso": document.getElementById('fecha_ingreso').value },
                    { "Ocupación": document.getElementById('ocupacion').value },
                    { "Fecha de nacimiento": document.getElementById('fecha_nacimiento').value },
                    { "Edad": document.getElementById('edad').value },
                    { "Teléfono": document.getElementById('telefono').value },
                    { "Correo": document.getElementById('correo').value },
                    { "Dirección": document.getElementById('direccion').value },
                ]
            };
            data.push(datosPersonales);

            // Anamnesis Remota
            const anamnesisRemota = {
                "Sheet 2": [
                    { "Comorbilidades": document.getElementById('comorbilidades').value },
                    { "Hábitos": document.getElementById('habitos').value },
                    { "Medicamentos de uso actual": document.getElementById('medicamentos').value },
                    { "Cirugías": document.getElementById('cirugias').value },
                    { "Antecedentes familiares": document.getElementById('antecedentes_familiares').value },
                ]
            };
            data.push(anamnesisRemota);

            // Anamnesis Próxima
            const anamnesisProxima = {
                "Sheet 3": [
                    { "Motivo de consulta": document.getElementById('motivo_consulta').value },
                    { "Fecha de inicio de síntomas": document.getElementById('fecha_inicio_sintomas').value },
                    { "Diagnóstico médico": document.getElementById('diagnostico_medico').value },
                    { "Historia de motivo de consulta": document.getElementById('historia_motivo_consulta').value },
                    { "EVA": document.getElementById('dolor-seleccionado').textContent },
                    { "PA": document.getElementById('pa').value },
                    { "FC": document.getElementById('fc').value },
                    { "SaO2": document.getElementById('sao2').value },
                    { "D": document.getElementById('d').value },
                    { "Palpación": document.getElementById('palpacion').value },
                    { "ROM": document.getElementById('rom').value },
                    { "Evaluación funcional": document.getElementById('evaluacion_funcional').value },
                    { "Evaluación neurológica": document.getElementById('evaluacion_neurologica').value },
                    { "Pruebas ortopédicas": document.getElementById('pruebas_ortopedicas').value },
                ]
            };
            data.push(anamnesisProxima);

            // Tratamiento
            const tratamiento = {
                "Sheet 4": [
                    { "Objetivo general": document.getElementById('objetivo_general').value },
                    { "Objetivos específicos": document.getElementById('objetivos_especificos').value },
                ]
            };
            document.querySelectorAll('.sesion-card').forEach((card, index) => {
                const sesion = {};
                sesion[`Sesión ${index + 1} - Fecha`] = card.querySelector('input[name="sesion_fecha[]"]').value;
                sesion[`Sesión ${index + 1} - Evolución`] = card.querySelector('textarea[name="sesion_evolucion[]"]').value;
                sesion[`Sesión ${index + 1} - Tratamiento`] = card.querySelector('textarea[name="sesion_tratamiento[]"]').value;
                tratamiento["Sheet 4"].push(sesion);
            });
            data.push(tratamiento);

            $().excelExport(data, 'ficha-clinica.xls');
        });
    }
});
