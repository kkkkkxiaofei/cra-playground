import React, { useState, useMemo, cloneElement, useContext, useEffect } from 'react';
import styles from './FormItem.module.scss';
import { FormContext } from '../Form/FormContext';

const getValidator = ({ rule }) => {
  if (rule.required) {
    return itemValue => !!itemValue;
  }
  return () => true;
}

const FormItem = props => {
  const { children, rule, fieldType, uniqueKey = '', initValue } = props;
  const { context: { validators }, trigger, onSubmit, inject } = useContext(FormContext);
  const [valueRecord, setValueRecord] = useState({ pre: '', current: initValue || '' });
  const [error, setError] = useState('');
  
  const validate = value =>  {
    if (rule) {
      const result = getValidator(rule)(value) ? '' : rule.message;
      console.log(result);
      setError(result);
      return result;
    }
  }

  useEffect(() => {
    if (valueRecord.current !== valueRecord.pre) {
      validate(valueRecord.current);
    }
  }, [valueRecord]); 

  useEffect(() => {
    if (fieldType && fieldType !== 'button') {
      const oldValidator = validators[uniqueKey];
      const shouldInject = !oldValidator || (oldValidator && valueRecord.current !== oldValidator.value);
      shouldInject && inject({
        [uniqueKey]: { 
          value: valueRecord.current, 
          validator: validate
        }
      });
    }
  }, [valueRecord, validators]);
  
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