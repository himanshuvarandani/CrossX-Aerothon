import { TerminalUI } from "./TerminalUI"
import io from "socket.io-client"
import { useEffect } from "react"

const serverAddress = process.env.REACT_APP_SERVER_API

//Server sandbox available at https://codesandbox.io/s/web-terminal-tutorial-server-g2ihu

function connectToSocket(serverAddress) {
  return new Promise(res => {
    const socket = io(serverAddress)
    res(socket)
  })
}

export default function Terminal() {
  useEffect(() => {
    const container = document.getElementById("terminal-container")
    
    // Connect to socket and when it is available, start terminal.
    connectToSocket(serverAddress).then(socket => {
      const terminal = new TerminalUI(socket)
      terminal.attachTo(container)
      terminal.startListening()
    })
  }, [])

  return (
    <div>
      <div id="terminal-container"></div>
    </div>
  )
}