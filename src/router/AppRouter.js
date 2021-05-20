import LoginScreen from "components/auth/LoginScreen"
import CalendarScreen from "components/calendar/CalendarScreen"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

const AppRouter = () => {
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
