import React from "react";
import { Typography } from "@mui/material";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import CommentReply from "./CommentReply";
import { QueryClient } from "react-query";

interface CommentProps {
    comment: ICommentModel;
    idTraining: number;
    queryClient: QueryClient;
    isReply?: boolean;
    isAdmin?: boolean;
}

const CommentItem: React.FC<CommentProps> = ({ comment, idTraining, queryClient, isReply = true, isAdmin = false }) => {
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
                isEdit={isAdmin ? false : true}
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
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;