import { useEffect } from 'react';
import './Dashboard.scss';

export default function Dashboard() {
  useEffect(() => {
    console.log('Dashboard loaded')
  }, [])
  
  return(
    <div className="container-fluid">
      <h1>Dashboard</h1>
    </div>
  )
}