import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import moment from 'moment'
import { act } from '@testing-library/react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'

import CalendarModal from 'components/calendar/CalendarModal'
import { eventClearActive, eventStartUpdate, eventStartAddNew } from 'actions/events'

jest.mock('actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn()
}))

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = moment().minute(0).seconds(0).add(1, 'hours')
const nowPlusOne = now.clone().add(1, 'hours')

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola Mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlusOne.toDate()
    }
  },
  auth: {
    uid: '123',
    name: 'Juan'
  },
  ui: {
    modalOpen: true
  }
}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)

describe('Pruebas en <CalendarModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('debe de mostrar el modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
  })

  test('debe de llamar la acción de actualizar y cerrar el modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
    expect(eventClearActive).toHaveBeenCalled()
  })

  test('debe de mostrar error si falta el título', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)
  })

  test('debe de crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: '123',
        name: 'Juan'
      },
      ui: {
        modalOpen: true
      }
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    )

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    })

    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: ''
    })

    expect(eventClearActive).toHaveBeenCalled()
  })

  test('debe de validar las fechas', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    })

    const hoy = new Date()

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
    })

    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe de ser mayor a la fecha de inicio',
      'error'
    )
  })
})
