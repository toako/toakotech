module.exports = {
    async redirects() {
        return [
            {
                source: '/techs',
                destination: '/techs/dashboard',
                permanent: true,
            },
        ]
    },
}