const valores = window.location.search;
//Creation d'instance
const urlParams = new URLSearchParams(valores);
//Accedes aux valeurs
let orderId = urlParams.get('orderId');



const usuarioInfo = JSON.parse(localStorage.getItem('dUser') || '{}')

console.log(usuarioInfo);
document.getElementById('commandId').textContent = orderId
document.getElementById('nomId').textContent = usuarioInfo.lastName
document.getElementById('prenomId').textContent = usuarioInfo.firstName
document.getElementById('adresseId').textContent = usuarioInfo.address
document.getElementById('prixId').textContent = usuarioInfo.price


localStorage.removeItem('dUser')

