import type { Metadata } from 'next';
import faqData from '@/lib/faq.json';
import { FaqClient } from '@/components/faq-client';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Got questions about DANANA jerseys, delivery, returns, sizing, or bulk orders? Find quick answers in our FAQ — or reach out and we\'ll reply within 24 hours.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ | DANANA',
    description:
      'Answers to common questions about ordering World Cup jerseys, delivery times across Nepal, returns, sizing, and custom kit orders.',
  },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="max-w-[760px] mx-auto w-full px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-2">Help centre</p>
          <h1 className="text-[32px] font-semibold text-black">Frequently Asked Questions</h1>
          <p className="text-[#696969] text-sm mt-3">
            Can't find your answer?{' '}
            <a href="/contact" className="underline hover:text-black transition-colors">Send us a message</a>.
          </p>
        </div>

        <FaqClient items={faqData} />
      </section>
    </div>
  );
}
