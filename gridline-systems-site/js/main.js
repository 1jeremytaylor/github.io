document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', () => header.classList.toggle('open'));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const status = document.querySelector('[data-form-status]');
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      if (status) status.textContent = 'Sending...';
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch('/', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          if (status) status.textContent = 'Thanks — your message has been sent.';
          form.reset();
        } else {
          if (status) status.textContent = 'There was a problem sending your message. Please try again.';
        }
      } catch (error) {
        if (status) status.textContent = 'There was a problem sending your message. Please try again.';
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }
});