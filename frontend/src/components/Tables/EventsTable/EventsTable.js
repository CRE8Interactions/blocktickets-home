export default function EventsTable(props) {
  const { events } = props;
  const eventItems = events.map((event, index) =>
    <tr key={index}>
      <td>{event?.name}</td>
      <td>{event?.status}</td>
      <td>{event?.views}</td>
      <td>{event?.capacity}</td>
      <td>{event?.start}</td>
    </tr>
  )

  return(
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Views</th>
            <th scope="col">Capacity</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            eventItems
          }
        </tbody>
      </table>
    </div>
  )
}