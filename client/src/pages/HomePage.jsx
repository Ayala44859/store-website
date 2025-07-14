import React from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ייבוא מודולים נדרשים מ-Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// ייבוא קבצי העיצוב של Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HomePage.css'; // ניתן לשמור על קובץ זה לסטיילינג ייחודי אם צריך

import sale1 from '../assets/images/sale1.png';
import sale2 from '../assets/images/sale2.png';
import sale3 from '../assets/images/sale3.png';
import vegatables from '../assets/images/vegatables.png';

const HomeScreen = () => {
  const navigate = useNavigate();

  const images = [sale1, sale2, sale3];

  const handleStartShopping = () => {
    navigate('/productList');
  };

  return (
    // שימוש ב-Box מ-MUI לפריסה גמישה וממורכזת
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 2 }}>
      
      <div id='imgCaption'>
        <img
          id='homePageImg'
          src={vegatables}
          alt="Vegatables"
        />
        <div id='caption'>
          <Typography variant="h4" sx={{ color: '#222', mb: 1, textAlign: 'center' }}>
            סופרקל מזמינה אותך
          </Typography>
          <Typography variant="h4" sx={{ color: '#1976d2', mb: 2, textAlign: 'center' }}>
            לחווית קניות פשוטה ומהירה
          </Typography>
        </div>
      </div>

      {/* שימוש ב-Box למרכוז הכפתור במקום margin קשיח */}
      <Box sx={{ my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartShopping}
          size="large"
          sx={{
            borderRadius: "20px",
            height: "70px",
            px: 4 // Padding أفقي להגדלת הרוחב לפי התוכן
          }}
        >
          <Typography variant="h6" component="span" sx={{ ml: 1 }}>התחלת קניה</Typography>
          <ShoppingCartIcon />
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderRadius: "15px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1000px", // הגבלת רוחב מקסימלי
          margin: "0 auto",
        }}
      >
        <Swiper
          // הוספת מודולים שהתקנו
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }} // מאפשר ניווט עם נקודות
          navigation={true} // מוסיף חיצי ניווט
        >
          {images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <img
                src={imgSrc}
                alt={`Slide ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    </Box>
  );
};

export default HomeScreen;