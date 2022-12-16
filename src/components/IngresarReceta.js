import React, { Component } from 'react'
import axios from 'axios'
import { createItemReceta, createReceta } from '../converters/RecetaConverter'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import Main2 from './Main2'

class IngresarReceta extends Component {
  state = {
    form: {
      id: '',
      value: '',
      code: '',
    },
    forms: [
      { id: 1 }
    ],
    error: false,
    errorMsg: '',
    measures: [],
    products: [],
    recipe: [{ id: 1, productId: 0, quantity: 0, measureCode: 0 }]
  }

  manejadorChange = (id, e) => {
    const recipe = { [e.target.name]: e.target.value }
    this.state.recipe.forEach((recip, i) => {
      if(recip.id == id) this.state.recipe[i] = { ...recip, ...recipe }
    })
    this.setState({ recipe: this.state.recipe })
  }


  manejadorSubmit = (e) => {
    e.preventDefault()
  }

  post = () => {
    let id = this.props.match.params.id;
    let url = ("https://siglo-xxi-products.azurewebsites.net/Products/v1/menu/" + id + "/recipes")
    const receta = this.state.recipe.map(item => createItemReceta(item))
    const body = createReceta(receta)
    axios
      .post(url, body)
      .then((response) => {
        swal('Receta ingresada', 'Receta ingresada con éxito.', 'success')
        this.props.history.push('/recetas')
      })
      .catch((error) => console.log(error.response.data))
  }

  componentDidMount() {
    axios
      .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/measures")
      .then((response) =>
        this.setState({
          form: { code: response.data.measures[0].code },
          measures: response.data.measures
        })
      )

    axios
      .get("https://siglo-xxi-products.azurewebsites.net/Products/v1/products")
      .then((response) => this.setState({
        form: { id: response.data.products[0].id },
        products: response.data.products
      })
      )
  }

  numeros(e) {
    const re = /[0123456789]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  addForm() {
    const id = this.state.forms[this.state.forms.length - 1].id
    this.state.forms.push( { id: id + 1 } )
    this.state.recipe.push({ id: id + 1, productId: 0, quantity: 0, measureCode: 0 })
    this.setState({ forms: this.state.forms })
    this.setState({ recipe: this.state.recipe })
  }

  deleteForm(id) {
    const forms = this.state.forms.filter(form => form.id != id)
    const recipe = this.state.recipe.filter(recip => recip.id != id)
    this.setState({ forms })
    this.setState({ recipe })
  }

  render() {
    return (
      <React.Fragment>
        <Main2></Main2>
        <br />
        <div className='container'>
          <a id='volver' className='btn btn-dark' href='/recetas'>
            {' '}
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver
          </a>
          <hr></hr>
          <h3 id="inreceta">
            <strong >Agregar receta</strong>
          </h3>
        </div>
        <br />

        <div className='container'>
          {this.state.forms.map(form => {
            return <form id={form.id} className='form-horizontal' onSubmit={this.manejadorSubmit}>
              {/* empieza el contenedor */}
              <div className="contenedor1">
                <div>
                  <label>Producto  </label>
                  <select
                    className="form-select"
                    aria-label="default select example"
                    name="productId"
                    onChange={(e) => this.manejadorChange(form.id, e)}
                  >
                    <option selected>Seleccionar producto</option>
                    {this.state.products.map((products) => {
                      return <option key={products.id} value={products.id}>{products.name}</option>
                    })}
                  </select>
                </div>

                <div>
                  <label style={{ marginLeft: "10px" }}  >Medida </label>
                  <select
                    style={{ marginLeft: "10px" }}
                    className="form-select"
                    aria-label="default select example"
                    name="measureCode"
                    onChange={(e) => this.manejadorChange(form.id, e)}
                  >
                    <option selected>Seleccionar medida</option>
                    {this.state.measures.map((measures) => {
                      return <option key={measures.code} value={measures.code}>{measures.name}</option>
                    })}
                  </select>
                </div>

                <div>
                  <label style={{ marginLeft: "20px" }} >Cantidad </label>
                  <input
                    style={{ marginLeft: "20px" }}

                    className='form-control'
                    name='quantity'
                    placeholder='Cantidad'
                    type='text'
                    onChange={(e) => this.manejadorChange(form.id, e)}
                    onKeyPress={(e) => this.numeros(e)}
                    maxLength={3}
                  />
                </div>
                <div>
                  <button
                    style={{ marginTop: "35px" }}
                    type='button'
                    className='btn btn-danger'
                    onClick={() => this.deleteForm(form.id)}
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                  
                  <button
                    style={{ marginTop: "35px" }}
                    type='button'
                    className='btn btn-success'
                    onClick={() => this.addForm()}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
              </div>
              <br />
            </form>
          })}


          <br></br>
          <button
            type='submit'
            className='btn btn-primary'
            style={{ marginRight: '10px' }}
            onClick={() => this.post()}>
            Agregar receta
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default IngresarReceta;