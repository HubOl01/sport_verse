import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem } from "@mui/material";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MyTextField from "../../../components/MyTextField";
import { TrainingService } from "../../../shared/api/training.service";
import { ITraining } from "../../../shared/model/ITraining";
import CardTrainingInGroup from "./cardTrainingInGroup";

interface dialogListProps {
    keepMounted: boolean;
    open: boolean;
    valuesSelected: ITraining;
    setValuesSelected: React.Dispatch<React.SetStateAction<ITraining | undefined>>;
    onClose: () => void;
}

export function DialogPlansList(props: dialogListProps) {
    const { onClose, open, valuesSelected, setValuesSelected, ...other } = props;
    const { user: USER } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');


    // const queryClient = useQueryClient();

    const { data } = useQuery(['plans', USER.userId!], () => TrainingService.getAllUser(Number(USER.userId!)));

    if (!USER?.token) {
        navigate("/login");
        return null;
    }

    // Фильтрация планов по строке поиска
    const filteredPlans = data?.filter((plan) =>
        plan.title.toLowerCase().includes(search.toLowerCase())
    );

    // Обработчик закрытия диалога
    const handleClose = () => {
        onClose();
    };

    // Функция для добавления плана
    const handleAddPlan = (plan: ITraining) => {
        props.setValuesSelected(plan);
        setSearch("");
        props.onClose();
    };
    // const listData = Array.isArray(data) && data.length > 0 ? data
    //     .filter((plan: ITraining) => {
    //         const planSelected = plan.id!;
    //         return (props.valuesSelected.id === planSelected);
    //     }) : [];

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', borderRadius: '20px' } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="flex justify-between" sx={{ padding: 2 }}>
                Добавить тренировочный план
                <IconButton size="small" edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 0 }}>
                <List>
                    {/* Поле поиска */}
                    <div style={{ margin: "0px 20px 20px 20px" }}>
                        <MyTextField
                            label={"Найти тренировочный план"}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            isSearch={true}
                        />
                    </div>

                    {Array.isArray(filteredPlans) && filteredPlans.length > 0 ? (
                        filteredPlans.map((plan: ITraining) => {
                            return (
                                <ListItem
                                    key={plan.id}
                                    className="w-screen max-w-screen-sm mb-5"
                                    alignItems="flex-start"
                                    sx={{ width: "100%" }}
                                    disablePadding
                                >
                                    <CardTrainingInGroup training={plan} onClick={() => handleAddPlan(plan)} isDialog={true} />
                                </ListItem>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}