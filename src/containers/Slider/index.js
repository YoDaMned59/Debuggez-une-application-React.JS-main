import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  let byDateDesc = null;
  if (data && data.focus && data.focus.length > 0) {
      byDateDesc = data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
    );
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 5000);
  
    return () => clearInterval(intervalId); // Nettoyage de l'intervalle
  }, [byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}`}> 
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum"/>
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={[event.title, '-', radioIdx].join()} // ajout de la clé pour éviter les erreurs de clé
                  type="radio"
                  name="radio-button"
                  readOnly
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;