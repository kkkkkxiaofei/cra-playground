import React from 'react';

export const Input = props => {
  const { label, value, onChange } = props;
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  )
}

export const Button = props => {
  const { onClick, name, disabled } = props; 
  return (<div>
    <button disabled={disabled} onClick={onClick}>{name}</button>
  </div>)
}

