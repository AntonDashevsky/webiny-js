export default function ({ host, port, https, allowedHost, paths }) {
    let server = {};
    if (https) {
        server = {
            type: "https",
            options: {
                requestCert: false
            }
        };
    }
    return {
        host,
        port,
        compress: true,
        static: {
            directory: paths.appPublic,
            watch: true
        },
        open: true,
        hot: true,
        webSocketServer: "ws",
        devMiddleware: {
            publicPath: "/"
        },
        ...server,
        client: {
            overlay: true,
            logging: "warn",
            progress: true
        },
        historyApiFallback: {
            disableDotRule: true
        },
        allowedHosts: allowedHost ? [allowedHost] : undefined
    };
}
