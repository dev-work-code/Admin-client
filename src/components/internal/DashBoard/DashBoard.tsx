import Dashboard from './Stats'
import EmtStats from "./EmtCases"
import PatientCaseCard from '../LiveCases/LiveCases'
import AmbulanceStatsChart from './BarChart'

const DashBoard = () => {
  return (
    <>
      <div className='p-4'>
        <h1 className='text-[#013DC0] text-2xl ml-14'>Dashboard</h1>
        <Dashboard />
        <div className='flex flex-row items-center justify-center gap-8'>
          <AmbulanceStatsChart />
          <EmtStats />
        </div>
        <div className='mt-8'>
          <h1 className='text-[#013DC0]  text-2xl mb-4 ml-14'>Live Cases</h1>
          <PatientCaseCard withCard={false} />
        </div>
      </div>
    </>
  )
}

export default DashBoard