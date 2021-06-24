import { fetchConToken, fetchSinToken } from 'helpers/fetch'

describe('Pruebas en el helper Fetch', () => {
  let token = ''

  test('fetch sin token debe de funcionar', async () => {
    const resp = await fetchSinToken('auth', { email: 'juan@gmail.com', password: '123456' }, 'POST')
    expect(resp instanceof Response).toBeTruthy()

    const body = await resp.json()
    expect(body.ok).toBeTruthy()

    token = body.token
  })

  test('fetch con token debe de funcionar', async () => {
    localStorage.setItem('token', token)

    const resp = await fetchConToken('events/60a7375d94ca5d2476a367cb', {}, 'DELETE')
    const body = await resp.json()

    expect(body.msg).toBe('Evento no existe por ese id')
  })
})
