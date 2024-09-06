import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col mt-24">
      {children}
    </div>
  );
}
export { Layout };