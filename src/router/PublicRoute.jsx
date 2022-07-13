import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from 'react-router-dom'

/** recordemos que el children lo convierte en un hi order component */
export const PublicRoute = ({children}) => {

    /** como sabemos que el usuario esta autentificado? con el useContext
     * ahi esta la info que requerimos     */

    const { logged } = useContext( AuthContext )
    return ( !logged )
    ? children
    : < Navigate to="/marvel" />
}