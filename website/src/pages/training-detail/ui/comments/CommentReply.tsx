import { Button, Typography } from "@mui/material";
import CommentAdd from "./CommentAdd";
import { useState } from "react";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { ColorBackground } from "../../../../shared/styles/colors";
import { QueryClient } from "react-query";

interface CommentReplyProps {
    idTraining: number;
    idComment: number;
    queryClient: QueryClient;
}
export default function CommentReply(props: CommentReplyProps) {
    const [contentReply, setContentReply] = useState("")
    const [isReply, setReply] = useState(false)
    const clickReplay = async () => {
        setReply(true)
    }
    const clickCancel = async () => {
        setReply(false)
    }
    const sentReply = async () => {
        try {
            // Создаем новый комментарий
            await CommentPlanService.create({
                content: contentReply,
                userId: 1,
                trainingPlanId: props.idTraining,
                parentCommentId: props.idComment,
            });

            // Инвалидируем запрос для обновления данных
            props.queryClient.invalidateQueries(['comments', props.idTraining]);

            // Очищаем поле ввода (если необходимо)
            setContentReply("");
            clickCancel();
        } catch (error) {
            console.error("Ошибка при отправке ответа на комментарий:", error);
            alert("Не удалось отправить ответ на комментарий.");
        }
    }
    return (
        !isReply ? <Button size="small" sx={{
            padding: "0px",
            color: ColorBackground,
            textTransform: "none",
            display: "flex",
        }}
            onClick={clickReplay}
        >
            <Typography variant="body2">
                Ответить
            </Typography>

        </Button>
            :
            <div style={{ marginTop: "10px" }}>
                <CommentAdd content={contentReply} onChange={(e) => setContentReply(e.target.value)}
                    sentCancel={clickCancel}
                    sentComment={sentReply} />

            </div>


    )
}
