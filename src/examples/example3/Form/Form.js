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
    const { context: { snapshot, hasErrors }, onSubmit, discard } = formContextData;

    return (
        <FormContext.Provider value={formContextData}>
          <div className={styles.formWrapper}>
            {children}
            <div className={styles.btnGroup}>
              {Ok && cloneElement(Ok, { ...Ok.props, onClick: () => onSubmit(snapshot), disabled: hasErrors })}
              {Cancel && cloneElement(Cancel, { ...Cancel.props, onClick: () => discard() })}
            </div>
          </div>
            
        </FormContext.Provider>
    );
};

export default Form;