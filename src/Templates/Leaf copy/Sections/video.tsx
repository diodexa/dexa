import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Video = ({ data }: Props) => {
  if (!data.video) return null;

  return (
        <div className="relative w-full h-[500px] overflow-hidden "
        style={{background:"transparent"}}>

          <video
            muted
            playsInline
            autoPlay
            loop
            src={data.video}
            className="block w-full h-full object-cover"
          />

        </div>

  );
};

export default Video;