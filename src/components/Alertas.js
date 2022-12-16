import React from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert'

function Alertas({ cantidad, isNecessaryAlert }) {
  const history = useHistory()

  const desplegarAlerta = () => {
    swal({
      title: 'Alerta de stock',
      text: `Tiene ${cantidad} productos con bajo stock`,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          value: false,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: 'Ir a productos',
          value: true,
          visible: true,
          closeModal: true,
        }
      }
    }).then((result) => {
      if(result) history.push('/productos')
    })
  }

  if(isNecessaryAlert) {
    return ( 
      <FontAwesomeIcon id="alert" icon={faBell} className="fa-beat fa-bell" onClick={desplegarAlerta} style={{color: 'red', '--fa-beat-scale': 3.0 }} />
    )
  }
  return 

}

export default Alertas
