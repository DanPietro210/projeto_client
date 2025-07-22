
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="lovable-uploads/ImgLogoZayaM.png" 
                alt="ZayaM Tech"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transformamos dados em decisões estratégicas. Especialistas em Power BI, 
              estruturação de dados e automação de processos para empresas de todos os setores.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:daniel.pietro@zayamtech.com" className="p-2 bg-gray-800 rounded-lg hover:bg-teal-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Estruturação de Dados</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Power BI & Analytics</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Automação de Processos</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Análise de Negócios</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Treinamento</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>daniel.pietro@zayamtech.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>(21) 98992-1297</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ZayaM Tech. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
