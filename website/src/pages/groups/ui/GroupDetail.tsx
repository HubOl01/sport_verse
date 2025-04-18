import { Box, AppBar, Toolbar, IconButton, Typography, AvatarGroup, Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../../shared/utils/useAuth";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import CardTraining from "../../training/ui/cardTraining";
import MyButton from "../../../components/MyButton";

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery<ITrainingGroup>(["group", id], async () => await TrainingGroupService.get(id!), { enabled: !!id })
  const { user: USER } = useAuth();
  if (!USER?.token) {
    navigate("/login");
    return null;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { navigate(-1) }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          {USER.userId === data?.trainerId!.toString() ? <MyButton
            onClick={() => { }} label={"Добавить тренировку"}
            style={{ textTransform: "none", marginRight: "10px" }}
          /> : null}
          {USER.userId === data?.trainerId!.toString() ? <IconButton
            edge="end"
            onClick={() => { }}
          >
            <EditIcon />
          </IconButton> : null}
        </Toolbar>
      </AppBar>
      <Box className="flex w-full" sx={{ height: '100%' }} >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            boxShadow: { sm: "7px 0 10px -5px rgba(0,0,0,0.1)" },
            borderBottom: { xs: "2px solid rgba(0,0,0,0.1)", md: "0px" },
            zIndex: 1,
            height: "100%",
            width: { xs: '100%', sm: '35%' },
            // maxWidth: { sm: '400px' },
          }}>
          <div style={{
            padding: "10px 20px",
          }}>

            <div className="flex items-center">
              {data?.isPrivate !== 0 ?
                <LockOutlineIcon sx={{
                  fontSize: 20,
                  mr: 1
                }} />
                : <></>
              }
              <Typography variant="subtitle2" fontWeight={600}>
                Автор: {data?.trainer?.profile?.name}
              </Typography>
            </div>
            <Typography variant="h4">
              {data?.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {data?.desc}
            </Typography>
            {data ? <AvatarGroup
              sx={{
                justifyContent: "start",
              }}
              total={data.athletes?.length}
              renderSurplus={(surplus) => <span
              >+{surplus}
              </span>}
              max={8}
            >
              {data!.athletes?.map((athlete) => (
                <Avatar
                  key={athlete.athlete!.id}
                  alt={athlete.athlete!.profile?.name}
                  src={athlete.athlete!.profile?.url_avatar}
                />
              ))}
            </AvatarGroup> : <></>}
          </div>

        </Box>
        <Box className="w-full h-full"
          sx={{
            flex: 1,
            height: '100%',
            width: '100%',
            // overflowY: 'auto',
          }}

        >
          {
            Array.isArray(data!.planInGroups) && data!.planInGroups?.length > 0 ?
              data!.planInGroups?.map((planInGroup) => (
                <>
                  <>{planInGroup.title}</>
                  <CardTraining key={planInGroup.plan.id} training={planInGroup.plan} />
                </>
              )) : <div className="w-full text-center m-3">
                Пока не создано планов тренировок
              </div>
          }
        </Box>
      </Box>
    </Box>
  )
}