import { useEffect, useRef, useState } from 'react'
import './BeachLesson.css'

const beachLessonVideo = new URL(
  '../../assets/videos/aaron/aaron-ukelele-vid.MP4',
  import.meta.url,
).href

const features = [
  {
    icon: 'location',
    text: 'Beachside, at your condo, or vacation rental — you choose the setting',
  },
  {
    icon: 'music',
    text: 'Ukuleles provided — just show up and play',
  },
  {
    icon: 'check',
    text: 'No experience needed — perfect for all ages',
  },
  {
    icon: 'person',
    text: 'Guided by a local Maui musician with years of teaching experience',
  },
]

function FeatureIcon({ icon }: { icon: string }) {
  if (icon === 'location') {
    // Map pin — beachside / vacation rental / your location
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z" />
        <circle cx="12" cy="8" r="2.5" />
      </svg>
    )
  }

  if (icon === 'music') {
    // Double music note — instruments provided
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 17V5l11-1.83V15" />
        <circle cx="6.5" cy="17" r="2.5" />
        <circle cx="17.5" cy="15" r="2.5" />
      </svg>
    )
  }

  if (icon === 'check') {
    // Circle with checkmark — no experience needed
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    )
  }

  // Person silhouette — local instructor
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.42 3.58-8 8-8s8 3.58 8 8" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
      <path d="M1 1.5l8 4.5-8 4.5V1.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
      <rect x="1" y="1" width="3" height="10" rx="0.5" />
      <rect x="6" y="1" width="3" height="10" rx="0.5" />
    </svg>
  )
}

function BeachLesson() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const trimSeconds = 3

    const handleTrimmedLoop = () => {
      if (!Number.isFinite(video.duration) || video.duration <= trimSeconds) {
        return
      }

      const cutoffTime = video.duration - trimSeconds

      if (video.currentTime < cutoffTime) {
        return
      }

      const shouldKeepPlaying = !video.paused && !video.ended

      video.pause()
      video.currentTime = 0

      if (shouldKeepPlaying) {
        void video.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setIsPlaying(false)
        })
      }
    }

    video.addEventListener('timeupdate', handleTrimmedLoop)

    return () => {
      video.removeEventListener('timeupdate', handleTrimmedLoop)
    }
  }, [])

  const requestMobileFullscreen = async (video: HTMLVideoElement) => {
    if (!window.matchMedia('(max-width: 768px)').matches) {
      return
    }

    if (document.fullscreenElement) {
      return
    }

    if (video.requestFullscreen) {
      await video.requestFullscreen()
      return
    }

    if ('webkitEnterFullscreen' in video) {
      ;(video as HTMLVideoElement & { webkitEnterFullscreen: () => void }).webkitEnterFullscreen()
    }
  }

  const handleVideoControl = async () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.muted = false
    setIsMuted(false)

    if (video.paused) {
      await requestMobileFullscreen(video)
      await video.play()
      setIsPlaying(true)
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  const controlLabel = isPlaying
    ? (isMuted ? 'Play video with sound' : 'Pause video')
    : 'Resume video'

  const controlText = isPlaying
    ? (isMuted ? 'Play with sound' : 'Pause')
    : 'Resume'

  return (
    <section id="beach" className="beach-lesson">
      <div className="beach-lesson__inner">
        <div className="beach-lesson__content">
          <p className="beach-lesson__label">Ukulele by the Beach</p>
          <h2 className="beach-lesson__title">
            A relaxed ukulele lesson that becomes a Maui memory
          </h2>
          <div className="beach-lesson__body">
            <p>
              Meet Aaron by the ocean, at your condo, or at your vacation
              rental for a beginner-friendly lesson with everything ready when
              you arrive.
            </p>
          </div>
          <dl className="beach-lesson__quick-facts" aria-label="Beach lesson details">
            <div>
              <dt>From</dt>
              <dd>$35</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>30 or 60 min</dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>Solo, couples, families</dd>
            </div>
          </dl>
          <ul className="beach-lesson__features">
            {features.map((feature) => (
              <li key={feature.text} className="beach-lesson__feature">
                <span className="beach-lesson__feature-icon">
                  <FeatureIcon icon={feature.icon} />
                </span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className="beach-lesson__cta">
            Book a Beach Lesson
          </a>
        </div>

        <div className="beach-lesson__media">
          <video
            ref={videoRef}
            className="beach-lesson__video"
            src={beachLessonVideo}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          <button
            className="beach-lesson__video-control"
            type="button"
            aria-label={controlLabel}
            onClick={handleVideoControl}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            <span className="beach-lesson__video-control-text">
              {controlText}
            </span>
          </button>
        </div>
      </div>

    </section>
  )
}

export default BeachLesson
