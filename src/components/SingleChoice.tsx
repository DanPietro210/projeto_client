
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Option {
  id: string;
  label: string;
  isOther?: boolean;
}

interface SingleChoiceProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

const SingleChoice = ({ 
  options, 
  selectedValue, 
  onChange, 
  otherValue = "",
  onOtherChange 
}: SingleChoiceProps) => {
  return (
    <div className="space-y-4 sm:space-y-3">
      <RadioGroup value={selectedValue} onValueChange={onChange}>
        {options.map((option) => (
          <div key={option.id} className="space-y-3">
            <div className="flex items-start space-x-4 sm:space-x-3 p-3 sm:p-2 -m-3 sm:-m-2 rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value={option.id} 
                id={option.id} 
                className="mt-1 h-5 w-5 sm:h-4 sm:w-4"
              />
              <Label 
                htmlFor={option.id} 
                className="text-base sm:text-sm font-medium leading-relaxed cursor-pointer flex-1 select-none"
              >
                {option.label}
              </Label>
            </div>
            
            {option.isOther && selectedValue === option.id && onOtherChange && (
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
      </RadioGroup>
    </div>
  );
};

export default SingleChoice;
