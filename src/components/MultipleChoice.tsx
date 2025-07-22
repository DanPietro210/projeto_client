
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Option {
  id: string;
  label: string;
  isOther?: boolean;
}

interface MultipleChoiceProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

const MultipleChoice = ({ 
  options, 
  selectedValues, 
  onChange, 
  otherValue = "",
  onOtherChange 
}: MultipleChoiceProps) => {
  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionId]);
    } else {
      onChange(selectedValues.filter(id => id !== optionId));
      // Se desmarcar "Outro", limpar o texto
      if (optionId === "outro" && onOtherChange) {
        onOtherChange("");
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-3">
      {options.map((option) => (
        <div key={option.id} className="space-y-3">
          <div className="flex items-start space-x-4 sm:space-x-3 p-3 sm:p-2 -m-3 sm:-m-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Checkbox
              id={option.id}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
              className="mt-1 h-5 w-5 sm:h-4 sm:w-4"
            />
            <Label 
              htmlFor={option.id} 
              className="text-base sm:text-sm font-medium leading-relaxed cursor-pointer flex-1 select-none"
            >
              {option.label}
            </Label>
          </div>
          
          {option.isOther && selectedValues.includes(option.id) && onOtherChange && (
            <div className="ml-9 sm:ml-7">
              <Input
                placeholder="Por favor, especifique..."
                value={otherValue}
                onChange={(e) => onOtherChange(e.target.value)}
                className="mt-2 text-base sm:text-sm"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoice;
