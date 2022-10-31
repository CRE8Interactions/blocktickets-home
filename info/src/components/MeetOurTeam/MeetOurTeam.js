import React from 'react'

import Stack from 'react-bootstrap/Stack';

import { Member } from './Member'

export default function MeetOurTeam() {

    const teamMembers = [
        {
            name: 'Harrison Cogan',
            title: 'Project Manager & Sales',
            profile: ''
        },
        {
            name: 'Chaz Haskins',
            title: 'Back-End Developer',
            profile: ''
        },
        {
            name: 'Jaime Convery',
            title: 'Front-End Developer',
            profile: ''
        },
        {
            name: 'Florenc Sinanaj',
            title: 'UX/UI Designer',
            profile: ''
        },
    ]
    return (
        <section>
            <div className="section-header text-center">
                <h1 className='section-heading-sm'>Meet our team</h1>
                <h2 className="subtitle">We are a tight knit team of four that specialize in project management, sales, user interface/experience, frontend and backend development.</h2>
            </div>
            <Stack gap={3} className="flex-lg-row">
                {teamMembers.map((member, index) => (
                    <Member key={index} member={member} />
                ))}
            </Stack>
        </section>
    )
}
