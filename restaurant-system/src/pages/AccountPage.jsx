
import CustomerAccount from "../components/CustomerAccount";

function AccountPage({ orders }) {
  return (
    <div>
      <h1>My Account</h1>

      <p>Manage your customer profile and preferences.</p>

      <CustomerAccount orders={orders} />
    </div>
  );
}

export default AccountPage;
