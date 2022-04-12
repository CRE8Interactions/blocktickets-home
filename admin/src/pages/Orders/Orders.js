import { useEffect } from "react"
export default function Orders() {
  useEffect(() => {
    console.log('Orders loaded')
  }, [])
  return (
    <h1>Orders</h1>
  )
}