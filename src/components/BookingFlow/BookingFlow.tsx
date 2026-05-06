import { useState } from 'react'
import type { FormEvent } from 'react'
import touristsImageOne from '../../assets/images/aaron/aaron-tourists-1.jpg'
import touristsImageTwo from '../../assets/images/aaron/aaron-tourists-2.jpg'
import touristsImageThree from '../../assets/images/aaron/aaron-tourists-3.jpg'
import bookingFormImage from '../../assets/images/aaron/aaron-bookingForm.jpg'
import onlyMeImage from '../../assets/images/aaron/aaron-onlyMe.jpg'
import { getLessonById, type Lesson } from '../../data/lessons'
import './BookingFlow.css'

type BookingPath = 'tourist' | 'weekly' | null
type TouristStep = 1 | 2 | 3
type TouristGroup = 'solo' | 'couple-friends' | 'family' | 'large-group' | null
type TouristDuration = '30 minutes' | '1 hour' | null
type WeeklyStep = 1 | 2
type WeeklyInstrument = 'guitar' | 'ukulele' | null
type WeeklyDuration = '30 minutes' | '1 hour' | null
type PreferredContact = 'Text' | 'Email' | 'Call' | ''

const touristGroupOptions: Array<{
  id: Exclude<TouristGroup, null>
  imageAlt?: string
  imageSrc?: string
  primaryLabel: string
  secondaryLabel: string
}> = [
  {
    id: 'solo',
    imageAlt: 'Aaron teaching a private guitar lesson outdoors on Maui',
    imageSrc: onlyMeImage,
    primaryLabel: '1 person',
    secondaryLabel: 'Just me',
  },
  {
    id: 'couple-friends',
    imageAlt: 'Visitors learning ukulele during a Maui beach lesson',
    imageSrc: touristsImageOne,
    primaryLabel: '2-3 people',
    secondaryLabel: 'Couples or friends',
  },
  {
    id: 'family',
    imageAlt: 'Aaron teaching visitors during an outdoor Maui lesson',
    imageSrc: touristsImageThree,
    primaryLabel: '4-5 people',
    secondaryLabel: 'Family or small group',
  },
  {
    id: 'large-group',
    imageAlt: 'Beach lesson guests playing ukulele together',
    imageSrc: touristsImageTwo,
    primaryLabel: '6-8 people',
    secondaryLabel: 'Large group',
  },
]

function resolveTouristLessonId(
  group: TouristGroup,
  duration: TouristDuration,
) {
  if (group === 'solo' && duration === '30 minutes') {
    return 'beach-lesson'
  }

  if (group === 'solo' && duration === '1 hour') {
    return 'extended-beach-session'
  }

  if (group === 'couple-friends' && duration === '1 hour') {
    return 'group-2-3'
  }

  if (group === 'family' && duration === '1 hour') {
    return 'group-4-5'
  }

  if (group === 'large-group' && duration === '1 hour') {
    return 'group-6-8'
  }

  return null
}

function resolveWeeklyLessonId(duration: WeeklyDuration) {
  if (duration === '30 minutes') {
    return 'weekly-private-30'
  }

  if (duration === '1 hour') {
    return 'weekly-extended-60'
  }

  return null
}

function getTouristHeadline(
  group: TouristGroup,
  duration: TouristDuration,
  lesson: Lesson,
) {
  if (group === 'solo') {
    return `A private ${duration} ukulele lesson on the beach, just for you.`
  }

  if (group === 'family') {
    return 'A one-hour beach lesson for your family or small group.'
  }

  if (group === 'couple-friends') {
    return 'A one-hour beach lesson for 2-3 people.'
  }

  if (group === 'large-group') {
    return 'A one-hour beach lesson for your large group.'
  }

  return `Your ${lesson.summaryLabel.toLowerCase()} is ready.`
}

function getWeeklyHeadline(
  instrument: WeeklyInstrument,
  duration: WeeklyDuration,
) {
  const instrumentLabel = instrument ?? 'music'

  if (duration === '30 minutes') {
    return `Private weekly ${instrumentLabel} lessons tailored to your pace in focused 30-minute sessions.`
  }

  return `Private weekly ${instrumentLabel} lessons tailored to your pace in a deeper one-hour format.`
}

