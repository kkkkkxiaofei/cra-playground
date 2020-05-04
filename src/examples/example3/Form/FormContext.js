import React, { useState, useEffect, useCallback } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        init: false,
        hasErrors: false,
        snapshot: {},
    },
    initValues: {},
    inject: $ => $,
    trigger: $ => $,
    onSubmit: $ => $,
    discard: $ => $,
});

export const useFormContextData = (hookProps) => {
    const { 
        onSubmit, 
        initValidate = false, 
        volumn,
        onSnapshotUpdated = $ => $,
        initValues = {},
    } = hookProps;
    
    const [context, setContext] = useState({
        init: false,
        hasErrors: false,
        validators: {},
        snapshot: {},
    });

    const discard = () => {
        const { validators } = context;
        Object.values(validators)
            .forEach(({ fieldRef, uniqueKey, reset }) => {
                reset({ pre: '', current: initValues[uniqueKey] || '' });
                fieldRef.current.value = initValues[uniqueKey] || '';
            });
    };

    const trigger = (lastestContext = context, needCallback = true) => {
        const { validators, snapshot } = lastestContext;
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
        const { uniqueKey, value, validator, cb, fieldRef, reset } = newValidator;
        let validators = {};
        
        if (!!validator) {
            //inject
            validators = {
                ...context.validators,
                [uniqueKey]: { value, validator, cb, fieldRef, reset }
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
            init: Object.keys(validators).length === volumn,
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
        initValues,
        discard
    }
}