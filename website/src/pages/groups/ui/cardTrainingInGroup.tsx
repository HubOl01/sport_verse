import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";
import { LockOutlined } from "@mui/icons-material";

interface CardTrainingProps {
    training: ITraining,
    onClick?: () => void,
    isContent?: boolean
    isDialog?: boolean
}

export default function CardTrainingInGroup({ training, onClick, isContent = false, isDialog = false }: CardTrainingProps) {
    const formattedDateCreated = new Date(training.date_created!).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
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

                        {!isDialog ?
                            <Typography className="flex items-center" gutterBottom variant="h6" component="div">
                                {training.title}
                            </Typography>
                            :
                            <Typography className="flex items-center" gutterBottom variant="h6" component="div">
                                {training.isPrivate === 1 ? <LockOutlined sx={{
                                    height: "20px",
                                    marginRight: "5px",
                                }} /> : <></>}
                                {training.title}
                            </Typography>
                        }
                        <Chip className="mb-2" label={training.sportType!.title} size="small" />
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {training.description}
                        </Typography>
                        {isDialog && <Typography variant="body2" color="text.secondary" textAlign={"right"} sx={{
                            marginTop: "10px"
                        }}>
                            {formattedDateCreated}
                        </Typography>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
