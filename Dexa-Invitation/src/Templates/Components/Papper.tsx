interface Props {
  children: React.ReactNode;
  index: number;
  rotate: number;
  totalPages: number;
}

const Paper = ({
  children,
  index,
  rotate,
  totalPages,
}: Props) => {
  // console.log(index, rotate);
  return (
    <div
      className="buku__Kertas"
      style={{
        zIndex: rotate > 90 ? index : totalPages - index,
        transform: `rotateY(${-rotate}deg)`,
        }}>
      {children}
    </div>
  );
};

export default Paper;