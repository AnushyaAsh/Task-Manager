import { createBrowserRouter } from "react-router-dom";

import Home from "./Home";

import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import AddStudent from "./components/users/AddStudent";

const router = createBrowserRouter([
    { path: '', element: <Home/> },

    // { path: '/students', element: <ListStudent/> },
    { path: '/addstudent', element: <AddStudent/> },
    // { path : '/students/:id/edit', element: <EditStudent/>},
    // { path: '/students/:id', element: <ViewStudent/>},
    { path: '/register', element:<Register/>},
    { path: '/login', element:<Login/>},

    
]);

export default router;