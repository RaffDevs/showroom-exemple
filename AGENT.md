Layout da seção

A seção deve conter:

Header da seção

Título:

Explore nosso showroom

Subtítulo:

Clique nos pontos da imagem para conhecer peças que transformam o ambiente.
Área principal

Criar layout responsivo:

Desktop
Imagem do showroom à esquerda
Card do produto selecionado à direita
Mobile
Imagem no topo
Card do produto selecionado abaixo
Hotspots grandes o suficiente para toque
Imagem do showroom

Usar next/image.

Pode usar placeholder remoto inicialmente, por exemplo:

https://images.unsplash.com/photo-1618221195710-dd6b41faaea6

A imagem deve:

ter bordas arredondadas
ocupar largura total no mobile
manter proporção agradável
ter overlay sutil para melhorar leitura dos hotspots
possuir alt descritivo
Hotspots

Cada hotspot deve:

ser um botão acessível
ficar posicionado com left e top usando porcentagem
ter animação de pulse com Framer Motion ou Tailwind
ter estado ativo
ser visível em cima da imagem
ter boa área de toque no mobile
mostrar número ou ícone pequeno dentro

Visual sugerido:

círculo branco
borda em tom dourado/marrom
sombra suave
animação pulse
quando ativo, preencher com marrom/dourado
Dados mockados

Criar um array de produtos dentro do componente ou em arquivo separado.

Preferencialmente criar:

data/showroom-items.ts

Com o seguinte formato:

export type ShowroomItem = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: string;
  category: string;
  x: number;
  y: number;
  whatsappMessage: string;
};

export const showroomItems: ShowroomItem[] = [
  {
    id: "vaso-areia",
    name: "Vaso Decorativo Areia",
    shortName: "Vaso",
    description: "Peça delicada em tons neutros para compor salas, aparadores e mesas laterais.",
    price: "Sob consulta",
    category: "Decoração",
    x: 68,
    y: 54,
    whatsappMessage: "Olá! Tenho interesse no Vaso Decorativo Areia que vi no showroom.",
  },
  {
    id: "quadro-organico",
    name: "Quadro Orgânico",
    shortName: "Quadro",
    description: "Arte minimalista com formas naturais para trazer leveza e personalidade ao ambiente.",
    price: "Sob consulta",
    category: "Parede",
    x: 42,
    y: 28,
    whatsappMessage: "Olá! Tenho interesse no Quadro Orgânico que vi no showroom.",
  },
  {
    id: "luminaria-dourada",
    name: "Luminária Dourada",
    shortName: "Luminária",
    description: "Iluminação decorativa com acabamento elegante para criar um clima mais acolhedor.",
    price: "Sob consulta",
    category: "Iluminação",
    x: 78,
    y: 32,
    whatsappMessage: "Olá! Tenho interesse na Luminária Dourada que vi no showroom.",
  },
  {
    id: "almofadas-linho",
    name: "Almofadas em Linho",
    shortName: "Almofadas",
    description: "Texturas suaves e cores neutras para deixar o sofá mais confortável e sofisticado.",
    price: "Sob consulta",
    category: "Têxteis",
    x: 36,
    y: 62,
    whatsappMessage: "Olá! Tenho interesse nas Almofadas em Linho que vi no showroom.",
  },
  {
    id: "mesa-lateral",
    name: "Mesa Lateral Freijó",
    shortName: "Mesa",
    description: "Mesa lateral compacta para apoiar livros, vasos e objetos decorativos.",
    price: "Sob consulta",
    category: "Móveis",
    x: 58,
    y: 70,
    whatsappMessage: "Olá! Tenho interesse na Mesa Lateral Freijó que vi no showroom.",
  },
];
Card do produto

Quando nenhum item estiver selecionado, mostrar um card inicial com:

Título:

Escolha um item no ambiente

Texto:

Toque em qualquer ponto da imagem para ver detalhes da peça decorativa.

Botão:

Falar com especialista

Quando houver item selecionado, mostrar:

categoria
nome do produto
descrição
preço
botão “Quero esse item”
botão secundário “Ver outro item” ou “Limpar seleção”

O botão do WhatsApp deve abrir em nova aba.

WhatsApp

Criar helper:

function createWhatsappLink(message: string) {
  const phone = "5516999999999";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

Todos os CTAs devem usar esse helper.

Interações

Implementar:

clique no hotspot seleciona produto
hotspot ativo muda de estilo
card anima ao trocar produto
no mobile, ao selecionar hotspot, o card deve ficar visível logo abaixo
opcional: fazer scroll suave até o card no mobile
botão “Limpar seleção” volta para o estado inicial
Animações

Usar Framer Motion para:

entrada suave da seção
pulse nos hotspots
transição do card
hover nos botões/cards

Animações devem ser elegantes e discretas.

Não exagerar.

Responsividade

Garantir:

mobile first
imagem não quebra layout
hotspots continuam alinhados
card legível em telas pequenas
botões grandes para toque
espaçamentos confortáveis

Breakpoints sugeridos:

mobile: uma coluna
desktop: grid com imagem 65% e card 35%
Acessibilidade

Requisitos:

hotspots devem ser <button>
cada hotspot deve ter aria-label, exemplo:
Ver detalhes de Vaso Decorativo Areia
botão ativo deve ter aria-pressed
imagens devem ter alt
foco visível em todos os botões
não depender apenas de cor para indicar estado
contraste adequado
Estilo visual

Identidade:

decoração residencial
elegante
aconchegante
premium acessível

Cores sugeridas:

fundo: #F8F3EC
card: #FFFFFF
texto principal: #2F2923
texto secundário: #7A6A5D
destaque: #A67C52
destaque escuro: #6F4E37

Usar Tailwind com classes próximas dessas cores ou configurar cores no próprio componente se necessário.

Visual:

cantos arredondados grandes
sombras suaves
bordas discretas
bastante respiro
nada poluído
Estados esperados

Implementar os estados:

Nenhum produto selecionado
Produto selecionado
Hover no hotspot
Hotspot ativo
Foco via teclado
Mobile layout
Desktop layout
Critérios de aceite

A implementação será considerada correta se:

existir um componente InteractiveShowroom
a seção renderizar corretamente em uma página Next.js
os hotspots aparecerem posicionados sobre a imagem
clicar em cada hotspot trocar o produto ativo
o card exibir as informações corretas
o botão de WhatsApp gerar mensagem personalizada
layout for responsivo
funcionar bem no mobile
usar TypeScript corretamente
usar Tailwind CSS
usar Framer Motion
usar next/image
manter acessibilidade básica
não depender de backend
Importante

Não criar landing page completa.

Não criar header.

Não criar footer.

Não criar páginas extras.

Foque apenas no componente de showroom interativo e nos arquivos necessários para ele funcionar.

Código deve ser limpo, organizado e fácil de reutilizar em uma landing page maior.