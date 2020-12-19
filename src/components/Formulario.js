import React, {Fragment, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) =>{




    //Crear State de Citas
    const [cita, actualizarCita]=useState({
        
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
        
    });


    const [error, actualizarError]=useState(false);

    //Extraer los valores con Destructuring
    const {mascota,propietario,fecha,hora,sintomas}=cita;

    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState= evento =>{
        // console.log('escribiendo...');
        
        // console.log(evento.target.name);

        // console.log(evento.target.value)

        actualizarCita({
            ...cita, //Se utiliza el spread Operator para hacer una copia de cita y no perder los otros atributos de nuestro objeto del formulario
            [evento.target.name] : evento.target.value
        })
    }





    //Cuando el usuario envia el formulario
    const submitCita = evento =>{
        
        evento.preventDefault();

        // console.log('enviando form');

        // console.log(mascota);

        // Validar
        if(mascota.trim() === '' || propietario.trim()==='' || fecha.trim()==='' || 
            hora.trim()==='' || sintomas.trim()===''){
            // console.log('Hay un error');
            actualizarError(true);
            return;
        }
        
        
        //Eliminar el mensaje previo de error
        actualizarError(false);

        
        //Asignar un ID UNICO CON LA LIBRERIA 
        cita.id=uuidv4();
        
        // console.log(cita);

        
        
        //Crear la cita
        crearCita(cita);
        
        
        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }

    return (
        
        <Fragment>

            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                    : null}

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                
                <input 
                
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
                />

                <label>Nombre Dueno</label>
                    
                <input 
                
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre del dueno de la Mascota"
                onChange={actualizarState}
                value={propietario}
                />

                <label>Fecha</label>
                
                <input 
                
                type="date"
                name="fecha"
                className="u-full-width"
                onChange={actualizarState}
                value={fecha}
                />

                <label>Hora</label>
                
                <input 
                
                type="time"
                name="hora"
                className="u-full-width"
                onChange={actualizarState}
                value={hora}
                />


                <label>Sintomas</label>
                
                <textarea 
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>


                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>

            </form>

        </Fragment>



    );


}


Formulario.propTypes={                  //YO DIRIA QUE ESTO ES OPCIONAL PARA LA MANTENIBILIDAD DEL PROYECTO
    crearCita: PropTypes.func.isRequired
}
export default Formulario;