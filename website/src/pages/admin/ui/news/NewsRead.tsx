import { useQuery } from "react-query";
import { NewsService } from "../../../../shared/api/news.service";
import styles from "./News.module.scss";
import { INewModel } from "../../../../shared/model/INewModel";
import CardNew from "../../../main/ui/cardNew";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
export default function NewsRead() {
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, error } = useQuery(['news'], () => NewsService.getAll()
  )

  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  function handleCreateNews() {
    window.location.href = '/admin/news/add';
  }
  const handleScroll = () => {
    const isScrolled = window.scrollY > 0; // Проверяем, прокручен ли документ
    setIsVisible(isScrolled);
  };

  // Добавляем слушатель события прокрутки при монтировании компонента
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Удаляем слушатель при размонтировании
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Плавная прокрутка
    });
  };



  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', justifyContent: 'center', justifyItems: 'center' }}>
      <div className='mt-5'>
        {isLoading && <p className={styles.text}>Загрузка...</p>}
        {/* {error && <p className={styles.text}>Произошла ошибка при загрузке данных.</p>} */}
        {!isLoading && !error && (
          <>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item: INewModel) => (
                <CardNew key={item.id} newModel={item} />
              ))
            ) : (
              <p>Нет планов</p>
            )}
          </>
        )}
      </div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4758d6",
          "&:hover": {
            backgroundColor: "#3a49b3",
          },
        }}
        onClick={handleCreateNews}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="secondary"
        aria-label="scroll-to-top"
        sx={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          backgroundColor: "#6c757d",
          "&:hover": {
            backgroundColor: "#5a6268",
          },
          display: isVisible ? "inline-flex" : "none",
        }}
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  )
}
