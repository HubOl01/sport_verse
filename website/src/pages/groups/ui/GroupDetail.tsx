import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../../shared/utils/useAuth";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";

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
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
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
          {USER.userId === data?.trainerId!.toString() ? <IconButton
            edge="end"
            onClick={() => { }}
          >
            <EditIcon />
          </IconButton> : null}
        </Toolbar>
      </AppBar>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        margin: "20px"
      }}>
        <Typography variant="h4">
          {data?.title}
        </Typography>
        <Typography variant="h6">
          {data?.desc}
        </Typography>

      </Box>
    </Box>
  )
}