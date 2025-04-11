import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { StatusProfileService } from "../../../shared/api/StatusProfile.service";
import { IStatusProfile } from "../../../shared/model/IStatusProfile";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export interface dialogProps {
    keepMounted: boolean;
    value: string;
    open: boolean;
    status: IStatusProfile;
    onClose: (value?: string) => void;
}

export function DialogStatus(props: dialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const { data: statuses } = useQuery(['statuses'], async () => StatusProfileService.getAll());
    const [value, setValue] = useState(valueProp);

    if (props.open) {
        if (!open) {
            setValue(valueProp);
        }
    }

    const handleClose = () => {
        onClose(value);
    };

    // Обработчик клика по иконке редактирования
    const handleEditClick = () => {
        console.log("Edit button clicked");
        // Добавьте логику для редактирования здесь
    };

    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    position: 'relative',
                },
            }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle
                className="self-center text-center"
                sx={{
                    padding: 2,
                    position: 'relative',
                    width: '100%',
                }}
            >
                {/* Кнопка редактирования */}
                <IconButton
                    aria-label="edit"
                    onClick={handleEditClick}
                    sx={{
                        position: 'absolute',
                        top: "5px",
                        right: "20px",
                    }}
                >
                    <EditIcon />
                </IconButton>

                {/* Основной контент заголовка */}
                <div style={{
                    fontSize: '40px',
                    userSelect: 'none',
                }}>
                    {props.status?.svg_image}
                </div>
                <div style={{
                    fontSize: '25px',
                }}>
                    {props.status?.title}
                </div>
                {props.status?.desc}
            </DialogTitle>
        </Dialog>
    );
}