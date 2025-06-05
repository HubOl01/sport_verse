import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ITraining } from "../../../../shared/model/ITraining";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { LikeTrainingService } from "../../../../shared/api/likeTraining.service";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';

interface CardTrainingProps {
    training: ITraining,
    isLikes?: boolean,
    isDelete?: boolean,
}

export default function CardTrainingAdmin({ training, isLikes = false, isDelete = false }: CardTrainingProps) {
    const navigate = useNavigate();
    const { data: commentsCount } = useQuery(["commentsCount", training.id], () => CommentPlanService.getAllPlanIdCount(training.id!.toString()))
    const { data: likesCount } = useQuery(["likesCount", training.id], () => LikeTrainingService.getCount(training.id!.toString()))
    const queryClient = useQueryClient();

    useEffect(() => {
        if (commentsCount) {
            queryClient.invalidateQueries(['commentsCount', training.id]);
        }
        if (likesCount) {
            queryClient.invalidateQueries(['likesCount', training.id]);
        }
    });

    return (
        <div className="mr-5 mt-5 ml-5 mb-5"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Card onClick={() => isDelete ? navigate(`/admin/training/${training.id}`) : navigate(`/admin/comments/${training.id}`)}
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "30px"
                }}>
                <CardActionArea>
                    <CardContent>
                        <div className="flex items-center" style={{ marginBottom: "10px" }}>
                            <Typography variant="body2" fontWeight={600}>
                                @{training.user?.username}
                            </Typography>
                            {training.isPrivate === 1 ? <LockOutlineIcon sx={{
                                height: "15px",
                            }} /> : <></>}
                        </div>
                        {training.parentGroup === null || training.isPrivate === 0 ? <></> : <Typography variant="body2" fontWeight={600}>
                            Группа: {training.parentGroup?.title}
                        </Typography>}
                        {training.parentUser === null ? <></> : <Typography gutterBottom variant="body2" fontWeight={600}>
                            Оригинальный автор: @{training.parentUser?.username}
                        </Typography>}
                        {/* <div className="flex items-center" style={{ marginBottom: "10px" }}>
                            <Typography variant="body2" fontWeight={600}>
                                @{training.user?.username}
                            </Typography>
                            {training.isPrivate === 1 ? <LockOutlineIcon sx={{
                                height: "15px",
                            }} /> : <></>}
                        </div> */}
                        <Typography gutterBottom variant="h5" component="div">
                            {training.title}
                        </Typography>
                        <Chip className="mb-2" label={training.sportType!.title} size="small" />
                        <Typography variant="body2" color="text.secondary">
                            {training.description}
                        </Typography>
                        {
                            training.isPrivate === 1 ? <></> : <div className="flex">
                                {
                                    isLikes ?
                                        <Typography sx={{ marginTop: "10px", marginRight: "20px" }} variant="body2" fontWeight={600}>
                                            Лайков: {likesCount}
                                        </Typography> : <></>
                                }
                                <Typography sx={{ marginTop: "10px" }} variant="body2" fontWeight={600}>
                                    Комментариев: {commentsCount}
                                </Typography>

                            </div>
                        }

                    </CardContent>

                </CardActionArea>
            </Card>
        </div>
    )
}
