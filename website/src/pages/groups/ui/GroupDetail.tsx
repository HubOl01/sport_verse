import { Box, AppBar, Toolbar, IconButton, Typography, Avatar, Chip, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
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
import GroupEdit from "./GroupEdit";
import PlanInGroupEdit from "./PlanInGroupEdit";
import CardPlanContent from "./cardPlanContent";
import { IPlanInGroup } from "../../../shared/model/IPlanInGroup";
import React from "react";
import { IAthleteInGroup } from "../../../shared/model/IAthleteInGroup";

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery<ITrainingGroup>(["group", id], async () => await TrainingGroupService.get(id!), { enabled: !!id })
  const { user: USER } = useAuthLog();
  const [isEditGroup, setIsEditGroup] = useState(false)
  const [isEditPlanInGroup, setIsEditPlanInGroup] = useState(false)
  const [planInGroupClick, setPlanInGroupClick] = useState<IPlanInGroup | undefined>()

  return (
    isEditPlanInGroup ? <PlanInGroupEdit onClose={() => { setIsEditPlanInGroup(false) }} trainingGroup={data!} planInGroup={planInGroupClick} /> :
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
                onClick={() => {
                  setPlanInGroupClick(undefined)
                  setIsEditPlanInGroup(true)
                }} label={"Добавить тренировку"}
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
              sx={{
                // width: { xs: '100%', sm: '28%' },
                maxWidth: '280px',
                width: "100%",
                // padding: 2,
                boxShadow: { sm: "7px 0 10px -5px rgba(0,0,0,0.1)" },
                overflowY: 'auto',
              }}
            >
              <div style={{
                padding: "5px 15px",
              }}>

                <div className="flex items-center">
                  {data?.isPrivate !== 0 ?
                    <LockOutlineIcon sx={{
                      fontSize: 20,
                      mr: 1
                    }} />
                    : <></>
                  }
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Автор: {data?.trainer?.profile?.name}
                  </Typography>
                </div>
                <Typography variant="h4"
                  lineHeight={1}
                  fontSize={32}
                  gutterBottom>
                  {data?.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {data?.desc}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Вид спорта: {data?.sportType?.title}
                </Typography>
                {/* {data ?
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
                  : <></>} */}
              </div>
              <List>
                <Typography className="pl-3 pr-3" variant="h6" fontWeight={600}>
                  Участники группы:
                </Typography>
                {Array.isArray(data?.athletes) && data?.athletes.length > 0 ?
                  data?.athletes.map((athlete: IAthleteInGroup) =>
                    <ListItem
                      key={athlete.id}
                      className="w-screen max-w-screen-sm"
                      alignItems="flex-start"
                      sx={{
                        width: "100%"
                      }}
                      disablePadding

                    ><ListItemButton
                      onClick={() => {
                        navigate(`/profile/${athlete.athlete?.username}`)
                      }}
                    >
                        <ListItemAvatar>
                          <Avatar alt="avatar" src={athlete.athlete!.profile?.url_avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              {
                                USER.username === athlete.athlete!.username ?
                                  <>
                                    {athlete.athlete!.profile?.name} (Вы)
                                  </>
                                  :
                                  <>
                                    {athlete.athlete!.profile?.name}
                                  </>
                              }
                              <Chip label={athlete.athlete!.profile?.role?.title} variant="outlined" size="small" sx={{
                                marginLeft: "10px",
                                fontSize: "12px",
                              }} />
                            </>
                          }
                          secondary={<React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.secondary', display: 'inline' }}
                            >
                              @{athlete.athlete!.username}
                            </Typography>
                          </React.Fragment>}
                        />
                      </ListItemButton>

                      <Divider />
                    </ListItem>
                  )
                  : <p style={{
                    textAlign: "center",
                  }}>Нет участников группы</p>}

              </List>
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
                    <CardPlanContent key={planInGroup.id!} planInGroup={planInGroup}
                      onEdit={() => {
                        setPlanInGroupClick(planInGroup);
                        setIsEditPlanInGroup(true);
                      }}
                    />
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