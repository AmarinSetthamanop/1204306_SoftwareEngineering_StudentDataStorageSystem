import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import EditPage from './pages/Edit';
import FirstPage from './pages/FirstPage';
import InsertPage from './pages/insert';



const routers = createBrowserRouter([
  { path: "/", element: <FirstPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/edit", element: <EditPage /> },
  { path: "/insert", element: <InsertPage /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={routers}/>
    </>
  )
}

export default App
