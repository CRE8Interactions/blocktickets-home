import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './textEditor.scss';

export default function TextEditor({ handleChange }) {
    return (
        <div className="App">
            <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}
