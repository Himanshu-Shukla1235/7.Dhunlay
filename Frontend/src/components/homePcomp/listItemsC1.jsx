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

const ListComponent = () => {
  const [activeName, setActiveName] = useState("");

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <SpaceDashboardIcon className="menu-icon" />,
    },
    {
      name: "Releases",
      href: "/releases",
      icon: <LibraryMusicIcon className="menu-icon" />,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <AnalyticsIcon className="menu-icon" />,
    },

    // { name: "Call-Support", href: "/call-support", icon: <CallIcon className="menu-icon" /> },
    {
      name: "Features",
      href: "/features",
      icon: <StarIcon className="menu-icon" />,
    },
    {
      name: "OurPlans",
      href: "/ourPlans",
      icon: <ShoppingCartIcon className="menu-icon" />,
    },
   
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
  ];

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
