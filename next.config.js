/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/projects/eudr_next' : undefined;

const nextConfig = {
    basePath: basePath,
    trailingSlash: true,
    output: 'export',
    images: {
        unoptimized: true
    }
}
module.exports = nextConfig;