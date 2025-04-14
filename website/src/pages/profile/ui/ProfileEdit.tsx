import { Avatar, Box, Button, Card, IconButton, Stack, Typography } from '@mui/material'
import styles from './Profile.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { IUser } from '../../../shared/model/IUser';
import { UserService } from '../../../shared/api/User.service';
import EditIcon from '@mui/icons-material/Edit';
import MyTextField from '../../../components/MyTextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import MyDatePicker from '../../../components/MyDatePicker';
import MyButton from '../../../components/MyButton'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { DialogSportType } from '../../training-new/ui/dialogTypeSport';
import { ISportType } from '../../../shared/model/ISportType';
import { DialogRoleList } from './dialogRole';
import { IRoleProfile } from '../../../shared/model/IRoleProfile';
import { ISportCategory } from '../../../shared/model/ISportCategory';
import { DialogSportCategoryList } from './dialogSportCategory';
import { IProfile } from '../../../shared/model/IProfile';
import { ProfileService } from '../../../shared/api/Profile.service';
import { MySwitch } from '../../../components/MySwitch';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../shared/config/firebaseConfig';

interface ProfileEditProps {
  onExit: () => void;
  profile?: IProfile;
}

export default function ProfileEdit(props: ProfileEditProps) {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const [name, setName] = useState(props.profile?.name ?? '');
  const [about, setAbout] = useState(props.profile?.about ?? '');
  // const [about, setAbout] = useState('');
  // const [value, setValue] = useState('Dione');
  const [birthDate, setBirthDate] = useState<Date>(new Date(props.profile?.dateOfBirth ?? '1990-01-01'));
  const [startSportDate, setStartSportDate] = useState<Date>(new Date(props.profile?.startSportDate ?? '2010-01-01'));
  const [endSportDate, setEndSportDate] = useState<Date>(props.profile?.endSportDate ? new Date(props.profile?.endSportDate) : new Date());
  const [isEndSportDate, setIsEndSportDate] = useState<boolean>(props.profile?.endSportDate ? true : false);
  const [image, setImage] = useState<string | null>(props.profile?.url_avatar ?? null);
  const [file, setFile] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<{
    sportType: boolean;
    role: boolean;
    sportCategory: boolean;
  }>({
    sportType: false,
    role: false,
    sportCategory: false,
  });

  const [selectedValues, setSelectedValues] = useState<{
    sportType: ISportType;
    role: IRoleProfile;
    sportCategory: ISportCategory;
  }>({
    sportType: props.profile?.sportType ?? { id: 0, title: "Выберите вид спорта", image: null },
    role: props.profile?.role ?? { id: 0, title: "Выберите вашу роль" },
    sportCategory: props.profile?.sportCategory ?? { id: 0, title: "Выберите разряд или звание", image: null },
  });

  // Открытие диалога
  const handleOpenDialog = (type: keyof typeof openDialog) => {
    setOpenDialog((prev) => ({ ...prev, [type]: true }));
  };

  // Закрытие диалога
  const handleCloseDialog = (type: keyof typeof openDialog) => {
    setOpenDialog((prev) => ({ ...prev, [type]: false }));
  };

  // Выбор значения из диалога
  const handleSelectValue = (
    type: keyof typeof selectedValues,
    value: ISportType | IRoleProfile | ISportCategory
  ) => {
    setSelectedValues((prev) => ({ ...prev, [type]: value }));
    handleCloseDialog(type);
  };

  const { data } = useQuery<IUser>(
    ['user', username],
    () => UserService.getUsername(username!),
    { enabled: !!username }
  );
  useEffect(() => {
    queryClient.invalidateQueries(['user', username]);
    // if (data) {
    //   setValueSportType(data?.profile?.sportType ?? { id: 0, title: "Выберите вид спорта", image: null });
    // }
  }, [data]);

  const handleEditClick = () => {
    props.onExit();
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Проверка типа файла
    if (!selectedFile.type.startsWith("image/")) {
      alert("Пожалуйста, выберите изображение.");
      return;
    }

    // Проверка размера файла (например, не более 5 МБ)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Размер файла не должен превышать 5 МБ.");
      return;
    }

    setFile(selectedFile); // Сохраняем файл в состоянии
    setImage(URL.createObjectURL(selectedFile)); // Предварительный просмотр
  };

  const handleSave = async () => {
    if (props.profile) {
      try {
        let imageUrl = image;

        // Если выбран файл, загружаем его в Firebase
        if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          imageUrl = await getDownloadURL(storageRef);
        }

        // Обновляем данные новости

        await ProfileService.update(props.profile.id!, {
          name: name,
          dateOfBirth: birthDate,
          startSportDate: startSportDate,
          endSportDate: isEndSportDate ? endSportDate : undefined,
          url_avatar: imageUrl!,
          about: about,
          statusId: props.profile.statusId,
          roleId: selectedValues.role.id!,
          sportCategoryId: selectedValues.sportCategory.id,
          isVerified: props.profile.isVerified,
          userId: props.profile.userId,
        })
        // Очищаем состояние
        setFile(null);

      } catch (error) {
        console.error("Ошибка при сохранении новости:", error);
      }

      props.onExit();
    }
  }
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
            overflow: "hidden",
            "&:hover .upload-icon": {
              opacity: 1,
            },
          }}
        >
          <Avatar
            src={image || undefined}
            sx={{
              width: "100px",
              height: "100px",
            }}
          >
            {!image && <AddAPhotoIcon />}
          </Avatar>

          <IconButton
            aria-label="upload"
            className="upload-icon"
            sx={{
              position: "absolute",
              width: "100px",
              height: "100px",
              color: "#fff",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
            onClick={() => document.getElementById("file-input")?.click()} // Открываем диалог выбора файла
          >
            <AddAPhotoIcon />
          </IconButton>

          <input
            id="file-input"
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
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
                  textTransform: 'none',
                  fontSize: "20px",
                  fontWeight: '400',
                  padding: "0px",
                }
              }
              onClick={() => handleOpenDialog("role")} label={selectedValues.role!.title} />
            <DialogRoleList keepMounted open={openDialog.role} onClose={() => handleCloseDialog("role")} onSelect={(newValue) => handleSelectValue('role', newValue)} value={selectedValues.role!} />
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
                  onClick={() => handleOpenDialog("sportType")} label={selectedValues.sportType!.title} />
                <DialogSportType keepMounted open={openDialog.sportType} onClose={() => handleCloseDialog('sportType')} onSelectExercise={(newValue) => handleSelectValue("sportType", newValue)} value={selectedValues.sportType!} />
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
                  onClick={() => handleOpenDialog("sportCategory")} label={selectedValues.sportCategory.title} />
              </div>
              <DialogSportCategoryList keepMounted open={openDialog.sportCategory} onClose={() => handleCloseDialog("sportCategory")} onSelect={(sportCategory) => handleSelectValue("sportCategory", sportCategory)} value={selectedValues.sportCategory!} />
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
            <div className='flex items-center'>
              <div className={`${styles.title_about_title}`}>
                Закончили ли вы спортивную карьеру:
              </div>

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography>Нет</Typography>
                <MySwitch
                  checked={isEndSportDate}
                  onChange={(ev) => setIsEndSportDate(ev.target.checked)}
                />
                <Typography>Да</Typography>
              </Stack>
            </div>
            {
              isEndSportDate &&
              <div className='flex items-center'>
                <div className={`${styles.title_about_title}`}>
                  Дата окончания спортивной карьеры:
                </div>
                <div className={`${styles.title_about_content}`}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                    <MyDatePicker label={'Укажите дату'} value={endSportDate}
                      onChange={(newValue) => { setEndSportDate(newValue!) }} />
                  </LocalizationProvider>
                </div>
              </div>

            }

          </div>

        </Card>
        <div style={{
          padding: "20px",
        }}>
          <Button
            variant="contained"
            sx={{
              color: "#FFFFFFFF",
              background: "#4758d6",
              borderRadius: "20px",
              width: "100%",
              fontWeight: "700",
              padding: "8px 15px",
              boxSizing: "border-box",
            }}
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div >
  )
}
