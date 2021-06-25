import authReducer from 'reducers/authReducer'
import { types } from 'types/types'

const initState = {
  checking: true
}

describe('Pruebas en authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const state = authReducer(initState, {})

    expect(state).toEqual(initState)
  })

  test('debe de retornar el estado autenticado', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'ABC123ABC',
        name: 'Carlos'
      }
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({ ...action.payload, checking: false })
  })

  test('debe de retornar el checking en false', () => {
    const action = {
      type: types.authCheckingFinish
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({ checking: false })
  })

  test('debe de retornar el estado luego de logout', () => {
    const initState = {
      checking: false,
      uid: 'ABC123ABC',
      name: 'Carlos'
    }

    const action = {
      type: types.authLogout
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({ checking: false })
  })
})
