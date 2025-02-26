import { CITIES } from '../const/const';

type NavigationScreenProps = {
  selectedCity: string;
  onCityChange: (city: string) => void;
};

function NavigationScreen({ selectedCity, onCityChange }: NavigationScreenProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default NavigationScreen;
