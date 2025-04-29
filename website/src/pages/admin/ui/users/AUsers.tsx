import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../shared/utils/useAuth";
import { Box, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Chip, Typography, Divider } from "@mui/material";
import React from "react";
import MyButton from "../../../../components/MyButton";
import MyTextField from "../../../../components/MyTextField";
import { UserService } from "../../../../shared/api/User.service";

export default function AUsers() {
    const queryClient = useQueryClient();
    const [searchStr, setSearchStr] = useState('');
    const { data } = useQuery('users', () => UserService.getAll());
    const navigate = useNavigate();
    const { user: USER } = useAuth();


    const filteredUsers = data?.filter((user) =>
        user.username.toLowerCase().includes(searchStr.toLowerCase()) ||
        (user.profile?.name || "").toLowerCase().includes(searchStr.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("Вы уверены, что хотите удалить этого пользователя?");
        if (isConfirmed) {
            try {
                await UserService.delete(id.toString());
                queryClient.invalidateQueries('users');
            } catch (error) {
                console.error("Ошибка при удалении пользователя:", error);
                alert("Не удалось удалить пользователя. Попробуйте снова.");
            }
        }
    };


    return (
        <Box
            sx={{
                position: 'relative', justifyContent: 'center', justifyItems: 'center',
                width: "100%",
            }}
        >
            <>
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
                    return (<ListItem
                        key={user.id}
                        className="mr-2 ml-2 w-screen max-w-screen-sm"
                        alignItems="flex-start"
                        sx={{
                            width: "100%"
                        }}
                        disablePadding
                        secondaryAction={USER.username !== user.username ? <MyButton
                            onClick={() => handleDelete(user.id!)}
                            label={"Удалить"}
                            secondary
                            styleButton={{
                                color: 'red',
                                borderColor: 'red',
                                borderRadius: "10px",
                            }}

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
                )}
            </>
        </Box>
    )
}