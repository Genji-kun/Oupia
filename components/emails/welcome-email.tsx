import React from 'react'


interface WelcomeEmailTemplateProps {
    userFirstname: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailTemplateProps>> = ({
    userFirstname,
}) => (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "2px"}}>
        <img src="" alt="Oupia Logo"/>
        <p>Chào{userFirstname},</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản đến Oupia. Chúc bạn có trải nghiệm tốt nhất khi sử dụng ứng dụng của chúng tôi.</p>
        {/* <Button className="styled-button">Bắt đầu</Button> */}
        <div>
            <p>Trân trọng, </p>
            <p>Hệ thống Oupia</p>
        </div>
        {/* <Separator/> */}
        <p className="text-muted-foreground">371 Nguyễn Kiệm, phường 5, quận Gò Vấp, thành phố Hồ Chí Minh</p>
    </div>
);

export default WelcomeEmail;
