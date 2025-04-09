import { useQuery, useQueryClient } from "react-query"
import { useEffect, useState } from "react";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import { Typography } from "@mui/material";
import CommentAdd from "./CommentAdd";
import CommentReply from "./CommentReply";
import CommentItem from "./CommentItem";

interface CommentsProps {
  idTraining: string
}

export default function Comments({ idTraining }: CommentsProps) {
  const { data, isLoading, error } = useQuery<ICommentModel[]>(['comments', idTraining], async () => await CommentPlanService.getAllPlanId(idTraining));
  // const {
  //   data: trainingData,
  //   isLoading,
  //   error
  // } = useQuery<ITraining>(['trainingDetail', id], () => TrainingService.get(id!));
  const [content, setContent] = useState("")
  const queryClient = useQueryClient();

  const sentComment = async () => {
    try {
      if (content.trim() !== "") {
        await CommentPlanService.create({
          content: content,
          userId: 1,
          trainingPlanId: Number(idTraining),
        });

        // Инвалидируем запрос для обновления данных
        queryClient.invalidateQueries(['comments', idTraining]);

        // Очищаем поле ввода (если необходимо)
        setContent("");
      } else {
        alert("Необходимо ввести текст");
      }

    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
      alert("Не удалось отправить комментарий.");
    }
  }


  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries(['comments', idTraining]);
    }
  });

  return (
    <div>
      {/* Форма для добавления нового комментария */}
      <CommentAdd
        content={content}
        onChange={(e) => setContent(e.target.value)}
        sentComment={sentComment}
      />

      {/* Отображение списка комментариев */}
      <div>
        {isLoading && <p>Загрузка комментариев...</p>}
        {data && data.length > 0 ? (
          data.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              idTraining={Number(idTraining)}
              queryClient={queryClient}
            />
          ))
        ) : (
          <p>Комментариев пока нет, но вы можете написать первыми</p>
        )}
      </div>
    </div>
  );
}
