import type { NavSectionProps } from "src/components/nav-section";

import { useEffect } from "react";

import Box from "@mui/material/Box";
import Drawer, { drawerClasses } from "@mui/material/Drawer";

import { usePathname } from "src/routes/hooks";

import { Button } from "@mui/material";

// ----------------------------------------------------------------------

type NavMobileProps = NavSectionProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({ open, onClose, slots, sx }: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          overflow: "unset",
          bgcolor: "var(--layout-nav-bg)",
          width: "var(--layout-nav-mobile-width)",
          ...sx,
        },
      }}
    >
      {slots?.topArea ?? <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}></Box>}

      {slots?.bottomArea}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            const element = document.getElementById("techstack");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
            onClose();
          }}
          sx={{
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            textTransform: "none",
            color: "white",
            backgroundColor: "#1976d2",
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#135ba1",
              transform: "translateY(-2px)",
              boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)",
            },
            
          }}
        >
          Skills
        </Button>

        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            textTransform: "none",
            color: "white",
            backgroundColor: "#388e3c", // ✅ Green theme
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#2a6f2d",
              transform: "translateY(-2px)",
              boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => {
            const element = document.getElementById("projects");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
            onClose();
          }}
        >
          Projects
        </Button>

        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            textTransform: "none",
            color: "white",
            backgroundColor: "#f57c00", // ✅ Orange theme
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#d86900",
              transform: "translateY(-2px)",
              boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => {
            const element = document.getElementById("about");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
            onClose();
          }}
        >
          About
        </Button>

        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "10px",
            textTransform: "none",
            color: "white",
            backgroundColor: "#d32f2f", // ✅ Red theme
            boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#b12424",
              transform: "translateY(-2px)",
              boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={() => {
            const element = document.getElementById("connect");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
            onClose();
          }}
        >
          Resume
        </Button>
      </Box>
    </Drawer>
  );
}
