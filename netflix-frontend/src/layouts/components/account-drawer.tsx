import { useState, useCallback } from "react";
import type { IconButtonProps } from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { varAlpha } from "src/theme/styles";
import { Scrollbar } from "src/components/scrollbar";
import { AnimateAvatar } from "src/components/animate";
import { AccountButton } from "./account-button";
import { SignOutButton } from "./sign-out-button";

import EditIcon from "@mui/icons-material/Edit";

// ----------------------------------------------------------------------

export type AccountDrawerProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const theme = useTheme();


  // State for profile images
  const [previousPhoto] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  {selectedFile && <p>Selected File: {selectedFile.name}</p>}


  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);


  // Handle profile image selection
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);


    }
  };


  // Profile Image UI
  const renderAvatar = (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <AnimateAvatar
        width={96}
        slotProps={{
          avatar: { src: ""},
          overlay: {
            border: 2,
            spacing: 3,
            color: `linear-gradient(135deg, ${varAlpha(
              theme.vars.palette.primary.mainChannel,
              0
            )} 25%, ${theme.vars.palette.primary.main} 100%)`,
          },
        }}
      >
      </AnimateAvatar>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ display: "none" }}
        id="profile-photo-input"
      />

      {/* Edit Button Inside Avatar */}
      <label htmlFor="profile-photo-input">
        <IconButton
          component="span"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            zIndex: 10,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            p: 0.5,
            borderRadius: "50%",
            boxShadow: 2,
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </label>
    </Box>
  );

  return (
    <>
      <AccountButton
        onClick={handleOpenDrawer}
        photoURL=""
        displayName=""
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: "absolute" }}
        />

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              User:
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }} noWrap>
            </Typography>

            {/* Previous Image Display */}
            {previousPhoto && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Previous Image:
                </Typography>
                <Box
                  component="img"
                  src={previousPhoto}
                  alt="Previous Profile"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${theme.vars.palette.divider}`,
                    mt: 1,
                  }}
                />
              </Box>
            )}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }} >
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
