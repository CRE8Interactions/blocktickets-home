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

export default function Reports({ title = "Reports", stats, setRange }) {
    // const viewsOpt = [
    //     {
    //         label: "Last 24 hrs",
    //         value: '24_hrs'
    //     },
    //     {
    //         label: "Last 7 days",
    //         value: '7_days'
    //     },
    //     {
    //         label: "Last 14 days",
    //         value: '14_days'
    //     },
    //     {
    //         label: "Last 30 days",
    //         value: '30_days'
    //     },
    //     {
    //         label: "All time",
    //         value: 'all'
    //     }
    // ];

    // const salesOpt = [
    //     {
    //         label: "Primary sales",
    //         value: 'primary'
    //     },
    //     {
    //         label: "Secondary sales",
    //         value: 'secondary'
    //     }
    // ];

    // const [options, setOptions] = useState({
    //     view: viewsOpt[0].value,
    //     sales: salesOpt[0].value
    // })

    // const [
    //     key,
    //     setKey
    // ] = useState();

    // useEffect(() => {
    //     setRange({
    //         timePeriod: options.view,
    //         type: options.sales
    //     })
    // }, [options])

    // set tab key when sales option changes
    // useEffect(() => {
    //     const initialState = options.sales == "primary" ? 'net' : 'royalties';
    //     setKey(initialState)

    // }, [options.sales])

    // const handleText = (val, arr) => {
    //     const obj = arr.find(obj => obj.value == val);
    //     return obj.label
    // }

    // const handleOption = e => {
    //     setOptions({ ...options, [e.target.name]: e.target.value })
    // }

    // const getDirection = (value) => {
    //     if (Math.sign(value) === 1) return 'up' 
    //     return 'down'
    // }

    return (
        <section id="reports">
            <>
                <header className="section-header section-heading section-heading--flex justify-content-between">
                    {/* <Col className='d-flex align-items-center'> */}
                    <h1 className="text-capitalize">{title}</h1>
                    <small className='caption text-muted'>Data refreshes automatically every 15 seconds</small>
                    {/* <Form.Select name="view" onChange={handleOption} value={options.view} className='ms-auto w-auto'>
                            {viewsOpt.map((view, index) => (
                                <option key={index} value={view.value}>{view.label}</option>
                            ))}
                        </Form.Select> */}
                    {/* </Col> */}
                    {/* <Col sm={4}>
                        <Form.Select name="sales" onChange={handleOption} value={options.sales} className='ms-auto w-auto'>
                            {salesOpt.map((sales, index) => (
                                <option key={index} value={sales.value}>{sales.label}</option>
                            ))}
                        </Form.Select>
                    </Col> */}
                </header>
                {/* <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <Row>
                        <Col lg={4} id="tabs">
                            <Nav as="ul" className="flex-column mb-lg-0">
                                {options.sales == 'primary' ? (
                                    <>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="net">
                                                <CustomTab title='Net sales' total={stats?.primaryNetSales} stat={getDirection(stats?.primaryGrossSalesRangeChange)} statAmount={stats?.primaryGrossSalesRangeChange} view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li">
                                            <Nav.Link eventKey="gross">
                                                <CustomTab title='Gross sales' total={stats?.primaryGrossSales} stat={getDirection(stats?.primaryGrossSalesRangeChange)} statAmount={stats?.primaryGrossSalesRangeChange} view={`${handleText(options.view, viewsOpt)} `} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Item as="li" className='royalties'>
                                            <Nav.Link eventKey="royalties">
                                                <CustomTab title='Royalties' total="0" stat="up" statAmount="16" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" className="listed">
                                            <Nav.Link eventKey="listed">
                                                <CustomTab title='Tickets listed' amount={stats?.ticketsListed} stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                            </Nav.Link>
                                        </Nav.Item>
                                    </>
                                )
                                }
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="tickets" className='tickets-sold'>
                                        <CustomTab title='Tickets sold' amount={stats?.primaryTicketsSold} stat={getDirection(stats?.totalSoldQueryPercentage)} statAmount={stats?.totalSoldQueryPercentage} view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link eventKey="views">
                                        <CustomTab title='Page views' amount={stats?.pageViews} stat={getDirection(stats?.pageViewsRangeChange)} statAmount={stats?.pageViewsRangeChange} view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="net">
                                    <Card body>
                                        <Chart title='Net sales' total={stats?.primaryNetSales} stat={getDirection(stats?.primaryGrossSalesRangeChange)} statAmount={stats?.primaryGrossSalesRangeChange} view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="gross">
                                    <Card body>
                                        <Chart title='Gross sales' total={stats?.primaryGrossSales} stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>

                                <Tab.Pane eventKey="royalties">
                                    <Card body>
                                        <Chart title='Royalties' total="0" stat="up" statAmount="16" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="listed">
                                    <Card body>
                                        <Chart title='Tickets listed' total="0" stat="up" statAmount="36" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>


                                <Tab.Pane eventKey="tickets">
                                    <Card body>
                                        <Chart title='Tickets sold' amount={stats?.primaryTicketsSold} stat="up" statAmount="23" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="views">
                                    <Card body>
                                        <Chart title='Page views' amount={stats?.pageViews} stat="down" statAmount="0.6" view={`${handleText(options.view, viewsOpt)}`} sales={`${handleText(options.sales, salesOpt)}`} />
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container> */}
            </>
        </section>
    );
}
