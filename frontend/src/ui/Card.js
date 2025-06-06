import React from 'react';

const Card = ({ children, className }) => {
    return (
        <div className={`bg-white shadow-md rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export default Card;