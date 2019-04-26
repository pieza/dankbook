import React, { Component } from 'react'

class ImageMedia extends Component {

    render() {
        const { url } = this.props

        return (
            <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={ url } />
            </div>
        )
    }

}

export default ImageMedia