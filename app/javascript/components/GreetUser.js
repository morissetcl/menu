import React from "react"
import PropTypes from "prop-types"
class GreetUser extends React.Component {
  render () {
    return (
      <React.Fragment>
        Name: {this.props.name}
      </React.Fragment>
    );
  }
}

GreetUser.propTypes = {
  name: PropTypes.string
};
export default GreetUser
