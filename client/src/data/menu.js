import * as Unicons from "@iconscout/react-unicons";
import { yearsToMonths } from "date-fns";

export const menuList = {
  prod: [
    {
      unicon: Unicons.UilUserCircle,
      name: "Author Profile",
      link: "/account",
      addUserId: true,
    },
    {
      unicon: Unicons.UilNewspaper,
      name: "Newsfeed",
      link: "/newsfeed",
      addUserId: false,
    },
    {
      unicon: Unicons.UilUsersAlt,
      name: "Friends",
      link: "/people",
      addUserId: false,
    },
    {
      unicon: Unicons.UilGlobe,
      name: "Stories",
      link: "",
      addUserId: false,
    },
    {
      unicon: Unicons.UilChat,
      name: "Chat",
      link: "",
      addUserId: false,
    },
  ],
  dev: [
    {
      unicon: Unicons.UilBolt,
      name: "Groups",
      link: "/",
      addUserId: false,
    },
    {
      unicon: Unicons.UilLocationPoint,
      name: "Events",
      link: "/",
      addUserId: false,
    },
    {
      unicon: Unicons.UilEstate,
      name: "Near Hotels",
      link: "/",
      addUserId: false,
    },
  ],
};
