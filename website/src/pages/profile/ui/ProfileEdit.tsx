import { Avatar, Box, Card, IconButton } from '@mui/material'
import styles from './Profile.module.scss'
import ListTile from './ListTile'
import { useEffect, useState } from 'react';
import { DialogStatus } from './dialog';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { IUser } from '../../../shared/model/IUser';
import { UserService } from '../../../shared/api/User.service';
import EditIcon from '@mui/icons-material/Edit';
import MyTextField from '../../../components/MyTextField';
import MyDateTimePicker from '../../../components/MyDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import MyDatePicker from '../../../components/MyDatePicker';
import MyButton from '../../../components/MyButton'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface ProfileEditProps {
  onExit: () => void;
}

export default function ProfileEdit(props: ProfileEditProps) {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  // const [about, setAbout] = useState('');
  const [value, setValue] = useState('Dione');
  const [birthDate, setBirthDate] = useState<Date>(new Date('1990-01-01'));
  const [startSportDate, setStartSportDate] = useState<Date>(new Date('2010-01-01'));
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

    }
  };

  const { data } = useQuery<IUser>(
    ['user', username],
    () => UserService.getUsername(username!),
    { enabled: !!username }
  );
  useEffect(() => {
    queryClient.invalidateQueries(['user', username]);
  }, [data]);
  const handleClick = () => {
    setOpen(true);
  };
  const handleAvatarClick = () => {
    console.log('Аватар был кликнут');
  };
  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  const handleEditClick = () => {
    props.onExit();
  };
  return (
    <div>
      <div className={`${styles.background}`}>
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
          <IconButton
            aria-label="edit"
            sx={{
              width: "100px",
              height: "100px",
              display: "flex",
              backgroundColor: 'transparent',
              zIndex: 1,
            }}
            onClick={handleAvatarClick}
          >
            <Avatar sx={{
              width: "100px",
              height: "100px",
            }}>
              <AddAPhotoIcon />
            </Avatar>
          </IconButton>
        </Box>



        <div className={styles.backgroundText}>
          <div className='flex'>
            <div className={`${styles.title_profile}`}>
              {/* {data?.profile?.name} */}
              <MyTextField label={"Имя профиля"} onChange={(e) => setName(e.target.value)} value={name}
                isAutocomplete={false}
                inputStyle={{
                  width: "100%",
                  fontSize: "40px",
                  fontWeight: '600',
                  color: "white",
                }} />
            </div>
          </div>

          <div className={`${styles.title_content}`}>
            {/* {data?.profile?.role?.title} */}
            <MyButton
              textButton={true}
              styleButton={
                {
                  color: "black",
                  // borderRadius: "30px",
                  // justifyContent: "start",
                  textTransform: 'none',
                  // width: "100%",
                  fontSize: "20px",
                  fontWeight: '400',
                  padding: "0px",
                }
              }
              onClick={() => null} label={data?.profile?.role?.title!} />
          </div>
          <div className={`${styles.about}`}>
            {/* {data?.profile?.about} */}
            <MyTextField label={"О себе"} onChange={(e) => setAbout(e.target.value)} value={about}
              isAutocomplete={false}
              isLines={true}
              maxRows={3}
              maxLength={180}
              inputStyle={{
                width: "100%",
                fontSize: "14px",
                color: "black",
              }} />
          </div>
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
            <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Дата рождения:
              </div>
              <div className={`${styles.title_about_content}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <MyDatePicker label={'Укажите дату'} value={birthDate}
                    onChange={(newValue) => { setBirthDate(newValue!) }} />
                </LocalizationProvider>
              </div>
            </div>
            <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Вид спорта:
              </div>
              <div className={`${styles.title_about_content}`}>
                <MyButton
                  textButton={true}
                  styleButton={
                    {
                      color: "black",
                      // borderRadius: "30px",
                      justifyContent: "start",
                      textTransform: 'none',
                      // width: "100%",
                      fontSize: "16px",
                      padding: "5px 0px 5px 0px",
                    }
                  }
                  onClick={() => null} label={'Легкая атлетика'} />
              </div>
            </div>
            <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Спортивный разряд:
              </div>
              <div className={`${styles.title_about_content}`}>
                <MyButton
                  textButton={true}
                  styleButton={
                    {
                      color: "black",
                      justifyContent: "start",
                      textTransform: 'none',
                      fontSize: "16px",
                      padding: "5px 0px 5px 0px",
                    }
                  }
                  onClick={() => null} label={'КМС'} />
              </div>
            </div>
            <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Дата начала спортивной карьеры:
              </div>
              <div className={`${styles.title_about_content}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <MyDatePicker label={'Укажите дату'} value={startSportDate}
                    onChange={(newValue) => { setStartSportDate(newValue!) }} />
                </LocalizationProvider>
              </div>
            </div>
            {/* <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Дата окончания спортивной карьеры:
              </div>
              <div className={`${styles.title_about_content}`}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                  <MyDatePicker label={'Укажите дату'} value={startSportDate}
                    onChange={(newValue) => { setStartSportDate(newValue!) }} />
                </LocalizationProvider>
              </div>
            </div> */}

          </div>
        </Card>
      </div>
    </div >
  )
}
