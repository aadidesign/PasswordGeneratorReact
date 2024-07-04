import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)   //Length of bar
  const [numberAllowed, setNumberAllowed] = useState(false)   //For Checkboxes
  const [charAllowed, setCharAllowed] = useState(false)   //For Checkboxes
  const [password, setPassword] = useState("")  

  //useRef hook
  const passwordRef = useRef(null)  // no default value
  
  // Function to generate password based on current settings
  const passwordGenerator = useCallback (
    () => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
      
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)

        //Mistake - in pass added "+=" plus to Concatenate ; by which not anly one but n number of password elements will be egenerated
      }

      //No array.length as we have length in for loop


    setPassword(pass) //  First step to set 1 letter password


    }, [length, numberAllowed, charAllowed,setPassword])

    // if dependency is password that setPassword - will run in infinite loop
    // If any dependency will change useCallback changes it

  const copyPasswordToClipboard = useCallback(() => { 
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100) 
    
    // i.e. It will select number of elements from 0 to 100 in password. If we put (0,10) then if there are 20 chars in pass then it'll select only first 10 chars out of those 20 chars

    window.navigator.clipboard.writeText(password); }, [password]); 
    // Most IMP line of code to activate Copying the Password
  
    // for Copy

      useEffect( () => {passwordGenerator()}, [length, numberAllowed, charAllowed,passwordGenerator] 
    )

  return (
    <>
      <div 
      className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 text-orange-500 bg-gray-800'>     
        <h1 className='text-white text-center mb-4'>Password Generator</h1>
        <div
        className='flex shadow rounded-lg overflow-hidden mb-4"'>
        
          <input                            //Use of React
          type="text"
          value={password}                  //stored in state
          className='outline-none w-full py-2 px-4' // Tailwind class
          placeholder='password'
          readOnly

          ref = {passwordRef}                     //for Copy
          // Now line on 68 & 10 can communicate
                            
           />

          <button
          onClick={copyPasswordToClipboard}      //for Copy
          className='outline-none bg-blue-700 text-white px-4 py-2 shrink-0'>
          copy
          </button>

        </div>

        <div
        className='flex text-col gap-x-4'>
          <div
          className='flex items-center gap-x-2'>
            <input type="range"
            min={6}      //min length of bar
            max={100}    //max length of bar
            value={length}
            className='cursor-pointer'
            onChange={(event)=>{setLength(event.target.value)}}               // To make sliding bar active
            />
            <label> Length:{length} </label>
            
            {/* IMP ml-2 --> otherwise it prints length above & number on below on the 2 lines */}
          </div>

            <div className="flex items-center gap-x-2">
              <input type="checkbox"
              defaultChecked={numberAllowed}      // Stored in State
              id="numberInput"
              onChange={ () => { setNumberAllowed  ( (prev) => !prev ) ; // Callback function fired - To reverse the Previous value, bywhich True or False will Flip
              //For CHECKBOX

              }}
              />

                <label htmlFor="numberInput">Numbers</label>

            </div>

              <div className='flex items-center gap-x-2'>
                <input type="checkbox"
                defaultChecked={charAllowed}    // Stored in State
                id='characterInput'
                onChange={ () => {setCharAllowed ( (prev) => !prev );
                // Toggle the previous state value for charAllowed

                 } } />

                <label htmlFor="characterInput">Characters</label>


              </div>
              

        </div>

      </div>
    </>
  )
}

export default App



/* IMP py-3 (Forgot)*/

/* // Mistake - className='className="flex shadow rounded-lg overflow-hidden mb-4"'> */