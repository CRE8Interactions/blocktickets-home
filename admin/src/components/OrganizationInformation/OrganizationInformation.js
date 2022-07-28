import React, { useEffect, useState } from 'react'

import { stateOpt } from '../../utilities/helpers'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

export default function OrganizationInformation({ getOrgInfo }) {

    const [org, setOrg] = useState({
        orgName: '',
        address: '',
        city: '',
        zip_code: '',
        state: stateOpt[0].value
    })

    // update parent state when state changes 
    useEffect(() => {
        getOrgInfo(org)
    }, [org])

    const handleOrg = (e) => {
        setOrg({ ...org, [e.target.name]: e.target.value })
    }

    return (
        <Form>
            <Form.Group className='form-group' controlId="identifier">
                <Form.Label>Organization name</Form.Label>
                <Form.Control
                    type="text"
                    name="orgName"
                    required
                    placeholder="Enter organization name"
                    value={org.orgName}
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
                        value={org.address}
                        onChange={handleOrg}
                    />
                    <Form.Control
                        type="text"
                        name="city"
                        aria-label="City"
                        required
                        placeholder="City"
                        value={org.city}
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
                                value={org.zip_code}
                                onChange={handleOrg}
                            />
                        </Col>
                        <Col className='ps-0'>
                            <Form.Select aria-label="State" value={org.state} onChange={(e) => handleOrg(e)} required name="state">
                                {stateOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Stack>
            </fieldset>
        </Form>
    )
}
