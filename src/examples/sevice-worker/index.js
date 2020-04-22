import React, { useEffect, useState } from 'react';

const SWComponent = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "omit",
        body: JSON.stringify({
          query:" { restaurants(type: null, stars: null) { name type map stars } } "
        })
      })
      .then(res => res.json())
      .then(data => setRestaurants(data.data.restaurants))
    // fetch("https://us-central1-sw-graphql.cloudfunctions.net/graphql/", {"credentials":"omit","headers":{"cache-control":"max-age=60","content-type":"application/json"},"referrer":"https://sw-graphql.firebaseapp.com/","referrerPolicy":"no-referrer-when-downgrade","body":"{\"query\":\" { restaurants(type: null, stars: null) { name type map stars } } \"}","method":"POST","mode":"cors"});
  }, []);
return (
  <div>{restaurants.map(({ name, stars }) => (
  <div>{`name: ${name}, stars: ${stars}`}</div>
  ))}</div>
)
};

export default SWComponent;
