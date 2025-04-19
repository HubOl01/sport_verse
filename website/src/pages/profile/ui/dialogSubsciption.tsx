import { Avatar, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import CloseIcon from '@mui/icons-material/Close';
import { UserService } from "../../../shared/api/User.service";
import { useAuth } from "../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";
import MyButton from "../../../components/MyButton";
import React from "react";
import { SubscriptionService } from "../../../shared/api/subscriptions.service";
import { ISubscription } from "../../../shared/model/ISubscription";

interface dialogListProps {
    keepMounted: boolean;
    open: boolean;
    userId: number;
    username: string;
    isSubscribers: boolean;
    onClose: () => void;
}

export function DialogSubscriptionList(props: dialogListProps) {
    const { onClose, open, isSubscribers, userId, ...other } = props;
    const queryClient = useQueryClient();
    const { data } = useQuery(['user', props.username], () => UserService.getUsername(props.username))
    const { user: USER } = useAuth();
    const navigate = useNavigate();

    const useSubscribed = (subscription: ISubscription): boolean => {
        return (
            Array.isArray(subscription.subscriber?.subscribers) &&
            subscription.subscriber?.subscribers.some(
                (subscriber) => subscriber.subscriberId === Number(USER.userId)
            )
        );
    };
    const useSubscribed2 = (subscription: ISubscription): boolean => {
        return (
            Array.isArray(subscription.subscribedTo?.subscribers) &&
            subscription.subscribedTo?.subscribers.some(
                (subscriber) => subscriber.subscriberId === Number(USER.userId)
            )
        );
    };


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
            >{props.isSubscribers ? "Подписчики" : "Подписки"}

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
                    {props.isSubscribers ? Array.isArray(data?.subscribers) && data.subscribers.length > 0 ? (
                        data.subscribers.map((subscription: ISubscription) => {
                            const isSubscribed = useSubscribed(subscription);
                            const handleClickSubscription = async () => {
                                if (isSubscribed) {
                                    await SubscriptionService.delete(
                                        USER.userId!,
                                        subscription.subscriber!.id!.toString()!,
                                    );
                                }
                                else {
                                    await SubscriptionService.create({
                                        subscriberId:
                                            Number(USER.userId)!,
                                        subscribedToId:
                                            subscription.subscriber!.id!,
                                    });
                                }
                                await queryClient.invalidateQueries(['users']);
                                await queryClient.invalidateQueries(['user', props.username]);
                            }
                            return (
                                <ListItem
                                    key={subscription.id}
                                    className="w-screen max-w-screen-sm mb-5"
                                    alignItems="flex-start"
                                    sx={{
                                        width: "100%"
                                    }}
                                    disablePadding
                                    secondaryAction={USER.username !== subscription.subscriber!.username ? <MyButton
                                        onClick={handleClickSubscription}
                                        label={isSubscribed ? "Вы подписаны" : 'Подписаться'
                                        }
                                        secondary={isSubscribed}

                                    /> : null}
                                ><ListItemButton
                                    onClick={() => {
                                        props.onClose();
                                        navigate(`/profile/${subscription.subscriber!.username}`)
                                    }}
                                >
                                        <ListItemAvatar>
                                            <Avatar alt="avatar" src={subscription.subscriber!.profile?.url_avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {
                                                        USER.username === subscription.subscriber!.username ?
                                                            <>
                                                                {subscription.subscriber!.profile?.name} (Вы)
                                                            </>
                                                            :
                                                            <>
                                                                {subscription.subscriber!.profile?.name}
                                                            </>
                                                    }
                                                    <Chip label={subscription.subscriber!.profile?.role?.title} variant="outlined" size="small" sx={{
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
                                                    @{subscription.subscriber!.username}
                                                </Typography>
                                            </React.Fragment>}
                                        />
                                    </ListItemButton>

                                    <Divider />
                                </ListItem>
                            )
                        }
                        )
                    ) : (
                        <p style={{
                            textAlign: "center",
                        }}>Нет подписчиков</p>
                    ) : Array.isArray(data?.subscriptions) && data.subscriptions.length > 0 ? (
                        data.subscriptions.map((subscription: ISubscription) => {
                            const isSubscribed = useSubscribed2(subscription);
                            const handleClickSubscription = async () => {
                                if (isSubscribed) {
                                    await SubscriptionService.delete(
                                        USER.userId!,
                                        subscription.subscribedTo!.id!.toString()!
                                    );
                                }
                                else {
                                    await SubscriptionService.create({
                                        subscriberId: Number(USER.userId)!,
                                        subscribedToId: subscription.subscribedTo!.id!,
                                    });
                                }
                                await queryClient.invalidateQueries(['users']);
                                await queryClient.invalidateQueries(['user', props.username]);
                            }
                            return (
                                <ListItem
                                    key={subscription.id}
                                    className="w-screen max-w-screen-sm mb-5"
                                    alignItems="flex-start"
                                    sx={{
                                        width: "100%"
                                    }}
                                    disablePadding
                                    secondaryAction={USER.username !== subscription.subscribedTo!.username ? <MyButton
                                        onClick={handleClickSubscription}
                                        // disabled={isSubscribed}
                                        label={isSubscribed ? "Вы подписаны" : 'Подписаться'
                                        }
                                        secondary={isSubscribed}

                                    /> : null}
                                ><ListItemButton
                                    onClick={() => {
                                        props.onClose();
                                        navigate(`/profile/${subscription.subscribedTo!.username}`)
                                    }}
                                >
                                        <ListItemAvatar>
                                            <Avatar alt="avatar" src={subscription.subscribedTo!.profile?.url_avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {
                                                        USER.username === subscription.subscribedTo!.username ?
                                                            <></>
                                                            :
                                                            <>
                                                                {subscription.subscribedTo!.profile?.name}
                                                            </>
                                                    }
                                                    <Chip label={subscription.subscribedTo!.profile?.role?.title} variant="outlined" size="small" sx={{
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
                                                    @{subscription.subscribedTo!.username}
                                                </Typography>
                                            </React.Fragment>}
                                        />
                                    </ListItemButton>

                                    <Divider />
                                </ListItem>
                            )
                        }
                        )
                    ) : (
                        <p style={{
                            textAlign: "center",
                        }}>Нет подписок</p>
                    )
                    }

                </List>
            </DialogContent>
        </Dialog>
    );
}