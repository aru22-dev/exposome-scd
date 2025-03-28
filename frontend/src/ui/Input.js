import React from 'react';

const Input = ({ name, value, onChange, placeholder, className }) => {
    return (
        <input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`p-2 border rounded-lg ${className}`}
        />
    );
};

export default Input;