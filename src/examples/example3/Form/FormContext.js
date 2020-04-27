import React, { useState, useEffect } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        init: false,
        snapshot: {},
    },
    inject: $ => $,
    trigger: $ => $,
    onSubmit: $ => $
});

export const useFormContextData = (hookProps) => {
    const { onSubmit, initValidate = false, volumn } = hookProps;
    const [context, setContext] = useState({
        init: false,
        validators: {},
        snapshot: {},
    });
    const trigger = (lastedContext = context) => {
        const { validators, snapshot } = lastedContext;
        const errors = Object.values(validators)
            .map(({ validator }) => validator(snapshot))
            .filter(message => !!message);
        
        return {
            data: snapshot,
            errors
        };
    }
    const inject = newValidator => {
        const validators = {
            ...context.validators,
            [newValidator.uniqueKey]: { ...newValidator }
        };

        const newSnapshot = Object.keys(validators).reduce((result, key) => {
            result[key] = validators[key].value[key];
            return result;
        }, {});

        const newContext = { 
            ...context, 
            init: Object.keys(validators).length === volumn - 1,
            validators,
            snapshot: newSnapshot
        };
        
        // after initinig, if new injection has impacts, then trigger all
        if (context.init && newValidator.impact) {
            trigger(newContext);
        }

        setContext(newContext);
    };
    
    useEffect(() => {
        if (context.init && initValidate) {
            trigger(context);
        }
    }, [context]);
    return {
        context,
        inject,
        trigger,
        onSubmit
    }
}