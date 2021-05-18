import React from 'react';

const Button = ({ onClick = () => {}, disabled = false, name = "RESET" , children }) => {

  return (
    <button
      type="button"
      className="reset_button"
      onClick={() =>  onClick()}
      disabled={disabled}
    >
      {children ? children : name }
    </button>
  )
}


export default Button;