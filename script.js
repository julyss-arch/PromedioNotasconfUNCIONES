document.addEventListener('DOMContentLoaded', () => {
  const inputsContainer = document.getElementById('inputsContainer');
  const addNotaBtn = document.getElementById('addNotaBtn');
  const calcularBtn = document.getElementById('calcularBtn');
  const resultadoDiv = document.getElementById('resultado');
  const resetBtn = document.getElementById('resetBtn');

  const MIN_NOTAS = 5;

  // 🔹 Función flecha para crear un input
  const crearInput = (index) => {
    const row = document.createElement('div');
    row.className = 'nota-row';
    row.innerHTML = `
      <label for="nota-${index}">Nota ${index + 1}</label>
      <input type="number" id="nota-${index}" name="nota-${index}" step="0.01" min="0" max="100" placeholder="0 - 100" />
      <button type="button" class="eliminar" title="Eliminar">✕</button>
    `;

    const btnEliminar = row.querySelector('.eliminar');
    btnEliminar.addEventListener('click', () => {
      const current = inputsContainer.querySelectorAll('.nota-row').length;
      if (current > MIN_NOTAS) {
        row.remove();
      } else {
        mostrarMensajeError(Se requieren al menos ${MIN_NOTAS} notas.);
      }
    });
    return row;
  };

  // 🔹 Función flecha para inicializar los inputs
  const inicializarInputs = () => {
    inputsContainer.innerHTML = '';
    for (let i = 0; i < MIN_NOTAS; i++) {
      inputsContainer.appendChild(crearInput(i));
    }
  };

  inicializarInputs();

  // 🔹 Función flecha para limpiar mensajes
  const limpiarMensajes = () => {
    resultadoDiv.innerHTML = '';
    resultadoDiv.classList.remove('error');
  };

  // 🔹 Función flecha para mostrar un mensaje de error
  const mostrarMensajeError = (msg) => {
    resultadoDiv.innerHTML = <span style="color:var(--danger)">${msg}</span>;
  };

  // 🔹 Función flecha para mostrar el resultado final
  const mostrarResultado = (promedio) => {
    const aprobado = promedio >= 60; // Puedes cambiar el valor si el corte es distinto
    resultadoDiv.innerHTML = `
      <div>
        Promedio: <span class="result-number">${promedio.toFixed(2)}</span>
        &nbsp; — &nbsp; <span style="color:${aprobado ? 'var(--success)' : 'var(--danger)'}">
        ${aprobado ? 'Aprobado' : 'Reprobado'}</span>
      </div>
    `;
  };

  // 🔹 Función flecha para calcular el promedio
  const calcularPromedio = () => {
    limpiarMensajes();
    const inputs = Array.from(inputsContainer.querySelectorAll('input[type="number"]'));
    if (inputs.length < MIN_NOTAS) {
      mostrarMensajeError(Ingresa al menos ${MIN_NOTAS} notas.);
      return;
    }

    const valores = [];
    for (const inp of inputs) {
      const raw = inp.value.trim();
      if (raw === '') {
        mostrarMensajeError('Todas las notas deben estar llenas.');
        return;
      }
      const n = Number(raw);
      if (!Number.isFinite(n)) {
        mostrarMensajeError('Ingresa solo números válidos.');
        return;
      }
      if (n < 0 || n > 100) {
        mostrarMensajeError('Las notas deben estar entre 0 y 100.');
        return;
      }
      valores.push(n);
    }

    const suma = valores.reduce((a, b) => a + b, 0);
    const promedio = suma / valores.length;
    mostrarResultado(promedio);
  };

  // 🔹 Eventos
  addNotaBtn.addEventListener('click', () => {
    const count = inputsContainer.querySelectorAll('.nota-row').length;
    inputsContainer.appendChild(crearInput(count));
  });

  calcularBtn.addEventListener('click', calcularPromedio);

  resetBtn.addEventListener('click', () => {
    setTimeout(() => {
      inicializarInputs();
      limpiarMensajes();
    }, 0);
  });
});