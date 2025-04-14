import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { itemsBar } from '../../data/itemsBar';
import { useAuth } from '../../utils/useAuth';


function indexBar() {
    for (let i = 0; i < itemsBar.length; i++) {
        if (itemsBar[i].link.includes(location.pathname)) {
            return i;
        }
    }
    return 0;
}

export default function LeftBar() {
    const [selectedIndex, setSelectedIndex] = React.useState(indexBar);
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user?.token) {
        navigate("/login");
        return null;
    }
    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
        navigate(itemsBar[index].id === 4 ? `${itemsBar[index].link}/${user.username}` : itemsBar[index].link)
    };


    return (
        <Box sx={{ width: '100%', }}>
            <List component="nav" aria-label="main mailbox folder">
                {itemsBar.map((item) =>
                    <div key={item.id}>
                        <ListItemButton
                            selected={selectedIndex === item.id}
                            onClick={() => handleListItemClick(item.id)}
                        >
                            <ListItemText sx={{
                                color: "white"
                            }} primary={item.title} />
                        </ListItemButton>

                    </div>
                )}

            </List>
        </Box>
    )
}
