
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) => {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Mobile Progress Bar */}
      <div className="block sm:hidden mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Etapa {currentStep} de {totalSteps}</span>
          <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="text-center mt-2">
          <p className="text-sm text-gray-700 font-medium">
            {stepLabels[currentStep - 1]}
          </p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between mb-4 min-w-max">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNumber = i + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div key={i} className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                      isCompleted 
                        ? "bg-green-500 text-white" 
                        : isCurrent 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  {i < totalSteps - 1 && (
                    <div 
                      className={cn(
                        "h-1 w-12 lg:w-16 mx-2 transition-all duration-200",
                        stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Etapa {currentStep} de {totalSteps}: {stepLabels[currentStep - 1]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
