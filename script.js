/**
 * Secured & Obfuscated Application Code
 * Anti-inspection and anti-tampering measures implemented
 */

"use strict";

/* NOTE: Client-side protections are only deterrents. Move any secrets or
   sensitive logic (API keys, auth, payment flows) to a server-side endpoint.
   Client-side obfuscation does NOT stop a determined attacker. */
const _0x4a2b = ['constructor', 'prototype', 'call', 'apply', 'bind'];
Object.defineProperty(Function.prototype, 'toString', {
  value: function() { return 'function() { [native code] }'; },
  writable: false,
  configurable: false
});

(function(){
  const _ = String.fromCharCode;
  window.atob || (window.atob = function(e){
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let r = "";
    for(let n, a, o = 0; (a = e.charAt(o++)) != ""; ){  // Fixed: removed incorrect semicolon terminator
      if((n = t.indexOf(a)) == -1) return;
      const n2 = t.indexOf(e.charAt(o++));
      r += _(  ((n & 63) << 2) | (n2 >> 4) );
    }
    return r;
  });
})();

// Make console output harder to use for casual inspection
try{
  if(window.console){
    console.log = function(){};
    console.debug = function(){};
    console.info = function(){};
  }
}catch(e){}

class ServiceManager {
  constructor(){
    this.services = [
      { title: "Software Research", icon: "🧠", description: "Finding and recommending the best software tools for business productivity, security, and performance." },
      { title: "Computer Repairs", icon: "🖥️", description: "Hardware troubleshooting, OS installation, virus removal, upgrades, and system optimization." },
      { title: "Graphic Design", icon: "🎨", description: "Logos, flyers, banners, social media designs, and branding visuals." },
      { title: "Website Development", icon: "🌐", description: "Modern, responsive websites using HTML, CSS, JavaScript, and backend technologies." },
      { title: "Web Hosting", icon: "☁️", description: "Secure hosting setup, domain configuration, SSL, and website maintenance." }
    ];
  }
  renderServices(){
    const e = document.getElementById("serviceList");
    if(!e) return;
    e.innerHTML = "";
    this.services.forEach(t => e.appendChild(this.createServiceCard(t)));
  }
  createServiceCard(e){
    const t = document.createElement("div");
    t.className = "card";
    t.innerHTML = `<div class="icon">${e.icon}</div><h3>${this.escapeHtml(e.title)}</h3><p>${this.escapeHtml(e.description)}</p>`;
    return t;
  }
  escapeHtml(e){ const t = document.createElement("div"); t.textContent = e; return t.innerHTML; }
}

class ContactFormManager {
  constructor(){
    this.form = document.querySelector(".contact-form");
    this.statusElement = document.getElementById("status");
    if(this.form) this.form.addEventListener("submit", e => this.handleSubmit(e));
    this.decodeContacts();
  }
  decodeContacts(){
    const nodes = document.querySelectorAll("[data-c]");
    nodes.forEach(node => {
      const type = node.getAttribute("data-c");
      const value = atob(node.getAttribute("data-v"));
      if(type === 'ec'){
        const a = document.createElement('a');
        a.href = 'mailto:' + value; a.textContent = value; a.style.color = 'var(--primary-color)';
        node.parentNode.replaceChild(a, node);
      } else if(type === 'ph'){
        const a = document.createElement('a');
        a.href = 'tel:' + value; a.textContent = value; a.style.color = 'var(--primary-color)';
        node.parentNode.replaceChild(a, node);
      }
    });
  }
  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(this.validateForm(name, email, message)) this.sendMessageToGmail(name, email, message);
  }
  validateForm(name, email, message){
    if(!name || !email || !message){ this.showStatus('Please fill in all fields.','error'); return false; }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email)){ this.showStatus('Please enter a valid email address.','error'); return false; }
    return true;
  }
  async sendMessageToGmail(name,email,message){
    try{
      this.showStatus('Opening Gmail composer...','');
      const to = 'oikechukwu312@gmail.com';
      const subject = `New Service Request from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      const mailtoUrl = 'mailto:' + encodeURIComponent(to) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      // Try to open Gmail web composer in a new tab. If popup blocked or not available, fallback to mailto.
      let opened = null;
      try{ opened = window.open(gmailUrl, '_blank'); }catch(e){ opened = null; }
      if(!opened){
        // fallback to mailto which should open user's mail client (mobile will open mail app)
        window.location.href = mailtoUrl;
      }

      this.showStatus('Opening Gmail...','success');
      setTimeout(()=>{ if(this.form) this.form.reset(); }, 1200);
    }catch(err){
      this.showStatus('Unable to open email composer.','error');
    }
  }
  showStatus(e,t){
    if(!this.statusElement) return;
    this.statusElement.textContent = e;
    this.statusElement.style.color = t === 'success' ? '#10b981' : '#ef4444';
    this.statusElement.style.marginTop = '15px';
  }
}

class AppInitializer{
  static init(){
    window.serviceManager = new ServiceManager();
    window.contactFormManager = new ContactFormManager();
    serviceManager.renderServices();
    this.setupSmoothScroll();
    this.preventInspection();
    this.secureCode();
    this.hookPhoneLink();
  }
  static setupSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(e => {
      e.addEventListener('click', function(ev){ ev.preventDefault(); const t = document.querySelector(this.getAttribute('href')); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    });
  }
  static preventInspection(){
    const block = ev => { ev.preventDefault(); ev.returnValue = false; };
    document.addEventListener('contextmenu', block);
    document.addEventListener('keydown', e => { if((e.ctrlKey||e.metaKey) && (e.shiftKey && (e.keyCode===73 || e.keyCode===74) || e.keyCode===85 || e.keyCode===69)){ e.preventDefault(); e.returnValue = false; } }, true);
    document.addEventListener('keydown', e => { if(e.keyCode===123){ e.preventDefault(); e.returnValue = false; } });
  }
  static secureCode(){
    try{ Object.freeze(window.serviceManager); Object.freeze(window.contactFormManager); Object.freeze(Object.getOwnPropertyDescriptors); Object.seal(document); }catch(e){}
  }

  static hookPhoneLink(){
    try{
      const el = document.getElementById('phone-link');
      if(!el) return;
      el.addEventListener('click', function(ev){
        ev.preventDefault();
        const href = this.getAttribute('href');
        // Force navigation to the tel: URL which on mobile opens the dialer
        window.location.href = href;
      });
    }catch(e){}
  }
}

document.addEventListener('DOMContentLoaded', () => AppInitializer.init());
