
const C = {
  bg:          "#ffffff",
  bgDark:      "#09090b",
  brand:       "#FEAF3A",
  brandDark:   "#e09520",
  secondary:   "#f4f4f5",
  textPrimary: "#18181b",
  muted:       "#71717a",
  border:      "#e4e4e7",
  card:        "#ffffff",
};

function base(title, preheader, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;-webkit-text-size-adjust:100%;mso-line-height-rule:exactly;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#f4f4f5;">${preheader}&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;&nbsp;‌&zwnj;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden;">

          <!-- Top accent bar -->
          <tr>
            <td style="background-color:#FEAF3A;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Logo / wordmark row -->
          <tr>
            <td style="padding:28px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#71717a;">
                      Faizan &mdash; Portfolio
                    </span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background-color:#FEAF3A;border-radius:4px;padding:3px 10px;">
                      <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#09090b;">
                        New lead
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:20px 36px 0;">
              <div style="height:1px;background-color:#e4e4e7;font-size:0;line-height:0;">&nbsp;</div>
            </td>
          </tr>

          <!-- Body content slot -->
          <tr>
            <td style="padding:28px 36px 0;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 36px 32px;">
              <div style="height:1px;background-color:#e4e4e7;font-size:0;line-height:0;margin-bottom:20px;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#71717a;line-height:1.6;">
                      Sent from your portfolio contact system.<br/>This is an automated notification — do not reply.
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#a1a1aa;">
                      faizanwebdev1.com
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

function field(label, value) {
  if (!value) return "";
  return `
  <tr>
    <td style="padding:10px 0;vertical-align:top;width:110px;border-bottom:1px solid #f4f4f5;">
      <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;vertical-align:top;border-bottom:1px solid #f4f4f5;">
      <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#18181b;line-height:1.5;">${value}</span>
    </td>
  </tr>`;
}

function messageBlock(heading, text) {
  if (!text) return "";
  return `
  <div style="margin-top:24px;background-color:#f4f4f5;border-radius:8px;padding:20px 22px;border-left:3px solid #FEAF3A;">
    <p style="margin:0 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#71717a;">${heading}</p>
    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#18181b;line-height:1.8;white-space:pre-wrap;">${text}</p>
  </div>`;
}

export function contactEmailHtml({ name, email, subject, message }) {
  const bodyHtml = `
    <!-- Heading -->
    <h1 style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;color:#09090b;letter-spacing:-0.02em;">
      New message
    </h1>
    <p style="margin:0 0 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#71717a;">
      Someone reached out through your contact form.
    </p>

    <!-- Fields -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${field("From",    name  || "&mdash;")}
      ${field("Email",   `<a href="mailto:${email}" style="color:#FEAF3A;text-decoration:none;font-weight:500;">${email}</a>`)}
      ${field("Subject", subject || "&mdash;")}
    </table>

    ${messageBlock("Message", message)}`;

  return base(
    "New Contact Message",
    name ? `${name} sent you a message via your portfolio.` : "New contact form submission on your portfolio.",
    bodyHtml
  );
}

export function bookingEmailHtml({ plan, name, email, phone, website, date, time, message }) {
  const slot = [date, time].filter(Boolean).join(" at ") || null;

  const bodyHtml = `
    <!-- Heading -->
    <h1 style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;color:#09090b;letter-spacing:-0.02em;">
      Project enquiry
    </h1>
    <p style="margin:0 0 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#71717a;">
      A new lead came in from your pricing page.
    </p>

    <!-- Plan pill -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background-color:#09090b;border-radius:6px;padding:10px 20px;">
          <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#ffffff;letter-spacing:0.02em;">
            ${plan.name}&nbsp;&nbsp;
          </span>
          <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:800;color:#FEAF3A;letter-spacing:-0.01em;">
            ${plan.currency}${plan.price}
          </span>
        </td>
      </tr>
    </table>

    <!-- Fields -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${field("Name",    name    || "&mdash;")}
      ${field("Email",   `<a href="mailto:${email}" style="color:#FEAF3A;text-decoration:none;font-weight:500;">${email}</a>`)}
      ${field("Phone",   phone   || "&mdash;")}
      ${field("Website", website ? `<a href="${website}" style="color:#FEAF3A;text-decoration:none;font-weight:500;">${website}</a>` : "&mdash;")}
      ${field("Slot",    slot    || "Not specified")}
    </table>

    ${messageBlock("Notes", message)}`;

  return base(
    "New Project Enquiry",
    `${name || "Someone"} is interested in your ${plan.name} plan.`,
    bodyHtml
  );
}