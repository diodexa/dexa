import { useParams } from "react-router-dom";
import { invitations } from "../Data/Invitations/Index";
import FlipBook from "../Templates/FlipBook/FlipBook";


const InvitationPage = () => {
  const { slug, guest } = useParams();
  const guestName = decodeURIComponent(guest || "Tamu Undangan");

  console.log(slug);
console.log(invitations);

  const invitation = invitations.find(item => item.slug === slug);

  if (!invitation) {
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <img src="/logo-dio.webp"alt="Logo"className="w-[200px] animate-bounce"/>

        <h2>Oupsss !! Invitation Not Found</h2>
      </div>
    );
  }

  return (
    <FlipBook
      data={invitation}
      guest={guestName}
    />
  );
};

export default InvitationPage;