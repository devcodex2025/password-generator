/** @type {import('next').NextConfig} */
const nextConfig = {

    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'generatepasswordto.me', // без www
                    },
                ],
                destination: 'https://www.generatepasswordto.me/:path*',
                permanent: true, // 301 редірект
            },
        ]
    },

};

module.exports = nextConfig;
