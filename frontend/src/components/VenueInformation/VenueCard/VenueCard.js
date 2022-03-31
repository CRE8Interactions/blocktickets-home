import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { IconButton } from '../../IconButton';

import twitter from '../../../assets/icons/twitter.svg';
import instagram from '../../../assets/icons/instagram.svg';
import facebook from '../../../assets/icons/facebook.svg';

import './venueCard.scss';

export default function VenueCard() {
	return (
		<Card body className="card--light text-center d-flex flex-column">
			<Card.Img className="rounded-circle" width="160" height="160" />
			<Card.Title as="h5" className="fs-md">
				CODA venue with a long long name
			</Card.Title>
			<Card.Subtitle as="p" className="fs-md">
				12345 Fifth Ave, New York NY United States
			</Card.Subtitle>
			<Card.Text className="caption text-muted">
				A short / long description of the venue goes there. This can be extended to a 5-10
				rows of text
			</Card.Text>
			<Stack
				direction="horizontal"
				className="justify-content-center gap-2 mt-3 btn-group-flex">
				<IconButton link="" variant="primary" btn="location" styles="mt-0">
					Location
				</IconButton>
				<Button variant="outline-light" className="btn--icon" aria-label="Save Venue">
					<svg
						role="img"
						tile="save"
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M7.99882 8.36657C8.02332 8.82615 7.67061 9.21858 7.21103 9.24308C6.58379 9.27652 6.087 9.31742 5.69878 9.35836C5.17743 9.41335 4.86065 9.73359 4.80799 10.1942C4.73238 10.8556 4.66667 11.8565 4.66667 13.3334C4.66667 14.8102 4.73238 15.8111 4.80799 16.4725C4.86074 16.9339 5.17672 17.2532 5.69729 17.3082C6.60898 17.4044 8.11604 17.5 10.5 17.5C12.884 17.5 14.391 17.4044 15.3027 17.3082C15.8233 17.2532 16.1393 16.9339 16.192 16.4725C16.2676 15.8111 16.3333 14.8102 16.3333 13.3334C16.3333 11.8565 16.2676 10.8556 16.192 10.1942C16.1394 9.73359 15.8226 9.41335 15.3012 9.35836C14.913 9.31742 14.4162 9.27652 13.789 9.24308C13.3294 9.21858 12.9767 8.82615 13.0012 8.36657C13.0257 7.90698 13.4181 7.55428 13.8777 7.57878C14.5301 7.61356 15.0558 7.65657 15.476 7.70089C16.713 7.83135 17.6997 8.70893 17.8479 10.0049C17.9323 10.7436 18 11.8096 18 13.3334C18 14.8571 17.9323 15.9231 17.8479 16.6618C17.6998 17.957 16.7154 18.835 15.4776 18.9656C14.4933 19.0695 12.9257 19.1667 10.5 19.1667C8.07435 19.1667 6.50672 19.0695 5.52236 18.9656C4.28459 18.835 3.30017 17.957 3.15211 16.6618C3.06767 15.9231 3 14.8571 3 13.3334C3 11.8096 3.06767 10.7436 3.15211 10.0049C3.30026 8.70893 4.28697 7.83135 5.52397 7.70089C5.94422 7.65657 6.46994 7.61356 7.1223 7.57878C7.58189 7.55428 7.97432 7.90698 7.99882 8.36657Z"
							fill="#777E91"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M8.17259 5.17257C7.84715 5.49801 7.31951 5.49801 6.99408 5.17257C6.66864 4.84713 6.66864 4.31949 6.99408 3.99406L9.91074 1.07739C10.2362 0.751954 10.7638 0.751954 11.0893 1.07739L14.0059 3.99406C14.3314 4.31949 14.3314 4.84713 14.0059 5.17257C13.6805 5.49801 13.1528 5.49801 12.8274 5.17257L11.3333 3.67849V11.6666C11.3333 12.1269 10.9602 12.5 10.5 12.5C10.0398 12.5 9.66667 12.1269 9.66667 11.6666V3.67849L8.17259 5.17257Z"
							fill="#777E91"
						/>
					</svg>
				</Button>

				<Button variant="outline-light" className="btn--icon" aria-label="Visit Website">
					<svg
						role="img"
						title="Visit Website"
						width="21"
						height="20"
						viewBox="0 0 21 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.5 16.6667C14.1819 16.6667 17.1666 13.6819 17.1666 10C17.1666 6.31812 14.1819 3.33335 10.5 3.33335C6.81806 3.33335 3.83329 6.31812 3.83329 10C3.83329 13.6819 6.81806 16.6667 10.5 16.6667ZM10.5 18.3334C15.1023 18.3334 18.8333 14.6024 18.8333 10C18.8333 5.39765 15.1023 1.66669 10.5 1.66669C5.89759 1.66669 2.16663 5.39765 2.16663 10C2.16663 14.6024 5.89759 18.3334 10.5 18.3334Z"
							fill="#777E91"
						/>
						<path
							fillRule="evenodd"
							cliRule="evenodd"
							d="M11.9556 15.1472C12.5712 13.916 13 12.0986 13 10C13 7.90147 12.5712 6.08399 11.9556 4.85282C11.2902 3.52196 10.6793 3.33335 10.5 3.33335C10.3208 3.33335 9.70991 3.52196 9.04447 4.85282C8.42889 6.08399 8.00004 7.90147 8.00004 10C8.00004 12.0986 8.42889 13.916 9.04447 15.1472C9.70991 16.4781 10.3208 16.6667 10.5 16.6667C10.6793 16.6667 11.2902 16.4781 11.9556 15.1472ZM10.5 18.3334C12.8012 18.3334 14.6667 14.6024 14.6667 10C14.6667 5.39765 12.8012 1.66669 10.5 1.66669C8.19885 1.66669 6.33337 5.39765 6.33337 10C6.33337 14.6024 8.19885 18.3334 10.5 18.3334Z"
							fill="#777E91"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M18.7921 10.8334C18.8194 10.5593 18.8333 10.2813 18.8333 10C18.8333 9.71877 18.8194 9.44078 18.7921 9.16669H2.20777C2.18056 9.44078 2.16663 9.71877 2.16663 10C2.16663 10.2813 2.18056 10.5593 2.20777 10.8334H18.7921Z"
							fill="#777E91"
						/>
					</svg>
				</Button>
			</Stack>
			<Stack as="ul" direction="horizontal" className="my-5 justify-content-center" gap={3}>
				<li>
					<img src={twitter} alt="twitter" />
				</li>
				<li>
					<img src={instagram} alt="instagram" />
				</li>
				<li>
					<img src={facebook} alt="facebook" />
				</li>
			</Stack>
			<Card.Footer className="pt-5">
				<span className="caption text-muted">179 Streamed shows</span>
			</Card.Footer>
		</Card>
	);
}
