
import { ExternalLink, BarChart3, Database, Zap } from "lucide-react";

export const Portfolio = () => {
  const projects = [
    {
      title: "Dashboard Operacional - Indústria",
      category: "Power BI & Analytics",
      description: "Desenvolvimento de dashboard completo para monitoramento de KPIs operacionais, resultando em 35% de aumento na eficiência.",
      icon: BarChart3,
      tags: ["Power BI", "KPIs", "Automação"],
      results: "35% aumento na eficiência"
    },
    {
      title: "Automação de Relatórios Financeiros",
      category: "Automação de Processos",
      description: "Implementação de automação para geração de relatórios financeiros, reduzindo tempo de processamento em 80%.",
      icon: Zap,
      tags: ["Power Automate", "Relatórios", "Financeiro"],
      results: "80% redução no tempo"
    },
    {
      title: "Estruturação de Data Warehouse",
      category: "Estruturação de Dados",
      description: "Criação de arquitetura robusta de dados para empresa de varejo, integrando múltiplas fontes de informação.",
      icon: Database,
      tags: ["ETL", "Data Warehouse", "Integração"],
      results: "100% centralização dos dados"
    },
    {
      title: "Sistema de Monitoramento - Logística",
      category: "Power BI & Analytics",
      description: "Dashboard em tempo real para monitoramento de frota e otimização de rotas, gerando economia de 25% em combustível.",
      icon: BarChart3,
      tags: ["Real-time", "Logística", "Otimização"],
      results: "25% economia em combustível"
    },
    {
      title: "Automação de Processos RH",
      category: "Automação de Processos",
      description: "Automatização de workflows de RH, desde onboarding até avaliações, melhorando experiência do colaborador.",
      icon: Zap,
      tags: ["RH", "Workflows", "Onboarding"],
      results: "90% redução manual"
    },
    {
      title: "Analytics Preditivo - E-commerce",
      category: "Análise de Negócios",
      description: "Implementação de modelos preditivos para forecast de vendas e gestão de estoque, aumentando margem em 18%.",
      icon: BarChart3,
      tags: ["Machine Learning", "Forecast", "E-commerce"],
      results: "18% aumento na margem"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cases de Sucesso
          </h2>
          <p className="text-xl text-gray-600">
            Conheça alguns dos projetos que transformaram a gestão de dados e processos 
            de empresas de diversos setores, gerando resultados mensuráveis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-teal-600 font-medium bg-teal-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-gradient-to-r from-teal-100 to-green-100 text-teal-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Resultado</p>
                      <p className="font-semibold text-gray-900">{project.results}</p>
                    </div>
                    <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Quer saber mais sobre como podemos transformar seu negócio?
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-teal-600 to-green-500 text-white px-8 py-4 rounded-full hover:from-teal-700 hover:to-green-600 transition-all duration-300 font-semibold"
          >
            Solicitar Consultoria Gratuita
          </button>
        </div>
      </div>
    </section>
  );
};
