import React, { Component } from 'react';
import axios from 'axios';
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
    axios.get('https://jsonkeeper.com/b/HKWX')
      .then(result => {
        this.setState(() => ({
          items: result.data.categorys
        }));
      });
  }

  render() {
    return (
      <div class="container" style={{ marginTop: '100px', marginBottom: '100px' }}>
        <Modal/>
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

export default App;
