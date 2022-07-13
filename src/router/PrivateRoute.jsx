import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate, useLocation } from 'react-router-dom'

/** recordemos que el children lo convierte en un hi order component */
export const PrivateRoute = ({children}) => {

    /** como sabemos que el usuario esta autentificado? con el useContext
     * ahi esta la info que requerimos     */

    const { logged } = useContext( AuthContext )

    const location = useLocation()
    //console.log(location)
    const { pathname,search } = location

    const lastPath = pathname + search
    localStorage.setItem('lastPath', lastPath)

    /** se podria optimizar con un useMemo
     * ya que si ponemos un console.log('re-render')
     * podemos ver que se cambian los estados
     */
    return ( logged )
    ? children
    : < Navigate to="/login" />
}
