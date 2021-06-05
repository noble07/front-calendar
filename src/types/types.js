
export const types = {

  /** [ui] Action types */
  uiOpenModal: '[ui] Open modal',
  uiCloseModal: '[ui] Close modal',

  /** [Calendar] Action types */
  eventSetActive: '[event] Set active',
  eventAddNew: '[event] Add new',
  eventClearActive: '[event] Clear active event',
  eventUpdated: '[event] Event updated',
  eventDeleted: '[event] Event deleted',

  /** [auth] Action types*/
  authChecking: '[auth] Checking login state',
  authCheckingFinish: '[auth] Finish checking login state',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start Register',
  authStartTokenRenew: '[auth] Start token renew',
  authLogout: '[auth] Logout',


}