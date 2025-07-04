import { Avatar, Box, Card, IconButton, Typography } from '@mui/material'
import styles from './Profile.module.scss'
import ListTile from './ListTile'
import { useEffect, useState } from 'react';
import { DialogStatus } from './dialog';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { IUser } from '../../../shared/model/IUser';
import { UserService } from '../../../shared/api/User.service';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEdit from './ProfileEdit';
import { calculateYearsWithEnd } from '../../../shared/utils/yearCalulator';
import { useAuth } from '../../../shared/utils/useAuth';
import MyButton from '../../../components/MyButton';
import { useSmallScreen } from '../../../shared/utils/displaySizes';
import { SubscriptionService } from '../../../shared/api/subscriptions.service';
import InformCount from './informCount';
import { getPluralForm } from '../../../shared/utils/getPluralForm';
import { DialogSubscriptionList } from './dialogSubsciption';
import { ILikeModel } from '../../../shared/model/ILikeModel';
import { LikeTrainingService } from '../../../shared/api/likeTraining.service';
import CardTraining from '../../training/ui/cardTraining';
import { ITraining } from '../../../shared/model/ITraining';
import { TrainingService } from '../../../shared/api/training.service';
import { Masonry } from '@mui/lab';
import LoadingDialog from '../../../components/LoadingDialog';


