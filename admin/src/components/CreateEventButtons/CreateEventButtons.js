import React from 'react';
import { Link } from 'react-router-dom';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BackButton } from "./../BackButton";
import { Spinner } from '../Spinner';

export default function CreateEventButtons({ isEditing, isDisabled = false, isSaving, handleSave, page, styles }) {

    const getText = () => {
        if (isSaving) {
            return <Spinner variant="light" size="sm" />
        }
        else {
            if (isEditing) {
                return 'Save'
            } else {
                if (page === 'Create ticket') {
                    return page
                }
                else {
                    return "Save and continue"
                }
            }
        }
    }
    return (
        <div className={`btn-footer ${styles}`}>
            <Stack direction="horizontal" className="wrapper btn-group-flex">

                {page === 'Create ticket' && (
                    <BackButton />
                )}

                {!page && (
                    <Button variant="outline-light" size="lg">Discard</Button>
                )}

                <Button size="lg" disabled={isDisabled} className={`${!isEditing && !isSaving ? 'btn-next' : ''} ${!isEditing ? 'btn-width' : ''} `} onClick={handleSave}>{getText()}</Button>

            </Stack>
        </div>
    )
}
