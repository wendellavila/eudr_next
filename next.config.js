/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProduction ? basePath : undefined,
    assetPrefix: isProduction ? `${basePath}` : undefined,
    trailingSlash: true,
    output: 'export',
    images: { unoptimized: true },
    env: {},
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    }
}
module.exports = nextConfig;