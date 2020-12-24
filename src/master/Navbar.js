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
                        <div id="profile" style={{ display: "none" }}>
                            <img id="profile-image" class="d-inline rounded-circle" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" width="40px" alt="" />
                            <p id="profile-name" class="d-inline" type="submit" disabled></p>
                        </div>
                        <button id="login" class="btn btn-outline-success" style={{ display: "none" }} type="submit">Sign in</button>
                        <button id="logout" class="btn btn-outline-success" style={{ display: "none" }} type="submit">Sign Out</button>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;