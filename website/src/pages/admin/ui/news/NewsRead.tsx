import { useQuery } from "react-query";
import { NewsService } from "../../../../shared/api/news.service";
import styles from "./News.module.scss";
import { INewModel } from "../../../../shared/model/INewModel";
import CardNew from "../../../main/ui/cardNew";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useRef, useState } from "react";
export default function NewsRead() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = useQuery(['news'], () => NewsService.getAll()
  )

  // if (isLoading) return <p className={styles.text}>Загрузка...</p>;
  // if (error) return <p className={styles.text}>Произошла ошибка при загрузке данных.</p>;
  function handleCreateNews() {
    window.location.href = '/admin/news/add';
  }
  const handleScroll = () => {
    if (containerRef.current) {
      const isScrolled = containerRef.current.scrollTop > 0;
      setIsVisible(isScrolled);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };



  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative', justifyContent: 'center', justifyItems: 'center',
      }}>
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
              <p>Нет новостей</p>
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
