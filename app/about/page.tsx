export default function AboutPage() {
  return (
    <div className="flex flex-col pb-20">

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961a28c?auto=format&fit=crop&q=80&w=2400"
          alt="DANANA"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 pb-10">
            <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">Our story</p>
            <h1 className="text-white text-5xl sm:text-6xl font-serif tracking-widest">DANANA</h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[860px] mx-auto w-full px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-[1fr_2px_1fr] gap-12 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-4">Where it started</p>
            <p className="text-[15px] text-[#333] leading-relaxed">
              DANANA was born in Kathmandu — out of a simple frustration. Quality sportswear was either too expensive to import or too generic to care about. We wanted something that felt local, looked sharp, and lasted.
            </p>
          </div>
          <div className="hidden md:block bg-gray-100 h-full w-full" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-4">What we stand for</p>
            <p className="text-[15px] text-[#333] leading-relaxed">
              Every piece we make is built around performance and everyday wearability. No unnecessary logos, no inflated prices — just clean design, honest materials, and fits that move with you whether you're on the pitch or off it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-10 text-center">What drives us</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200">
            {[
              { label: 'Crafted to last', body: 'We source fabrics that hold their colour and shape through season after season — because replacing gear every year shouldn\'t be the norm.' },
              { label: 'Priced fairly',   body: 'No middlemen, no markups for the sake of it. We price our kits so the whole team can afford to show up looking and feeling their best.' },
              { label: 'Made for Nepal',  body: 'Every design is tuned for our climate, our culture, our game. DANANA is a Kathmandu brand — and proud of it.' },
            ].map(({ label, body }) => (
              <div key={label} className="bg-[#f8f8f8] p-8">
                <h3 className="text-[15px] font-semibold text-black mb-3">{label}</h3>
                <p className="text-[14px] text-[#696969] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-[600px] mx-auto w-full px-4 sm:px-6 py-16 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#696969] mb-6">From us to you</p>
        <p className="text-[16px] text-[#333] leading-relaxed mb-8">
          Whether you're ordering for yourself, your club, or your school — you're part of what DANANA is building. We appreciate every order, every message, every piece of feedback.
        </p>
        <p className="text-[22px] font-serif tracking-widest text-black">Thank you for wearing DANANA.</p>
      </section>
    </div>
  );
}
