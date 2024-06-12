import React from 'react';
import useFetch from '../Hooks/useFetch';
import { Card, Col, Row, Container, } from 'react-bootstrap';
import NavBarEx from '../components/NavBar';


function Home() {
    const { data, loading, error } = useFetch();   
    
    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <>
            <div>
                <NavBarEx/>
                <br />
                <Container>
                    <Row>
                        {data.map((item) => (
                            <Col xs={12} md={4} key={item._id} className="mb-4">
                                <Card style={{ width: '19rem' }}>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Footer>Codigo: {item.code}</Card.Footer>
                                        <Card.Text>Descripcion: {item.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;
