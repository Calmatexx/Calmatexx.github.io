document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundAudio');
    audio.muted = true;

    audio.addEventListener('error', () => {
        console.error('Error al cargar el archivo de audio: verifica la ruta "musica_fondo.mp3".');
    });

    audio.play().catch(() => {
        console.log('Reproducción automática bloqueada. Se requiere interacción del usuario.');
    });

    const interactiveElements = [
        document.getElementById('phoneMake'),
        document.getElementById('sensitivityType'),
        document.getElementById('includeDPI'),
        document.getElementById('includeSimple'),
        document.querySelector('button')
    ];

    interactiveElements.forEach(element => {
        if (element) {
            ['click', 'focus'].forEach(event => {
                element.addEventListener(event, () => {
                    if (audio.paused) {
                        audio.muted = false;
                        audio.play().catch(e => console.error('Error al reproducir audio tras interacción:', e));
                    }
                }, { once: true });
            });
        }
    });

    const bgImage = new Image();
    bgImage.src = '800px-Pikachu_SSBU.jpg';
    bgImage.onerror = () => {
        console.error('Error al cargar la imagen de fondo: verifica la ruta "800px-Pikachu_SSBU.jpg".');
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#0c121c'; /* Mantener el color de fondo oscuro */
    };

    const phoneMakeInput = document.getElementById('phoneMake');
    phoneMakeInput.addEventListener('input', function() {
        const isIPhone = this.value.toLowerCase().includes('iphone');
        document.getElementById('dpiOptionGroup').style.display = isIPhone ? 'none' : 'flex';
        document.getElementById('simpleOptionGroup').style.display = isIPhone ? 'flex' : 'none';
    });

    // Trigger initial check for iPhone to set correct visibility
    phoneMakeInput.dispatchEvent(new Event('input'));
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSensitivity() {
    const phoneMake = document.getElementById('phoneMake').value.trim();
    const sensitivityType = document.getElementById('sensitivityType').value;
    const includeDPI = document.getElementById('includeDPI').value;
    const includeSimple = document.getElementById('includeSimple').value;
    const resultsDiv = document.getElementById('sensitivityResults');
    resultsDiv.innerHTML = '';

    if (!phoneMake) {
        resultsDiv.innerHTML = `
            <p class="error">Por favor, ingresa una marca o modelo de celular válido.</p>
        `;
        return;
    }

    resultsDiv.innerHTML += `
        <p>Configuración para <strong>${phoneMake}</strong>:</p>
        <p>Tipo de Sensibilidad: <strong>${sensitivityType === 'aggressive' ? 'Agresiva' : sensitivityType === 'precise' ? 'Precisa' : 'Balanceada'}</strong></p>
    `;

    let generalSensitivity, redDotSensitivity, scope2xSensitivity, scope4xSensitivity, awmSensitivity, cameraSensitivity, fireButtonSensitivity, dpi;

    if (sensitivityType === 'aggressive') {
        generalSensitivity = getRandomNumber(150, 200);
        redDotSensitivity = getRandomNumber(110, 170);
        scope2xSensitivity = getRandomNumber(130, 180);
        scope4xSensitivity = getRandomNumber(130, 175);
        awmSensitivity = getRandomNumber(50, 70);
        cameraSensitivity = getRandomNumber(0, 50);
        fireButtonSensitivity = getRandomNumber(45, 60);
        dpi = getRandomNumber(700, 960);
    } else if (sensitivityType === 'precise') {
        generalSensitivity = getRandomNumber(115, 160);
        redDotSensitivity = getRandomNumber(95, 150);
        scope2xSensitivity = getRandomNumber(115, 165);
        scope4xSensitivity = getRandomNumber(100, 150);
        awmSensitivity = getRandomNumber(70, 120);
        cameraSensitivity = getRandomNumber(0, 50);
        fireButtonSensitivity = getRandomNumber(50, 68);
        dpi = getRandomNumber(400, 550);
    } else { // balanced
        generalSensitivity = getRandomNumber(150, 200);
        redDotSensitivity = getRandomNumber(130, 160);
        scope2xSensitivity = getRandomNumber(100, 140);
        scope4xSensitivity = getRandomNumber(105, 145);
        awmSensitivity = getRandomNumber(30, 80);
        cameraSensitivity = getRandomNumber(0, 50);
        fireButtonSensitivity = getRandomNumber(50, 68);
        dpi = getRandomNumber(360, 960);
    }

    const sensitivities = [
        { name: "General", value: generalSensitivity },
        { name: "Mira de Punto Rojo", value: redDotSensitivity },
        { name: "Mira x2", value: scope2xSensitivity },
        { name: "Mira x4", value: scope4xSensitivity },
        { name: "Mira de AWM", value: awmSensitivity },
        { name: "Cámara", value: cameraSensitivity },
        { name: "Botón de Disparo", value: fireButtonSensitivity }
    ];

    sensitivities.forEach(item => {
        resultsDiv.innerHTML += `
            <p>${item.name}: <strong>${item.value}</strong></p>
        `;
    });

    const isIPhone = phoneMake.toLowerCase().includes('iphone');
    if (isIPhone && includeSimple === 'yes') {
        resultsDiv.innerHTML += `
            <p>Sencillo (0-120): <strong>${getRandomNumber(0, 120)}</strong></p>
        `;
    } else if (!isIPhone && includeDPI === 'yes') {
        resultsDiv.innerHTML += `
            <p>DPI: <strong>${dpi}</strong></p>
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                *El DPI recomendado es una guía. Ajusta según tu comodidad.
            </p>
        `;
    }
}