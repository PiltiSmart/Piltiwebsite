import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, service, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send email using Resend
        // NOTE: Resend test mode only allows sending to idealumesh@gmail.com
        // To send to enquiry@piltismart.com, verify a domain at resend.com/domains
        const { data, error } = await resend.emails.send({
            from: 'PiltiSmart Contact Form <onboarding@resend.dev>', // Using Resend's test domain
            to: ['idealumesh@gmail.com'], // Using verified email for testing
            replyTo: `${name} <${email}>`,
            subject: `New Enquiry from ${name} - ${service}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0078D4; border-bottom: 2px solid #0078D4; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Service of Interest:</strong> ${service}</p>
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #0078D4;">
                        <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
                        <p>This email was sent from the PiltiSmart website contact form.</p>
                        <p>Reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', JSON.stringify(error, null, 2));
            return NextResponse.json(
                { error: 'Failed to send email', details: error },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
