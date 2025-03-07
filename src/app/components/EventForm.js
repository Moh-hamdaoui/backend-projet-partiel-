// 1. Amélioration du EventForm pour rediriger après soumission
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EventForm = ({ eventData, onSuccess }) => {
  const [titre, setTitre] = useState(eventData?.titre || '');
  const [description, setDescription] = useState(eventData?.description || '');
  const [date, setDate] = useState(eventData?.date || '');
  const [lieu, setLieu] = useState(eventData?.lieu || '');
  const [nombreMaxParticipants, setNombreMaxParticipants] = useState(eventData?.nombreMaxParticipants || 0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    
    const eventPayload = { titre, description, date, lieu, nombreMaxParticipants: parseInt(nombreMaxParticipants) };

    try {
      if (eventData?.id) {
        // Update the event
        await axios.put(`http://localhost:8000/api/events/${eventData.id}`, eventPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create a new event
        await axios.post('http://localhost:8000/api/events', eventPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'événement', error);
      setError('Une erreur est survenue lors de la sauvegarde de l\'événement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <div>
        <label className="block mb-1">Titre</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Lieu</label>
        <input
          type="text"
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Nombre Max Participants</label>
        <input
          type="number"
          value={nombreMaxParticipants}
          onChange={(e) => setNombreMaxParticipants(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          min="1"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'En cours...' : (eventData?.id ? 'Mettre à jour l\'événement' : 'Créer un événement')}
      </button>
    </form>
  );
};

export default EventForm;