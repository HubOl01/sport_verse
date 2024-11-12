import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { ExercisesService } from "../../../shared/api/exercises.service";
import { IExercise } from "../../../shared/model/IExercise";
import CloseIcon from '@mui/icons-material/Close';

export interface dialogProps {
    keepMounted: boolean;
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
    onSelectExercise: (exercise: IExercise) => void;
}

export function DialogCustom(props: dialogProps) {
    const { onClose, value: valueProp, open, onSelectExercise, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const { data, isLoading, error } = useQuery(['exercises'], () => ExercisesService.getAll()
    )

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p >Произошла ошибка при загрузке данных.</p>;
    console.log(data, error)

    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }

    const handleClose = () => {
        onClose(value);
    };

    const handleSelectExercise = (exercise: IExercise) => {
        onSelectExercise(exercise);
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
            >База тренировочных упражнений

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
                        data.map((exercise: IExercise) => (
                            <ListItem
                                key={exercise.id}
                                disablePadding

                            >
                                <ListItemButton onClick={() => handleSelectExercise(exercise)}>
                                    <ListItemText id={value.toString()} primary={exercise.name} />
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