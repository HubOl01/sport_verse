import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { ITraining } from "../../../shared/model/ITraining";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CardTrainingProps {
    training: ITraining
}

export default function CardTraining({ training }: CardTrainingProps) {
    const [like, setLike] = useState(false);
    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setLike(!like);
        console.log('Лайк!');
    };

    const handleCommentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log('Комментарий!');
    };

    const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log('Поделиться!');
    };
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
                    borderRadius: "30px"
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
                {/* <CardActions
                    sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}>
                    <IconButton aria-label="like" onClick={handleLikeClick}>
                        {like ? <ThumbUpOn sx={{
                            color: ColorBackground
                        }} /> : <ThumbUpOff />}
                    </IconButton>
                    <IconButton aria-label="comment" onClick={handleCommentClick}>
                        <BiCommentDetail />
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleShareClick}>
                        <PiShareFat />
                    </IconButton>
                </CardActions> */}
            </Card>
        </div>
    )
}
