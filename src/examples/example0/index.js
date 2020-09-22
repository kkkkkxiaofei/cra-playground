import React, { useState, useEffect, Suspense, useMemo } from 'react';
import createResource, { fetchCountry } from './api';

const Country = props => {
  const country = props.resouce.read();
  return (
    <div>
      <h1>{country}</h1>
    </div>
  )
}
const SuspenseExample = () => {
  return (
    <>
      <WithSuspense />
      <NoSuspense />
    </>
  )
}

const WithSuspense = () => {
  const [id, setId] = useState(0);
  console.log('====WithSuspense====');
  return (
    <div>
      <p>The implementation of MySuspense can work under React 16.2, but you can not use it in latest(16.13) because the Suspense works perfectly;</p>
      <button onClick={() => setId(id + 1)}>next</button>
      <Suspense fallback={<div>C1ountry is loading1...</div>}>
        <Country resouce={createResource(id).countryResource} />
      </Suspense>
    </div>
  );
}

const NoSuspense = () => {
  const [id, setId] = useState(0);
  const [result, setResult] = useState('');
  console.log('====NoSuspense====', id);
  useEffect(() => {
    fetchCountry(id).then(result => setResult(result));
  }, [id]);
  

  const onClick = () => setId(id + 1);
  return (
    <div>
      <p>click next very quickly to see the concurrency impact;</p>
      <button onClick={onClick}>next</button>
      <div>{result}</div>
    </div>
  );
}

export default SuspenseExample;