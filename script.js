'use strict';

// Add ONLY the professional contact details you want to publish. Leave blank to
// keep them off the website. The site does not collect or submit any visitor data.
const siteContact = {
  email: 'adam.ellis.mail@gmail.com',
  linkedInUrl: 'https://www.linkedin.com/in/adam-ellis-media/'
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const contactTarget = document.querySelector('#contact-details');
if (contactTarget) {
  const email = siteContact.email.trim();
  const linkedInUrl = siteContact.linkedInUrl.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  let validLinkedIn = false;
  try {
    const url = new URL(linkedInUrl);
    validLinkedIn = url.protocol === 'https:' && (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com'));
  } catch (_) { /* Empty or invalid URLs are intentionally not shown. */ }

  if (validEmail || validLinkedIn) {
    contactTarget.textContent = '';
    if (validEmail) {
      const emailAnchor = document.createElement('a');
      emailAnchor.href = 'mailto:' + email;
      emailAnchor.textContent = email;
      emailAnchor.className = 'contact-email';
      contactTarget.replaceWith(emailAnchor);
      if (validLinkedIn) {
        const linkedInAnchor = document.createElement('a');
        linkedInAnchor.href = linkedInUrl;
        linkedInAnchor.textContent = 'LinkedIn profile ↗';
        linkedInAnchor.target = '_blank';
        linkedInAnchor.rel = 'noopener noreferrer';
        linkedInAnchor.className = 'contact-linked-in';
        emailAnchor.insertAdjacentElement('afterend', linkedInAnchor);
      }
    } else if (validLinkedIn) {
      const linkedInAnchor = document.createElement('a');
      linkedInAnchor.href = linkedInUrl;
      linkedInAnchor.textContent = 'Connect on LinkedIn ↗';
      linkedInAnchor.target = '_blank';
      linkedInAnchor.rel = 'noopener noreferrer';
      linkedInAnchor.className = 'contact-linked-in';
      contactTarget.replaceWith(linkedInAnchor);
    }
  }
}
