import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Phase17Data } from '../../data/phase17';

interface StandardBuilderProps {
    data: Phase17Data;
    onCorrect: () => void;
    onIncorrect: () => void;
    onComplete: (score: number) => void;
    language: 'EN' | 'VI';
}

const StandardBuilder: React.FC<StandardBuilderProps> = ({
    data, onCorrect, onIncorrect, onComplete, language
}) => {
    const { playSFX } = useAudio();
    const [inputs, setInputs] = useState<Record<string, { qty: string; price: string }>>({
        mat: { qty: '', price: '' },
        lab: { qty: '', price: '' }
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const t = {
        title: language === 'EN' ? 'THE MASTER BLUEPRINT' : 'BẢN THIẾT KẾ GỐC',
        subtitle: language === 'EN' ? 'Set the Standard Costing parameters' : 'Thiết lập các thông số chi phí định mức',
        element: language === 'EN' ? 'Element' : 'Yếu tố',
        stdQty: language === 'EN' ? 'Std. Qty' : 'Định lượng',
        stdPrice: language === 'EN' ? 'Std. Price' : 'Đơn giá chuẩn',
        total: language === 'EN' ? 'Total' : 'Tổng cộng',
        lock: language === 'EN' ? 'LOCK BLUEPRINT' : 'KHÓA BẢN THIẾT KẾ',
        sellingPrice: language === 'EN' ? 'Standard Selling Price' : 'Giá bán dự kiến',
        budgetedProfit: language === 'EN' ? 'Budgeted Profit / Unit' : 'Lợi nhuận dự toán / SP',
        specs: language === 'EN' ? 'SPECS' : 'THÔNG SỐ'
    };

    const handleInputChange = (id: string, field: 'qty' | 'price', value: string) => {
        setInputs(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
        if (value !== '') playSFX('UI_CLICK');
    };

    const calculateTotal = (id: string) => {
        const qty = parseFloat(inputs[id].qty) || 0;
        const price = parseFloat(inputs[id].price) || 0;
        return qty * price;
    };

    const totalCost = Object.keys(inputs).reduce((sum, id) => sum + calculateTotal(id), 0);
    const profit = data.sellingPrice - totalCost;

    const handleLock = () => {
        setIsSubmit(true);
        let correct = true;

        data.elements.forEach(el => {
            const input = inputs[el.id];
            if (parseFloat(input.qty) !== el.standardQuantity || parseFloat(input.price) !== el.standardPrice) {
                correct = false;
            }
        });

        if (correct) {
            playSFX('SUCCESS');
            setFeedback({
                type: 'success',
                msg: language === 'EN' ? 'BLUEPRINT DEPLOYED SUCCESSFULLY' : 'BẢN THIẾT KẾ ĐÃ ĐƯỢC KHOÁ'
            });
            onCorrect();
            setTimeout(() => onComplete(10), 2500);
        } else {
            playSFX('ERROR');
            setFeedback({
                type: 'error',
                msg: language === 'EN' ? 'BLUEPRINT MISMATCH. CHECK SPECS.' : 'SAI LỆCH THÔNG SỐ. KIỂM TRA LẠI.'
            });
            onIncorrect();
            setTimeout(() => {
                setIsSubmit(false);
                setFeedback(null);
            }, 2000);
        }
    };

    return (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 font-mono p-4 text-white">
            <div className="max-w-4xl w-full border-2 border-neonCyan p-8 bg-gray-900 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                <header className="mb-8 border-b border-neonCyan/30 pb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-heading text-neonCyan tracking-tighter">{t.title}</h2>
                        <p className="text-gray-400 text-sm mt-1">{t.subtitle}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-neonPink uppercase">{t.specs}</p>
                        <p className="text-sm text-white opacity-80">
                            {language === 'EN' ? 'Fabric: 1.5m @ $40 | Labor: 2h @ $30' : 'Vải: 1.5m @ $40 | Thợ: 2h @ $30'}
                        </p>
                    </div>
                </header>

                <div className="space-y-6">
                    {data.elements.map(el => (
                        <div key={el.id} className="grid grid-cols-12 gap-4 items-center bg-black/50 p-4 border border-gray-800">
                            <div className="col-span-3">
                                <p className="text-xs text-neonCyan mb-1">{t.element}</p>
                                <p className="font-bold uppercase">{el.name}</p>
                            </div>

                            <div className="col-span-3">
                                <p className="text-xs text-gray-500 mb-1">{t.stdQty} ({el.unit})</p>
                                <input
                                    type="number"
                                    value={inputs[el.id].qty}
                                    onChange={(e) => handleInputChange(el.id, 'qty', e.target.value)}
                                    disabled={isSubmit}
                                    className="w-full bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:border-neonCyan outline-none transition-colors"
                                />
                            </div>

                            <div className="col-span-3">
                                <p className="text-xs text-gray-500 mb-1">{t.stdPrice} ($)</p>
                                <input
                                    type="number"
                                    value={inputs[el.id].price}
                                    onChange={(e) => handleInputChange(el.id, 'price', e.target.value)}
                                    disabled={isSubmit}
                                    className="w-full bg-gray-800 border border-gray-600 px-3 py-2 text-white focus:border-neonCyan outline-none transition-colors"
                                />
                            </div>

                            <div className="col-span-3 text-right">
                                <p className="text-xs text-neonPink mb-1">{t.total}</p>
                                <p className="text-xl font-bold">${calculateTotal(el.id).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-8 border-t border-neonCyan/30 pt-8">
                    <div>
                        <div className="flex justify-between text-sm mb-2 text-gray-400">
                            <span>{t.sellingPrice}</span>
                            <span>${data.sellingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2 text-gray-400 border-b border-gray-800 pb-2">
                            <span>{language === 'EN' ? 'Total Standard Cost' : 'Tổng Chi Phí Định Mức'}</span>
                            <span>-${totalCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-neonCyan">
                            <span>{t.budgetedProfit}</span>
                            <span>${profit.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end">
                        {feedback ? (
                            <div className={`p-4 border-2 text-center font-bold animate-pulse ${feedback.type === 'success' ? 'border-neonCyan text-neonCyan' : 'border-neonPink text-neonPink'}`}>
                                {feedback.msg}
                            </div>
                        ) : (
                            <button
                                onClick={handleLock}
                                disabled={isSubmit}
                                className="w-full bg-neonCyan text-black font-bold py-4 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95"
                            >
                                {t.lock}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardBuilder;
