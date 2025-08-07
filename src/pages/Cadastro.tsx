import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Calendar, Phone, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// --- INÍCIO DOS COMPONENTES INTEGRADOS ---
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="flex items-center space-x-2 sm:space-x-4">
    <div className="flex-1">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
    <div className="text-sm text-gray-600">
      Etapa <span className="font-bold text-gray-900">{currentStep}</span> de {totalSteps}
    </div>
  </div>
);

const NPSScale = ({ value, onChange }: { value: number | null, onChange: (value: number) => void }) => (
  <div>
    <div className="flex justify-between items-center flex-wrap gap-2">
      {Array.from({ length: 11 }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-200
            ${value === i
              ? 'bg-blue-600 text-white scale-110 shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
            }`}
        >
          {i}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
      <span>Pouco Provável</span>
      <span>Muito Provável</span>
    </div>
  </div>
);

const MultipleChoice = ({ options, selectedValues, onChange, otherValue, onOtherChange }: { options: { id: string, label: string, isOther?: boolean }[], selectedValues: string[], onChange: (values: string[]) => void, otherValue?: string, onOtherChange?: (value: string) => void }) => {
  const handleSelect = (id: string) => {
    const newSelection = selectedValues.includes(id)
      ? selectedValues.filter(item => item !== id)
      : [...selectedValues, id];
    onChange(newSelection);
  };
  return (
    <div className="space-y-3">
      {options.map(option => (
        <div key={option.id}>
          <div
            onClick={() => handleSelect(option.id)}
            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedValues.includes(option.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selectedValues.includes(option.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
              {selectedValues.includes(option.id) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="flex-1 text-gray-800">{option.label}</span>
          </div>
          {option.isOther && selectedValues.includes('outro') && onOtherChange && (
            <div className="mt-2 pl-8">
              <input type="text" placeholder="Por favor, especifique" value={otherValue || ''} onChange={(e) => onOtherChange(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SingleChoice = ({ options, selectedValue, onChange, otherValue, onOtherChange }: { options: { id: string, label: string, isOther?: boolean }[], selectedValue: string, onChange: (value: string) => void, otherValue?: string, onOtherChange?: (value: string) => void }) => (
  <div className="space-y-3">
    {options.map(option => (
      <div key={option.id}>
        <div
          onClick={() => onChange(option.id)}
          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedValue === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedValue === option.id ? 'border-blue-600' : 'border-gray-300'}`}>
            {selectedValue === option.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
          </div>
          <span className="flex-1 text-gray-800">{option.label}</span>
        </div>
        {option.isOther && selectedValue === 'outro' && onOtherChange && (
          <div className="mt-2 pl-8">
            <input type="text" placeholder="Por favor, especifique" value={otherValue || ''} onChange={(e) => onOtherChange(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
          </div>
        )}
      </div>
    ))}
  </div>
);
// --- FIM DOS COMPONENTES INTEGRADOS ---


const cadastroSchema = z.object({
  nomeCompleto: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  whatsapp: z.string()
    .min(1, "WhatsApp é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato: (11) 99999-9999"),
  aceitarMensagens: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar receber mensagens"
  })
});

type NPSFormData = {
  npsScore?: number;
  motivoPrincipal?: string;
  motivoOutro?: string;
  pontosFortes?: string[];
  pontosOutro?: string;
  melhorias?: string[];
  melhoriasOutro?: string;
  custoBeneficio?: string;
};
type CadastroFormData = z.infer<typeof cadastroSchema>;

