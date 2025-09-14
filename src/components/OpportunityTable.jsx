import React from 'react'

export const OpportunityTable = ({ opportunities }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              ID
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Nome
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Empresa
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Etapa
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {opportunities.map(opp => (
            <tr key={opp.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                {opp.id}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {opp.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {opp.accountName}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {opp.stage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
