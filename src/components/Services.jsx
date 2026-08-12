import { motion } from 'framer-motion'

const services = [
  { icon: '◈', title: 'Legal Protection', hi: 'कानूनी संरक्षण', desc: 'Free legal aid for Hindus facing discrimination, false cases, hate crimes, and temple desecration. A panel of 500+ dedicated lawyers stands guard over Dharma.', border: 'border-l-red-400' },
  { icon: '▣', title: 'Temple Protection', hi: 'मंदिर सुरक्षा', desc: 'Monitoring threats, organizing protection committees, restoring ancient temples, and securing pilgrimage routes across the sacred land of Bharat.', border: 'border-l-saffron' },
  { icon: '✦', title: 'Human Rights', hi: 'मानवाधिकार', desc: 'Raising voice against atrocities, filing PILs, and engaging with NHRC and international bodies on Hindu rights issues across the globe.', border: 'border-l-blue-400' },
  { icon: '◇', title: 'Social Welfare', hi: 'समाज कल्याण', desc: 'Ration kits, medical camps, educational sponsorships, widow support, orphan care, and disaster relief — service in the spirit of Seva Paramo Dharma.', border: 'border-l-green-500' },
  { icon: '◈', title: 'Crisis Response', hi: 'संकट राहत', desc: '24×7 rapid response teams for Hindu communities facing violence, riots, hate campaigns, or natural disasters.', border: 'border-l-orange-400' },
  { icon: '✦', title: 'Women & Child Safety', hi: 'महिला एवं बाल सुरक्षा', desc: 'Special helpline, safe houses, counseling, legal support, and rehabilitation for women and children in distress.', border: 'border-l-pink-400' },
  { icon: '◇', title: 'Global Hindu Network', hi: 'वैश्विक हिन्दू नेटवर्क', desc: 'Connecting Hindus worldwide through international chapters, cultural exchange, community support, and global advocacy.', border: 'border-l-purple-400' },
]

export default function Services() {
  return (
    <section id="services" className="bg-ivory-dark">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-deva text-saffron text-xs font-bold uppercase tracking-[0.15em] mb-1">॥ हमारी सेवाएँ ॥</p>
          <div className="w-[60px] h-[3px] bg-saffron mx-auto mb-5" />
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-ink">Our Services</h2>
          <p className="text-sm lg:text-base text-ink-muted max-w-2xl mx-auto mt-3">From legal protection to humanitarian aid — RHRS serves the Hindu community across every domain of need.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className={`${s.border} border-l-4 group bg-white border border-border hover:border-saffron/30 rounded-sm p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
              <span className="text-saffron text-xl block mb-3">{s.icon}</span>
              <h3 className="font-heading text-sm font-bold text-ink mb-1 group-hover:text-saffron transition-colors duration-300">{s.title}</h3>
              <p className="font-deva text-[11px] text-saffron font-semibold mb-2">{s.hi}</p>
              <p className="text-xs text-ink-soft/80 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
