import { siteConfig } from "./siteConfig";

export type LithosLandingNavItem = {
	label: string;
	href: string;
};

export type LithosLandingAction = LithosLandingNavItem;

export type LithosLandingConfig = {
	brand: string;
	primaryAction: LithosLandingAction;
	secondaryAction: LithosLandingAction;
	navItems: LithosLandingNavItem[];
	images: {
		base: string;
		spotlight: string;
	};
};

export const lithosLandingConfig: LithosLandingConfig = {
	brand: siteConfig.title,
	primaryAction: {
		label: "Enter",
		href: "/blog/",
	},
	secondaryAction: {
		label: "关于我",
		href: "/about/",
	},
	navItems: [
		{ label: "文章", href: "/blog/" },
		{ label: "归档", href: "/archive/" },
		{ label: "分类", href: "/categories/" },
		{ label: "标签", href: "/tags/" },
	],
	images: {
		base: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85",
		spotlight:
			"https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85",
	},
};
