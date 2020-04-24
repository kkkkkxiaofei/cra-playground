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

export const useFormContextData = (initValues = {}, onSuccess, onFail) => {
    const [context, setContext] = useState({
        initValues,
        validators: {}
    });
    const trigger = () => {
        const { validators } = context;
        const errorMessages = Object.values(validators)
            .map(({ value, validator }) => validator(value))
            .filter(message => {
                return !!message;
            });
        if (errorMessages.length > 0) {
            onFail(errorMessages);
        } else {
            const newSnapshot = Object.keys(validators).reduce((result, key) => {
                result[key] = validators[key].value;
                return result;
            }, {})
            onSuccess(newSnapshot);
        }
    }
    const injectValidator = newValidator => {
        setContext({ ...context, validators: {...context.validators, ...newValidator} })
    }

    return {
        context: { ...context },
        injectValidator,
        setContext: setContext,
        trigger
    }
}