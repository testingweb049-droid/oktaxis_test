
import OrderPage from "./order-page";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <OrderPage id={id} />;
}
