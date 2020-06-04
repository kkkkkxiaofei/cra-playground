class MyError extends Error {
  constructor(p, ...others) {
    super(...others);
    this.promise = p;
  }
}

const wrapPromise = promise => {
  let status = 'pending';
  let result;
  
  promise.then(data => {
    status = 'resolved';
    result = data;
  })
  .catch(e => {
    status = 'rejected';
    result = e;
  });

  return {
    read: () => {
      console.log(status, '========')
      switch(status) {
        case 'pending': throw promise;
        case 'resolved': return result;
        case 'rejected': throw new Error(result);
        default: throw new Error(result);
      }
    }
  }
}

const countries = ['China0', 'Aus1', 'US2'];
const cities = [
  [`Xi'an`, 'Shang hai', 'Bei jing'],
  ['Sydney', 'Mel', 'Brisbane'],
  ['New York', 'LA', 'Chicago']
];

export const fetchCountry = id => {
  console.log(`start to fetch country ${id}`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`country ${id} is resolved`);
      resolve(countries[id % countries.length]);
    }, 3000 * Math.random());
  })
};

export const fetchCities = id => {
  return new Promise(resolve => {
    setTimeout(() => resolve(cities[id % cities.length]), 3000 * Math.random());
  })
}

export default id => ({
  id,
  countryResource: wrapPromise(fetchCountry(id)),
  cityResource: wrapPromise(fetchCities(id)) 
});