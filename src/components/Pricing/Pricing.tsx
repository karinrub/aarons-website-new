import { useState } from 'react'
import './Pricing.css'

type PricingMode = 'visiting' | 'weekly'
type GroupOptionId = 'small' | 'medium' | 'large'

const modes: Array<{ id: PricingMode; label: string }> = [
  { id: 'visiting', label: 'Visiting Maui' },
  { id: 'weekly', label: 'Weekly Lessons' },
]

const visitingOffers = [
  {
    title: 'Beach Lesson',
    description:
      'Private 30-minute ukulele session by the ocean. A relaxed introduction to music in a peaceful outdoor setting.',
    price: '$35',
    label: '30 minutes, 1 person',
  },
  {
    title: 'Extended Beach Session',
    description:
      'One full hour with more time to explore techniques, rhythm, and playing a complete song.',
    price: '$60',
    label: '1 hour, 1 person',
  },
]

const groupOptions: Record<
  GroupOptionId,
  { label: string; price: string; message: string }
> = {
  small: {
    label: '2 to 3 people',
    price: '$80',
    message: 'Total group price. Perfect for couples or close friends.',
  },
  medium: {
    label: '4 to 5 people',
    price: '$100',
    message: 'Total group price. Great for families traveling together.',
  },
  large: {
    label: '6 to 8 people',
    price: '$120',
    message: 'Total group price for a shared musical experience.',
  },
}

const weeklyOffers = [
  {
    title: 'Weekly Private Lessons',
    description:
      'Ongoing instruction with clear structure, consistent pacing, and long-term growth.',
    price: '$35',
    label: '30 minutes',
  },
  {
    title: 'Extended Weekly Lesson',
    description:
      'Extra time for deeper focus on technique, musical understanding, and repertoire.',
    price: '$60',
    label: '1 hour',
  },
]

function Pricing() {
  const [activeMode, setActiveMode] = useState<PricingMode>('visiting')
  const [selectedGroup, setSelectedGroup] = useState<GroupOptionId>('small')
  const group = groupOptions[selectedGroup]

  return (
    <section id="pricing" className="pricing">
      <div className="pricing__inner">
        <div className="pricing__header">
          <p className="pricing__label">Pricing</p>
          <h2 className="pricing__title">Simple pricing, clear options</h2>
          <p className="pricing__intro">
            Choose what fits your time on Maui or your long-term learning goals.
          </p>
        </div>

        <div className="pricing__mode-switch" role="group" aria-label="Pricing type">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className="pricing__mode-button"
              type="button"
              aria-pressed={activeMode === mode.id}
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="pricing__panel" key={activeMode}>
          {activeMode === 'visiting' ? (
            <div className="pricing__grid pricing__grid--visiting">
              {visitingOffers.map((offer) => (
                <article key={offer.title} className="pricing__card">
                  <div>
                    <p className="pricing__card-label">{offer.title}</p>
                    <p className="pricing__description">{offer.description}</p>
                  </div>
                  <div className="pricing__price-block">
                    <p className="pricing__price">{offer.price}</p>
                    <p className="pricing__price-detail">{offer.label}</p>
                  </div>
                </article>
              ))}

              <article className="pricing__card pricing__card--group">
                <div>
                  <p className="pricing__card-label">Group Lessons</p>
                  <p className="pricing__description">
                    A shared beach experience for couples, families, or small
                    groups traveling together.
                  </p>
                </div>

                <div
                  className="pricing__group-controls"
                  role="group"
                  aria-label="Group size"
                >
                  {(Object.entries(groupOptions) as Array<
                    [GroupOptionId, (typeof groupOptions)[GroupOptionId]]
                  >).map(([id, option]) => (
                    <button
                      key={id}
                      className="pricing__group-button"
                      type="button"
                      aria-pressed={selectedGroup === id}
                      onClick={() => setSelectedGroup(id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="pricing__group-result" aria-live="polite">
                  <div className="pricing__price-block">
                    <p className="pricing__price">{group.price}</p>
                    <p className="pricing__price-detail">{group.label}</p>
                  </div>
                  <p className="pricing__group-message">{group.message}</p>
                </div>
              </article>
            </div>
          ) : (
            <div className="pricing__grid pricing__grid--weekly">
              {weeklyOffers.map((offer) => (
                <article key={offer.title} className="pricing__card">
                  <div>
                    <p className="pricing__card-label">{offer.title}</p>
                    <p className="pricing__description">{offer.description}</p>
                  </div>
                  <div className="pricing__price-block">
                    <p className="pricing__price">{offer.price}</p>
                    <p className="pricing__price-detail">{offer.label}</p>
                  </div>
                </article>
              ))}

            </div>
          )}
        </div>

        <div className="pricing__cta-row">
          <a href="#contact" className="pricing__book-link">Book a Lesson</a>
        </div>

        <div className="pricing__notes">
          <p className="pricing__note">Ukuleles available for use during lessons</p>
          <p className="pricing__note">Payment accepted via cash or Venmo (US). International visitors welcome to ask about alternatives.</p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
