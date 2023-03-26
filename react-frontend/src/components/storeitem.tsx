import { Fragment, useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
    id: number,
    title: string,
    category: string,
    description: string,
    price: number,
    sku_num: number,
    stock_quant: number,
    img_url: string

}

export function Storeitem({ id, title, category, description, price, sku_num, stock_quant, img_url }: StoreItemProps) {

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems } = useShoppingCart()
    let quantity = getItemQuantity(id)

    // const lol = {'id': 69, 'name': 'haha'}
    // const testItems = [{'id': 5, 'qty':50, lol}, {'id': 6, 'qty':60}, {'id': 4, 'qty':40}] 
    // console.log(testItems)
    // let quantity = testItems.find(item => item.id === id)?.qty || 0

    let { errMsg, authTokens, user }: any = useContext(AuthContext)

    let itemDescArr = {id, title, category, description, price, sku_num, stock_quant, img_url}

    // useEffect(() => {
    // }, [cartItems]);

    return (
        <Card>
            <Card.Img variant="top" src={img_url} className="shadow-lg"/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-0">
                    <span className="fs-2">{title}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <hr></hr>
                <Card.Subtitle className="d-flex">
                    <span className="ms-2">{description}</span>
                </Card.Subtitle>
                {authTokens ?
                    <Fragment>
                        <hr></hr>
                        <div className="mt-auto">
                            {quantity === 0 ? (
                                <button className="btn btn-primary w-100" onClick={() => { increaseCartQuantity(id, user.user_id, itemDescArr) }}>+ Add to cart</button>
                            ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                    <button className="btn btn-secondary btn-sm px-0 pb-0 me-2" onClick={() => { decreaseCartQuantity(id) }}><i className="fa fa-minus-square fa-fw fs-5" /></button>
                                    <span className="fs-3">{quantity}</span> in cart
                                    {/* , ID = <span className="fs-3">{id}</span> */}
                                    <button className="btn btn-success btn-sm px-0 pb-0 ms-2" onClick={() => { increaseCartQuantity(id) }}><i className="fa fa-plus-square fa-fw fs-5" /></button>
                                </div>
                                <button className="btn btn-danger btn-sm w-100" onClick={() => { removeFromCart(id) }}>Remove from cart</button>
                            </div>
                            }
                        </div>
                    </Fragment>
                    : errMsg("login to add items to cart")}
            </Card.Body>
        </Card>
    );
}