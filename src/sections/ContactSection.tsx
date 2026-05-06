import { useState } from 'react'
import type { FormEvent } from 'react'
import contactImage from '../assets/images/aaron/aaron-playing-1.jpg'
import './ContactSection.css'

type VisitType = 'visiting' | 'weekly' | ''
type VisitLesson = 'Beach Lesson' | 'Extended Beach Session' | 'Group Lesson' | ''
type Instrument = 'Guitar' | 'Ukulele' | ''
type WeeklyDuration = '30 minutes' | '1 hour' | ''
type GroupSize = '2–3 people' | '4–5 people' | '6–8 people' | ''
type PreferredContact = 'Call' | 'Text' | 'Email' | ''

const visitTypeOptions: Array<{ id: Exclude<VisitType, ''>; label: string }> = [
  { id: 'visiting', label: 'Visiting Maui' },
  { id: 'weekly', label: 'Weekly Lessons' },
]

const visitLessons: Exclude<VisitLesson, ''>[] = [
  'Beach Lesson',
  'Extended Beach Session',
  'Group Lesson',
]

const instruments: Exclude<Instrument, ''>[] = ['Guitar', 'Ukulele']

const weeklyDurations: Exclude<WeeklyDuration, ''>[] = ['30 minutes', '1 hour']

const groupSizes: Exclude<GroupSize, ''>[] = ['2–3 people', '4–5 people', '6–8 people']

const preferredContactOptions: Exclude<PreferredContact, ''>[] = ['Call', 'Text', 'Email']

