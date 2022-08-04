import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TaxCard } from "./TaxCard";
import { TaxWrapper } from '../TaxWrapper';
import { BackButton } from "../BackButton";

export default function TaxStatusWrapper() {

    const [taxStatus, setTaxStatus] = useState()

    const [showForm, setShowForm] = useState(false)

    const [step, setStep] = useState();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [step])

    const handleGoBack = () => setStep(step - 1)

    const handleStep = () => setStep(step + 1)

    const handleClick = () => {
        if (step === 3) {
            setShowForm(false)
        }
        else {
            handleStep();
        }
    }

    return (
        <>
            <section className='wrapper'>
                <header className="section-header">
                    <div className="section-heading section-heading--secondary">
                        <h1>Tax status</h1>
                    </div>
                    <p className='section-header-desc'>Fill out a W-9 form in order to receive your funds.</p>
                </header>
                <Card body className='card--sm'>
                    {!showForm ? (
                        <>
                            {taxStatus ? (
                                <TaxCard show={setShowForm} />
                            ) : (
                                <Button size="lg" className="btn-tax w-100" onClick={() => setShowForm(true)}>Fill out W9 form</Button>
                            )}
                        </>
                    ) : (
                        <TaxWrapper step={step} setStep={setStep} getTaxDetails={setTaxStatus} />
                    )}
                </Card>
                {showForm && (
                    <Stack direction="horizontal" className="btn-group-flex">
                        {step !== 1 && (
                            <BackButton handleGoBack={handleGoBack} size="lg" />
                        )}
                        <Button className='btn-next' size="lg" onClick={handleClick}>{step === 3 ? 'Submit' : 'Next'}</Button>
                    </Stack>
                )}
            </section>

        </>
    );
}
