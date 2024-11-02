import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function CardTraining() {
    return (
        <div className="mr-5 mt-5 ml-5">
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
