import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Storeitem } from "../components/storeitem";
import AuthContext from "../context/AuthContext";
import { Sidebar } from "../components/sidebar";
import { useShoppingCart } from "../context/shoppingCartContext";

export const Store = () => {

    let [items, setItems] = useState<any>([])
    let { errMsg, authTokens } = useContext<any>(AuthContext)
    let [sideBarState, setSidebarState] = useState<boolean>(false)

    let [searchText, setSearchText] = useState<string>('')
    const { doCartItemData, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity } = useShoppingCart()

    const getItems = async (searchQuery: string = '') => {
        try {
            let response = await fetch(`http://192.168.1.81:8000/api/store_items/${searchQuery}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            let data = await response.json()

            if (response.status == 200) {
                setItems(data)
            }
            else {
                errMsg('Tried getting items' + '<br/>' + response.status + ' - ' + response.statusText)
            }
        }
        catch (err: any) {
            errMsg('Tried requesting items' + '<br/>' + err.message)
        }
    };

    const loadSidebar = () => {
        const sideBarTitle = "Shop by category"
        const sideBarList = [
            { link: 'tvavcat', text: 'TV & AV' }, 
            { link: 'phacc', text: 'Phones & Accessories' }, 
            { link: 'pcpar', text: 'PC Parts' },
            { link: 'pcaap', text: 'PC peripherals & accessories' }
        ]
        return { sideBarTitle, sideBarList }
    }

    const doListingFilter = async (e: any) => {
        e.preventDefault()
        getItems('search/?search=' + searchText)
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Fragment>
            {/* <button className="btn btn-success mb-2" onClick={() => console.info(cartItems)}>Print</button> */}
            <div className="row">
                <div className="col">
                    <button className="btn btn-warning" onClick={() => { setSidebarState(!sideBarState) }}><i className="fa fa-level-down"></i></button>
                </div>
                <div className="col">
                    {/* <Searchbar /> */}
                    <form className="d-flex" onSubmit={doListingFilter}>
                        <input type="text" className="form-control" value={searchText} placeholder="Search..." onChange={e => setSearchText(e.target.value)} />
                        <button className="btn btn-success ms-2"><i className="fa fa-fw fa-search"></i></button>
                    </form>
                </div>
                <div className="col">
                    <span>Rendered at {new Date().toLocaleString()}</span>
                </div>

            </div>

            <hr></hr>

            

            <div className="row">
                <div className="col-md-2 ">
                    <Sidebar load={sideBarState} setLoad={setSidebarState} closable={true} title={loadSidebar().sideBarTitle} list={loadSidebar().sideBarList} />
                </div>
                <div className="col">
                <Row md={2} xs={1} lg={3} className="g-3">
                    {items.map((item: any) => (
                        <Col key={item.id}>
                            <Storeitem {...item} />
                        </Col>
                    ))}
                </Row>
                </div>
            </div>
            
            


        </Fragment>
    );
};