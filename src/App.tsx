import { useState, useRef, useEffect } from "react";
import about from '../public/about.png'
import projetos from '../public/projetos.png'
import github from '../public/github.png'
import link from '../public/link.png'
import linkedin from '../public/linkedin.png'

// Interface para tipar os dados do repositório
type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

// Componente para a lista de projetos (Repositórios)
function ProjectsContent() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    // Busca repositórios ordenados por atualização
    fetch('https://api.github.com/users/Luiz-Mendonca1/repos?sort=updated&per_page=4')
      .then(response => response.json())
      .then(data => setRepos(data))
      .catch(error => console.error("Erro ao buscar repositórios:", error));
  }, []);

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
        Atualizados Recentemente
      </h3>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <a 
              key={repo.id}
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-3 bg-gray-50 hover:bg-blue-50 hover:border-blue-300AQ border border-gray-200 rounded-lg transition-all duration-200 group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-blue-600 group-hover:text-blue-700 text-sm truncate">
                  {repo.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {repo.description || "Sem descrição disponível."}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center text-xs text-gray-400 animate-pulse">Carregando repositórios...</p>
        )}
      </div>
    </div>
  );
}

// Componente dedicado apenas para os Links Sociais
function LinksContent() {
  return (
    <>
    <div className="flex justify-center gap-8 py-4">
      <a href="https://github.com/Luiz-Mendonca1" className="flex flex-col items-center transform hover:scale-110 duration-200" target="_blank">
        <img src={github} alt="github img" className="h-16 w-16 mb-2 transition-transform duration-200" />
        <span className="text-base">GitHub</span>
      </a>
      <a href="https://www.linkedin.com/in/luizeduardomendonca/" className="flex flex-col items-center transform hover:scale-110 duration-200" target="_blank">
        <img src={linkedin} alt="linkedin img" className="h-16 w-16 mb-2 transition-transform duration-200" />
        <span className="text-base">LinkedIn</span>
      </a>
    </div>
    <div className=" border-1 border-gray-400" >
      <p className="m-1 text-sm text-gray-500 text-center">ao clicar em qualquer link será aberto em uma nova janela</p>
    </div>
    </>
  );
}

