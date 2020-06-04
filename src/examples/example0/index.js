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
      <p>The implementation of MySuspense can work under React 16.2, but you can not use it in latest(16.13) because the Suspense works perfectly;</p>
      <button onClick={() => setResource(createResource(resource.id + 1))}>next</button>
      <Suspense fallback={<div>C1ountry is loading1...</div>}>
        <Country resouce={resource.countryResource} />
      </Suspense>
    </div>
  );
}

export default SuspenseExample;