import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Portfolio Contact <noreply@yourdomain.com>",
      to: ["bijucoder@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%); color: #e8e8f0; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 28px; text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);">New Portfolio Contact</h1>
            <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #00d4ff, #7c3aed); margin: 10px auto; border-radius: 2px;"></div>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.2); margin-bottom: 20px;">
            <h2 style="color: #00d4ff; margin-top: 0; font-size: 20px;">Contact Details</h2>
            <p style="margin: 10px 0; line-height: 1.6;"><strong style="color: #7c3aed;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0; line-height: 1.6;"><strong style="color: #7c3aed;">Email:</strong> <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0; line-height: 1.6;"><strong style="color: #7c3aed;">Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 8px; border: 1px solid rgba(124, 58, 237, 0.2);">
            <h2 style="color: #7c3aed; margin-top: 0; font-size: 20px;">Message</h2>
            <div style="background: rgba(0, 0, 0, 0.2); padding: 15px; border-radius: 6px; border-left: 4px solid #00d4ff;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 0; color: #a0a0b0; font-size: 14px;">Sent from your portfolio contact form</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        emailId: emailData.data?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 })
  }
}
