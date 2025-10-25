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

    const canvas = document.getElementById('body-canvas');
    const legendContainer = document.getElementById('color-legend');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let currentColor = '#c00000';

    const colors = [
        { color: '#c00000', label: 'Dolor agudo, sensación de puñalada' },
        { color: '#ffc000', label: 'Dolor difuso, difícil de localizar' },
        { color: '#0070c0', label: 'Sensación de calor o frío' },
        { color: '#00b050', label: 'Sensación de hormigueo o pinchazo de aguja' },
        { color: '#000000', label: 'Anestesia o disminución de sensibilidad' },
        { color: '#bf4e14', label: 'Sensación de rigidez, fatiga o cansancio' }
    ];

    colors.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item', 'd-flex', 'align-items-center', 'me-3', 'mb-2');
        legendItem.innerHTML = `<div class="color-box" style="background-color: ${item.color};"></div><span>${item.label}</span>`;
        legendItem.addEventListener('click', () => {
            currentColor = item.color;
            document.querySelectorAll('.color-box').forEach(box => box.classList.remove('selected'));
            legendItem.querySelector('.color-box').classList.add('selected');
        });
        legendContainer.appendChild(legendItem);
    });

    // Select the first color by default
    legendContainer.querySelector('.color-box').classList.add('selected');

    const bodyImage = new Image();
    bodyImage.src = 'cuerpo.png';
    bodyImage.onload = () => {
        canvas.width = bodyImage.width;
        canvas.height = bodyImage.height;
        ctx.drawImage(bodyImage, 0, 0);
    };

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) * (canvas.width / rect.width),
            y: (evt.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getMousePos(canvas, e);
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);
});
