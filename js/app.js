import {handlerCargar, handlerSeleccionar, chequearPrimeraVez } from "./handlers.js";
import {avoidFormSubmit, asignarManejadorDeEventos, asignarNonValid, vaciar, borrarBotones} from "./form.js";
import { buildTable} from "./tabla.js";

//Storage, cargo mi BBDD
window.addEventListener("load", () => {        
    let anuncios = chequearPrimeraVez();
    buildTable(anuncios);
});

//Seteo comportamiento botones
let formBtns = document.getElementsByClassName('formButton'); 
avoidFormSubmit(formBtns)

//Validacion de los campos del formulario. Cargo los inputs a un array y les asigno eventos y estilos
const formulario = document.forms[0];
const [ txtTitulo, txtVenta, txtAlquiler, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia ] = formulario;

const inputs = [];
inputs.push(txtTitulo, txtVenta, txtAlquiler, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia)

asignarManejadorDeEventos(inputs);
asignarNonValid(inputs);

//Cargo un nuevo registro a la tabla dinamica
let cargar = document.getElementById("btnCargar");
cargar.addEventListener("click", ()=>{
    handlerCargar(inputs, formBtns);
});

//cancelar
let cancelar = document.getElementById("btnCancelar");
cancelar.addEventListener("click", ()=>{
    vaciar(inputs);
    borrarBotones(formBtns);
})

// para traer los datos del elemento clickeado
const $divTabla = document.getElementById("divTabla");

$divTabla.addEventListener("click", (e) => {
    const emisor = e.target; 
    
    if (emisor.matches("tbody tr td")) {
        let id = emisor.parentElement.dataset.id;
        handlerSeleccionar(id, inputs, formBtns);
    }
});






