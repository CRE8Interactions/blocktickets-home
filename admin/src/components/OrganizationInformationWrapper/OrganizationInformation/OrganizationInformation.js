import React from 'react'

import { stateOpt } from '../../../utilities/helpers'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

export default function OrganizationInformation({ org, handleOrg }) {
    return (
        <Form>
            <Form.Group className='form-group' controlId="name">
                <Form.Label>Organization name</Form.Label>
                <Form.Control
                    type="text"
                    name="orgName"
                    required
                    placeholder="Enter organization name"
                    value={org?.name}
                    onChange={handleOrg}
                />
            </Form.Group>
            <fieldset className='form-group'>
                <legend className="form-label">Address</legend>
                <Stack gap={2}>
                    <Form.Control
                        type="text"
                        name="address"
                        aria-label="Address"
                        required
                        placeholder="Address"
                        value={org?.address}
                        onChange={handleOrg}
                    />
                    <Form.Control
                        type="text"
                        name="city"
                        aria-label="City"
                        required
                        placeholder="City"
                        value={org?.city}
                        onChange={handleOrg}
                    />
                    <Row>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                name="zip_code"
                                aria-label="Zip Code"
                                required
                                placeholder="Zip code"
                                value={org?.zip_code}
                                onChange={handleOrg}
                            />
                        </Col>
                        <Col className='ps-0'>
                            <Form.Select aria-label="State" value={org?.state} onChange={handleOrg} name="state">
                                {stateOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Stack>
            </fieldset>
        </Form>
    )
}
