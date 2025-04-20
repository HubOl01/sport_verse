import { Avatar, AvatarGroup, Box, Card, CardActionArea, CardActions, CardContent, Chip, Grid2, Typography } from "@mui/material";
import MyButton from "../../../components/MyButton";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { useState } from "react";
import MyTextField from "../../../components/MyTextField";
import { useNavigate } from "react-router-dom";
import GroupEdit from './GroupEdit';

export default function TrainingGroups() {
  const { data } = useQuery('groups', () => TrainingGroupService.getAll())
  const [search, setSearch] = useState("")
  const { data: TrainingGroupsSearch } = useQuery(
    ['groups', search],
    () => TrainingGroupService.getSearch(search),
    {
      enabled: search.trim().length > 0,
    }
  );

  const navigate = useNavigate();
  const [isEditGroup, setIsEditGroup] = useState(false)
  // const { data } = useQuery<IUser>(
  //   ['user', username],
  //   () => UserService.getUsername(username!),
  //   { enabled: !!username }
  // );
  return (
    isEditGroup ? <GroupEdit onClose={() => setIsEditGroup(false)} /> :
      <>
        <div style={{
          width: "100%",
          // minWidth: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          boxSizing: "border-box",
        }}>
          <MyButton label="Добавить группу" onClick={() => setIsEditGroup(true)} />
        </div>
        <Box
          sx={{
            position: 'relative', justifyContent: 'center', justifyItems: 'center',
            width: "100%",
          }}
        >
          <div className="flex w-screen max-w-screen-sm justify-center items-center">
            <MyTextField
              inputStyle={{
                marginLeft: "15px",
                marginRight: "15px",
              }}
              label={"Поиск по названию группы"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onClickClear={() => setSearch('')}
              isSearch />
          </div>

          <Grid2
            className="flex w-screen max-w-screen-sm justify-center items-center mt-3"
            container spacing={{ xs: 2, sm: 2, md: 2, }} columns={{ xs: 1, sm: 2, md: 2 }}
          >
            {
              search.length > 0 ?
                Array.isArray(TrainingGroupsSearch) && TrainingGroupsSearch.length > 0 ? (
                  TrainingGroupsSearch.map((item, index) => (
                    <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                      sx={{
                        width: "100%",
                      }} >
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
                    </Grid2>
                  ))
                ) : (
                  <p style={{ textAlign: "center", marginTop: "40px" }}>Нет групп</p>
                )
                :
                Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                      sx={{
                        width: "100%",
                      }} >
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
                    </Grid2>
                  ))
                )
                  : (
                    <p style={{ textAlign: "center", marginTop: "40px" }}>Нет групп</p>
                  )}
          </Grid2>
        </Box>
      </>
  )
}