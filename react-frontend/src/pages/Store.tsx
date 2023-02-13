import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Storeitem } from "../components/storeitem";
import AuthContext from "../context/AuthContext";

export function Store() {

    const [items, setItems] = useState<any>([])
    let { errMsg, authTokens }: any = useContext(AuthContext)

    const getItems = async () => {
        try {
            let response = await fetch(`http://${window.location.hostname}:8000/api/store_items/`, {
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

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Fragment>
            <h1>Store</h1>

            <Row md={2} xs={1} lg={3} className="g-3">
                {items.map((item: any) => (
                    <Col key={item.id}>
                        <Storeitem {...item} />
                    </Col>
                ))}
            </Row>


        </Fragment>
    );
};