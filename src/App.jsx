import { useState ,useCallback,useRef,useEffect} from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [char, setChar] = useState(false)
  const [number, setNumber] = useState(false)
  const [length, setLength] = useState('8')
  
  const passwordGen = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (char) str += "!@#$%^&*()_+"
    if (number) str += "0123456789"
    
    for (let i = 0; i < length; i++)
    {
      let Idx=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(Idx)
    }
    
    setPassword(pass)
    console.log(password+"useEff executed")
  }, [char, number, length, setPassword])

   
  useEffect(() => {
    passwordGen()
  }, [number, char, length])
  
  const passwordRef=useRef(null)

  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" className='outline-none w-full py-1 px-3'
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={(e) => {
              window.navigator.clipboard.writeText(password)
              passwordRef.current?.select()
            }}
          >
            copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              value={length}
              min={4}
              max={50}
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
              defaultChecked={number}
              onChange={()=>{setNumber(!number)}}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input type="checkbox"
              defaultChecked={char}
              onChange={()=>{setChar(!char)}}
            />
            <label htmlFor="charInput">Character</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
