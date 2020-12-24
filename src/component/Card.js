import '../css/Card.css';

function USDtoIDR(usd) {
    return Math.floor(usd * 14148 / 100); //! Takasimura!! :)
}

export function IDRFormatter(idr) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });
    return formatter.format(idr);
}

//TODO: Currying?? WTF!! -> use currying isntead of bind (for class) ??
//TODO: FAB BUTTON WRONG BEHAVIOR!!
function changeQty(id, behavior) {
    return function (e) {
        var qty = parseInt(document.getElementById('qtyhidden' + id).value);

        qty = isNaN(qty) ? 0 : qty;

        if (qty <= 0 && !behavior) {
            qty = 0;
        } else {
            if (behavior) {
                qty += 1;
            } else {
                qty -= 1;
            }
        }
        document.getElementById('qtyhidden' + id).value = qty;
        document.getElementById('qty' + id).innerHTML = qty;
    }
}

function cart(menu_id, menu_name, arr_sub_id, behavior) {
    return function (e) {
        if (behavior) {
            _addToCart(menu_id, menu_name, arr_sub_id);
        } else {
            _removeFromCart(menu_id);
        }
    }
}

function _addToCart(menu_id, menu_name, arr_sub_id) {
    var cart = {};
    var current_list = [];

    var qtyfab = parseInt(document.getElementById('fab-count-hidden').value);

    if (localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    var counter = 0;
    for (let index = 0; index < arr_sub_id.length; index++) {
        var qty = parseInt(document.getElementById('qtyhidden' + arr_sub_id[index].id).value);
        if (qty > 0) {
            qtyfab += qty;
            current_list[counter] =
            {
                "id": arr_sub_id[index].id,
                "name": menu_name,
                "sub_name": arr_sub_id[index].name,
                "price": USDtoIDR(arr_sub_id[index].price),
                "qty": qty,
            };
            counter++;
        }
    }
    
    document.getElementById('fab-count-hidden').value = qtyfab;
    document.getElementById('fab-count').innerHTML = qtyfab;
    cart[menu_id] = current_list;
    localStorage.setItem('cart', JSON.stringify(cart));
    _cartBehave(menu_id, true);
}

function _removeFromCart(menu_id) {
    var cart = {};
    var qtyfab = parseInt(document.getElementById('fab-count-hidden').value);

    if (localStorage.cart) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    for (let index = 0; index < cart[menu_id].length; index++) {
        var qty = parseInt(document.getElementById('qtyhidden' + cart[menu_id][index].id).value);
        qtyfab -= qty;
    }

    document.getElementById('fab-count-hidden').value = qtyfab;
    document.getElementById('fab-count').innerHTML = qtyfab;
    delete cart[menu_id];
    localStorage.setItem('cart', JSON.stringify(cart));
    _cartBehave(menu_id, false);
}

function _cartBehave(menu_id, behavior) {
    var qtybtn = document.getElementsByClassName('qtybtn' + menu_id);
    if (behavior) {
        document.getElementById('add' + menu_id).style.display = "none";
        document.getElementById('remove' + menu_id).style.display = "block";
        for (let index = 0; index < qtybtn.length; index++) {
            qtybtn[index].style.display = "none";
        }
    } else {
        document.getElementById('add' + menu_id).style.display = "block";
        document.getElementById('remove' + menu_id).style.display = "none";
        for (let index = 0; index < qtybtn.length; index++) {
            qtybtn[index].style.display = "flex";
        }
    }
}

function Card(props) {
    return (
        <div class="wrapper">

            <div class="header"></div>

            <h1 class="name">{props.name}</h1>

            <div class="border"></div>

            <p class="info">{props.description}</p>

            {props.subMenu.map(subMenu =>
                <div key={subMenu.id} class="card p-0 m-3" style={{ border: "1px solid grey" }}>
                    <div class="row mx-2 mt-3 justify-content-center mb-2">
                        <div class="col-sm-12 text-center">
                            <h6 class="my-auto">{subMenu.name}</h6>
                        </div>
                        <div class="col-sm-12 text-center mt-2">
                            <h6 class="my-auto text-danger">{IDRFormatter(USDtoIDR(subMenu.price))}</h6>
                        </div>
                    </div>

                    <div class="row mx-2 justify-content-center">
                        <div class="col-md-4 text-center">
                            <input id={'qtyhidden' + subMenu.id} type="hidden" value="0" />
                            <p id={'qty' + subMenu.id} class="my-auto">0</p>
                        </div>
                    </div>


                    <div class={"row mx-2 mb-3 justify-content-center qtybtn" + props.id}>
                        <div class="col-lg-5 text-center">
                            <div class="btn btn-danger d-inline-block" style={{ width: "40px" }} onClick={changeQty(subMenu.id, false)}>-</div>
                        </div>
                        <div class="col-lg-5 text-center">
                            <div class="btn btn-success d-inline-block" style={{ width: "40px" }} onClick={changeQty(subMenu.id, true)}>+</div>
                        </div>
                    </div>

                </div>

            )}

            <div class="grey-border"></div>

            <div class="button" id={'add' + props.id} onClick={cart(props.id, props.name, props.subMenu, true)}>Add to Cart</div>
            <div class="button-remove" id={'remove' + props.id} onClick={cart(props.id, props.name, props.subMenu, false)}>Remove from Cart</div>
        </div>
    );
}

export default Card;