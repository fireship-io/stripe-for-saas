import CheckoutButton from "./CheckoutButton";
import EmbeddedCheckoutButton from "./EmbeddedCheckoutButton";
import PortalButton from "./portal/PortalButton";
import UserProfile from "./user/UserProfile";

export default function Home() {
  return (
    <>
      <CheckoutButton />
      <EmbeddedCheckoutButton />
    </>
  );
}
