// src/lib/export.js

export function generateExportData(investigation) {
  if (!investigation) return null;

  const exportData = {
    meta: {
      tool: "Graph-Navigator v1",
      exportDate: new Date().toISOString(),
      instructions_for_agent: "Analiza la secuencia de nodos para reconstruir el proceso de pensamiento del investigador. Genera un informe técnico basado en los bloques de código y notas. Esta es una ruta de investigación. Los nodos están ordenados cronológicamente. Usa el campo 'content' (o 'summary') como fuente de verdad y 'user_annotation' como directriz de intención."
    },
    investigation: {
      title: investigation.title,
      goal: investigation.description || "Sin descripción",
      knowledge_graph: investigation.nodes.map(node => {
        // Find parent edge
        const edge = investigation.edges?.find(e => e.targetId === node.id);

        const graphNode = {
          id: node.id,
          type: node.type,
          url: node.sourceUrl,
          user_annotation: node.userNote || ""
        };

        if (edge) {
          graphNode.parent_id = edge.sourceId;
        }

        if (node.type === 'webpage') {
          graphNode.summary = node.content;
        } else {
          graphNode.content = node.content;
          if (node.type === 'code_block') {
            graphNode.source = node.sourceUrl; // Additional clarity for code
            // Simple language detection heuristic could be added here if node stored language
            graphNode.language = "unknown";
          }
        }

        return graphNode;
      })
    }
  };

  return JSON.stringify(exportData, null, 2);
}
