import {create} from 'zustand';

//create store
export const useCounterStore = create((set) => ({
	//state
	newCounter: 500,
	newCounter1:100,
	//add user State (name,age,email)
	user:{name:"ravi",email:"ravi@gmail.com",age:21},
	//function to change email
	changeEmail:()=>set({...user,email:"test@gmail.com"}),
	//function to change name and age
	changeNameAndAge:()=>set({...user,name:"test",age:30}),
	//function to modify the state
	

	
	incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),
	incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),
	decrementCounter:()=>set(state=>({newCounter:state.mewCounter-20})),
	reset:()=>set(({newCounter:0}))

    // function to change newCOunter to 500

	//function to decrement newcounter by 20
}))