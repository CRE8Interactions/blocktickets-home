import React from 'react'

import { ContactForm } from '../../components'

export default function SellPage() {
    return (
        <section>
            <div className="section-header">
                <h1 className='section-heading-sm'>Start selling tickets with us today</h1>
                <h2 className="subtitle text-muted">Fill out the form below and join the movement!</h2>
            </div>
            <ContactForm />

        </section>
    )
}
