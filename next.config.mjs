/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'picsum.photos' },
        { hostname: 'openweathermap.org' }],
      },
};

export default nextConfig;
