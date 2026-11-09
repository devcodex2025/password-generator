/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

// Baseline CSP. Inline scripts are required by the consent bootstrap and
// Next.js hydration, and the ad/GTM tags can use eval, so `'unsafe-inline'`
// and `'unsafe-eval'` remain until a nonce pipeline and a provider audit are
// in place. The allowlists still block arbitrary third-party script/connect
// origins. Update them when adding a new analytics or advertising provider.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googlesyndication.com https://*.doubleclick.net https://*.googleadservices.com https://*.google.com https://*.gstatic.com https://*.adtrafficquality.google https://*.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://*.googletagmanager.com https://*.googlesyndication.com https://*.doubleclick.net https://*.googleadservices.com https://*.google.com https://*.gstatic.com https://*.adtrafficquality.google https://api.pwnedpasswords.com https://*.vercel-insights.com https://*.vercel-scripts.com",
  "frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com https://*.google.com https://*.adtrafficquality.google",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
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
