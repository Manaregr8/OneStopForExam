import type { ReactNode } from "react";

export function HomeContainer({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}
