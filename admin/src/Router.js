import { Route, Routes } from 'react-router-dom';
import { HomePage, DashboardPage, MyEventPage, EventsPage, CreateEventPage, BasicInfoPage, DetailsPage, CreateTicketPage, TicketsPage, ViewTicketsPage, PublishPage, OrdersPage, AllOrdersPage, RefundTicketPage, RefundOrdersPage, AttendeesReportPage, AttendeesListPage, PrimarySalesPage, SecondarySalesPage } from './pages';
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
                    <Route path="tickets" element={<TicketsPage />}>
                        <Route index element={<ViewTicketsPage />} />
                        <Route path="create" element={<CreateTicketPage />} />
                        <Route path='edit' element={<CreateTicketPage />} />
                    </Route>
                    <Route path="publish" element={<PublishPage />} />
                    <Route path="orders" element={<OrdersPage />}>
                        <Route index element={<AllOrdersPage />} />
                        <Route path="refund/all" element={<RefundOrdersPage />} />
                        <Route path="refund" element={<RefundTicketPage />} />
                        <Route path="attendees-report" element={<AttendeesReportPage />} />
                    </Route>
                    <Route path="attendees-list" element={<AttendeesListPage />} />
                    <Route path="primary-sales" element={<PrimarySalesPage />} />
                    <Route path="secondary-sales" element={<SecondarySalesPage />} />
                </Route>
                <Route path="events" element={<EventsPage />} />
                <Route path="create" element={<CreateEventPage />} />
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
