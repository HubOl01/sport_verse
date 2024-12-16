import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export interface dialogProps {
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
}

export function DialogStatus(props: dialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);

    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }

    const handleClose = () => {
        onClose(value);
    };

    // const handleSelectExercise = (exercise: IExercise) => {
    //     onSelectExercise(exercise);
    //     handleClose();
    // };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="self-center text-center"
                sx={{ padding: 2 }}
            >
                <div style={{
                    fontSize: '40px',
                }}>
                    😴
                </div>
                <div style={{
                    fontSize: '25px',
                }}>
                    Отдыхаю
                </div>

                Перерыв между тренировками
            </DialogTitle>
            {/* <DialogContent className="text-center" dividers sx={{ padding: 0 }}>
            </DialogContent> */}
        </Dialog>
    );
}