// /pages/dashboard/index.tsx
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/dashboard/analytics", permanent: false },
  };
};

export default function DashboardIndex() {
  return null;
}
