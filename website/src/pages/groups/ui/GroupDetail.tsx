import { Box, AppBar, Toolbar, IconButton, Typography, AvatarGroup, Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useAuthLog } from "../../../shared/utils/useAuth";
import { useQuery } from "react-query";
import { TrainingGroupService } from "../../../shared/api/trainingGroups.service";
import { ITrainingGroup } from "../../../shared/model/ITrainingGroup";
import MyButton from "../../../components/MyButton";
import { useState } from "react";
import { DialogParticipantList } from "./dialogParticipants";
import GroupEdit from "./GroupEdit";
import PlanInGroupEdit from "./PlanInGroupEdit";
import CardPlanContent from "./cardPlanContent";

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery<ITrainingGroup>(["group", id], async () => await TrainingGroupService.get(id!), { enabled: !!id })
  const { user: USER } = useAuthLog();
  const [dialogPart, setDialogPart] = useState(false);
  const [isEditGroup, setIsEditGroup] = useState(false)
  const [isEditPlanInGroup, setIsEditPlanInGroup] = useState(false)

  return (
    isEditPlanInGroup ? <PlanInGroupEdit onClose={() => { setIsEditPlanInGroup(false) }} trainingGroup={data!} /> :
      isEditGroup ? <GroupEdit onClose={() => setIsEditGroup(false)} trainingGroup={data} /> :
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
                onClick={() => { setIsEditPlanInGroup(true) }} label={"Добавить тренировку"}
                style={{ textTransform: "none", marginRight: "10px" }}
              /> : null}
              {USER.userId === data?.trainerId!.toString() ? <IconButton
                edge="end"
                onClick={() => { setIsEditGroup(true) }}
              >
                <EditIcon />
              </IconButton> : null}
            </Toolbar>
          </AppBar>

          {/* <Box className="flex w-full" sx={{ height: '100%' }} > */}
          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', height: '100%' }}>
            <Box
              // sx={{
              //   display: "flex",
              //   flexDirection: "column",
              //   gap: "5px",
              //   boxShadow: { sm: "7px 0 10px -5px rgba(0,0,0,0.1)" },
              //   borderBottom: { xs: "2px solid rgba(0,0,0,0.1)", md: "0px" },
              //   zIndex: 1,
              //   height: "100%",
              //   width: { xs: '100%', sm: '28%' },
              //   // maxWidth: { sm: '400px' },
              // }}
              sx={{
                width: { xs: '100%', sm: '28%' },
                maxWidth: '400px',
                padding: 2,
                boxShadow: { sm: "7px 0 10px -5px rgba(0,0,0,0.1)" },
                overflowY: 'hidden',
              }}
            >
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
                {data ?
                  <>
                    <AvatarGroup
                      onClick={() => setDialogPart(true)}
                      sx={{
                        justifyContent: "start",
                        cursor: "pointer",
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
                    </AvatarGroup>
                    <DialogParticipantList keepMounted={false} open={dialogPart} groupId={Number(id)} onClose={() => setDialogPart(false)} />
                  </>
                  : <></>}
              </div>

            </Box>
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                padding: 2,
              }}
            >
              {
                data && Array.isArray(data!.PlanInGroup) && data!.PlanInGroup?.length > 0 ?
                  data!.PlanInGroup?.map((planInGroup) => (
                    <CardPlanContent key={planInGroup.id!} planInGroup={planInGroup} />
                  )) : <div className="w-full text-center">
                    <Typography variant="subtitle1" padding={2}>
                      Пока не созданы планы тренировок
                    </Typography>
                  </div>
              }

            </Box>
          </Box>
        </Box>
  )
}