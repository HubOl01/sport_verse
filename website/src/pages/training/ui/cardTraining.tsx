import { Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";
import { useNavigate } from "react-router-dom";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { Favorite } from "@mui/icons-material";
import { ColorBackground } from "../../../shared/styles/colors";

interface CardTrainingProps {
    training: ITraining,
    isPrivateUser?: boolean,
    grid?: boolean,
    countLikes?: number,
    noMargin?: boolean
}

export default function CardTraining({ training, isPrivateUser, grid, countLikes, noMargin = false }: CardTrainingProps) {
    const navigate = useNavigate();
    return (
        <div className={noMargin ? 'mr-2 ml-5' : grid ? 'mr-5 ml-5' : "mr-5 mt-5 ml-5 mb-5"}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Card onClick={() => navigate(`/training/${training.id}`)}
                sx={{
                    // width: "800px",
                    width: "100%",
                    maxWidth: grid ? "100%" : "600px",
                    borderRadius: "30px"
                }}>
                <CardActionArea>
                    <CardContent sx={{
                        padding: countLikes ? grid ? "10px 15px" : "15px 20px" : null,
                    }}>
                        {isPrivateUser ? <></> : <Typography gutterBottom variant="body2" fontWeight={600}>
                            @{training.user?.username}
                        </Typography>}
                        {training.parentGroup === null || training.isPrivate === 0 ? <></> : <Typography variant="body2" fontWeight={600}>
                            Группа: {training.parentGroup?.title}
                        </Typography>}
                        {training.parentUser === null ? <></> : <Typography gutterBottom variant="body2" fontWeight={600}>
                            Автор: @{training.parentUser?.username}
                        </Typography>}
                        <Typography className="flex items-center" gutterBottom variant="h5" component="div">
                            {training.isPrivate === 1 ? <LockOutlineIcon sx={{
                                height: "20px",
                                marginRight: "5px",
                            }} /> : <></>}
                            {training.title}
                        </Typography>
                        <Chip className="mb-2" label={training.sportType!.title} size="small" />
                        <Typography variant="body2" color="text.secondary">
                            {training.description}
                        </Typography>
                        {
                            countLikes ?
                                <CardActions disableSpacing sx={{
                                    padding: 0,
                                    margin: 0
                                }} >
                                    <Favorite fontSize="small" sx={{
                                        color: ColorBackground,
                                    }} />
                                    <Typography variant="body2" sx={{
                                        marginLeft: "3px",
                                        color: ColorBackground
                                    }} fontWeight={600}>
                                        {countLikes?.toString()}
                                    </Typography>
                                </CardActions> :
                                <></>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
