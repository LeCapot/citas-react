import {useState, useEffect} from 'react';
import Error from './Error';
// Formulario 
// se desectructura el props en pacientes y setPacientes
const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  // Declareacion de Hooks
  const [ nombreMascota, setNombreMascota ] = useState('')
  const [ nombrePropietario, setNombrePropietario ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ fechaAlta, setfechaAlta ] = useState('')
  const [ sintomas, setSintomas ] = useState('')
  // Variable de alerta
  const [error, setError] = useState(false);
  
   useEffect( () => {
    if( Object.keys(paciente).length > 0 ) {
      setNombreMascota (paciente.nombreMascota) 
      setNombrePropietario(paciente.nombrePropietario)
      setEmail(paciente.email)
      setfechaAlta(paciente.fechaAlta)
      setSintomas(paciente.sintomas)

    }
   },[paciente]);
  

  //Funcion que crea id
  const generarId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    const id = fecha + random;
    return id
  };

  // Funcion que maneja la logica de submit del formularios
  const handleSubmit = (e) =>{
    e.preventDefault();  //No se que hace

    //Valida que tenga los campos llenos antes de enviar el formularios
    if ( [nombreMascota,nombrePropietario,email,fechaAlta,sintomas].includes('') ) {
      console.log('Hay al menos un campo vacio')
      setError(true); // setea error
      return;         //termina
    } 

    setError(false); // vuelve a setear false porsi ya esta en true
    
    // Crea objeto paciente
    const objetoPaciente = {
      nombreMascota,
      nombrePropietario,
      email,
      fechaAlta,
      sintomas
      
    }
    if (paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id; // Asigno el id de edicion al nuevo objeto

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === objetoPaciente.id 
                                                                            ? objetoPaciente : pacienteState );


      setPacientes(pacientesActualizados) ; 
      setPaciente({});
       
    } else {
      //nuevo registros
      //agrego id al objeto
      objetoPaciente.id = generarId();
      
      //pacientes
      //Setea props + el nuevo paciente  
      setPacientes([...pacientes,objetoPaciente]);


    }
    
    

    // Reinicia formulario
    setNombreMascota('');
    setNombrePropietario('');
    setEmail('');
    setfechaAlta('');
    setSintomas('');


  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center">
          Añade pacientes y {' '}
          <span className="text-indigo-600 font-bold"> Administralos</span>
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
          >
           
          { error && <Error mensaje='Todos los campos son obligatiorios' /> }  
          <div className="mb-5"> 
            <label 
                htmlFor="mascota"
                className="text-gray-700 uppercase font-bold block">
                  Nombre Mascota
            </label>
            <input 
                id="mascota"
                type="text" 
                placeholder="Nombre de las mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombreMascota}
                onChange= { ( (e) => setNombreMascota(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <label 
                htmlFor="propietario"
                className="text-gray-700 uppercase font-bold block">
                  Nombre Propietario
            </label>
            <input 
                id="propietario"
                type="text" 
                placeholder="Nombre del propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombrePropietario}
                onChange= { ( (e) => setNombrePropietario(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <label 
                htmlFor="email"
                className="text-gray-700 uppercase font-bold block">
                  Email
            </label>
            <input 
                id="email"
                type="email" 
                placeholder="Email Contacto Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange= { ( (e) => setEmail(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <label 
                htmlFor="alta"
                className="text-gray-700 uppercase font-bold block">
                  Fecha Alta
            </label>
            <input 
                id="alta"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fechaAlta}
                onChange= { ( (e) => setfechaAlta(e.target.value))}
            />
          </div>

          <div className="mb-5">
            <label 
                htmlFor="Sintomas"
                className="text-gray-700 uppercase font-bold block">
                  Sintomas
            </label>
            <textarea 
                id="Sintomas"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los Sintomas"
                value={sintomas}
                onChange= { ( (e) => setSintomas(e.target.value))}
                />
          </div>
          <input 
              type="submit" 
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
              value={paciente.id ? 'Editar Paciente' : 'Ingrezar Paciente'}
          />
        </form>
    </div>
  )
}

export default Formulario