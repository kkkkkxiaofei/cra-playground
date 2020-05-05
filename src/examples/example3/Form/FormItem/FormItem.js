import React, { useContext } from 'react';
import styles from './FormItem.module.scss';
import { FormContext } from '../FormContext';
import FieldWrapper from '../FieldWrapper/FieldWrapper';

const FormItem = props => {
  const { 
    children, 
    uniqueKey = '',
    ...otherProps
  } = props;
  const formContext = useContext(FormContext);
  
  return (
    <div className={styles.container}>
      <FieldWrapper uniqueKey={uniqueKey} {...formContext} {...otherProps} >
        {children}
      </FieldWrapper>
    </div>
  );
};

export default FormItem;