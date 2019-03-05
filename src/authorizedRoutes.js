import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthorizedRoute extends React.Component {

  render() {
    const { component: Component, loggedIn, ...rest} = this.props

    return (
      <Route {...rest} render={props => {
        return loggedIn
          ? <Component {...props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = (state) => ({
  loggedIn: state.user.loggedIn
})

export default connect(stateToProps)(AuthorizedRoute)
