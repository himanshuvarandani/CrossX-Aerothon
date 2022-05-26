import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import CodeMirror from '@uiw/react-codemirror'
import { useEffect, useState } from 'react'

const CodeEditor = ({files, setFiles, file}) => {
  const [code, setCode] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (file) setCode(files[file])
    setLoading(false)
  }, [file, files])

  return (
    <div>
      {loading ? (
        <CodeMirror
          value=""
          height="500px"
          extensions={[html()]}
        />
      ) : (
        <CodeMirror
          value={code}
          height="500px"
          extensions={
            file == "frontendhtmlcode"
            ? [html()]
            : file == "frontendcsscode"
              ? [css()]
              : file == "frontendjscode"
                ? [javascript({ jsx: true })]
                : [javascript({ jsx: true })]
          }
          onChange={(value, viewUpdate) => {
            setCode(value)
            setFiles((prevFiles) => {
              return { ...prevFiles, [file]: value }
            })
          }}
        />
      )}
    </div>
  )
}

export default CodeEditor