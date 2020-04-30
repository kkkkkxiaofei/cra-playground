import React, { useState, useEffect, useCallback } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        init: false,
        hasErrors: false,
        snapshot: {},
    },
    inject: $ => $,
    trigger: $ => $,
    onSubmit: $ => $
});

export const useFormContextData = (hookProps) => {
    const { 
        onSubmit, 
        initValidate = false, 
        volumn,
        onSnapshotUpdated = $ => $
    } = hookProps;
    const [context, setContext] = useState({
        init: false,
        hasErrors: false,
        validators: {},
        snapshot: {},
    });
    const trigger = (lastedContext = context, needCallback = true) => {
        const { validators, snapshot } = lastedContext;
        const errors = Object.values(validators)
            .map(({ validator, cb }) => {
                const message = validator(snapshot);
                needCallback && cb(message);
                return message;
            })
            .filter(message => !!message);
        
        const result = {
            data: snapshot,
            errors
        };

        return result;
    }
    const inject = newValidator => {
        const { uniqueKey, value, validator, cb } = newValidator;
        let validators = {};
        
        if (!!validator) {
            //inject
            validators = {
                ...context.validators,
                [uniqueKey]: { value, validator, cb }
            }
        } else {
            //uninject
            const { [uniqueKey]: $, ...others } = validators;
            validators = others;
        }
        
        const newSnapshot = Object.keys(validators).reduce((result, uniqueKey) => ({
            ...result,
            [uniqueKey]: validators[uniqueKey].value[uniqueKey]
        }), {});

        const newContext = { 
            ...context, 
            init: Object.keys(validators).length === volumn - 1,
            validators,
            snapshot: newSnapshot
        };
        
        // TODO: performance test
        const { errors } = trigger(newContext);
        setContext({
            ...newContext,
            hasErrors: errors.length > 0
        });

        onSnapshotUpdated(newSnapshot);
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
        onSubmit,
    }
}