function TouristConfirmation({
  email,
  isSubmitted,
  isSubmitting,
  lesson,
  name,
  phone,
  preferredContact,
  touristDuration,
  touristGroup,
  onEmailChange,
  onNameChange,
  onPhoneChange,
  onPreferredContactChange,
  onSubmit,
}: {
  email: string
  isSubmitted: boolean
  isSubmitting: boolean
  lesson: Lesson
  name: string
  phone: string
  preferredContact: PreferredContact
  touristDuration: TouristDuration
  touristGroup: TouristGroup
  onEmailChange: (value: string) => void
  onNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onPreferredContactChange: (value: Exclude<PreferredContact, ''>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const headline = getTouristHeadline(touristGroup, touristDuration, lesson)
  const isSubmitDisabled = isSubmitting || !name || !email || !preferredContact

  return (
    <div className="booking-flow__confirmation">
      <div className="booking-flow__confirmation-visual">
        <img
          src={bookingFormImage}
          alt="Aaron teaching a guitar lesson outdoors on Maui"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="booking-flow__confirmation-side">
        <div className="booking-flow__confirmation-content">
          <p className="booking-flow__confirmation-kicker">
            {lesson.summaryLabel}
          </p>
          <h4 className="booking-flow__confirmation-title">
            {headline}
          </h4>
          <p className="booking-flow__confirmation-description">
            {lesson.description}
          </p>

          <p className="booking-flow__confirmation-price">
            {lesson.priceLabel}
          </p>

          <dl className="booking-flow__lesson-facts">
            <div>
              <dt>Duration</dt>
              <dd>{lesson.duration}</dd>
            </div>
            {lesson.groupSize && (
              <div>
                <dt>Group size</dt>
                <dd>{lesson.groupSize}</dd>
              </div>
            )}
          </dl>
        </div>

        {isSubmitted ? (
          <div className="booking-flow__success">
            Thanks — Aaron will reach out shortly.
          </div>
        ) : (
          <form className="booking-flow__form" onSubmit={onSubmit}>
            <label className="booking-flow__field">
              <span>Name</span>
              <input
                name="name"
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Your name"
                required
                type="text"
                value={name}
              />
            </label>

            <label className="booking-flow__field">
              <span>Email</span>
              <input
                name="email"
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="booking-flow__field">
              <span>Phone</span>
              <input
                name="phone"
                onChange={(event) => onPhoneChange(event.target.value)}
                placeholder="Your phone number"
                type="tel"
                value={phone}
              />
            </label>

            <fieldset className="booking-flow__contact-fieldset">
              <legend>Preferred contact</legend>
              <div className="booking-flow__contact-options">
                {(['Text', 'Email', 'Call'] as const).map((option) => (
                  <button
                    aria-pressed={preferredContact === option}
                    className="booking-flow__contact-option"
                    key={option}
                    onClick={() => onPreferredContactChange(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <input name="fax" style={{ display: 'none' }} type="text" />

            <button
              className="booking-flow__submit"
              disabled={isSubmitDisabled}
              type="submit"
            >
              {isSubmitting ? 'Sending...' : 'Send My Booking Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function WeeklyConfirmation({
  email,
  instrument,
  isSubmitted,
  isSubmitting,
  lesson,
  name,
  phone,
  preferredContact,
  preferredTiming,
  weeklyDuration,
  onEmailChange,
  onNameChange,
  onPhoneChange,
  onPreferredContactChange,
  onPreferredTimingChange,
  onSubmit,
}: {
  email: string
  instrument: WeeklyInstrument
  isSubmitted: boolean
  isSubmitting: boolean
  lesson: Lesson
  name: string
  phone: string
  preferredContact: PreferredContact
  preferredTiming: string
  weeklyDuration: WeeklyDuration
  onEmailChange: (value: string) => void
  onNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onPreferredContactChange: (value: Exclude<PreferredContact, ''>) => void
  onPreferredTimingChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const isSubmitDisabled = isSubmitting || !name || !email || !preferredContact
  const headline = getWeeklyHeadline(instrument, weeklyDuration)

  return (
    <div className="booking-flow__confirmation booking-flow__confirmation--weekly">
      <div className="booking-flow__confirmation-visual booking-flow__confirmation-visual--weekly">
        <img
          src={bookingFormImage}
          alt="Aaron teaching a guitar lesson outdoors on Maui"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="booking-flow__confirmation-side">
        <div className="booking-flow__confirmation-content">
          <p className="booking-flow__confirmation-kicker">
            Weekly {instrument} lessons
          </p>
          <h4 className="booking-flow__confirmation-title">
            {headline}
          </h4>
          <p className="booking-flow__confirmation-description">
            {lesson.description}
          </p>

          <p className="booking-flow__confirmation-price">
            {lesson.priceLabel}
          </p>

          <dl className="booking-flow__lesson-facts">
            <div>
              <dt>Duration</dt>
              <dd>{weeklyDuration}</dd>
            </div>
            <div>
              <dt>Instrument</dt>
              <dd>{instrument}</dd>
            </div>
          </dl>
        </div>

        {isSubmitted ? (
          <div className="booking-flow__success">
            Thanks — Aaron will reach out shortly.
          </div>
        ) : (
          <form className="booking-flow__form" onSubmit={onSubmit}>
          <label className="booking-flow__field">
            <span>Name</span>
            <input
              name="name"
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="Your name"
              required
              type="text"
              value={name}
            />
          </label>

          <label className="booking-flow__field">
            <span>Email</span>
            <input
              name="email"
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="booking-flow__field">
            <span>Phone</span>
            <input
              name="phone"
              onChange={(event) => onPhoneChange(event.target.value)}
              placeholder="Your phone number"
              type="tel"
              value={phone}
            />
          </label>

          <fieldset className="booking-flow__contact-fieldset">
            <legend>Preferred contact</legend>
            <div className="booking-flow__contact-options">
              {(['Text', 'Email', 'Call'] as const).map((option) => (
                <button
                  aria-pressed={preferredContact === option}
                  className="booking-flow__contact-option"
                  key={option}
                  onClick={() => onPreferredContactChange(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="booking-flow__field">
            <span>Preferred timing</span>
            <input
              name="preferredTiming"
              onChange={(event) => onPreferredTimingChange(event.target.value)}
              placeholder="Example: Tuesday afternoon"
              type="text"
              value={preferredTiming}
            />
          </label>

          <input name="fax" style={{ display: 'none' }} type="text" />

          <button
            className="booking-flow__submit"
            disabled={isSubmitDisabled}
            type="submit"
          >
            {isSubmitting ? 'Sending...' : 'Send My Lesson Request'}
          </button>
          </form>
        )}
      </div>
    </div>
  )
}

function BookingFlow() {
  const [path, setPath] = useState<BookingPath>(null)
  const [touristStep, setTouristStep] = useState<TouristStep>(1)
  const [touristGroup, setTouristGroup] = useState<TouristGroup>(null)
  const [touristDuration, setTouristDuration] =
    useState<TouristDuration>(null)
  const [weeklyStep, setWeeklyStep] = useState<WeeklyStep>(1)
  const [weeklyInstrument, setWeeklyInstrument] =
    useState<WeeklyInstrument>(null)
  const [weeklyDuration, setWeeklyDuration] = useState<WeeklyDuration>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredContact, setPreferredContact] =
    useState<PreferredContact>('')
  const [preferredTiming, setPreferredTiming] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const touristLessonId = resolveTouristLessonId(
    touristGroup,
    touristDuration,
  )
  const touristLesson = touristLessonId
    ? getLessonById(touristLessonId)
    : undefined
  const weeklyLessonId = resolveWeeklyLessonId(weeklyDuration)
  const weeklyLesson = weeklyLessonId
    ? getLessonById(weeklyLessonId)
    : undefined

  const handleTouristGroupSelect = (group: Exclude<TouristGroup, null>) => {
    setTouristGroup(group)
    setIsSubmitted(false)

    if (group === 'solo') {
      setTouristDuration(null)
      setTouristStep(2)
      return
    }

    setTouristDuration('1 hour')
    setTouristStep(3)
  }

  const handleTouristBack = () => {
    if (touristStep === 3) {
      setTouristStep(touristGroup === 'solo' ? 2 : 1)
      return
    }

    if (touristStep === 2) {
      setTouristStep(1)
      return
    }

    setPath(null)
  }

  const handleTouristDurationSelect = (
    duration: Exclude<TouristDuration, null>,
  ) => {
    setTouristDuration(duration)
    setIsSubmitted(false)
    setTouristStep(3)
  }

  const handlePathSelect = (nextPath: Exclude<BookingPath, null>) => {
    setPath(nextPath)

    if (nextPath === 'tourist') {
      setTouristStep(1)
      setTouristGroup(null)
      setTouristDuration(null)
      setIsSubmitted(false)
    }

    if (nextPath === 'weekly') {
      setWeeklyStep(1)
      setWeeklyInstrument(null)
      setWeeklyDuration(null)
      setIsSubmitted(false)
    }
  }

  const handleWeeklyBack = () => {
    if (weeklyStep === 2) {
      setWeeklyStep(1)
      return
    }

    setPath(null)
  }

  const handleWeeklySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!weeklyLesson || !weeklyLessonId) {
      return
    }

    setIsSubmitting(true)

    const payload = {
      audience: 'weekly',
      lessonId: weeklyLessonId,
      lesson: {
        type: weeklyLesson.type,
      },
      weeklyInstrument,
      weeklyDuration,
      price: weeklyLesson.price,
      name,
      email,
      phone,
      preferredContact,
      preferredTiming,
    }

    console.log(payload)

    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const handleTouristSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!touristLesson || !touristLessonId) {
      return
    }

    setIsSubmitting(true)

    const payload = {
      lessonId: touristLessonId,
      lesson: {
        type: touristLesson.type,
      },
      touristGroup,
      touristDuration,
      price: touristLesson.price,
      name,
      email,
      phone,
      preferredContact,
    }

    console.log(payload)

    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 900)
  }

  const stepIndicator = (
    <div className="booking-flow__steps" aria-label={`Step ${touristStep} of 3`}>
      {[1, 2, 3].map((step) => (
        <span
          className="booking-flow__step-dot"
          data-active={touristStep === step ? 'true' : undefined}
          key={step}
        >
          {step}
        </span>
      ))}
    </div>
  )

  return (
    <section id="pricing" className="booking-flow">
      <div className="booking-flow__inner">
        <div className="booking-flow__intro">
          <p className="booking-flow__label">Book a Lesson</p>
          <h2 className="booking-flow__title">
            Start with the kind of lesson you need
          </h2>
          <p className="booking-flow__text">
            Choose the path that fits your time on Maui. The next step will
            guide you through the right lesson request.
          </p>
        </div>

        <div className="booking-flow__surface">
          <div id="contact" className="booking-flow__content">
            {path === null ? (
              <div className="booking-flow__entry" aria-label="Choose a booking path">
                <button
                  className="booking-flow__path booking-flow__path--primary"
                  type="button"
                  onClick={() => handlePathSelect('tourist')}
                >
                  <span className="booking-flow__path-visual" aria-hidden="true" />
                  <span className="booking-flow__path-body">
                    <span className="booking-flow__path-kicker">
                      Visiting Maui
                    </span>
                    <span className="booking-flow__path-title">
                      I&apos;m visiting Maui
                    </span>
                    <span className="booking-flow__path-copy">
                      Find a beach lesson for yourself, friends, or family while
                      you&apos;re here.
                    </span>
                  </span>
                  <span className="booking-flow__path-arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                <button
                  className="booking-flow__path booking-flow__path--secondary"
                  type="button"
                  onClick={() => handlePathSelect('weekly')}
                >
                  <span
                    className="booking-flow__path-token"
                    aria-hidden="true"
                  />
                  <span className="booking-flow__path-body">
                    <span className="booking-flow__path-kicker">
                      Ongoing lessons
                    </span>
                    <span className="booking-flow__path-title">
                      I want weekly lessons
                    </span>
                    <span className="booking-flow__path-copy">
                      Start a regular guitar or ukulele lesson plan on Maui.
                    </span>
                  </span>
                  <span className="booking-flow__path-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            ) : path === 'tourist' ? (
              <div className="booking-flow__tourist" aria-live="polite">
                <div className="booking-flow__flow-top">
                  <button
                    className="booking-flow__back"
                    type="button"
                    onClick={handleTouristBack}
                  >
                    Back
                  </button>
                  {stepIndicator}
                </div>

                {touristStep === 1 && (
                  <div className="booking-flow__step">
                    <p className="booking-flow__placeholder-label">
                      Visiting Maui
                    </p>
                    <h3 className="booking-flow__question">
                      How many people are joining?
                    </h3>
                    <p className="booking-flow__step-subtitle">
                      Choose the option that best fits your group.
                    </p>

                    <div className="booking-flow__choice-list">
                      {touristGroupOptions.map((option) => (
                        <button
                          className="booking-flow__choice-panel"
                          key={option.id}
                          type="button"
                          onClick={() => handleTouristGroupSelect(option.id)}
                        >
                          <span className="booking-flow__choice-visual">
                            {option.imageSrc && option.imageAlt && (
                              <img
                                src={option.imageSrc}
                                alt={option.imageAlt}
                                loading="lazy"
                                decoding="async"
                              />
                            )}
                          </span>
                          <span className="booking-flow__choice-label">
                            {option.primaryLabel}
                          </span>
                          <span className="booking-flow__choice-description">
                            {option.secondaryLabel}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {touristStep === 2 && touristGroup === 'solo' && (
                  <div className="booking-flow__step">
                    <p className="booking-flow__placeholder-label">
                      Visiting Maui
                    </p>
                    <h3 className="booking-flow__question">
                      How long would you like to play?
                    </h3>
                    <p className="booking-flow__step-subtitle">
                      Choose the lesson length.
                    </p>
                    <div className="booking-flow__duration-list">
                      <button
                        className="booking-flow__duration-option"
                        type="button"
                        onClick={() => handleTouristDurationSelect('30 minutes')}
                      >
                        <span className="booking-flow__duration-label">
                          30 minutes
                        </span>
                      </button>
                      <button
                        className="booking-flow__duration-option"
                        type="button"
                        onClick={() => handleTouristDurationSelect('1 hour')}
                      >
                        <span className="booking-flow__duration-label">
                          1 hour
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {touristStep === 3 && touristLesson && (
                  <div className="booking-flow__step">
                    <TouristConfirmation
                      email={email}
                      isSubmitted={isSubmitted}
                      isSubmitting={isSubmitting}
                      lesson={touristLesson}
                      name={name}
                      phone={phone}
                      preferredContact={preferredContact}
                      touristDuration={touristDuration}
                      touristGroup={touristGroup}
                      onEmailChange={setEmail}
                      onNameChange={setName}
                      onPhoneChange={setPhone}
                      onPreferredContactChange={setPreferredContact}
                      onSubmit={handleTouristSubmit}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="booking-flow__weekly" aria-live="polite">
                <div className="booking-flow__flow-top">
                  <button
                    className="booking-flow__back"
                    type="button"
                    onClick={handleWeeklyBack}
                  >
                    Back
                  </button>
                  <div className="booking-flow__steps" aria-label={`Step ${weeklyStep} of 2`}>
                    {[1, 2].map((step) => (
                      <span
                        className="booking-flow__step-dot"
                        data-active={weeklyStep === step ? 'true' : undefined}
                        key={step}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                {weeklyStep === 1 && (
                  <div className="booking-flow__step booking-flow__weekly-step">
                    <p className="booking-flow__placeholder-label">
                      Weekly Lessons
                    </p>
                    <h3 className="booking-flow__question">
                      Let&apos;s get started
                    </h3>
                    <p className="booking-flow__step-subtitle">
                      A few quick choices to personalize your lessons.
                    </p>

                    <div className="booking-flow__weekly-groups">
                      <fieldset className="booking-flow__weekly-group">
                        <legend>Instrument</legend>
                        <div className="booking-flow__weekly-options">
                          {(['guitar', 'ukulele'] as const).map((option) => (
                            <button
                              aria-pressed={weeklyInstrument === option}
                              className="booking-flow__weekly-option"
                              key={option}
                              onClick={() => setWeeklyInstrument(option)}
                              type="button"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <fieldset className="booking-flow__weekly-group">
                        <legend>Lesson length</legend>
                        <div className="booking-flow__weekly-options">
                          {(['30 minutes', '1 hour'] as const).map((option) => (
                            <button
                              aria-pressed={weeklyDuration === option}
                              className="booking-flow__weekly-option"
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

                    {weeklyInstrument && weeklyDuration && (
                      <button
                        className="booking-flow__weekly-continue"
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false)
                          setWeeklyStep(2)
                        }}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                )}

                {weeklyStep === 2 && weeklyLesson && (
                  <div className="booking-flow__step">
                    <WeeklyConfirmation
                      email={email}
                      instrument={weeklyInstrument}
                      isSubmitted={isSubmitted}
                      isSubmitting={isSubmitting}
                      lesson={weeklyLesson}
                      name={name}
                      phone={phone}
                      preferredContact={preferredContact}
                      preferredTiming={preferredTiming}
                      weeklyDuration={weeklyDuration}
                      onEmailChange={setEmail}
                      onNameChange={setName}
                      onPhoneChange={setPhone}
                      onPreferredContactChange={setPreferredContact}
                      onPreferredTimingChange={setPreferredTiming}
                      onSubmit={handleWeeklySubmit}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingFlow
