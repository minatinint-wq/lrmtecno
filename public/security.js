/* LRM TECNO — Security & Auth Helpers */
(function(){
  /* Pure JS SHA-256 (works on HTTP, file://, everywhere) */
  function sha256(s){
    var chrsz=8,hexcase=0;
    function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF),msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
    function S(X,n){return(X>>>n)|(X<<(32-n));}
    function R(X,n){return(X>>>n);}
    function Ch(x,y,z){return((x&y)^((~x)&z));}
    function Maj(x,y,z){return((x&y)^(x&z)^(y&z));}
    function Sigma0256(x){return(S(x,2)^S(x,13)^S(x,22));}
    function Sigma1256(x){return(S(x,6)^S(x,11)^S(x,25));}
    function Gamma0256(x){return(S(x,7)^S(x,18)^R(x,3));}
    function Gamma1256(x){return(S(x,17)^S(x,19)^R(x,10));}
    var K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];
    var m=[],l=s.length*chrsz,w=[],a,b,c,d,e,f,g,h,i,j,t1,t2;
    for(i=0;i<l;i+=chrsz)m[i>>5]|=(s.charCodeAt(i/chrsz)&0xFF)<<(24-i%32);
    m[l>>5]|=0x80<<(24-l%32);m[((l+64>>9)<<4)+15]=l;
    var H=[0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19];
    for(i=0;i<m.length;i+=16){
      for(j=0;j<16;j++)w[j]=m[i+j];
      for(j=16;j<64;j++)w[j]=safe_add(safe_add(safe_add(Gamma1256(w[j-2]),w[j-7]),Gamma0256(w[j-15])),w[j-16]);
      a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];f=H[5];g=H[6];h=H[7];
      for(j=0;j<64;j++){t1=safe_add(safe_add(safe_add(safe_add(h,Sigma1256(e)),Ch(e,f,g)),K[j]),w[j]);t2=safe_add(Sigma0256(a),Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,t1);d=c;c=b;b=a;a=safe_add(t1,t2);}
      H[0]=safe_add(a,H[0]);H[1]=safe_add(b,H[1]);H[2]=safe_add(c,H[2]);H[3]=safe_add(d,H[3]);H[4]=safe_add(e,H[4]);H[5]=safe_add(f,H[5]);H[6]=safe_add(g,H[6]);H[7]=safe_add(h,H[7]);
    }
    function hex(i){return(hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>28)&0xF)+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>24)&0xF))+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>20)&0xF))+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>16)&0xF))+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>12)&0xF))+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>8)&0xF))+((hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt((i>>4)&0xF))+(hexcase?'0123456789ABCDEF':'0123456789abcdef').charAt(i&0xF);}
    return hex(H[0])+hex(H[1])+hex(H[2])+hex(H[3])+hex(H[4])+hex(H[5])+hex(H[6])+hex(H[7]);
  }
  window.hashPassword=function(pw){
    if(!pw)return '';
    return sha256(pw);
  };
  window.hashPasswordAsync=function(pw){
    return Promise.resolve(window.hashPassword(pw));
  };
  window.generateToken=function(){
    var t=crypto.randomUUID()+'|'+Date.now();
    localStorage.setItem('lrm_token',t);
    return t;
  };
  window.validateToken=function(){
    var t=localStorage.getItem('lrm_token');
    if(!t)return false;
    var parts=t.split('|');
    if(parts.length!==2)return false;
    var ts=parseInt(parts[1],10);
    if(Date.now()-ts>86400000){localStorage.removeItem('lrm_token');return false;}
    return true;
  };
  window.getLoggedUser=function(){
    try{
      var u=JSON.parse(localStorage.getItem('lrm_user'));
      if(!u||!u.id)return null;
      return u;
    }catch(e){return null;}
  };
  window.html=function(strings){
    var esc=function(s){if(typeof s!=='string')return '';return s.replace(/[&<>"']/g,function(c){switch(c){case'&':return'&amp;';case'<':return'&lt;';case'>':return'&gt;';case'"':return'&quot;';case"'":return'&#39;';}return c;});};
    var str='',vals=Array.prototype.slice.call(arguments,1);
    for(var i=0;i<strings.length;i++){str+=strings[i];if(i<vals.length)str+=esc(vals[i]);}
    return str;
  };
  window.esc=function(s){if(typeof s!=='string')return '';return s.replace(/[&<>"']/g,function(c){switch(c){case'&':return'&amp;';case'<':return'&lt;';case'>':return'&gt;';case'"':return'&quot;';case"'":return'&#39;';}return c;});};
  window.sanitizeInput=function(s){
    if(typeof s!=='string')return '';
    return s.replace(/[<>&"']/g,function(c){
      switch(c){case'<':return'&lt;';case'>':return'&gt;';case'&':return'&amp;';case'"':return'&quot;';case"'":return'&#39;';}
      return c;
    });
  };
  window.validateEmail=function(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);};
  window.validatePhone=function(p){return/^[\d\s()+-]{8,}$/.test(p);};
  var attempts=JSON.parse(localStorage.getItem('lrm_rate')||'[]');
  var cleanup=function(){
    var now=Date.now();
    attempts=attempts.filter(function(a){return now-a<300000;});
    localStorage.setItem('lrm_rate',JSON.stringify(attempts));
  };
  window.checkRateLimit=function(){
    cleanup();
    if(attempts.length<5)return{blocked:false,remaining:0};
    var oldest=attempts[0]||0;
    var elapsed=Date.now()-oldest;
    if(elapsed<300000)return{blocked:true,remaining:Math.ceil((300000-elapsed)/1000)};
    attempts=[];
    localStorage.setItem('lrm_rate',JSON.stringify(attempts));
    return{blocked:false,remaining:0};
  };
  window.recordAttempt=function(){
    cleanup();
    attempts.push(Date.now());
    localStorage.setItem('lrm_rate',JSON.stringify(attempts));
  };
  window.resetRateLimit=function(){
    attempts=[];
    localStorage.setItem('lrm_rate',JSON.stringify(attempts));
  };
  // Also expose validateUserId for admin pages
  window.validateUserId=function(id){
    var n=parseInt(id,10);
    return(!isNaN(n)&&n>0)?n:null;
  };
  window.sendVerificationEmail=function(email,code,name,callback){
    try{
      if(typeof emailjs==='undefined'||typeof EMAILJS_CONFIG==='undefined'){
        if(callback)callback(null);
        return;
      }
      var cfg=EMAILJS_CONFIG;
      if(!cfg.PUBLIC_KEY||!cfg.SERVICE_ID||!cfg.TEMPLATE_ID){
        if(callback)callback(null);
        return;
      }
      emailjs.init(cfg.PUBLIC_KEY);
      emailjs.send(cfg.SERVICE_ID,cfg.TEMPLATE_ID,{
        to_email:email,
        to_name:name||'Cliente',
        verification_code:code,
      }).then(function(r){
        if(callback)callback(r);
      },function(err){
        console.warn('EmailJS erro (fallback):',err);
        if(callback)callback(null);
      });
    }catch(e){
      console.warn('EmailJS fallback:',e);
      if(callback)callback(null);
    }
  };

  window.generateVerificationCode=function(){
    return Math.floor(100000+Math.random()*900000).toString();
  };

  window.getVerificationCode=function(email){
    try{
      var data=JSON.parse(localStorage.getItem('lrm_verify_'+email)||'{}');
      return data.code||null;
    }catch(e){return null;}
  };

  window.storeVerificationCode=function(email,code){
    var data={code:code,expires:Date.now()+900000};
    localStorage.setItem('lrm_verify_'+email,JSON.stringify(data));
  };

  window.isEmailVerified=function(email){
    try{
      var data=JSON.parse(localStorage.getItem('lrm_verify_'+email)||'{}');
      return data.verified===true;
    }catch(e){return false;}
  };

  window.verifyEmail=function(email,inputCode){
    try{
      var data=JSON.parse(localStorage.getItem('lrm_verify_'+email)||'{}');
      if(Date.now()>data.expires)return false;
      if(data.code!==inputCode)return false;
      data.verified=true;
      localStorage.setItem('lrm_verify_'+email,JSON.stringify(data));
      return true;
    }catch(e){return false;}
  };

  window.sendPasswordReset=function(email,name,callback){
    var code=window.generateVerificationCode();
    window.storeVerificationCode(email,code);
    window.sendVerificationEmail(email,code,name||'Cliente',callback);
    return code;
  };

  window.resetPassword=function(email,code,newPassword){
    if(!window.verifyEmail(email,code))return false;
    try{
      var users=JSON.parse(localStorage.getItem('lrm_users')||'[]');
      var idx=users.findIndex(function(u){return u.email===email;});
      if(idx===-1)return false;
      users[idx].passwordHash=hashPassword(newPassword);
      localStorage.setItem('lrm_users',JSON.stringify(users));
      return true;
    }catch(e){return false;}
  };

  window.submitReview=function(userId,userName,serviceId,rating,text){
    if(!userId||!rating||rating<1||rating>5)return false;
    if(!text||text.trim().length<10)return false;
    try{
      var reviews=JSON.parse(localStorage.getItem('lrm_reviews')||'[]');
      var existing=reviews.findIndex(function(r){return r.userId===userId&&r.serviceId===serviceId;});
      if(existing!==-1)return false;
      reviews.push({
        userId:userId,
        clientName:userName.trim().split(' ')[0],
        serviceId:serviceId,
        rating:Math.round(rating),
        text:text.trim(),
        createdAt:new Date().toISOString()
      });
      localStorage.setItem('lrm_reviews',JSON.stringify(reviews));
      return true;
    }catch(e){return false;}
  };
  window.getReviews=function(){
    try{
      return JSON.parse(localStorage.getItem('lrm_reviews')||'[]').sort(function(a,b){
        return new Date(b.createdAt)-new Date(a.createdAt);
      });
    }catch(e){return [];}
  };
  window.hasReviewedService=function(userId,serviceId){
    try{
      var reviews=JSON.parse(localStorage.getItem('lrm_reviews')||'[]');
      return reviews.some(function(r){return r.userId===userId&&r.serviceId===serviceId;});
    }catch(e){return false;}
  };

  window.clearSession=function(){
    localStorage.removeItem('lrm_token');
    localStorage.removeItem('lrm_user');
    localStorage.removeItem('lrm_session_auth');
  };
  window.requireAuth=function(){
    if(!validateToken()){clearSession();window.location.href='login.html';return null;}
    var u=getLoggedUser();
    if(!u){clearSession();window.location.href='login.html';return null;}
    return u;
  };
})();
