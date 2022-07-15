import { render,screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router/AppRouter"

describe('Pruebas en el <AppRouter/>', () => { 

    test('debe de mostrar el login, si no esta autenticado', () => { 

        const contextValue = {
            logged: false,
            user: null,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        //screen.debug()
        expect(screen.getAllByText('Login').length).toBe(2)
    })

    test('debe de mostrar el componente de marvel, si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'ab',
            },
        }

        render(
            // <MemoryRouter initialEntries={['/marvel']}> podemos hacerlo asi, o
            //podemos poner login, asi validamos la proteccion de rutas
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        //screen.debug()
        /** confirmamos que marvel debe de aparecer mas de 1 vez */
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1)
    })

 })