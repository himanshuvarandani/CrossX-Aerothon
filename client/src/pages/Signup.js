import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context"

const SignUp = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext(AuthContext)
  const navigate = useNavigate()

  const signup = () => {
    const endpoint = new URL("/login/sign", process.env.REACT_APP_SERVER_API).href
    axios
      .post(endpoint, {
        signin: 0,
        userid: userId,
        pswd: password,
      })
      .then(() => {
        context.setAuth({
          userId: userId
        })
        navigate("/")
      })
      .catch((error) => console.log(error))
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '90vh',
      minWidth: '100%',
      backgroundColor: 'gray',
    }}>
      <h2 style={{
        textAlign: 'center'
      }}>
        Sign Up
      </h2>
      <div style={{
        border: '2px solid black',
        borderRadius: '10px',
        padding: '40px',
        fontSize: '25px',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <label>User Id</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              marginLeft: '25px',
              border: '0px',
              borderRadius: '10px',
              padding: '10px 20px',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginLeft: '25px',
              border: '0px',
              borderRadius: '10px',
              padding: '10px 20px',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px'
        }}>
          <button
            style={{
              backgroundColor: 'lightgreen',
              borderRadius: '10px',
              fontSize: '20px',
              padding: '4px 15px',
              cursor: 'pointer'
            }}
            onClick={signup}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div style={{
        padding: '40px 20px',
        color: 'white',
        textAlign: 'center'
      }}>
        <p>
          Already have an account, login{' '}
          <Link to='/signin'>
            here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
