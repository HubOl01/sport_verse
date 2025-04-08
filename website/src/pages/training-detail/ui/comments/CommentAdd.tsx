import MyButton from "../../../../components/MyButton";
import MyTextField from "../../../../components/MyTextField";

interface Props {
    content: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sentComment: () => void;
    sentCancel?: () => void;
}

export default function CommentAdd({ content, onChange, sentComment, sentCancel }: Props,) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <MyTextField
                label="Комментарий"
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
                    label={"Отправить комментарий"}
                    style={{ alignSelf: "flex-end", marginTop: "10px" }}
                />
            </div>
        </div>
    )
}
