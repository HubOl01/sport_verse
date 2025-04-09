import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ITraining } from "../../../../shared/model/ITraining";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";

interface CardTrainingProps {
    training: ITraining
}

export default function CardTrainingComments({ training }: CardTrainingProps) {
    const navigate = useNavigate();
    const { data } = useQuery(["commentsCount", training.id], () => CommentPlanService.getAllPlanIdCount(training.id!.toString()))
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['commentsCount', training.id]);
        }
    });

    return (
        <div className="mr-5 mt-5 ml-5 mb-5"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Card onClick={() => navigate(`/admin/comments/${training.id}`)}
                sx={{
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
                        <Typography sx={{ marginTop: "20px" }} variant="body2" fontWeight={600}>
                            Комментариев: {data}
                        </Typography>
                    </CardContent>

                </CardActionArea>
            </Card>
        </div>
    )
}
