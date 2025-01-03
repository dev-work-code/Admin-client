import Dashboard from './Stats'
import EmtStats from "./EmtCases"
import PatientCaseCard from '../LiveCases/LiveCases'

const DashBoard = () => {
    return (
        <>
            <Dashboard />
            <EmtStats />
            <PatientCaseCard />
        </>
    )
}

export default DashBoard