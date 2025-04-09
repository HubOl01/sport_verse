import MyButton from "../../../../components/MyButton";
import MyTextField from "../../../../components/MyTextField";

interface Props {
    content: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sentComment: () => void;
    sentCancel?: () => void;
    isEdit?: boolean;
}

export default function CommentAdd({ content, onChange, sentComment, sentCancel, isEdit = false }: Props,) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <MyTextField
                label="Напишите комментарий"
                onChange={onChange}
                value={content}
                isLines={true}

            />
            <div className="flex space-x-2">
                {
                    sentCancel ?
                        <MyButton
                            onClick={sentCancel}
                            label={"Отменить"}
                            secondary
                            style={{ alignSelf: "flex-end", marginTop: "10px" }}
                        /> : <></>}
                <MyButton
                    onClick={sentComment}
                    label={isEdit ? "Изменить комментарий" : "Отправить комментарий"}
                    style={{ alignSelf: "flex-end", marginTop: "10px" }}
                />
            </div>
        </div>
    )
}
