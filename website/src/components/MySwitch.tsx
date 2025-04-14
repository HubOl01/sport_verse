import { alpha, styled, Switch } from "@mui/material";
import { ColorBackground } from "../shared/styles/colors";

export const MySwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: ColorBackground,
      '&:hover': {
        backgroundColor: alpha(ColorBackground, theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: ColorBackground,
    },
  }));