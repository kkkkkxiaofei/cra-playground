import React from 'react';
import Form from './Form/Form';
import FormItem from './FormItem/FormItem';
import styles from './index.module.scss';

const nameRules = [
  {
    rule: {
      required: true
    },
    message: 'name is required'
  }
];

const salaryRules = [
  {
    rule: {
      required: true
    },
    message: 'salary is mandorary'
  }
];

const FormValidationExample = props => {
  return (
    <div className={styles.container}>
      <Form>
        <FormItem rule={nameRules[0]} fieldType={"input"} uniqueKey={"1"}>
          <div>
            <label>name</label>
            <input type="text" />
          </div>
        </FormItem>
        <FormItem rule={salaryRules[0]} fieldType={"input"} uniqueKey={"2"}>  
          <div>
            <label>salary</label>
            <input type="text" />
          </div>
        </FormItem>
        <FormItem rule={salaryRules[0]} fieldType={"button"} uniqueKey={"3"}> 
          <button>submit</button>
        </FormItem>
      </Form>
    </div>
  );
};

export default FormValidationExample;