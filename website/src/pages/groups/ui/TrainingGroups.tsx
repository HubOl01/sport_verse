import { Box, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
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
  // const { data: TrainingGroupsSearch } = useQuery(['groups', search], () => TrainingGroupService.getSearch(search))
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
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          boxSizing: "border-box",
        }}>
          <MyButton label="Добавить группу" onClick={() => setIsEditGroup(true)} />
        </div>
        <Box
          sx={{
            position: 'relative', minHeight: '100vh', justifyContent: 'center', justifyItems: 'center', maxHeight: "80vh",
            overflowY: "auto",
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
              onChange={(e) => { setSearch(e.target.value) }}
              value={search}
              onClickClear={() => setSearch('')}
              isSearch />
          </div>

          <Grid2
            className="mt-3"
            container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <Grid2 key={index} size={{ xs: 6, sm: 6, md: 6 }}>
                  <Card onClick={() => navigate(`/group/${item.id}`)}
                    sx={{
                      width: "100%",
                      maxWidth: "800px",
                      borderRadius: "30px"
                    }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </CardContent>
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