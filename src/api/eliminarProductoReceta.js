import axios from 'axios'

export async function eliminarProductoReceta(id) {
  try {
    const url = `https://siglo-xxi-products.azurewebsites.net/Products/v1/recipes/${id}`
    const headers = { 'Content-Type': 'application/json' }
    const { data } = await axios.delete(url, { headers })
    return data
  } catch (error) {
    console.log(error)
  }
}
