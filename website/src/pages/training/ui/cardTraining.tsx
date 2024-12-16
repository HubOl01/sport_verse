import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";
import { useNavigate } from "react-router-dom";

interface CardTrainingProps {
    training: ITraining
}

export default function CardTraining({ training }: CardTrainingProps) {
    const navigate = useNavigate();
    return (
        <div className="mr-5 mt-5 ml-5"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Card onClick={() => navigate(`/training/${training.id}`)}
                sx={{
                    width: "800px",

                }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
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
