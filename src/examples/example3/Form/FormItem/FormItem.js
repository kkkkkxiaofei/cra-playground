import React, { useContext } from 'react';
import styles from './FormItem.module.scss';
import { FormContext } from '../FormContext';
import FieldWrapper from '../FieldWrapper/FieldWrapper';

const FormItem = props => {
  const { 
    children, 
    checkVisible = () => true,
    uniqueKey = '',
    ...otherProps
  } = props;
  const formContext = useContext(FormContext);
  const { context: { snapshot, validators }, inject } = formContext;
  
  if (!checkVisible(snapshot)) {
    if (validators[uniqueKey]) {
      inject({ [uniqueKey]: {} });
    }
    return null;
  }
  return (
    <div className={styles.container}>
      <FieldWrapper uniqueKey={uniqueKey} {...formContext} {...otherProps} >
        {children}
      </FieldWrapper>
    </div>
  );
};

export default FormItem;