import React from 'react'
import Headers from '../Header/Headers'
import TeacherAllotment from '../TeacherAllotment'

const AllotmentTeacher = () => {
  return (
    <div className='admin-container'>
        <Headers/>
        <div className='overflow-y-scroll sm:pr-5'>
        <TeacherAllotment/>
        </div>
    </div>
  )
}

export default AllotmentTeacher