const windowContents = {
  sobre: {
    title: "Sobre",
    content: (
      <div className="space-y-6">
        {/* Cabeçalho com Foto e Nome */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
          <img 
            src="https://github.com/Luiz-Mendonca1.png" 
            alt="Foto de Perfil Luiz Eduardo" 
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-gray-100" 
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">Luiz Eduardo</h1>
            <p className="text-xs font-medium  uppercase tracking-wide mt-1">
              Engenharia de Software - Unifan
            </p>
          </div>
        </div>

        {/* Texto de Apresentação */}
        <div className="text-gray-600 text-sm leading-relaxed">
          <p className="mb-3">
            Desenvolvedor <strong>Full-stack</strong> em formação. Projetos dos mais variados tipos, pode obeservalos no meu <a className="text-blue-600" href="https://github.com/Luiz-Mendonca1" target="_blank">GitHub</a>.
          </p>
          <p className="text-gray-500 text-xs italic">
            Interessado em colaborar? Me chame no LinkedIn ou GitHub.
          </p>
        </div>

        {/* Seção de Idiomas Estilizada */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            Proficiência Linguística
          </h2>
          <div className="space-y-2">
            
            <div className="flex justify-between items-center group">
              <span className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">🇧🇷</span> Português
              </span>
              <span className="text-[10px] font-bold">
                Nativo
              </span>
            </div>

            <div className="w-full h-px bg-gray-200/50"></div>

            <div className="flex justify-between items-center group">
              <span className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">🇺🇸</span> Inglês
              </span>
              <span className="text-[10px] font-bold">
                Avançado
              </span>
            </div>

            <div className="w-full h-px bg-gray-200/50"></div>

            <div className="flex justify-between items-center group">
              <span className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <span className="text-lg">🇲🇽</span> Espanhol
              </span>
              <span className="text-[10px] font-bold">
                Intermediário
              </span>
            </div>

          </div>
        </div>
      </div>
    ),
  },
  links: {
    title: "Links",
    content: <LinksContent />,
  },
  projetos: { // Alterado de contato para projetos
    title: "Projetos",
    content: <ProjectsContent />, // Conteúdo transferido de Links para cá
  },
};

type WindowProps = {
  id: number;
  title: string;
  children: React.ReactNode;
  x: number;
  y: number;
  z: number;
  onClose: (id: number) => void;
  onMove: (id: number, x: number, y: number) => void;
  onBringToFront: (id: number) => void;
};

function Window({ id, title, children, x, y, z, onClose, onMove, onBringToFront }: WindowProps) {
  const dragRef = useRef<{ dragging: boolean; offsetX: number; offsetY: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    onBringToFront(id);
    const startX = e.clientX;
    const startY = e.clientY;
    dragRef.current = { dragging: true, offsetX: startX - x, offsetY: startY - y };

    const onPointerMove = (ev: PointerEvent) => {
      if (!dragRef.current || !dragRef.current.dragging) return;
      const newX = ev.clientX - dragRef.current.offsetX;
      const newY = ev.clientY - dragRef.current.offsetY;
      onMove(id, newX, newY);
    };

    const onPointerUp = () => {
      dragRef.current = null;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div
      className="fixed w-full max-w-md bg-white rounded-lg shadow-2xl border-2 border-gray-600"
      style={{ left: x, top: y, zIndex: z }}
      onMouseDown={() => onBringToFront(id)}
    >
      <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600 " onPointerDown={onPointerDown}>
        <span className="text-white font-semibold">{title}</span>
        <button className="text-gray-300 hover:text-white" onClick={() => onClose(id)}>✕</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

type WindowType = 'sobre' | 'links' | 'projetos'; // Tipo atualizado
type WindowItem = { type: WindowType; id: number; x: number; y: number; z: number };

function App() {
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const zRef = useRef(1000);

  const bringToFront = (id: number) => {
    zRef.current += 1;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: zRef.current } : w)));
  };

  const openWindow = (type: WindowType) => {
    const id = Date.now() + Math.random();
    const width = 360; 
    const height = 220; 
    const left = typeof window !== 'undefined' ? Math.max(20, Math.floor(window.innerWidth / 2 - width / 2 + (windows.length * 20) % 200)) : 100;
    const top = typeof window !== 'undefined' ? Math.max(20, Math.floor(window.innerHeight / 2 - height / 2 + (windows.length * 20) % 200)) : 100;
    zRef.current += 1;
    const newWindow: WindowItem = { type, id, x: left, y: top, z: zRef.current };
    setWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = (id: number) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const moveWindow = (id: number, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  return (
    <div className="min-h-screen bg-[url('https://d7hftxdivxxvm.cloudfront.net/?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2P6t_Yt6dF0TNN76dlp-_Q%252F3417757448_4a6bdf36ce_o.jpg&width=1200')] h-screen bg-cover bg-center flex items-center justify-center p-4 relative">
      <div className="w-full max-w-lg aspect-[4/3] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-gray-600 rounded-t-lg shrink-0">
          <div className="flex items-center space-x-2">
            <span className="ml-2 text-white font-semibold">home</span>
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-gray-600 rounded-b-lg flex-1 flex flex-col justify-center">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-3xl text-gray-800 font-semibold">
                Olá,
              </h1>
              <h1 className="text-4xl text-[#0c4dda] font-bold">
                sou Luiz Eduardo
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">desenvolvedor</p>
            <div className="flex justify-center space-x-8">
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('sobre')}>
                <img src={about} alt="sobre img" className="h-12 w-12 mb-1 transition-transform duration-200" />
                <span className="text-sm">sobre</span>
              </button>
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('links')}>
                <img src={link} alt="links img" className="h-12 w-12 mb-1 rounded transition-transform duration-200" />
                <span className="text-sm">links</span>
              </button>
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('projetos')}>
                <img src={projetos} alt="project img" className="h-12 w-12 mb-1 rounded transition-transform duration-200" />
                <span className="text-sm">projetos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {windows.map((w) => (
        <Window
          key={w.id}
          id={w.id}
          title={windowContents[w.type].title}
          x={w.x}
          y={w.y}
          z={w.z}
          onClose={closeWindow}
          onMove={moveWindow}
          onBringToFront={bringToFront}
        >
          {windowContents[w.type].content}
        </Window>
      ))}
    </div>
  );
}

export default App;