import {getTransaccionType} from "./anuncio.js";
import {validarSubmit} from "./validaciones.js";
import {vaciar, borrarBotones, loadModifyEliminarBtns, avoidFormSubmit, loadClickedAnuncio} from "./form.js";
import {refreshTable} from "./tabla.js";
import {agregar, borrar, modificar} from "./crud.js";
import { anuncios } from "./database.js";

const handlerCargar = (inputs, formBtns)=>
{
    let transaccion = getTransaccionType();
    let anuncios = JSON.parse(localStorage.getItem("lista_anuncios"));
    
    if(Array.isArray(inputs))
    {
        if(validarSubmit(inputs))
        {
            let nuevoAnuncio = agregar(inputs, transaccion);
            anuncios.push(nuevoAnuncio);
	        borrarBotones(formBtns);
            refreshTable(anuncios);
            vaciar(inputs);
        }else{
            alert("Atencion! No todos los campos han sido llenados correctamente");
        }
    }
}

//si ya fue visitada, retorname lo que tengas en el storage, sino, carga por la lista por default
const chequearPrimeraVez =()=>{
    let lista = null;
    if(localStorage.getItem('si_fue_visitada')){
        lista = JSON.parse(localStorage.getItem('lista_anuncios'));
        return lista;
    }
    
    localStorage.setItem('si_fue_visitada', true);
    localStorage.setItem("lista_anuncios", JSON.stringify(anuncios));
    lista = JSON.parse(localStorage.getItem('lista_anuncios'));
    return lista; 
}

const handlerSeleccionar = (id, inputs, formBtns)=>{
    let anuncios = JSON.parse(localStorage.getItem("lista_anuncios"));

    let selectedAnuncio = anuncios.find((element) => element.id == id); 
    let index = anuncios.indexOf(selectedAnuncio);
    
    if(document.getElementById("btnEliminar") == null && document.getElementById("btnModificar") == null)
    {
        let $btnEliminar = loadModifyEliminarBtns("Eliminar", "btnEliminar");
        let $btnModificar = loadModifyEliminarBtns("Modificar", "btnModificar");
        $btnEliminar.addEventListener("click", ()=>
        {
            borrar(anuncios, selectedAnuncio, index, inputs, formBtns);
        });
        $btnModificar.addEventListener("click", ()=>
        {
            modificar(anuncios, inputs, selectedAnuncio, formBtns);
        });
    }
    
    avoidFormSubmit(formBtns)
    loadClickedAnuncio(inputs, selectedAnuncio);
}

export{
    handlerCargar,
    chequearPrimeraVez,
    handlerSeleccionar
}