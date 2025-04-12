import type { IconButtonProps } from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useSettingsContext } from "src/components/settings/context";
import { useColorScheme } from "@mui/material/styles";
import { Box} from "@mui/material";

// ----------------------------------------------------------------------

export type SettingsButtonProps = IconButtonProps;

export function ModeButton({ sx, ...other }: SettingsButtonProps) {
  const settings = useSettingsContext();
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    settings.onUpdateField("colorScheme", mode === "light" ? "dark" : "light");
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      
      <IconButton
        aria-label="Toggle Dark Mode"
        onClick={toggleMode}
        sx={{ p: 0, width: 25, height: 30, ...sx }}
        {...other}
      >
        <Badge invisible={!settings.canReset}>
          {mode === "light" ? (
            // Moon Icon (Dark Mode Toggle)
            <svg
              width="25"
              height="30"
              viewBox="-15 -19 30 40"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
            >
              <circle r="6" />
              <path
                id="ray"
                d="M 0, 11 L 0, 14"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <use href="#ray" transform="rotate(45)" />
              <use href="#ray" transform="rotate(90)" />
              <use href="#ray" transform="rotate(135)" />
              <use href="#ray" transform="rotate(180)" />
              <use href="#ray" transform="rotate(225)" />
              <use href="#ray" transform="rotate(265)" />
              <use href="#ray" transform="rotate(310)" />
            </svg>
          ) : (
            // Sun Icon (Light Mode Toggle)
            <svg
              data-name="Layer 2"
              width="26"
              height="20"
              viewBox="0 0 35 35"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
            >
              <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z" />
            </svg>
          )}
        </Badge>
      </IconButton>
    
    </Box>
  );
}
