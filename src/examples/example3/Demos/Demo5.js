import React, { useState } from 'react';
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
    message: 'name is required',
    checkVisible: snapshot => {
      const { salary } = snapshot;
      return salary > 200;
    }
  }
];

const salaryRules = [
  {
    descriptor: {
      required: true
    },
    message: 'salary is mandorary',
  }
];

const Demo5 = (props) => {
  const onSubmit = snapshot => {
    console.log(snapshot);
    alert(JSON.stringify(snapshot));
  }
  return (
    <div className={styles.container}>
      <Form 
        onSubmit={onSubmit} 
        initValidate={true} 
        initValues={{ salary: 200 }}
        Ok={<Ok name={'Submit'} />}
        {...props.others}
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
        >
          <Input label={'name'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo5;