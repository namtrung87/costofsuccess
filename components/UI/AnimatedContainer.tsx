import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';

interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
    variant?: 'fadeUp' | 'slideLeft' | 'scaleIn' | 'glitchIn' | 'none';
    delay?: number;
    duration?: number;
    children: React.ReactNode;
}

const variants: Record<string, Variants> = {
    fadeUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    },
    slideLeft: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 }
    },
    glitchIn: {
        initial: { opacity: 0, skewX: 20, x: -20 },
        animate: {
            opacity: 1,
            skewX: 0,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        exit: { opacity: 0, skewX: -20, x: 20 }
    },
    none: {
        initial: {},
        animate: {},
        exit: {}
    }
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
    variant = 'fadeUp',
    delay = 0,
    duration = 0.4,
    children,
    ...props
}) => {
    return (
        <motion.div
            variants={variants[variant]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration, delay, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
};
