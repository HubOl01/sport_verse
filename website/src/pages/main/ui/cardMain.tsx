import { Card, CardContent, Typography } from "@mui/material";
import { quotes } from "../../../shared/data/quotes";
import { useSmallScreen } from "../../../shared/utils/displaySizes";

export default function CardMain() {
  const index = 0 + Math.round(Math.random() * (quotes.length - 0));
  const isSmallScreen = useSmallScreen();
  return (
    <div className={`${isSmallScreen ? 'mb-4' : 'mr-2 w-1/2'}`}>
      <div>
        <Card
          sx={{
            width: "100%",

          }}>
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
        </Card>
      </div >
    </div >
  )
}
