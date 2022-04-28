import React, { useState, useEffect, useRef } from 'react';

export const useWindowSize = () => {
	const [
		windowSize,
		setWindowSize
	] = useState(undefined);
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize(window.innerWidth);
		}
		// Add event listener
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
};

export const useOnOutsideClick = () => {
	const [
		isComponentVisible,
		setIsComponentVisible
	] = useState(false);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsComponentVisible(!isComponentVisible);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, !isComponentVisible);

		return () => {
			document.removeEventListener('click', handleClickOutside, !isComponentVisible);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
};
