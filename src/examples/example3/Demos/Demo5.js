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
    descriptor: {
      required: true
    },
    message: 'salary is mandorary'
  }
];

const checkVisible = snapshot => {
  const { salary } = snapshot;
  return salary > 200;
}

const Demo5 = (props) => {
  const { onSubmit = snapshot => console.log(snapshot), ...others } = props;
  return (
    <div className={styles.container}>
      <Form 
        onSubmit={onSubmit} 
        initValidate={true} 
        initValues={{ salary: 200 }}
        Ok={<Button name={'Submit'} />}
        {...others}
      >
        <FormItem 
          rule={salaryRules[0]} 
          uniqueKey={'salary'}
        >
          <Input label={'salary'}  />
        </FormItem>
        <FormItem 
          rule={nameRules[0]} 
          uniqueKey={'name'}
          checkVisible={checkVisible}
        >
          <Input label={'name'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo5;