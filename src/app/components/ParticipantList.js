export default function ParticipantList({ participants }) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Participants</h2>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id} className="bg-gray-100 p-4 mb-2 rounded">
              <p>{participant.nom}</p>
              <p>{participant.email}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  