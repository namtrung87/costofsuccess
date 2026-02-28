import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const XPToast: React.FC = () => {
    const { state, dispatch } = useGame();

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col gap-2">
            <AnimatePresence>
                {state.toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={(id) => dispatch({ type: 'REMOVE_TOAST', payload: id })} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const ToastItem: React.FC<{ toast: any; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => onRemove(toast.id), 3000);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    const bgColor = toast.type === 'success' ? 'bg-neonGreen/20 border-neonGreen text-neonGreen' :
        toast.type === 'error' ? 'bg-neonPink/20 border-neonPink text-neonPink' :
            'bg-neonCyan/20 border-neonCyan text-neonCyan';

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`px-6 py-2 border-2 rounded-full backdrop-blur-md font-heading font-black text-sm uppercase tracking-widest shadow-lg ${bgColor}`}
        >
            {toast.message}
        </motion.div>
    );
};
