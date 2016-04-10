import React from 'react'
import LoginView from 'app/views/LoginView.jsx'

require('app/assets/css/advanced_app.scss')

let AdvancedApp = React.createClass({
  getInitialState: function() {
    return {
      user: window.advanced_user,
      userValidated: false
    }
  },

  constructContent() {
    let childProps = {
      user: this.state.user,
    }

    /*  pass state as props to children */
    let allChildren = React.cloneElement(
      this.props.children,
      ...[childProps]
    )

    /* show Loading... when we haven't done necessary fetches */
    if (!this.state.userValidated) {
      allChildren = <div className="container">Loading...</div>
    }

    return allChildren
  },

  render() {
    return (
      <div>
        <h3>Advanced Search</h3>
        User: {JSON.stringify(this.state.user)}
        {this.constructContent()}
      </div>
    )
  }
})

module.exports = AdvancedApp
