import { useState, useEffect } from 'react';
import './App.css';
import { investigationRepository } from '../lib/storage';
import { InvestigationForm } from './components/InvestigationForm';
import { InvestigationList } from './components/InvestigationList';

function App() {
  const [investigations, setInvestigations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const storedInvestigations = await investigationRepository.getAll();
      const storedActiveId = await investigationRepository.getActiveId();
      setInvestigations(storedInvestigations);
      setActiveId(storedActiveId);
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
    }
    setInvestigations([...investigations, newInv]);
  };

  const handleSelectActive = async (id) => {
    await investigationRepository.setActive(id);
    setActiveId(id);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <header>
        <h1>Graph-Navigator</h1>
      </header>
      <main>
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
      </main>
    </div>
  );
}

export default App;
