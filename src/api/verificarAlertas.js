import axios from 'axios'

export async function verificarAlerta() {
  try {
    const url = 'https://siglo-xxi-alerts.azurewebsites.net/Alerts/v1/products'
    const headers = { 'Content-Type': 'application/json' }
    await axios.get(url, { headers })
  } catch (error) {
    console.log(error)
  }
}
