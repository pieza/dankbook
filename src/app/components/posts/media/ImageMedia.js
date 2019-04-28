import React, { Component } from 'react'

class ImageMedia extends Component {

    render() {
        const { url } = this.props

        return (
            <img className="card-img" src={ url } />
        )
    }

}

export default ImageMedia