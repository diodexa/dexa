import type { Invitation } from "../../../types/invitation";

interface Props {
  data: Invitation;
  guest?: string;
}

const CoverFront = ({
  data,
  guest,
}: Props) => {
  return (
    <div className="Kertas__half Kertas__half--front">

      <div className="sampul">

        <h5>The Wedding Of</h5>

        <h2>
          {data.bride} & {data.groom}
        </h2>

        <div className="containerSampul">

          <img
            src={data.coverImage}
            alt="cover"
          />

          <div className="hover" />

          <h5>{data.date}</h5>

          <p>{guest}</p>

        </div>
      </div>
    </div>
  );
};

export default CoverFront;