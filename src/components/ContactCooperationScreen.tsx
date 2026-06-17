import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Check, 
  Copy, 
  QrCode
} from 'lucide-react';
import InteractiveDotGrid from './InteractiveDotGrid';

export default function ContactCooperationScreen() {
  const [copyStatus, setCopyStatus] = useState<'none' | 'email' | 'phone' | 'wechat'>('none');

  const designerEmail = 'xuziyi905@outlook.com';
  const designerPhone = '153-7735-6930';
  const designerWeChat = 'iiRyeee';

  const triggerCopy = (text: string, type: 'email' | 'phone' | 'wechat') => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => {
      setCopyStatus('none');
    }, 2500);
  };

  return (
    <section 
      className="min-h-[75vh] bg-white text-neutral-950 relative flex flex-col justify-between pt-16 pb-6 scroll-mt-0 selection:bg-brand-lime selection:text-neutral-950 overflow-hidden"
      id="contact-cooperation-screen"
    >
      <InteractiveDotGrid />

      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-brand-lime/10 rounded-full blur-[140px] pointer-events-none select-none" />



      {/* Centerpiece Grid System (Balanced split-column for personal info & QR Code) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-6 mt-6 mb-8 flex flex-col justify-center">
        
        {/* Large "THANK YOU" Monolithic Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20 md:mb-24">
          <span className="text-neutral-950 font-mono text-xs tracking-widest uppercase bg-brand-lime border border-brand-lime/30 px-3 py-1 rounded-md inline-block shadow-2xs">
            CONTACT INDEX // 期待合作与联络
          </span>
          <h2 className="font-sans text-6xl sm:text-8xl font-black tracking-tighter text-neutral-950 uppercase leading-none">
            THANK YOU
          </h2>
        </div>

        {/* Three equal square buttons side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
          
          {/* Square Button 1: Telephone */}
          <div 
            onClick={() => triggerCopy(designerPhone, 'phone')}
            className="aspect-square bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-lime cursor-pointer text-center relative overflow-hidden group select-none active:scale-98"
            title="Click to copy phone number"
            id="contact-square-phone"
          >
            {/* Top Icon Block */}
            <div className="flex flex-col items-center pt-4">
              <div className="p-4 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-xs mb-3 group-hover:bg-brand-lime group-hover:text-neutral-950 transition-colors">
                <Phone className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">TELEPHONE / 电话联络</span>
            </div>

            {/* Bottom Content Block */}
            <div className="pb-4">
              <span className="text-base sm:text-lg font-sans font-black text-neutral-900 block group-hover:text-neutral-950 transition-colors">
                {designerPhone}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 block mt-2 transition-all duration-200 group-hover:text-neutral-900 group-hover:font-extrabold">
                {copyStatus === 'phone' ? (
                  <span className="text-emerald-650 font-extrabold font-mono">✓ SYSTEM CLIPBOARD COPIED</span>
                ) : (
                  <span className="group-hover:text-emerald-750 font-bold flex items-center justify-center gap-1">
                    <span className="animate-pulse">⚡</span> 点击即可复制 / CLICK TO COPY
                  </span>
                )}
              </span>
            </div>

            {/* Subtle Copied Ribbon Overlay */}
            {copyStatus === 'phone' && (
              <div className="absolute inset-x-0 bottom-0 bg-brand-lime text-neutral-950 py-1.5 font-mono text-[9px] font-bold text-center flex items-center justify-center gap-1">
                <Check className="h-3.5 w-3.5" /> COPIED TO CLIPBOARD
              </div>
            )}
          </div>

          {/* Square Button 2: Email */}
          <div 
            onClick={() => triggerCopy(designerEmail, 'email')}
            className="aspect-square bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-lime cursor-pointer text-center relative overflow-hidden group select-none active:scale-98"
            title="Click to copy email address"
            id="contact-square-email"
          >
            {/* Top Icon Block */}
            <div className="flex flex-col items-center pt-4">
              <div className="p-4 rounded-full bg-white border border-neutral-200 text-neutral-850 shadow-xs mb-3 group-hover:bg-brand-lime group-hover:text-neutral-950 transition-colors">
                <Mail className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">EMAIL HOST / 邮箱地址</span>
            </div>

            {/* Bottom Content Block */}
            <div className="pb-4">
              <span className="text-sm sm:text-base font-sans font-black text-neutral-900 block group-hover:text-neutral-950 transition-colors truncate">
                {designerEmail}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 block mt-2 transition-all duration-200 group-hover:text-neutral-900 group-hover:font-extrabold">
                {copyStatus === 'email' ? (
                  <span className="text-emerald-650 font-extrabold font-mono">✓ SYSTEM CLIPBOARD COPIED</span>
                ) : (
                  <span className="group-hover:text-emerald-750 font-bold flex items-center justify-center gap-1">
                    <span className="animate-pulse">⚡</span> 点击即可复制 / CLICK TO COPY
                  </span>
                )}
              </span>
            </div>

            {/* Subtle Copied Ribbon Overlay */}
            {copyStatus === 'email' && (
              <div className="absolute inset-x-0 bottom-0 bg-brand-lime text-neutral-950 py-1.5 font-mono text-[9px] font-bold text-center flex items-center justify-center gap-1">
                <Check className="h-3.5 w-3.5" /> COPIED TO CLIPBOARD
              </div>
            )}
          </div>

          {/* Square Button 3: QR Code / WeChat */}
          <div 
            onClick={() => triggerCopy(designerWeChat, 'wechat')}
            className="aspect-square bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-lime cursor-pointer text-center relative overflow-hidden group select-none active:scale-98"
            title="Click to copy WeChat username"
            id="contact-square-wechat"
          >
            {/* Top Icon Block */}
            <div className="flex flex-col items-center pt-4">
              <div className="p-4 rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-xs mb-3 group-hover:bg-brand-lime group-hover:text-neutral-950 transition-colors">
                <QrCode className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">WECHAT / 微信联络</span>
            </div>

            {/* Bottom Content Block */}
            <div className="pb-4">
              <span className="text-base sm:text-lg font-sans font-black text-neutral-900 block group-hover:text-neutral-950 transition-colors">
                {designerWeChat}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 block mt-2 transition-all duration-200 group-hover:text-neutral-900 group-hover:font-extrabold">
                {copyStatus === 'wechat' ? (
                  <span className="text-emerald-650 font-extrabold font-mono">✓ USER ID COPIED</span>
                ) : (
                  <span className="group-hover:text-emerald-750 font-bold flex items-center justify-center gap-1">
                    <span className="animate-pulse">⚡</span> 点击即可复制 / CLICK TO COPY
                  </span>
                )}
              </span>
            </div>

            {/* Absolute overlay for the QR Code containing scan instructions, visible on hover */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-6 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-10 font-mono text-[10px]">
              
              <div className="relative w-40 h-40 sm:w-46 sm:h-46 border border-neutral-200 p-2 sm:p-3 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-3 transform transition-transform duration-300 group-hover:scale-110">
                <img
                  src="/wechat_qr.jpg?v=20260616_v2"
                  alt="WeChat QR Code"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    // Fallback to png first if jpg does not load, then fallback to visual instructions
                    if (e.currentTarget.src.includes('.jpg')) {
                      e.currentTarget.src = "/wechat_qr.png?v=20260616";
                      return;
                    }
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      // Check to prevent mounting multiple placeholders
                      if (!parent.querySelector('.qr-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = "qr-placeholder flex flex-col items-center justify-center text-center p-2 text-neutral-400";
                        placeholder.innerHTML = `
                          <div class="text-3xl mb-2">💬</div>
                          <div class="font-bold text-[10px] leading-tight text-neutral-700">请上传/拖入二维码至</div>
                          <div class="font-mono text-[9px] text-neutral-400 mt-1 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">public/wechat_qr.jpg</div>
                        `;
                        parent.appendChild(placeholder);
                      }
                    }
                  }}
                />
              </div>
              <span className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] mb-0.5">SCAN WECHAT QR CODE</span>
              <span className="text-neutral-400 text-[9px] uppercase">CLICK CARD TO COPY ID</span>
            </div>

            {/* Subtle Copied Ribbon Overlay */}
            {copyStatus === 'wechat' && (
              <div className="absolute inset-x-0 bottom-0 bg-brand-lime text-neutral-950 py-1.5 font-mono text-[9px] font-bold text-center flex items-center justify-center gap-1 z-20">
                <Check className="h-3.5 w-3.5" /> WECHAT ID COPIED
              </div>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
