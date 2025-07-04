import { useQuery, useQueryClient } from "react-query";
import { INewModel } from "../../../../shared/model/INewModel";
import { useNavigate, useParams } from "react-router-dom";
import { NewsService } from "../../../../shared/api/news.service";
import { AppBar, Box, Button, Card, CardContent, CardMedia, IconButton, TextField, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { ru } from "date-fns/locale";
import MyTextField from "../../../../components/MyTextField";
import MyDateTimePicker from "../../../../components/MyDateTimePicker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../shared/config/firebaseConfig";
import FileUploadIcon from '@mui/icons-material/FileUpload';


export default function NewsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: newsData,
  } = useQuery<INewModel>(['newsDetail', id], () => NewsService.get(id!));


  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  // if (!newsData) return <p className={styles.text}>Нет новости с таким id</p>;

  const [title, setTitle] = useState(newsData?.title || "");
  const [description, setDescription] = useState(newsData?.description || "");
  const [image, setImage] = useState(newsData?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [createdAt, setCreatedAt] = useState<Date | null>(
    newsData?.date ? new Date(newsData.date) : null
  );

  useEffect(() => {
    if (newsData) {
      setTitle(newsData.title);
      setDescription(newsData.description);
      setImage(newsData.image || "");
      setCreatedAt(newsData.date ? new Date(newsData.date) : null);
    }
  }, [newsData]);

  const handleDelete = async () => {
    try {
      await NewsService.delete(id!);
      queryClient.invalidateQueries('news');
      navigate(-1);
    } catch (error) {
      console.error('Ошибка при удалении текущей новости:', error);
      alert('Не удалось удалить текушую новость.');
    }
  };

  // const handleSave = async () => {

  //   await NewsService.update(id!, {
  //     title: title,
  //     description: description,
  //     image: image,
  //     date: createdAt! ?? Date.now(),
  //   });
  //   navigate(`/admin/news`);
  // };
  const handleSave = async () => {
    try {
      let imageUrl = image;

      // Если выбран файл, загружаем его в Firebase
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef); // Получаем URL загруженного файла
      }

      // Обновляем данные новости
      await NewsService.update(id!, {
        title,
        description,
        image: imageUrl,
        date: createdAt!,
      });

      // Очищаем состояние
      setFile(null);

      // Перенаправляем пользователя
      navigate(`/admin/news`);
    } catch (error) {
      console.error("Ошибка при сохранении новости:", error);
      alert("Не удалось сохранить новость.");
    }
  };



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile); // Сохраняем файл в состоянии
    setImage(URL.createObjectURL(selectedFile)); // Предварительный просмотр
  };

    // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (!selectedFile) return;

  //   setFile(selectedFile); // Сохраняем файл в состоянии

  //   try {
  //     const storageRef = ref(storage, `images/${selectedFile.name}`);
  //     await uploadBytes(storageRef, selectedFile); // Загружаем файл в Firebase
  //     const downloadURL = await getDownloadURL(storageRef); // Получаем URL загруженного файла
  //     setImage(downloadURL); // Устанавливаем URL в состояние
  //     alert("Изображение успешно загружено!");
  //   } catch (error) {
  //     console.error("Ошибка при загрузке файла:", error);
  //     alert("Не удалось загрузить изображение.");
  //   }
  // };

  return (
    <Box >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            edge="end"
            sx={{ ml: 2 }}
            onClick={() => {
              setTitle(newsData!.title);
              setDescription(newsData!.description);
              setImage(newsData!.image ?? '');
            }}
          >
            <RestartAltIcon />
          </IconButton>
          <IconButton
            edge="end"
            sx={{ ml: 2, color: "red" }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ position: 'relative', minHeight: '100vh', justifyContent: 'center', justifyItems: 'center' }}>
        <div className='mr-2 ml-2 w-screen max-w-screen-sm  mt-5'>
          <div>
            <Card
              sx={{
                width: "100%",
              }}>
              {
                image.length < 1 ?
                  <></> : <CardMedia
                    component="img"
                    // sx={{ height: "200px" }}
                    // height="140"
                    image={image}
                  />
              }
              <CardContent>
                <TextField
                  variant="standard"
                  multiline
                  margin="none"
                  autoFocus
                  sx={{ width: "100%" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Заголовок"
                  slotProps={{
                    input: {
                      style: {
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      },
                      disableUnderline: true,
                    },
                  }}
                />

                <TextField
                  variant="standard"
                  multiline
                  margin="none"
                  autoFocus
                  sx={{ width: "100%" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание"
                  // color="primary"
                  slotProps={{
                    input: {
                      style: {
                        color: "secondary",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: 1.3,
                      },
                      disableUnderline: true,
                    },
                  }}
                />
                {/* <Typography variant="body2" color="text.secondary" textAlign={'end'}>
                  {newModel.date}
                </Typography> */}
              </CardContent>
            </Card>
          </div >
          <div className="mt-4 w-ful flex">
            <MyTextField
              isBorder={true}
              label="Изображение из интернета" onChange={(e) => setImage(e.target.value)} value={image} />
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#4758d6",
                color: "#FFFFFF",
                borderRadius: "10px",
                marginLeft: "10px",
                // width: "100%",
              }}
            >
              <FileUploadIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
          </div>
          {/* <div className="mt-4 w-full">
           
          </div> */}
          <div className="mt-4 w-full">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
              <MyDateTimePicker label="Дата публикации"
                value={createdAt}
                onChange={(newValue) => { setCreatedAt(newValue) }} />
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              color: "#FFFFFFFF",
              background: "#4758d6",
              borderRadius: "20px",
              width: "100%",
              fontWeight: "700",
              padding: "8px 15px",
            }}
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </div >

      </Box>
    </Box>
  )
}
