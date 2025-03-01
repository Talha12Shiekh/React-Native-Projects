export const RED_COLOR = '#3b161d';
export const WHITE_COLOR = '#fff';
export const GREY_COLOR = '#2b2b2b';
export const BG_COLOR = '#010101';
export const BLUE_BTN_BG = '#4a4b84';
export const LIGHT_BLUE_BTN_BG = '#4a4b8482';

export const formatText = (txt,type) => {
  if (type === 'miliseconds' || type === 'hours') {
    if (txt >= 100) return '00';
  }
  
  if(type === "seconds" || type === "minutes"){
    if (txt >= 60) return '00';
  }
  return String(txt).padStart(2, '0'); 
};

export const center = {
  alignItems: 'center',
  justifyContent: 'center',
};
