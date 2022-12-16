import React, { Component } from "react";
import HeaderRecetas from "../template/HeaderRecetas";
import { ApiMenus } from "../services/apirest";
import axios from 'axios';
import "../assets/css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Main2 from './Main2';
import { eliminarProductoReceta } from '../api/eliminarProductoReceta'
import swal from 'sweetalert'

class VerReceta extends Component {

  state = {
    menu: []
  };

  componentDidMount() {
    let idMenu = this.props.match.params.id;
    let url = ApiMenus + idMenu

    axios.get(url)
      .then(response => {
        this.setState({
          menu: response.data.menu.recipe
        })
      })
  }

  async eliminarProducto(id) {
    try {
      swal({
        title: '¿Estás seguro?',
        text: 'Eliminarás de la receta el producto seleccionado.',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: false,
            visible: true,
            closeModal: true,
          },
          confirm: {
            text: 'Eliminar',
            value: true,
            visible: true,
            closeModal: true,
          }
        }
      }).then(async (result) => {
        if (result) {
          await this.callApiEliminarProductoReceta(id)
          const recetas = this.state.menu.filter(receta => receta.id != id)
          this.setState({ menu: recetas })
          swal(
            'Producto eliminado',
            'El producto ha sido eliminado de la receta',
            'success'
          )
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  async callApiEliminarProductoReceta(id) {
    try {
      const response = await eliminarProductoReceta(id)
      return response.message
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Main2></Main2>
        <HeaderRecetas></HeaderRecetas>
        <div className="container">
          <br></br>

          <table id="customers">
            <thead >
              <tr>
                <th scope="col">Nombre&nbsp;del&nbsp;producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Medida</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.menu.map((value, index) => {
                return (
                  <tr key={index}   >
                    <td>{value.product.name}</td>
                    <td>{value.quantity.value}</td>
                    <td>{value.quantity.measure.name}</td>
                    <td><button class="btn btn-danger" onClick={() => this.eliminarProducto(value.id)}><FontAwesomeIcon icon={faTrash} /> Eliminar</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br />
          <div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VerReceta;