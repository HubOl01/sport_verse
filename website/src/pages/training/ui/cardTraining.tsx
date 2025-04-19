import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";
import { useNavigate } from "react-router-dom";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';

interface CardTrainingProps {
    training: ITraining,
    isPrivateUser?: boolean,
}

export default function CardTraining({ training, isPrivateUser }: CardTrainingProps) {
    const navigate = useNavigate();
    return (
        <div className="mr-5 mt-5 ml-5 mb-5"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Card onClick={() => navigate(`/training/${training.id}`)}
                sx={{
                    // width: "800px",
                    width: "100%",
                    maxWidth: "800px",
                    borderRadius: "30px"
                }}>
                <CardActionArea>
                    <CardContent>
                        {isPrivateUser ? <></> : <Typography gutterBottom variant="body2" fontWeight={600}>
                            @{training.user?.username}
                        </Typography>}
                        <Typography className="flex items-center" gutterBottom variant="h5" component="div">
                            {training.isPrivate === 1 ? <LockOutlineIcon sx={{
                                height: "20px",
                                marginRight: "5px",
                            }} /> : <></>}
                            {training.title}
                        </Typography>
                        <Chip className="mb-2" label={training.sportType!.title} />
                        <Typography variant="body2" color="text.secondary">
                            {training.description}
                        </Typography>
                    </CardContent>

                </CardActionArea>
            </Card>
        </div>
    )
}
