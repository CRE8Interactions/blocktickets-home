import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { BackButton } from "./../BackButton";
import { Spinner } from '../Spinner';

import './createEventButtons.scss';

export default function CreateEventButtons({ isEditing, isDisabled = false, isSaving, handleSave, type }) {

    const getText = () => {
        if (isSaving) {
            return <Spinner variant="light" size="sm" />
        }
        else {
            if (isEditing) {
                return 'Save'
            } else {
                if (type === 'Create ticket') {
                    return type
                }
                else {
                    return "Save and continue"
                }
            }
        }
    }
    return (
        <div id="btn-footer">
            <Stack direction="horizontal" className="btn-container my-0 btn-group-flex">
                {isEditing && (
                    <Button variant="outline-light" size="lg">Discard</Button>
                )}
                {type === 'Create ticket' && (
                    <BackButton />
                )}
                <Button size="lg" disabled={isDisabled} className={`${!isEditing ? 'btn-next' : ''} `} onClick={handleSave}>{getText()}</Button>
            </Stack>
        </div>
    )
}
