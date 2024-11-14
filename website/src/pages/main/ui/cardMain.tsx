import { Card, CardContent, Typography } from "@mui/material";
import { quotes } from "../../../shared/data/quotes";

export default function CardMain() {
  const index = 0 + Math.round(Math.random() * (quotes.length - 0));
  return (
    <div className='mr-2 ml-2 w-1/2'>
      <div>
        <Card
          sx={{
            width: "100%",

          }}>
          {/* <CardActionArea> */}
          <CardContent>
            <Typography gutterBottom variant="h5" fontWeight={500} component="div">
              Цитата дня
            </Typography>

            <Typography variant="body1" fontStyle={'italic'} color="text.secondary">
              {quotes[index].quote}
            </Typography>
            <Typography variant="body2" textAlign={'end'} fontWeight={600} color="text.secondary">
              {quotes[index].author}
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
      </div >
    </div >
  )
}
