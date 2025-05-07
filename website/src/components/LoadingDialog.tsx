
import { Dialog, DialogContent, DialogTitle, CircularProgress, Typography, } from "@mui/material";
import { ColorBackground } from "../shared/styles/colors";

interface LoadingDialogProps {
    open: boolean;
}

export default function LoadingDialog({ open }: LoadingDialogProps) {
    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <DialogTitle textAlign="center">Загрузка</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
                {/* Спиннер */}
                <CircularProgress size={60} thickness={4} sx={{ marginBottom: "20px", color: ColorBackground }} />

                {/* Текст загрузки */}
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    Пожалуйста, подождите...
                </Typography>
            </DialogContent>
        </Dialog>
    );
}