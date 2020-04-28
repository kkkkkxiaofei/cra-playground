import React, { useState, useMemo, cloneElement, useContext, useEffect } from 'react';
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
    fieldType, 
    uniqueKey = '', 
    initValue, 
    editable = true,
    context: { 
        validators, 
        snapshot, 
        hasErrors 
      }, 
    onSubmit, 
    inject 
  } = props;
  const [valueRecord, setValueRecord] = useState({ pre: '', current: initValue || '' });
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
    if (fieldType && fieldType !== 'button') {
      const oldValidator = validators[uniqueKey]; 
      const shouldInject = !oldValidator || (oldValidator && valueRecord.current !== oldValidator.value[uniqueKey]);
      shouldInject && inject({
        uniqueKey,
        value: { ...snapshot, [uniqueKey]: valueRecord.current },
        validator: validate,
        cb: setError,
        impact: rule.impact
      });
    }
  }, [valueRecord, validators, snapshot]);
  const handleOnChange = e => setValueRecord({ pre: valueRecord.current, current: e.target.value });
  const handleOnSubmit = () => onSubmit(snapshot);

  const render = () => cloneElement(children, {
    ...children.props, 
    onChange: fieldType === 'input' ? handleOnChange : undefined,
    onClick: fieldType === 'button' ? handleOnSubmit : undefined, 
    value: valueRecord.current,
    disabled: fieldType === 'button' ? hasErrors : undefined,
  });

  return (
    <div className={styles.container}>
      <div style={{ display: `${ editable ? 'block' : 'none' }` }}>
        {render()}
        {fieldType !== 'button' && <p>{error}</p>}
      </div>
      {!editable && <div>{valueRecord.current}</div>}
    </div>
  );
};

export default FieldWrapper;