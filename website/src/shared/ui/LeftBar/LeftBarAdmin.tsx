import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { itemsBarAdmin } from '../../data/itemsBarAdmin';


function indexBarAdmin() {
    for (let i = 0; i < itemsBarAdmin.length; i++) {
        if (itemsBarAdmin[i].link.includes(location.pathname)) {
            return i;
        }
    }
    return 0;
}

export default function LeftBarAdmin() {
    const [selectedIndex, setSelectedIndex] = React.useState(indexBarAdmin);
    const navigate = useNavigate();
    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
        navigate(itemsBarAdmin[index].link)
    };


    return (
        <Box sx={{ width: '100%', }}>
            <List component="nav" aria-label="main mailbox folder">
                {itemsBarAdmin.map((item) =>
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
