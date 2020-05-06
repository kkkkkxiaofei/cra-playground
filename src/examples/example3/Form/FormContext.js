import React, { useState } from 'react';

export const FormContext = React.createContext({
    context: {
        validators: {},
        init: false,
        hasErrors: false,
        errors: {},
        snapshot: {},
        touched: false,
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
        errors: {},
        validators: {},
        snapshot: {},
        touched: false,
    });

    const discard = () => {
        const { validators } = context;
        Object.keys(validators)
            .forEach(key => {
                const { fieldRef, reset } = validators[key];
                reset({ pre: '', current: initValues[key] || '' });
                fieldRef.current.value = initValues[key] || '';
            });
    };

    const trigger = (lastestContext = context, uniqueKey) => {
        const { validators, snapshot } = lastestContext;
        let errors = {};
        if (uniqueKey) {
            //trigger new injector
            const injector = validators[uniqueKey];
            errors = (injector.impact ? [injector.impact, uniqueKey] : [uniqueKey])
                .reduce((aggre, key) => {
                    const { validator, cb } = validators[key];
                    const message = validator(snapshot);
                    cb(message);
                    aggre[key] = message;
                    return aggre;
                }, {});
        } else {
            //trigger all
            errors = Object.keys(validators)
                .reduce((aggre, key) => {
                    const { validator, cb } = validators[key];
                    const message = validator(snapshot);
                    cb(message);
                    aggre[key] = message;
                    return aggre;
                }, {});
        }
        
        const result = {
            data: snapshot,
            errors
        };

        return result;
    }
    const inject = newValidator => {
        const { uniqueKey, validator } = newValidator;
        let validators = {};
        
        if (!!validator) {
            //inject
            validators = {
                ...context.validators,
                [uniqueKey]: { ...newValidator }
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
        let currentErrors = {};
        if (context.init) {
            currentErrors  = trigger(newContext, uniqueKey).errors;
        } else {
            if (newContext.init && initValidate) {
                currentErrors  = trigger(newContext).errors;
            }
        }
        
        const newErrors = { ...context.errors, ...currentErrors };
        const hasErrors = Object.keys(newErrors)
            .filter(key => {
                const checkVisible = validators[key].checkVisible || (() => true);
                return checkVisible(newSnapshot);
            })
            .some(key => !!newErrors[key]);
            
        setContext({
            ...newContext,
            hasErrors,
            errors: newErrors,
            touched: context.init && newContext.init
        });

        onSnapshotUpdated({ hasErrors, snapshot: newSnapshot });
    };

    return {
        context,
        inject,
        trigger,
        onSubmit,
        initValues,
        discard,
    }
}