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
  const { children, rule = {}, fieldType, uniqueKey } = props;
  const { validators, setData} = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState('');
  const validate = itemValue => {
    return getValidator(rule)(itemValue) ? '' : rule.message;
  };  

  const [valueRecord, setValueRecord] = useState({ pre: "", current: "" });

  useEffect(() => {
    if (!validators[uniqueKey]) {
      const validator = () =>  setErrorMessage(validate(valueRecord.current));
      setData({...validators, [uniqueKey]: validator});
    }
  }, [validators]);

  const handleOnChange = e => setValueRecord({ pre: valueRecord.current, current: e.target.value });
  const handleSubmit = () => {
    Object.values(validators).forEach(validator => validator());
  };

  useMemo(() => {
    if (errorMessage || (!errorMessage && valueRecord.pre)) {
      const result = validate(valueRecord.current);
      setErrorMessage(result);
    }
  }, [valueRecord]);
  return (
    <div className={styles.container}>
      {cloneElement(children, {
          ...children.props, 
          onChange: fieldType === 'input' ? handleOnChange : undefined,
          onClick: fieldType === 'button' ? handleSubmit : undefined, 
          value: valueRecord.current 
        }
      )}
      {fieldType !== 'button' && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormItem;