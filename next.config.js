/** @type {import('next').NextConfig} */
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
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'lodash'],
  },
};

module.exports = nextConfig;
