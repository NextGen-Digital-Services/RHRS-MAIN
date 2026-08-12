import { motion } from 'framer-motion'

const pillars = [
  {
    icon: '🏛️',
    title: 'Cultural Heritage',
    hi: 'सांस्कृतिक विरासत',
    desc: 'Preserving Hindu art, architecture, music, philosophy, and rituals through festivals, workshops, heritage walks, and temple restoration projects across the sacred land of Bharat.',
  },
  {
    icon: '🤝',
    title: 'Social Welfare',
    hi: 'समाज कल्याण',
    desc: 'Providing food, education, healthcare, and shelter to the underprivileged. Our welfare programs reach remote communities in the true spirit of Seva Paramo Dharma.',
  },
  {
    icon: '🙏',
    title: 'Volunteer Services',
    hi: 'स्वयंसेवक सेवा',
    desc: 'Building a disciplined force of sevadars who serve selflessly during natural calamities, community events, and daily social upliftment activities.',
  },
  {
    icon: '📢',
    title: 'Public Awareness',
    hi: 'जन जागरूकता',
    desc: 'Spreading awareness about Hindu rights, cultural identity, environmental consciousness, and national issues through campaigns, seminars, and digital media.',
  },
  {
    icon: '💝',
    title: 'Community Assistance',
    hi: 'सामुदायिक सहायता',
    desc: 'Supporting families with ration kits, medical aid, educational sponsorships, legal assistance, and counseling services for those in need.',
  },
  {
    icon: '🤲',
    title: 'Membership & Unity',
    hi: 'सदस्यता एवं एकता',
    desc: 'Uniting Hindus worldwide under a single banner of service and protection. Every member strengthens the collective voice and reach of the community.',
  },
]

export default function Pillars() {
  return (
    <section id="pillars" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="section-title-deco" />
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-ink">
            Our Core Pillars
          </h2>
        </motion.div>

        <p className="text-base text-ink-muted leading-relaxed max-w-3xl mb-10">
          The foundation of our organization rests on six fundamental pillars that
          guide every initiative, program, and mission we undertake in service of
          the nation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border border-border hover:border-saffron/40 p-6 bg-white hover:bg-saffron-bg/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">{pillar.icon}</span>
                <div>
                  <h3 className="font-heading text-base font-bold text-ink mb-1 group-hover:text-saffron transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-deva text-xs text-saffron font-semibold mb-2">{pillar.hi}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
