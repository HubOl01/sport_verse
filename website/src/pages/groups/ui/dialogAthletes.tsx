import { Avatar, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { UserService } from "../../../shared/api/User.service";
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ISubscription } from "../../../shared/model/ISubscription";
import MyTextField from "../../../components/MyTextField";
import { IUser } from "../../../shared/model/IUser";

interface dialogListProps {
    keepMounted: boolean;
    open: boolean;
    valuesSelected: IUser[];
    setValuesSelected: React.Dispatch<React.SetStateAction<IUser[]>>;
    onClose: () => void;
}

export function DialogAthletesList(props: dialogListProps) {
    const { onClose, open, ...other } = props;
    const { user: USER } = useAuth();
    const navigate = useNavigate();
    const [searchAthlete, setSearchAthlete] = useState('');
    // const queryClient = useQueryClient();

    // Загрузка данных текущего пользователя и всех пользователей
    const { data } = useQuery(['user', USER.username], () => UserService.getUsername(USER.username!));
    const { data: dataUser } = useQuery('users', () => UserService.getAll());

    if (!USER?.token) {
        navigate("/login");
        return null;
    }

    // Фильтрация пользователей по строке поиска
    const filteredUsers = dataUser?.filter((user) =>
        user.username.toLowerCase().includes(searchAthlete.toLowerCase()) ||
        (user.profile?.name || "").toLowerCase().includes(searchAthlete.toLowerCase())
    );

    // Обработчик закрытия диалога
    const handleClose = () => {
        onClose();
    };

    // Функция для добавления участника
    const handleAddParticipant = (user: IUser) => {
        if (!props.valuesSelected.some(selectedUser => selectedUser.id === user.id)) {
            props.setValuesSelected([...props.valuesSelected, user]);
        }
        setSearchAthlete("");
        props.onClose();
    };
    const listData = Array.isArray(data) && data.length > 0 ? data!.subscribers
        .filter((subscription: ISubscription) => {
            const subscriber = subscription.subscriber!;
            return (
                !props.valuesSelected.some((selectedUser) => selectedUser.username === subscriber.username)
            );
        }) : [];

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%' } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="flex justify-between" sx={{ padding: 2 }}>
                Добавить участника
                <IconButton size="small" edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 0 }}>
                <List>
                    {/* Поле поиска */}
                    <div style={{ margin: "10px 20px" }}>
                        <MyTextField
                            label={"Найти участника"}
                            onChange={(e) => setSearchAthlete(e.target.value)}
                            value={searchAthlete}
                            isSearch={true}
                        />
                    </div>

                    {Array.isArray(filteredUsers) && filteredUsers.length > 0 && searchAthlete.length > 0 ? (
                        filteredUsers.map((user: IUser) => {
                            return (
                                USER.username !== user.username && props.valuesSelected.every((value) => value.username !== user.username) ? (
                                    <ListItem
                                        key={user.id}
                                        className="w-screen max-w-screen-sm mb-5"
                                        alignItems="flex-start"
                                        sx={{ width: "100%" }}
                                        disablePadding
                                    >
                                        <ListItemButton
                                            onClick={() => handleAddParticipant(user)} // Добавляем участника
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt="avatar" src={user.profile?.url_avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <>
                                                        {user.profile?.name}
                                                        <Chip
                                                            label={user.profile?.role?.title}
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
                                                        @{user.username}
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                        <Divider />
                                    </ListItem>
                                ) : null
                            );
                        })
                    ) : (
                        <></>
                    )}

                    {/* Список подписчиков */}
                    <Divider />
                    <Typography variant="h6" sx={{ margin: "0px 15px" }}>
                        Подписчики
                    </Typography>
                    {Array.isArray(listData) && listData.length > 0 ? (
                        listData.map((subscription: ISubscription) => {
                            const subscriber = subscription.subscriber!;
                            return (
                                <ListItem
                                    key={subscriber.id}
                                    className="w-screen max-w-screen-sm mb-5"
                                    alignItems="flex-start"
                                    sx={{ width: "100%" }}
                                    disablePadding
                                >
                                    <ListItemButton
                                        onClick={() => handleAddParticipant(subscriber)} // Добавляем участника
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="avatar" src={subscriber.profile?.url_avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {USER.username === subscriber.username ? (
                                                        <>
                                                            {subscriber.profile?.name} (Вы)
                                                        </>
                                                    ) : (
                                                        <>
                                                            {subscriber.profile?.name}
                                                        </>
                                                    )}
                                                    <Chip
                                                        label={subscriber.profile?.role?.title}
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
                                                    sx={{ color: "text.secondary", display: "inline" }}
                                                >
                                                    @{subscriber.username}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: "center" }}>Нет подписчиков</p>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}