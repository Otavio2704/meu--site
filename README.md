# 🌟 Portfólio Pessoal - Otávio Guedes

Um portfólio moderno e interativo desenvolvido para apresentar minhas habilidades como Desenvolvedor Back-end Java e Engenheiro de Software.

![License](https://img.shields.io/badge/license-MIT-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Demonstração

Acesse o portfólio em: [https://otavio2007-backend.edgeone.app](https://otavio2007-backend.edgeone.app)

## ✨ Características

- **Design Responsivo**: Totalmente adaptável para desktop, tablet e mobile
- **Animações Interativas**: Sistema solar animado com tecnologias orbitando ao redor da foto de perfil
- **Tema Escuro Moderno**: Paleta de cores dourada e preta para uma aparência profissional
- **Seções Organizadas**: 
  - Apresentação inicial com call-to-action
  - Sobre mim com habilidades técnicas
  - Galeria de projetos com links para GitHub
  - Formulário de contato funcional
- **Otimizado para SEO**: Meta tags completas e semântica HTML adequada
- **Acessibilidade**: Estrutura ARIA e navegação por teclado
- **Integração EmailJS**: Formulário de contato funcional sem backend

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com animações e grid layout
- **JavaScript Vanilla**: Interatividade e animações
- **EmailJS**: Envio de emails do formulário de contato
- **Devicon**: Ícones de tecnologias
- **Google Fonts**: Tipografia system-ui

## 📋 Seções do Portfólio

### 🏠 Início (Hero)
- Apresentação pessoal com destaque para especialização
- Botões de ação: Download CV e Ver Projetos
- Links para redes sociais
- Sistema solar interativo com tecnologias

### 👨‍💻 Sobre
- Descrição profissional e objetivos
- Grade de habilidades técnicas
- Snippet de código animado

### 💼 Projetos
Showcase de 6 projetos principais:
- Organizador de Arquivos (Python)
- Roguelike Java
- AcademiaGYM API REST
- Sistema E-commerce - Modelagem de Banco
- Gerenciador de Times e Jogadores
- Otavio's Bank - Sistema Bancário POO

### 📬 Contato
- Informações de contato (GitHub e LinkedIn)
- Formulário funcional de contato via EmailJS

## 🎨 Paleta de Cores

```css
--bg-1: #2a2000      /* Fundo principal */
--bg-2: #000000      /* Fundo secundário */
--text: #fff9e6      /* Texto principal */
--muted: #d9c873     /* Texto secundário */
--accent: #ffd700    /* Destaque dourado */
--accent-2: #ffea70  /* Destaque claro */
```

## 📱 Responsividade

O portfólio é totalmente responsivo com breakpoints para:
- Desktop (1200px+)
- Laptop (1024px)
- Tablet (768px)
- Mobile (480px)
- Mobile pequeno (360px)

## 🚀 Como Usar

1. **Clone o repositório**
```bash
git clone https://github.com/Otavio2704/portfolio.git
```

2. **Navegue até a pasta do projeto**
```bash
cd portfolio
```

3. **Personalize o conteúdo**
   - Atualize as informações pessoais no `index.html`
   - Substitua a foto de perfil (`minha-foto.jpg`)
   - Adicione seu currículo em PDF (`Otavio_Guedes_Curriculo.pdf`)
   - Configure suas credenciais EmailJS no script

4. **Configure o EmailJS**
   - Crie uma conta em [EmailJS](https://www.emailjs.com/)
   - Substitua os IDs no `script.js`:
```javascript
await emailjs.sendForm(
    "seu_service_id",
    "seu_template_id",
    form
);
```
   - Atualize a public key no `index.html`

5. **Abra o arquivo `index.html` no navegador**

## 📦 Estrutura de Arquivos

```
portfolio/
│
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Funcionalidades JavaScript
├── LICENSE             # Licença MIT
├── icon.jpg            # Favicon
├── minha-foto.jpg      # Foto de perfil
└── Otavio_Guedes_Curriculo.pdf  # Currículo
```

## 🎯 Funcionalidades Principais

### Navegação
- Menu responsivo com hamburger para mobile
- Scroll suave entre seções
- Indicador de seção ativa

### Sistema Solar Interativo
- 6 tecnologias orbitando a foto de perfil
- Animações pausáveis ao hover
- Efeito de brilho (glow) no sol central

### Animações
- Entrada de elementos com Intersection Observer
- Transições suaves entre estados
- Hover effects em cards e botões

### Formulário de Contato
- Validação HTML5
- Integração com EmailJS
- Feedback visual de envio

## 🌐 SEO e Meta Tags

O projeto inclui meta tags otimizadas para:
- Open Graph (Facebook)
- Twitter Cards
- Descrição e palavras-chave
- URL canônica

## ♿ Acessibilidade

- Estrutura semântica HTML5
- Atributos ARIA adequados
- Labels para leitores de tela
- Navegação por teclado
- Contraste de cores adequado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Otávio Guedes**

- GitHub: [@Otavio2704](https://github.com/Otavio2704)
- LinkedIn: [/in/otavio-backend2007](https://www.linkedin.com/in/otavio-backend2007)

## 🤝 Contribuições

Contribuições, issues e solicitações de funcionalidades são bem-vindas!

## ⭐ Mostre seu apoio

Se este projeto te ajudou, considere dar uma ⭐️!

---

<p align="center">Desenvolvido com 💛 por Otávio Guedes</p>
