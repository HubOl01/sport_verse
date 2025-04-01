import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { NewModel } from "../../../shared/model/newModel";

interface NewProps {
    newModel: NewModel
}
export default function CardNew({ newModel }: NewProps) {
    return (
        <div key={newModel.id} className='mr-1 ml-1'>
            <div>
                <Card
                    sx={{
                        width: "100%",
                    }}>{
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

                        <Typography variant="body1" gutterBottom color="text.secondary" lineHeight={1.3}>
                            {newModel.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign={'end'}>
                            {newModel.date}
                        </Typography>
                    </CardContent>
                </Card>
            </div >
        </div >
    )
}
