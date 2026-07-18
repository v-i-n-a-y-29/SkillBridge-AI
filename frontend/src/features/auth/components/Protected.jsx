import { useAuth } from '../hooks/useAuth'
import { Navigate} from 'react-router'

function Protected({children}) {

  const {user,loading} = useAuth()

    if(loading){
      return(
        <main>
          <h2>Loading...</h2>
        </main>
      )
    }



    if(!user){
      return <Navigate to="/login" replace />
    }

    return children;
}

export default Protected