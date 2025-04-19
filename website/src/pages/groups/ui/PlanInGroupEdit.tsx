import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import MyButton from "../../../components/MyButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import MyTextField from "../../../components/MyTextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { useAuth } from "../../../shared/utils/useAuth";
import { useQueryClient } from 'react-query';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import MyDatePicker from "../../../components/MyDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns/AdapterDateFns";
import { ru } from "date-fns/locale";
import styles from './Group.module.scss'
import { ITraining } from "../../../shared/model/ITraining";
import { DialogPlansList } from "./dialogPlans";
import CardTrainingInGroup from "./cardTrainingInGroup";
import { PlanInGroupService } from "../../../shared/api/planInGroups.service";
import { IPlanInGroup } from "../../../shared/model/IPlanInGroup";

interface GroupEditProps {
    onClose: () => void;
    trainingGroup: ITrainingGroup;
    planInGroup?: IPlanInGroup;
}
export default function PlanInGroupEdit(props: GroupEditProps) {
    const queryClient = useQueryClient();
    const [titlePlan, setTitlePlan] = useState<string>(props.planInGroup?.title ?? '')
    const [descPlan, setDescPlan] = useState<string>(props.planInGroup?.desc ?? '')
    const [openDialog, setOpenDialog] = useState(false)
    const [dateStart, setDateStart] = useState<Date | null>(props.planInGroup?.planAt ?? new Date());
    const [trainingPlanSelect, setTrainingPlanSelect] = useState<ITraining | undefined>(props.planInGroup?.plan! ?? undefined);

    const { user: USER } = useAuth();
    const navigate = useNavigate();


    async function createPlanInGroup() {
        try {
            await PlanInGroupService.create({
                title: titlePlan,
                desc: descPlan,
                planAt: dateStart!,
                planId: trainingPlanSelect?.id!,
                groupId: props.trainingGroup!.id!,
            });
            queryClient.invalidateQueries(["group", props.trainingGroup!.id]);
            queryClient.invalidateQueries('groups');
            // console.error('Создана');
            props.onClose();
        } catch (error) {
            console.error('Ошибка при создании группы:', error);
        }
    }
    async function updatePlanInGroup() {
        if (!props.trainingGroup?.id) return;

        try {
            await PlanInGroupService.update(
                (props.planInGroup?.id!).toString(),
                {
                    title: titlePlan,
                    desc: descPlan,
                    planAt: dateStart!,
                    planId: trainingPlanSelect?.id!,
                    groupId: props.trainingGroup!.id!,
                });
            queryClient.invalidateQueries(["group", (props.trainingGroup!.id)!.toString()]);
            queryClient.invalidateQueries('groups');
            props.onClose();
        } catch (error) {
            console.error('Ошибка при обновлении плана в группу:', error);
        }
    }

    if (!USER?.token) {
        navigate("/login");
        return null;
    }
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={props.onClose}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    {props.trainingGroup ? <IconButton
                        edge="end"
                        sx={{ ml: 2, color: "red" }}
                        onClick={() => {
                            TrainingGroupService.delete(props.trainingGroup!.id!.toString());
                            queryClient.invalidateQueries(["group", (props.trainingGroup!.id)!.toString()]);
                            queryClient.invalidateQueries('groups');
                            navigate(-1);
                        }}>
                        <DeleteIcon />
                    </IconButton> : null}
                </Toolbar>
            </AppBar>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    margin: "20px"
                }} >
                <MyTextField label={"Заголовок"} onChange={(e) => setTitlePlan(e.target.value)} value={titlePlan} isBorder />
                <MyTextField label={"Описание"} onChange={(e) => setDescPlan(e.target.value)} value={descPlan} isBorder />
                <div className={`${styles.listTile}`}>
                    <div className={`${styles.title_about_title}`}>
                        Дата начала тренировки:
                    </div>
                    <div className={`${styles.title_about_content}`}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                            <MyDatePicker label={'Укажите дату'} value={dateStart}
                                onChange={(newValue) => { setDateStart(newValue!) }} />
                        </LocalizationProvider>
                    </div>
                </div>
                <MyButton onClick={() => setOpenDialog(true)} label="Выбрать тренировочный план" textButton />
                {
                    trainingPlanSelect ?
                        <CardTrainingInGroup training={trainingPlanSelect} onClick={() => window.open(`/training/${trainingPlanSelect.id}`, '_blank', 'noopener,noreferrer')} /> : null
                }
                <DialogPlansList keepMounted={false} open={openDialog} valuesSelected={trainingPlanSelect!} setValuesSelected={setTrainingPlanSelect!} onClose={() => { setOpenDialog(false) }} />
            </div>

            <div
                style={{
                    margin: "15px"
                }}
            >
                <Button variant="contained" sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    color: "#FFFFFFFF",
                    background: "#4758d6",
                    borderRadius: "20px",
                    width: "100%",
                    fontWeight: "700",
                    padding: "8px 15px",
                }}
                    onClick={
                        () => {
                            if (titlePlan === '' && descPlan === '' && trainingPlanSelect === undefined) {
                                alert('Заполните все поля');
                            } else {
                                if (props.planInGroup) {
                                    updatePlanInGroup();
                                } else {
                                    createPlanInGroup();
                                }
                            }
                        }
                    }
                >Сохранить</Button>
            </div>
        </Box >
    )
}