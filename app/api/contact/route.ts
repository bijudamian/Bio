import { NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate form data
function validateContactForm(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name?.trim()) {
    errors.push("Name is required")
  }

  if (!data.email?.trim()) {
    errors.push("Email is required")
  } else if (!isValidEmail(data.email)) {
    errors.push("Invalid email format")
  }

  if (!data.subject?.trim()) {
    errors.push("Subject is required")
  }

  if (!data.message?.trim()) {
    errors.push("Message is required")
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Format HTML email template
function generateEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Contact Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 100%);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          }
          .header {
            background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
            padding: 24px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 32px;
            color: #e8e8f0;
          }
          .field {
            margin-bottom: 20px;
          }
          .field-label {
            font-weight: 600;
            color: #00d4ff;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            background: rgba(0, 212, 255, 0.1);
            padding: 12px;
            border-left: 3px solid #00d4ff;
            border-radius: 4px;
            word-break: break-word;
          }
          .footer {
            background: rgba(0, 212, 255, 0.1);
            padding: 16px 32px;
            text-align: center;
            color: #7c3aed;
            font-size: 12px;
            border-top: 1px solid rgba(0, 212, 255, 0.2);
          }
          .sender-info {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgba(0, 212, 255, 0.2);
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📨 New Portfolio Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="field-label">Sender Email</div>
              <div class="field-value"><a href="mailto:${escapeHtml(data.email)}" style="color: #00d4ff; text-decoration: none;">${escapeHtml(data.email)}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${escapeHtml(data.subject)}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${escapeHtml(data.message).replace(/\n/g, "<br>")}</div>
            </div>
            <div class="sender-info">
              <p>Submitted at: ${new Date().toLocaleString()}</p>
              <p>From IP: Contact form on portfolio website</p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message from your portfolio contact form. Please reply directly to the sender's email address.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Escape HTML special characters for security
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { name, email, subject, message } = body as ContactFormData

    // Validate form data
    const validation = validateContactForm({ name, email, subject, message })

    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: validation.errors },
        { status: 400 }
      )
    }

    // Check for Resend API key
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set")
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please add RESEND_API_KEY to environment variables.",
        },
        { status: 500 }
      )
    }

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <noreply@bijudamian.dev>",
        to: "bijucoder@gmail.com",
        subject: `New Contact Form Submission: ${subject}`,
        html: generateEmailTemplate({ name, email, subject, message }),
        reply_to: email,
      }),
    })

    const emailData = await emailResponse.json()

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailData)
      return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
      )
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        emailId: emailData.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form API error:", error)
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
