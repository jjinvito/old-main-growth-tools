import React from 'react'
import KeyFeatures from './key_features/KeyFeatures'
import UseCase from './use_case/UseCase'
import Advertisement from './advertisement/Advertisement'
export default function feature() {
  return (
    <div className=' flex flex-col gap-12 sticky top-0'>
      <KeyFeatures/>
      <UseCase/>
      <Advertisement/>
    </div>
  )
}
