import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // this will allow site to be framed under builder.io for wysiwyg editing
                    {
                        key: "Content-Security-Policy",
                        value: "frame-ancestors http://localhost:3001"
                        // value: 'frame-ancestors https://*.builder.io https://builder.io',
                    }
                ]
            }
        ];
    },
    webpack: (config, context) => {
        config.externals.push({
            "thread-stream": "commonjs thread-stream"
        });
        return config;
    }
};

export default nextConfig;
