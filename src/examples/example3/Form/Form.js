import React, { useState } from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { formData, children } = props;
    const [validators, setData] = useState({});
    return (
        <FormContext.Provider value={{ validators, setData }}>
            {children}
        </FormContext.Provider>
    );
};

export default Form;