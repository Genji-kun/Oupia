import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

function useFont() {
    // Đọc font chữ từ cookies
    const font = getCookie('font');

    // Áp dụng font chữ cho trang
    useEffect(() => {
        if (font)
            document.body.style.fontFamily = font;
    }, [font]);
}
