import FaqAberto from "../../components/FaqAberto/FaqAberto";
import { faqData } from "../../data/DataFaq";

export default function FAQ() {
    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-xl mx-auto px-4">
                
                
                <h1 className="text-2xl font-medium text-center text-black mb-8 p-6 bg-[#acf0ff] rounded-lg shadow-md border-2 border-[#169da6]">
                    PERGUNTAS FREQUENTES
                </h1>
                
                
                <div className="bg-[#acf0ff] rounded-lg shadow-xl overflow-hidden divide-y divide-[#169da6] border-2 border-[#169da6]">
                    
                    {faqData.map(item => (
                        <FaqAberto 
                            key={item.id} 
                            item={item}
                        />
                    ))}
                    
                </div>
                
            </div>
        </div>
    );
}