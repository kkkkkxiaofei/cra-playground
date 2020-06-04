import React, { useState, useEffect, Suspense } from 'react';
import createResource from './api';
import MySuspense from './MySuspense';

const Country = props => {
  const country = props.resouce.read();
  return (
    <div>
      <h1>{country}</h1>
    </div>
  )
}

const SuspenseExample = () => {
  const [resource, setResource] = useState(createResource(0));
  return (
    <div>
      <button onClick={() => setResource(createResource(resource.id + 1))}>next</button>
      <MySuspense fallback={<div>C1ountry is loading1...</div>}>
        <Country resouce={resource.countryResource} />
      </MySuspense>
    </div>
  );
}

export default SuspenseExample;