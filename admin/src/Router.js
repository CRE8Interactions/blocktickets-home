import { Route, Routes } from 'react-router-dom';
import { HomePage, DashboardPage, MyEventPage, EventsPage, CreateEventPage, BasicInfoPage, DetailsPage, PublishPage, OrdersPage, AllOrdersPage, RefundTicketPage, RefundOrdersPage } from './pages';
import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/myevent/:id" element={<DashboardPage />}>
                    <Route index element={<MyEventPage />} />
                    <Route path="basic-info" element={<BasicInfoPage />} />
                    <Route path="details" element={<DetailsPage />} />
                    <Route path="publish" element={<PublishPage />} />
                    <Route path="orders" element={<OrdersPage />}>
                        <Route index element={<AllOrdersPage />} />
                        <Route path="refund/all" element={<RefundOrdersPage />} />
                        <Route path="refund" element={<RefundTicketPage />} />
                    </Route>
                </Route>
                <Route path="events" element={<EventsPage />} />
                <Route path="create" element={<CreateEventPage />} />
                <Route path="create/:id" element={<CreateEventPage />} />
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
