
import { Database, BarChart3, Zap, TrendingUp, Shield, Users } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Database,
      title: "Estruturação de Dados",
      description: "Organizamos e estruturamos seus dados para máxima eficiência e confiabilidade, criando bases sólidas para análises precisas.",
      features: ["Modelagem de dados", "ETL e integração", "Qualidade de dados", "Arquitetura escalável"]
    },
    {
      icon: BarChart3,
      title: "Power BI & Analytics",
      description: "Criamos dashboards interativos e relatórios personalizados que transformam dados complexos em insights acionáveis.",
      features: ["Dashboards interativos", "Relatórios automatizados", "KPIs personalizados", "Análise preditiva"]
    },
    {
      icon: Zap,
      title: "Automação de Processos",
      description: "Automatizamos tarefas repetitivas e processos manuais, aumentando produtividade e reduzindo erros operacionais.",
      features: ["Fluxos automatizados", "Power Automate", "Integração de sistemas", "Notificações inteligentes"]
    },
    {
      icon: TrendingUp,
      title: "Análise de Negócios",
      description: "Identificamos oportunidades de melhoria e otimização através de análises profundas do seu negócio.",
      features: ["Análise de tendências", "Benchmarking", "Forecasting", "ROI e métricas"]
    },
    {
      icon: Shield,
      title: "Governança de Dados",
      description: "Implementamos políticas e controles para garantir segurança, privacidade e conformidade dos seus dados.",
      features: ["Políticas de acesso", "Auditoria de dados", "LGPD compliance", "Backup e recovery"]
    },
    {
      icon: Users,
      title: "Treinamento & Capacitação",
      description: "Capacitamos sua equipe para utilizar as ferramentas e processos implementados de forma autônoma.",
      features: ["Workshops práticos", "Documentação técnica", "Suporte contínuo", "Best practices"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600">
            Soluções completas para transformar a gestão de dados da sua empresa. 
            Atendemos empresas de todos os setores com expertise e inovação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-600 to-green-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
