// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import axios from 'axios';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);    
  const router = useRouter(); 

  useEffect(() => {
 
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return; 
    }

    const fetchEvents = async () => {
      try {
    
        const response = await axios.get('http://localhost:8000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvents(response.data); // Mettre à jour la liste des événements
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des événements.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);  // Une fois les données récupérées, arrêter le chargement
      }
    };

    fetchEvents(); // Appeler la fonction pour récupérer les événements au chargement
  }, [router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Tableau de bord des événements sportifs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>Aucun événement disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
