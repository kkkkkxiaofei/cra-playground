import React, { useState, cloneElement, useEffect, useRef } from 'react';
import styles from './FieldWrapper.module.scss';

const getValidator = ({ required }) => {
  if (required) {
    return itemValue => !!itemValue;
  }
  return () => true;
}

const FieldWrapper = props => {
  const { 
    children, 
    rule, 
    uniqueKey = '', 
    editable = true,
    context: { 
      validators,
      snapshot,
    },
    initValues,
    inject 
  } = props;
  const fieldRef = useRef();
  const [valueRecord, setValueRecord] = useState({ pre: '', current: initValues[uniqueKey] || '' });
  const [error, setError] = useState('');
  const validate = snapshot =>  {
    if (rule) {
      const { descriptor, message } = rule;
      const result = typeof descriptor === 'function' ? descriptor(snapshot) : getValidator(descriptor)(snapshot[uniqueKey]);
      const erroMessage = result ? '' : message
      //todo test
      return erroMessage;
    }
  }
  useEffect(() => {
    if (valueRecord.current !== valueRecord.pre) {
      setError(validate({ ...snapshot, [uniqueKey]: valueRecord.current }));
    }
  }, [valueRecord]);
  useEffect(() => {
    const oldValidator = validators[uniqueKey]; 
    const shouldInject = !oldValidator || (oldValidator && valueRecord.current !== oldValidator.value[uniqueKey]);
    
    shouldInject && inject({
      uniqueKey,
      value: { ...snapshot, [uniqueKey]: valueRecord.current },
      validator: validate,
      cb: setError,
      fieldRef,
      reset: setValueRecord,
    });
  }, [valueRecord, validators, snapshot]);
  const handleOnChange = e => setValueRecord({ pre: valueRecord.current, current: e.target.value });

  const render = (errorMessage) => cloneElement(children, {
    ...children.props,
    errorMessage, 
    onChange: handleOnChange,
    value: valueRecord.current,
    fieldRef
  });
  return (
    <div className={styles.container}>
      <div style={{ display: `${ editable ? 'block' : 'none' }` }}>
        {render(error)}
      </div>
      {!editable && <div>{valueRecord.current}</div>}
    </div>
  );
};

export default FieldWrapper;