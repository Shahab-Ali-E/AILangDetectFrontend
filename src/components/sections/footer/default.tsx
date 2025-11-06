import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "@/components/logos/launch-ui";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterProps {
  logo?: React.ReactNode;
  name?: string;
  Links?: FooterLink[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = <LaunchUI />,
  name = siteConfig.name,
  Links = siteConfig.nav.items,
  copyright = siteConfig.copyright,
  policies = [
    { title: "Privacy Policy", href: siteConfig.url },
    { title: "Terms of Service", href: siteConfig.url },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <Footer className={cn(" w-full rounded-t-4xl bg-primary/10", className)}>
      <FooterContent className="flex justify-between px-4">
        <FooterColumn>
          <div className="flex items-center gap-2">
            {logo}
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
        </FooterColumn>
        <div className="flex gap-4 pr-5">
          {Links.map((link, index) => (
            <FooterColumn
              key={index}
              className="hover:underline"
            >
              <Link to={link.href} className="text-md pt-1 font-semibold">
                {link.title}
              </Link>
            </FooterColumn>
          ))}
        </div>
      </FooterContent>
      <FooterBottom className="px-4">
        <div>{copyright}</div>
        <div className="flex items-center gap-4">
          {policies.map((policy, index) => (
            <Link key={index} to={policy.href}>
              {policy.title}
            </Link>
          ))}
          {showModeToggle && <ModeToggle />}
        </div>
      </FooterBottom>
    </Footer>
  );
}
