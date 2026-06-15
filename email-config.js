/* LRM TECNO — EmailJS Configuration
   ===================================
   Passo a passo para configurar (5 minutos, grátis):

   1. Acesse https://www.emailjs.com/ e crie uma conta grátis
      (200 emails/mês — suficiente pra verificação de cadastro)

   2. No dashboard, vá em "Email Services" → "Add New Service"
      Escolha Gmail, Outlook ou qualquer provedor e conecte

   3. Copie o Service ID gerado (ex: service_abc123) e cole abaixo

   4. Vá em "Email Templates" → "Create New Template"
      Cole o HTML abaixo no template e salve
      Copie o Template ID gerado (ex: template_def456) e cole abaixo

   5. Vá em "Account" → "API Keys" → copie sua Public Key (ex: pub_key_xxx)
      e cole abaixo

   PRONTO! O envio de emails de verificação vai funcionar.
*/

var EMAILJS_CONFIG = {
  PUBLIC_KEY:    "",  // Cole aqui sua Public Key do EmailJS
  SERVICE_ID:    "",  // Cole aqui seu Service ID
  TEMPLATE_ID:   "",  // Cole aqui seu Template ID
};

/*
   --- Template HTML do Email (cole no EmailJS) ---
   
   Subject: Código de verificação — LRM TECNO

   <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
     <h2 style="color:#2563eb;margin-bottom:8px">LRM TECNO</h2>
     <p style="color:#555;font-size:15px">Olá <strong>{{name}}</strong>,</p>
     <p style="color:#555;font-size:15px">Seu código de verificação é:</p>
     <div style="background:#f4f6f8;border-radius:8px;padding:24px;text-align:center;margin:16px 0">
       <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#2563eb;font-family:monospace">{{verification_code}}</span>
     </div>
     <p style="color:#888;font-size:13px">Código válido por 15 minutos. Se não foi você, ignore este email.</p>
     <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
     <p style="color:#aaa;font-size:12px">LRM TECNO — Soluções em Tecnologia</p>
   </div>
*/
