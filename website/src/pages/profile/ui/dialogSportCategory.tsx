import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { SportCategoryService } from "../../../shared/api/SportCategory.service";
import { ISportCategory } from "../../../shared/model/ISportCategory";

interface dialogListProps {
    keepMounted: boolean;
    value: ISportCategory;
    open: boolean;
    onClose: (status?: ISportCategory) => void;
    onSelect: (status: ISportCategory) => void;
}

export function DialogSportCategoryList(props: dialogListProps) {
    const { onClose, value: valueProp, open, onSelect: onSelectExercise, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const { data } = useQuery(['sportCategories'], () => SportCategoryService.getAll()
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
        onClose(value);
    };

    const handleSelectExercise = async (model: ISportCategory) => {
        onSelectExercise(model);
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
                sx={{ padding: 2, fontSize: 18 }}
            >Выберите спортивный разряд или звание
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
                        data.map((model: ISportCategory) => (
                            <ListItem
                                key={model.id}
                                disablePadding>
                                <ListItemButton onClick={() => handleSelectExercise(model)}>
                                    <ListItemText id={model.title} primary={model.title} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <p>Нет разрядов</p>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}