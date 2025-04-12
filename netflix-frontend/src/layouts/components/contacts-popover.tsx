import type { IconButtonProps } from '@mui/material/IconButton';
import { m } from 'framer-motion';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export type ContactsPopoverProps = IconButtonProps & {
  data?: {
    id: string;
    role: string;
    name: string;
    email: string;
    status: string;
    address: string;
    avatarUrl: string;
    phoneNumber: string;
    lastActivity: string;
  }[];
};

export function ContactsPopover({ data = [], sx, ...other }: ContactsPopoverProps) {
  const popover = usePopover();

  return (
    <Box display="flex" flexDirection="column-reverse" alignItems="center" sx={{mr:4}}>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={{ hover: { scale: 1.05 } }}
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && { bgcolor: (theme) => theme.vars.palette.action.selected }),
          ...sx,
        }}
        {...other}
      >
        <SvgIcon>
          {/* User Group Icon */}
          <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4" />
          <ellipse cx="16" cy="17" fill="currentColor" opacity="0.4" rx="5" ry="3" />
          <circle cx="9.001" cy="6" r="4" fill="currentColor" />
          <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4" />
        </SvgIcon>
      </IconButton>
      <Typography variant="caption" sx={{ textAlign: 'center', mb: 0.2,  }}>
        Contacts
      </Typography>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{
          arrow: { offset: 20 },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <span>({data.length})</span>
        </Typography>
      </CustomPopover>
    </Box>
  );
}
