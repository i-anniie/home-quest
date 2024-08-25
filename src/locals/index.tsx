import { BiBuilding, BiCommentDetail, BiHome } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { GoLaw } from "react-icons/go";
import { MdAttachMoney, MdOutlineSupportAgent } from "react-icons/md";
import { VscSymbolProperty } from "react-icons/vsc";

export const navigationData = [
  {
    label: "Home",
    link: "/home",
    icon: <BiHome />,
    isOuterLink: false,
  },
  {
    label: "About",
    link: "/about",
    icon: <BiCommentDetail />,
    isOuterLink: false,
  },
  {
    label: "Properties",
    link: "/properties",
    icon: <BiBuilding />,
    isOuterLink: false,
  },
  {
    label: "Contact",
    link: "/contact",
    icon: <IoIosContact />,
    isOuterLink: false,
  },
];

export const heroSliderImgSchema = [
  {
    img: "/leadpage/heroSlider1.jpg",
  },
  {
    img: "/leadpage/heroSlider2.jpg",
  },
  {
    img: "/leadpage/heroSlider3.jpg",
  },
  {
    img: "/leadpage/heroSlider4.jpg",
  },
];

export const heroSliderSchema = [
  {
    title: "Luxury Apartments",
    description:
      "Discover our collection of luxury apartments in prime locations, featuring state-of-the-art amenities and breathtaking views.",
  },
  {
    title: "Virtual Tours",
    description:
      "Experience properties from the comfort of your home with our immersive virtual tours.",
  },
  {
    title: "Family Homes",
    description:
      "Explore spacious family homes in safe and friendly neighborhoods, perfect for creating lasting memories with your loved ones.",
  },
  {
    title: "Commercial Spaces",
    description:
      "Browse available commercial spaces for your business, ranging from retail shops to office buildings in high-traffic areas.",
  },
];

export const heroStatsData = [
  { start: 7200, end: 8000, label: "Premium Product", duration: 4 },
  { start: 1500, end: 2500, label: "Happy Customers", duration: 4 },
  { start: 17, end: 32, label: "Awards Winning", duration: 5 },
];

export const offerCardSchema = [
  {
    title: "Property Valuations",
    icons: (
      <VscSymbolProperty className="text-2xl md:text-4xl lg:text-6xl text-gray-500" />
    ),
  },
  {
    title: "Legal Assistance",
    icons: <GoLaw className="text-2xl md:text-4xl lg:text-6xl text-gray-500" />,
  },
  {
    title: "Flexible Financing",
    icons: (
      <MdAttachMoney className="text-2xl md:text-4xl lg:text-6xl text-gray-500" />
    ),
  },
  {
    title: "Dedicated Agents",
    icons: (
      <MdOutlineSupportAgent className="text-2xl md:text-4xl lg:text-6xl text-gray-500" />
    ),
  },
];