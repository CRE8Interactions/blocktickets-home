import React from 'react';
import { createRoot } from 'react-dom/client';
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import './scss/main.scss';

// Sentry.init({
// 	dsn: "https://5eae7ca6e6c449aa966af69375b3eb82@o1168708.ingest.sentry.io/6260841",
// 	integrations: [new BrowserTracing()],

// 	// Set tracesSampleRate to 1.0 to capture 100%
// 	// of transactions for performance monitoring.
// 	// We recommend adjusting this value in production
// 	tracesSampleRate: 1.0,
// });

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
