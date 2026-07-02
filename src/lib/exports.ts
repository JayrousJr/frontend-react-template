import type { NavItemType } from "@/components/ui/navigation-menu"
import {
  AudioLinesIcon,
  BarChart,
  CodeIcon,
  Computer,
  DollarSign,
  Facebook,
  FileText,
  FrameIcon,
  GalleryVerticalEndIcon,
  Github,
  GlobeIcon,
  Handshake,
  HelpCircle,
  Instagram,
  LayersIcon,
  Leaf,
  Linkedin,
  PlugIcon,
  RotateCcw,
  Settings2Icon,
  Shield,
  Star,
  TerminalIcon,
  TerminalSquareIcon,
  Twitter,
  UserPlusIcon,
  Users,
  Video,
  Youtube,
} from "lucide-react"
import { ROUTES } from "@/routes/routeConstants"
import i18n from "@/config/i18n"
const t = i18n.t
export const logo = "../logo.png"
export const APP_NAME = import.meta.env.VITE_APP_NAME as string
export const productLinks: NavItemType[] = [
  {
    title: "Website Builder",
    href: "#",
    description: "Create responsive websites with ease",
    icon: GlobeIcon,
  },
  {
    title: "Cloud Platform",
    href: "#",
    description: "Deploy and scale apps in the cloud",
    icon: LayersIcon,
  },
  {
    title: "Team Collaboration",
    href: "#",
    description: "Tools to help your teams work better together",
    icon: UserPlusIcon,
  },
  {
    title: "Analytics",
    href: "#",
    icon: BarChart,
  },
  {
    title: "Integrations",
    href: "#",
    icon: PlugIcon,
  },
  {
    title: "E-Commerce",
    href: "#",
    icon: DollarSign,
  },
  {
    title: "Security",
    href: "#",
    icon: Shield,
  },
  {
    title: "API",
    href: "#",
    icon: CodeIcon,
  },
]

export const companyLinks: NavItemType[] = [
  {
    title: "About Us",
    href: "#",
    description: "Learn more about our story and team",
    icon: Users,
  },
  {
    title: "Customer Stories",
    href: "#",
    description: "See how we’ve helped our clients succeed",
    icon: Star,
  },
  {
    title: "Terms of Service",
    href: "#",
    description: "Understand how we operate",
    icon: FileText,
  },
  {
    title: "Privacy Policy",
    href: "#",
    description: "How we protect your information",
    icon: Shield,
  },
  {
    title: "Refund Policy",
    href: "#",
    description: "Details about refunds and cancellations",
    icon: RotateCcw,
  },
  {
    title: "Partnerships",
    href: "#",
    icon: Handshake,
    description: "Collaborate with us for mutual growth",
  },
  {
    title: "Blog",
    href: "#",
    icon: Leaf,
    description: "Insights, tutorials, and company news",
  },
  {
    title: "Help Center",
    href: "#",
    icon: HelpCircle,
    description: "Find answers to your questions",
  },
]

export const footerDetails = {
  foterLinks: [
    {
      linkTitle: "Products",
      linkDetails: [
        { name: "Components", url: "#" },
        {
          name: "Template",
          url: "#",
        },
        {
          name: "Icons",
          url: "#",
        },
      ],
    },
    {
      linkTitle: "Resources",
      linkDetails: [
        { name: "Resource 1", url: "#" },
        {
          name: "Resource 2",
          url: "#",
        },
        {
          name: "Resource 3",
          url: "#",
        },
        {
          name: "Resource 5",
          url: "#",
        },
        {
          name: "Resource 6",
          url: "#",
        },
      ],
    },
    {
      linkTitle: "Company",
      linkDetails: [
        { name: "About Us", url: "#" },
        {
          name: "Hiring",
          url: "#",
        },
        {
          name: "Blogs",
          url: "#",
        },
        {
          name: "How we do",
          url: "#",
        },
        {
          name: "Leadership",
          url: "#",
        },
        {
          name: "Contact Us",
          url: "#",
        },
      ],
    },
  ],
  footerSocialMedia: [
    {
      name: "Instagram",
      active: true,
      url: "#",
      icon: Instagram,
      color: "text-pink-600",
    },
    {
      name: "Youtube",
      active: true,
      url: "#",
      icon: Youtube,
      color: "text-red-600",
    },
    {
      name: "Facebook",
      active: true,
      url: "#",
      icon: Facebook,
      color: "text-blue-600",
    },
    {
      name: "github",
      active: true,
      url: "#",
      icon: Github,
      color: "text-primary",
    },
    {
      name: "linkedin",
      active: true,
      url: "#",
      icon: Linkedin,
      color: "text-primary",
    },
    {
      name: "twitter",
      active: true,
      url: "#",
      icon: Twitter,
      color: "text-blue-600",
    },
  ],
  footerParagraph:
    "Your first stop shop for all Software services from Simple website development to complex automated systems",
}

// App sidebar
export const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEndIcon,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioLinesIcon,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: TerminalIcon,
    plan: "Free",
  },
]

export const navMain: {
  title: () => string
  url: string
  icon?: any
  isActive?: boolean
  items?: {
    title: () => string
    url: string
  }[]
}[] = [
  {
    title: () => t("dashboards.navMain.dashboard.title"),
    url: "#",
    icon: TerminalSquareIcon,
    isActive: true,
    items: [
      {
        title: () => t("dashboards.navMain.dashboard.history"),
        url: "#",
      },
      {
        title: () => t("dashboards.navMain.dashboard.analytics"),
        url: "#",
      },
    ],
  },

  {
    title: () => t("dashboards.navMain.settings.title"),
    url: "#",
    icon: Settings2Icon,
    items: [
      {
        title: () => t("dashboards.navMain.settings.system_settings"),
        url: "#",
      },
      {
        title: () => t("dashboards.navMain.settings.my_account"),
        url: ROUTES.SETTINGS,
      },
    ],
  },
  {
    title: () => t("dashboards.navMain.role_permissions.title"),
    url: "#",
    icon: Settings2Icon,
    items: [
      {
        title: () => t("dashboards.navMain.role_permissions.roles"),
        url: "#",
      },
      {
        title: () => t("dashboards.navMain.role_permissions.permissions"),
        url: "#",
      },
    ],
  },
]

export const navSubmain: {
  name: () => string
  url: string
  icon: any
}[] = [
  {
    name: () => t("dashboards.subMain.design"),
    url: "#",
    icon: FrameIcon,
  },
  {
    name: () => t("dashboards.subMain.software"),
    url: "#",
    icon: Computer,
  },
  {
    name: () => t("dashboards.subMain.multimedia"),
    url: "#",
    icon: Video,
  },
]
