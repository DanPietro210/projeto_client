
import { Award, Clock, Target, Users2 } from "lucide-react";

export const About = () => {
  const stats = [
    { icon: Clock, number: "15+", label: "Anos de Experiência", description: "na área hospitalar" },
    { icon: Users2, number: "50+", label: "Projetos Entregues", description: "em diversos setores" },
    { icon: Target, number: "100%", label: "Foco em Resultados", description: "orientados por dados" },
    { icon: Award, number: "24/7", label: "Suporte Contínuo", description: "para nossos clientes" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-teal-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Sobre a 
                <span className="bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent">
                  {" "}ZayaM Tech
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Com mais de 15 anos de experiência na área hospitalar, expandimos nossa expertise para 
                atender empresas de todos os setores, oferecendo soluções robustas em estruturação de dados e análise de negócios.
              </p>
              <p className="text-lg text-gray-600">
                Nossa missão é transformar dados em decisões estratégicas, proporcionando automação, 
                eficiência e crescimento sustentável para nossos clientes. Combinamos conhecimento técnico 
                avançado com visão de negócios para entregar resultados que realmente importam.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Nossa Abordagem</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-600 to-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Diagnóstico Completo</h4>
                    <p className="text-gray-600">Analisamos profundamente seus processos e necessidades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-600 to-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solução Personalizada</h4>
                    <p className="text-gray-600">Desenvolvemos estratégias específicas para seu negócio</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-600 to-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Implementação & Suporte</h4>
                    <p className="text-gray-600">Garantimos sucesso na implementação e crescimento contínuo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
