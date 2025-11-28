import { Mic, MicOff } from "lucide-react";
import { useSpeechInput } from "../hooks/useSpeechInput";

interface SpeechInputProps {
  onTranscription: (text: string) => void;
}

export function SpeechInput({ onTranscription }: SpeechInputProps) {
  const { isListening, startListening, stopListening } = useSpeechInput({
    onTranscription,
  });

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={isListening ? stopListening : startListening}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse"
            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" />
            <span>Stop listening</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Speak your request</span>
          </>
        )}
      </button>

      <p className="text-sm text-center text-slate-400">
        {isListening
          ? "Listening... Speak now"
          : "Tap the mic and describe what you're looking for"}
      </p>
    </div>
  );
}
