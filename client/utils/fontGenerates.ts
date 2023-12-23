import localFont from 'next/font/local'

export const bdLife = localFont({
    src: [
        {
            path: '../public/fonts/BDLifelessGrotesk-Light.otf',
            weight: '300',
        },
        {
            path: '../public/fonts/BDLifelessGrotesk-Regular.otf',
            weight: '400',
        },
        {
            path: '../public/fonts/BDLifelessGrotesk-Medium.otf',
            weight: '500',
        },
        {
            path: '../public/fonts/BDLifelessGrotesk-SemiBold.otf',
            weight: '600',
        },
        {
            path: '../public/fonts/BDLifelessGrotesk-Bold.otf',
            weight: '700',
        },

    ],
    variable: "--font-bd-life",
});



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