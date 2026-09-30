// Personalize estes dados antes de publicar o site.
const SITE_CONFIG = {
  brand: 'João / Web',
  whatsapp: '5517997362748', // Código do país + DDD + número, somente dígitos.
  email: '' // Alternativa ao WhatsApp.
};

document.querySelectorAll('[data-brand]').forEach(element => { element.textContent = SITE_CONFIG.brand; });
document.title = `${SITE_CONFIG.brand} | Sites feitos para o seu negócio`;
document.querySelector('#year').textContent = new Date().getFullYear();

const rotatingNiche = document.querySelector('#rotating-niche');
const nicheFrame = rotatingNiche?.closest('.hero-niche-frame');
const niches = ['imobiliárias', 'clínicas', 'restaurantes', 'escritórios', 'lojas', 'profissionais', 'oficinas'];
if (rotatingNiche && nicheFrame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let nicheIndex = 0;
  let letterIndex = niches[0].length;
  let deleting = true;
  nicheFrame.classList.add('is-typing');
  function typeNextLetter() {
    if (deleting) {
      letterIndex -= 1;
      rotatingNiche.textContent = niches[nicheIndex].slice(0, letterIndex);
      if (letterIndex === 0) {
        deleting = false;
        nicheIndex = (nicheIndex + 1) % niches.length;
        window.setTimeout(typeNextLetter, 260);
      } else {
        window.setTimeout(typeNextLetter, 55);
      }
      return;
    }
    letterIndex += 1;
    rotatingNiche.textContent = niches[nicheIndex].slice(0, letterIndex);
    if (letterIndex === niches[nicheIndex].length) {
      deleting = true;
      window.setTimeout(typeNextLetter, 1800);
    } else {
      window.setTimeout(typeNextLetter, 95);
    }
  }
  window.setTimeout(typeNextLetter, 1800);
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menuButton.querySelector('.sr-only').textContent = 'Abrir menu';
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuButton.querySelector('.sr-only').textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const form = document.querySelector('#quote-form');
const dialog = document.querySelector('#quote-dialog');
const summary = document.querySelector('#quote-summary');
const formStatus = document.querySelector('#form-status');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    form.elements.service.value = link.dataset.service;
  });
});
const whatsapp = SITE_CONFIG.whatsapp.replace(/\D/g, '');
const hasWhatsApp = /^\d{10,15}$/.test(whatsapp);
const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email);
const directWhatsApp = document.querySelector('#direct-whatsapp');
if (hasWhatsApp) directWhatsApp.href = `https://wa.me/${whatsapp}`;
else directWhatsApp.hidden = true;
const submitButton = document.querySelector('#submit-quote');
if (hasWhatsApp || hasEmail) {
  submitButton.firstChild.textContent = hasWhatsApp ? 'Preparar mensagem no WhatsApp ' : 'Preparar e-mail ';
  document.querySelector('#form-hint').textContent = `A mensagem será aberta ${hasWhatsApp ? 'no WhatsApp' : 'no seu aplicativo de e-mail'} para você revisar e enviar.`;
}
form.querySelectorAll('input, textarea, select').forEach(field => {
  field.addEventListener('input', () => field.setCustomValidity(''));
  field.addEventListener('change', () => field.setCustomValidity(''));
});
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of form.querySelectorAll('input, textarea, select')) {
    field.setCustomValidity(field.value.trim() ? '' : 'Preencha este campo.');
  }
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const message = `Olá! Gostaria de solicitar um orçamento.\n\nNome: ${values.get('name').trim()}\nProjeto: ${values.get('service')}\n\nMinha ideia:\n${values.get('message').trim()}`;
  if (hasWhatsApp) {
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    formStatus.textContent = 'Continue no WhatsApp para enviar seu pedido. Se a janela não abriu, permita pop-ups e tente novamente.';
  } else if (hasEmail) {
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Pedido de orçamento — ' + values.get('service'))}&body=${encodeURIComponent(message)}`;
    formStatus.textContent = 'Conclua o envio no seu aplicativo de e-mail.';
  } else {
    summary.value = message;
    document.querySelector('#copy-status').textContent = '';
    dialog.showModal();
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#copy-quote').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(summary.value);
    document.querySelector('#copy-status').textContent = 'Resumo copiado!';
  } catch {
    summary.focus();
    summary.select();
    document.querySelector('#copy-status').textContent = 'Selecione e copie o texto acima, ou use a opção de baixar.';
  }
});
document.querySelector('#download-quote').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([summary.value], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pedido-de-orcamento.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
