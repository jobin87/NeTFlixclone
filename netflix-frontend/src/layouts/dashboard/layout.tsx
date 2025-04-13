import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Tab } from "@mui/material";
import { iconButtonClasses } from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Clapperboard, TrendingUp, Tv } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { useSettingsContext } from "src/components/settings";
import { Main } from "./main";
import { layoutClasses } from "../classes";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { useNavColorVars } from "./styles";
import { paths } from "src/routes/paths";
import { SignOutButton } from "../components/sign-out-button";

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

  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(0);

  const tabPaths = [
    paths.dashboard.home,
    paths.dashboard.search,
    paths.dashboard.series,
    paths.dashboard.anime,
    paths.dashboard.trendinMovie,
  ];

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
            topArea: (
              <Tab
                sx={{
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                label={tabIcon(
                  <HomeIcon
                    sx={{
                      fontSize: 34,
                      color: activeTab === 0 ? "red" : "white",
                    }}
                  />,
                  0
                )}
                onClick={() => handleTabChange(null, 0)}
              />
            ),
            slotArea1: (
              <Tab
                sx={{
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                label={tabIcon(
                  <SearchIcon
                    sx={{
                      fontSize: 34,
                      color: activeTab === 1 ? "red" : "white",
                    }}
                  />,
                  1
                )}
                onClick={() => handleTabChange(null, 1)}
              />
            ),
            slotArea2: (
              <Tab
                sx={{
                  display: { xs: "none", lg: "flex" },
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                label={tabIcon(
                  <Clapperboard
                    color={activeTab === 2 ? "red" : "white"}
                    size={34}
                  />,
                  2
                )}
                onClick={() => handleTabChange(null, 2)}
              />
            ),
            slotArea3: (
              <Tab
                sx={{
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                label={tabIcon(
                  <Tv color={activeTab === 3 ? "red" : "white"} size={30} />,
                  3
                )}
                onClick={() => handleTabChange(null, 3)}
              />
            ),
            slotArea4: (
              <Tab
                sx={{
                  overflow: "hidden",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
                label={tabIcon(
                  <TrendingUp
                    color={activeTab === 4 ? "red" : "white"}
                    size={34}
                  />,
                  4
                )}
                onClick={() => handleTabChange(null, 4)}
              />
            ),
            bottomArea: <SignOutButton />,
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
        pb: { xs: 5, lg: 0 },
        ...sx,
        overflow: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Main
        isNavHorizontal={isNavHorizontal}
        sx={{
          overflow: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {children}
      </Main>
    </LayoutSection>
  );
}
