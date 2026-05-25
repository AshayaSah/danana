'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqClient({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="border-b border-gray-100">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className={`text-[15px] font-medium transition-colors ${open === i ? 'text-black' : 'text-[#333]'}`}>
              {item.question}
            </span>
            <span className="shrink-0 text-[#696969]">
              {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-200 ease-out ${open === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
            <p className="text-[14px] text-[#696969] leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
