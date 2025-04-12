import type { Breakpoint } from "@mui/material/styles";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ToolbarProps } from "@mui/material/Toolbar";
import type { ContainerProps } from "@mui/material/Container";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { useScrollOffSetTop } from "src/hooks/use-scroll-offset-top";
import { layoutClasses } from "../classes";

// ----------------------------------------------------------------------

const StyledElevation = styled("span")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  height: 4,
  zIndex: -1,
  opacity: 0.48,
  borderRadius: "50%",
  position: "absolute",
  width: "calc(100% - 48px)",
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export type LeftSectionProps = AppBarProps & {
  layoutQuery: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    topArea?: React.ReactNode;
    slotArea1?: React.ReactNode;
    slotArea2?: React.ReactNode;
    slotArea3?: React.ReactNode;
    slotArea4?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode; // Logout
  };
  slotprops?: {
    toolbar?: ToolbarProps;
    container?: ContainerProps;
  };
};

export function HeaderSection({
  sx,
  slots,
  disableElevation,
  layoutQuery = "md",
  ...other
}: LeftSectionProps) {
  const { offsetTop } = useScrollOffSetTop();

  return (
    <Box
      component="nav"
      className={layoutClasses.header}
      sx={{
        position: "fixed",
        top: { xs: "auto", md: 0 },
        bottom: { xs: 0, md: "auto" },
        left: 0,
        [layoutQuery]: "block",
        height: { xs: 30, md: "100vh" },
        width: { xs: "100%", md: "90px" },
        bgcolor: "background.default",
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: "center",
        justifyContent: { xs: "space-between", md: "flex-start" },
        py: { xs: 5, md: 2 },
        px: { xs: 2, md: 0 },
        boxShadow: 3,
        ...sx,
      }}
      {...other}
    >
      {/* Main Slot Area (All icons centered on md+) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: "center",
          justifyContent: { xs: "space-between", md: "center" },
          flexGrow: 1,
          width: "100%",
          gap: { xs: .1, md: 1.5 },
        }}
      >
        {slots?.topArea}
        {slots?.slotArea1}
        {slots?.slotArea2}
        {slots?.slotArea3}
        {slots?.slotArea4}
        {slots?.centerArea}
      </Box>

      {/* Logout Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1.5,
          mt: { xs: 0, lg: "auto" },
          mb: { xs: 1.5, lg: 2 },
        }}
      >
        {slots?.bottomArea}
      </Box>

      {!disableElevation && offsetTop && <StyledElevation />}
    </Box>
  );
}
