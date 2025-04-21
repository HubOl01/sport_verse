import { Box, List, ListItemButton, ListItemText, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { itemsBarAdmin } from '../../data/itemsBarAdmin';
import { useAuth } from '../../utils/useAuth';
import { ColorBackground } from '../../styles/colors';

function getIndexBarAdmin(pathname: string, username?: string): number {
    const exactMatch = itemsBarAdmin.find(item => pathname === item.link);
    if (exactMatch) return exactMatch.id;

    let matchedId = -1;
    let maxMatchLength = 0;

    for (const item of itemsBarAdmin) {
        let basePath = item.link;

        if (item.id === 5 && username) {
            basePath = `${item.link}/${username}`;
        }

        const starts = pathname.startsWith(basePath);
        const validEnd = pathname === basePath || pathname.startsWith(basePath + "/");

        if (starts && validEnd && basePath.length > maxMatchLength) {
            maxMatchLength = basePath.length;
            matchedId = item.id;
        }
    }

    return matchedId;
}




export default function LeftBarAdmin() {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();


    const [selectedIndex, setSelectedIndex] = React.useState<number>(
        getIndexBarAdmin(location.pathname, user?.username!)
    );

    useEffect(() => {
        const index = getIndexBarAdmin(location.pathname, user?.username!);
        if (index !== -1) {
            setSelectedIndex(index);
        }
    }, [location.pathname, user?.username]);



    if (!user?.token) {
        navigate("/login");
        return null;
    }

    const handleListItemClick = (id: number) => {
        setSelectedIndex(id);
        const item = itemsBarAdmin.find((i) => i.id === id);
        if (!item) return;
        const path = item.id === 5 ? `${item.link}/${user.username}` : item.link;
        navigate(path);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <List component="nav" aria-label="main mailbox folders" sx={{ m: 0, p: 0 }}>
                {itemsBarAdmin.map((item) => (
                    <React.Fragment key={item.id}>
                        {item.id === 6 && (
                            <Divider
                                component="li"
                                sx={{ backgroundColor: "#ffffff54", margin: "8px 0" }}
                            />
                        )}
                        <ListItemButton
                            selected={selectedIndex === item.id}
                            onClick={() => handleListItemClick(item.id)}
                            sx={{
                                '&.Mui-selected': {
                                    bgcolor: ColorBackground,
                                    color: 'white',
                                    '& .MuiListItemText-primary': {
                                        color: 'white',
                                        fontWeight: 600,
                                    },
                                },
                                '&.Mui-selected:hover': {
                                    bgcolor: ColorBackground,
                                },
                                '&:hover': {
                                    bgcolor: '#ffffff10',
                                },
                            }}
                        >
                            <ListItemText
                                sx={{ color: "white" }}
                                primary={item.title}
                            />
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
