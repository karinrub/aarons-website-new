import heroImage from '../../assets/images/aaron/aaron-beach-1.jpg'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__panel">
        <div className="hero__content">
          <p className="hero__eyebrow">With Aaron Grzanich</p>
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--one">
              Guitar &amp; Ukulele
            </span>
            <span className="hero__title-line hero__title-line--two">
              Lessons
            </span>
            <em className="hero__title-line hero__title-line--place">
              on Maui
            </em>
          </h1>
          <p className="hero__text">
            Private guitar and ukulele lessons shaped around your pace, your goals, and the beauty of Maui.
          </p>
          <a className="hero__link" href="#contact">
            <span>Book a Lesson</span>
            <span className="hero__link-rule" aria-hidden="true" />
            <span className="hero__link-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="hero__image-panel" aria-hidden="true">
        <img className="hero__image" src={heroImage} alt="" />
      </div>
    </section>
  )
}

export default Hero
