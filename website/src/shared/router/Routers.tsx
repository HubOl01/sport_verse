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
import { CurrentRole, Roles } from '../data/roles';
import Admin from '../../pages/admin/ui/Admin';
import NewsRead from '../../pages/admin/ui/news/NewsRead';
import NewsAdd from '../../pages/admin/ui/news/NewsAdd';
import NewsDetail from '../../pages/admin/ui/news/NewsDetail';
import NewsEdit from '../../pages/admin/ui/news/NewsEdit';
import CommentsAdmin from '../../pages/admin/ui/comments/CommentsAdmin';
import CommentsDetail from '../../pages/admin/ui/comments/CommentsRead';
import TrainingAdmin from '../../pages/admin/ui/trainingPlans/TrainingAdmin';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/login" element={<Sign />} />
      {CurrentRole === Roles.ADMIN && (<Route path="/admin" element={<Admin />} />)}
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/news" element={<NewsRead />} />)}
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/news/add" element={<NewsAdd />} />)}
      <Route path="/news/:id" element={<NewsDetail />} />
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/comments" element={<CommentsAdmin />} />)}
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/training" element={<TrainingAdmin />} />)}
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/comments/:id" element={<CommentsDetail />} />)}
      {CurrentRole === Roles.ADMIN && (<Route path="/admin/news/:id" element={<NewsEdit />} />)}
      <Route path="/register" element={<Register />} />
      <Route path="/training" element={<Training />} />
      <Route path="/stat" element={<StatPage />} />
      <Route path="/training/new" element={<TrainingEdit />} />
      <Route path="/training/:id" element={<TrainingDetail />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
