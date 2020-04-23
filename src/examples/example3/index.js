import React from 'react';
import FormItem from './FormItem/FormItem';
import styles from './index.module.scss';

const FormValidationExample = props => {
  
  return (
    <div className={styles.container}>
      <FormItem>
        <div>
          <label>name</label>
          <input type="text" />
        </div>
      </FormItem>
      <FormItem>
        <div>
          <label>salary</label>
          <input type="text" />
        </div>
      </FormItem>
      <button>submit</button>
    </div>
  );
};

export default FormValidationExample;