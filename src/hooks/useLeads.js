import { useState, useEffect, useMemo } from "react";
import leadsData from "../assets/leads.json";

// Função auxiliar para mapear pontuação para descrição
const getScoreDescription = (score) => {
  if (score >= 90) return "Muito Alto";
  if (score >= 70) return "Alto";
  if (score >= 50) return "Médio";
  return "Baixo";
};

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' ou 'desc'
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    // Simula uma chamada de API com latência de 1.5 segundos
    setTimeout(() => {
      try {
        const leadsWithDescription = leadsData.map((lead) => ({
          ...lead,
          scoreDescription: getScoreDescription(lead.score),
        }));
        setLeads(leadsWithDescription);
        setLoading(false);
      } catch (err) {
        setError("Falha ao carregar os leads.");
        setLoading(false);
      }
    }, 1500);
  }, []);

  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // 1. Pesquisa
    if (searchTerm) {
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filtro por status
    if (filterStatus !== "Todos") {
      result = result.filter((lead) => lead.status === filterStatus);
    }

    // 3. Ordenação por pontuação
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.score - b.score;
      }
      return b.score - a.score;
    });

    return result;
  }, [leads, searchTerm, filterStatus, sortOrder]);

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  const convertToOpportunity = (lead) => {
    // Cria uma nova oportunidade com campos definidos
    const newOpportunity = {
      id: `opp-${Date.now()}`,
      name: lead.name,
      accountName: lead.company,
      stage: "Prospecção",
      value: null,
    };
    setOpportunities((prevOpps) => [...prevOpps, newOpportunity]);

    // Remove o lead da lista original
    setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id));
  };

  const handleSaveLead = (leadId, newStatus, newEmail) => {
    const updatedLead = { ...selectedLead, status: newStatus, email: newEmail };
    updateLead(updatedLead);
    setSelectedLead(null); // Fecha o painel após salvar
    // Adicionaria aqui a lógica para simular o rollback caso a "API" falhasse
  };

  return {
    filteredLeads,
    opportunities,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortOrder,
    setSortOrder,
    updateLead,
    convertToOpportunity,
    selectedLead,
    setSelectedLead,
    handleSaveLead,
  };
};
