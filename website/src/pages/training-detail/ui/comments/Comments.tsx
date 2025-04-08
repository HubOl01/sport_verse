import { useQuery, useQueryClient } from "react-query"
import { useState } from "react";
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


  // useEffect(() => {
  //   if (data) {
  //      data = useQuery<ICommentModel[]>(['comments', idTraining], async () => await CommentPlanService.getAllPlanId(idTraining));
  //     // console.log(data);
  //   }
  // });
  // return (
  //   <div>
  //     <CommentAdd content={content} onChange={(e) => setContent(e.target.value)} sentComment={sentComment} />
  //     <>
  //       {data && data.length > 0 ? (
  //         data.map((el) => (
  //           <div style={{
  //             marginBottom: "10px",
  //             width: "100%",
  //           }}>
  //             <Typography sx={{
  //               // marginBottom: "3px",
  //             }} variant="body2" fontWeight={600}>
  //               @{el.user!.username}

  //             </Typography>
  //             <Typography variant="body1">
  //               {el.content}
  //             </Typography>
  //             <CommentReply idTraining={Number(idTraining)} idComment={el.id!} queryClient={queryClient} />
  //             {el.replies &&
  //               el.replies!.length > 0 ? (
  //               el.replies!.map((el1) => (
  //                 <div style={{
  //                   marginBottom: "10px",
  //                   width: "100%",
  //                 }}>
  //                   <Typography sx={{
  //                     // marginBottom: "3px",
  //                   }} variant="body2" fontWeight={600}>
  //                     @{el1.user!.username}

  //                   </Typography>
  //                   <Typography variant="body1">
  //                     {el1.content}
  //                   </Typography>
  //                   <CommentReply idTraining={Number(idTraining)} idComment={el1.id!} queryClient={queryClient} />
  //                 </div>
  //               )))
  //               : <></>
  //             }
  //           </div>
  //         ))
  //       ) : (
  //         <p>Комментариев пока нет, но вы можете написать первыми</p>
  //       )}

  //     </>
  //   </div>
  // )
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
        {/* {error && <p>Ошибка загрузки комментариев</p>} */}
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
