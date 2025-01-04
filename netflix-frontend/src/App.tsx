import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/sections'
import { Provider } from 'react-redux'
import store from './store'
import { Toaster } from 'react-hot-toast'

function App() {
  return ( 
  <Provider store={store}>
    <Toaster/>
  <BrowserRouter>
  <Router/>
  </BrowserRouter> 

  </Provider>
  )
}

export default App
