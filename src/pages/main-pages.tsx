import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderScreen from '../components/header.tsx';
import NavigationScreen from '../components/navigation.tsx';
import HeaderDescriptionScreen from '../components/header-description-components.tsx';
import SortComponentsScreen from '../components/sort-components.tsx';
import OfferList from '../components/offer-list.tsx';
import Map from '../components/map.tsx';
import { CITIES } from '../const/const.ts';
import { MainScreenProps } from '../types/type.ts';

function MainScreen({ apartCount, email, offers }: MainScreenProps): JSX.Element {
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0]);


  const cityOffers = offers.filter((offer) => offer.city === selectedCity);

  return (
    <>
      <HeaderScreen apartCount={apartCount} email={email} />
      <main className="page__main page__main--index">
        <Helmet>
          <title>6 cities</title>
        </Helmet>
        <h1 className="visually-hidden">Cities</h1>

        {}
        <NavigationScreen selectedCity={selectedCity} onCityChange={setSelectedCity} />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <HeaderDescriptionScreen number={cityOffers.length} city={selectedCity} />
              <SortComponentsScreen />
              <OfferList offers={cityOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {}
                <Map offers={cityOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MainScreen;
