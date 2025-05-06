import { useAuth } from "./shared/utils/useAuth";
import { Roles } from "./shared/data/roles";
import Routers from "./shared/router/Routers";
import Header from "./shared/ui/Header/Header";
import LeftBar from "./shared/ui/LeftBar/LeftBar";
import LeftBarAdmin from "./shared/ui/LeftBar/LeftBarAdmin";
import { useShowHeader } from "./shared/utils/showHeader";
import { useSmallScreen } from "./shared/utils/displaySizes";
import { Drawer } from "@mui/material";
import { useState } from "react";
import HeaderSmall from "./shared/ui/Header/HeaderSmall";

export function AppLayout() {
  const { user: USER } = useAuth();
  // const navigate = useNavigate();
  const isLoggedIn = !!USER?.token;
  const showHeader = useShowHeader();
  const isSmallScreen = useSmallScreen();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <div className='flex flex-col h-full'>

      {
        showHeader ? <Header /> : null}
      <div className='sm:flex flex-1 sm:overflow-hidden'>
        {location.pathname !== '/login' && location.pathname !== '/register' && isLoggedIn &&
          <div className='w-full max-sm:max-h-[200px] sm:w-[300px] bg-gray-900 overflow-y-auto' style={{ minWidth: "300px" }}>
            {isSmallScreen ? null : USER.statusUser! === Roles.ADMIN ? <LeftBarAdmin /> : <LeftBar />}
          </div>
        }
        {isSmallScreen ? <HeaderSmall open={open} onOpen={toggleDrawer(true)} /> : null}
        {
          isSmallScreen ?
            <Drawer
              anchor="left"
              open={open}
              onClose={toggleDrawer(false)}
              sx={{
                // Стиль для области вокруг Drawer (фон)
                "& .MuiBackdrop-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение фона
                },
                "& .MuiPaper-root": {
                  width: "350px", // Ширина Drawer
                  backgroundColor: "rgb(17, 24, 39)", // Цвет фона Drawer
                  color: "#fff", // Цвет текста внутри Drawer
                },
              }}
            >
              {/* Содержимое Drawer */}
              <div
                role="presentation"
                onClick={toggleDrawer(false)} // Закрытие Drawer при клике внутри
                onKeyDown={toggleDrawer(false)} // Закрытие Drawer при нажатии клавиши
              >
                {USER.statusUser === Roles.ADMIN ? <LeftBarAdmin /> : <LeftBar />}
              </div>
            </Drawer>
            : null
        }

        <div className={`flex-1 ${isSmallScreen ? "" : 'overflow-y-auto'}`}>
          <Routers />
        </div>
      </div>
    </div>
  );
}