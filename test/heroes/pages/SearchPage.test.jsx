import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"

const mockedUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))


describe('Pruebas en <SearchPage/>', () => {

    beforeEach( ()=> jest.clearAllMocks() )

    test('debe de mostrarse correctamente con valor con defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        //screen.debug()
        expect(container).toMatchSnapshot()

    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        //screen.debug()

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img')
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

        const divAlert = screen.getByLabelText('divAlert')

        //se podria acceder, hasta ahi, pero es mejor hacerlo directo con el valor de display
        //console.log(divAlert.style._values) 
        expect(divAlert.style.display).toContain('none')
    })

    test('debe de mostrar un error cuando no se encuentra el hero batman123', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        screen.debug()

        const divAlert = screen.getByLabelText('divAlert')
        console.log(divAlert.style.display) 
        expect(divAlert.style.display).toBeFalsy()
    })

    test('debe de llamar el navigate a la pantalla nueva', () => {

        const inputValue = 'batman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )
        screen.debug()
        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue } })
       // console.log(input.value)
        expect(input.value).toBe('batman')
        
        const form = screen.getByLabelText('form')
        fireEvent.submit(form)
        /** para saber si se disparo el form, podemos poner un clg en el searchPage, y ver si efectivamente
         * sale         */
         /** en este punto debemos pensar en como alcanzar o poder usar el navigate del hook 
          * nos vamos a la parte superior para ver lo que se hizo...        */
         expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${inputValue}`)
    })

})