import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Prompt extends Component {
    render () {
        return null
    }
    
    static defaultProps = {
        when: false,
        message:''
    }
    componentDidMount () { 
        this.handleBlock()
    }
    componentDidUpdate (prevProps, prevState) { 
        // this.handleBlock()
    } 
    handleBlock () {
        if (this.props.when) {
            this.unBlock = this.props.history.block(this.props.message)
        } 
    }
    componentWillUnmount () {
        this.unBlock()
     }

}

export default  withRouter(Prompt)
