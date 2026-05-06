import { useState } from 'react'
import teachingImage from '../../assets/images/aaron/aaron-teaching-1.jpg'
import portraitImage from '../../assets/images/aaron/aaron-portrait-1.jpg'
import beachImage from '../../assets/images/aaron/aaron-beach-1.jpg'
import './AboutAaron.css'

const chapters = [
  {
    title: 'Musician',
    body: 'Aaron began playing guitar at a young age and built a lasting connection to music through curiosity, practice, and a natural feel for sound.',
    imageId: 'portrait',
    alt: 'Aaron holding a ukulele on Maui',
  },
  {
    title: 'Teacher',
    body: 'His lessons balance technique, rhythm, songs, and confidence so students can make steady progress without feeling rushed.',
    imageId: 'beach',
    alt: 'Aaron playing ukulele on a Maui beach',
  },
  {
    title: 'Patient Approach',
    body: 'Aaron meets each student where they are, adapting the lesson to their pace while keeping the experience calm, clear, and enjoyable.',
    imageId: 'teaching',
    alt: 'Aaron teaching a private music lesson',
  },
  {
    title: 'Local Maui Lessons',
    body: 'Whether teaching on the beach, at a private residence, or in a studio setting, Aaron helps students connect with music in a way that fits life on Maui.',
    imageId: 'teaching',
    alt: 'Aaron teaching a private music lesson',
  },
]

const chapterImages = [
  {
    id: 'portrait',
    src: portraitImage,
  },
  {
    id: 'beach',
    src: beachImage,
  },
  {
    id: 'teaching',
    src: teachingImage,
  },
]

function AboutAaron() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const activeChapter = chapters[activeChapterIndex]
  const previousChapterIndex = activeChapterIndex - 1
  const nextChapterIndex = activeChapterIndex + 1
  const hasPreviousChapter = activeChapterIndex > 0
  const hasNextChapter = activeChapterIndex < chapters.length - 1

  return (
    <section id="about" className="about-aaron">
      <div className="about-aaron__intro">
        <p className="about-aaron__eyebrow">About Aaron</p>
        <p className="about-aaron__intro-text">
          A calm, personal approach to learning music on Maui.
        </p>
      </div>

      <div className="about-aaron__chapter">
        <div className="about-aaron__image-stage" aria-hidden="true">
          {chapterImages.map((image) => (
            <img
              key={image.id}
              className="about-aaron__image"
              src={image.src}
              alt=""
              loading="eager"
              decoding="async"
              data-active={activeChapter.imageId === image.id}
            />
          ))}
        </div>

        <div className="about-aaron__panel">
          <div className="about-aaron__content" key={activeChapter.title}>
            <h2 className="about-aaron__title">{activeChapter.title}</h2>
            <p className="about-aaron__body">{activeChapter.body}</p>
          </div>

          <div className="about-aaron__controls">
            <div
              className="about-aaron__nav"
              role="group"
              aria-label="About Aaron chapters"
            >
              {hasPreviousChapter ? (
                <button
                  className="about-aaron__nav-button"
                  type="button"
                  onClick={() => setActiveChapterIndex(previousChapterIndex)}
                >
                  ← Previous: {chapters[previousChapterIndex].title}
                </button>
              ) : (
                <span aria-hidden="true" />
              )}

              {hasNextChapter ? (
                <button
                  className="about-aaron__nav-button"
                  type="button"
                  onClick={() => setActiveChapterIndex(nextChapterIndex)}
                >
                  Next: {chapters[nextChapterIndex].title} →
                </button>
              ) : (
                <span aria-hidden="true" />
              )}
            </div>

            <div
              className="about-aaron__progress"
              role="group"
              aria-label="Jump to chapter"
            >
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.title}
                  className="about-aaron__progress-line"
                  type="button"
                  aria-label={`Go to chapter: ${chapter.title}`}
                  aria-current={activeChapterIndex === index ? 'true' : undefined}
                  data-active={activeChapterIndex === index}
                  onClick={() => setActiveChapterIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <span
        className="about-aaron__sr-image"
        role="img"
        aria-label={activeChapter.alt}
      />
    </section>
  )
}

export default AboutAaron
