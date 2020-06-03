import React, { useState, useEffect } from 'react';
import { fetchCountry, fetchCities } from './api';

const Country = props => {
  const { id, fetchCountry } = props;
  const [country, setCountry] = useState();

  useEffect(() => {
    fetchCountry(id).then(result => setCountry(result))
  },[id])
  
  return (
    <div>
      <h1>{country}</h1>
    </div>
  )
}

const SuspenseExample = () => {
  const [id, setId] = useState(0);
  return (
    <div>
      <button onClick={() => setId(id + 1)}>next</button>
      <Country id={id} fetchCountry={fetchCountry} />
    </div>
  );
}

export default SuspenseExample;