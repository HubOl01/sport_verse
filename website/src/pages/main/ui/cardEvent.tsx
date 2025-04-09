import { Card, CardContent, Typography } from "@mui/material";

export default function CardEvent() {
  return (
    <div className='ml-2 w-1/2'>
      <div>
        <Card
          sx={{
            width: "100%",

          }}>
          <CardContent>
            <Typography variant="caption" sx={{ color: 'gray', fontStyle: "italic", display: 'block', height: "18px", textAlign: "right", }} >
              Событие
            </Typography>
            <Typography variant="h6" color="textPrimary">
              Кубок Первого канала 2024
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Ежегодный турнир по хоккею с шайбой, который проходит с 12 по 15 декабря в Санкт-Петербурге на «СКА Арена»
            </Typography>
          </CardContent>
        </Card>
      </div >
    </div >
  )
}
