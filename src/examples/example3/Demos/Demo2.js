import React from 'react';
import { Form, FormItem } from '../Form';
import styles from '../index.module.scss';
import {
  Ok,
  Input
} from './Components';

const nameRules = [
  {
    descriptor: {
      required: true
    },
    message: 'name is required'
  }
];

const salaryRules = [
  {
    descriptor: snapshot => {
      const { salary } = snapshot;
      return !isNaN(salary);      
    },
    message: 'salary must be number',
    impact: 'company'
  }
];

const companyRules = [
  {
    descriptor: snapshot => {
      const { salary, company } = snapshot;
      if (salary > 100) {
        return company;
      }
      return true;
    },
    message: 'company is required if salary is more than 100'
  }
];

const Demo2 = props => {
  const { onSubmit = snapshot => console.log(snapshot), ...others } = props;
  return (
    <div className={styles.container}>
      <Form 
        onSubmit={onSubmit} 
        initValidate={true}
        initValues={{ salary: 200 }}
        Ok={<Ok name={'Submit'} />}
        {...others}
      >
        <FormItem 
          rule={nameRules[0]} 
          uniqueKey={'name'}
        >
          <Input label={'name'} />
        </FormItem>
        <FormItem 
          rule={salaryRules[0]} 
          uniqueKey={'salary'}
        >
          <Input label={'salary'}  />
        </FormItem>
        <FormItem 
          rule={companyRules[0]} 
          uniqueKey={'company'}
        >
          <Input label={'company'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo2;