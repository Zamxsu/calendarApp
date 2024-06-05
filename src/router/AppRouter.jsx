import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"


export const AppRouter = () => {

     const authStats =  'authenticated'  //'not authenticated' 

  return (
    <Routes>
        {
            (
                (authStats === 'not authenticated')
                    ?  <Route path="/auth/*" element={ <LoginPage /> } />
                    :  <Route path="/*" element={ <CalendarPage /> } />
                
            )
        }
        <Route path="/*" element={ <Navigate to='/auth/login' />  } />
    </Routes>
  )
}
