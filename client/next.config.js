/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ['i.pinimg.com', 'res.cloudinary.com', 'pixlok.com'],
    },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                    },
                },
            ],
        });
        return config;
    },

}

module.exports = nextConfig