import { combineReducers } from 'redux';

const appReducer = (state = { app: {}}, action) => {
  if (action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
};

const suspenseReducer = (state = {}, action)  => {
  if (action.type === 'SUSPENSE' || action.type === 'TEST') {
    return {
      ...state,
      data: new Date()
    }
  }
  return state;
}

const initStateOfExample3 = {
  date: '12:48:48 PM',
  products: []
} 

const reducerOfExample3 = (state = initStateOfExample3, action) => {
  const { type, data } = action;
  switch (type) {
    case 'CHANGE_DATE': 
      return { ...state, date: new Date().toLocaleTimeString()};
    case 'ADD_PRODUCT': {
      const { products } = state;
      return { ...state, products: products.concat({ name: `name${products.length}`, price: 0, id: products.length, visitors: [] }) };
    }
    case 'REMOVE_PRODUCT': 
      state.products.spilce(data, 1);
      return { ...state, products: [...state.products] };
    case 'ADD_PRICE': {
      const products = state.products.map(product => {
        return product.id === data ? { ...product, price: product.price + 1 } : product;
      })
      return { ...state, products }
    }
    case 'ADD_VISITOR': {
      const products = state.products.map(product => {
        const { visitors, id } = product;
        const newVisitors = id === data ? visitors.concat(`visitor${visitors.length}`) : visitors;
        return { ...product, visitors: newVisitors };
      })
      return { ...state, products }
    }  
    default: return state;
  }
}

const sagaReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INCREMENT':{
        // Add 1 to count
        return Object.assign({}, state, { count: state.count + 1 });
      }
    case 'RECORD_USER':{
        // Record some user data
        const { result } = action;
        return Object.assign(
        {},
        state,
        { user: `NAME: ${result.name} GENDER: ${result.gender}` });

      }
    default:return state;}

};

export default combineReducers({
  app: appReducer,
  example3: reducerOfExample3,
  suspense: suspenseReducer,
  saga: sagaReducer
})