import { Avatar, Box, Card, IconButton } from '@mui/material'
import styles from './Profile.module.scss'
import ListTile from './ListTile'
import { useEffect, useState } from 'react';
import { DialogStatus } from './dialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { IUser } from '../../../shared/model/IUser';
import { UserService } from '../../../shared/api/User.service';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEdit from './ProfileEdit';
import { calculateYearsWithEnd } from '../../../shared/utils/yearCalulator';
import { useAuth } from '../../../shared/utils/useAuth';
import MyButton from '../../../components/MyButton';
import { useSmallScreen } from '../../../shared/utils/displaySizes';

export default function Profile() {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Dione');
  const [isEdit, setIsEdit] = useState(false);
  const isSmallScreen = useSmallScreen();


  const { data } = useQuery<IUser>(
    ['user', username],
    () => UserService.getUsername(username!),
    { enabled: !!username }
  );
  useEffect(() => {
    queryClient.invalidateQueries(['user', username]);
  }, [data]);

  const { user: USER } = useAuth();
  const navigate = useNavigate();

  if (!USER?.token) {
    navigate("/login");
    return null;
  }

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
  return (
    isEdit ?
      <ProfileEdit onExit={() => {
        queryClient.invalidateQueries(['user', username]);
        setIsEdit(false)
      }} profile={data?.profile} />
      :
      <>
        <div className={styles.background}>
          {USER?.username === username ?
            (<IconButton
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
            </IconButton>)
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
                    <MyButton onClick={() => null} label={'Подписаться'} style={{
                      width: "100%",
                    }} />
                  </div>
                  :
                  <div className={`${styles.about} mt-5`}>
                    <MyButton onClick={() => null} label={'Подписаться'} />
                  </div>
            }
          </div>
          <Card
            className="justify-center content-center self-center"
            variant="outlined"
            sx={{
              // marginBottom: '20px',
              borderRadius: '20px',
              marginLeft: "20px",
              marginRight: "20px",
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
        </div>
      </>
  )
}
