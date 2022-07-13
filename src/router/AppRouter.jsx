import { Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth"
import { HeroesRoutes } from "../heroes"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                {/* Para hacer varias rutas publicas una opcion seria:
                
                <Route path="login/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<LoginPage />
                            <Route path="/*" element={<LoginPage />
                            <Route path="/*" element={<LoginPage />
                            <Route path="/*" element={<LoginPage />
                        </Routes>
                    </PublicRoute>
                } />
                */}

                {/* <Route path="/*" element={<HeroesRoutes />} /> 
                esto se hace para proteger las rutas, se crea un hi order
                component y se inserta el componente*/}
                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                }
                />
            </Routes>
        </>
    )
}
