const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ["localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "**.cloudfront.net",
				pathname: "/**",
				port: "",
			},
			{
				protocol: "https",
				hostname: "barlo-files.s3.ap-southeast-1.amazonaws.com",
				pathname: "/**",
				port: "",
			},
			{
				protocol: "https",
				hostname: "**.s3.**.amazonaws.com",
				pathname: "/**",
				port: "",
			},
		],
	},
};

module.exports = withNextIntl(nextConfig);
