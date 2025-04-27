import { useAuth } from "./shared/utils/useAuth";
import { Roles } from "./shared/data/roles";
import Routers from "./shared/router/Routers";
import Header from "./shared/ui/Header/Header";
import LeftBar from "./shared/ui/LeftBar/LeftBar";
import LeftBarAdmin from "./shared/ui/LeftBar/LeftBarAdmin";
import { useShowHeader } from "./shared/utils/showHeader";

export function AppLayout() {
  const { user: USER } = useAuth();
  // const navigate = useNavigate();
  const isLoggedIn = !!USER?.token;
  const showHeader = useShowHeader();


  return (
    <div className='flex flex-col h-full'>

      {
        showHeader ? <Header /> : null}
      <div className='sm:flex flex-1 sm:overflow-hidden'>
        {location.pathname !== '/login' && location.pathname !== '/register' && isLoggedIn &&
          <div className='w-full max-sm:max-h-[200px] sm:w-[300px] bg-gray-900 overflow-y-auto' style={{ minWidth: "300px" }}>
            {USER.statusUser! === Roles.ADMIN ? <LeftBarAdmin /> : <LeftBar />}
          </div>
        }

        <div className='flex-1 overflow-y-auto'>
          <Routers />
        </div>
      </div>
    </div>
  );
}