export default function Profile() {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [value, setValue] = useState('Dione');
  const [isEdit, setIsEdit] = useState(false);
  const isSmallScreen = useSmallScreen();
  // useEffect(() => {
  //   if (username) {
  //     console.log('username: ', username)
  //   }
  // })


  const { data, isLoading } = useQuery<IUser>(
    ['profile', username],
    () => UserService.getUsernameProfile(username!),
    { enabled: !!username }
  );
  const { data: dataPlans } = useQuery<IUser>(
    ['profilePlan', username],
    () => UserService.getUsernamePlan(username!),
    { enabled: !!username }
  );
  // const { data: dataPlans } = useQuery<IUser>(
  //   ['profile', username],
  //   () => UserService.getUsernameProfile(username!),
  //   { enabled: !!username }
  // );
  const { data: dataSub } = useQuery<IUser>(
    ['profileSub', username],
    () => UserService.getUsernameSub(username!),
    { enabled: !!username }
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Эффект для управления состоянием диалога
  useEffect(() => {
    if (isLoading) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [isLoading]);

  const { data: likePlans } = useQuery<ILikeModel[]>(
    ['likePlans', data?.id!],
    () => LikeTrainingService.getUser((data?.id!).toString()),
    { enabled: !!data?.id! }
  );
  const { data: myPlans } = useQuery<ITraining[]>(
    ['myPlans', data?.id!],
    () => TrainingService.getAllPublicUser((data?.id!).toString()),
    { enabled: !!data?.id! }
  );
  const { data: likeCount } = useQuery<number>(
    ['likeCount', data?.id!],
    () => LikeTrainingService.getCountUser((data?.id!).toString()),
    { enabled: !!data?.id! }
  );
  useEffect(() => {
    queryClient.invalidateQueries(['user', username]);
  }, [data]);

  const { user: USER } = useAuth();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const handleEditClick = () => {
    setIsEdit(true);
  };
  const isSubscribed =
    Array.isArray(dataSub?.subscribers) &&
    dataSub.subscribers.some(
      (subscriber) => subscriber.subscriberId === Number(USER.userId)
    );
  const handleClickSubscription = async () => {
    if (isSubscribed) {
      await SubscriptionService.delete(
        USER.userId!,
        dataSub?.id!.toString()!
      );
    }
    else {
      await SubscriptionService.create({
        subscriberId: Number(USER.userId)!,
        subscribedToId: dataSub?.id!,
      });
    }
    await queryClient.invalidateQueries(['user', username]);
  }
  return (
    isEdit ?
      <ProfileEdit onExit={() => {
        queryClient.invalidateQueries(['user', username]);
        setIsEdit(false)
      }} profile={data?.profile} />
      :

      <div>
        <LoadingDialog open={isDialogOpen} />
        <div className={styles.background}>
          {USER?.username === username ?
            <IconButton
              aria-label="edit"
              onClick={handleEditClick}
              sx={{
                position: 'absolute',
                top: isSmallScreen ? "85px" : "70px",
                right: isSmallScreen ? "5px" : "20px",
              }}
            >
              <EditIcon
                sx={{
                  color: "white",
                }} />
            </IconButton>
            : <></>
          }
          <Box
            sx={{
              width: isSmallScreen ? "90px" : "110px",
              height: isSmallScreen ? "90px" : "110px",
              top: "45px",
              left: isSmallScreen ? "20px" : "45px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              backgroundColor: "rgba(255, 255, 255)",
            }}
          >
            <Avatar
              src={data?.profile?.url_avatar || undefined}
              sx={{
                width: isSmallScreen ? 80 : 100,
                height: isSmallScreen ? 80 : 100,
              }}>
            </Avatar>
          </Box>
        </div>

        <div style={{
          transform: isSmallScreen ? 'translate(-0px, -50.5px)' : 'translate(-0px, -60.5px)',
        }}>
          <div>
            <div className='flex'>
              <div style={{
                color: '#fff',
                marginLeft: isSmallScreen ? '120px' : '180px',
                fontSize: isSmallScreen ? '34px' : '40px',
                fontWeight: 600
              }}>
                {data?.profile?.name ?? "Неизвестный"}
              </div>
              <div className={`${styles.title_emoji}`} onClick={handleClick}>
                {data?.profile?.status?.svg_image!}
              </div>
              <DialogStatus
                keepMounted
                status={data?.profile?.status!}
                open={open}
                onClose={handleClose}
                value={value}
                profile={data?.profile!}
                username={data?.username!}
              />
            </div>
            <div style={{
              marginLeft: isSmallScreen ? '120px' : '180px',
              fontSize: '20px'
            }}>
              {data?.profile?.role?.title ?? "Спортсмен"}
            </div>
            <div style={{
              marginLeft: isSmallScreen ? '120px' : '180px',
              fontSize: '14px',
              maxWidth: '500px',
            }}>
              {data?.profile?.about}
            </div>
          </div>

          {
            !!data && USER.username === data?.username ? <></> :
              isSmallScreen ?
                <div className={`mt-6`} style={
                  {
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginBottom: '20px'
                  }
                }>
                  <MyButton onClick={handleClickSubscription}
                    label={isSubscribed ? "Вы подписаны" : 'Подписаться'}
                    secondary={isSubscribed}
                    style={{
                      width: "100%",
                    }} />
                </div>
                :
                <div className={`${styles.about} mt-5`}>
                  <MyButton onClick={handleClickSubscription}
                    label={isSubscribed ? "Вы подписаны" : 'Подписаться'
                    }
                    secondary={isSubscribed}

                  />
                </div>
          }
        </div>


        <div style={{
          display: 'grid',
          marginTop: USER.username === data?.username ? '-30px' : '-50px',
          marginBottom: '30px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '10px',
        }}>
          <InformCount
            count={dataSub?.subscriptions?.length ?? 0}
            isLoading={dataSub?.subscriptions?.length === undefined}
            title={getPluralForm(dataSub?.subscriptions?.length ?? 0, ["Подписка", "Подписки", "Подписок"])}
            onClick={
              dataSub?.subscriptions?.length! < 1 ? undefined :
                () => {
                  setIsSub(false),
                    setOpenUsers(true)
                }}
          />

          <InformCount
            count={dataSub?.subscribers?.length ?? 0}
            isLoading={dataSub?.subscribers?.length === undefined}
            title={getPluralForm(dataSub?.subscribers?.length ?? 0, ["Подписчик", "Подписчика", "Подписчиков"])}
            onClick={
              dataSub?.subscribers?.length! < 1 ? undefined : () => {
                setIsSub(true),
                  setOpenUsers(true)
              }}
          />
          <InformCount
            count={dataPlans?.TrainingPlan?.length ?? 0}
            isLoading={dataPlans?.TrainingPlan?.length === undefined}
            title={getPluralForm(dataPlans?.TrainingPlan?.length ?? 0, ["Созданная тренировка", "Созданные тренировки", "Созданных тренировок"])}
          />
          <InformCount
            count={likeCount ?? 0}
            isLoading={likeCount === undefined}
            title={getPluralForm(likeCount ?? 0, ["лайк", "лайка", "лайков"])}
          />
        </div>
        <DialogSubscriptionList keepMounted={false} open={openUsers} userId={data?.id!}
          username={data?.username!}
          onClose={() => setOpenUsers(false)}
          isSubscribers={isSub} />

        <Card
          className="justify-center content-center self-center"
          variant="outlined"
          sx={{
            // marginBottom: '20px',
            borderRadius: '20px',
            marginLeft: "20px",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <div className="self-center p-2 pr-3 pl-3">
            <div className={`${styles.title_about}`}>
              О себе
            </div>
            <br />
            <ListTile title='Дата рождения:' content='1 января 1990' />
            <ListTile title='Вид спорта:' content={data?.profile?.sportType ? data?.profile?.sportType?.title! : "Не указан вид спорта"} />
            <ListTile title='Спортивный стаж:' content={data?.profile?.startSportDate ? calculateYearsWithEnd(data?.profile?.startSportDate) : 'Не указана дата'} />
            <ListTile title='Спортивный разряд:' content={data?.profile?.sportCategory ? data?.profile?.sportCategory?.title! : "Нет разряда"} />
          </div>
        </Card>
        {/* {Number(USER.userId!) !== data?.id && Array.isArray(myPlans) && myPlans.length > 0 ?
          <div className='mb-5'>
            <Typography variant='h6' fontWeight={600} sx={{
              margin: '0px 20px',
            }}>
              Созданные тренировочные планы
            </Typography>
            <Grid2
              container spacing={{ xs: 2, md: 3, sm: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {myPlans.map((plan) => {
                return (
                  <Grid2 key={plan.id} size={{ xs: 2, sm: 4, md: 4 }}>
                    <CardTraining training={plan!} grid countLikes={plan!._count?.LikeTraining!} />
                  </Grid2>)
              })
              }
            </Grid2>
          </div>
          : <></>} */}
        {Number(USER.userId!) !== data?.id && Array.isArray(myPlans) && myPlans.length > 0 ? (
          <div className="mb-5">
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                margin: "0px 20px",
              }}
            >
              Созданные тренировочные планы
            </Typography>

            <div
              style={{
                display: "flex",
                overflowX: "auto",
              }}
            >
              {myPlans.map((plan) => (
                <div key={plan.id} style={{ flex: "0 0 auto", width: "500px" }}> {/* Фиксированная ширина элемента */}
                  <CardTraining

                    training={plan!}
                    minMargin
                    countLikes={plan!._count?.LikeTraining!}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}

        {Array.isArray(likePlans) && likePlans.length > 0 ?
          <div className='mb-5'>
            <Typography variant='h6' fontWeight={600} sx={{
              margin: '0px 20px',
            }}>
              Понравившиеся тренировочные планы
            </Typography>
            <div style={{ margin: '0px 20px', }}>

              <Masonry
                spacing={{ xs: 1, md: 1, sm: 1 }}
                columns={{ xs: 1, sm: 3, md: 3 }}
                sx={{
                  width: '100%',
                }}
              >
                {likePlans.map((like) => {
                  return (
                    <CardTraining
                      key={like.trainingPlan!.id}
                      training={like.trainingPlan!} grid countLikes={like.trainingPlan!._count?.LikeTraining!} />
                  )
                })
                }
              </Masonry>
            </div>
          </div>
          : <></>}
      </div>
  )
}
