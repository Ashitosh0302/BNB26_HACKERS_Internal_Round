import React, { useState } from 'react';
import { useUIStore } from '../stores/useUIStore';
import {
  UploadCloud, FileVideo, Sparkles, CheckCircle2,
  ArrowRight, Shield, RefreshCw, Layers
} from 'lucide-react';
import { spiderSound } from '../services/audioSfx';

export const RecordingUpload: React.FC = () => {
  const { setActiveTab, showToast } = useUIStore();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);

  const pipelineStages = [
    { label: 'Uploading 4K Recording', duration: '2.1 GB' },
    { label: 'Audio Extraction & Normalization', duration: '-14 LUFS' },
    { label: 'Transcription & Diarization', duration: '6,842 words' },
    { label: 'Scene Boundary Detection', duration: '54 scenes' },
    { label: 'Visual Analysis & Screen OCR', duration: '1080p frames' },
    { label: 'Script ↔ Footage Alignment', duration: '96% confidence' },
    { label: 'Autonomous Clip Discovery', duration: '12 candidates' }
  ];

  const handleSimulatedUpload = async () => {
    spiderSound.playWebShoot();
    setUploading(true);
    for (let i = 0; i < pipelineStages.length; i++) {
      setActiveStageIndex(i);
      spiderSound.playClick();
      await new Promise((r) => setTimeout(r, 700));
    }
    spiderSound.playSpiderSense();
    showToast('🕸 Recording successfully digested into the Multimodal Content Graph!');
    setTimeout(() => {
      setActiveTab('alignment');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F2F5F7] pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E5092F] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5092F] animate-ping" />
            <span>MULTIMODAL INGESTION · FOOTAGE DIGESTION</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white mt-1">
            DROP YOUR RECORDING INTO THE WEB
          </h1>
          <p className="text-sm text-[#8E9BAE] mt-0.5">
            Supports MP4, MOV, WEBM, MP3, WAV up to 8K resolution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 flex-1">
        {/* Drop Zone Box (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleSimulatedUpload();
            }}
            onClick={handleSimulatedUpload}
            className={`group flex-1 min-h-[420px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#E5092F] bg-[#E5092F]/10 scale-[1.02] shadow-[0_0_40px_rgba(229,9,47,0.4)]'
                : 'border-white/15 bg-[#071426] hover:border-[#1769FF]/60 hover:bg-[#10141D]'
            }`}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#10141D] border border-white/10 flex items-center justify-center text-[#E5092F] shadow-[0_0_30px_rgba(229,9,47,0.3)] mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold font-['Outfit'] text-white">
              DROP YOUR RECORDING INTO THE WEB
            </h3>
            <p className="text-xs text-[#8E9BAE] mt-2 max-w-sm">
              Click to select file or drag & drop. Spider-Sense begins autonomous transcription, scene detection, and script alignment.
            </p>

            <div className="mt-8 flex items-center space-x-3 text-xs font-mono text-[#8E9BAE]">
              <span className="px-3 py-1 rounded bg-[#05070D] border border-white/5">MP4</span>
              <span className="px-3 py-1 rounded bg-[#05070D] border border-white/5">MOV</span>
              <span className="px-3 py-1 rounded bg-[#05070D] border border-white/5">WEBM</span>
              <span className="px-3 py-1 rounded bg-[#05070D] border border-white/5">WAV</span>
            </div>
          </div>
        </div>

        {/* Multi-Stage Web Graph Progress (5 cols) */}
        <div className="lg:col-span-5 spider-panel p-6 rounded-2xl bg-[#071426] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10 mb-4">
              <Sparkles className="w-4 h-4 text-[#1769FF]" />
              <h3 className="text-xs font-mono uppercase font-bold text-white">
                MULTIMODAL DIGESTION PIPELINE
              </h3>
            </div>

            <div className="space-y-3">
              {pipelineStages.map((stage, idx) => {
                const isCompleted = activeStageIndex > idx;
                const isCurrent = activeStageIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#10141D] border-[#E5092F] shadow-[0_0_15px_rgba(229,9,47,0.3)]'
                        : isCompleted
                        ? 'bg-[#05070D] border-emerald-500/30'
                        : 'bg-[#05070D]/40 border-white/5 opacity-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          isCompleted
                            ? 'bg-emerald-500 text-black'
                            : isCurrent
                            ? 'bg-[#E5092F] text-white animate-spin'
                            : 'bg-white/10 text-[#8E9BAE]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{stage.label}</div>
                        <div className="text-[10px] font-mono text-[#8E9BAE]">{stage.duration}</div>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-mono text-[#E5092F] animate-pulse">
                        PROCESSING...
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('alignment')}
              className="web-button-secondary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>SKIP TO EXISTING ALIGNED RECORDING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
