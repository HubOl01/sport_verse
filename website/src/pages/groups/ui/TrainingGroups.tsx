import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import MyButton from "../../../components/MyButton";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { useState } from "react";
import MyTextField from "../../../components/MyTextField";
import GroupEdit from './GroupEdit';
import { useAuth } from "../../../shared/utils/useAuth";
import CardGroupGrid from "./cardGroupGrid";
import ToggleMyGroups from "../../../components/ToggleMyGroups";
// import { UserService } from "../../../shared/api/User.service";
// import LoadingDialog from "../../../components/LoadingDialog";

interface TrainingGroupsProps {
  myGroups?: boolean,
  search?: boolean,
}

export default function TrainingGroups(props: TrainingGroupsProps) {
  const { data } = useQuery('groups', () => TrainingGroupService.getAll())
  const [search, setSearch] = useState("")
  const { user: USER } = useAuth();
  // const [__, setIsDialogOpen] = useState(false);
  // const { data: _, isLoading: isLoadingDataUser } = useQuery(['user', USER.username], () => UserService.getUsername(USER.username!), { enabled: !!USER?.username });
  const { data: TrainingGroupsSearch, isLoading: isLoadingSearch } = useQuery(
    ['groups', search],
    () => TrainingGroupService.getSearch(search),
    {
      enabled: search.trim().length > 0,
    }
  );
  const { data: TrainingGroupsUser, isLoading: isLoadingGroup } = useQuery(
    ['my-groups', USER.userId],
    () => TrainingGroupService.getUser(USER.userId!),
    {
      enabled: !!USER.userId,
    }
  );
  const { data: TrainingGroupsTraining, isLoading: isLoadingDataUserTraining } = useQuery(
    ['my-groups-training', USER.userId],
    () => TrainingGroupService.getTrainer(USER.userId!),
    {
      enabled: !!USER.userId,
    }
  );
  const [alignment, setAlignment] = useState('');

  // useEffect(() => {
  //   if (isLoadingDataUser) {
  //     setIsDialogOpen(true);
  //   } else {
  //     setIsDialogOpen(false);
  //   }
  // }, [isLoadingDataUser]);

  const handleAlignmentChange = (newAlignment: string) => {
    setAlignment(newAlignment);
  };


  const [isEditGroup, setIsEditGroup] = useState(false)
  // const { data } = useQuery<IUser>(
  //   ['user', username],
  //   () => UserService.getUsername(username!),
  //   { enabled: !!username }
  // );
  return (
    isEditGroup ? <GroupEdit onClose={() => setIsEditGroup(false)} /> :
      <>
        {
          !props.search && <div style={{
            width: "100%",
            // minWidth: "100%",
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px",
            boxSizing: "border-box",
          }}>
            <MyButton label="Добавить группу" onClick={async () => {
              // await queryClient.invalidateQueries(['user', USER.username]);
              setIsEditGroup(true)
            }} />
          </div>
        }

        {/* <LoadingDialog open={isLoadingDataUser} /> */}
        <Box
          sx={{
            position: 'relative', justifyContent: 'center', justifyItems: 'center',
            width: "100%",
          }}
        >
          {
            props.myGroups ?
              <ToggleMyGroups alignment={alignment} handleAlignmentChange={(newAlignment) => { handleAlignmentChange(newAlignment) }} />
              :
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

          }
          <Grid2
            className="flex w-screen max-w-screen-sm justify-center items-center mt-3"
            container spacing={{ xs: 2, sm: 2, md: 2, }} columns={{ xs: 1, sm: 2, md: 2 }}
          >
            {

              search.length > 0 ?
                isLoadingSearch ?
                  (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                      <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
                      <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                        Загрузка...
                      </Typography>
                    </div>
                  ) :
                  Array.isArray(TrainingGroupsSearch) && TrainingGroupsSearch.length > 0 ? (
                    TrainingGroupsSearch.map((item, index) => (
                      <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                        sx={{
                          width: "100%",
                        }} >
                        <CardGroupGrid item={item} />
                      </Grid2>
                    ))
                  ) : (
                    <p style={{ textAlign: "center", marginTop: "40px" }}>Нет групп</p>
                  )
                :
                props.myGroups ?
                  alignment === '/trainer' ?
                    Array.isArray(TrainingGroupsTraining) && TrainingGroupsTraining.length > 0 ? (
                      TrainingGroupsTraining.map((item, index) => (
                        <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                          sx={{
                            width: "100%",
                          }} >
                          <CardGroupGrid item={item} />
                        </Grid2>
                      ))
                    )
                      : (
                        <p style={{ textAlign: "center", marginTop: "40px" }}>Нет созданных групп</p>
                      )

                    : isLoadingDataUserTraining ?
                      (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                          <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
                          <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                            Загрузка...
                          </Typography>
                        </div>
                      ) :
                      Array.isArray(TrainingGroupsUser) && TrainingGroupsUser.length > 0 ? (
                        TrainingGroupsUser.map((item, index) => (
                          <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                            sx={{
                              width: "100%",
                            }} >
                            <CardGroupGrid item={item} />
                          </Grid2>
                        ))
                      )
                        : (
                          <p style={{ textAlign: "center", marginTop: "40px" }}>Нет добавленных групп</p>
                        ) : isLoadingGroup ?
                    (
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                        <CircularProgress size={30} thickness={4} sx={{ color: "#4758d6" }} />
                        <Typography variant="body1" sx={{ marginLeft: "10px" }}>
                          Загрузка...
                        </Typography>
                      </div>
                    ) :
                    Array.isArray(data) && data.length > 0 ? (
                      data.map((item, index) => (
                        <Grid2 key={index} size={{ xs: 1, sm: 1, md: 1 }}
                          sx={{
                            width: "100%",
                          }} >
                          <CardGroupGrid item={item} />
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