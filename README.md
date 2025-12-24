# 🌟 Portfólio Pessoal - Otávio Guedes

Um portfólio moderno, interativo e bilíngue desenvolvido para apresentar minhas habilidades como Desenvolvedor Back-end Java e Engenheiro de Software.

![License](https://img.shields.io/badge/license-MIT-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Demonstração

Acesse o portfólio em: [https://otavio2007-backend.edgeone.app](https://otavio2007-backend.edgeone.app)

## ✨ Características

- **Design Responsivo**: Totalmente adaptável para desktop, tablet e mobile com breakpoints otimizados
- **Bilíngue (PT/EN)**: Sistema completo de internacionalização com alternância de idioma e persistência via localStorage
- **Animações Interativas**: Sistema solar animado com 6 tecnologias orbitando ao redor da foto de perfil
- **Tema Escuro Moderno**: Paleta de cores dourada e preta com efeitos de brilho e glassmorphism
- **Seções Organizadas**: 
  - Hero section com apresentação e call-to-action
  - Sobre mim com habilidades técnicas e snippet de código animado
  - Galeria de 6 projetos principais com cards interativos
  - Formulário de contato funcional com validação
- **Otimizado para SEO**: Meta tags Open Graph, Twitter Cards e structured data
- **Acessibilidade**: Estrutura semântica HTML5, atributos ARIA e navegação por teclado
- **Integração EmailJS**: Formulário de contato funcional sem necessidade de backend
- **Navegação Inteligente**: Indicador de seção ativa e scroll suave entre seções
- **Menu Hamburger**: Menu mobile responsivo com animação fluida

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível com meta tags otimizadas
- **CSS3**: Estilização moderna com:
  - Animações e transições suaves
  - Grid e Flexbox layouts
  - Custom properties (CSS Variables)
  - Media queries para responsividade
  - Keyframe animations
- **JavaScript Vanilla**: Funcionalidades incluindo:
  - Intersection Observer API para animações
  - Sistema de internacionalização (i18n)
  - Controle de navegação e menu mobile
  - Animações do sistema solar
- **EmailJS**: Serviço de envio de emails do formulário
- **Devicon CDN**: Ícones de tecnologias
- **Google Fonts**: Tipografia system-ui

## 📋 Seções do Portfólio

### 🏠 Início (Hero)
- Apresentação pessoal com destaque para especialização
- Botões de ação: Download CV (com versão PT/EN) e Ver Projetos
- Links para GitHub e LinkedIn
- Sistema solar interativo com 6 tecnologias (Java, Spring, PostgreSQL, Maven, AWS, Git)
- Animações de entrada (slideInLeft/slideInRight)

### 👨‍💻 Sobre
- Descrição profissional e objetivos de carreira
- Grade de 10 habilidades técnicas principais
- Snippet de código Java animado com syntax highlighting
- Layout em grid responsivo

### 💼 Projetos
Showcase de 6 projetos principais com preview visual

Cada projeto inclui:
- Imagem placeholder
- Descrição detalhada
- Tags de tecnologias utilizadas
- Link direto para o repositório GitHub

### 📬 Contato
- Informações de contato (GitHub e LinkedIn) com ícones SVG
- Formulário funcional com 3 campos (nome, email, mensagem)
- Validação HTML5 e integração EmailJS
- Mensagens de feedback em PT/EN

## 🎨 Paleta de Cores

```css
--bg-1: #2a2000      /* Fundo principal (marrom escuro) */
--bg-2: #000000      /* Fundo secundário (preto) */
--text: #fff9e6      /* Texto principal (bege claro) */
--muted: #d9c873     /* Texto secundário (dourado suave) */
--accent: #ffd700    /* Destaque principal (dourado) */
--accent-2: #ffea70  /* Destaque secundário (amarelo claro) */
--card: #3b2f00      /* Background de cards */
--shadow: 0 10px 30px rgba(255, 215, 0, 0.2) /* Sombra dourada */
```

## 🌐 Sistema de Internacionalização

O portfólio suporta dois idiomas com alternância dinâmica:

- **Português (PT-BR)** - Idioma padrão
- **English (EN)** - Tradução completa

### Funcionalidades i18n:
- Tradução de todos os textos via atributo `data-i18n`
- Tradução de placeholders de formulário via `data-i18n-placeholder`
- Alternância de arquivo de CV (PT/EN)
- Persistência de preferência no localStorage
- Atualização dinâmica do atributo `lang` do HTML
- Botão visual com ícone 🌐 e texto indicativo

## 📱 Responsividade

O portfólio possui breakpoints otimizados para:

- **Desktop Large** (1200px+) - Layout completo em grid
- **Laptop** (1024px) - Ajustes de espaçamento
- **Tablet** (768px) - Menu hamburger ativado, layouts em coluna única
- **Mobile** (480px) - Botões full-width, órbitas reduzidas
- **Mobile Small** (360px) - Ajustes adicionais de tipografia
- **Landscape Mobile** - Altura reduzida otimizada

### Otimizações Responsivas:
- Textos com `clamp()` para escala fluida
- Grid adaptativo com `minmax()` e `auto-fit`
- Animações de órbita ajustadas por breakpoint
- Menu mobile com overlay full-screen
- Imagens com `loading="lazy"`

## 🎭 Animações e Efeitos

### Sistema Solar Interativo
- 6 ícones de tecnologia orbitando a foto de perfil
- Animação `orbit` de 20 segundos com delays escalonados
- Pausa ao hover na foto ou nos ícones
- Efeito `sunGlow` pulsante de 3 segundos
- Escala e sombra ao hover nos ícones

### Efeitos Visuais
- Background com estrelas animadas (keyframe `stars`)
- Gradiente radial de fundo
- Glassmorphism nos cards com `backdrop-filter`
- Transições suaves em todos os elementos interativos
- Animações de entrada com Intersection Observer:
  - `slide-in-left` (transform translateX)
  - `slide-in-right` (transform translateX)
  - `slide-in-up` (transform translateY)

### Botões Estilizados
- **glow-genz-button**: Border dourado com efeito gradient ao hover
- **outline-button**: Background dourado sólido com transformação
- Animação `glowGradient` de 4 segundos

## 🚀 Como Usar

### 1. Clone o repositório
```bash
git clone https://github.com/Otavio2704/portfolio.git
cd portfolio
```

### 2. Estrutura de arquivos necessária
```
portfolio/
│
├── index.html                      # Estrutura HTML
├── style.css                       # Estilos e animações
├── script.js                       # JavaScript funcional
├── LICENSE                         # Licença MIT
├── icon.jpg                        # Favicon (16x16 ou 32x32)
├── minha-foto.jpg                  # Foto de perfil (quadrada recomendado)
├── Otavio_Guedes_Curriculo.pdf     # CV em português
└── Otavio_Guedes_Resume.pdf        # CV em inglês (opcional)
```

### 3. Personalize o conteúdo

#### No `index.html`:
- **Linha 6-7**: Atualize `description` e `keywords` com suas informações
- **Linha 11-21**: Configure Open Graph e Twitter Cards
- **Linha 32-33**: Substitua URLs do GitHub e LinkedIn
- **Linha 52**: Altere nome e título na saudação
- **Linha 53**: Atualize título principal
- **Linha 54**: Modifique citação/descrição
- **Linha 57**: Link para seu CV
- **Linha 63-64**: URLs das suas redes sociais
- **Linha 70**: Caminho da sua foto de perfil
- **Linha 111**: Texto sobre você
- **Linha 115-124**: Suas habilidades técnicas
- **Linha 131-137**: Snippet de código personalizado
- **Linha 148-330**: Cards dos seus projetos (6 no total)
- **Linha 346-362**: Suas informações de contato

#### No `script.js`:
- **Linha 198-201**: Configure suas credenciais EmailJS:
```javascript
await emailjs.sendForm(
    "seu_service_id",      // Service ID do EmailJS
    "seu_template_id",     // Template ID do EmailJS
    form
);
```

- **Linha 213-474**: Traduções completas em PT e EN (personalize conforme necessário)

### 4. Configure o EmailJS

1. Crie uma conta gratuita em [EmailJS](https://www.emailjs.com/)
2. Crie um novo serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email com as variáveis:
   - `{{user_name}}` - Nome do remetente
   - `{{user_email}}` - Email do remetente
   - `{{message}}` - Mensagem
4. Copie o Service ID e Template ID
5. Atualize no `index.html` (linha 354):
```javascript
emailjs.init({
    publicKey: "SUA_PUBLIC_KEY_AQUI"
});
```
6. Atualize no `script.js` (linha 198-201)

### 5. Adicione suas imagens
- **icon.jpg**: Favicon do site (16x16px ou 32x32px)
- **minha-foto.jpg**: Foto de perfil (recomendado 300x300px ou maior, quadrada)
- **preview.jpg** (opcional): Preview para redes sociais (1200x630px recomendado)

### 6. Atualize os CVs
- **Otavio_Guedes_Curriculo.pdf**: Seu currículo em português
- **Otavio_Guedes_Resume.pdf**: Seu currículo em inglês (opcional, mas recomendado)

### 7. Teste localmente
Abra o arquivo `index.html` diretamente no navegador ou use um servidor local:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

Acesse `http://localhost:8000`

### 8. Deploy

#### Opções de hospedagem gratuita:
- **GitHub Pages**: Push para repositório e ative nas configurações
- **Vercel**: Conecte repositório e deploy automático
- **Netlify**: Drag & drop da pasta ou conecte repositório
- **EdgeOne** (atual): Plataforma de CDN e hosting

## 🎯 Funcionalidades JavaScript

### initNavbar()
- Toggle de menu mobile
- Indicador de seção ativa usando Intersection Observer
- Fecha menu ao clicar em links

### initOrbitAnimations()
- Controla pausa/retomada das órbitas ao hover
- Event listeners na foto e nos ícones

### initSmoothScroll()
- Scroll suave entre seções
- Ajuste de offset para o header fixo

### initSectionAnimations()
- Intersection Observer para animações de entrada
- Classes: `slide-in-left`, `slide-in-right`, `slide-in-up`

### initContactForm()
- Integração com EmailJS
- Mensagens de sucesso/erro em PT/EN
- Reset do formulário após envio

### initLanguageToggle()
- Sistema completo de i18n
- Persistência no localStorage
- Atualização dinâmica de textos e placeholders
- Troca de arquivo de CV

## 🔍 SEO e Meta Tags

O projeto inclui otimizações completas:

### Open Graph (Facebook, WhatsApp, LinkedIn)
- `og:type`, `og:url`, `og:title`, `og:description`, `og:image`

### Twitter Cards
- `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`

### Básico
- Meta description detalhada
- Keywords relevantes
- Canonical URL
- Viewport configurado
- Structured data (título semântico)

## ♿ Acessibilidade

Implementações de acessibilidade:

- **Estrutura Semântica**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **ARIA Labels**: 
  - `role="banner"` no header
  - `role="navigation"` no nav
  - `role="menubar"` e `role="menuitem"` nos links
  - `aria-label` em ícones e botões
  - `aria-expanded` no menu hamburger
  - `aria-hidden="true"` em elementos decorativos
- **Navegação por Teclado**: Todos os elementos interativos acessíveis via Tab
- **Labels para Formulários**: Inputs com labels (sr-only) e placeholders
- **Contraste de Cores**: Paleta com contraste adequado (WCAG AA)
- **Foco Visível**: Outline personalizado em elementos focados
- **Alt Text**: Todas as imagens com texto alternativo descritivo

## 📊 Performance

### Otimizações implementadas:
- Lazy loading de imagens com `loading="lazy"`
- CDN para bibliotecas externas (Devicon, EmailJS)
- CSS minificado com vendor prefixes otimizados
- JavaScript vanilla (sem frameworks pesados)
- Uso de `clamp()` para reduzir media queries CSS
- Intersection Observer para animações apenas quando visíveis
- Background patterns em CSS (sem imagens)

### Métricas recomendadas:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

## 🔧 Personalização Avançada

### Alterar cores do tema
Edite as CSS variables no `:root` do `style.css`:
```css
:root {
  --bg-1: #2a2000;      /* Fundo principal */
  --accent: #ffd700;    /* Cor de destaque */
  /* ... */
}
```

### Adicionar mais projetos
Duplique um `<article class="project-card">` no HTML e atualize:
- Imagem (altere URL do placeholder)
- Título e descrição
- Tags de tecnologias
- Link do GitHub

### Modificar tecnologias orbitando
No HTML, dentro de `.orbit-icons`, altere os ícones:
```html
<div class="tech-icon orbit-item" data-orbit="1">
    <img src="URL_DO_ICONE" alt="Nome da Tech" title="Nome da Tech" loading="lazy" />
</div>
```

Ícones disponíveis em: [Devicon](https://devicon.dev/)

### Ajustar velocidade das órbitas
No `style.css`, modifique a duração da animação:
```css
.orbit-item {
  animation: orbit 20s linear infinite; /* Altere 20s */
}
```

### Adicionar mais idiomas
No `script.js`, adicione novo objeto ao `translations`:
```javascript
const translations = {
  pt: { /* ... */ },
  en: { /* ... */ },
  es: { /* traduções em espanhol */ }
};
```

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

**Resumo da licença MIT:**
- ✅ Uso comercial
- ✅ Modificação
- ✅ Distribuição
- ✅ Uso privado
- ⚠️ Limitação de responsabilidade
- ⚠️ Sem garantia

## 👤 Autor

**Otávio Guedes**

- GitHub: [@Otavio2704](https://github.com/Otavio2704)
- LinkedIn: [/in/otavio-backend2007](https://www.linkedin.com/in/otavio-backend2007)
- Portfolio: [otavio2007-backend.edgeone.app](https://otavio2007-backend.edgeone.app)

## 🤝 Contribuições

Contribuições, issues e solicitações de funcionalidades são bem-vindas!

### Como contribuir:
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Ideias para contribuição:
- Adicionar mais idiomas
- Implementar tema claro/escuro
- Adicionar mais animações
- Melhorar acessibilidade
- Otimizar performance
- Corrigir bugs
- Melhorar documentação

## ⭐ Mostre seu apoio

Se este projeto te ajudou ou você gostou do trabalho, considere:
- Dar uma ⭐️ no repositório
- Compartilhar com outras pessoas
- Usar como base para seu próprio portfólio
- Contribuir com melhorias

## 🙏 Agradecimentos

- [Devicon](https://devicon.dev/) pelos ícones de tecnologias
- [EmailJS](https://www.emailjs.com/) pelo serviço de email
- [EdgeOne](https://edgeone.ai/) pela hospedagem
- Comunidade open source pela inspiração

---

<p align="center">
  <strong>Desenvolvido com 💛 por Otávio Guedes</strong>
  <br>
  <sub>2025 - Portfolio Project</sub>
</p>

<p align="center">
  <a href="#-portfólio-pessoal---otávio-guedes">Voltar ao topo ⬆️</a>
</p>
