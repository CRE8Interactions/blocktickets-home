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
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	return { ref, isComponentVisible, setIsComponentVisible };
};

// JS Media Query hook
export const useMedia = (query) => {
	const [
		isMatching,
		setIsMatching
	] = useState(window.matchMedia(query).matches);

	useEffect(
		() => {
			let media = window.matchMedia(query);
			if (media.matches !== isMatching) {
				setIsMatching(media.matches);
			}
			let listener = () => setIsMatching(media.matches);
			media.addEventListener('change', listener);
			return () => media.removeEventListener('change', listener);
		},
		[
			query
		]
	);

	return isMatching;
};
