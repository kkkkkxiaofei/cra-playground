import React, { useState, useMemo, cloneElement, useContext, useEffect } from 'react';
import styles from './FormItem.module.scss';
import { FormContext } from '../Form/FormContext';

const getValidator = ({ required }) => {
  if (required) {
    return itemValue => !!itemValue;
  }
  return () => true;
}

const FormItem = props => {
  const { children, rule, fieldType, uniqueKey = '', initValue } = props;
  const { 
    context: { 
      validators,
      snapshot, 
    }, 
    trigger, 
    onSubmit, 
    inject 
  } = useContext(FormContext);
  const [valueRecord, setValueRecord] = useState({ pre: '', current: initValue || '' });
  const [error, setError] = useState('');
  const validate = snapshot =>  {
    if (rule) {
      const { descriptor, message } = rule;
      const result = typeof descriptor === 'function' ? descriptor(snapshot) : getValidator(descriptor)(snapshot[uniqueKey]);
      const erroMessage = result ? '' : message
      setError(erroMessage);
      //todo test
      return erroMessage;
    }
  }
  useEffect(() => {
    if (valueRecord.current !== valueRecord.pre) {
      validate({ ...snapshot, [uniqueKey]: valueRecord.current })
    }
  }, [valueRecord]);

  useEffect(() => {
    if (fieldType && fieldType !== 'button') {
      const oldValidator = validators[uniqueKey]; 
      const shouldInject = !oldValidator || (oldValidator && valueRecord.current !== oldValidator.value[uniqueKey]);
      shouldInject && inject({
        uniqueKey,
        value: { ...snapshot, [uniqueKey]: valueRecord.current },
        validator: validate,
        impact: rule.impact
      });
    }
  }, [valueRecord, validators, snapshot]);
  
  const handleOnChange = e => setValueRecord({ pre: valueRecord.current, current: e.target.value });
  const handleOnSubmit = () => onSubmit(trigger());
  return (
    <div className={styles.container}>
      {cloneElement(children, {
          ...children.props, 
          onChange: fieldType === 'input' ? handleOnChange : undefined,
          onClick: fieldType === 'button' ? handleOnSubmit : undefined, 
          value: valueRecord.current 
        }
      )}
      {fieldType !== 'button' && <p>{error}</p>}
    </div>
  );
};

export default FormItem;