import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'

import { startLogin, startRegister } from 'actions/auth'
import { types } from 'types/types'
import * as fetchModule from 'helpers/fetch'

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}

let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('Pruebas en la acciones auth', () => {
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('startLogin correcto', async () => {
    await store.dispatch(startLogin('juan@gmail.com', '123456'))

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    /* let token = localStorage.setItem.mock.calls[0][1]
    console.log(token) */
  })

  test('startLogin incorrecto', async () => {
    await store.dispatch(startLogin('juan@gmail.com', '123456789'))
    let actions = store.getActions()

    expect(actions).toEqual([])
    expect(Swal.fire).toHaveBeenCalled()
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error')

    await store.dispatch(startLogin('juan@gmail2.com', '123456'))
    actions = store.getActions()
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario no existe con ese email', 'error')
  })

  test('startRegister correct', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'carlos',
          token: 'ABC123ABC123'
        }
      }
    }))

    await store.dispatch(startRegister('test2@test.com', '123456', 'Test'))

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'carlos'
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))
  })
})
