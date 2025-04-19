import { Avatar, Box, Card, Grid2, IconButton, Typography } from '@mui/material'
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

export default function Profile() {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [value, setValue] = useState('Dione');
  const [isEdit, setIsEdit] = useState(false);
  const isSmallScreen = useSmallScreen();


  const { data } = useQuery<IUser>(
    ['user', username],
    () => UserService.getUsername(username!),
    { enabled: !!username }
  );
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
    Array.isArray(data?.subscribers) &&
    data.subscribers.some(
      (subscriber) => subscriber.subscriberId === Number(USER.userId)
    );
  const handleClickSubscription = async () => {
    if (isSubscribed) {
      await SubscriptionService.delete(
        USER.userId!,
        data?.id!.toString()!
      );
    }
    else {
      await SubscriptionService.create({
        subscriberId: Number(USER.userId)!,
        subscribedToId: data?.id!,
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
        <div className={styles.background}>
          {USER?.username === username ?
            <IconButton
              aria-label="edit"
              onClick={handleEditClick}
              sx={{
                position: 'absolute',
                top: "70px",
                right: "20px",
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
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              top: "45px",
              left: "45px",
              backgroundColor: "rgba(255, 255, 255)",
            }}
          >
            <Avatar
              src={data?.profile?.url_avatar || undefined}
              sx={{
                width: 100,
                height: 100,
              }}>
            </Avatar>
          </Box>
        </div>

        <div className={styles.backgroundText}>
          <div className='flex'>
            <div className={`${styles.title_profile}`}>
              {data?.profile?.name}
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
          <div className={`${styles.title_content}`}>
            {data?.profile?.role?.title}
          </div>
          <div className={`${styles.about}`}>
            {data?.profile?.about}
          </div>
          {
            USER.username === data?.username ? <></> :
              isSmallScreen ?
                <div className={`mt-6`} style={
                  {
                    marginLeft: "20px",
                    marginRight: "20px",
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
            count={data?.subscriptions.length!}
            title={getPluralForm(data?.subscriptions.length!, ["Подписка", "Подписки", "Подписок"])}
            onClick={
              data?.subscriptions.length! < 1 ? undefined :
                () => {
                  setIsSub(false),
                    setOpenUsers(true)
                }}
          />

          <InformCount
            count={data?.subscribers.length!}
            title={getPluralForm(data?.subscribers.length!, ["Подписчик", "Подписчика", "Подписчиков"])}
            onClick={
              data?.subscribers.length! < 1 ? undefined : () => {
                setIsSub(true),
                  setOpenUsers(true)
              }}
          />
          <InformCount
            count={data?.TrainingPlan.length!}
            title={getPluralForm(data?.TrainingPlan.length!, ["Созданная тренировка", "Созданные тренировки", "Созданных тренировок"])}
          />
          <InformCount
            count={likeCount!}
            title={getPluralForm(likeCount!, ["лайк", "лайка", "лайков"])}
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
        {Number(USER.userId!) !== data?.id && Array.isArray(myPlans) && myPlans.length > 0 ?
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
          : <></>}
        {Array.isArray(likePlans) && likePlans.length > 0 ?
          <div className='mb-5'>
            <Typography variant='h6' fontWeight={600} sx={{
              margin: '0px 20px',
            }}>
              Понравившиеся тренировочные планы
            </Typography>
            <Grid2
              container spacing={{ xs: 2, md: 3, sm: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {likePlans.map((like) => {
                return (
                  <Grid2 key={like.id} size={{ xs: 2, sm: 4, md: 4 }}>
                    <CardTraining training={like.trainingPlan!} grid countLikes={like.trainingPlan!._count?.LikeTraining!} />
                  </Grid2>)
              })
              }
            </Grid2>
          </div>
          : <></>}
      </div>
  )
}
