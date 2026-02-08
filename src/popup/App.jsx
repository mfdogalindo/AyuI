import { useState, useEffect } from 'react';
import './App.css';
import { investigationRepository } from '../lib/storage';
import { InvestigationForm } from './components/InvestigationForm';
import { InvestigationList } from './components/InvestigationList';
import { Timeline } from './components/Timeline';

function App() {
  const [investigations, setInvestigations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeInvestigation, setActiveInvestigation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'timeline'

  const loadData = async () => {
    try {
      const storedInvestigations = await investigationRepository.getAll();
      const storedActiveId = await investigationRepository.getActiveId();
      setInvestigations(storedInvestigations);
      setActiveId(storedActiveId);

      if (storedActiveId) {
        const active = storedInvestigations.find(i => i.id === storedActiveId);
        if (active) {
          setActiveInvestigation(active);
          setView('timeline');
        }
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (title, description) => {
    const newInv = await investigationRepository.create(title, description);
    // If it's the first one, make it active
    if (investigations.length === 0) {
      await investigationRepository.setActive(newInv.id);
      setActiveId(newInv.id);
      setActiveInvestigation(newInv);
      setView('timeline');
    }
    setInvestigations([...investigations, newInv]);
  };

  const handleSelectActive = async (id) => {
    await investigationRepository.setActive(id);
    setActiveId(id);
    const active = investigations.find(i => i.id === id);
    setActiveInvestigation(active);
    setView('timeline');
  };

  const handleBack = () => {
    setView('list');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <header>
        {view === 'timeline' && (
          <button className="btn-back" onClick={handleBack}>&larr; Back</button>
        )}
        <h1>Graph-Navigator</h1>
      </header>
      <main>
        {view === 'list' ? (
          <>
            <section className="create-section">
              <InvestigationForm onCreate={handleCreate} />
            </section>
            <section className="list-section">
              <InvestigationList
                investigations={investigations}
                activeId={activeId}
                onSelectActive={handleSelectActive}
              />
            </section>
          </>
        ) : (
          <section className="timeline-section">
            <Timeline investigation={activeInvestigation} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
