import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export const logo = "../logo.png"
export const APP_NAME = import.meta.env.VITE_APP_NAME as string

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
      name: "linkedin",
      active: true,
      url: "#",
      icon: Linkedin,
    },
    {
      name: "twitter",
      active: false,
      url: "#",
      icon: Twitter,
      color: "text-blue-600",
    },
    {
      name: "tiktok",
      active: false,
      url: "#",
      icon: "",
      color: "text-black",
    },
  ],
}
