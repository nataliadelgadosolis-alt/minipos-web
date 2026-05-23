import { useState } from 'react' 
import './App.css' 
import DepartamentsPage from "./pages/DepartmentPage"; 
import CustomersPage from './pages/CustomersPage';
import MainLayout from "./layouts/MainLayouts"; 
import SidebarMenu from "./components/SidebarMenu"; 
import Pan_cocosPage from './pages/Pan_cocoPage';
import AboutPage from './pages/About';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from "./context/AuthContext"; 
import LoginPage from "./pages/LoginPage"; 
import PrivateRoute from "./components/PrivateRoute";

function App() { 
  
  const { user, logout } = useAuth(); 
  const [page, setPage] = useState("customers"); 

  function renderContent() { 
    switch (page) { 
      case "customers": 
        return <CustomersPage />; 
      case "departments": 
        return <DepartamentsPage />; 
      case "pan_coco":  
        return <Pan_cocosPage />;
      case "about": 
        return <AboutPage />;
      case "dashboard": 
        return <DashboardPage />;
    } 
  } 

  const sidebar = ( 
    <div> 
      <SidebarMenu current={page} onChange={setPage}/> 
      <div className="mt-6 border-t pt-4"> 
        <p className="text-xs text-gray-500 mb-2">Hola, {user?.username}</p> 
        <button 
          onClick={logout} 
          className="text-sm text-red-600 hover:underline" 
        > 
          Cerrar sesión 
        </button> 
      </div> 
    </div> 
  ); 
 
  return ( 
    <PrivateRoute fallback={<LoginPage onSuccess={() => { }} />}> 
      <MainLayout sidebar={sidebar} content={renderContent()} /> 
    </PrivateRoute> 
  ); 
 
}  

export default App