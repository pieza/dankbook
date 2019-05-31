import React, { Component } from 'react'

class Loading extends Component {
    render() {
        const { size } = this.props

        return (
            <div className="text-center">
                <div className="spinner-border text-info" role="status" style={{
                    width: size || "1rem",
                    height: size || "1rem",
                    marginTop: "1rem"
                }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

}

export default Loading