import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './textEditor.scss';

export default function TextEditor({ handleChange, event }) {
    return (
        <div className="App">
            <CKEditor
                editor={ClassicEditor}
                data={event && event?.summary ? event?.summary : ''}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    handleChange(data)
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor.getData());
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}
