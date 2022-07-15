import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui"

/** esto sin parametros crea errores, porq hace conflicto con el memory router, porq ese si esta
 * evaluando, para eso usa el 2do arg, que recibe un callback, con el objeto descrito internamente
 * 
 * useNavigate: () => mockedUseNavigate
 * con esto ya quedaria, mandamos llamar a una "funcion" en vez de la utilidad el hook, pero seguimos
 * teniendo conflicto con el memoryRouter, ya que tendriamos q mockearlo tmb, para eso se puede hacer un
 * spread de las demas utilidades de react-router-dom con:
 * ...jest.requireActual('react-router-dom'),
 * ahora solo nos queda esperar que el mock haya sido llamado, pero con los argumentos que tenemos en codigo
 */
const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en el <Navbar/>', () => {

    const contextValue = {
        logged: true,
        user: {
            id: '123',
            name: 'ab',
        },
        /** esto lo sacamos del authProvider, ya que ahi viene la funcion de
         * logout y es la que necesitamos, aqui debemos deducir que seria una jest.fn         
         * si hacemos esto, es recomendable hacer el beforeeach y limpiar*/
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks() )

    test('debe de mostrar el nombre del usuario logeado', () => {

        // no necesitamos rutas en el memoryrouter, porq si esta logeado siempre lo vera
        render(
            <MemoryRouter> 
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )
    //    screen.debug()
        // expect( screen.getByText(contextValue.user.name).innerHTML ).toBe('ab')
        expect( screen.getByText('ab') ).toBeTruthy()
    })

    test('debe de llamar el navigate y el logout, cuando se da clic el el btn', () => { 

        // const {user, logout} = useContext(AuthContext)

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        //const logoutBtn = screen.getByRole('button','login')
        const logoutBtn = screen.getByRole('button') //es el unico boton
        //console.log(logoutBtn)
        fireEvent.click(logoutBtn)
        /** errores:
         * TypeError: logout is not a function, se arregla con el jest.fn() */
        expect( contextValue.logout ).toHaveBeenCalled()
        /** en este punto debemos pensar en como alcanzar o poder usar el navigate del hook 
         * nos vamos a la parte superior para ver lo que se hizo...        */
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true } )
     })

})