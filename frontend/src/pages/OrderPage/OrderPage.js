import { useEffect, useState } from "react"
import { getOrder } from "../../utilities/api"
import { useParams } from "react-router-dom";
import { SwiperNavigationButtons, UpcomingEventsSlider } from "../../components";

export default function OrderPage() {
  let { id } = useParams()
  const [order, setOrder] = useState('')
  useEffect(() => {
    getOrder(id)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err))
  }, [])
  return(
    <section className="spacer">
			<div className="section-heading">
				<h1>Tickets</h1>
				<SwiperNavigationButtons />
			</div>
			<UpcomingEventsSlider order={order} tickets={order?.tickets} />
		</section>
  )
}