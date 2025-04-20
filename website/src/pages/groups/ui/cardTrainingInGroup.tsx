import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";

interface CardTrainingProps {
    training: ITraining,
    onClick?: () => void,
    isContent?: boolean
}

export default function CardTrainingInGroup({ training, onClick, isContent = false }: CardTrainingProps) {
    return (
        <div className={isContent ? '' : 'mr-2 ml-2'}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
            <Card onClick={onClick}
                sx={{
                    // width: "800px",
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: isContent ? "20px" : "30px"
                }}>
                <CardActionArea>
                    <CardContent sx={{
                        padding: "10px 15px",
                        // margin: 0
                    }}>
                        <Typography className="flex items-center" gutterBottom variant="h6" component="div">
                            {training.title}
                        </Typography>
                        <Chip className="mb-2" label={training.sportType!.title} size="small" />
                        <Typography variant="body2" color="text.secondary">
                            {training.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
