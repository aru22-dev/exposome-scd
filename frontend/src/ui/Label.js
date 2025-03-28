import React from 'react';

const Label = ({ children, className }) => {
    return (
        <label className={`block font-semibold mb-1 ${className}`}>
            {children}
        </label>
    );
};

export default Label;