import localFont from 'next/font/local'

export const BeauSans = localFont({
    src: [
        {
            path: '../public/fonts/PFBeauSansPro-Light.ttf',
            weight: '300',
        },
        {
            path: '../public/fonts/PFBeauSansPro-Regular.ttf',
            weight: '400',
        },
        {
            path: '../public/fonts/PFBeauSansPro-SemiBold.ttf',
            weight: '600',
        },
        {
            path: '../public/fonts/PFBeauSansPro-Bold.ttf',
            weight: '700',
        },

    ],
    variable: "--font-beau-sans",
});