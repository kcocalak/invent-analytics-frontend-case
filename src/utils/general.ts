export const handleRate = (rate: string) => {
  if (rate.includes("/")) {
    const newRate = rate.split("/");
    // Internet Movie Database points come like 9.2/10
    if (+newRate[1] === 10) {
      return +newRate[0] / 2;
      // Metacritic points come like 100/100
    } else {
      return +newRate[0] / 20;
    }
  }
  //Rotten Tomatoes points come like 97%
  if (rate.includes("%")) {
    const newRate = rate.split("%");
    return parseInt(newRate[0]) / 20;
  }
  //imdb points come like 9.2
  else {
    return parseInt(rate) / 2;
  }
};
