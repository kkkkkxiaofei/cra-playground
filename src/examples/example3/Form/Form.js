import React, { cloneElement } from 'react';
import { FormContext, useFormContextData } from './FormContext';
import styles from './Form.module.scss';

const Form = props => {
    const { 
      children,
      Ok,
      Cancel,
      ...others
    } = props;
    
    const formContextData = useFormContextData({ ...others, volumn: children.length });
    const { context: { snapshot, hasErrors, touched }, onSubmit, discard, trigger } = formContextData;
    const submitHandler = touched ? () => onSubmit(snapshot) : () => trigger();

    return (
        <FormContext.Provider value={formContextData}>
          <div className={styles.formWrapper}>
            {children}
            <div className={styles.btnGroup}>
              {Ok && cloneElement(Ok, { ...Ok.props, onClick: submitHandler, disabled: hasErrors })}
              {Cancel && cloneElement(Cancel, { ...Cancel.props, onClick: () => discard() })}
            </div>
          </div>
            
        </FormContext.Provider>
    );
};

export default Form;