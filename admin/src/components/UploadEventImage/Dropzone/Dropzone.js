import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from 'react-bootstrap/Button';

import './dropzone.scss';

export default function Dropzone({ handleUpload }) {
	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result;
				console.log(binaryStr);
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': []
		},
		onDrop: (acceptedFiles) => {
			handleUpload(acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
		}
	});

	return (
		<div {...getRootProps()} id="dropzone">
			<input {...getInputProps()} />
			<Button variant="default" className="btn-upload">
				Click or drop image
			</Button>
		</div>
	);
}
