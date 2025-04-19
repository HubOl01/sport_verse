import { Avatar, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { IAthleteInGroup } from "../../../shared/model/IAthleteInGroup";

interface dialogListProps {
    keepMounted: boolean;
    open: boolean;
    groupId: number;
    onClose: () => void;
}

export function DialogParticipantList(props: dialogListProps) {
    const { onClose, open, groupId, ...other } = props;
    // const queryClient = useQueryClient();
    const { data } = useQuery<ITrainingGroup>(["group", props.groupId], async () => await TrainingGroupService.get((props.groupId!).toString()), { enabled: !!props.groupId })
    const { user: USER } = useAuth();
    const navigate = useNavigate();

    if (!USER?.token) {
        navigate("/login");
        return null;
    }

    const handleClose = () => {
        onClose();
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
            >Участники группы
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
                    {Array.isArray(data?.athletes) && data?.athletes.length > 0 ?
                        data?.athletes.map((athlete: IAthleteInGroup) =>
                            <ListItem
                                key={athlete.id}
                                className="w-screen max-w-screen-sm mb-5"
                                alignItems="flex-start"
                                sx={{
                                    width: "100%"
                                }}
                                disablePadding

                            ><ListItemButton
                                onClick={() => {
                                    props.onClose();
                                    navigate(`/profile/${athlete.athlete?.username}`)
                                }}
                            >
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={athlete.athlete!.profile?.url_avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <>
                                                {
                                                    USER.username === athlete.athlete!.username ?
                                                        <>
                                                            {athlete.athlete!.profile?.name} (Вы)
                                                        </>
                                                        :
                                                        <>
                                                            {athlete.athlete!.profile?.name}
                                                        </>
                                                }
                                                <Chip label={athlete.athlete!.profile?.role?.title} variant="outlined" size="small" sx={{
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
                                                @{athlete.athlete!.username}
                                            </Typography>
                                        </React.Fragment>}
                                    />
                                </ListItemButton>

                                <Divider />
                            </ListItem>
                        )
                        : <p style={{
                            textAlign: "center",
                        }}>Нет участников группы</p>}

                </List>
            </DialogContent>
        </Dialog>
    );
}