import {RouterProvider} from 'react-router'
import {router} from './app.routes'
import AuthProvider from './features/auth/AuthProvider'
import { InterviewProvider } from './features/interview/interviewProvider'

function App() {

  return (
    
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router = {router}/>
      </InterviewProvider>
    </AuthProvider>

  )
}

export default App
