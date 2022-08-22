import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './context/Auth/Auth';

import {
    LoginPage,
    ForgotPasswordPage, SignUpPage, HomePage, ReportsPage, DashboardPage, MyEventPage, CreateEventPage, BasicInfoPage, DetailsPage, CreateTicketPage, TicketsPage, ViewTicketsPage, PublishPage, OrdersPage, AllOrdersPage, RefundTicketPage, RefundOrdersPage, AttendeesReportPage, AttendeesListPage, PrimarySalesPage, SecondarySalesPage, AutomaticReportingPage, ViewAutomaticReportingPage, UserInformationPage, ContactAttendeesPage, ViewContactAttendeesPage, ContactAttendeePage, TrackingLinksPage, ViewTrackingLinksPage, TrackingLinkPage, GuestListPage, ViewGuestListPage, GuestInformationPage, CheckInPage, SettingsPage, OrganizationInfoPage, TeamManagementPage, SecurityPage, PaymentInformationPage, PayoutsPage, TaxStatusPage
} from './pages';

import { ScrollToTop } from './components';

/**
 * @description Handle all the routes
 */

const Router = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/myevent/:uuid" element={<RequireAuth><DashboardPage /></RequireAuth>}>
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
                    <Route path="guest-list" element={<GuestListPage />} >
                        <Route index element={<ViewGuestListPage />} />
                        <Route path="add" element={<GuestInformationPage />} />
                        <Route path="edit" element={<GuestInformationPage />} />
                    </Route>
                    <Route path="check-in" element={<CheckInPage />} />
                    <Route path="primary-sales" element={<PrimarySalesPage />} />
                    <Route path="secondary-sales" element={<SecondarySalesPage />} />
                    <Route path="automatic-reporting" element={<AutomaticReportingPage />}>
                        <Route index element={<ViewAutomaticReportingPage />} />
                        <Route path="add" element={<UserInformationPage />} />
                        <Route path="edit" element={<UserInformationPage />} />
                    </Route>
                    <Route path="contact-attendees" element={<ContactAttendeesPage />} >
                        <Route index element={<ViewContactAttendeesPage />} />
                        <Route path="add" element={<ContactAttendeePage />} />
                        <Route path="edit" element={<ContactAttendeePage />} />
                    </Route>
                    <Route path="tracking-links" element={<TrackingLinksPage />} >
                        <Route index element={<ViewTrackingLinksPage />} />
                        <Route path="add" element={<TrackingLinkPage />} />
                        <Route path="edit" element={<TrackingLinkPage />} />
                    </Route>
                </Route>
                <Route path="reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
                <Route path="create" element={<RequireAuth><CreateEventPage /></RequireAuth>} />
                <Route path="settings" element={<SettingsPage />}>
                    <Route path="organization-information" element={<OrganizationInfoPage />} />
                    <Route path="team-management" element={<TeamManagementPage />} />
                    <Route path="security" element={<SecurityPage />} />
                    <Route path="payment-information" element={<PaymentInformationPage />} />
                    <Route path="payouts" element={<PayoutsPage />} />
                    <Route path="tax-status" element={<TaxStatusPage />} />
                </Route>
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
