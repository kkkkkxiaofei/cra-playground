import React, { useState } from 'react';
import { Form, FormItem } from '../Form';
import styles from '../index.module.scss';
import {
  Button,
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
    message: 'salary must be number'
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

const Demo3 = props => {
  const { onSubmit = snapshot => console.log(snapshot), ...others } = props;
  return (
    <div className={styles.container}>
      
      <Form 
        onSubmit={onSubmit} 
        initValidate={true} 
        {...others}
        Ok={<Button name={'Submit'} />}
      >
        <FormItem 
          rule={nameRules[0]} 
          fieldType={'input'} 
          uniqueKey={'name'}
          initValue={''}
        >
          <Input label={'name'} />
        </FormItem>
        <FormItem 
          rule={salaryRules[0]} 
          fieldType={'input'} 
          uniqueKey={'salary'}
          initValue={''}
        >
          <Input label={'salary'}  />
        </FormItem>
        <FormItem 
          rule={companyRules[0]} 
          fieldType={'input'} 
          uniqueKey={'company'}
        >
          <Input label={'company'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo3;