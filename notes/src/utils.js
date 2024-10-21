//preventing card to go out of bounds
export const setNewOffset = (card, mouseMoveDir = {x : 0, y : 0}) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;//gives current horizontal distance of card from left edge
    const offsetTop = card.offsetTop - mouseMoveDir.y;//gives current vertical distance of card from top edge

    return{
        x : offsetLeft < 0 ? 0 : offsetLeft,//if horizontal position is less than 0, set x to 0 
        y : offsetTop < 0 ? 0 : offsetTop,//if vertical position is less than 0, set y to 0
    };
}

export const autoGrow = (textAreaRef) => {
  //first resets the height to auto, then sets it to scrollHeight, which is the total height of the content
  const { current } = textAreaRef;//current is reference to actual dom ie textarea
  current.style.height = "auto";//resets the height to prevent infinite growing
  current.style.height = current.scrollHeight + "px";//total height
};

export const setZIndex = (selectedCard) => {
  //controls the stacking order 
  selectedCard.style.zIndex = 999; //sets z index of selected card to higher value

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    //decreases z index of others
    if (card !== selectedCard) {
      //if it's not selected card, it adjusts its z index 1 less than the selected card
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}