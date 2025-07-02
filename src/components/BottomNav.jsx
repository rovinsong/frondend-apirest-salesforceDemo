import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/accounts');
        break;
      case 2:
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction label="Inicio" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Cuentas" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Contáctanos" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

export default BottomNav;
