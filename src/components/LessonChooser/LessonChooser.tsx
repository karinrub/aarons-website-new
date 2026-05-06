import { useState } from 'react'
import {
  getLessonById,
  getLessonsByAudience,
  type Lesson,
  type LessonAudience,
} from '../../data/lessons'
import './LessonChooser.css'

const audienceOptions: Array<{ id: LessonAudience; label: string }> = [
  { id: 'visiting', label: 'Visiting Maui' },
  { id: 'weekly', label: 'Weekly Lessons' },
]

function getFirstLessonIdForAudience(audience: LessonAudience) {
  return getLessonsByAudience(audience)[0]?.id ?? ''
}

function LessonOptionCard({
  lesson,
  isSelected,
  onSelect,
}: {
  lesson: Lesson
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className="lesson-chooser__option"
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="lesson-chooser__option-summary">
        {lesson.summaryLabel}
      </span>
      <span className="lesson-chooser__option-type">{lesson.type}</span>
      <span className="lesson-chooser__option-details">
        <span>{lesson.duration}</span>
        {lesson.groupSize && <span>{lesson.groupSize}</span>}
      </span>
      <span className="lesson-chooser__option-price">{lesson.priceLabel}</span>
    </button>
  )
}

function LessonChooser() {
  const [activeAudience, setActiveAudience] =
    useState<LessonAudience>('visiting')
  const [selectedLessonId, setSelectedLessonId] = useState('beach-lesson')

  const activeLessons = getLessonsByAudience(activeAudience)
  const selectedLesson =
    getLessonById(selectedLessonId) ?? activeLessons[0]

  const handleAudienceChange = (audience: LessonAudience) => {
    setActiveAudience(audience)
    setSelectedLessonId(getFirstLessonIdForAudience(audience))
  }

  return (
    <section id="pricing" className="lesson-chooser">
      <div className="lesson-chooser__inner">
        <div className="lesson-chooser__header">
          <p className="lesson-chooser__label">Pricing</p>
          <h2 className="lesson-chooser__title">
            Find the lesson that fits your visit
          </h2>
          <p className="lesson-chooser__intro">
            Choose a lesson path, compare the options, and book the one that
            matches your timing, group, and goals.
          </p>
        </div>

        <div
          className="lesson-chooser__audience-toggle"
          role="group"
          aria-label="Lesson audience"
        >
          {audienceOptions.map((option) => (
            <button
              key={option.id}
              className="lesson-chooser__audience-button"
              type="button"
              aria-pressed={activeAudience === option.id}
              onClick={() => handleAudienceChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="lesson-chooser__content">
          <div className="lesson-chooser__options" aria-label="Lesson options">
            {activeLessons.map((lesson) => (
              <LessonOptionCard
                key={lesson.id}
                lesson={lesson}
                isSelected={selectedLesson?.id === lesson.id}
                onSelect={() => setSelectedLessonId(lesson.id)}
              />
            ))}
          </div>

          {selectedLesson && (
            <aside
              className="lesson-chooser__summary"
              aria-label="Selected lesson summary"
            >
              <p className="lesson-chooser__summary-price">
                {selectedLesson.priceLabel}
              </p>
              <h3 className="lesson-chooser__summary-title">
                {selectedLesson.summaryLabel}
              </h3>
              <p className="lesson-chooser__summary-description">
                {selectedLesson.description}
              </p>

              <dl className="lesson-chooser__facts">
                <div>
                  <dt>Duration</dt>
                  <dd>{selectedLesson.duration}</dd>
                </div>
                {selectedLesson.groupSize && (
                  <div>
                    <dt>Group size</dt>
                    <dd>{selectedLesson.groupSize}</dd>
                  </div>
                )}
              </dl>

              <a className="lesson-chooser__cta" href="#contact">
                {selectedLesson.ctaLabel}
              </a>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}

export default LessonChooser
