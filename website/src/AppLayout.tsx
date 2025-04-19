import { useAuth } from "./shared/utils/useAuth";
import { Roles } from "./shared/data/roles";
import Routers from "./shared/router/Routers";
import Header from "./shared/ui/Header/Header";
import LeftBar from "./shared/ui/LeftBar/LeftBar";
import LeftBarAdmin from "./shared/ui/LeftBar/LeftBarAdmin";

export function AppLayout() {
    const { user: USER } = useAuth();
    // const navigate = useNavigate();

    const isLoggedIn = !!USER?.token;

    return (
        <div className='flex flex-col h-full'>
            {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
            <div className='sm:flex flex-1 sm:overflow-hidden'>
                {location.pathname !== '/login' && location.pathname !== '/register' && isLoggedIn &&
                    <div className='w-full max-sm:max-h-[200px] sm:w-1/6 bg-gray-900 overflow-y-auto' style={{ minWidth: "300px" }}>
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


{/* <div className='flex flex-col h-full'>
{location.pathname !== '/login' && location.pathname !== '/register' ? <Header /> : <></>}

<div className='sm:flex flex-1 sm:overflow-hidden'>
  {location.pathname !== '/login' && location.pathname !== '/register' ?
    isAuthenticated() ?
      (
        <div className='w-full max-sm:max-h-[200px] sm:w-1/6 bg-gray-900 overflow-y-auto' style={{ minWidth: "300px" }}>
          {CurrentRole === Roles.ADMIN ? <LeftBarAdmin /> : <LeftBar />}
        </div>
      ) : <></> : <></>}
  <div className={`flex-1 overflow-y-auto ${location.pathname !== '/login' && location.pathname !== '/register'}`}>

    <Routers></Routers>
  </div>

</div>
</div> */}