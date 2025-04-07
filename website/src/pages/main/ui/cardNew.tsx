import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { INewModel } from "../../../shared/model/INewModel";
import { useNavigate } from "react-router-dom";

interface NewProps {
    newModel: INewModel
}
export default function CardNew({ newModel }: NewProps) {
    const navigate = useNavigate();
    const formattedDateCreated = new Date(newModel.date!).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div key={newModel.id} className='mr-2 ml-2 w-screen max-w-screen-sm mb-5'>
            <div>
                <Card
                    sx={{
                        width: "100%",
                    }}
                >
                    <CardActionArea onClick={() => navigate(`/admin/news/${newModel.id}`)}>
                        {
                            newModel.image === undefined ?
                                <></> : <CardMedia
                                    component="img"
                                    // sx={{ height: "200px" }}
                                    // height="140"
                                    image={newModel.image}
                                />
                        }
                        <CardContent>
                            <Typography variant="h6" gutterBottom fontWeight={600} component="div" lineHeight={1.3}>
                                {newModel.title}
                            </Typography>

                            <Typography variant="body1" gutterBottom color="text.secondary" lineHeight={1.3}
                                sx={{ whiteSpace: "pre-line" }}
                            >
                                {newModel.description}
                            </Typography>
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
