import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { RoleProfileService } from "../../../shared/api/roleProfile.service";
import { IRoleProfile } from "../../../shared/model/IRoleProfile";

interface dialogListProps {
    keepMounted: boolean;
    value: IRoleProfile;
    open: boolean;
    onClose: (status?: IRoleProfile) => void;
    onSelect: (status: IRoleProfile) => void;
}

export function DialogRoleList(props: dialogListProps) {
    const { onClose, value: valueProp, open, onSelect: onSelectExercise, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const { data } = useQuery(['roles'], () => RoleProfileService.getAll()
    )

    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }

    const handleClose = () => {
        onClose(value);
    };

    const handleSelectExercise = async (roleProfile: IRoleProfile) => {
        onSelectExercise(roleProfile);
        handleClose();
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="flex justify-between"
                sx={{ padding: 2 }}
            >Выберите роль
                <IconButton
                    size="small"
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ padding: 0 }}>
                <List>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((roles: IRoleProfile) => (
                            <ListItem
                                key={roles.id}
                                disablePadding

                            >
                                <ListItemButton onClick={() => handleSelectExercise(roles)}>
                                    <ListItemText id={roles.title} primary={roles.title} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <p>Нет ролей</p>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}