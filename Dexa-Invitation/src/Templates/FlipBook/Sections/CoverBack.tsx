import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const CoverBack = ({data}: Props) => {
  return (
    <div className="Kertas__half Kertas__half--back  bg-gray-200 flex flex-col items-center h-full justify-center">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci rem optio placeat eaque quibusdam tempore officiis labore natus earum. Aspernatur.</p>
    </div>
  );
};

export default CoverBack;