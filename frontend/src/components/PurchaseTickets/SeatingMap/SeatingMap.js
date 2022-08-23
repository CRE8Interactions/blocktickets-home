import React from 'react';

import './seatingMap.scss';
import generalAdmissionsMap from '../../../assets/map-general_admissions.svg';
import seatingMap from '../../../assets/map-seating.svg';

export default function SeatingMap({ styles, eventType, setIsZoomed }) {
    const onClick = () => {
        if (eventType === 'genAdmission') {
            return setIsZoomed(true);
        }
        else return;
    };
    return (
        <div className={`map align-items-center justify-content-around ${styles && styles}`}>
            <img
                onClick={onClick}
                src={eventType === 'genAdmission' ? generalAdmissionsMap : seatingMap}
                alt="Map"
            />
        </div>
    );
}
