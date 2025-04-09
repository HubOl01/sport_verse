import { Button, Typography } from "@mui/material";
import CommentAdd from "./CommentAdd";
import { useState } from "react";
import { CommentPlanService } from "../../../../shared/api/commentPlan.service";
import { ColorBackground } from "../../../../shared/styles/colors";
import { QueryClient } from "react-query";

interface CommentReplyProps {
    idTraining: number;
    idComment: number;
    content: string;
    queryClient: QueryClient;
    isDelete?: boolean;
    isEdit?: boolean;
    isReply?: boolean;
}
export default function CommentReply(props: CommentReplyProps) {
    const [contentReply, setContentReply] = useState("")
    const [isReply, setReply] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const clickReplay = async () => {
        setReply(true)
    }
    const clickEdit = async () => {
        setEdit(true)
        setContentReply(props.content)
    }
    const clickCancel = async () => {
        setReply(false)
        setEdit(false)
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
    const sentEditReply = async () => {
        try {
            await CommentPlanService.update(
                props.idComment.toString(),
                {
                    content: contentReply,
                });

            props.queryClient.invalidateQueries(['comments', props.idTraining]);

            setContentReply("");
            clickCancel();
        } catch (error) {
            console.error("Ошибка при изменении ответа на комментарий:", error);
            alert("Не удалось изменить ответ на комментарий.");
        }
    }
    const deleteComment = async () => {
        try {
            await CommentPlanService.delete(
                props.idComment.toString());

            props.queryClient.invalidateQueries(['comments', props.idTraining]);

            setContentReply("");
            clickCancel();
        } catch (error) {
            console.error("Ошибка при изменении ответа на комментарий:", error);
            alert("Не удалось изменить ответ на комментарий.");
        }
    }
    return (
        <div className={!isReply && !isEdit ? "flex" : ""}>
            <div className="flex">
                {
                    props.isReply && !isReply ? <Button size="small" sx={{
                        padding: "0px",
                        marginRight: "10px",
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
                        <></>
                }
                {props.isEdit && !isEdit ? <Button size="small"
                    sx={{
                        marginRight: "10px",
                        padding: "0px",
                        color: ColorBackground,
                        textTransform: "none",
                        display: "flex",
                    }}
                    onClick={clickEdit}
                >
                    <Typography variant="body2">
                        Редактировать
                    </Typography>

                </Button> : <></>}

                {props.isDelete ? <Button size="small"
                    sx={{
                        padding: "0px",
                        color: "red",
                        textTransform: "none",
                        display: "flex",
                    }}
                    onClick={deleteComment}
                >
                    <Typography variant="body2">
                        Удалить
                    </Typography>

                </Button> : <></>}
            </div>
            {isReply || isEdit ? <div style={{ marginTop: "10px" }}>
                <CommentAdd content={contentReply} onChange={(e) => setContentReply(e.target.value)}
                    sentCancel={clickCancel}
                    sentComment={isEdit ? sentEditReply : sentReply}
                    isEdit={isEdit}
                />

            </div> : <></>}

        </div>


    )
}
