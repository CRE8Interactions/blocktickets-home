import { useContext, useState, useEffect } from "react";
import OrganizationContext from "../../../context/Organization/Organization";
import { EventsTable } from "../../../components";

export default function EventsPage() {
  const data = useContext(OrganizationContext)
  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(data.orgs[0].events)
  }, [])

  return(
    <div className="col-12">
      <EventsTable events={events} />
    </div>
  )
}