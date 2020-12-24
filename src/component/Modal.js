import React, { Component } from 'react';
import { IDRFormatter } from './Card.js';
import '../css/Modal.css';
import '../css/Modal-Billing.css';
import $ from 'jquery';

function close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {}
        }
        this.fabClick = this.fabClick.bind(this);
        this.pay = this.pay.bind(this);
    }

    fabClick() {
        //TODO: STEP TO GET THIS from outside
        //* 1. use arrow function ??
        //* 2. bind with -> click(function(e){ statement }.bind(this)) -> allow to get `this`
        //* 3. store `this` to var
        const self = this;
        $("#fab-count").click(function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            if (localStorage.cart) {
                self.setState(() => ({
                    list: JSON.parse(localStorage.getItem('cart'))
                }))
            }
        });
    }

    isSame(name, sub) {
        return name === sub ? "-" : sub;
    }

    sumTotal() {
        var list = this.state.list;
        var sum = 0;
        Object.keys(list).map(function (key) {
            return list[key].map(cart =>
                sum += (cart.price * cart.qty)
            );
        });
        return IDRFormatter(sum);
    }

    generateMessage() {
        var self = this;
        var list = this.state.list;
        var text = "Hai " ;
        window.liff.getProfile()
            .then(profile => {
                text += profile.displayName + "! \n\n";
            })
            .catch((err) => {
                console.log('error', err);
            });
        text += "Terimakasih telah memesan makanan di restaurant kami \n";
        text += "Berikut merupakan review pesanan anda \n\n";

        var counter = 0;
        Object.keys(list).map(function (key) {
            return list[key].map(function(cart){
                counter++;
                text += "*" +counter + ". " + cart.name + "(" + self.isSame(cart.name, cart.sub_name) + "), " + cart.qty + " buah* \n"
                return text;
            }
                
            );
        });

        text += "\n Pesanan akan segera diproses dan akan diinformasikan selanjutnya \n\n";
        text += "Mohon ditunggu ya! :)";


        return text;
    }

    pay() {
        var self = this;
        if (window.liff.isLoggedIn()) {
            if (!window.liff.isInClient()) {
                alert("You need to open from Line App");
            } else {
                window.liff.sendMessages([{
                    'type': 'text',
                    'text': self.generateMessage()
                }]).then(function () {
                    window.liff.closeWindow();
                }).catch(function (error) {
                    window.alert('Pay Sending Message Error!: ' + error);
                });
            }
        } else {
            alert("You Need to Login First!");
        }
    }

    componentDidMount() {
        window.onclick = function (event) {
            var modal = document.getElementById("myModal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        this.fabClick();
    }

    render() {
        var list = this.state.list;
        var isSame = this.isSame;
        return (
            <div class="container">
                <div id="myModal" class="modal">

                    <div class="modal-content">
                        <div class="row justify-content-end">
                            <div class="col-md-2">
                                <span class="close" onClick={close}>&times;</span>
                            </div>
                        </div>

                        <div class="flex-col center">

                            <div class="container-billing flex-col">

                                <div class="inner-container flex-col">
                                    <div class="title flex-row center">
                                        <h2>Invoice</h2>
                                    </div>
                                    <div class="container-overflow">
                                        <table>
                                            <thead>
                                                <tr class="row-heading">
                                                    <th class="item-desc"> Item </th>
                                                    <th class="item-desc"> Sub Item </th>
                                                    <th> Price </th>
                                                    <th> Quantity </th>
                                                    <th> Total </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(list).map(function (key) {
                                                    return list[key].map(cart =>
                                                        <tr class="row-data">
                                                            <td class="item-desc">{cart.name}</td>
                                                            <td class="item-desc">{isSame(cart.name, cart.sub_name)}</td>
                                                            <td class="item-price">{IDRFormatter(cart.price)}</td>
                                                            <td class="item-quantity">{cart.qty}</td>
                                                            <td class="item-total">{IDRFormatter(cart.price * cart.qty)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <th>Total: </th>
                                                    <td class="total">{this.sumTotal()}</td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                    </div>
                                    <div class="btn-container center flex-row">
                                        <button onClick={this.pay} class="button-billing"> Pay</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Modal;