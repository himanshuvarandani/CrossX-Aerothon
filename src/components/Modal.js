import { useContext } from "react"
import { AuthContext } from "../context"

const Modal = ({showModal, setShowModal}) => {
  const context = useContext(AuthContext)

  return (
    <div>
      {!showModal ? null : (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: '50px',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px'
          }}>
            <p>Select one tech stack for backend</p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  context.setTechStack("nodejs")
                  setShowModal(false)
                }}
              >
                Node JS
              </p>
              <p
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  context.setTechStack("django")
                  setShowModal(false)
                }}
              >
                Django
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
