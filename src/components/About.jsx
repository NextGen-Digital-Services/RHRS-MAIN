import { motion } from 'framer-motion'

const stats = [
  { value: '500+', label: 'Cities Covered' },
  { value: '2L+', label: 'Active Members' },
  { value: '50K+', label: 'Cases Helped' },
  { value: '15+', label: 'Years of Seva' },
]

const cards = [
  { icon: '◈', title: 'Our Vision', hi: 'हमारा दृष्टिकोण', desc: 'A fearless, united, and prosperous Hindu society where every Hindu lives with dignity, security, and pride in their Dharma.' },
  { icon: '✦', title: 'Our Mission', hi: 'हमारा लक्ष्य', desc: 'To protect every Hindu from injustice, preserve our sacred heritage, promote Hindu unity, and serve humanity.' },
  { icon: '◇', title: 'Our Pledge', hi: 'हमारा संकल्प', desc: 'We stand with every Hindu in need, raise our voice against injustice, and protect our temples and traditions.' },
]

export default function About() {
  return (
    <section id="about" className="bg-saffron-bg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-deva text-saffron text-xs font-bold uppercase tracking-[0.15em] mb-1">॥ परिचय ॥</p>
          <div className="w-[60px] h-[3px] bg-saffron mx-auto mb-5" />
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-ink">About RHRS</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white border border-border border-l-4 border-l-saffron rounded-sm p-6 lg:p-8 mb-6 lg:mb-8">
              <h3 className="font-heading text-xl font-bold text-ink mb-4">हमारा उद्देश्य — Our Purpose</h3>
              <p className="font-deva text-sm lg:text-base text-ink-soft leading-relaxed mb-4">
                राष्ट्रीय हिन्दू रक्षक संघ 'धर्मो रक्षति रक्षितः' के सिद्धांत पर स्थापित एक महान राष्ट्रव्यापी संगठन है।
                हमारा उद्देश्य केवल संगठन नहीं, वरन् हिन्दू समाज को एकसूत्र में बांधकर उसकी चेतना, गौरव और स्वाभिमान को पुनः जाग्रत करना है।
                यह पवित्र भूमि भारत हिन्दूत्व की आत्मा है — और इस आत्मा की रक्षा ही हमारा परम कर्तव्य है।
              </p>
              <p className="text-sm lg:text-base text-ink-soft leading-relaxed mb-4">
                Rashtriya Hindu Rakshak Sangh (RHRS) was established with the sacred mission of protecting Hindu Dharma, culture, and civilization.
                We are a nationwide organization of dedicated Hindus working selflessly for the security, dignity, and empowerment of the Hindu community.
              </p>
              <p className="text-sm lg:text-base text-ink-soft leading-relaxed">
                From providing <strong>legal aid</strong> to Hindus facing persecution, to <strong>preserving temples</strong>,
                and running <strong>social welfare programs</strong> — our work spans every aspect of Hindu life.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/80 border border-border rounded-sm p-5 lg:p-6 text-center transition-all duration-300 hover:border-saffron/20">
                  <div className="font-heading text-2xl lg:text-3xl font-bold text-saffron">{s.value}</div>
                  <div className="text-[10px] text-ink-muted font-medium uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5 lg:space-y-6">
            {cards.map((item) => (
              <div key={item.title} className="group bg-white border border-border hover:border-saffron/30 rounded-sm p-6 lg:p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="text-saffron text-2xl mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-heading text-base font-bold text-ink mb-1 group-hover:text-saffron transition-colors duration-300">{item.title}</h4>
                    <p className="font-deva text-xs text-saffron font-semibold mb-2">{item.hi}</p>
                    <p className="text-sm text-ink-soft leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
