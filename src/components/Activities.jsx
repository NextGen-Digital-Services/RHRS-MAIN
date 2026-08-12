import { motion } from 'framer-motion'

const activities = [
  {
    title: 'Heritage Preservation',
    sub: 'सांस्कृतिक संरक्षण',
    desc: 'Restoration of ancient temples, preservation of manuscripts, and revival of traditional arts. We organize heritage walks, lectures, and cultural festivals so that our Sanatana culture lives on, generation after generation.',
    tags: ['Temple Restoration', 'Manuscripts', 'Cultural Festivals'],
  },
  {
    title: 'Disaster Relief',
    sub: 'आपदा राहत',
    desc: 'Rapid response teams deployed during floods, earthquakes, and other calamities. In the true spirit of Hindu seva, we reach the last person first — providing food, shelter, medical aid, and rehabilitation.',
    tags: ['Emergency Response', 'Medical Camps', 'Rehabilitation'],
  },
  {
    title: 'Educational Programs',
    sub: 'शिक्षा कार्यक्रम',
    desc: 'Scholarships for underprivileged students, Vedic schools, computer literacy camps, and career guidance sessions — empowering our youth to stand tall in knowledge and character.',
    tags: ['Scholarships', 'Vedic Schools', 'Digital Literacy'],
  },
  {
    title: 'Health & Wellness',
    sub: 'स्वास्थ्य सेवा',
    desc: 'Free health check-up camps, yoga and meditation sessions, Ayurveda awareness programs, and blood donation drives organized nationwide — for a healthy body and a pure soul.',
    tags: ['Health Camps', 'Yoga & Meditation', 'Blood Donation'],
  },
  {
    title: 'Environmental Care',
    sub: 'पर्यावरण संरक्षण',
    desc: 'Tree plantation drives, river cleaning campaigns, cow protection programs, and sustainable living workshops rooted in our traditional eco-conscious values.',
    tags: ['Plantation', 'River Cleaning', 'Gau Sewa'],
  },
  {
    title: 'Legal Aid & Rights',
    sub: 'कानूनी सहायता',
    desc: 'Free legal counseling for those in need, awareness camps on Hindu rights, and firm support for cases involving discrimination and the protection of our culture.',
    tags: ['Legal Camps', 'Rights Awareness', 'Pro Bono'],
  },
]

export default function Activities() {
  return (
    <section id="activities" className="py-16 lg:py-20 bg-saffron-bg">
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
            Our Activities
          </h2>
        </motion.div>

        <p className="text-base text-ink-muted leading-relaxed max-w-3xl mb-10">
          From heritage preservation to disaster relief, our activities span
          every domain that touches the lives of our communities.
        </p>

        <div className="space-y-4">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white border border-border hover:border-saffron/30 transition-all p-5 lg:p-6"
            >
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-start">
                <div className="lg:col-span-3">
                  <span className="font-deva text-xs text-saffron font-semibold block mb-1">
                    {activity.sub}
                  </span>
                  <h3 className="font-heading text-base lg:text-lg font-bold text-ink">
                    {activity.title}
                  </h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {activity.desc}
                  </p>
                </div>
                <div className="lg:col-span-3 flex flex-wrap gap-2">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider border border-border px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
