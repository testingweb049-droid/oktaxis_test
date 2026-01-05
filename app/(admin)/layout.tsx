import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getAdminServerSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAdminServerSession();

  if (!session) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}



