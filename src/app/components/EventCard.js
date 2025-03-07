const EventCard = ({ event }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="font-bold text-xl">{event.titre}</h2>
        <p className="text-sm text-gray-500">{event.date}</p>
        <p className="mt-2">{event.description}</p>
        <p className="mt-2 text-sm">Lieu : {event.lieu}</p>
        <p className="mt-2">Participants : {event.nombreMaxParticipants}</p>
        <button className="mt-4 bg-blue-500 text-white p-2 rounded">Voir plus</button>
      </div>
    );
  };
  
  export default EventCard;
  