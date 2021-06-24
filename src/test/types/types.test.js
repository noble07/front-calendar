import { types } from 'types/types'

describe('Pruebas en Types', () => {
  test('deben de ser iguales', () => {
    expect(types).toEqual({
      /** [ui] Action types */
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',

      /** [Calendar] Action types */
      eventSetActive: '[event] Set active',
      eventLogout: '[event] Event Logout',
      eventStartAddNew: '[event] Start add new',
      eventAddNew: '[event] Add new',
      eventClearActive: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deleted',
      eventLoaded: '[event] Event loaded',

      /** [auth] Action types*/
      authCheckingFinish: '[auth] Finish checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start Register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout'
    })
  })
})
