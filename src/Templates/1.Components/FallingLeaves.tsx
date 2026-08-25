const FallingLeaves = () => {
  return (
    <div className="absolute inset-0 z-[9999] pointer-events-none overflow-hidden">

      <img src="/Ornament/daun1.png" alt="" 
        className="absolute top-[-10%] left-[10%] w-5 "
        style={{ animation: "fall 10s linear infinite"}}/>

      <img src="/Ornament/daun2.png" alt=""
        className="absolute top-[-10%] left-[40%] w-5 "
        style={{animation: "fall 12s linear infinite",animationDelay: "2s"}}/>

      <img src="/Ornament/daun1.png" alt=""
        className="absolute top-[-10%] left-[70%] w-5 "
        style={{animation: "fall 14s linear infinite", animationDelay: "4s"}}/>

      <img src="/Ornament/daun2.png" alt=""
        className="absolute top-[-10%] left-[90%] w-5 "
        style={{animation: "fall 10s linear infinite",animationDelay: "6s"}}/>

    </div>
  );
};

export default FallingLeaves;