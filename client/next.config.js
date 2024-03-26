/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ['i.pinimg.com', 'res.cloudinary.com', 'pixlok.com'],
    },
}

module.exports = nextConfig