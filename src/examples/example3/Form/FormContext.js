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

export const useFormContextData = (initValues = {}, onSubmit) => {
    const [context, setContext] = useState({
        initValues,
        validators: {}
    });
    const trigger = () => {
        const { validators } = context;
        const errors = Object.values(validators)
            .map(({ value, validator }) => validator(value))
            .filter(message => !!message);
        
        const newSnapshot = Object.keys(validators).reduce((result, key) => {
            result[key] = validators[key].value;
            return result;
        }, {})
        console.log(errors, newSnapshot)
        return {
            data: newSnapshot,
            errors
        }
    }
    const injectValidator = newValidator => {
        setContext({ 
            ...context, 
            validators: {
                ...context.validators, 
                ...newValidator
            } 
        })
    }

    return {
        context,
        injectValidator,
        setContext: setContext,
        trigger,
        onSubmit,
    }
}