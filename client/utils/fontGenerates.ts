import localFont from 'next/font/local'


export const gilroy = localFont({
    src: [
        {
            path: '../public/fonts/Gilroy-Light.ttf',
            weight: '300',
        },
        {
            path: '../public/fonts/Gilroy-Regular.ttf',
            weight: '400',
        },
        {
            path: '../public/fonts/Gilroy-Medium.ttf',
            weight: '500',
        },
        {
            path: '../public/fonts/Gilroy-Bold.ttf',
            weight: '700',
        },

    ],
    variable: "--font-gilroy",
});
