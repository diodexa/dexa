import { useParams } from "react-router-dom";
import { invitations } from "../Data/Invitations/Index";

import FlipBook from "../Templates/FlipBook/FlipBook";

import GroupChat from "../Templates/GroupChat/GroupChat";
import Monochrome from "../Templates/Monochrome/Monochrome";
import JourneyLeaf from "../Templates/Leaf/Leaf";
import JourneyCream from "../Templates/Leaf copy/Leaf";

const InvitationPage = () => {
  const { slug, guest } = useParams();

  const guestName = decodeURIComponent(
    guest || "Tamu Undangan"
  );

  const invitation = invitations.find((item) => item.slug === slug);
  console.log("SLUG URL:", slug);
  if (!invitation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="/logo-dio.webp"
          alt="Logo"
          className="w-[200px] animate-bounce"
        />

        <h2>Oupsss !! Invitation Not Found</h2>
      </div>
    );
  }

  switch (invitation.template) {
    case "FlipBook":
      return (
        <FlipBook data={invitation} guest={guestName}/>
      );

    case "JouneyLeaf":
      return (<JourneyLeaf data={invitation} guest={guestName}/>
      );
      
    case "JourneyCream":
      return (<JourneyCream data={invitation} guest={guestName}/>
      );
      
    case "GroupChat":
      return (<GroupChat data={invitation} guest={guestName}/>
      );
      
    case "Monochrome":
      return (<Monochrome data={invitation} guest={guestName}/>
      );
    default:
      return (
        <div className="flex items-center justify-center h-screen">
          <h2>Template "{invitation.template}" tidak ditemukan.</h2>
        </div>
      );
  }
};

export default InvitationPage;