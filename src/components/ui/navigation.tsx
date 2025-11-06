import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import LaunchUI from "@/components/logos/launch-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/lib/navigation-menu-styles";
import { NavLink } from "react-router";

// Types
interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: React.ReactNode | "default" | "components";
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  logo?: React.ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: ComponentItem[];
}

// Component
export default function Navigation({
  menuItems = siteConfig.nav.items,
  components = [],
  logo = <LaunchUI />,
  logoTitle = siteConfig.name,
  logoDescription = siteConfig.description,
  logoHref = siteConfig.url,
  introItems = [],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink || !item.content ? (
                              <NavLink 
                  to={item.href || "#"}
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      isActive && "bg-primary/20",
                      "focus:bg-primary/20"
                    )
                  }
                >
                {item.title}
              </NavLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {renderMenuContent(item.content, {
                    components,
                    logo,
                    logoTitle,
                    logoDescription,
                    logoHref,
                    introItems,
                  })}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Helper to render dropdown menu content
function renderMenuContent(
  content: MenuItem["content"],
  {
    components,
    logo,
    logoTitle,
    logoDescription,
    logoHref,
    introItems,
  }: {
    components: ComponentItem[];
    logo: React.ReactNode;
    logoTitle: string;
    logoDescription: string;
    logoHref: string;
    introItems: ComponentItem[];
  }
) {
  if (content === "default") {
    return (
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="row-span-3">
          <NavigationMenuLink asChild>
            <a
              href={logoHref}
              className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
            >
              {logo}
              <div className="mt-4 mb-2 text-lg font-medium">{logoTitle}</div>
              <p className="text-muted-foreground text-sm leading-tight">
                {logoDescription}
              </p>
            </a>
          </NavigationMenuLink>
        </li>
        {introItems.map((intro, i) => (
          <ListItem key={i} href={intro.href} title={intro.title}>
            {intro.description}
          </ListItem>
        ))}
      </ul>
    );
  }

  if (content === "components") {
    return (
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        {components.map((component) => (
          <ListItem
            key={component.title}
            title={component.title}
            href={component.href}
          >
            {component.description}
          </ListItem>
        ))}
      </ul>
    );
  }

  // Fallback if custom ReactNode is passed
  return <>{content}</>;
}

// List Item Renderer
function ListItem({
  className,
  title,
  children,
  ...props
}: React.ComponentProps<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          data-slot="list-item"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
