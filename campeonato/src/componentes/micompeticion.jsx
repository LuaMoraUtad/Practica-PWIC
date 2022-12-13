import React from 'react'
import Table from 'react-bootstrap/Table';

export default function micompeticion({personas}) {
  /*Para cada elemento del array pasado como parámetro en {elementos}, 
  añadimos a la lista (ul) una nueva entrada (li) con una "key" única (elemento.id) 
  y el contenido (elemento.tarea)
  */
  return (
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Competidor1</th>
            <th>Competidor2</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
        {personas.map((aux)=> (
            <tr>
              <td>{aux.nombre1}</td>
              <td>{aux.nombre2}</td>
              <td>{aux.resultado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
   
  )
}
