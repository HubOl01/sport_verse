import { AppBar, Avatar, Box, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MyButton from "../../../components/MyButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import MyTextField from "../../../components/MyTextField";
import { useState } from "react";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { DialogAthletesList } from "./dialogAthletes";
import { username } from '../../../shared/data/user';
import { IUser } from "../../../shared/model/IUser";
import { data } from "react-router-dom";
import { ISubscription } from "../../../shared/model/ISubscription";
import CloseIcon from '@mui/icons-material/Close';

interface GroupEditProps {
    onClose: () => void;
    trainingGroup?: ITrainingGroup;

}
export default function GroupEdit(props: GroupEditProps) {
    const [titleGroup, setTitleGroup] = useState<string>('')
    const [descGroup, setDescGroup] = useState<string>('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [athletes, setAthletes] = useState<IUser[]>([])



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
                    {/* <IconButton
            edge="end"
            sx={{ ml: 2 }}
            onClick={() => setEdit(!edit)}
          >
            <EditIcon />
          </IconButton> */}
                    {props.trainingGroup ? <IconButton
                        edge="end"
                        sx={{ ml: 2, color: "red" }}
                        onClick={() => { }}
                    >
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
        </Box >
    )
}