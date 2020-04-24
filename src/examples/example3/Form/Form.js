import React from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { initValues, onSuccess, onFail, children } = props;
    return (
        <FormContext.Provider value={useFormContextData(initValues, onSuccess, onFail)}>
            {children}
        </FormContext.Provider>
    );
};

export default Form;