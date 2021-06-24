import { fetchSinToken } from 'helpers/fetch'

describe('Pruebas en el helper Fetch', () => {
  test('fetch sin token debe de funcionar', async () => {
    const resp = await fetchSinToken('auth', { email: 'juan@gmail.com', password: '123456' }, 'POST')
    expect(resp instanceof Response).toBeTruthy()

    const body = await resp.json()
    expect(body.ok).toBeTruthy()
  })
})
