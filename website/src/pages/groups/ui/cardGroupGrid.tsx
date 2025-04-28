import { Avatar, AvatarGroup, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import { useNavigate } from "react-router-dom";


interface ItemProps {
    item: ITrainingGroup
}
export default function CardGroupGrid({item} :ItemProps) {
    const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/group/${item.id}`)}
    sx={{
      width: "100%",
      borderRadius: "30px"
    }}>
    <CardActionArea>
      <CardContent sx={{ pb: 0, mb: 0 }}>
        <Typography gutterBottom variant="caption" fontWeight={600}>
          Автор: {item.trainer?.profile?.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.desc}
        </Typography>
        <Chip className="mt-2 mb-1" label={item.sportType?.title} size="small" />
      </CardContent>
      <CardActions disableSpacing>
        <AvatarGroup
          total={item.athletes?.length}
          sx={{
            '& .MuiAvatarGroup-avatar': {
              width: 32,
              height: 32,
              fontSize: 14,
            },
          }}
          renderSurplus={(surplus) => <span
          >
            +{surplus}
          </span>}
          max={8}
        >
          {item.athletes?.map((athlete) => (
            <Avatar
              key={athlete.athlete!.id}
              alt={athlete.athlete!.profile?.name}
              src={athlete.athlete!.profile?.url_avatar}
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
              }}
            />
          ))}
        </AvatarGroup>
      </CardActions>
    </CardActionArea>
  </Card>
  )
}

{/* <Card onClick={() => navigate(`/group/${item.id}`)}
sx={{
  width: "100%",
  borderRadius: "30px"
}}>
<CardActionArea>
  <CardContent sx={{ pb: 0, mb: 0 }}>
    <Typography gutterBottom variant="caption" fontWeight={600}>
      Автор: {item.trainer?.profile?.name}
    </Typography>
    <Typography gutterBottom variant="h5" component="div">
      {item.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {item.desc}
    </Typography>
    <Chip className="mt-2 mb-1" label={item.sportType?.title} size="small" />
  </CardContent>
  <CardActions disableSpacing>
    <AvatarGroup
      total={item.athletes?.length}
      sx={{
        '& .MuiAvatarGroup-avatar': {
          width: 32,
          height: 32,
          fontSize: 14,
        },
      }}
      renderSurplus={(surplus) => <span
      >
        +{surplus}
      </span>}
      max={8}
    >
      {item.athletes?.map((athlete) => (
        <Avatar
          key={athlete.athlete!.id}
          alt={athlete.athlete!.profile?.name}
          src={athlete.athlete!.profile?.url_avatar}
          sx={{
            width: 32,
            height: 32,
            fontSize: 14,
          }}
        />
      ))}
    </AvatarGroup>
  </CardActions>
</CardActionArea>
</Card> */}