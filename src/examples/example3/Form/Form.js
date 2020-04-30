import React, { cloneElement } from 'react';
import { FormContext, useFormContextData } from './FormContext';

const Form = props => {
    const { 
      children,
      Ok,
      ...others
    } = props;
    
    const formContextData = useFormContextData({ ...others, volumn: children.length });
    const { context: { snapshot, hasErrors }, onSubmit } = formContextData;

    return (
        <FormContext.Provider value={formContextData}>
            {children}
            <div>
              {Ok && cloneElement(Ok, { ...Ok.props, onClick: () => onSubmit(snapshot), disabled: hasErrors })}
            </div>
        </FormContext.Provider>
    );
};

export default Form;