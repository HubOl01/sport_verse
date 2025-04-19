import { AppBar, Avatar, Box, Button, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MyButton from "../../../components/MyButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import MyTextField from "../../../components/MyTextField";
import { useEffect, useState } from "react";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { DialogAthletesList } from "./dialogAthletes";
import { IUser } from "../../../shared/model/IUser";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { useAuth } from "../../../shared/utils/useAuth";
import { DialogSportType } from "../../training-new/ui/dialogTypeSport";
import { ISportType } from "../../../shared/model/ISportType";
import { AthleteInGroupService } from "../../../shared/api/athleteInGroup.service";
import { useQueryClient } from 'react-query';
import { IAthleteInGroup } from "../../../shared/model/IAthleteInGroup";

interface GroupEditProps {
    onClose: () => void;
    trainingGroup?: ITrainingGroup;

}
export default function GroupEdit(props: GroupEditProps) {
    const queryClient = useQueryClient();
    const [titleGroup, setTitleGroup] = useState<string>(props.trainingGroup?.title ?? '')
    const [descGroup, setDescGroup] = useState<string>(props.trainingGroup?.desc ?? '')
    const [isPrivate, setIsPrivate] = useState(props.trainingGroup?.isPrivate ? props.trainingGroup?.isPrivate === 1 ? true : false : false)
    const [openDialog, setOpenDialog] = useState(false)
    const [openSportType, setOpenSportType] = useState(false)
    // const [value, setValue] = useState<string>('');
    const [valueSportType, setValueSportType] = useState<ISportType>(props.trainingGroup?.sportType ?? { id: 0, title: '', image: null });
    const [athletes, setAthletes] = useState<IUser[]>([])
    useEffect(() => {
        if (props.trainingGroup?.athletes) {
            const userList: IUser[] = props.trainingGroup.athletes
                .map((item: IAthleteInGroup) => item.athlete)
                .filter((athlete): athlete is IUser => athlete !== undefined && athlete !== null);

            setAthletes(userList);
        }
    }, [props.trainingGroup]);
    const { user: USER } = useAuth();
    const navigate = useNavigate();


    async function createTrainingGroup() {
        try {
            await TrainingGroupService.create({
                title: titleGroup,
                desc: descGroup,
                trainerId: Number(USER.userId),
                sportTypeId: valueSportType.id,
                isPrivate: isPrivate ? 1 : 0,
            });
            const groups = await TrainingGroupService.getAll();
            for (var athlete of athletes) {
                await AthleteInGroupService.create({
                    trainingGroupId: groups[groups.length - 1].id!,
                    athleteId: athlete.id!,
                })
            }
            queryClient.invalidateQueries(["group", props.trainingGroup!.id]);
            queryClient.invalidateQueries('groups');
            props.onClose();
        } catch (error) {
            console.error('Ошибка при создании группы:', error);
        }
    }
    async function updateTrainingGroup() {
        if (!props.trainingGroup?.id) return;

        try {
            await TrainingGroupService.update(props.trainingGroup.id.toString(), {
                title: titleGroup,
                desc: descGroup,
                trainerId: Number(USER.userId),
                sportTypeId: valueSportType.id,
                isPrivate: isPrivate ? 1 : 0,
            });

            const oldAthleteIds = new Set((props.trainingGroup.athletes ?? []).map(a => a.athleteId));
            const newAthleteIds = new Set(athletes.map(a => a.id));

            for (const athlete of athletes) {
                if (!oldAthleteIds.has(athlete.id!)) {
                    await AthleteInGroupService.create({
                        trainingGroupId: props.trainingGroup.id,
                        athleteId: athlete.id!,
                    });
                }
            }

            for (const old of props.trainingGroup.athletes ?? []) {
                if (!newAthleteIds.has(old.athleteId)) {
                    await AthleteInGroupService.delete((old.id!).toString());
                }
            }
            queryClient.invalidateQueries(["group", (props.trainingGroup!.id)!.toString()]);
            queryClient.invalidateQueries('groups');
            props.onClose();
        } catch (error) {
            console.error('Ошибка при обновлении группы:', error);
        }
    }

    const handleClickSportType = () => {
        setOpenSportType(true);
    };
    const handleAddSelectedSportType = (sportType: ISportType) => {
        setValueSportType(sportType);
    };


    const handleCloseSportType = () => {
        setOpenSportType(false);
    };
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
                <MyTextField label={"Название группы"} onChange={(e) => setTitleGroup(e.target.value)} value={titleGroup} isBorder />
                <MyTextField label={"Описание группы"} onChange={(e) => setDescGroup(e.target.value)} value={descGroup} isBorder />
                <Button sx={{
                    color: "black",
                    // borderRadius: "30px",
                    justifyContent: "start",
                    textTransform: 'none',
                    width: "100%",
                    fontSize: "18px",
                    padding: "5px 8px 5px 0px",
                }} onClick={handleClickSportType}>Вид спорта: {valueSportType?.title}</Button>
                <DialogSportType keepMounted open={openSportType} onClose={handleCloseSportType} onSelectSportType={handleAddSelectedSportType} value={valueSportType!} />
                <div className="flex items-center">
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        <div className="flex items-center">
                            Статус группы: {isPrivate ? "Закрытая" : "Открытая"} {
                                isPrivate ?
                                    <LockOutlineIcon sx={{ height: "20px", width: "20px", marginLeft: "5px" }} /> : null}
                        </div>
                    </Typography>
                    <MyButton onClick={() => setIsPrivate(!isPrivate)} label={`Сделать ${isPrivate ? "открытой" : "закрытой"}`} style={{
                        textTransform: "none",
                    }} />
                </div>
            </div>
            <>
                <div className="flex items-center mt-5 ml-5 mr-5 mb-3">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Участники группы: {props.trainingGroup?.athletes?.length}
                    </Typography>
                    <MyButton onClick={() => setOpenDialog(true)} label={`Добавить участника`} style={{
                        textTransform: "none",
                    }} />
                </div>
                <Divider sx={{ margin: 0, padding: 0 }} />
                <List sx={{ margin: 0, padding: 0 }}>
                    {Array.isArray(athletes) && athletes.length > 0 ? (
                        athletes.map((athlete: IUser) => {
                            return (
                                <ListItem
                                    key={athlete.id}
                                    alignItems="flex-start"
                                    sx={{ width: "100%" }}
                                    disablePadding
                                    secondaryAction={<IconButton edge="end" aria-label="delete"
                                        onClick={() => {
                                            setAthletes(
                                                athletes.filter((selectedUser) => selectedUser.id !== athlete.id)
                                            );
                                        }}
                                    >
                                        <CloseIcon sx={{ color: 'red' }} />
                                    </IconButton>}
                                >
                                    <ListItemButton
                                        onClick={() => { setAthletes(athletes) }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="avatar" src={athlete.profile?.url_avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <>
                                                        {athlete.profile?.name}
                                                    </>
                                                    <Chip
                                                        label={athlete.profile?.role?.title}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            marginLeft: "10px",
                                                            fontSize: "12px",
                                                        }}
                                                    />
                                                </>
                                            }
                                            secondary={
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.secondary', display: 'inline' }}
                                                >
                                                    @{athlete.username}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: "center" }}>Нет выбранных участников</p>
                    )}
                </List>
                <DialogAthletesList keepMounted={false} open={openDialog} onClose={() => setOpenDialog(false)} valuesSelected={athletes} setValuesSelected={setAthletes} />
            </>
            <div
                style={{
                    margin: "15px"
                }}
            >
                <Button variant="contained" sx={{
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
                            if (titleGroup === '' && descGroup === '' && athletes.length === 0 && valueSportType.id === 0) {
                                alert('Заполните все поля');
                            } else {
                                if (props.trainingGroup) {
                                    updateTrainingGroup();
                                } else {
                                    createTrainingGroup();
                                }
                            }
                        }
                    }
                >Сохранить</Button>
            </div>
        </Box >
    )
}