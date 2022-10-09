import { createContext } from 'react';

const TicketContext = createContext({
  tickets: [],
  listings: [],
  generalAdmissionTicket: {},
  generalAdmissionCount: 0,
});

export default TicketContext;