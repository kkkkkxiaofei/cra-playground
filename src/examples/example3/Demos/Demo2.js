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

const Demo2 = props => {
  return (
    <div className={styles.container}>
      
      <Form onSubmit={(snapshot) => console.log(snapshot)} initValidate={true}>
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
          initValue={'200'}
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
        <FormItem fieldType={'button'}> 
          <Button name={'Submit'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo2;