import React from "react";
import { Typography } from "@mui/material";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import CommentReply from "./CommentReply";
import { QueryClient } from "react-query";

interface CommentProps {
  comment: ICommentModel;
  idTraining: number;
  queryClient: QueryClient; // Замените на правильный тип, если есть
}

const CommentItem: React.FC<CommentProps> = ({ comment, idTraining, queryClient }) => {
  return (
    <div style={{ marginBottom: "10px", marginLeft: "20px" }}>
      {/* Отображение имени пользователя */}
      <Typography variant="body2" fontWeight={600}>
        @{comment.user?.username}
      </Typography>

      {/* Отображение содержимого комментария */}
      <Typography variant="body1">{comment.content}</Typography>

      {/* Кнопка для добавления ответа */}
      <CommentReply
        idTraining={idTraining}
        idComment={comment.id!}
        queryClient={queryClient}
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;