import Signup from "./components/Signup";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

//two things needed when we implement routing

const router = createBrowserRouter([
  //this router has array and array has an object amd object has two things path and element
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element:<Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
