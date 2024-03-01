import React from 'react'
import DomyShoot from './domy_shoot/DomyShoot'
import ScreenShots from './screen_shots/ScreenShots'
import Marketing from './marketing/Description&Marketing'
import  AdsManagement from './ads_managements/AdsManagement'


export default function INewsLetters() {
  return (
    <div className=' flex flex-col gap-12'>
      <DomyShoot/>
      <ScreenShots/>
      <Marketing/>
      <AdsManagement/>

    </div>
  )
}
