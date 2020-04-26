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
  const { children, rule = {}, fieldType, uniqueKey = '' } = props;
  const { context: { initValues, validators }, trigger, onSubmit, injectValidator } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [valueRecord, setValueRecord] = useState({ pre: "", current: initValues[uniqueKey] });
  
  const validator = value =>  {
    const result = getValidator(rule)(value) ? '' : rule.message;
    setErrorMessage(result);
    return result;
  };
  useEffect(() => {
    if (fieldType && fieldType !== 'button') {
      const oldValidator = validators[uniqueKey];
      const shouldInject = !oldValidator || (oldValidator && valueRecord.current !== oldValidator.value);
      shouldInject && injectValidator({
        [uniqueKey]: { 
          value: valueRecord.current, 
          validator
        }
      });
    }
  }, [valueRecord, validators]);

  
  useMemo(() => {
    if (errorMessage || (!errorMessage && valueRecord.pre)) {
      validator(valueRecord.current);
    }
  }, [valueRecord]);
  
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
      {fieldType !== 'button' && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormItem;