import React, { Component } from 'react'
import {BrowserRouter as Router, withRouter} from 'react-router-dom'
let prevLocation, location, action, unBlock;

class _GuardHelper extends Component {
    componentDidMount () {
        // 添加阻塞
        unBlock = this.props.history.block((newLocation, ac) => {
            prevLocation = this.props.location;
            location = newLocation
            action = ac
            return ''
        })
        // 添加监听器
        this.unListen = this.props.history.listen((location, action) => {
            if (this.props.onChange) {
                const prevLocation = this.props.location;
                this.props.onChange(prevLocation, location, action, this.unListen)
            }
        })
    }
    componentWillUnmount () {
        unBlock()
        this.unListen()
    }
    render () {
        return null
    }
}

const GuardHelper = withRouter(_GuardHelper)
class RouteGuard extends Component {
    // 处理阻塞
    handleConfirm = (msg, commit) => { 
        if (this.props.onBeforeChange) { 
            this.props.onBeforeChange(prevLocation, location, action, commit, unBlock)
        } else {
            // 不阻塞
            commit(true)
        }
    }
  render() {
      return <Router getUserConfirmation={this.handleConfirm}>
          <GuardHelper onChange={ this.props.onChange } >      
          </GuardHelper>
          {this.props.children}
    </Router>
  }
}

export default RouteGuard;
