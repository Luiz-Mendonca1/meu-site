import { useState, useRef } from "react";
import about from '../public/about_3697.png'
import contact from '../public/contacts.png'
import github from '../public/github.png'
import insta from '../public/insta.png'
import link from '../public/link.png'
import linkedin from '../public/linkedin.png'
import twitter from '../public/twitter.png'


const windowContents = {
  sobre: {
    title: "Sobre",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Sobre mim</h2>
        <p className="text-gray-700">olá, sou Luiz,</p>
        <p className="text-gray-700">desenvolvedor Full-stack em formação e
ilustrador ocasionalmente</p>
        <h2 className="font-semibold text-xl">Proficiência linguística</h2>
        <p className="text-gray-700">Português nativo <br /> Inglês avançado <br /> Espanhol intermediário</p>
      </div>
    ),
  },
  links: {
    title: "Links",
    content: (
      <div>
        <div className="flex justify-center gap-8">
          <a href="#" className="flex flex-col items-center transform hover:scale-110 duration-200">
            <img src={insta} alt="github img" className="h-16 w-16 mb-2 transition-transform duration-200" />
            <span className="text-base ">Instagram</span>
          </a>
          <a href="#" className="flex flex-col items-center transform hover:scale-110 duration-200">
            <img src={twitter} alt="github img" className="h-16 w-16 mb-2 transition-transform duration-200" />
            <span className="text-base ">Twitter</span>
          </a>
          <a href="#" className="flex flex-col items-center transform hover:scale-110 duration-200">
            <img src={github} alt="github img" className="h-16 w-16 mb-2 transition-transform duration-200" />
            <span className="text-base ">GitHub</span>
          </a>
          <a href="#" className="flex flex-col items-center transform hover:scale-110 duration-200">
            <img src={linkedin} alt="linkedin img" className="h-16 w-16 mb-2  transition-transform duration-200" />
            <span className="text-base ">LinkedIn</span>
          </a>
        </div>
      </div>
    ),
  },
  contato: {
    title: "Contato",
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-2">Contato</h2>
        <p className="text-gray-700">Email: luiz@email.com<br/>WhatsApp: (99) 99999-9999</p>
      </div>
    ),
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

type WindowType = 'sobre' | 'links' | 'contato';
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
    const width = 360; // approximate
    const height = 220; // approximate
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
      <div className="w-full max-w-2xl">
        {/* Barra de título */}
        <div className="flex items-center justify-between bg-gray-700 px-4 py-2  border-gray-600 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <span className="ml-2 text-white font-semibold">home</span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 bg-white border-2 border-gray-600 rounded-b-lg">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-3xl text-gray-800 font-semibold">
                Olá,
              </h1>
              <h1 className="text-4xl text-[#0c4dda] font-bold">
                sou Luiz Eduardo
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">desenvolvedor e ilustrador</p>
            <div className="flex justify-center space-x-8">
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('sobre')}>
                <img src={about} alt="sobre img" className="h-12 w-12 mb-1 transition-transform duration-200" />
                <span className="text-sm">sobre</span>
              </button>
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('links')}>
                <img src={link} alt="links img" className="h-12 w-12 mb-1 rounded transition-transform duration-200" />
                <span className="text-sm">links</span>
              </button>
              <button className="flex flex-col items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-24 transform hover:scale-110 duration-200" onClick={() => openWindow('contato')}>
                <img src={contact} alt="contact img" className="h-12 w-12 mb-1 rounded transition-transform duration-200" />
                <span className="text-sm">contato</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Janelas abertas */}
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
