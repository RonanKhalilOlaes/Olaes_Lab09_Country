import Country from './Country';

function Countries({ countries }) {
  return (
    <div>
      {countries.map((country) => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
}

export default Countries;
