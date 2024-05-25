import { WelcomeEmail } from "@/components/emails/welcome-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { email, userFirstname } = await req.json();

    const { error } = await resend.emails.send({
        from: 'Hệ thống Oupia <oupia@resend.dev>',
        to: [email],
        subject: 'Bạn đã đăng nhập vào Oupia',
        react: WelcomeEmail({ userFirstname }) as React.ReactElement,
    });

    if (error) {
        return Response.json(error);
    }

    return Response.json({
        message: "Gửi thành công",
    })
}