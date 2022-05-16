import React, { useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './numpad.scss';

export default function Numpad({ price, setPrice }) {
	useEffect(
		() => {
			if (price === '') {
				setPrice(0);
			}
		},
		[
			price
		]
	);

	const handleClick = (val, key) => {
		if (!key) {
			if (price === 0 || price.length < 6) {
				if (price === 0) {
					setPrice(val);
				}
				else {
					setPrice((prevState) => prevState + val);
				}
			}
		}
		else if (price > 0 && key === 'backspace') {
			setPrice(price.slice(0, -1));
		}
	};

	return (
		<div id="numpad">
			<Stack direction="horizontal" className="split-row">
				<Button value="1" variant="default" onClick={(e) => handleClick(e.target.value)}>
					1
				</Button>
				<Button value="2" variant="default" onClick={(e) => handleClick(e.target.value)}>
					2
				</Button>
				<Button value="3" variant="default" onClick={(e) => handleClick(e.target.value)}>
					3
				</Button>
			</Stack>

			<Stack direction="horizontal" className="split-row">
				<Button value="4" variant="default" onClick={(e) => handleClick(e.target.value)}>
					4
				</Button>
				<Button value="5" variant="default" onClick={(e) => handleClick(e.target.value)}>
					5
				</Button>
				<Button value="6" variant="default" onClick={(e) => handleClick(e.target.value)}>
					6
				</Button>
			</Stack>
			<Stack direction="horizontal" className="split-row">
				<Button value="7" variant="default" onClick={(e) => handleClick(e.target.value)}>
					7
				</Button>
				<Button value="8" variant="default" onClick={(e) => handleClick(e.target.value)}>
					8
				</Button>
				<Button value="9" variant="default" onClick={(e) => handleClick(e.target.value)}>
					9
				</Button>
			</Stack>
			<Stack direction="horizontal" className="split-row">
				<Button value="." variant="default" onClick={(e) => handleClick(e.target.value)}>
					.
				</Button>
				<Button value="0" variant="default" onClick={(e) => handleClick(e.target.value)}>
					0
				</Button>
				<Button
					value=""
					variant="default"
					onClick={(e) => handleClick(undefined, 'backspace')}>
					&larr;
				</Button>
			</Stack>
		</div>
	);
}
