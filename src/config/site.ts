function createSiteConfig(name: string) {
  return {
    name,
    url: "http://localhost:5173/",
    description:
      "AILangDetect is an AI-powered tool that detects and identifies 7 major languages with high accuracy in real-time.",

    links: {
      twitter: "https://twitter.com/ailangdetect",
      github: "https://github.com/your-org/ailangdetect",
      email: "mailto:support@ailangdetect.com",
      blog: "https://ailangdetect.com/blog",
      contact: "https://ailangdetect.com/contact",
    },

    nav: {
      items: [
        { title: "About Us", href: "/about" },
        { title: "Contact Us", href: "/contact" },
      ],
    },

    copyright: `© 2025 ${name}. All rights reserved`,

    signInUrl: "https://ailangdetect.com/sign-in",
    signUpUrl: "https://ailangdetect.com/sign-up",

    pricing: {
      pro: "https://ailangdetect.com/pricing/pro",
      team: "https://ailangdetect.com/pricing/team",
    },

    stats: {
      supportedLanguages: 7,
      users: "12.4k+",
      apiRequests: "1.2M+",
      updated: "01 August 2025",
    },
  };
}

export const siteConfig = createSiteConfig("AILangDetect");
export type SiteConfig = typeof siteConfig;
