import React, { cloneElement } from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { children, ...others } = props;
    
    return (
        <FormContext.Provider value={useFormContextData({ ...others, volumn: children.length })}>
            {children}
        </FormContext.Provider>
    );
};

export default Form;