import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { CompanyStatus } from './company-data';

interface CompanyStatusContextType {
  status: CompanyStatus;
  setStatus: (status: CompanyStatus) => void;
  isApproved: boolean;
}

const CompanyStatusContext = createContext<CompanyStatusContextType>({
  status: 'approved',
  setStatus: () => {},
  isApproved: true,
});

export function CompanyStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<CompanyStatus>('approved');

  return (
    <CompanyStatusContext.Provider
      value={{
        status,
        setStatus,
        isApproved: status === 'approved',
      }}
    >
      {children}
    </CompanyStatusContext.Provider>
  );
}

export function useCompanyStatus() {
  return useContext(CompanyStatusContext);
}
