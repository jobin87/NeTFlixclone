import type { SxProps, Theme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";
import { useAppDispatch } from "src/store";
import { API_METHODS, ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION, makeNetworkCall } from "src/network";
import { requestSignOut } from "src/store/app/appThunk";

type Props = {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ sx, onClose }: Props) {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    sessionStorage.removeItem("welcomeMessageShown");
    localStorage.clear();
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION,
      });
      console.log("responsiingg:",response)
      if (response?.data?.loggedOut) {
        dispatch(requestSignOut(onClose));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, onClose]);

  return (
    <IconButton
      onClick={handleLogout}
      sx={{
        fontSize: 30,
        color: "white",
        "&:hover": { color: "red" },
        ...sx,
      }}
    >
      <LogoutIcon fontSize="inherit" />
    </IconButton>
  );
}
