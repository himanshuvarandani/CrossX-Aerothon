import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor'
import Modal from '../components/Modal'
import Terminal from '../components/Terminal'
import { AuthContext } from '../context'

const Home = () => {
  const [tab, setTab] = useState("terminal")
  const [ideas, setIdeas] = useState({})
  const [property, setProperty] = useState("language")
  const [module, setModule] = useState("")
  const [tag, setTag] = useState("")
  const [files, setFiles] = useState({})
  const [file, setFile] = useState("frontendhtmlcode")
  const [showModal, setShowModal] = useState(true)
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!Object.keys(context.auth).length) navigate('signin')

    if (showModal) return

    let endpoint
    if (context.techStack == "nodejs")
      endpoint = new URL("/choose/0", process.env.REACT_APP_SERVER_API).href
    else
      endpoint = new URL("/choose/1", process.env.REACT_APP_SERVER_API).href
    
    axios
      .get(endpoint)
      .then(({ data }) => {
        setIdeas(data.response)

        setProperty("language")
        const mod = Object.keys(data.response.language)[0]
        setModule(mod)
        setTag(Object.keys(data.response.language[mod])[0])

        context.setAPI(data.api)
        const endpoint1 = new URL("/backend_request", data.api).href
        axios
          .get(endpoint1)
          .then(({ data }) => {
            setFiles(data)
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }, [showModal, context.techStack])
  
  const saveCode = () => {
    const endpoint = new URL("/backend_request", context.api)
    axios
      .post(endpoint, files)
      .then(() => alert("Files saved to server!"))
      .catch((error) => {
        alert("Error while saving files.")
      })
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      minWidth: '100%',
      backgroundColor: 'gray',
    }}>
      <div style={{
        width: '10%',
        height: 'full',
        backgroundColor: '#0d111733',
        padding: '10px'
      }}>
        <h3>Folder Structure</h3>
        <div style={{
          padding: '4px 10px'
        }}>
          {/* <div style={{
            display:'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              margin: '2px 0px'
            }}>Folder 1</p>
            <div style={{
              padding: '4px 10px'
            }}>
              <p style={{
                margin: '2px 0px'
              }}>File3.js</p>
              <p style={{
                margin: '2px 0px'
              }}>File4.js</p>
            </div>
          </div>
          <div style={{
            display:'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              margin: '2px 0px'
            }}>Folder 2</p>
            <div style={{
              padding: '4px 10px'
            }}>
              <p style={{
                margin: '2px 0px'
              }}>File5.js</p>
              <p style={{
                margin: '2px 0px'
              }}>File6.js</p>
            </div>
          </div> */}
          <p
            style={{
              margin: '2px 0px',
              cursor: 'pointer'
            }}
            onClick={() => setFile("frontendhtmlcode")}
          >
            frontend.html
          </p>
          <p
            style={{
              margin: '2px 0px',
              cursor: 'pointer'
            }}
            onClick={() => setFile("frontendcsscode")}
          >
            frontend.css
          </p>
          <p
            style={{
              margin: '2px 0px',
              cursor: 'pointer'
            }}
            onClick={() => setFile("frontendjscode")}
          >
            frontend.js
          </p>
          <p
            style={{
              margin: '2px 0px',
              cursor: 'pointer'
            }}
            onClick={() => setFile("backendcode")}
          >
            {context.techStack == 'nodejs' ? "backend.js" : "backend.py"}
          </p>
        </div>
      </div>
      <div style={{
        width: '60%',
        height: 'full',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 15px'
        }}>
          <p style={{
            margin: '2px',
            color: "white",
          }}>
            {file == "frontendhtmlcode"
              ? "frontend.html"
              : file == "frontendcsscode"
                ? "frontend.css"
                : file == "frontendjscode"
                  ? "frontend.js"
                  : context.techStack == 'nodejs' 
                    ? "backend.js"
                    : "backend.py"
            }
          </p>
          <button
            style={{
              backgroundColor: 'lightgreen',
              borderRadius: '10px',
              fontSize: '16px',
              padding: '4px 10px',
              cursor: 'pointer'
            }}
            onClick={saveCode}
          >
            Save
          </button>
        </div>
        <CodeEditor files={files} setFiles={setFiles} file={file} />
        <div style={{
          alignItems: 'center',
          padding: '8px 15px'
        }}>
          <h2 style={{
            margin: '2px',
            color: "white",
          }}>
            Preview
          </h2>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            width: '100%',
            minHeight: '80px',
            marginTop: '20px 10px'
          }}>
            <div
              dangerouslySetInnerHTML={files['frontendhtmlcode']}
            />
          </div>
        </div>
      </div>
      <div style={{
        width: '30%',
        height: 'full',
        padding: '0px 10px'
      }}>
        <div style={{
          display: 'flex',
          padding: '8px',
          color: "white",
        }}>
          <p
            style={{
              borderBottom: tab == "terminal" ? '4px solid black': '',
              padding: '2px 4px',
              margin: "2px",
              cursor: 'pointer'
            }}
            onClick={() => setTab("terminal")}
          >
            Terminal
          </p>
          <p
            style={{
              borderBottom: tab == "idea" ? '4px solid black': '',
              padding: '2px 4px',
              margin: "2px",
              cursor: 'pointer'
            }}
            onClick={() => setTab("idea")}
          >
            Idea Box
          </p>
        </div>
        <div style={{
          marginTop: '4px'
        }}>
          {tab == "terminal" ? (
            <div style={{
              overflowX: 'auto'
            }}>
              <Terminal />
            </div>
          ) : (
            <div style={{
              padding: '10px',
              border: '2px solid black',
              color: "white",
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '2px',
              }}>
                <div style={{
                  display: 'flex',
                  padding: '2px',
                }}>
                  <p
                    style={{
                      borderBottom: property == "language" ? '4px solid black': '',
                      padding: '2px 4px',
                      margin: "2px",
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setProperty("language")
                      const mod = Object.keys(ideas.language)[0]
                      setModule(mod)
                      setTag(Object.keys(ideas.language[mod])[0])
                    }}
                  >
                    Language
                  </p>
                  <p
                    style={{
                      borderBottom: property == "feature" ? '4px solid black': '',
                      padding: '2px 4px',
                      margin: "2px",
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setProperty("features")
                      const mod = Object.keys(ideas.features)[0]
                      setModule(mod)
                      setTag(Object.keys(ideas.features[mod])[0])
                    }}
                  >
                    Features
                  </p>
                </div>
                <button
                  style={{
                    backgroundColor: 'lightgreen',
                    borderRadius: '10px',
                    fontSize: '16px',
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(ideas[property][module][tag])
                    alert("Copied to clipboard")
                  }}
                >
                  Copy
                </button>
              </div>
              <div style={{
                padding: '10px',
              }}>
                <div style={{
                  display: 'flex',
                  padding: '2px',
                }}>
                  {Object.keys(ideas[property]).map((mod, index) => (
                    <p
                      style={{
                        borderBottom: module == mod ? '4px solid black': '',
                        padding: '2px 4px',
                        margin: "2px",
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setModule(mod)
                        setTag(Object.keys(ideas[property][mod])[0])
                      }}
                      key={index}
                    >
                      {mod}
                    </p>
                  ))}
                </div>
                <div style={{
                  padding: '5px',
                }}>
                  <div style={{
                    display: 'flex',
                    padding: '2px',
                    flexWrap: 'wrap'
                  }}>
                    {Object.keys(ideas[property][module]).map((temp, index) => (
                      <p
                        style={{
                          borderBottom: tag == temp ? '4px solid black': '',
                          padding: '4px 2px',
                          margin: "2px",
                          cursor: 'pointer'
                        }}
                        onClick={() => setTag(temp)}
                        key={index}
                      >
                        {temp}
                      </p>
                    ))}
                  </div>
                  <div style={{
                    padding: '10px',
                    height: "15rem",
                    overflowY: 'auto',
                  }}>
                    {ideas[property][module][tag]}
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: '2px',
              }}>
                <button
                  style={{
                    backgroundColor: 'lightgreen',
                    borderRadius: '10px',
                    fontSize: '20px',
                    padding: '4px 15px',
                    cursor: 'pointer'
                  }}
                >
                  Download Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Home
