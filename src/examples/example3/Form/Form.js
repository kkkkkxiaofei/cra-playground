import React from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { initValues, onSubmit, children } = props;
    return (
        <FormContext.Provider value={useFormContextData(initValues, onSubmit)}>
            {children}
        </FormContext.Provider>
    );
};

export default Form;