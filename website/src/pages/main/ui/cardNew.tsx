import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { INewModel } from "../../../shared/model/INewModel";
import { useNavigate } from "react-router-dom";
import { ColorBackground } from "../../../shared/styles/colors";
import { Roles } from "../../../shared/data/roles";
import { useAuth } from "../../../shared/utils/useAuth";

interface NewProps {
    newModel: INewModel,
    grid?: boolean
    isClick?: boolean
}
export default function CardNew({ newModel, grid, isClick = true }: NewProps) {
    const { user: USER } = useAuth();
    const navigate = useNavigate();
    const formattedDateCreated = new Date(newModel.date!).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div key={newModel.id} className={grid ? '' : 'mr-2 ml-2 w-screen max-w-screen-sm mb-5'}>
            <div>
                <Card
                    sx={{
                        width: "100%",
                    }}
                >
                    <CardActionArea onClick={isClick ? (() => navigate(grid ? `/news/${newModel.id}` : USER.statusUser === Roles.ADMIN ? `/admin/news/${newModel.id}` : `/news/${newModel.id}`)) : undefined}
                        sx={{
                            cursor: isClick ? "pointer" : "default",
                            pointerEvents: isClick ? "auto" : "none",
                        }}
                    >
                        {
                            newModel.image === undefined ?
                                <></> : <CardMedia
                                    component="img"
                                    image={newModel.image}
                                />
                        }
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600} component="div" lineHeight={1.3}>
                                {newModel.title}
                            </Typography>

                            {/* <Typography variant="body1" gutterBottom color="text.secondary" lineHeight={1.3} 
                                sx={{ whiteSpace: "pre-line", maxLines: grid ? "1" : null, maxHeight: 100 }}
                            >
                                {newModel.description}
                            </Typography> */}
                            <Typography
                                variant="body1"
                                gutterBottom
                                color="text.secondary"
                                lineHeight={1.3}
                                sx={grid ? {
                                    whiteSpace: "pre-line",
                                    display: "-webkit-box", // Для работы line-clamp
                                    WebkitBoxOrient: "vertical", // Вертикальное расположение текста
                                    overflow: "hidden", // Скрываем лишний текст
                                    textOverflow: "ellipsis", // Добавляем многоточие
                                    WebkitLineClamp: 4, // Ограничение в 4 строки
                                    maxHeight: "calc(1.3em * 4)", // Максимальная высота для 4 строк
                                    position: "relative", // Для позиционирования "Подробнее"
                                } : { whiteSpace: "pre-line", }}
                            >
                                {newModel.description}
                            </Typography>
                            {grid ? <div
                                style={{
                                    color: ColorBackground,
                                    fontWeight: "bold",
                                    textDecoration: "none",
                                }}
                            >
                                Подробнее
                            </div> : <></>}
                            <Typography variant="body2" color="text.secondary" textAlign={'end'}>
                                {formattedDateCreated}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div >
        </div >
    )
}
