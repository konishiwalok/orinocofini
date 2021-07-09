const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const btnCart = document.getElementById('confirmPurchase')


const expresiones = {
	firstname: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	zipcode: /[0-9]{5}(-[0-9]{4})?/,
	city: /^[a-zA-ZÀ-ÿ0-9\_\s\,\-]{4,16}$/,
	adress: /^[a-zA-ZÀ-ÿ0-9\s\,\''\-]*$/,
}

const campos = {
	firstname: false,
	lastname: false,
	email: false,
	zipcode: false,
	city: false,
	adress:false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "firstname":
			validarCampo(expresiones.firstname, e.target, 'firstname');
		break;
		case "lastname":
			validarCampo(expresiones.lastname, e.target, 'lastname');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "zipcode":
			validarCampo(expresiones.zipcode, e.target, 'zipcode');
		break;
		case "city":
			validarCampo(expresiones.city, e.target, 'city');
		break;
		case "adress":
			validarCampo(expresiones.adress, e.target, 'adress');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	//input.addEventListener('blur', validarFormulario);
});

btnCart.addEventListener('click', e => {
  //console.log(e.target.id === 'confirmPurchase');

  console.log(e)
  console.log('entro1')
  sendInfo(e);
  console.log('entro2')
})

const sendInfo = e => {
  //console.log(e.target);
  //console.log(e.target.classList.contains('add-cart'));
  // console.log('====================================');
  //     console.log('inicio');
  //     console.log('====================================');

  if (e.target.classList.contains('confirmPurchase')) {
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const adress = document.getElementById('adress').value
    const zipcode = document.getElementById('zipcode').value
    const email = document.getElementById('email').value
    const city = document.getElementById('city').value

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

    if (!(
        firstname.length > 1
        && lastname.length > 1
        && emailRegex.test(email)
        && adress.length > 6
        && zipcodeRegex.test(zipcode)
        && city.length > 1
    )) {
    //     console.log('====================================');
    // console.log('fallo');
    // console.log('====================================');
        alert("Veuillez remplir les champs correctements avant de procéder au paiement")
    }
    // console.log('====================================');
    // console.log('ultimo');
    // console.log('====================================');

    const lsc = JSON.parse(localStorage.getItem('cart'))
    const products = Object.values(lsc).map((product) => {
      return product.id
    })

    const order = {
      contact: {
        firstName: firstname,
        lastName: lastname,
        address: adress + ' ' + zipcode,
        city: city,
        email: email,
      },
      products: products,
    }

    const url = 'http://localhost:3000/api/cameras/order';
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }

    const totalPrice = document.getElementById('total-price').innerHTML
    

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        

        const info = {
          firstName: json.contact.firstName,
          lastName: json.contact.lastName,
          address: json.contact.address,
          city: json.contact.city,
          price: totalPrice,
        }
        console.log(info)
        localStorage.removeItem('cart', JSON.stringify(cart))
        localStorage.setItem('dUser', JSON.stringify(info));
        window.location.href = `${window.location.origin}/frontend/confirmation.html?orderId=${json.orderId}`
      })
      .catch(() => {
        alert(error)
      })
  }
  e.stopPropagation();
}