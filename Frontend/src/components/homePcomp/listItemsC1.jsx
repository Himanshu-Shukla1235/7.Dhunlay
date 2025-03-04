import React from "react";
import "./listItemsC1.css";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CallIcon from '@mui/icons-material/Call';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import UserContext from "../../pages/User/UserData";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const ListComponent = () => {

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", id: "home-link", dataInfo: "homepage", icon: <SpaceDashboardIcon className="menu-icon" /> },
        { name: "Analytics", href: "/analytics", id: "analytics-link", dataInfo: "analyticspage", icon: <AnalyticsIcon className="menu-icon" /> },
        { name: "Releases", href: "/releases", id: "releases-link", dataInfo: "releasespage", icon: <LibraryMusicIcon className="menu-icon" /> },
        { name: "Finance", href: "/finance", id: "finance-link", dataInfo: "financepage", icon: <MonetizationOnIcon className="menu-icon" /> },
        { name: "Call-Support", href: "/call-support", id: "call-link", dataInfo: "callpage", icon: <CallIcon className="menu-icon" /> },
        { name: "Features", href: "/features", id: "features-link", dataInfo: "featurespage", icon: <StarIcon className="menu-icon" /> },
        { name: "Blog", href: "/blog", id: "blog-link", dataInfo: "blogpage", icon: <ArticleIcon className="menu-icon" /> },
        { name: "Careers", href: "/careers", id: "careers-link", dataInfo: "careerspage", icon: <WorkIcon className="menu-icon" /> },
        { name: "Support", href: "/support", id: "support-link", dataInfo: "supportpage", icon: <SupportAgentIcon className="menu-icon" /> },
    ];

    return (
        <div className="listItems-sec-1">
            {menuItems.map((item, index) => (
                <a key={index} href={item.href} className="listItems-sec-1-items">
                    {item.icon} {item.name}
                </a>
            ))}
        </div>
    );
};

export default ListComponent;
