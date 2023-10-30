function ProjectDetail({ pairAddress }) {
    const { data: tokenA } = useContractRead({
      address: pairAddress,
      abi: "abi",
      functionName: "tokenA"
    });
  
    const { data: tokenB } = useContractRead({
      address: pairAddress,
      abi: "abi",
      functionName: "tokenB"
    });
  
    let price = 0;
    if (tokenA && tokenB) {
      price = tokenB / tokenA;
    }
  
    const { data: end_time } = useContractRead({
      address: pairAddress,
      abi: "abi",
      functionName: "end_time"
    });
  
    const calculateTimeLeft = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDiff = end_time - currentTime;
  
      const hours = Math.floor(timeDiff / 3600);
      const minutes = Math.floor((timeDiff % 3600) / 60);
      const seconds = timeDiff % 60;
  
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  
    const timeLeft = end_time ? calculateTimeLeft() : "Loading...";
  
    return (
      <></>
    );
  }
  