import { Route, Routes } from 'react-router-dom'
import Main from '../../pages/main/ui/Main';
import Profile from '../../pages/profile/ui/Profile';
import Settings from '../../pages/settings/ui/Settings';
import TrainingRead from '../../pages/training-read/ui/TrainingRead';
import TrainingEdit from '../../pages/training-edit/ui/TrainingEdit';

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/training/:id" element={<TrainingRead />} />
      <Route path="/training/:id/edit" element={<TrainingEdit />} />
      <Route path="/settings" element={<Settings />} />

      {/* <Route path="/project/:id" element={<DetailProject />} /> */}
    </Routes>
  );
}
