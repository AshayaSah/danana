'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import faqData from '@/lib/faq.json';

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col pb-20">
      <section className="max-w-[760px] mx-auto w-full px-4 sm:px-6 py-16">

        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-2">Help centre</p>
          <h1 className="text-[32px] font-semibold text-black">Frequently Asked Questions</h1>
          <p className="text-[#696969] text-sm mt-3">
            Can't find your answer?{' '}
            <a href="/contact" className="underline hover:text-black transition-colors">Send us a message</a>.
          </p>
        </div>

        <div className="flex flex-col">
          {faqData.map((item, i) => (
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
      </section>
    </div>
  );
}
