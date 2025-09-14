import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Select } from './ui/Select'

export const LeadDetailsPanel = ({ lead, onClose, onSave, onConvert }) => {
  const [status, setStatus] = useState(lead.status)
  const [email, setEmail] = useState(lead.email)
  const [emailError, setEmailError] = useState('')

  const handleSave = () => {
    if (!validateEmail(email)) {
      setEmailError('Formato de e-mail inválido.')
      return
    }
    setEmailError('')
    onSave(lead.id, status, email)
  }

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  return (
    <div className='fixed inset-0 overflow-hidden z-50'>
      <div
        className='absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity'
        onClick={onClose}
      ></div>
      <section className='absolute inset-y-0 right-0 max-w-full flex'>
        <div className='w-screen max-w-md'>
          <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
            <div className='p-6'>
              <div className='flex items-start justify-between'>
                <h2 className='text-xl font-bold text-gray-900'>
                  Detalhes do Lead
                </h2>
                <div className='ml-3 h-7 flex items-center'>
                  <Button variant='secondary' onClick={onClose}>
                    <span className='sr-only'>Fechar painel</span>X
                  </Button>
                </div>
              </div>
            </div>
            <div className='relative p-6 flex-1'>
              <div className='space-y-4'>
                <p>
                  <strong>Nome:</strong> {lead.name}
                </p>
                <p>
                  <strong>Empresa:</strong> {lead.company}
                </p>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <Select
                    options={['Novo', 'Em Contato', 'Qualificado']}
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    E-mail
                  </label>
                  <Input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className='text-red-500 text-xs mt-1'>{emailError}</p>
                  )}
                </div>
                <p>
                  <strong>Fonte:</strong> {lead.source}
                </p>
                <p>
                  <strong>Pontuação:</strong> {lead.scoreDescription} (
                  {lead.score})
                </p>
              </div>
            </div>
            <div className='p-6 flex justify-end space-x-2'>
              <Button variant='secondary' onClick={onClose}>
                Cancelar
              </Button>
              <Button variant='primary' onClick={handleSave}>
                Salvar
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  onConvert(lead)
                  onClose() // Fecha o painel após a conversão
                }}
              >
                Converter para Oportunidade
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
