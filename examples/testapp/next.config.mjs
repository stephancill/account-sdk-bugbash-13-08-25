export default {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/account-sdk-bugbash-13-08-25' : undefined,
  pageExtensions: ['page.tsx', 'page.ts', 'page.js', 'page.jsx'],
  eslint: {
    // Ignore eslint for `next lint`.
    // GitHub discussion for supporting biome: https://github.com/vercel/next.js/discussions/59347
    ignoreDuringBuilds: true,
  },
};
