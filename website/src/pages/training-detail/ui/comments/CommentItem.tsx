import React from "react";
import { Button, Typography } from "@mui/material";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import CommentReply from "./CommentReply";
import { QueryClient } from "react-query";
import { ColorBackground } from "../../../../shared/styles/colors";

interface CommentProps {
    comment: ICommentModel;
    idTraining: number;
    queryClient: QueryClient; // Замените на правильный тип, если есть
    isReply?: boolean;
}

const CommentItem: React.FC<CommentProps> = ({ comment, idTraining, queryClient, isReply = true }) => {
    return (
        <div style={{ marginBottom: "10px", marginLeft: "20px" }}>
            {/* Отображение имени пользователя */}
            <Typography variant="body2" fontWeight={600}>
                @{comment.user?.username}
            </Typography>

            {/* Отображение содержимого комментария */}
            <Typography variant="body1">{comment.content}</Typography>

            <CommentReply
                idTraining={idTraining}
                idComment={comment.id!}
                queryClient={queryClient}
                isDelete={true}
                content={comment.content}
                isEdit={true}
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;