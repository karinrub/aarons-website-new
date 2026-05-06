import { useRef, useState } from 'react'
import weeklyImageOne from '../../assets/images/aaron/aaron-weekly-1.jpg'
import weeklyImageTwo from '../../assets/images/aaron/aaron-weekly-2.jpg'
import weeklyLessonVideo from '../../assets/videos/aaron/aaron-weekly-section.mp4'
import './WeeklyLessons.css'

const weeklyFeatures = [
  {
    icon: 'plan',
    text: 'Personalized plans for your instrument, goals, and experience',
  },
  {
    icon: 'progress',
    text: 'Clear structure and progression from week to week',
  },
  {
    icon: 'rhythm',
    text: 'Technique, rhythm, and musical understanding',
  },
  {
    icon: 'support',
    text: 'Patient, supportive instruction at your own pace',
  },
]

const weeklyLessonPhotos = [
  {
    src: weeklyImageOne,
    alt: 'One-on-one weekly guitar lesson on Maui',
  },
  {
    src: weeklyImageTwo,
    alt: 'Beginner-friendly weekly music lesson with Aaron',
  },
]

function FeatureIcon({ icon }: { icon: string }) {
  if (icon === 'plan') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h10l3 3v15H4V3h3z" />
        <path d="M16 3v4h4" />
        <path d="M8 10h8M8 14h8M8 18h5" />
      </svg>
    )
  }

  if (icon === 'progress') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19h16" />
        <path d="M7 16l4-4 3 3 5-7" />
        <path d="M16 8h3v3" />
      </svg>
    )
  }

  if (icon === 'rhythm') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 17V5l10-2v12" />
        <circle cx="6.5" cy="17" r="2.5" />
        <circle cx="16.5" cy="15" r="2.5" />
      </svg>
    )
  }

  if (icon === 'guitar') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 5l4-4 4 4-4 4" />
        <path d="M17 7l-7 7" />
        <path d="M5.5 11.5c2.5-2.5 6.5-1.1 7.2 2.1 3.2.7 4.6 4.7 2.1 7.2-2.3 2.3-6.2 1.3-7.1-1.8-3.1-.9-4.5-5.2-2.2-7.5z" />
        <circle cx="9.5" cy="16.5" r="1.8" />
      </svg>
    )
  }

  if (icon === 'ukulele') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12V3M9 3h6" />
        <ellipse cx="12" cy="17" rx="5" ry="6" />
        <circle cx="12" cy="17" r="1.7" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.42 3.58-8 8-8s8 3.58 8 8" />
      <path d="M17.5 5.5l2 2 3-4" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 1.5l8 4.5-8 4.5V1.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="3" height="10" rx="0.5" />
      <rect x="6" y="1" width="3" height="10" rx="0.5" />
    </svg>
  )
}

function WeeklyLessons() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const handleVideoControl = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const controlLabel = isPlaying ? 'Pause video' : 'Play video'

  const controlText = isPlaying ? 'Pause' : 'Play'

  return (
    <section id="weekly" className="weekly-lessons">
      <div className="weekly-lessons__inner">
        <div className="weekly-lessons__content">
          <p className="weekly-lessons__label">Weekly Lessons</p>
          <h2 className="weekly-lessons__title">
            Consistent guidance for long-term musical growth
          </h2>
          <div className="weekly-lessons__body">
            <p>
              Weekly lessons are for students who want steady progress with
              guitar or ukulele. Aaron keeps each lesson focused, supportive,
              and paced around what you want to learn.
            </p>
            <p>
              Build technique, rhythm, and songs you actually want to play in
              the Kihei and Wailea areas, including beach parks, private
              residences, and Aaron&apos;s home studio.
            </p>
          </div>

          <dl className="weekly-lessons__quick-facts" aria-label="Weekly lesson details">
            <div>
              <dt>From</dt>
              <dd>$35</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>30 or 60 min</dd>
            </div>
            <div>
              <dt>Instruments</dt>
              <dd>Guitar &amp; ukulele</dd>
            </div>
          </dl>

          <ul className="weekly-lessons__features">
            {weeklyFeatures.map((feature) => (
              <li key={feature.text} className="weekly-lessons__feature">
                <span className="weekly-lessons__feature-icon" aria-hidden="true">
                  <FeatureIcon icon={feature.icon} />
                </span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>

          <a href="#contact" className="weekly-lessons__cta">
            Start weekly lessons
          </a>
        </div>

        <div className="weekly-lessons__visuals">
          <div className="weekly-lessons__media">
            <video
              ref={videoRef}
              className="weekly-lessons__video"
              src={weeklyLessonVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Silent weekly guitar and ukulele lesson video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              className="weekly-lessons__video-control"
              type="button"
              aria-label={controlLabel}
              onClick={handleVideoControl}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              <span className="weekly-lessons__video-control-text">
                {controlText}
              </span>
            </button>
          </div>

          <div
            className="weekly-lessons__story-images"
            aria-label="Weekly lesson moments"
          >
            {weeklyLessonPhotos.map((photo) => (
              <figure className="weekly-lessons__story-image" key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeeklyLessons
