// src/components/AccordionItem.tsx

import { useState } from 'react';
import type { FaqItem } from '../../data/DataFaq';


type FaqAbertoProps = {
    item: FaqItem;
};

export default function FaqAberto({ item }: FaqAbertoProps) {
    
    const [estaAberto, setEstaAberto] = useState(false);

    const toggle = () => {
        setEstaAberto(!estaAberto);
    };

    return (
        <div> 
            
            <button
                className="flex justify-between items-center w-full p-4 text-left text-xl font-bold text-gray-800 hover:bg-blue-100 transition duration-150"
                onClick={toggle} 
                aria-expanded={estaAberto} 
            >
                <span>{item.pergunta}</span> 
                
                <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${estaAberto ? 'transform rotate-180 text-blue-600' : 'text-gray-500'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {estaAberto && (
                <div className="p-4 pt-0 text-base font-normal text-gray-700 bg-blue-50 transition-all duration-300 ease-in-out">
                    <span className="text-base font-semibold mr-1">R:</span> 
                    <span>{item.resposta}</span>
                </div>
            )}
        </div>
    );
}