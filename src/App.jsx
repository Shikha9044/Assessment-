import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Studio', href: '#studio' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQs', href: '#faqs' },
  ]

  const teamFaces = [
    'https://i.pravatar.cc/200?img=11',
    'https://i.pravatar.cc/200?img=15',
    'https://i.pravatar.cc/200?img=17',
    'https://i.pravatar.cc/200?img=32',
    'https://i.pravatar.cc/200?img=23',
    'https://i.pravatar.cc/200?img=8',
    'https://i.pravatar.cc/200?img=55',
  ]

  const offerings = [
    {
      left: 'Office of multiple interest content',
      title: 'Colaborative & partnership',
      featured: true,
      coin: false,
      detail: '',
    },
    {
      left: 'The hanger US Air force digital experimental',
      title: 'We talk about our weight',
      featured: false,
      coin: false,
      detail:
        'We convert complex challenges into practical decision maps with transparent priorities.',
    },
    {
      left: 'Delfa faucet content, social, digital',
      title: 'Piloting digital confidence',
      featured: false,
      detail:
        'From first strategy draft to launch, we validate each step with measurable outcomes.',
    },
  ]

  const testimonials = [
    {
      quote:
        "Elementum delivered the site in the requested timeline. The client saw a 50% traffic increase days after launch and praised the team's ability to use new technologies quickly and reliably.",
      name: 'Sophie Adams',
      role: 'Product Lead, Novabridge',
    },
    {
      quote:
        'The process was collaborative and clear. Every sprint had direction, and our campaign performance improved with stronger brand consistency across channels.',
      name: 'Lucas White',
      role: 'Marketing Director, Argo Labs',
    },
    {
      quote:
        'Their team brought strategic clarity and hands-on execution. We moved faster, reduced design revisions, and launched with confidence.',
      name: 'Mina Lee',
      role: 'Founder, Pixel Harbor',
    },
  ]

  const customerFaces = [
    'https://i.pravatar.cc/200?img=13',
    'https://i.pravatar.cc/200?img=12',
    'https://i.pravatar.cc/200?img=25',
    'https://i.pravatar.cc/200?img=53',
    'https://i.pravatar.cc/200?img=62',
    'https://i.pravatar.cc/200?img=69',
    'https://i.pravatar.cc/200?img=58',
  ]

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeOffer, setActiveOffer] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [email, setEmail] = useState('')
  const [subscriptionMsg, setSubscriptionMsg] = useState('')
  const [subscriberCount, setSubscriberCount] = useState(1203)
  const pageRef = useRef(null)

  useEffect(() => {
    const storedCount = window.localStorage.getItem('elementumSubscribers')
    if (storedCount) {
      setSubscriberCount(Number(storedCount))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('elementumSubscribers', String(subscriberCount))
  }, [subscriberCount])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [testimonials.length])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.topbar', {
        y: -36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.hero-card h1', {
        y: 38,
        opacity: 0,
        duration: 1,
        delay: 0.1,
        ease: 'power3.out',
      })

      gsap.from('.team-line', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        delay: 0.25,
        ease: 'power2.out',
      })

      gsap.from('.face-item', {
        scale: 0.75,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(1.7)',
        stagger: 0.07,
      })

      gsap.utils.toArray('.face-item').forEach((face, index) => {
        gsap.to(face, {
          y: index % 2 === 0 ? -10 : -16,
          x: index % 3 === 0 ? 6 : -4,
          duration: 2.4 + index * 0.15,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      gsap.to('.offer-top-curve', {
        x: 18,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.utils
        .toArray('.story-block, .offer-section, .testimonial-section, .newsletter-section')
        .forEach((section) => {
          gsap.from(section, {
            y: 70,
            opacity: 0,
            duration: 0.95,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          })
        })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
    )
  }, [activeTestimonial])

  const currentTestimonial = useMemo(
    () => testimonials[activeTestimonial],
    [activeTestimonial, testimonials],
  )

  const handleSubscribe = (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)

    if (!isEmailValid) {
      setSubscriptionMsg('Please enter a valid email address.')
      return
    }

    setSubscriberCount((prev) => prev + 1)
    setSubscriptionMsg('Thanks for subscribing. We will be in touch soon.')
    setEmail('')
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="page" ref={pageRef}>
      <header className="topbar">
        <a href="#home" className="brand">
          Elementum
        </a>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="menu"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
        </button>
      </header>

      <main>
        <section className="hero-card" id="home">
          <h1>
            The <span className="hero-thinkers">thinkers</span> and
            <br />
            doers were <span className="hero-changing">changing</span>
            <br />
            the <span className="hero-status">status</span> Quo with
          </h1>
          <p className="team-line">
            We are a team of strategists, designers communicators, researchers.
            Together, we belive that progress only happens when you refuse to
            play things safe.
          </p>
          <div className="faces" aria-hidden="true">
            {teamFaces.map((src, index) => (
              <div
                className={`face-item face-${index + 1}`}
                style={{ backgroundImage: `url(${src})` }}
                key={src}
              ></div>
            ))}
          </div>
        </section>

        <section className="story-block first" id="studio">
          <div className="story-copy">
            <h2>
              Tomorrow should
              <br />
              be better than <span className="highlight-green-box">today</span>
            </h2>
            <p className="team-line">
              We are a team of strategists, designers communicators, researchers.
              Together, we belive that progress only happens when you refuse to
              play things safe.
            </p>
            <a href="#" className="read-more">
              Read more
            </a>
          </div>
          <div className="story-visual">
            <div className="shape square"></div>
            <div className="circle-photo photo-a"></div>
          </div>
        </section>

        <section className="story-block second" id="services">
          <div className="story-visual">
            <div className="shape triangle"></div>
            <div className="circle-photo photo-b"></div>
          </div>
          <div className="story-copy">
            <h2>
              <span className="highlight-green-box">See</span> how we can
              <br />
              help you <span className="underline-word">progress</span>
            </h2>
            <p>
              We add a layer of fearless insights and action that allows changemakers
              to accelerate their progress in areas such as brand, design
              digital, comms and social research.
            </p>
            <a href="#" className="read-more">
              Read more
            </a>
          </div>
        </section>

        <section className="offer-section" id="faqs">
          <div className="offer-headline-wrap">
            <h2 className="offer-heading">
              What we <span className="highlight-green-box">can</span>
              <br />
              <span className="offer-word">offer</span> you!
            </h2>
            <div className="offer-top-curve" aria-hidden="true"></div>
          </div>

          <div className="offer-list" role="list">
            {offerings.map((item, index) => (
              <article
                className={`offer-row ${item.detail && activeOffer === index ? 'active' : ''}`}
                key={item.title}
                role="listitem"
              >
                <p>{item.left}</p>
                <h3 className={item.featured ? 'featured-title' : ''}>
                  {item.title}
                </h3>
                <button
                  type="button"
                  aria-label={`Open ${item.title}`}
                  onClick={() => setActiveOffer(item.detail ? index : null)}
                >
                  <span className="arrow-text">-&gt;</span>
                </button>
                <div className="offer-detail" aria-live="polite">
                  {item.detail}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial-section" id="contact">
          <h2 className="testimonial-heading">
            <span className="highlight-green-box">What</span> our customer
            <br />
            says <span className="offer-word">About Us</span>
          </h2>

          <div className="testimonial-avatars" aria-hidden="true">
            {customerFaces.map((src, index) => (
              <span
                className={`t-avatar t-avatar-${index + 1}`}
                style={{ backgroundImage: `url(${src})` }}
                key={src}
              ></span>
            ))}
          </div>

          <article className="testimonial-card">
            <p>{currentTestimonial.quote}</p>
            <p className="testimonial-meta">
              {currentTestimonial.name} | {currentTestimonial.role}
            </p>
          </article>

          <div className="testimonial-controls">
            <button
              type="button"
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length,
                )
              }
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
              }
            >
              Next
            </button>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-deco" aria-hidden="true">
            <span className="wave wave-1"></span>
            <span className="wave wave-2"></span>
          </div>

          <div className="newsletter-head">
            <h2>
              Subscribe to
              <br />
              our newsletter
            </h2>
            <p>To make your stay special and even more memorable</p>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="submit">Subscribe Now</button>
            </form>
            <p className="subscription-note">{subscriptionMsg || `${subscriberCount} subscribers and growing.`}</p>
          </div>

          <footer className="site-footer">
            <div className="footer-col">
              <h3>Company</h3>
              <a href="#">Home</a>
              <a href="#">Studio</a>
              <a href="#">Service</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-col">
              <h3>Terms & Policies</h3>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Explore</a>
              <a href="#">Accesibility</a>
            </div>
            <div className="footer-col">
              <h3>Follow Us</h3>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
              <a href="#">Twitter</a>
            </div>
            <div className="footer-col contact-col">
              <h3>Terms & Policies</h3>
              <p>1498w Fulton stc, STE</p>
              <p>2D Chcigo, IL 63867.</p>
              <p>(123) 456789000</p>
              <p>info@elementum.com</p>
            </div>
          </footer>

          <p className="copyright">@{currentYear} Elementum. All rights reserved</p>
        </section>
      </main>
    </div>
  )
}

export default App
