import React from 'react';
import Form from './Form/Form';
import FormItem from './FormItem/FormItem';
import styles from './index.module.scss';

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

const Input = props => {
  const { label, value, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}

const Button = props => {
  const { onClick, name, disabled } = props; 
  return (<div>
    <button disabled={disabled} onClick={onClick}>{name}</button>
  </div>)
}

const FormValidationExample = props => {
  const onSubmit = (snapshot) => console.log(snapshot);
  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit} initValidate={false}>
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
          <Input label={'salary'} />
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

export default FormValidationExample;