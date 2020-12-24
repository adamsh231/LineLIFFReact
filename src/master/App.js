import React, { Component } from 'react';
// import axios from 'axios';
import Card from '../component/Card';
import FAB from '../component/FAB';
import Modal from '../component/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    // axios.get('https://jsonkeeper.com/b/HKWX')
    //   .then(result => {
    //     this.setState(() => ({
    //       items: result.data.categorys
    //     }));
    //   });
    var list = require('../json/food.json');
    this.setState(() => ({
      items: list.categorys
    }));
    beginLiffApp();
  }

  render() {
    return (
      <div class="container" style={{ marginTop: '100px', marginBottom: '100px' }}>
        <Modal />
        {this.state.items.map(item =>
          <div key={item.id} class="card mb-4">
            <div class="card-title text-center mt-4">
              <h2>{item.name}</h2>
              <hr />
            </div>
            <div class="card-body">
              <div class="row">
                {item["menu-items"].map(menu =>
                  <div key={menu.id} class="col-lg-3" style={{ marginBottom: '20px' }}>
                    <Card id={menu.id} name={menu.name} description={menu.description} subMenu={menu["sub-items"]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <FAB />
      </div>
    );
  }
}

function beginLiffApp() {
  const useNodeJS = false;
  const defaultLiffId = "1655374995-NlZJnl5b";
  let myLiffId = "";
  if (useNodeJS) {
    fetch('/send-id')
      .then(function (reqResponse) {
        return reqResponse.json();
      })
      .then(function (jsonResponse) {
        myLiffId = jsonResponse.id;
        initializeLiffOrDie(myLiffId);
      })
      .catch(function (error) {
        console.log(error.messages);
      });
  } else {
    myLiffId = defaultLiffId;
    initializeLiffOrDie(myLiffId);
  }

}

function initializeLiffOrDie(myLiffId) {
  if (!myLiffId) {
    console.log(myLiffId);
  } else {
    initializeLiff(myLiffId);
  }
}

function initializeLiff(myLiffId) {
  window.liff
    .init({
      liffId: myLiffId
    })
    .then(() => {
      initializeApp();
    })
    .catch((err) => {
      console.log(err);
    });
}

function initializeApp() {
  console.log("initialized!");
  console.log(window.liff.isInClient());
  console.log(window.liff.isLoggedIn());
  checkClient();
  eventListener();
}

function checkClient() {
  if (!window.liff.isInClient()) {
    if (window.liff.isLoggedIn()) {
      window.liff.getProfile()
        .then(profile => {
          document.getElementById('logout').innerHTML = profile.displayName + '| Sign Out';
        })
        .catch((err) => {
          console.log('error', err);
        });
      document.getElementById('login').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
    } else {
      document.getElementById('login').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
    }
  } else {
    window.liff.getProfile()
      .then(profile => {
        document.getElementById('profile').innerHTML = profile.displayName;
      })
      .catch((err) => {
        console.log('error', err);
      });
    document.getElementById('profile').style.display = 'block';
  }
}

function eventListener() {
  document.getElementById('login').addEventListener('click', function () {
    if (!window.liff.isLoggedIn()) {
      window.liff.login();
    }
  });

  document.getElementById('logout').addEventListener('click', function () {
    if (window.liff.isLoggedIn()) {
      window.liff.logout();
      window.location.reload();
    }
  });
}

export default App;