const Cadastro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [npsData, setNpsData] = useState<Partial<NPSFormData>>({
    pontosFortes: [],
    melhorias: []
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema)
  });

  const motivoOptions = [
    { id: "qualidade-comida", label: "Qualidade da Comida" },
    { id: "atendimento", label: "Atendimento da Equipe" },
    { id: "ambiente", label: "Ambiente e Conforto" },
    { id: "tempo-espera", label: "Tempo de Espera" },
    { id: "preco", label: "Preço / Custo-benefício" },
    { id: "limpeza", label: "Limpeza" },
    { id: "outro", label: "Outro", isOther: true }
  ];

  const pontosOptions = [
    { id: "sabor", label: "O sabor/qualidade dos pratos" },
    { id: "agilidade", label: "A agilidade do serviço" },
    { id: "simpatia", label: "A simpatia da equipe" },
    { id: "ambiente", label: "O ambiente (decoração, música)" },
    { id: "limpeza", label: "A limpeza do local" },
    { id: "preco-justo", label: "O preço justo" },
    { id: "variedade", label: "A variedade do cardápio" },
    { id: "outro", label: "Outro", isOther: true }
  ];

  const melhoriasOptions = [
    { id: "qualidade", label: "A qualidade/sabor da comida" },
    { id: "atendimento", label: "O atendimento/treinamento da equipe" },
    { id: "tempo", label: "O tempo de espera" },
    { id: "ambiente", label: "O ambiente (conforto, barulho)" },
    { id: "precos", label: "Os preços / as promoções" },
    { id: "limpeza", label: "A limpeza" },
    { id: "cardapio", label: "As opções no cardápio" },
    { id: "nada", label: "Nada, estava tudo ótimo!" },
    { id: "outro", label: "Outro", isOther: true }
  ];

  const custoBeneficioOptions = [
    { id: "excelentes", label: "Excelentes (vale mais do que custa)" },
    { id: "justos", label: "Justos (preço adequado à qualidade)" },
    { id: "razoaveis", label: "Razoáveis (um pouco caro)" },
    { id: "ruins", label: "Ruins (muito caro pelo que oferece)" }
  ];

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
    }
    return value.substring(0, 15);
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setValue('whatsapp', formatted, { shouldValidate: true });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return npsData.npsScore !== undefined;
      case 2:
        return npsData.motivoPrincipal && (npsData.motivoPrincipal !== 'outro' || (npsData.motivoOutro && npsData.motivoOutro.trim() !== ''));
      case 3:
        return npsData.pontosFortes && npsData.pontosFortes.length > 0 &&
          (!npsData.pontosFortes.includes('outro') || (npsData.pontosOutro && npsData.pontosOutro.trim() !== ''));
      case 4:
        return npsData.melhorias && npsData.melhorias.length > 0 &&
          (!npsData.melhorias.includes('outro') || (npsData.melhoriasOutro && npsData.melhoriasOutro.trim() !== ''));
      case 5:
        return npsData.custoBeneficio;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceedToNext()) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // --- INÍCIO DA VERSÃO CORRETA DA FUNÇÃO onSubmit ---
  const onSubmit = async (data: CadastroFormData) => {
    setIsSubmitting(true);
  
    const combinedData = {
      ...npsData,
      ...data,
      pontosFortes: npsData.pontosFortes?.join(", "),
      melhorias: npsData.melhorias?.join(", "),
    };
  
    try {
      // Esta é a única chamada 'fetch' que deve estar aqui
      const response = await fetch('/api/enviar', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });
  
      if (!response.ok) {
        throw new Error(`A resposta da rede não foi 'ok': ${await response.text()}`);
      }
      
      alert("Pesquisa e cadastro realizados com sucesso! Obrigado pelo seu feedback.");
      
      // Redireciona o usuário após o sucesso
      window.location.href = 'https://www.zayam.com.br';
  
      // Opcional: Limpa o formulário (o usuário já será redirecionado)
      setCurrentStep(1);
      setNpsData({ pontosFortes: [], melhorias: [] });
      reset();
  
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      alert("Erro no envio! Ocorreu um problema ao enviar seu feedback. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- FIM DA VERSÃO CORRETA DA FUNÇÃO onSubmit ---


  const aceitarMensagens = watch('aceitarMensagens');

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center leading-tight px-2">
              Em uma escala de 0 a 10, o quão provável você é de recomendar nosso restaurante a um amigo ou familiar?
            </h2>
            <NPSScale value={npsData.npsScore ?? null} onChange={(value) => setNpsData(prev => ({ ...prev, npsScore: value }))} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center leading-tight px-2">
              Qual foi o principal motivo para a sua nota?
            </h2>
            <SingleChoice options={motivoOptions} selectedValue={npsData.motivoPrincipal || ''} onChange={(value) => setNpsData(prev => ({ ...prev, motivoPrincipal: value }))} otherValue={npsData.motivoOutro} onOtherChange={(value) => setNpsData(prev => ({ ...prev, motivoOutro: value }))} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center leading-tight px-2">
              O que você mais gostou em sua visita?
            </h2>
            <p className="text-sm text-gray-600 text-center px-2">(Você pode selecionar uma ou mais opções)</p>
            <MultipleChoice options={pontosOptions} selectedValues={npsData.pontosFortes || []} onChange={(values) => setNpsData(prev => ({ ...prev, pontosFortes: values }))} otherValue={npsData.pontosOutro} onOtherChange={(value) => setNpsData(prev => ({ ...prev, pontosOutro: value }))} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center leading-tight px-2">
              Na sua opinião, o que podemos melhorar?
            </h2>
            <p className="text-sm text-gray-600 text-center px-2">(Você pode selecionar uma ou mais opções)</p>
            <MultipleChoice options={melhoriasOptions} selectedValues={npsData.melhorias || []} onChange={(values) => setNpsData(prev => ({ ...prev, melhorias: values }))} otherValue={npsData.melhoriasOutro} onOtherChange={(value) => setNpsData(prev => ({ ...prev, melhoriasOutro: value }))} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center leading-tight px-2">
              Em relação ao custo-benefício, você considera nossos preços:
            </h2>
            <SingleChoice options={custoBeneficioOptions} selectedValue={npsData.custoBeneficio || ''} onChange={(value) => setNpsData(prev => ({ ...prev, custoBeneficio: value }))} />
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 w-full">
            <div className="text-center mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight px-2">
                Para finalizar, precisamos dos seus dados
              </h2>
              <p className="text-gray-600 text-sm sm:text-base px-2">
                Receba atualizações e dicas exclusivas no seu WhatsApp
              </p>
            </div>
            
            <div>
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="nomeCompleto" type="text" {...register("nomeCompleto")} className="pl-10 text-base sm:text-sm h-12 sm:h-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="Seu nome completo" />
              </div>
              {errors.nomeCompleto && <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto.message}</p>}
            </div>
            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="dataNascimento" type="date" {...register("dataNascimento")} className="pl-10 text-base sm:text-sm h-12 sm:h-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              {errors.dataNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataNascimento.message}</p>}
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">WhatsApp *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="whatsapp" type="tel" {...register("whatsapp")} onChange={handleWhatsAppChange} className="pl-10 text-base sm:text-sm h-12 sm:h-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="(11) 99999-9999" />
              </div>
              {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
            </div>
            <div className="flex items-start space-x-4 sm:space-x-3 p-3 sm:p-2 -m-3 sm:-m-2 rounded-lg">
              <input type="checkbox" id="aceitarMensagens" {...register("aceitarMensagens")} className="mt-1 h-5 w-5 sm:h-4 sm:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div className="flex-1">
                <label htmlFor="aceitarMensagens" className="text-sm text-gray-700 cursor-pointer leading-relaxed select-none">
                  Aceito receber mensagens da ZayaM Tech no meu WhatsApp com dicas, atualizações e conteúdos exclusivos sobre análise de dados.
                </label>
                {errors.aceitarMensagens && <p className="text-red-500 text-sm mt-1">{errors.aceitarMensagens.message}</p>}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Pesquisa de Satisfação</h1>
              <p className="text-gray-600 text-sm sm:text-base px-2">Sua opinião é muito importante para nós</p>
            </div>
            <StepIndicator currentStep={currentStep} totalSteps={6} />
            <div className="my-6 sm:my-8 min-h-[300px] flex items-center justify-center">
              {renderStepContent()}
            </div>
            
            <div className="flex justify-between gap-3">
              {currentStep > 1 && (
                  <button type="button" onClick={handlePrevious} className="flex items-center space-x-2 h-11 sm:h-10 px-4 sm:px-6 text-sm sm:text-base flex-1 sm:flex-none border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
              )}
              {currentStep < 6 ? (
                  <button type="button" onClick={handleNext} disabled={!canProceedToNext()} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 h-11 sm:h-10 px-4 sm:px-6 text-sm sm:text-base flex-1 sm:flex-none text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <span>Próximo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
              ) : (
                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-base sm:text-sm h-12 sm:h-10 disabled:opacity-50">
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <> <Check className="w-5 h-5" /> <span>Finalizar Cadastro</span> </>}
                  </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;