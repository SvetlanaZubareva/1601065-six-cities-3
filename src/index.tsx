import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.tsx';
import { Setting } from './const/const.ts';
import { offers } from './mocks/offers.ts';
import { reviews } from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      apartCount={Setting.apartCount}
      email={Setting.email}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
);
