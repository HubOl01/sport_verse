import { useQuery } from "react-query";
import { INewModel } from "../../../../shared/model/INewModel";
import { useNavigate, useParams } from "react-router-dom";
import { NewsService } from "../../../../shared/api/news.service";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardNew from "../../../main/ui/cardNew";


export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: newsData,
    isLoading,
    error,
  } = useQuery<INewModel>(['newsDetail', id], () => NewsService.get(id!));


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

        </Toolbar>
      </AppBar>

      <Box sx={{ position: 'relative', minHeight: '100vh', justifyContent: 'center', justifyItems: 'center' }}>
        {!isLoading && !error && (
          <CardNew key={newsData!.id} newModel={newsData!} isClick={false}/>
        )}
      </Box>
    </Box>
  )
}
