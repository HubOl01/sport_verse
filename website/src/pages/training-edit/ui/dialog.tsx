import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { ExercisesService } from "../../../shared/api/exercises.service";
import { IExercise } from "../../../shared/model/IExercise";



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
    const radioGroupRef = useRef<HTMLElement>(null);
    const { data, isLoading, error } = useQuery(['exercises'], () => ExercisesService.getAll()
    )

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p >Произошла ошибка при загрузке данных.</p>;
    console.log(data, error)
    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };
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
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle>База тренировочных упражнений</DialogTitle>
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

// function renderRow(props: ListChildComponentProps) {
//     const { index, style } = props;

//     return (
//         <ListItem style={style} key={index} component="div" disablePadding>
//             <ListItemButton>
//                 <ListItemText primary={`Item ${index + 1}`} />
//             </ListItemButton>
//         </ListItem>
//     );
// }
