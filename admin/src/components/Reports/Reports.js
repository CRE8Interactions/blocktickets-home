import React, { useState, useEffect } from 'react';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { CustomTab } from './CustomTab';
import { Chart } from './Chart';

import './reports.scss';

export default function Reports({ title = "Reports", event, orders }) {
    const viewsOpt = [
        {
            label: "Last 24 hrs",
            value: '24_hrs'
        },
        {
            label: "Last 7 days",
            value: '7_days'
        },
        {
            label: "Last 14 days",
            value: '14_days'
        },
        {
            label: "Last 30 days",
            value: '30_days'
        },
        {
            label: "All time",
            value: 'all'
        }
    ];

    const salesOpt = [
        {
            label: "Primary sales",
            value: 'primary'
        },
        {
            label: "Secondary sales",
            value: 'secondary'
        }
    ];

    const [options, setOptions] = useState({
        view: viewsOpt[0].value,
        sales: salesOpt[0].value
    })

    const [
        key,
        setKey
    ] = useState();

    let ticketsSold = orders?.map((order) => order?.details?.ticketCount);
    ticketsSold = ticketsSold?.reduce((a, b) => a + b, 0);
    let grossSales = orders?.map((order) => order?.details?.ticket?.cost * order?.details?.ticketCount);
    grossSales = grossSales?.reduce((a, b) => a + b, 0);
    let netSales = orders?.map((order) => (order?.details?.ticket?.cost) - (order?.details?.ticket?.fee + order?.details?.ticket?.facilityFee));
    netSales = netSales?.reduce((a, b) => a + b, 0);
    console.log('TS ', netSales)

    // set tab key when sales option changes
    useEffect(() => {
        const initialState = options.sales == "primary" ? 'net' : 'royalties';
        setKey(initialState)

    }, [options.sales])

    const handleText = (val, arr) => {
        const obj = arr.find(obj => obj.value == val);
        return obj.label
    }

    const handleOption = e => {
        setOptions({ ...options, [e.target.name]: e.target.value })
    }

    return (
        <section id="reports">
            <>
                <Row as="header" className="section-header section-heading section-heading--flex justify-content-flex-start">
                    <Col className='d-flex align-items-center'>
                        <h1 className="text-capitalize">{title}</h1>
                        <Form.Select name="view" onChange={handleOption} value={options.view} className='ms-auto w-auto'>
                            {viewsOpt.map((view, index) => (
                                <option key={index} value={view.value}>{view.label}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col sm={4}>
                        <Form.Select name="sales" onChange={handleOption} value={options.sales} className='ms-auto w-auto'>
                            {salesOpt.map((sales, index) => (
                                <option key={index} value={sales.value}>{sales.label}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Row>
                        <Col lg={4} id="tabs">
                            <Nav as="ul" className="flex-column mb-lg-0">
                                {options.sales == 'primary' ? (
                                    <>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="net">
                                                <CustomTab title='Net sales' total={netSales} stat="up" statAmount="1.6" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="gross">
                                                <CustomTab title='Gross sales' total={parseFloat(grossSales)} stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)} `} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Item as="li" className='royalties'>
                                            <Nav.Link eventKey="royalties">
                                                <CustomTab title='Royalties' total="20000.15" stat="up" statAmount="16" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="listed">
                                            <Nav.Link eventKey="listed">
                                                <CustomTab title='Tickets listed' amount="1500" stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                )
                                }
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="tickets" className='tickets-sold'>
                                        <CustomTab title='Tickets sold' amount={ticketsSold} stat="up" statAmount="23" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="views">
                                        <CustomTab title='Page views' amount={event ? Number(event?.page_views.length) : 0} stat="down" statAmount="0.6" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="net">
                                    <Card body>
                                        <Chart title='Net sales' total={netSales} stat="up" statAmount="1.6" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="gross">
                                    <Card body>
                                        <Chart title='Gross sales' total={grossSales} stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>

                                <Tab.Pane eventKey="royalties">
                                    <Card body>
                                        <Chart title='Royalties' total="20000.15" stat="up" statAmount="16" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="listed">
                                    <Card body>
                                        <Chart title='Tickets listed' total="1500" stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>


                                <Tab.Pane eventKey="tickets">
                                    <Card body>
                                        <Chart title='Tickets sold' amount={ticketsSold} stat="up" statAmount="23" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="views">
                                    <Card body>
                                        <Chart title='Page views' amount={event ? Number(event?.page_views.length) : 0} stat="down" statAmount="0.6" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
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
