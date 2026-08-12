import { motion } from 'framer-motion'

const updates = [
  {
    date: 'JUL 15, 2026',
    title: 'Grand Temple Restoration Initiative Launched in Varanasi',
    summary:
      'RHRS has commenced the restoration of three ancient temples along the Ganges. The project involves 200+ volunteers and aims to complete within 18 months while preserving original architectural styles.',
  },
  {
    date: 'JUN 28, 2026',
    title: 'Free Health Camp Serves Over 3,000 Villagers in Rajasthan',
    summary:
      'A mega health check-up camp was organized in 15 remote villages of Rajasthan. 45 doctors volunteered, providing free consultations, medicines, and basic diagnostic tests.',
  },
  {
    date: 'MAY 12, 2026',
    title: 'National Workshop on Vedic Sciences & Modern Applications',
    summary:
      'A 3-day workshop on Vedic mathematics, astronomy, and Ayurveda was held in Delhi, attended by over 500 scholars, students, and researchers from across the nation.',
  },
  {
    date: 'APR 05, 2026',
    title: 'Annual Membership Drive Reaches 1.5 Lakh New Members',
    summary:
      'RHRS annual membership campaign crossed the 1.5 lakh milestone. New shakhas have been established in 12 states, expanding our reach to grassroots communities.',
  },
]

export default function News() {
  return (
    <section className="py-16 lg:py-20 bg-white">
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
            Latest Updates
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-2">
          {updates.map((update, i) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="news-card group"
            >
              <span className="text-[11px] font-semibold text-saffron tracking-wider">
                {update.date}
              </span>
              <h3 className="font-heading text-base lg:text-lg font-bold text-ink mt-1 mb-2 group-hover:text-saffron transition-colors">
                {update.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed mb-2">
                {update.summary}
              </p>
              <a href="#" className="read-more">
                Read Full Article
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 pt-6 border-t border-border"
        >
          <a
            href="#"
            className="inline-block text-sm font-semibold text-saffron hover:text-saffron-dark transition-colors"
          >
            View All Updates &darr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
