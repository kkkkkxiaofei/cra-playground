import React, { useState, useEffect } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        init: false
    },
    inject: $ => $,
    trigger: $ => $,
    onSubmit: $ => $
});

export const useFormContextData = (hookProps) => {
    const { onSubmit, initValidate = false, volumn } = hookProps;
    const [context, setContext] = useState({
        init: false,
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
        return {
            data: newSnapshot,
            errors
        }
    }
    const inject = newValidator => {
        const validators = {
            ...context.validators, 
            ...newValidator
        }
        setContext({ 
            ...context, 
            init: Object.keys(validators).length === volumn - 1,
            validators 
        })
    }
    
    useEffect(() => {
        if (context.init && initValidate) {
            trigger();
        }
    }, [context.init]);

    return {
        context,
        inject,
        trigger,
        onSubmit
    }
}