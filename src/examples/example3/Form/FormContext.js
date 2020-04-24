import React, { useState } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        initValues: {}
    },
    setContext: $ => $,
    injectValidator: $ => $,
    trigger: $ => $
});

export const useFormContextData = (initValues = {}) => {
    const [context, setContext] = useState({
        initValues,
        validators: {}
    });

    const trigger = () => {
        console.log(context.validators)
        Object.values(context.validators)
            .forEach(({ value, validator, fieldType }) => fieldType !== 'button' && validator(value));
    }

    const injectValidator = newValidator => {
        console.log(newValidator, context.validators)
        setContext({ ...context, validators: {...context.validators, ...newValidator} })
    }

    return {
        context: { ...context },
        injectValidator,
        setContext: setContext,
        trigger
    }
}