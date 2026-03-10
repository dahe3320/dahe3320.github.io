import React from 'react';
import { useInView } from 'react-intersection-observer';

const ScrollEffect = ({ children, className }) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <div 
            ref={ref}
            className={`${className} ${inView ? 'animate-in' : 'hidden'}`}
        >
            {children}
        </div>
    );
};

export default ScrollEffect;