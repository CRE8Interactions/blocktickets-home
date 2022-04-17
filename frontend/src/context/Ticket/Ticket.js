import { createContext } from 'react';

const TicketContext = createContext({
  tickets: [],
  generalAdmissionTicket: {},
  generalAdmissionCount: 0,
});

export default TicketContext;