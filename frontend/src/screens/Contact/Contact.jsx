'use client';

import React, { useState, useEffect } from 'react';
import './Contact.css';

const faqs = [
  {
    question: 'How long does delivery take?',
    answer: 'We deliver within 3-5 business days across India. Metro cities usually receive orders within 2-3 days.'
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Yes! We accept returns within 7 days of delivery if the product is unopened and undamaged. Contact us with your order ID to initiate a return.'
  },
  {
    question: 'Are your products gluten-free?',
    answer: 'Yes, all WIN-DIA Thins are 100% gluten-free, made with wholesome ingredients and no artificial additives.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order in the Track Order section of your account.'
  },
  {
    question: 'Do you offer bulk or wholesale orders?',
    answer: 'Absolutely! For bulk orders, corporate gifting, or wholesale inquiries, please email us at business@win-dia.com and our team will get back to you within 24 hours.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major UPI apps, credit/debit cards, net banking, and cash on delivery (COD) across India.'
  },
];

const BUSINESS_HOURS = [
  { day: 'Monday',    open: '09:00', close: '18:00' },
  { day: 'Tuesday',   open: '09:00', close: '18:00' },
  { day: 'Wednesday', open: '09:00', close: '18:00' },
  { day: 'Thursday',  open: '09:00', close: '18:00' },
  { day: 'Friday',    open: '09:00', close: '18:00' },
  { day: 'Saturday',  open: '10:00', close: '15:00' },
  { day: 'Sunday',    open: null,    close: null     },
];

const getBusinessStatus = () => {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday
  const reordered = [6, 0, 1, 2, 3, 4, 5]; // map JS day to our array index
  const todayHours = BUSINESS_HOURS[reordered[dayIndex]];

  if (!todayHours.open) return { isOpen: false, label: 'Closed today', color: '#ef4444' };

  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const openMins  = openH * 60 + openM;
  const closeMins = closeH * 60 + closeM;
  const nowMins   = now.getHours() * 60 + now.getMinutes();

  if (nowMins >= openMins && nowMins < closeMins) {
    const remaining = closeMins - nowMins;
    if (remaining <= 60) return { isOpen: true, label: `Closes in ${remaining} min`, color: '#f97316' };
    return { isOpen: true, label: 'Open now', color: '#22c55e' };
  }
  return { isOpen: false, label: 'Closed now', color: '#ef4444' };
};

