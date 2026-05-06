# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration
###
for evert api request we dont need use effect hook.


### State management in React.
          sharing state +keeping state sync across app.

		   contexr API -->small apps.(with less components and less state to share)
		   redux / zustand --> large apps. (with more components and more state to share  in redux we have to write more code compared with Zustand.. Zustand is more popular then redux because of its simplicity and less code to write..)

### context API
     --> create context object (pipeline)
	 ---> Add state to context object( add water to pipeline)
	 ---> set context provider to parent (connect pipeline to home).
	 ---> consume context from components (drink water from pipeline).

### issues with context 
   context wiht use state hook is a best and simple state management mechanism for small application. but it creates unnecessary re-rendedering when multiple state are part of a context.
     to over come this unnecessary issuse  create a multiple context and make sure that each context has only one state. this way we can avoid unnecessary re-rendering and improve performance of our application.
	  
	  when the application size is huge , then maintance of multiple context will become an issue.  for such large applicatioj advance state management tools like  redux or zustand can be used..

### create Zustand store
   1. install zustand library.	
   2. create a store file and create a store using create function from zustand library..
   