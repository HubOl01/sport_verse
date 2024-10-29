import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { itemsBar } from '../../data/itemsBar';


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
    const navigate = useNavigate();
    const handleListItemClick = (
        index: number,
    ) => {
        setSelectedIndex(index);
        navigate(itemsBar[index].link)
    };


    return (
        <Box sx={{ width: '100%', }}>
            <List component="nav" aria-label="main mailbox folder">
                {itemsBar.map((item) =>
                    <>
                        <ListItemButton
                            selected={selectedIndex === item.id}
                            onClick={() => handleListItemClick(item.id)}
                        >
                            <ListItemText primary={item.title} />
                        </ListItemButton>

                    </>
                )}

            </List>
        </Box>
    )
}
