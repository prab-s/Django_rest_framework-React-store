import { Card } from "react-bootstrap";

type StoreItemProps = {
    id: number,
    title: string,
    description: string,
    price: number,
    sku_num: number,
    stock_quant: number,
    img_url: string

}

export function Storeitem({ id, title, description, price, sku_num, stock_quant, img_url }:StoreItemProps) {
    return (
        <Card>
            <Card.Img variant="top" src={img_url} height="auto" className="shadow-lg"/>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{title}</span>
                    <span className="ms-2 text-muted">${price}</span>
                </Card.Title>
                <hr></hr>
                <Card.Subtitle className="d-flex">
                    <span className="ms-2">{description}</span>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}