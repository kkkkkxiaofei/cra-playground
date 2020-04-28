import React, { useState } from 'react';
import Form from '../Form/Form';
import FormItem from '../FormItem/FormItem';
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
    impact: 'company',
    message: 'salary is mandorary'
  }
];

const Demo1 = (props) => {
  const { onSubmit = snapshot => console.log(snapshot), ...others } = props;
  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit} initValidate={true} {...others}>
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
        <FormItem fieldType={'button'}> 
          <Button name={'Submit'} />
        </FormItem>
      </Form>
    </div>
  );
};

export default Demo1;