import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div class="container">
                <nav class="navbar navbar-light bg-light fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#d">
                            <img src="https://i.ibb.co/sVZ2nQf/bon-appetit-logo.png" alt="" width="50" height="50" class="d-inline-block align-top" />
                        </a>
                        <button id="login" class="btn btn-outline-success" type="submit">Sign in</button>
                        <button id="logout" class="btn btn-outline-success" type="submit">Sign Out</button>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;