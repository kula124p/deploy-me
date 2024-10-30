/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "placeholder.co"
            }
        ]
    }
};

export default nextConfig;
