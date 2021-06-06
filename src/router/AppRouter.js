import {
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect 
} from "react-router-dom"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import LoginScreen from "components/auth/LoginScreen"
import CalendarScreen from "components/calendar/CalendarScreen"
import { startChecking } from "actions/auth"

const AppRouter = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
