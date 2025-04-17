import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { apiSportTypes } from "../../../shared/config";
import { TypeSportService } from "../../../shared/api/typeSport.service";
import { ISportType } from "../../../shared/model/ISportType";

export interface dialogSportTypeProps {
    keepMounted: boolean;
    value: ISportType;
    open: boolean;
    onClose: (value?: string) => void;
    onSelectSportType: (sportType: ISportType) => void;
}

export function DialogSportType(props: dialogSportTypeProps) {
    const { onClose, value: valueProp, open, onSelectSportType: onSelectExercise, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const { data } = useQuery([apiSportTypes], () => TypeSportService.getAll()
    )

    // if (isLoading) return <p>Загрузка...</p>;
    // if (error) return <p >Произошла ошибка при загрузке данных.</p>;
    // console.log(data, error)

    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }

    const handleClose = () => {
        onClose(value.title);
    };

    const handleSelectExercise = (sportType: ISportType) => {
        onSelectExercise(sportType);
        handleClose();
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="flex justify-between"
                sx={{ padding: 2 }}
            >Список видов спорта

                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 0 }}>
                <List>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((sportType: ISportType) => (
                            <ListItem
                                key={sportType.id}
                                disablePadding

                            >
                                <ListItemButton onClick={() => handleSelectExercise(sportType)}>
                                    <ListItemText id={value.toString()} primary={sportType.title} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <p>Нет тренировочных упражнений</p>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}