import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";

interface CardTrainingProps {
    training: ITraining
}

export default function CardTraining({ training }: CardTrainingProps) {
    return (
        <div className="mr-5 mt-5 ml-5">
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {training.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {training.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
