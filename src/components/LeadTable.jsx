import React from 'react'
import { Button } from './ui/Button'

export const LeadTable = ({ leads, onRowClick, sortOrder, onSortToggle }) => {
  const getStatusColor = status => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800'
      case 'Em Contato':
        return 'bg-yellow-100 text-yellow-800'
      case 'Qualificado':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Nome
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Empresa
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Fonte
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              <div className='flex items-center'>
                Pontuação
                <Button
                  variant='secondary'
                  onClick={onSortToggle}
                  className='ml-2 px-2 py-1 text-sm'
                >
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </Button>
              </div>
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {leads.map(lead => (
            <tr
              key={lead.id}
              className='hover:bg-gray-100 cursor-pointer transition-colors duration-150'
              onClick={() => onRowClick(lead)}
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {lead.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {lead.company}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {lead.email}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {lead.source}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {lead.scoreDescription} ({lead.score})
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
