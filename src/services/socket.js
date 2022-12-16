import io from 'socket.io-client'

const socketAlert = io('https://siglo-xxi-alerts.azurewebsites.net')

export default socketAlert