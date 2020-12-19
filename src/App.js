import logo from './logo.svg';
import './App.css';
import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  let citasIniciales=JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }


  //arreglo de citas
  const [citas,guardarCitas]=useState(citasIniciales);


  //Use Effect para realizar ciertas operaciones cuadno el State cambia
  useEffect(()=>{ //Esto se ejecuta cuando se inicializa el componente y cuando 
                  //el componente cambia o mejor dicho se actualiza y lo que sucede es que el componente se vuelve a recargar
    // console.log('Documento listo o algo paso con las citas');
  
    let citasIniciales=JSON.parse(localStorage.getItem('citas'));
  
    if(citasIniciales){
    
      localStorage.setItem('citas',JSON.stringify(citas));

    }else{

      localStorage.setItem('citas',JSON.stringify([]));
    
    }

  }, [citas] );


  //funcion que tome las citas actuales y agregue la nueva
  const crearCita =cita => {
    // console.log(cita);
    guardarCitas([
      ...citas,
      cita
    ]);
  }


  //funcion que elimina una cita por su id
  const eliminarCita= id =>{
    // console.log(id);
    const nuevasCitas=citas.filter(cita=> cita.id!==id);
    guardarCitas(nuevasCitas);

  }

  //Mensaje condicional
  // console.log(citas.length);
  const titulo= citas.length===0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      
      <div className="container">

        <div className="row">

          <div className="one-half column">
          
            <Formulario
              crearCita={crearCita}
            />
          
          </div>
          
          <div className="one-half column">

            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />

            ))}
          </div>
        
        </div>

      </div>
    
    </Fragment>
  );
}

export default App;
