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

const formInitValues = {
  name: '',
  salary: '1,000,000'
}

const Input = props => {
  const { label, value, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}

const FormValidationExample = props => {
  const onSubmit = ({ data, errors }) => console.log(data, errors);
  return (
    <div className={styles.container}>
      <Form initValues={formInitValues} onSubmit={onSubmit} initValidate={false}>
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
          initValue={'1,000,000'}
        >
          <Input label={'salary'} />
        </FormItem>
        <FormItem fieldType={'button'}> 
          <button>submit</button>
        </FormItem>
      </Form>
    </div>
  );
};

export default FormValidationExample;