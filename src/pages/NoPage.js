import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function NoPage(){
    return(
        <>
            <Container className="py-4">
                <Row>
                    <Col>
                        <h1>404 Page not found</h1>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default NoPage;