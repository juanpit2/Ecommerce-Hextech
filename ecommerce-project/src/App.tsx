// Componente raiz de la aplicacion
// Actualmente solo renderiza la pagina Home
// Este archivo se mantiene simple ya que el router en main.tsx maneja la navegacion

import './App.css'

import Home from './pages/Home'

// App raiz que compone toda la landing
function App() {
  return (
    <>  
      <Home />
    </>
  );
}

export default App;