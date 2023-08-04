import ServicesList from "@/components/admin/services/list/ServicesList";
import AdminLayout from "@/layout/admin/AdminLayout";

export default function ServicesListAdminPage() {
  return (
    <AdminLayout>
      <ServicesList />
    </AdminLayout>
  );
}
