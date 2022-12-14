import { Route, Routes } from 'react-router-dom';
import {
    HomePage,
    SearchPage,
    LoginPage,
    TicketsPage,
    CheckoutPage,
    VenuePage,
    MyEventsPage,
    EventDetailsPage,
    MyTransfersPage,
    MyListingsPage,
    MyCollectablesPage,
    SettingsPage,
    SettingsOptionsPage,
    PersonalDetailsPage,
    LoginSecurityPage,
    WithdrawInvoicesPage,
    InvoicePage,
    PaymentInformationPage,
    PrivacyPolicyPage,
    TermsConditionsPage,
    PurchasePolicyPage,
    CookiesPolicyPage,
    DisclaimerPage
} from './pages';
import { ScrollToTop } from './components';
import { RequireAuth } from './context/Authorization/useAuth';

/**
 * @description Handle all the routes
 */

const Router = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="tickets/:id" element={<TicketsPage />} />
                <Route
                    path="checkout"
                    element={
                        <RequireAuth>
                            <CheckoutPage />
                        </RequireAuth>
                    }
                />
                <Route path="venue/:id" element={<VenuePage />} />
                <Route path="my-events" element={<MyEventsPage />} />
                <Route path="event-details/:orderId" element={<EventDetailsPage />} />
                <Route path="my-transfers" element={<MyTransfersPage />} />
                <Route path="my-listings" element={<MyListingsPage />} />
                <Route path="my-collectables" element={<MyCollectablesPage />} />
                <Route path="settings" element={<SettingsPage />}>
                    <Route index element={<SettingsOptionsPage />} />
                    <Route path="personal-details" element={<PersonalDetailsPage />} />
                    <Route path="login-security" element={<LoginSecurityPage />} />
                    <Route path="withdraw-invoices" element={<WithdrawInvoicesPage />} />
                    <Route path="withdraw-invoices/invoice/:id" element={<InvoicePage />} />
                    <Route path="payment-information" element={<PaymentInformationPage />} />
                </Route>
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-conditions" element={<TermsConditionsPage />} />
                <Route path="purchase-policy" element={<PurchasePolicyPage />} />
                <Route path="cookies-policy" element={<CookiesPolicyPage />} />
                <Route path="disclaimer" element={<DisclaimerPage />} />
            </Routes>
        </ScrollToTop>
    );
};

export default Router;
