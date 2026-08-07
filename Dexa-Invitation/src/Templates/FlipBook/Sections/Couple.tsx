import type { Invitation } from "../../../types/invitationFlipBook";

interface Props {
  data: Invitation;
}

const Couple = ({ data }: Props) => {
  return (
    <section>
      <h2>Pasangan</h2>

      <p>{data.Namagroom}</p>
      <p>{data.Namabride}</p>
    </section>
  );
};

export default Couple;