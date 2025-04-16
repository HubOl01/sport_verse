import { Box, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import MyButton from "../../../components/MyButton";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { useState } from "react";
import MyTextField from "../../../components/MyTextField";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const { data } = useQuery('groups', () => TrainingGroupService.getAll())
  const [search, setSearch] = useState("")
  const { data: TrainingGroupsSearch } = useQuery(['groups', search], () => TrainingGroupService.getSearch(search))
  const navigate = useNavigate();
  // const { data } = useQuery<IUser>(
  //   ['user', username],
  //   () => UserService.getUsername(username!),
  //   { enabled: !!username }
  // );
  return (
    <>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px",
        boxSizing: "border-box",
      }}>
        <MyButton label="Добавить группу" onClick={() => null} />
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
            label={"Поиск по названию группы"}
            onChange={(e) => { setSearch(e.target.value) }}
            value={search}
            onClickClear={() => setSearch('')}
            isSearch />
        </div>

        <Grid2
          columns={{ xs: 1, sm: 1, md: 2 }}
          sx={{ width: '100%' }}
          spacing={{ xs: 2, sm: 2, md: 3 }}
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} >
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
              </div>
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