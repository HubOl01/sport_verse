import { useQuery } from "react-query"
import { UserService } from "../../../shared/api/User.service"
import { Avatar, Box, Divider, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import MyTextField from "../../../components/MyTextField";

export default function Search() {
    const [searchStr, setSearchStr] = useState('');
    const { data } = useQuery('users', () => UserService.getAll());
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
                    label={"Поиск по юзернейму"}
                    onChange={(e) => { setSearchStr(e.target.value) }}
                    value={searchStr}
                    isSearch />
            </div>
            {data?.map((user) =>
                <><ListItemButton
                    className="mr-2 ml-2 w-screen max-w-screen-sm mb-5"
                    alignItems="flex-start" sx={{
                        width: "100%"
                    }}>
                    <ListItemAvatar>
                        <Avatar alt="avatar" src={user.profile?.url_avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.profile?.name}
                        secondary={<React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                @{user.username}
                            </Typography>
                        </React.Fragment>} />
                </ListItemButton>
                    <Divider />
                </>
                // <div key={user.id}>{user.profile?.name}</div>
            )}</Box>
    )
}