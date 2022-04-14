import { useContext, useEffect } from "react";
import OrganizationContext from "../../../context/Organization/Organization";

export default function SalesPage() {
  const orgs = useContext(OrganizationContext)
  
  useEffect(() => {
    console.log(orgs)
  }, [orgs])
  return(
    <h1>Sales Page</h1>
  )
}