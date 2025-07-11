import React, { useState, useEffect } from "react";
import "./listItemsC1.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import CallIcon from "@mui/icons-material/Call";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

const ListComponent = () => {
  const [activeName, setActiveName] = useState("");

const menuItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    icon: <SpaceDashboardIcon className="menu-icon" />,
  },
  {
    id: "releases",
    name: "Releases",
    href: "/releases",
    icon: <LibraryMusicIcon className="menu-icon" />,
  },
  {
    id: "analytics",
    name: "Analytics",
    href: "/analytics",
    icon: <AnalyticsIcon className="menu-icon" />,
  },
  {
    id: "features",
    name: "Features",
    href: "/features",
    icon: <StarIcon className="menu-icon" />,
    hidden: true, // will be hidden
  },
  {
    id: "ourPlans",
    name: "OurPlans",
    href: "/ourPlans",
    icon: <ShoppingCartIcon className="menu-icon" />,
  },
  {
    id: "signOut",
    name: "signOut",
    href: "/signOut",
    icon: <LogoutIcon className="menu-icon" />,
  },
];

   
    // {
    //   name: "Finance",
    //   href: "/finance",
    //   icon: <MonetizationOnIcon className="menu-icon" />,
    // },

    // {
    //   name: "Blog",
    //   href: "/blog",
    //   icon: <ArticleIcon className="menu-icon" />,
    // },
    // {
    //   name: "Careers",
    //   href: "/careers",
    //   icon: <WorkIcon className="menu-icon" />,
    // },
    // {
    //   name: "Support",
    //   href: "/support",
    //   icon: <SupportAgentIcon className="menu-icon" />,
    // },
  

  // Set active item based on the current URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = menuItems.find((item) =>
      currentPath.startsWith(item.href)
    );
    if (activeItem) {
      setActiveName(activeItem.name);
    }
  }, []);

  return (
    <div className="listItems-sec-1">
      {menuItems.map((item) => (
        <a
         id={`menu-${item.id}`}
          key={item.name}
          href={item.href}
          className={`listItems-sec-1-items ${
            activeName === item.name ? "active" : ""
          }`}
          onClick={() => setActiveName(item.name)}
        >
          {item.icon} {item.name}
        </a>
      ))}
    </div>
  );
};

export default ListComponent;
