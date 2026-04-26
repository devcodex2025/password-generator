/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  });
}

const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['mongodb', 'pg'],
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/mongodb/**/*',
      './node_modules/bson/**/*',
      './node_modules/mongodb-connection-string-url/**/*',
      './node_modules/whatwg-url/**/*',
      './node_modules/webidl-conversions/**/*',
      './node_modules/tr46/**/*',
      './node_modules/punycode/**/*',
      './node_modules/@mongodb-js/saslprep/**/*',
      './node_modules/sparse-bitfield/**/*',
      './node_modules/memory-pager/**/*',
      './node_modules/socks/**/*',
      './node_modules/pg/**/*',
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'lodash', 'react-world-flags', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'generatepasswordto.me',
          },
        ],
        destination: 'https://www.generatepasswordto.me/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
};

module.exports = nextConfig;
