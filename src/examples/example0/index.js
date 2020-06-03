import React, { useState, useEffect, Suspense } from 'react';
import createResource from './api';

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
      <Suspense fallback={<div>Country is loading...</div>}>
        <Country resouce={resource.countryResource} />
      </Suspense>
    </div>
  );
}

export default SuspenseExample;