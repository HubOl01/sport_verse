import { useMediaQuery, useTheme } from "@mui/material";

export function useSmallScreen(): boolean {
    const theme = useTheme();
    const isSmallScreen = !useMediaQuery(theme.breakpoints.up('sm'));
    return isSmallScreen;
}