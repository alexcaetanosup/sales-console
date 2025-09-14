import React from 'react'
import { useLeads } from '../hooks/useLeads'
import { LeadTable } from '../components/LeadTable'
import { LeadDetailsPanel } from '../components/LeadDetailsPanel'
import { OpportunityTable } from '../components/OpportunityTable'
import { Spinner } from '../components/ui/Spinner'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Header } from '../components/Header'

export const SalesConsole = () => {
  const {
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
    convertToOpportunity,
    selectedLead,
    setSelectedLead,
    handleSaveLead
  } = useLeads()

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <Spinner />
        <p className='ml-2 mt-4 text-gray-600'>Carregando leads...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-red-500 text-center mt-10 p-4'>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className='p-4 md:p-8 relative min-h-screen bg-gray-100'>
      <Header />

      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4'>
          <Input
            placeholder='Pesquisar por nome ou empresa...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Select
            options={['Todos', 'Novo', 'Em Contato', 'Qualificado']}
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className='w-full md:w-auto'
          />
          <div className='flex items-center space-x-2 w-full md:w-auto'>
            <span>Pontuação:</span>
            <Select
              options={['asc', 'desc']}
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className='w-24'
            />
          </div>
        </div>
      </div>

      {filteredLeads.length > 0 ? (
        <LeadTable
          leads={filteredLeads}
          onRowClick={setSelectedLead}
          sortOrder={sortOrder}
          onSortToggle={() =>
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
          }
        />
      ) : (
        <div className='text-center text-gray-500 mt-10 p-4'>
          Nenhum lead encontrado.
        </div>
      )}

      {selectedLead && (
        <LeadDetailsPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSaveLead}
          onConvert={convertToOpportunity}
        />
      )}

      {opportunities.length > 0 && (
        <div className='mt-10 p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>
            Oportunidades
          </h2>
          <OpportunityTable opportunities={opportunities} />
        </div>
      )}
    </div>
  )
}
