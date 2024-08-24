export const calcPercent = (items:number, totalItems:number) => {
  const percent = (items/totalItems) * 100;
  return percent;
}

export const getMotivationalPhrase = (percent: number) => {
  let motivationalPhrase = 'Vamos começar';
  let bgColor = "#1E1E1E";
  if(percent > 10 && percent <= 40) {
    motivationalPhrase = "Continue assim!"
    bgColor = "#895F05";
  } else if (percent > 50 && percent <= 70) {
    motivationalPhrase = "Quase Lá"
    bgColor = "#895F05";
  } else if (percent > 70 && percent <= 90) {
    motivationalPhrase = "Só mais um pouco"
    bgColor = "#895F05";
  } else if (percent === 100) {
    motivationalPhrase = "Você conseguiu!"
    bgColor = '#035F54';
  }

  return { motivationalPhrase, bgColor };
}