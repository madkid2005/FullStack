import React from 'react';

export default function Footer() {
  return (
    <div className='container-fluid bg-blue100 mt-5'>
      <div className='row'>
        <div className='col-lg-3 col-sm-6 mt-5'>
          <h4 className='text-center text-white text-bold '> <i className='bi bi-shop m-2'></i>فروشگاه بزرگ تک خرید</h4>
          <p className='text-white text-center'>تازه و بروز خرید کنید</p>
          <p className='text-white text-center h5'>
          <span className='bi m-2  bi-instagram'></span>
          <span className='bi m-2  bi-facebook'></span>
          <span className='bi m-2  bi-twitter'></span>
        </p>
        </div>
        <div className='col-lg-6 d-none d-lg-block'></div>
        <div className='col-lg-3 col-sm-6 mt-5'>
        <h6 className='text-start text-white text-bold '> <i className='bi bi-person-rolodex m-2'></i>پشتیبانی میخواهید ؟</h6>
        <p className='text-white text-start m-2'>24 در حال پاسخگویی هستیم</p>
        <h5 className='text-start text-white text-bold '> <i className='bi bi-phone m-2'></i> 09964300456</h5>
        <h5 className='text-start text-white text-bold '> <i className='bi bi-envelope-at m-2'></i> TakKharidshop@gmail.com</h5>

        
        </div>
      </div>
    </div>
  );
}