const formatHour = (time) => {
  if (!time) return 'Closed';
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [bizStatus, setBizStatus] = useState({ isOpen: false, label: '', color: '#888' });

  useEffect(() => {
    setIsMounted(true);
    setBizStatus(getBusinessStatus());
    const interval = setInterval(() => setBizStatus(getBusinessStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  const todayName = isMounted
    ? new Date().toLocaleDateString('en-IN', { weekday: 'long' })
    : '';

  return (
    <div className="win-contact-page">

      {/* Hero */}
      <section className="win-contact-hero">
        <div className="win-container">
          <div className={`win-hero-content ${isMounted ? 'win-animate-in' : ''}`}>
            <span className="win-hero-badge">Contact Us</span>
            <h1 className="win-hero-title">Let's Connect</h1>
            <div className="win-hero-line"></div>
            <p className="win-hero-subtitle">
              We'd love to hear from you. Whether you have a question about an order,
              need support, or want to explore partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Map & Contact Info */}
      <section className="win-contact-main-section">
        <div className="win-container">
          <div className="win-contact-split-grid">
            <div className="win-map-side">
              <div className="win-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.8067602198375!2d76.57044797453725!3d12.328789728646433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b977f91431f%3A0xaf63ab8e0f922f23!2skalpavristi%20coco%20foods%20OPC%20pvt%20ltd!5e0!3m2!1sen!2sin!4v1776312786069!5m2!1sen!2sin"
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WIN-DIA Office Location"
                />
              </div>
            </div>

            <div className="win-info-side">
              <div className="win-contact-cards-vertical">

                {/* Business Hours Card */}
                <div className="win-info-card-vertical win-hours-card">
                  <div className="win-card-accent"></div>
                  <div className="win-card-content">
                    <div className="win-hours-header">
                      <h3 className="win-card-title-vertical">Business Hours</h3>
                      {isMounted && (
                        <span className="win-status-badge" style={{ background: bizStatus.color }}>
                          <span className="win-status-dot"></span>
                          {bizStatus.label}
                        </span>
                      )}
                    </div>
                    <div className="win-hours-list">
                      {BUSINESS_HOURS.map((h) => (
                        <div
                          key={h.day}
                          className={`win-hours-row ${h.day === todayName ? 'win-today' : ''}`}
                        >
                          <span className="win-hours-day">{h.day}</span>
                          <span className="win-hours-time">
                            {h.open ? `${formatHour(h.open)} – ${formatHour(h.close)}` : 'Closed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="win-info-card-vertical">
                  <div className="win-card-accent"></div>
                  <div className="win-card-content">
                    <h3 className="win-card-title-vertical">Location</h3>
                    <p className="win-card-text-vertical">Bengaluru, Karnataka</p>
                    <p className="win-card-subtext-vertical">India</p>
                  </div>
                </div>

                {/* Email */}
                <div className="win-info-card-vertical">
                  <div className="win-card-accent"></div>
                  <div className="win-card-content">
                    <h3 className="win-card-title-vertical">Email</h3>
                    <a href="mailto:support@win-dia.com" className="win-card-link-vertical">support@win-dia.com</a>
                    <a href="mailto:hello@win-dia.com" className="win-card-link-vertical">hello@win-dia.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="win-info-card-vertical">
                  <div className="win-card-accent"></div>
                  <div className="win-card-content">
                    <h3 className="win-card-title-vertical">Phone</h3>
                    <a href="tel:+918957345697" className="win-card-link-vertical">+91 89573 45697</a>
                    <p className="win-card-hours-vertical">Monday – Friday, 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>

                {/* Social */}
                <div className="win-info-card-vertical">
                  <div className="win-card-accent"></div>
                  <div className="win-card-content">
                    <h3 className="win-card-title-vertical">Social</h3>
                    <div className="win-social-links-vertical">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="win-social-link-vertical">Instagram</a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="win-social-link-vertical">Facebook</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="win-faq-section">
        <div className="win-container">
          <div className="win-faq-header">
            <span className="win-hero-badge">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to the questions we hear most often</p>
          </div>
          <div className="win-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`win-faq-item ${openFaq === i ? 'win-faq-open' : ''}`}
              >
                <button className="win-faq-question" onClick={() => toggleFaq(i)}>
                  <span>{faq.question}</span>
                  <span className="win-faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="win-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="win-form-section">
        <div className="win-container">
          <div className="win-form-container">
            <div className="win-form-header">
              <h2>Send Us a Message</h2>
              <p>You can also reach us by filling out the form below</p>
            </div>
            <form className="win-contact-form" onSubmit={handleSubmit}>
              <div className="win-form-row">
                <div className="win-form-group">
                  <label htmlFor="win-name">Full Name</label>
                  <input id="win-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className="win-form-group">
                  <label htmlFor="win-email">Email Address</label>
                  <input id="win-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="hello@example.com" />
                </div>
              </div>
              <div className="win-form-row">
                <div className="win-form-group">
                  <label htmlFor="win-phone">Phone Number</label>
                  <input id="win-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div className="win-form-group">
                  <label htmlFor="win-subject">Subject</label>
                  <input id="win-subject" name="subject" type="text" value={form.subject} onChange={handleChange} required placeholder="How can we help?" />
                </div>
              </div>
              <div className="win-form-group">
                <label htmlFor="win-message">Message</label>
                <textarea id="win-message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us more about your inquiry..." />
              </div>
              <button type="submit" className="win-submit-btn">
                Send Message <span className="win-btn-arrow">→</span>
              </button>
              {sent && (
                <div className="win-success-message">
                  <span className="win-success-icon">✓</span>
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Business Inquiries */}
      <section className="win-business-section">
        <div className="win-container">
          <div className="win-business-content">
            <div className="win-business-line"></div>
            <h2>Business Inquiries</h2>
            <p>For partnership opportunities, wholesale orders, or corporate gifting, please reach out to our business development team.</p>
            <a href="mailto:business@win-dia.com" className="win-business-email">
              business@win-dia.com <span className="win-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;