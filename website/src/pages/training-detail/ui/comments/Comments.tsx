import { useQuery, useQueryClient } from "react-query"
import { useEffect, useState } from "react";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { ICommentModel } from "../../../../shared/model/ICommentModel";
import CommentAdd from "./CommentAdd";
import CommentItem from "./CommentItem";
import { useAuthLog } from "../../../../shared/utils/useAuth";
import { ITraining } from "../../../../shared/model/ITraining";

interface CommentsProps {
  idTraining: string,
  training: ITraining,
  isAdmin?: boolean
}

export default function Comments({ idTraining, training, isAdmin = false }: CommentsProps) {
  const { user: USER } = useAuthLog();
  const { data, isLoading } = useQuery<ICommentModel[]>(['comments', idTraining], async () => await CommentPlanService.getAllPlanId(idTraining));
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
          userId: Number(USER.userId!),
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
      {
        isAdmin ? <></> :
          <CommentAdd
            content={content}
            onChange={(e) => setContent(e.target.value)}
            sentComment={sentComment}
          />
      }

      <div>
        {isLoading && <p>Загрузка комментариев...</p>}
        {data && data.length > 0 ? (
          data.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              idTraining={Number(idTraining)}
              queryClient={queryClient}
              isReply={!isAdmin}
              training={training}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p>Комментариев пока нет, но вы можете написать первыми</p>
        )}
      </div>
    </div>
  );
}
