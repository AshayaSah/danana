'use client';
import { useCallback, useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, X } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function AdminMessages() {
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [selected,  setSelected]  = useState<Message | null>(null);
  const [deleteId,  setDeleteId]  = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function markRead(id: string, is_read: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_read }),
    });
    setMessages(ms => ms.map(m => m.id === id ? { ...m, is_read } : m));
    if (selected?.id === id) setSelected(s => s ? { ...s, is_read } : s);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    setMessages(ms => ms.filter(m => m.id !== id));
    setDeleteId(null);
    if (selected?.id === id) setSelected(null);
  }

  async function openMessage(msg: Message) {
    setSelected(msg);
    if (!msg.is_read) markRead(msg.id, true);
  }

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Messages</h2>
          <p className="text-[13px] text-[#696969] mt-0.5">
            {messages.length} total{unread > 0 ? ` · ${unread} unread` : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* List */}
        <div className={`flex flex-col border-r border-gray-100 overflow-y-auto ${selected ? 'hidden lg:flex w-[360px] shrink-0' : 'flex-1'}`}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center py-32">
              <p className="text-[13px] text-[#696969]">No messages yet</p>
            </div>
          ) : (
            messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left px-5 py-4 border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                  selected?.id === msg.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {msg.is_read
                      ? <MailOpen className="h-4 w-4 text-[#aaa]" />
                      : <Mail className="h-4 w-4 text-black" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={`text-[14px] truncate ${msg.is_read ? 'text-[#696969] font-normal' : 'text-black font-medium'}`}>
                        {msg.name}
                      </p>
                      <p className="text-[11px] text-[#aaa] shrink-0">
                        {new Date(msg.created_at).toLocaleDateString('en-NP', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <p className="text-[12px] text-[#696969] truncate mt-0.5">{msg.phone}</p>
                    <p className="text-[12px] text-[#aaa] truncate mt-0.5">{msg.message}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-xl">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-[18px] font-medium">{selected.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[13px] text-[#696969]">
                    <span>{selected.phone}</span>
                    {selected.email && <><span>·</span><span>{selected.email}</span></>}
                    <span>·</span>
                    <span>{new Date(selected.created_at).toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="lg:hidden text-[#696969] hover:text-black shrink-0">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-5 rounded-sm mb-6">
                <p className="text-[14px] text-[#333] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => markRead(selected.id, !selected.is_read)}
                  className="flex items-center gap-1.5 border border-gray-200 px-4 py-2 text-[13px] hover:border-black transition-colors"
                >
                  {selected.is_read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}
                  {selected.is_read ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                  onClick={() => setDeleteId(selected.id)}
                  className="flex items-center gap-1.5 border border-gray-200 px-4 py-2 text-[13px] text-[#FA5D42] hover:border-[#FA5D42] transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-[17px] font-medium mb-2">Delete message?</h3>
            <p className="text-[13px] text-[#696969] mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-black text-white py-2.5 text-[13px] font-medium hover:bg-black/80 transition-colors">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 py-2.5 text-[13px] hover:border-black transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
