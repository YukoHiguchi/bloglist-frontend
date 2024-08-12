import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { NotificationContextProvider } from './context/NotificationContext'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queryies: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <NotificationContextProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AuthProvider>
      </NotificationContextProvider>
    </Provider>
  </BrowserRouter>
)
