import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  type?: "contact" | "ping"
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate message length
    if (body.message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    const isPing = body.type === "ping"
    const emailSubject = isPing ? `🚀 Quick Ping: ${body.subject}` : `📧 Portfolio Contact: ${body.subject}`

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Portfolio Contact <noreply@yourdomain.com>", // Replace with your verified domain
      to: ["bijucoder@gmail.com"],
      subject: emailSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0f; color: #e2e8f0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 24px;">
              ${isPing ? "⚡ Quick Ping Message" : "📧 New Contact Form Submission"}
            </h1>
          </div>
          
          <div style="background-color: #1a1a2e; padding: 20px; border-radius: 8px; border-left: 4px solid #00d4ff;">
            <h2 style="color: #00d4ff; margin-top: 0;">Contact Details</h2>
            <p><strong style="color: #7c3aed;">Name:</strong> ${body.name}</p>
            <p><strong style="color: #7c3aed;">Email:</strong> ${body.email}</p>
            <p><strong style="color: #7c3aed;">Subject:</strong> ${body.subject}</p>
            ${isPing ? '<p><strong style="color: #10b981;">Type:</strong> Quick Ping 🚀</p>' : ""}
          </div>
          
          <div style="background-color: #1a1a2e; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #00d4ff; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #374151;">
            <p style="color: #9ca3af; font-size: 14px;">
              Sent from your Quantum Portfolio • ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
        ${isPing ? "Quick Ping Message" : "New Contact Form Submission"}
        
        Name: ${body.name}
        Email: ${body.email}
        Subject: ${body.subject}
        ${isPing ? "Type: Quick Ping" : ""}
        
        Message:
        ${body.message}
        
        Sent: ${new Date().toLocaleString()}
      `,
    })

    // Log the email ID for debugging
    console.log("Email sent successfully:", emailData.data?.id)

    return NextResponse.json(
      {
        success: true,
        message: isPing ? "Quick ping sent successfully!" : "Message sent successfully!",
        emailId: emailData.data?.id,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form API error:", error)

    // Handle specific Resend errors
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json({ error: "Email service configuration error" }, { status: 500 })
      }

      if (error.message.includes("rate limit")) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
      }
    }

    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
