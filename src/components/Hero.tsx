
import { ArrowRight, BarChart3, Database, Zap } from "lucide-react";

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-teal-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transforme seus
                <span className="bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent block">
                  dados em resultados
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Especialistas em estruturação de dados, Power BI e análise de negócios. 
                Oferecemos soluções personalizadas para empresas de todos os setores, 
                visando melhorias contínuas e automação de processos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-teal-600 to-green-500 text-white px-8 py-4 rounded-full hover:from-teal-700 hover:to-green-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Solicitar Consultoria</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 font-semibold"
              >
                Nossos Serviços
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Estruturação</h3>
                <p className="text-sm text-gray-600">de Dados</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Power BI</h3>
                <p className="text-sm text-gray-600">& Analytics</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Automação</h3>
                <p className="text-sm text-gray-600">de Processos</p>
              </div>
            </div>
          </div>

          <div className="lg:order-first order-last animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-green-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <img 
                  src="lovable-uploads/ZayaMTech.png" 
                  alt="ZayaM Tech Logo"
                  className="w-full h-auto max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
