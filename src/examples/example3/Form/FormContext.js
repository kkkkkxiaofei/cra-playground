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
        Object.values(validators)
            .forEach(({ fieldRef, uniqueKey, reset }) => {
                reset({ pre: '', current: initValues[uniqueKey] || '' });
                fieldRef.current.value = initValues[uniqueKey] || '';
            });
    };

    const trigger = (lastestContext = context, uniqueKey) => {
        const { validators, snapshot } = lastestContext;
        let errors = {};
        if (uniqueKey) {
            //trigger new injector
            const injector = validators[uniqueKey];
            errors = [injector, validators[injector.impact]]
                .filter(item => !!item)
                .reduce((aggre, { validator, cb, uniqueKey: currentUniqueKey }) => {
                    const message = validator(snapshot);
                    cb(message);
                    aggre[currentUniqueKey] = message;
                    return aggre;
                }, {});
        } else {
            //trigger all
            errors = Object.values(validators)
                .reduce((aggre, { validator, cb, uniqueKey: currentUniqueKey }) => {
                    const message = validator(snapshot);
                    cb(message);
                    aggre[currentUniqueKey] = message;
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
        let currentErrors = {};
        if (context.init) {
            currentErrors  = trigger(newContext, newValidator.uniqueKey).errors;
        } else {
            if (newContext.init && initValidate) {
                currentErrors  = trigger(newContext).errors;
            }
        }
        
        const newErrors = { ...context.errors, ...currentErrors };
        setContext({
            ...newContext,
            hasErrors: Object.values(newErrors).some(error => !!error),
            errors: newErrors,
            touched: context.init && newContext.init
        });

        onSnapshotUpdated(newSnapshot);
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