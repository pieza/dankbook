import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Landing extends Component {

    render() {
        return (
            <div className="container h-100">
                <div className="row align-items-center justify-content-center">
                    <h1>asdfsdf</h1>
                </div>
                <div className="row align-items-center justify-content-center">
                    <h4>asdas</h4>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-sm-6 my-auto">
                        <Link to="/login" class="btn btn-block btn-lg btn-outline-primary mr-7 mb-7">Login</Link>
                    </div>
                    <div className="col-sm-6 my-auto">
                        <Link to="/signup" class="btn btn-block btn-lg btn-outline-success mr-7 mb-7">Signup</Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default Landing