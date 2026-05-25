import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with DANANA. Call or WhatsApp us at +977 9810126827, email dananafits@gmail.com, or use the form. Based in Kathmandu — we reply within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact DANANA',
    description:
      "Reach out for orders, custom kits, or any questions. We're based in Kathmandu and reply within 24 hours.",
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'DANANA',
  description: 'World Cup jerseys, national team kits, and sportswear based in Kathmandu, Nepal.',
  url: 'https://danana.com.np',
  telephone: '+977-9810126827',
  email: 'dananafits@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  currenciesAccepted: 'NPR',
  paymentAccepted: 'Cash, Online Payment',
  areaServed: 'Nepal',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="max-w-[1100px] mx-auto w-full px-4 sm:px-6 py-16">

        <div className="mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-2">Get in touch</p>
          <h1 className="text-[32px] font-semibold text-black">Contact Us</h1>
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Phone</p>
              <a href="tel:+9779810126827" className="text-[15px] text-black hover:opacity-60 transition-opacity">
                +977 9810126827
              </a>
              <p className="text-[12px] text-[#696969] mt-1">Sun – Fri, 10am – 6pm NPT</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Email</p>
              <a href="mailto:dananafits@gmail.com" className="text-[15px] text-black hover:opacity-60 transition-opacity">
                dananafits@gmail.com
              </a>
              <p className="text-[12px] text-[#696969] mt-1">We reply within 24 hours</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#696969] mb-3">Location</p>
              <p className="text-[15px] text-black">Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
