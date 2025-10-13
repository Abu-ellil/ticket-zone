
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Ticket } from '../types';

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  removeTicket: (seatId: string) => void;
  clearTickets: () => void;
  totalPrice: number;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const addTicket = (ticket: Ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  const removeTicket = (seatId: string) => {
    setTickets((prevTickets) => prevTickets.filter((t) => t.seatId !== seatId));
  };

  const clearTickets = () => {
    setTickets([]);
  };

  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <TicketContext.Provider value={{ tickets, addTicket, removeTicket, clearTickets, totalPrice }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
