import { refreshTable } from "./tabla.js";
import { vaciar, borrarBotones, modificarObjetoAnuncio } from "./form.js";
import { Anuncio_Auto } from "./anuncio.js";

const agregar = (inputs, transaccion)=>{
    let myNewObj = new Anuncio_Auto(Math.floor(Math.random() * 1001),
            inputs[0].value, //titulo
            transaccion,
            inputs[3].value, //descripcion
            inputs[4].value, //precio
            inputs[5].value, //puertas
            inputs[6].value, //kms
            inputs[7].value, //potencia
            )
    return myNewObj;
}

const borrar = (anuncios, index, inputs, formBtns) =>{
    anuncios.splice(index, 1);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns)
}

const modificar = (anuncios, inputs, selectedAnuncio, formBtns) =>
{
    modificarObjetoAnuncio(inputs, selectedAnuncio);
    refreshTable(anuncios);
    vaciar(inputs);
    borrarBotones(formBtns);
}

export {
    agregar,
    borrar,
    modificar
}