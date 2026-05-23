import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation
}

const CoverBack = ({data}: Props) => {
  return (
    <div className="Kertas__half Kertas__half--back  bg-gray-200 flex flex-col items-center h-full justify-center">
      <img src={data.coverImage} alt="" style={{objectFit:"cover"}}/>
    </div>
  );
};

export default CoverBack;