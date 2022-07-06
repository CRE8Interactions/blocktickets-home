import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { CustomTab } from './CustomTab';
import { Chart } from './Chart';

import './reports.scss';

export default function Reports({ title = "Reports" }) {

    const viewsObj = [
        "Last 24 hrs",
        "Last 7 days",
        "Last 14 days",
        "Last 30 days",
        "All time"
    ];

    const salesObj = [

        "Primary sales",
        "Secondary sales",

    ];
    const [
        key,
        setKey
    ] = useState('net');

    const [view, setView] = useState(0)
    const [sales, setSales] = useState(0)

    const handleView = view => {
        return viewsObj[view]
    }

    const handleSales = sales => {
        return salesObj[sales]
    }

    return (
        <section id="reports">
            <>
                <Row className="section-heading justify-content-flex-start">
                    <Col className='d-flex align-items-center'>
                        <h1 className="text-capitalize">{title}</h1>
                        <Form.Select value={view} onChange={(e) => setView(e.target.value)} className='ms-auto w-auto'>
                            {viewsObj.map((view, index) => (
                                <option key={index} value={index}>{view}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col sm={4}>
                        <Form.Select value={sales} onChange={(e) => setSales(e.target.value)} className='ms-auto w-auto'>
                            {salesObj.map((sales, index) => (
                                <option key={index} value={index}>{sales}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Row>
                        <Col lg={4} id="tabs">
                            <Nav as="ul" variant="pills" className="flex-column gap-3 mb-lg-0">
                                {sales == '0' ? (
                                    <>
                                        <Nav.Item as="li">
                                            <Nav.Link as="button" eventKey="net">
                                                <CustomTab title='Net sales' total="16290.82" stat="up" statAmount="1.6" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link as="button" eventKey="gross">
                                                <CustomTab title='Gross sales' total="20589.17" stat="up" statAmount="36" text={`${handleView(view)} `} sales={`${handleSales(sales)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Item as="li" className='royalties'>
                                            <Nav.Link as="button" eventKey="royalties" className='btn'>
                                                <CustomTab title='Royalties' total="20000.15" stat="up" statAmount="16" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="listed">
                                            <Nav.Link as="button" eventKey="listed">
                                                <CustomTab title='Tickets listed' amount="1500" stat="up" statAmount="36" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                )
                                }
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="tickets" className='tickets-sold'>
                                        <CustomTab title='Tickets sold' amount="500" stat="up" statAmount="23" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="views">
                                        <CustomTab title='Page views' amount="400000" stat="down" statAmount="0.6" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={8}>
                            <Tab.Content>

                                <Tab.Pane eventKey="net">
                                    <Card body>
                                        <Chart title='Net sales' total="16290.82" stat="up" statAmount="1.6" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="gross">
                                    <Card body>
                                        <Chart title='Gross sales' total="20589.17" stat="up" statAmount="36" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>

                                <Tab.Pane eventKey="royalties">
                                    <Card body>
                                        <Chart title='Royalties' total="20000.15" stat="up" statAmount="16" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="listed">
                                    <Card body>
                                        <Chart title='Tickets listed' total="1500" stat="up" statAmount="36" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>


                                <Tab.Pane eventKey="tickets">
                                    <Card body>
                                        <Chart title='Tickets sold' amount="500" stat="up" statAmount="23" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="views">
                                    <Card body>
                                        <Chart title='Page views' amount="500000" stat="down" statAmount="0.6" text={`${handleView(view)}`} sales={`${handleSales(sales)}`} />
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
        </section>
    );
}
