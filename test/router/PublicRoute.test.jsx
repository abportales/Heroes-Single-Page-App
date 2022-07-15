import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"
import { MemoryRouter, Routes, Route } from 'react-router-dom'

describe('Pruebas en <PublicRoute/>', () => { 

    test('debe de mostrar el children si no esta autenticado', () => { 
        /**  TypeError: Cannot destructure property 'logged' of 
         * '(0 , _react.useContext)(...)' as it is undefined. 
         * marca eso porq quiere renderizar un hook, y este usa
         * authcontext ya q ambos consumen el public*/
        /** lo que hacemos aqui es poner un componente ficticio
         * para simular los childrens, ya que como no estoy logeado
         * es lo que deberia mostrar         */
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        //screen.debug()
        expect( screen.getByText('Ruta pública') ).toBeTruthy()
        
    })

    test('debe de navegar si esta autenticado', () => { 
        /** <Navigate> may be used only in the context of 
         * a <Router> component. ese error significa que falta el
         * memoryRouter imp de react-router-dom 
         * se tiene que poner 2 rutas porque si no entra en un ciclo inf
         * una donde estamos y la otra a donde queremos llegar*/
        const contextValue = {
            logged: true,
            user: {
                name: 'Ab',
                id: 'ABC'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        }/>
                        <Route path='/marvel' element={ <h1>Pagina Marvel</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        //screen.debug()
        expect( screen.getByText('Pagina Marvel') ).toBeTruthy()
    })
 })