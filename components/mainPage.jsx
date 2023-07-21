"use client";
import Image from "next/image";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

export default function Mainpage({ data }) {

    return (
        <Container className="p-3">
            <h1 className="mb-5">Электронные торги по банкротству</h1>

            <Row xs={1} md={3} className="g-4">
                {data.map((item, idx) => (
                    <Col key={idx}>
                        <Card>
                            {/* <Card.Img variant="top" src={item.image} /> */}
                            <Image src={item.image} alt={item.title} width={350} height={265} className="card-img-top" />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.text}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Сумма: {item.summ} ₽</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href={item.link} target="_blank">Ссылка</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
