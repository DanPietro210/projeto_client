
import React from "react";
import { cn } from "@/lib/utils";

interface NPSScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const NPSScale = ({ value, onChange }: NPSScaleProps) => {
  const getButtonColor = (score: number) => {
    if (score <= 6) return "bg-red-500 hover:bg-red-600 text-white";
    if (score <= 8) return "bg-yellow-500 hover:bg-yellow-600 text-white";
    return "bg-green-500 hover:bg-green-600 text-white";
  };

  const getCategory = (score: number) => {
    if (score <= 6) return "Detrator";
    if (score <= 8) return "Neutro";
    return "Promotor";
  };

  return (
    <div className="space-y-6">
      {/* Mobile Layout - Two rows */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-6 gap-3 mb-3">
          {Array.from({ length: 6 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              className={cn(
                "h-14 w-full rounded-lg border-2 font-bold transition-all duration-200 text-lg",
                value === i
                  ? getButtonColor(i)
                  : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 active:scale-95"
              )}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }, (_, i) => {
            const score = i + 6;
            return (
              <button
                key={score}
                type="button"
                onClick={() => onChange(score)}
                className={cn(
                  "h-14 w-full rounded-lg border-2 font-bold transition-all duration-200 text-lg",
                  value === score
                    ? getButtonColor(score)
                    : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 active:scale-95"
                )}
              >
                {score}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout - Single row */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-11 gap-2">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              className={cn(
                "h-12 w-12 rounded-lg border-2 font-semibold transition-all duration-200",
                value === i
                  ? getButtonColor(i)
                  : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50"
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
        <div className="text-red-600 font-medium">
          <div>Detratores</div>
          <div className="text-xs text-gray-500">(0-6)</div>
        </div>
        <div className="text-yellow-600 font-medium">
          <div>Neutros</div>
          <div className="text-xs text-gray-500">(7-8)</div>
        </div>
        <div className="text-green-600 font-medium">
          <div>Promotores</div>
          <div className="text-xs text-gray-500">(9-10)</div>
        </div>
      </div>

      {value !== null && (
        <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium text-sm sm:text-base">
            Sua nota: {value} - Categoria: {getCategory(value)}
          </p>
        </div>
      )}
    </div>
  );
};

export default NPSScale;
