import { validar, validarRadioButton } from "./validaciones.js";

function avoidFormSubmit(formBtns)
{
    for (let i = 0; i < formBtns.length; i++) 
    {
        formBtns[i].addEventListener('click', (e)=>{
            e.preventDefault();
        })   
    }
}

function asignarManejadorDeEventos(inputs)
{
    inputs.forEach(element => {
        if(element.name != "transaccion")
        {
            element.addEventListener("blur", validar)
        }
        else
        {
            element.addEventListener("click", validarRadioButton);
        }     
    });
}

function asignarNonValid(inputs)
{
    inputs.forEach(element => {
        element.classList.add("nonValid");
    })
}

function loadModifyEliminarBtns(text, id)
{
    let formBtns = document.getElementById('formDivBtn'); 
    if(formBtns.children.length <= 3)
    {
        let $btn = document.createElement("button");
        $btn.classList.add("formButton")
        $btn.textContent = text;
        $btn.setAttribute("id", id);
        formBtns.appendChild($btn);
        return $btn;
    }   
}

function loadClickedAnuncio(inputs, anuncio)
{
    inputs[0].value = anuncio.titulo;
    if(anuncio.transaccion == "venta")
    {
        inputs[1].checked = true;
        inputs[2].checked = false;
    }else{
        inputs[1].checked = false;
        inputs[2].checked = true;
    }
    inputs[3].value = anuncio.descripcion;
    inputs[4].value = anuncio.precio;
    inputs[5].value = anuncio.puertas;
    inputs[6].value = anuncio.kms;
    inputs[7].value = anuncio.potencia;

    inputs.forEach(element=>{
        if(element.matches(".nonValid"))
        {
            element.classList.remove("nonValid");
            element.classList.add("valid");
        }
    })
}

function vaciar(inputs)
{
    inputs.forEach(element=>{
        if(element.matches(".valid"))
        {
            element.classList.add("nonValid");
            element.classList.remove("valid");
        }

        if(element.name != "transaccion")
        {
            element.value = "";
            const $small = element.nextElementSibling.nextElementSibling;
            $small.textContent = "";
        }
        else
        {
            element.checked = false;
        }
    });
}

function borrarBotones(formBtns)
{
    let aux = formBtns;
    for(let i = 0; i < aux.length; i++)
    {
        if(aux[i].matches("#btnEliminar")){
            formBtns[i].remove();
            formBtns[i].remove();
        }
    }
}

function modificarObjetoAnuncio(inputs, selectedAnuncio)
{
    selectedAnuncio.titulo = inputs[0].value ;
    if(inputs[1].checked)
    {
        selectedAnuncio.transaccion == "venta";
    }else{
        selectedAnuncio.transaccion == "alquiler";
    }
    selectedAnuncio.descripcion = inputs[3].value;
    selectedAnuncio.precio = inputs[4].value;
    selectedAnuncio.puertas = inputs[5].value;
    selectedAnuncio.kms = inputs[6].value;
    selectedAnuncio.potencia = inputs[7].value;
}

export {
    avoidFormSubmit,
    asignarManejadorDeEventos,
    asignarNonValid,
    vaciar,
    loadModifyEliminarBtns,
    loadClickedAnuncio,
    borrarBotones,
    modificarObjetoAnuncio
}