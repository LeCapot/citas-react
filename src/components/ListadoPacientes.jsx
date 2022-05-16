import Paciente from "./Paciente";


const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {
  


  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll"> 
        
        {pacientes && pacientes.length ? (
          <> 
           <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
            <p className="text-xl mt-5 text-center">
              Adminitra tus {' '} 
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span> 
            </p>
            
            { pacientes.map( (paciente) =>( 
              <Paciente 
                key={paciente.id} // esto se remplaza por el id de base
                paciente = {paciente}
                setPaciente = {setPaciente} // variable para editar viene de app
                eliminarPaciente = {eliminarPaciente}
              
              />
            ))}
          </>            
        ) : (
          <>
            <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
            <p className="text-xl mt-5 text-center">
              Comienza agregando pacientes {' '} 
              <span className="text-indigo-600 font-bold">para que aparescan qui</span> 
            </p>
          </>  
        )
        }
        

        
        
    </div>
  )
}


export default ListadoPacientes;