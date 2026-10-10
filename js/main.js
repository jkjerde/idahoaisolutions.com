(function(){
  var t=document.querySelector('.nav-toggle'),n=document.querySelector('.nav-links');
  t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);});
  n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');t.setAttribute('aria-expanded',false);}});
  document.getElementById('year').textContent=new Date().getFullYear();

  var f=document.getElementById('contact-form'),s=document.getElementById('form-status');
  var MAILTO='johnjerde@mail.grokbot.com';
  function mailto(d){
    var body='Name: '+d.get('name')+'\nBusiness: '+d.get('business')+'\nEmail: '+d.get('email')+'\nPhone: '+(d.get('phone')||'')+'\nBusiness type: '+d.get('business_type')+'\n\nWhat eats most of my time:\n'+(d.get('message')||'');
    location.href='mailto:'+MAILTO+'?subject='+encodeURIComponent('Demo request: '+d.get('business'))+'&body='+encodeURIComponent(body);
    s.textContent='Opening your email app… If nothing happens, email '+MAILTO+'.';
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f);
    if(d.get('_gotcha'))return;
    // TODO: set a real endpoint in the form's action attribute (index.html). Placeholder => mailto fallback.
    if(f.action.indexOf('YOUR_FORM_ID')!==-1){mailto(d);return;}
    s.textContent='Sending…';
    fetch(f.action,{method:'POST',body:d,headers:{Accept:'application/json'}})
      .then(function(r){if(!r.ok)throw 0;f.reset();s.textContent='Thanks! I\'ll be in touch soon to set up your demo.';})
      .catch(function(){mailto(d);});
  });
})();
