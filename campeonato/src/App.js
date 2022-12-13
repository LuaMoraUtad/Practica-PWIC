//Hola
import logo from './logo.svg';
import './App.css';
import {v4} from 'uuid';
import axios from 'axios';
import React, { useRef, useState, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import Collapse from 'react-bootstrap/Collapse';
import Micompeticion from './componentes/micompeticion';


function App() {

  const [open, setOpen] = useState(false);
  const [showResults, setShowResults] = useState(false)
  const [listaPersonas, setListaPersonas] = useState([]);
  const [listaCompetion, setListaCompetion] = useState([]);
  const [intentos, setIntentos] = useState(1);

  const cargarDatos = () => {
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users'
    }).then(function(response){
      //console.log(response.data);

      const newPersonas = response.data.map(function(aux){
        return {id: aux.id, 
                nombre: aux.name, 
                email: aux.email, 
                calle: aux.address.street + ", " + aux.address.suite + ", " + aux.address.city + ", " +
                aux.address.zipcode + ", " + aux.address.geo.lat + ", " + aux.address.geo.lng, 
                phone: aux.phone,
                website: aux.website, 
                compañia: aux.company.name + ", " + aux.company.catchPhrase + ", " + aux.company.bs};
      });
  
      setListaPersonas(newPersonas);

      //console.log(listaPersonas);
    });
  };

  
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const cargarDatosCompetion = () => {
    var randomNumber1 = 0;
    var randomNumber2 = 0;

    var listaCompetionAux = [];

    for (let index = 0; index < 5; index++) {
      if(intentos <= listaPersonas.length/2){

        var encontrado;
        do{
          encontrado = false;          
          randomNumber1 = randomNumberInRange(0,listaPersonas.length-1);
          //setRandomNumber1(randomNumber1);
          listaCompetionAux.map(aux => {
            if(aux.nombre1 == listaPersonas[randomNumber1].nombre){
              encontrado = true;
            }
            if(aux.nombre2 == listaPersonas[randomNumber1].nombre){
              encontrado = true;
            }
          });
        }while(encontrado == true);
        
        do{
          encontrado = false;
          randomNumber2 = randomNumberInRange(0,listaPersonas.length-1);
          //setRandomNumber2(randomNumber2);      
          if(randomNumber2 == randomNumber1){
            encontrado = true;
          }
          listaCompetionAux.map(aux => {
            if(aux.nombre1 == listaPersonas[randomNumber2].nombre){
              encontrado = true;
            }
            if(aux.nombre2 == listaPersonas[randomNumber2].nombre){
              encontrado = true;
            }
            if(randomNumber1 == randomNumber2){
              encontrado = true;
            }
          });
        }while(encontrado == true);
        console.log(randomNumber1+"fin de primer do"+randomNumber2);
       
        
        const personaaleatoria = {
          nombre1: listaPersonas[randomNumber1].nombre,
          nombre2: listaPersonas[randomNumber2].nombre,
          resultado: "-"}

          listaCompetionAux.push(personaaleatoria);

          setListaCompetion((aux)=>{
            return [...aux, personaaleatoria];
          }); 

          console.log(listaCompetion);
          setIntentos(intentos+1);
      }
      
    }
      
  };

  const cargarResultado = () => {

     var random;

     listaCompetion.map(aux => {
      random = randomNumberInRange(1,2);
      if(random == 1){
        aux.resultado = aux.nombre1;
      }else{
        aux.resultado = aux.nombre2;
      }
      setListaCompetion((aux)=>{
        return [...aux];
      }); 
      setShowResults(true);
    });

    

  };



  return (
    
  <Fragment>
    <button onClick={cargarDatos}>Cargar Datos</button>
    <button onClick={cargarDatosCompetion}>Cargar Datos de la Competicion</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ver Detalle</th>
          </tr>
        </thead>
        <tbody>
          {listaPersonas.map((aux)=> (
            <tr>
              <td>{aux.id}</td>
              <td>{aux.nombre}</td>
              <td>
                <button type="button" 
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}>Ver Detalle</button>
                
                <Collapse in={open}>
                  <div id="example-collapse-text">
                    Email: {aux.email}, <br></br>
                    Direccion: {aux.calle}, <br></br>
                    Telefono: {aux.phone}, <br></br>
                    Pagina Web: {aux.website}, <br></br>
                    Compañia: {aux.compañia}<br></br>
                  </div>
                </Collapse>            
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <label>Tabla de Competiciones</label>
      <Micompeticion personas = {listaCompetion} />
    
      <button onClick={cargarResultado}>Mostrar Ganador</button>
      { showResults ? (
          <div class="carrusel_fondo">
              <Carousel>

              {listaCompetion.map((aux)=> (
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="carruselfondo.png"
                    alt="First slide"
                    />
                <Carousel.Caption>
                    <label class="carrusel_letra">{aux.resultado}</label>
                </Carousel.Caption>
                </Carousel.Item>

              ))}        
            </Carousel>
          </div>  ) : null}
  </Fragment>
      
    
  );
}
/*<tr>
<td>1</td>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr>
<tr>
<td>2</td>
<td>Jacob</td>
<td>Thornton</td>
<td>@fat</td>
</tr>
<tr>
<td>3</td>
<td colSpan={2}>Larry the Bird</td>
<td>@twitter</td>
</tr>*/
export default App;
