import { Route, Routes } from 'react-router-dom'
import Main from '../../pages/main/ui/Main';
import Profile from '../../pages/profile/ui/Profile';
import Settings from '../../pages/settings/ui/Settings';
import Training from '../../pages/training/ui/Training';
import TrainingDetail from '../../pages/training-detail/ui/TrainingRead';
import TrainingEdit from '../../pages/training-edit/ui/TrainingEdit';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/training/" element={<Training />} />
      <Route path="/training/edit/" element={<TrainingEdit />} />
      <Route path="/training/:id" element={<TrainingDetail />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
