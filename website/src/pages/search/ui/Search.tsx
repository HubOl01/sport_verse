import { useQuery, useQueryClient } from "react-query"
import { UserService } from "../../../shared/api/User.service"
import { Avatar, Box, Chip, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import MyTextField from "../../../components/MyTextField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/utils/useAuth";
import MyButton from "../../../components/MyButton";
import { SubscriptionService } from "../../../shared/api/subscriptions.service";

export default function Search() {
    const queryClient = useQueryClient();
    const [searchStr, setSearchStr] = useState('');
    const { data } = useQuery('users', () => UserService.getAll());
    const navigate = useNavigate();
    const { user: USER } = useAuth();

    if (!USER?.token) {
        navigate("/login");
        return null;
    }

    const filteredUsers = data?.filter((user) =>
        user.username.toLowerCase().includes(searchStr.toLowerCase()) ||
        (user.profile?.name || "").toLowerCase().includes(searchStr.toLowerCase())
    );



    return (
        <Box

            sx={{
                position: 'relative', minHeight: '100vh', justifyContent: 'center', justifyItems: 'center', maxHeight: "80vh",
                overflowY: "auto",
                width: "100%",
            }}
        >
            <div className="flex m-2 w-screen max-w-screen-sm">
                <MyTextField
                    inputStyle={{
                        padding: 0,
                        margin: 0,
                        borderRadius: "25px",
                    }}
                    label={"Поиск по юзернейму или имени пользователя"}
                    onChange={(e) => { setSearchStr(e.target.value) }}
                    value={searchStr}
                    onClickClear={() => setSearchStr('')}
                    // onClickClear={setSearchStr('')}
                    isSearch />
            </div>
            {filteredUsers?.map((user) => {
                const isSubscribed =
                    Array.isArray(user.subscribers) &&
                    user.subscribers.some(
                        (subscriber) => subscriber.subscriberId === Number(USER.userId)
                    );
                const handleClickSubscription = async () => {
                    if (isSubscribed) {
                        await SubscriptionService.delete(
                            USER.userId!,
                            user.id!.toString()!
                        );
                    }
                    else {
                        await SubscriptionService.create({
                            subscriberId: Number(USER.userId)!,
                            subscribedToId: user.id!,
                        });
                    }
                    await queryClient.invalidateQueries(['users']);
                }
                return (<ListItem
                    className="mr-2 ml-2 w-screen max-w-screen-sm mb-5"
                    alignItems="flex-start"
                    sx={{
                        width: "100%"
                    }}
                    disablePadding
                    secondaryAction={USER.username !== user.username ? <MyButton
                        onClick={handleClickSubscription}
                        disabled={isSubscribed}
                        label={isSubscribed ? "Вы подписаны" : 'Подписаться'
                        }
                        secondary={isSubscribed}

                    /> : null}
                ><ListItemButton
                    onClick={() => { navigate(`/profile/${user.username}`) }}
                >
                        <ListItemAvatar>
                            <Avatar alt="avatar" src={user.profile?.url_avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <>
                                    {
                                        USER.username === user.username ?
                                            <>
                                                {user.profile?.name} (Вы)
                                            </>
                                            :
                                            <>
                                                {user.profile?.name}
                                            </>
                                    }
                                    <Chip label={user.profile?.role?.title} variant="outlined" size="small" sx={{
                                        marginLeft: "10px",
                                        fontSize: "12px",
                                    }} />
                                </>
                            }
                            secondary={<React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.secondary', display: 'inline' }}
                                >
                                    @{user.username}
                                </Typography>
                            </React.Fragment>}
                        />
                    </ListItemButton>

                    <Divider />
                </ListItem>)
            }
            )}</Box>
    )
}