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

export default function Reports() {

    const viewsObj = [
        {
            "1": "This week",
            "2": "Last month",
        }
    ];

    const salesObj = [
        {
            "1": "Primary sales",
            "2": "Secondary sales",
        }
    ];
    const [
        key,
        setKey
    ] = useState('net');

    const [view, setView] = useState("1")
    const [sales, setSales] = useState("1")

    const handleView = view => {
        return viewsObj.map(obj => obj[view])
    }

    const handleSales = sales => {
        return salesObj.map(obj => obj[sales])
    }

    return (
        <section id="reports">
            <>
                <Row className="section-heading mb-5 gap-4 justify-content-flex-start">
                    <Col className='d-flex align-items-center'>
                        <h1>Reports</h1>
                        <Form.Select value={view} onChange={(e) => setView(e.target.value)} className='ms-auto w-auto'>
                            <option value="1">This week</option>
                            <option value="2">Last month</option>
                        </Form.Select>
                    </Col>
                    <Col sm={4}>
                        <Form.Select value={sales} onChange={(e) => setSales(e.target.value)} className='ms-auto w-auto'>
                            <option value="1">Primary sales</option>
                            <option value="2">Secondary sales</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Row gap={4}>
                        <Col sm={4} id="tabs">
                            <Nav as="ul" variant="pills" className="flex-column">
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="net" className='btn'>
                                        <CustomTab title='Net sales' total="16290.82" stat="up" statAmount="1.6" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="gross">
                                        <CustomTab title='Gross sales' total="20589.17" stat="up" statAmount="36" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="tickets">
                                        <CustomTab title='Tickets sold' amount="500" stat="up" statAmount="23" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link as="button" eventKey="views">
                                        <CustomTab title='Page views' amount="500000" stat="down" statAmount="0.6" text={`${handleView(view)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col>
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
