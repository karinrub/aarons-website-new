import './Contact.css'

function Contact() {
  return (
    <section className="contact">
      <div className="contact__inner">
        <div className="contact__content">
          <p className="contact__label">Get in Touch</p>
          <h2 className="contact__title">Ready to make music on Maui?</h2>
          <p className="contact__text">
            Call or text Aaron to schedule a beach lesson, weekly lesson, or
            private group experience.
          </p>
        </div>

        <a className="contact__phone" href="tel:+18083711821">
          808-371-1821
        </a>
      </div>
    </section>
  )
}

export default Contact
