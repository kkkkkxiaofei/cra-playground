import React, { useState } from 'react';
import { Form, FormItem } from '../Form';
import styles from '../index.module.scss';
import {
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
    descriptor: {
      required: true
    },
    message: 'salary is mandatary'
  }
];

const companyRules = [
  {
    descriptor: {
      required: true
    },
    message: 'company is mandatary'
  }
];

const addressRules = [
  {
    descriptor: {
      required: true
    },
    message: 'address is mandatary'
  }
];

const Demo1 = (props) => {
  const { onSubmit = snapshot => console.log(snapshot, 'onsubmit'), ...others } = props;
  return (
    <div className={styles.container}>
      <Form 
        onSubmit={onSubmit} 
        initValidate={false}
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
          <Input label={'company'}  />
        </FormItem>
        <FormItem 
          rule={addressRules[0]} 
          uniqueKey={'address'}
        >
          <Input label={'address'}  />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo1;