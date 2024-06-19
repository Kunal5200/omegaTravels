import {
  BusinessOutlined,
  DashboardOutlined,
  LogoutOutlined,
  Person2Outlined,
  PersonOutline,
  Settings,
  SettingsOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";

export const profileRoutes = [
  {
    name: "Profile",
    url: "/profile",
    icon: <PersonOutline fontSize="small" />,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: <Settings fontSize="small" />,
  },
  {
    name: "Logout",
    url: "/",
    icon: <LogoutOutlined fontSize="small" />,
  },
];

export const routes = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <DashboardOutlined fontSize="small" />,
  },
  {
    name: "Business",
    url: "/omegabusiness/business",
    icon: <BusinessOutlined fontSize="small" />,
  },
  {
    name: "Merchants",
    url: "/merchants",
    icon: <StorefrontOutlined fontSize="small" />,
  },

  {
    name: "User Management",
    url: "/user-management",
    icon: <Person2Outlined fontSize="small" />,
  },
  {
    name: "Settings",
    url: "/setting",
    icon: <SettingsOutlined fontSize="small" />,
  },
];
