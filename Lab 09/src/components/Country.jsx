function Country({ country }) {
    const { flags, name, capital, population, area, continents, subregion } = country;
  
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
        <img src={flags.svg} alt={`${name.common} flag`} width="100" />
        <h1>{name.common}</h1>
        <p><strong>Capital:</strong> {capital ? capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
        <p><strong>Continents:</strong> {continents.join(', ')}</p>
        <p><strong>Sub-region:</strong> {subregion || 'N/A'}</p>
      </div>
    );
  }
  
  export default Country;
  