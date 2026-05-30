import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react';

export const SupportView = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How accurate is the geolocated satellite data?',
      a: 'We query the Open-Meteo high-resolution models, offering hyper-local resolution down to 2km grid limits, updated hourly to ensure maximum precision.'
    },
    {
      q: 'How do I add or delete saved hubs?',
      a: 'Navigate to the Locations view in the sidebar. You can search for any global city and add it, or click the trash can icon to remove it from your dashboard roster.'
    },
    {
      q: 'What is included in the Premium subscription?',
      a: 'Premium accounts unlock high-resolution historical records going back 40 years, hyper-local storm radar maps, and custom notifications for severe weather changes.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (ticketSubject.trim() && ticketMsg.trim()) {
      setIsSubmitted(true);
      setTicketSubject('');
      setTicketMsg('');
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6 flex flex-col h-full">
      <div>
        <h2 className="text-2xl font-bold text-white font-sans">Support & Help Hub</h2>
        <p className="text-xs text-brand-textSecondary font-sans">Resolve issues and explore FAQ guides</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Expandable FAQs Accordion */}
        <div className="glass-card rounded-[2rem] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white font-sans border-b border-brand-cardBorder/40 pb-2">Frequently Asked Questions</h3>
          
          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-brand-cardBorder rounded-2xl overflow-hidden bg-brand-sidebar/45"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center text-xs font-bold text-white hover:bg-brand-card/30 transition-colors font-sans"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-brand-accentTeal" /> : <ChevronDown className="w-4 h-4 text-brand-textSecondary" />}
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-4 text-[11px] text-brand-textSecondary leading-relaxed border-t border-brand-cardBorder/30 pt-3 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Ticket Form */}
        <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="text-sm font-bold text-white font-sans border-b border-brand-cardBorder/40 pb-2">Submit a Ticket</h3>
            <p className="text-[10px] text-brand-textMuted font-sans pt-1">Get in touch with our engineering support staff</p>
          </div>

          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <CheckCircle className="w-10 h-10 text-brand-accentTeal animate-bounce" />
              <span className="text-xs font-bold text-white font-sans">Support Ticket Submitted!</span>
              <p className="text-[10px] text-brand-textSecondary leading-normal max-w-xs font-sans">
                Thank you. Our dispatch crew has received your ticket and will contact you via email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4 pt-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-brand-textMuted uppercase font-sans">Subject Topic</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Radar map rendering error"
                    className="w-full h-9 pl-3 rounded-xl bg-brand-sidebar border border-brand-cardBorder text-xs text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-accentTeal/60 focus:bg-brand-card/80 transition-all font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-brand-textMuted uppercase font-sans">Message Body</label>
                  <textarea
                    required
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Explain the problem in detail..."
                    rows={4}
                    className="w-full p-3 rounded-xl bg-brand-sidebar border border-brand-cardBorder text-xs text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-accentTeal/60 focus:bg-brand-card/80 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-brand-accentTeal to-brand-accentCyan text-brand-darkBg font-bold text-xs rounded-xl shadow-glow-teal hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 font-sans"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
