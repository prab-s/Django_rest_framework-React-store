import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import useAxios from "../utils/useAxios";

export function Cart() {

    let api = useAxios()
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity } = useShoppingCart()

    let [cartItemsFromDB, setCartItemsFromDB] = useState<any>([])

    let { errMsg, authTokens, logoutUser }: any = useContext(AuthContext)

    useEffect(() => {
        // getCartItemData()
        // console.log(cartItems)
    }, [])


    // const getCartItemData = async () => {
    //     try {
    //         let response = await api.get('/api/cart/')

    //         if (response.status == 200) {
    //             setCartItemsFromDB(response.data)
    //         }
    //         else {
    //             errMsg('Someting went wrong' + '<br/>' + response.status + ' - ' + response.statusText)
    //         }

    //         setLoaded(true)

    //     }
    //     catch (err: any) {
    //         errMsg('Tried requesting cart' + '<br/>' + err.message)
    //     }
    // }

    const getTotalCost = () => {
        var total:number = 0
        cartItems.forEach((element:any) => {
            total += element.item['price'] * element.qty
        });
        return total
    }

    return (
        <Fragment>
            <h1>Cart</h1>
                    <div className="row">
                        <div className="col">
                            {cartItems.map((item: any) => (
                                <div className="row" key={item.id}>
                                    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                                    {/* <button className="btn btn-success mb-2" onClick={() => console.warn(item.id)}>Print</button> */}
                                    <div className="col-md-auto bg-light">
                                        <img src={item.item['img_url']} height="200px"/>
                                    </div>
                                    <div className="col-md-auto bg-dark w-50 bg-opacity-50 rounded shadow">
                                        <h3 className="mt-2">{item.item['title']}</h3>
                                        <pre className="text-warning text-wrap">{item.item['description']}</pre>
                                        <hr></hr>
                                        <span className="fs-3">Quantity: </span>
                                        <button className="btn btn-danger btn-sm px-0 pb-0 me-2" onClick={() => { decreaseCartQuantity(item.item.id) }}><i className="fa fa-minus-square fa-fw fs-5" /></button>
                                        <span className="badge bg-secondary py-2 fs-3">{item.qty}</span>
                                        <button className="btn btn-success btn-sm px-0 pb-0 ms-2" onClick={() => { increaseCartQuantity(item.item.id) }}><i className="fa fa-plus-square fa-fw fs-5" /></button>
                                        <span className="h4 text-warning ms-3">{formatCurrency(item.item['price'] * item.qty)}</span>
                                        <p></p>
                                        <button className="btn btn-warning btn-sm mb-2 py-0 float-end" onClick={() => { removeFromCart(item.item.id) }}>Remove from cart</button>
                                    </div>
                                    <p></p>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-2 ms-auto">
                            <form className="w-90 ms-auto bg-dark bg-opacity-50 rounded p-3 shadow">
                                <div className="mb-3">
                                    <h4>Shipping:</h4>
                                    <select className="form-select" aria-label="Default select example">
                                        {/* <option selected>---</option> */}
                                        <option value="1">Economy</option>
                                        <option value="2">Super Economy (Airfreight)</option>
                                        <option value="3">Express (Priority airfreight)</option>
                                    </select>
                                </div>
                                <p></p>
                                <span className="h4">Total: </span>
                                <span className="text-warning">{formatCurrency(getTotalCost())}</span>
                                <p></p>
                                <button type="submit" className="btn btn-primary">Checkout</button>
                            </form>
                        </div>
                    </div>
        </Fragment>
    );
};