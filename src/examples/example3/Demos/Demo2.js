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
  const [editable, setEditable] = useState(false);
  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => setEditable(true)}>Edit</button>
        <button onClick={() => setEditable(false)}>Cancel</button>
      </div>
      <Form onSubmit={(snapshot) => console.log(snapshot)} initValidate={false}>
        <FormItem 
          rule={nameRules[0]} 
          fieldType={'input'} 
          uniqueKey={'name'}
          initValue={''}
          editable={editable}
        >
          <Input label={'name'} />
        </FormItem>
        <FormItem 
          rule={salaryRules[0]} 
          fieldType={'input'} 
          uniqueKey={'salary'}
          initValue={'200'}
          editable={editable}
        >
          <Input label={'salary'}  />
        </FormItem>
        <FormItem 
          rule={companyRules[0]} 
          fieldType={'input'} 
          uniqueKey={'company'}
          editable={editable}
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