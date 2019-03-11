import Link from 'next/link';
import React from "react";
import Layout from "../components/Layout";
import {Container, Row, Col} from "reactstrap";

const Index = () => (
        <Layout header={false} menu={false}>
            <Container className="vh-100">
                <Row className="h-100 justify-content-center align-items-center">
                    <Col xs="12" className="d-flex justify-content-center align-items-center">
                        <ul className="list-unstyled">
                            <li>
                                <Link href="/about">
                                    <a >about</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/work">
                                    <a >work</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <a>contact</a>
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row> 
            </Container>
        </Layout>
)

export default Index