import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingService } from "../../../shared/api/training.service";
import styles from "./TrainingRead.module.scss";
import { ITraining } from '../../../shared/model/ITraining';
import { AppBar, Box, CardActions, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TrainingEdit from "../../training-edit/ui/TrainingEdit";
import { useEffect, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import { BiCommentDetail } from "react-icons/bi";
import { BiSolidCommentDetail } from "react-icons/bi";
import ThumbUpOn from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOff from '@mui/icons-material/ThumbUpOffAlt';
import { ColorBackground } from "../../../shared/styles/colors";
import { DialogShare } from "./dialogShare";
import Comments from "./comments/Comments";
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import { LikeTrainingService } from "../../../shared/api/likeTraining.service";
import { ILikeModel } from "../../../shared/model/ILikeModel";
import MyButton from "../../../components/MyButton";
import { GroupedExercises } from "./groupedExercises";
import { useAuth } from "../../../shared/utils/useAuth";
import { ViewsTrainingService } from "../../../shared/api/viewsTraining.service";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Close } from "@mui/icons-material";
import { TrainingResultService } from "../../../shared/api/trainingResult.service";
import { ITrainingResult } from "../../../shared/model/ITrainingResult";
import TrainingTimer from "./TrainingTimer";

export default function TrainingDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [edit, setEdit] = useState(false);
  const [like, setLike] = useState(false);
  const [trainingPlay, setTrainingPlay] = useState(false);
  const [comment, setComment] = useState(true);
  const [share, setShare] = useState(false);
  const [value, setValue] = useState(() => window.location.href);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateStartTraining, setDateStartTraining] = useState<Date>(new Date());
  const [dateEndTraining, setDateEndTraining] = useState<Date>(new Date());
  const [isEndSportDateTraining, setIsEndSportDateTraining] = useState<boolean>(false);
  const [difficulty, setDifficult] = useState<number>(0);
  const [commentTrainingRes, setCommentTrainingRes] = useState('');

  const { user: USER } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const isPreview = searchParams.get("preview") === "true";

  const { data: trainingData, isLoading, error } = useQuery<ITraining>(
    ['trainingDetail', id],
    () => TrainingService.get(id!),
    { enabled: !!id }
  );
  const { data: likeData } = useQuery<ILikeModel>(
    ['likeTraining', id, Number(USER.userId!)],
    () => LikeTrainingService.getPlanUser(id!, USER.userId!),
    { enabled: !!id && !!USER.userId }
  );
  const { data: likesCountData } = useQuery<number>(
    ['likeCountTraining', id, Number(USER.userId!)],
    () => LikeTrainingService.getCount(id!),
    { enabled: !!id && !!USER.userId }
  );
  const { data: trainingResData } = useQuery<ITrainingResult>(
    ['trainingResult', id, Number(USER.userId!)],
    () => TrainingResultService.getStartingUserPlan(USER.userId!, id!),
    { enabled: !!id && !!USER.userId }
  );
  const { data: isStartingUserPlanData } = useQuery<boolean>(
    ['isTrainingResult', id, Number(USER.userId!)],
    () => TrainingResultService.getIsStartingUserPlan(USER.userId!, id!),
    { enabled: !!id && !!USER.userId }
  );
  useEffect(() => {
    if (likeData) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likeData]);

  useEffect(() => {
    if (isStartingUserPlanData) {
      setTrainingPlay(true);
      setIsEndSportDateTraining(true);
      setDateStartTraining(new Date(trainingResData?.date_start!));
      // setDateEndTraining(new Date());
      setInterval(() => {
        setDateEndTraining(new Date());
      }, 1000);
    } else {
      setTrainingPlay(false);
    }
  }, [isStartingUserPlanData])
  // useEffect(() => {
  //   if (!isPreview && trainingData?.id) {
  //     ViewsTrainingService.create({
  //       userId: Number(USER.userId!),
  //       trainingPlanId: trainingData.id,
  //     }).catch((err) => {
  //       console.error("Ошибка при записи просмотра:", err);
  //     });
  //   }
  // }, [!isPreview, trainingData]);
  useEffect(() => {
    if (trainingData?.id) {
      const sendView = async () => {
        try {
          if (USER?.userId) {
            await ViewsTrainingService.create({
              userId: Number(USER.userId),
              trainingPlanId: trainingData.id!,
            });
          } else {
            const res = await fetch("https://api.ipify.org?format=json");
            const data = await res.json();
            await ViewsTrainingService.create({
              trainingPlanId: trainingData.id!,
              ip: data.ip,
            });
          }
        } catch (err) {
          console.error("Ошибка при записи просмотра:", err);
        }
      };

      sendView();
    }
  }, [isPreview, trainingData]);



  if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  if (!trainingData) return <p className={styles.text}>Нет плана</p>;

  // Форматирование даты
  const formattedDateCreated = new Date(trainingData.date_created!).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Удаление плана
  const handleDelete = async () => {
    try {
      await TrainingService.delete(id!);
      queryClient.invalidateQueries('trainingPlans');
      navigate(-1);
    } catch (error) {
      console.error('Ошибка при удалении тренировочного плана:', error);
      alert('Не удалось удалить тренировочный план.');
    }
  };


  async function onClickCopy() {
    if (USER?.token) {
      try {
        if (Number(USER.userId!) === trainingData?.userId! && trainingData?.isPrivate === 0) {
          navigate(`/training/${trainingData?.id}`)
        } if (Number(USER.userId!) === trainingData?.userId! && trainingData?.isPrivate === 1) {
          await TrainingService.copy(
            (trainingData?.id!).toString(),
            USER.userId!);

          const existingPlan = await TrainingService.apiTrainingCheck(
            (trainingData?.id!).toString(),
            USER.userId!);
          navigate(`/training/${existingPlan.id}`)

        }
        else {
          await TrainingService.copyUser(
            (trainingData?.id!).toString(),
            USER.userId!);

          const existingPlan = await TrainingService.apiTrainingCheckUser(
            (trainingData?.id!).toString(),
            USER.userId!);
          navigate(`/training/${existingPlan.id}`)
        }
      } catch (err) {
        console.log(err);
      }
    }
    else {
      alert("Необходимо авторизоваться");
      navigate("/login");
      return null;
    }
  }

  const handleLikeClick = async () => {
    try {
      if (like) {
        await LikeTrainingService.deletePlanUser(id!, (USER.userId!).toString());
        setLike(false);
      } else {
        await LikeTrainingService.create({
          trainingPlanId: Number(id),
          userId: Number(USER.userId!),
        });
        setLike(true);
      }
      queryClient.invalidateQueries('likeCountTraining');
    } catch (error) {
      console.error("Ошибка при обработке лайка:", error);
      alert("Не удалось выполнить действие. Попробуйте позже.");
    }
  };

  const handleCommentClick = () => {
    setComment(!comment);
  };


  const handleShareClick = () => {
    setShare(true);
    setDialogOpen(true);
  };
  const handleEndTraining = async () => {
    if (dateEndTraining! < dateStartTraining) {
      alert("Дата окончания должна быть позже или равна дате начала.");
    } else if (difficulty <= 0 || commentTrainingRes.length <= 0) {
      alert("Вы не заполнили поля");
    }
    else {
      if (trainingResData) {
        await TrainingResultService.update(
          trainingResData.id!,
          {
            date_end: dateEndTraining,
            difficulty: difficulty,
            comment: commentTrainingRes
          });
      } else {
        await TrainingResultService.create({
          trainingPlanId: Number(id),
          userId: Number(USER.userId!),
          groupInGroupId: trainingData.parentGroupId! ?? null,
          date_start: dateStartTraining,
          date_end: dateEndTraining,
          difficulty: difficulty,
          comment: commentTrainingRes
        });
      }
      setTrainingPlay(false);
      setDateStartTraining(new Date());
      setDateEndTraining(new Date());
      setIsEndSportDateTraining(false);
      setDifficult(0);
      setCommentTrainingRes('');
      queryClient.invalidateQueries(['isTrainingResult', id, Number(USER.userId!)]);
      queryClient.invalidateQueries(['trainingResult', id, Number(USER.userId!)]);
    }
  };
  const handleStartTraining = async () => {
    if (trainingResData) {
      alert("Вы уже есть в процессе тренировки. Закончите тренировку, чтобы начать новую");
    } else {
      await TrainingResultService.create({
        trainingPlanId: Number(id),
        userId: Number(USER.userId!),
        groupInGroupId: trainingData.parentGroupId! ?? null,
        date_start: dateStartTraining,
      });
      queryClient.invalidateQueries(['isTrainingResult', id, Number(USER.userId!)]);
      queryClient.invalidateQueries(['trainingResult', id, Number(USER.userId!)]);
    }
  };


  const handleCloseShareDialog = (newValue?: string) => {
    setDialogOpen(false);
    setShare(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  if (!USER?.token && !isPreview) {
    navigate("/login");
    return null;
  }

  return (
    trainingData?.isPrivate === 1 && Number(USER.userId!) !== trainingData?.userId ? <p style={{ textAlign: 'center' }}>Извините, но доступ к этому плану закрыт</p> :
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Шапка (AppBar) */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                if (trainingPlay || edit) {
                  if (trainingPlay) {
                    setTrainingPlay(!trainingPlay);
                  }
                  if (edit) {
                    setEdit(!edit);
                  }
                } else {
                  navigate(-1);
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            {
              edit && <Typography variant="h6" component="div" fontWeight={600}>
                Редактирование тренировочного плана
              </Typography>
            }
            {
              trainingPlay &&
              <Typography variant="h6" component="div" fontWeight={600}>
                Тренировка
              </Typography>
            }
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton
              edge="end"
              sx={{ mr: trainingPlay ? null : 2 }}
              onClick={() => {
                setDateStartTraining(new Date());
                // setDateEndTraining(new Date());
                setInterval(() => {
                  setDateEndTraining(new Date());
                }, 1000);
                setTrainingPlay(!trainingPlay)
              }}
            >
              {trainingPlay ? <Close /> : <FitnessCenterIcon />}
            </IconButton>
            {!trainingPlay &&
              <>
                <MyButton onClick={onClickCopy} label={"Сделать себе копию"}
                  style={{
                    fontSize: "12px",
                  }}
                />
                {Number(USER.userId!) === trainingData.userId ?
                  <>
                    {trainingData.parentGroupId === null ? <IconButton
                      edge="end"
                      sx={{ ml: 2 }}
                      onClick={() => setEdit(!edit)}
                    >
                      <EditIcon />
                    </IconButton> : null}

                    <IconButton
                      edge="end"
                      sx={{ ml: 2, color: "red" }}
                      onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                  : <></>
                }
              </>}
          </Toolbar>
        </AppBar>

        {/* Основной контент */}
        <Box sx={{
          padding: '1rem', paddingBottom: '80px',
        }}>
          {edit ? (
            <TrainingEdit trainingPlanId={Number(id)} onClickExit={() => {
              setEdit(false);
              queryClient.invalidateQueries(['trainingDetail', id]);
              // window.location.reload();
            }} />
          ) : (
            <div className="mr-5 ml-5">
              <TrainingTimer trainingPlay={trainingPlay}
                dateStartTraining={dateStartTraining}
                setDateStartTraining={setDateStartTraining}
                isEndSportDateTraining={isEndSportDateTraining}
                setIsEndSportDateTraining={setIsEndSportDateTraining}
                dateEndTraining={dateEndTraining} setDateEndTraining={setDateEndTraining}
                difficulty={difficulty} setDifficult={setDifficult}
                isStartingUserPlanData={isStartingUserPlanData ?? false}
                commentTrainingRes={commentTrainingRes}
                setCommentTrainingRes={setCommentTrainingRes}
                handleStartTraining={handleStartTraining}
                handleEndTraining={handleEndTraining} />
              {/* {
                trainingPlay &&
                <>
                  <Divider sx={{
                    mb: "15px",
                  }} />
                  <div className={`${styles.listTile}`}>
                    <div className={`${styles.title_about_title}`}>
                      Дата начала тренировки:
                    </div>
                    <div className={`${styles.title_about_content}`}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                        <MyDatePicker label={'Укажите дату'} value={dateStartTraining instanceof Date ? dateStartTraining : new Date(dateStartTraining)}
                          onChange={(newValue) => { setDateStartTraining(newValue!) }} />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className={`${styles.listTile}`}>
                    <div className={`${styles.title_about_title}`}>
                      Закончили ли вы тренировку?:
                    </div>

                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography>Нет</Typography>
                      <MySwitch
                        checked={isEndSportDateTraining}
                        onChange={(ev) => setIsEndSportDateTraining(ev.target.checked)}
                      />
                      <Typography>Да</Typography>
                    </Stack>
                    <div />
                  </div>
                  {
                    isEndSportDateTraining &&
                    <div className={`${styles.listTile}`}>
                      <div className={`${styles.title_about_title}`}>
                        Дата окончания тренировки:
                      </div>
                      <div className={`${styles.title_about_content}`}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                          <MyDatePicker label={'Укажите дату'} value={dateEndTraining instanceof Date ? dateEndTraining : new Date(dateEndTraining)}
                            onChange={(newValue) => {
                              if (newValue! >= dateStartTraining) {
                                setDateEndTraining(newValue!)
                              } else {
                                alert("Дата окончания должна быть позже или равна дате начала.")
                                setDateEndTraining(new Date())
                              }
                            }
                            }
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  }
                  {
                    isEndSportDateTraining &&
                    <div className={`${styles.listTile}`}>
                      <div className={`${styles.title_about_title}`}>Оцените сложность тренировки</div>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Typography>Легко</Typography>
                        <Rating
                          value={difficulty}
                          onChange={(event, newValue) => {
                            setDifficult(newValue!);
                          }}
                          defaultValue={0} max={10} />
                        <Typography>Тяжело</Typography>
                      </Stack>
                    </div>
                  }
                  {
                    isEndSportDateTraining &&
                    <MyTextField label={"Комментарий к тренировке"} onChange={(e) => setCommentTrainingRes(e.target.value)} value={commentTrainingRes} isBorder isLines
                      styles={{
                        marginTop: "15px",
                      }}
                    />
                  }
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      color: "#FFFFFFFF",
                      background: ColorBackground,
                      borderRadius: "20px",
                      width: "100%",
                      fontWeight: "600",
                      padding: "8px 15px",
                    }}
                    onClick={isEndSportDateTraining ? handleEndTraining : handleStartTraining}
                  >
                    {!isEndSportDateTraining ? "Начать тренировку" : "Закончить тренировку"}
                  </Button>
                  <Divider sx={{
                    mt: '15px',
                    mb: "15px",
                  }} />
                </>
              } */}
              {trainingData.isPrivate === 1 ?
                <LockOutlineIcon sx={{
                  marginRight: '0.5rem',
                  padding: '0px',
                  margin: '0px',
                }} /> : <></>
                // <Chip label={trainingData.statusPublish!.title} />
              }
              {
                trainingData.isPrivate === 0 ?
                  <Typography variant="body2" gutterBottom sx={{
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                    onClick={() => navigate(`/profile/${trainingData.user?.username}`)}
                  >Автор: {trainingData.user?.profile?.name ?? "Неизвестный"}</Typography>
                  : <></>
              }
              {
                trainingData.parentUserId !== null ?
                  <Typography variant="body2" gutterBottom sx={{
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                    onClick={() => navigate(`/profile/${trainingData.parentUser?.username}`)}
                  >Автор: @{trainingData.parentUser?.username ?? "Неизвестный"}</Typography>
                  : <></>
              }
              {
                trainingData.parentGroupId !== null ?
                  <Typography variant="body2" gutterBottom sx={{
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                    onClick={() => navigate(`/group/${trainingData.parentGroupId}`)}
                  >Группа: {trainingData.parentGroup?.title ?? "Неизвестный"}</Typography>
                  : <></>
              }
              <Typography
                variant="h4"
                component="h1"
                fontSize={30}
                fontWeight={700}
              >{trainingData.title}</Typography>
              <p>Вид спорта: {trainingData.sportType!.title}</p>
              <p style={{
                fontSize: "16px",
              }}>Описание: {trainingData.description}</p>
              <div className={`${styles.name} mb-5`}>Упражнения</div>
              <div>
                {Array.isArray(trainingData.PlanExercise) && trainingData.PlanExercise!.length > 0 ? (
                  <GroupedExercises planExercises={trainingData.PlanExercise ?? []} />
                  // planExercisesData.map((exercise, i) => (
                  // <ExerciseCard key={exercise.id} exerciseId={exercise.exerciseId} index={i + 1} planExerciseId={exercise.id!} />
                  // )
                  // )
                ) : (
                  <p>Упражнений пока нет.</p>
                )}
              </div>
              <p className={styles.date}>Опубликовано: {formattedDateCreated}</p>
              {
                trainingData.isPrivate === 0 &&
                  comment && !isPreview ?
                  <div>
                    <h2>Комментарии: </h2>
                    <Comments idTraining={id!} training={trainingData} />
                  </div>
                  : <></>
              }
            </div>
          )}
        </Box>
        {
          (trainingData.isPrivate === 1 || edit) || isPreview ? <></> :
            <Box
              className="w-full"
              sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                // maxWidth: `calc(100% - 300px)`,
                maxWidth: { xs: '100%', sm: 'calc(100% - 300px)' },
                backgroundColor: '#fff',
                boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
              }}
            >
              <CardActions
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: '0.5rem'
                }}
              >
                <div className="flex items-center">
                  <IconButton aria-label="like" onClick={handleLikeClick}>
                    {like ? <ThumbUpOn sx={{
                      color: ColorBackground
                    }} /> : <ThumbUpOff />}
                  </IconButton>
                  <Typography variant="body1" sx={{
                    color: like ? ColorBackground : "#000",
                    fontWeight: like ? 600 : 400,
                  }}>
                    {likesCountData}
                  </Typography>
                </div>

                <IconButton aria-label="comment" onClick={handleCommentClick}>
                  {comment ? <BiSolidCommentDetail size={24} style={{
                    color: ColorBackground
                  }} /> : <BiCommentDetail size={24} />}
                </IconButton>

                <IconButton aria-label="share" onClick={handleShareClick}>
                  {share ? <PiShareFatFill size={24} style={{
                    color: ColorBackground
                  }} /> : <PiShareFat size={24} />}
                </IconButton>
                <DialogShare
                  keepMounted
                  value={value}
                  open={dialogOpen}
                  onClose={handleCloseShareDialog}
                />
              </CardActions>
            </Box>
        }
      </Box >
  );
}
