import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types"

describe('Pruebas en el authReducer', () => {

    const initialState = {
        logged: false,
        user: null
    }

    const user = {
        name: 'Ab',
        id: '123',
    }

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {})
        expect(state).toEqual(initialState)
    })

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: user,
        }
        
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            logged: true,
            user: action.payload,
        })
    })

    test('debe de (logout) borrar el name del usuario y logged en false', () => {

        const logged = {
            logged: true,
            user: user
        }
        
        const action = {
            type: types.logout,
            payload: null,
        }
        const state = authReducer(logged, action)
        expect(state).toEqual(initialState)
    })

})