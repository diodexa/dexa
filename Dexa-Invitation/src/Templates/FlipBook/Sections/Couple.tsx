import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation;
}

const Couple = ({ data }: Props) => {
  return (
    <section>
      <h2>Pasangan</h2>

      <p>{data.groom}</p>
      <p>{data.bride}</p>
    </section>
  );
};

export default Couple;