function ContactSection() {
  const [visitType, setVisitType] = useState<VisitType>('')
  const [visitLesson, setVisitLesson] = useState<VisitLesson>('')
  const [instrument, setInstrument] = useState<Instrument>('')
  const [weeklyDuration, setWeeklyDuration] = useState<WeeklyDuration>('')
  const [groupSize, setGroupSize] = useState<GroupSize>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredContact, setPreferredContact] = useState<PreferredContact>('')
  const [preferredTiming, setPreferredTiming] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error] = useState('')

  const handleVisitTypeChange = (value: Exclude<VisitType, ''>) => {
    setVisitType(value)
    setVisitLesson('')
    setInstrument('')
    setWeeklyDuration('')
    setGroupSize('')
  }

  const handleVisitLessonChange = (value: Exclude<VisitLesson, ''>) => {
    setVisitLesson(value)
    if (value !== 'Group Lesson') {
      setGroupSize('')
    }
  }

  const isSubmitDisabled =
    isSubmitting ||
    !visitType ||
    (visitType === 'visiting' &&
      (!visitLesson || (visitLesson === 'Group Lesson' && !groupSize))) ||
    (visitType === 'weekly' && (!instrument || !weeklyDuration))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    console.log({
      visitType,
      visitLesson,
      instrument,
      weeklyDuration,
      groupSize,
      name,
      email,
      phone,
      preferredContact,
      preferredTiming,
      message,
    })

    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__inner">
        <div className="contact-section__intro">
          <div className="contact-section__image">
            <img src={contactImage} alt="Aaron with a guitar on Maui" />
          </div>

          <div className="contact-section__copy">
            <h2 className="contact-section__title">
              Ready to play music on Maui?
            </h2>
            <p className="contact-section__text">
              Send a request with the lesson type, timing, and best way to
              reach you. Aaron can help you choose the right option.
            </p>

            <div className="contact-section__details">
              <p className="contact-section__phone">
                <span className="contact-section__phone-label">Phone</span>
                <a href="tel:+18083711821" className="contact-section__phone-link">
                  808-371-1821
                </a>
              </p>
              <p className="contact-section__location">
                For the fastest booking, call or text Aaron directly.
              </p>
              <p className="contact-section__location">
                Lessons available around Kihei, Wailea, beach parks, vacation
                rentals, and by arrangement.
              </p>
            </div>
          </div>
        </div>

        <div className="contact-section__card">
          {isSubmitted ? (
            <p className="contact-section__success">
              Thanks! I&apos;ll get back to you soon.
            </p>
          ) : (
            <form className="contact-section__form" onSubmit={handleSubmit}>
              <p className="contact-section__form-note">
                Start by choosing one path below. The send button unlocks after
                the lesson details are selected.
              </p>

              <fieldset className="contact-section__fieldset">
                <legend className="contact-section__legend">
                  What brings you here?
                </legend>
                <div className="contact-section__options">
                  {visitTypeOptions.map(({ id, label }) => (
                    <button
                      aria-pressed={visitType === id}
                      className="contact-section__option"
                      key={id}
                      onClick={() => handleVisitTypeChange(id)}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="contact-section__choice-area">
                {visitType === 'visiting' && (
                  <div className="contact-section__path-content">
                    <fieldset className="contact-section__fieldset">
                      <legend className="contact-section__legend">
                        Choose a lesson
                      </legend>
                      <div className="contact-section__options contact-section__options--three">
                        {visitLessons.map((option) => (
                          <button
                            aria-pressed={visitLesson === option}
                            className="contact-section__option"
                            key={option}
                            onClick={() => handleVisitLessonChange(option)}
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset
                      aria-hidden={visitLesson !== 'Group Lesson' ? true : undefined}
                      className="contact-section__fieldset contact-section__reveal"
                      data-active={visitLesson === 'Group Lesson'}
                      disabled={visitLesson !== 'Group Lesson'}
                    >
                      <legend className="contact-section__legend">
                        Group size
                      </legend>
                      <div className="contact-section__options contact-section__options--three">
                        {groupSizes.map((option) => (
                          <button
                            aria-pressed={groupSize === option}
                            className="contact-section__option"
                            key={option}
                            onClick={() => setGroupSize(option)}
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                {visitType === 'weekly' && (
                  <div className="contact-section__path-content">
                    <fieldset className="contact-section__fieldset">
                      <legend className="contact-section__legend">
                        Choose an instrument
                      </legend>
                      <div className="contact-section__options">
                        {instruments.map((option) => (
                          <button
                            aria-pressed={instrument === option}
                            className="contact-section__option"
                            key={option}
                            onClick={() => setInstrument(option)}
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="contact-section__fieldset">
                      <legend className="contact-section__legend">
                        Lesson duration
                      </legend>
                      <div className="contact-section__options">
                        {weeklyDurations.map((option) => (
                          <button
                            aria-pressed={weeklyDuration === option}
                            className="contact-section__option"
                            key={option}
                            onClick={() => setWeeklyDuration(option)}
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}
              </div>

              <div className="contact-section__fields">
                <label>
                  <span className="contact-section__label">Name</span>
                  <input
                    className="contact-section__input"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                    type="text"
                    value={name}
                  />
                </label>

                <label>
                  <span className="contact-section__label">Email</span>
                  <input
                    className="contact-section__input"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </label>

                <label>
                  <span className="contact-section__label">Phone</span>
                  <input
                    className="contact-section__input"
                    name="phone"
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Your phone number"
                    type="tel"
                    value={phone}
                  />
                </label>

                <fieldset className="contact-section__fieldset">
                  <legend className="contact-section__legend">
                    Best way to reach you
                  </legend>
                  <div className="contact-section__options contact-section__options--three">
                    {preferredContactOptions.map((option) => (
                      <button
                        aria-pressed={preferredContact === option}
                        className="contact-section__option"
                        key={option}
                        onClick={() => setPreferredContact(option)}
                        type="button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label>
                  <span className="contact-section__label">
                    Preferred date or time
                  </span>
                  <input
                    className="contact-section__input"
                    name="preferredTiming"
                    onChange={(event) => setPreferredTiming(event.target.value)}
                    placeholder="Example: Friday morning or next week"
                    type="text"
                    value={preferredTiming}
                  />
                </label>

                <label>
                  <span className="contact-section__label">Message</span>
                  <textarea
                    className="contact-section__textarea"
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell me about your trip, goals, or preferred timing."
                    value={message}
                  />
                </label>
              </div>

              <input name="fax" style={{ display: 'none' }} type="text" />

              {error && <p className="contact-section__error">{error}</p>}

              <button
                className="contact-section__submit"
                disabled={isSubmitDisabled}
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
