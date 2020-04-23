import React, { useState } from 'react';

export const FormContext = React.createContext({
    validators: {},
    setData: $ => $
});

export const useFormContextData = () => {
    const [_initState, _setInitState] = useState([]);
    const setData = data => {
        
        _setInitState([..._initState, data]);
    };

    return {
        validators: _initState,
        setData
    }
}