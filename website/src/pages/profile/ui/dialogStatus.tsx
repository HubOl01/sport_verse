import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { IStatusProfile } from "../../../shared/model/IStatusProfile";
import { StatusProfileService } from "../../../shared/api/StatusProfile.service";
import { ProfileService } from "../../../shared/api/Profile.service";
import { IProfile } from "../../../shared/model/IProfile";

interface dialogListProps {
    keepMounted: boolean;
    value: IStatusProfile;
    open: boolean;
    profile: IProfile;
    onClose: (status?: IStatusProfile) => void;
    onSelectStatus: (status: IStatusProfile) => void;
}

export function DialogStatusList(props: dialogListProps) {
    const { onClose, value: valueProp, open, onSelectStatus: onSelectExercise, ...other } = props;
    const [value, setValue] = useState(valueProp);
    const queryClient = useQueryClient();
    const { data } = useQuery(['statuses'], () => StatusProfileService.getAll()
    )

    // if (isLoading) return <p>Загрузка...</p>;
    // if (error) return <p >Произошла ошибка при загрузке данных.</p>;
    // console.log(data, error)

    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }

    const handleClose = () => {
        onClose(value);
    };

    const handleSelectExercise = async (statusProfile: IStatusProfile) => {
        onSelectExercise(statusProfile);
        await ProfileService.update(props.profile.id!, {
            statusId: statusProfile.id!,
            name: props.profile.name,
            url_avatar: props.profile.url_avatar,
            about: props.profile.about,
            roleId: props.profile.roleId,
            userId: props.profile.userId
        })
        queryClient.invalidateQueries('user');
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
            >Выберите статус

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
                        data.map((status: IStatusProfile) => (
                            <ListItem
                                key={status.id}
                                disablePadding

                            >
                                <ListItemButton onClick={() => handleSelectExercise(status)}>
                                    <ListItemAvatar sx={{
                                        fontSize: '26px',
                                    }}>
                                        {status.svg_image}
                                    </ListItemAvatar>
                                    <ListItemText id={status.title} primary={status.title} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <p>Нет статусов</p>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
}