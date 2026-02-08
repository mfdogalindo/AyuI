import React from 'react';

export function InvestigationList({ investigations, activeId, onSelectActive }) {
  return (
    <div className="investigation-list-container">
      <h3>Your Investigations</h3>
      {investigations.length === 0 ? (
        <p className="empty-state">No investigations yet. Create one to start collecting.</p>
      ) : (
        <ul className="investigation-list">
          {investigations.map((inv) => (
            <li
              key={inv.id}
              className={`investigation-item ${inv.id === activeId ? 'active' : ''}`}
              onClick={() => onSelectActive(inv.id)}
            >
              <div className="inv-header">
                <span className="inv-title">{inv.title}</span>
                {inv.id === activeId && <span className="badge-active">Active</span>}
              </div>
              {inv.description && <p className="inv-desc">{inv.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
