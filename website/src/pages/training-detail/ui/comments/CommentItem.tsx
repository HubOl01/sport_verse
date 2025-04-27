import React from "react";
import { Avatar, Typography } from "@mui/material";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import CommentReply from "./CommentReply";
import { QueryClient } from "react-query";
import { ColorBackground } from "../../../../shared/styles/colors";
import { ITraining } from "../../../../shared/model/ITraining";
import { useAuthLog } from "../../../../shared/utils/useAuth";
import { useNavigate } from "react-router-dom";

interface CommentProps {
    comment: ICommentModel;
    idTraining: number;
    training: ITraining;
    queryClient: QueryClient;
    isReply?: boolean;
    isAdmin?: boolean;
}

const CommentItem: React.FC<CommentProps> = ({ comment, idTraining, training, queryClient, isReply = true, isAdmin = false }) => {
    const { user: USER } = useAuthLog();
    const navigate = useNavigate();
    return (
        <div style={{ marginBottom: "10px", marginLeft: "20px" }}>
            {/* Отображение имени пользователя */}
            <div className="flex items-start gap-2">
                <Avatar
                    alt={comment.user?.username || "User"}
                    src={comment.user?.profile?.url_avatar || undefined}
                    sx={{
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                    }}
                    onClick={() => navigate(`/profile/${comment.user?.username}`)}
                />
                <div className="">
                    <div className="flex gap-2">
                        <Typography variant="body2"
                            sx={{
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(`/profile/${comment.user?.username}`)}
                        >
                            @{comment.user?.username}
                        </Typography>
                        {training.user?.username === comment.user?.username &&
                            <Typography variant="body2" fontWeight={600} sx={{
                                color: ColorBackground
                            }}>
                                Автор
                            </Typography>
                        }
                    </div>

                    {/* Отображение содержимого комментария */}
                    <Typography variant="body1">{comment.content}</Typography>

                    <CommentReply
                        idTraining={idTraining}
                        idComment={comment.id!}
                        comment={comment}
                        queryClient={queryClient}
                        isDelete={isAdmin || USER.username === comment.user?.username ? true : false}
                        content={comment.content}
                        isEdit={isAdmin || USER.username !== comment.user?.username ? false : true}
                        isReply={isReply}
                    />


                    {/* Рекурсивное отображение replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div style={{ marginLeft: "20px" }}>
                            {comment.replies.map((reply) => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    idTraining={idTraining}
                                    queryClient={queryClient}
                                    isReply={false}
                                    training={training}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentItem;