import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/profile/ui/Profile';
import Settings from '../../pages/settings/ui/Settings';
import Training from '../../pages/training/ui/Training';
import TrainingDetail from '../../pages/training-detail/ui/TrainingRead';
import TrainingEdit from '../../pages/training-new/ui/TrainingNew';
import Sign from '../../pages/sign-in/ui/Sign';
import Register from '../../pages/sign-in/ui/Register';
import { PrivateRoute } from './privateRoute';
import StatPage from '../../pages/stat/ui/StatPage';
import { Roles } from '../data/roles';
import Admin from '../../pages/admin/ui/Admin';
import NewsRead from '../../pages/admin/ui/news/NewsRead';
import NewsAdd from '../../pages/admin/ui/news/NewsAdd';
import NewsDetail from '../../pages/admin/ui/news/NewsDetail';
import NewsEdit from '../../pages/admin/ui/news/NewsEdit';
import CommentsAdmin from '../../pages/admin/ui/comments/CommentsAdmin';
import CommentsDetail from '../../pages/admin/ui/comments/CommentsRead';
import TrainingAdmin from '../../pages/admin/ui/trainingPlans/TrainingAdmin';
import Search from '../../pages/search/ui/Search';
import TrainingGroups from '../../pages/groups/ui/TrainingGroups';
import GroupDetail from '../../pages/groups/ui/GroupDetail';
import { useAuth } from '../utils/useAuth';

export default function Routers() {
  const { user: USER } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/login" element={<Sign />} />
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin" element={<Admin />} />)}
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/news" element={<NewsRead />} />)}
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/news/add" element={<NewsAdd />} />)}
      <Route path="/news/:id" element={<NewsDetail />} />
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/comments" element={<CommentsAdmin />} />)}
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/training" element={<TrainingAdmin />} />)}
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/comments/:id" element={<CommentsDetail />} />)}
      {USER.statusUser === Roles.ADMIN && (<Route path="/admin/news/:id" element={<NewsEdit />} />)}
      <Route path="/register" element={<Register />} />
      <Route path="/training" element={<Training />} />
      <Route path="/training/private" element={<Training isPrivate />} />
      <Route path="/search" element={<Search />} />
      <Route path="/stat" element={<StatPage />} />
      <Route path="/training/new" element={<TrainingEdit />} />
      <Route path="/training/:id" element={<TrainingDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/search/groups" element={<Search />} />
      <Route path="/my-groups" element={<TrainingGroups myGroups/>} />
      <Route path="/group/:id" element={<GroupDetail />} />
      <Route path="/group/:id/training" element={<GroupDetail />} />
    </Routes>
  );
}
