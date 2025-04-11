import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { iconButtonClasses } from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Clapperboard, TrendingUp, Tv } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSettingsContext } from "src/components/settings";
import { Main } from "./main";
import { layoutClasses } from "../classes";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { useNavColorVars } from "./styles";
import { paths } from "src/routes/paths";

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  disableSidebarPadding?: boolean;
};

export function DashboardLayout({
  sx,
  children,
  header,
  disableSidebarPadding,
}: DashboardLayoutProps) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const navColorVars = useNavColorVars(theme, settings);

  const layoutQuery: Breakpoint = "lg";
  const isNavMini = settings.navLayout === "mini";
  const isNavHorizontal = settings.navLayout === "horizontal";
  const isNavVertical = isNavMini || settings.navLayout === "vertical";

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(0);

  const tabPaths = [
    paths.dashboard.home,     // index 0: Home (default)
    paths.dashboard.search,             // index 1
    paths.dashboard.series, // index 2
    paths.dashboard.anime,                    // index 3
    paths.dashboard.trendinMovie,              // index 4
  ];

  // Sync active tab based on exact route
  useEffect(() => {
    const foundIndex = tabPaths.findIndex((path) => location.pathname === path);
    setActiveTab(foundIndex !== -1 ? foundIndex : 0);
  }, [location.pathname]);

  const handleTabChange = (_: any, newValue: number) => {
    if (tabPaths[newValue] !== location.pathname) {
      navigate(tabPaths[newValue]);
    }
  };

  const tabIcon = (icon: React.ReactNode, index: number) => (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box>{icon}</Box>
      <Box
        className="tab-indicator"
        sx={{
          height: 2,
          width: 30,
          borderRadius: 1,
          mt: 1,
          backgroundColor: activeTab === index ? "white" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      />
    </Box>
  );

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          disableElevation={isNavVertical}
          slotprops={{
            toolbar: {
              sx: {
                ...(isNavHorizontal && {
                  bgcolor: "var(--layout-nav-bg)",
                  [`& .${iconButtonClasses.root}`]: {
                    color: "var(--layout-nav-text-secondary-color)",
                  },
                  [theme.breakpoints.up(layoutQuery)]: {
                    height: "var(--layout-nav-horizontal-height)",
                  },
                }),
              },
            },
            container: {
              maxWidth: false,
              sx: {
                ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
              },
            },
          }}
          sx={header?.sx}
          slots={{
            centerArea: (
              <Tabs
                orientation={isSmallScreen ? "horizontal" : "vertical"}
                value={activeTab}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { display: "none" } }}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    gap: { xs: 9, lg: 3 },
                    alignItems: "center",
                    ml: { xs: 2, lg: 0 },
                  },
                  "& .MuiTab-root": {
                    padding: 0,
                    minHeight: 0,
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  flexDirection: "column",
                }}
              >
                <Tab label={tabIcon(<HomeIcon sx={{ fontSize: 34, color: activeTab === 0 ? "red" : "white" }} />, 0)} />
                <Tab label={tabIcon(<SearchIcon sx={{ fontSize: 34, color: activeTab === 1 ? "red" : "white" }} />, 1)} />
                <Tab
                  sx={{ display: { xs: "none", lg: "flex" } }}
                  label={tabIcon(<Clapperboard color={activeTab === 2 ? "red" : "white"} size={34} />, 2)}
                />
                <Tab label={tabIcon(<Tv color={activeTab === 3 ? "red" : "white"} size={30} />, 3)} />
                <Tab
                  sx={{ display: { xs: "flex", lg: "flex" } }}
                  label={tabIcon(<TrendingUp color={activeTab === 4 ? "red" : "white"} size={34} />, 4)}
                />
              </Tabs>
            ),
          }}
        />
      }
      footerSection={null}
      cssVars={{
        ...navColorVars.layout,
        "--layout-transition-easing": "linear",
        "--layout-transition-duration": "120ms",
        "--layout-nav-mini-width": "88px",
        "--layout-nav-vertical-width": "300px",
        "--layout-nav-horizontal-height": "64px",
        "--layout-dashboard-content-pt": theme.spacing(1),
        "--layout-dashboard-content-pb": theme.spacing(8),
        "--layout-dashboard-content-ml": theme.spacing(8),
        "--layout-dashboard-content-px": theme.spacing(5),
      }}
      sx={{
        overflow: "auto", // allow scrolling
        height: "100vh",
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, Edge
        },
        ...(!disableSidebarPadding && {
          [`& .${layoutClasses.hasSidebar}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              transition: theme.transitions.create(["padding-left"], {
                easing: "var(--layout-transition-easing)",
                duration: "var(--layout-transition-duration)",
              }),
              pl: isNavMini
                ? "var(--layout-nav-mini-width)"
                : "var(--layout-nav-vertical-width)",
            },
          },
        }),
        ...sx,
      }}
      
    >
      <Main isNavHorizontal={isNavHorizontal}>{children}</Main>
    </LayoutSection>
  );
}
