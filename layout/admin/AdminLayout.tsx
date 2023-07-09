import { ReactNode } from "react";
import AdminNavbar from "./adminNavbar/AdminNavbar";
import AdminSidebar from "./adminSidebar/AdminSidebar";
import { AuthContextProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/guards/AuthGuard";

interface IAdminMainLayout {
  children: ReactNode;
}

export default function AdminLayout(props: IAdminMainLayout) {
  return (
    <AuthContextProvider>
      <AuthGuard>
        <AdminNavbar />
        <div className="p-4 md:p-8 sm:ml-64">{props.children}</div>
      </AuthGuard>
    </AuthContextProvider>
  );
}
