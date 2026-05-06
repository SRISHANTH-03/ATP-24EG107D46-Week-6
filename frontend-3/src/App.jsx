import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Home from "./Components/Home";
import CreateEmp from "./Components/CreateEmp";
import ListOfEmp from "./Components/ListOfEmp";
import Employee from "./Components/Employee";
import EditEmployee from "./Components/EditEmployee";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "create-emp", element: <CreateEmp /> },
        { path: "list", element: <ListOfEmp /> },
        { path: "employee/:id", element: <Employee /> },
        { path: "edit-employee/:id", element: <EditEmployee /> }
      ],
    },
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;
