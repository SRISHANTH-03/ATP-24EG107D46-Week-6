import {createContext,useState} from 'react'

//create context object

export const counterContext = createContext()


function ContextProvider({children}) {
	//state
	const [counter,setCounter] = useState(10)
	const [counter1,setCounter1] = useState(10)
	
	//function to change state
const changeCounter=()=>{
	setCounter(counter+1)
}
const changeCounter1=()=>{
	setCounter1(counter1+1)
}
  return (
	<counterContext.Provider value={{counter,counter1,changeCounter,changeCounter1}}>
		{children}
		</counterContext.Provider>
  )
}

export default ContextProvider
