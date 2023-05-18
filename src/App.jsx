import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components'
import AppRouter from './AppRouter'
import { Footer } from './containers'



function App() {
  

  return (
    <>
      <BrowserRouter>
      <Header/>
      <AppRouter/>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
