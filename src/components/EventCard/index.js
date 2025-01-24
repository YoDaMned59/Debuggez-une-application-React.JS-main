import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  events = [], // Liste complète des événements
  imageSrc = "image",
  imageAlt= "alt-image",
  date = new Date(), // date par défaut en attendant d'en avoir une
  title = "titre",
  label= "etiquette",
  small = false,
  ...props
}) => {

 // Si une liste d'événements est passée, on calcule le dernier événement
 const lastEvent = events
 ?.filter((event) => event.date) // Garder uniquement les événements avec une date valide
 .sort((a, b) => new Date(b.date) - new Date(a.date))[0]; // Trier par date décroissante

// Si un dernier événement existe, on utilise ses données
const eventDate = lastEvent ? new Date(lastEvent.date) : date;
  // Ici, on vérifie la date
  const validDate = date instanceof Date ? date : new Date(eventDate);
  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      {/* Image de la carte */}
      <div className="EventCard__imageContainer" id="">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      {/* Description de la carte */}
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
 {/* On utilise `getMonth` pour afficher le mois correct */}
        <div className="EventCard__month">{getMonth(validDate)}</div>
      </div>
    </div>
  );
};


EventCard.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      cover: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,

    })
  ),







  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  events: [],
  imageAlt: "image",
  small: false,
}

export default EventCard;