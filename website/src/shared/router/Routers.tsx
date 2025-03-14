import { Route, Routes } from 'react-router-dom'
import Profile from '../../pages/profile/ui/Profile';
import Settings from '../../pages/settings/ui/Settings';
import Training from '../../pages/training/ui/Training';
import TrainingDetail from '../../pages/training-detail/ui/TrainingRead';
import TrainingEdit from '../../pages/training-new/ui/TrainingNew';
import Sign from '../../pages/sign-in/ui/Sign';
import Register from '../../pages/sign-in/ui/Register';
import { PrivateRoute } from './privateRoute';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Sign />} />
      <Route path="/register" element={<Register />} />
      <Route path="/training" element={<Training />} />
      <Route path="/training/new" element={<TrainingEdit />} />
      <Route path="/training/:id" element={<TrainingDetail />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
