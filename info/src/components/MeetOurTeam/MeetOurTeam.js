import React from 'react'

import Stack from 'react-bootstrap/Stack';

import { Member } from './Member'

import './meet-our-team.scss';

import harrisonCogan from '../../assets/profiles/harrison_cogan.png'
import chazHaskins from '../../assets/profiles/chaz_haskins.png'
import jaimeConvery from '../../assets/profiles/jaime_convery.png'
import florencSinanaj from '../../assets/profiles/florenc_sinanaj.png'

export default function MeetOurTeam() {

    const teamMembers = [
        {
            name: 'Harrison Cogan',
            title: 'Project Manager & Sales',
            profile: `${harrisonCogan}`
        },
        {
            name: 'Chaz Haskins',
            title: 'Back-End Developer',
            profile: `${chazHaskins}`
        },
        {
            name: 'Jaime Convery',
            title: 'Front-End Developer',
            profile: `${jaimeConvery}`
        },
        {
            name: 'Florenc Sinanaj',
            title: 'UX/UI Designer',
            profile: `${florencSinanaj}`
        },
    ]
    return (
        <section className='team'>
            <div className="section-header">
                <h1 className='section-heading-sm'>Meet our team</h1>
                <h2 className="subtitle">We are a tight knit team of four that specialize in project management, sales, user interface/experience, frontend and backend development.</h2>
            </div>
            <Stack gap={5} className="team-members-container flex-md-row">
                {teamMembers.map((member, index) => (
                    <Member key={index} member={member} />
                ))}
            </Stack>
        </section>
    )
}
