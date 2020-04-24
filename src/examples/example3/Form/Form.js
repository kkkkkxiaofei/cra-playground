import React, { useState } from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { initValues, children } = props;
    return (
        <FormContext.Provider value={useFormContextData(initValues)}>
            {children}
        </FormContext.Provider>
    );
};

export default Form;