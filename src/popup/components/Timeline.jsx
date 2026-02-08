import React from 'react';

export function Timeline({ investigation }) {
  if (!investigation || !investigation.nodes || investigation.nodes.length === 0) {
    return <p className="empty-state">No nodes captured yet.</p>;
  }

  return (
    <div className="timeline-container">
      <h3>{investigation.title}</h3>
      <p className="timeline-desc">{investigation.description}</p>

      <div className="timeline">
        {investigation.nodes.map((node, index) => {
          // Check if there is an edge connecting to the next node
          const hasNext = index < investigation.nodes.length - 1;

          return (
            <div key={node.id} className="timeline-item">
              <div className="timeline-marker"></div>
              {hasNext && <div className="timeline-connector"></div>}

              <div className="timeline-content">
                <div className="node-header">
                  <span className={`node-type type-${node.type}`}>{formatType(node.type)}</span>
                  <span className="node-time">{formatTime(node.timestamp)}</span>
                </div>

                <div className="node-body">
                  <p className="node-text">{node.content}</p>
                  {node.sourceUrl && node.type !== 'webpage' && (
                    <a href={node.sourceUrl} target="_blank" rel="noopener noreferrer" className="node-source">Source</a>
                  )}
                </div>

                {node.userNote && (
                  <div className="node-note">
                    <strong>Note:</strong> {node.userNote}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatType(type) {
  switch (type) {
    case 'webpage': return 'Page';
    case 'text_selection': return 'Text';
    case 'code_block': return 'Code';
    case 'image': return 'Image';
    default: return type;
  }
}

function formatTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
