import { Card, CardContent, Typography } from "@mui/material";
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
                    }}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" fontWeight={600} component="div">
                            {newModel.title}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
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
