import React from 'react'

import { Hero, Benefits, Sectors, Features, Values, CTA } from '../../components'

export default function AboutUsPage() {
    return (
        <div className='spacer'>
            <Hero />
            <Benefits />
            <Sectors />
            <Features />
            <Values />
            <CTA />
        </div>
    )
}
