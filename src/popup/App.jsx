import { useState, useEffect } from 'react';
import './App.css';
import { investigationRepository } from '../lib/storage';
import { InvestigationForm } from './components/InvestigationForm';
import { InvestigationList } from './components/InvestigationList';
import { Timeline } from './components/Timeline';
import { generateExportData } from '../lib/export';

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

  const handleDownload = () => {
    if (!activeInvestigation) return;

    const jsonString = generateExportData(activeInvestigation);
    if (!jsonString) return;

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investigation-${activeInvestigation.title.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        {view === 'timeline' && (
          <button className="btn-download" onClick={handleDownload} title="Download JSON">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        )}
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
