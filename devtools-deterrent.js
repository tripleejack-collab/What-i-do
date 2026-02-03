/* DevTools deterrent (external file to comply with CSP)
   Uses existing #devtools-overlay element in the page. */
(function(){
  const overlay = document.getElementById('devtools-overlay');
  if(overlay) overlay.style.display = 'none';

  function showOverlay(){
    if(!overlay) return;
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden','false');
    try{ document.body.style.pointerEvents = 'none'; }catch(e){}
  }

  // Disable context menu
  document.addEventListener('contextmenu', function(e){ e.preventDefault(); });

  // Disable common DevTools shortcuts
  document.addEventListener('keydown', function(e){
    if(e.keyCode === 123) { e.preventDefault(); showOverlay(); }
    if((e.ctrlKey || e.metaKey) && (e.shiftKey && (e.keyCode === 73 || e.keyCode === 74) || e.keyCode === 85 || e.keyCode === 69)){
      e.preventDefault(); showOverlay();
    }
  }, true);

  // Detect DevTools by measuring window size differences
  let last = Date.now();
  setInterval(function(){
    const now = Date.now();
    if(now - last > 200){ last = now; return; }
    last = now;
    const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
    const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
    if(widthDiff > 160 || heightDiff > 160){
      try{ console.clear(); }catch(e){}
      showOverlay();
    }
  }, 800);
})();
