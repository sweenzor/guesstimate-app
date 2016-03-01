import React, {Component, PropTypes} from 'react'
import './style.css'
import Container from 'gComponents/utility/container/Container.js'
import FirstSubscriptionContainer from 'gComponents/subscriptions/FirstSubscription/container.js'
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    me: state.me
  }
}

@connect(mapStateToProps)
export default class FirstSubscriptionPage extends Component {
  displayName: 'FirstSubscriptionPage'

  static propTypes = {
    planName: PropTypes.oneOf(['lite', 'premium'])
  }

  render() {
    const {me, planName} = this.props
    const planId = {lite: 'personal_lite', premium: 'personal_premium'}[planName]
    return (
      <Container>
        <div className='FirstSubscriptionPage'>
          <div className='header'>
            <h1> {`The ${this.props.planName.capitalizeFirstLetter()} Plan`}</h1>
          </div>
          {!!me.id && planId &&
            <FirstSubscriptionContainer planId={planId}/>
          }
          {!!me.id && !planId &&
            <h2> Plan Invalid </h2>
          }
          {!me.id &&
            <h2> Log in to view this page </h2>
          }
        </div>
      </Container>
    )
  }
}