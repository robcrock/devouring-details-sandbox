import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';

// Component Registry - Add your course components here
interface ComponentInfo {
  name: string;
  category: string;
  component: React.LazyExoticComponent<React.ComponentType>;
  description: string;
  dependencies: string[];
  source: string;
  principles: string[];
}

const componentRegistry: Record<string, ComponentInfo> = {
  'line-minimap': {
    name: 'Line Minimap',
    category: 'Prototypes',
    component: React.lazy(() => import('./line-minimap')),
    description: 'Animated line visualization with scroll and hover effects',
    dependencies: ['framer-motion'],
    source: 'line-minimap.tsx',
    principles: ['Motion', 'Proximity', 'Feedback']
  },
  // Add more components as you get them from the course
  // 'component-name': {
  //   name: 'Display Name',
  //   category: 'Prototypes',
  //   description: 'Description',
  //   component: React.lazy(() => import('./components/ComponentName')),
  //   dependencies: ['dep1', 'dep2'],
  //   source: 'source-file.tsx',
  //   principles: ['Principle1', 'Principle2']
  // }
};

export default function DevouringDetailsSandbox() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply dark mode class permanently
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [...new Set(Object.values(componentRegistry).map(c => c.category))];

  const ComponentDisplay = ({ component }: { component: ComponentInfo | null }) => {
    if (!component) {
      return (
        <div className="flex items-center justify-center h-full text-gray11">
          <div className="text-center max-w-lg">
            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 bg-orange rounded-full blur-2xl opacity-20 absolute inset-0"></div>
              <Sparkles className="w-32 h-32 text-gray9 relative" />
            </div>
            <p className="text-20 leading-32">Select a prototype from the sidebar to explore its details</p>
          </div>
        </div>
      );
    }

    const Component = component.component;
    return (
      <React.Suspense fallback={<div className="flex items-center justify-center h-full text-gray11">Loading...</div>}>
        <Component />
      </React.Suspense>
    );
  };

  return (
    <div className="h-screen bg-gray1 text-gray12 flex flex-col">
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-orange rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 500,
          mass: 0.5,
        }}
        style={{ display: 'none' }} // Enable in production with proper cursor hiding
      />

      {/* Navigation */}
      <nav className="h-16 bg-gray1 border-b border-gray4 flex-shrink-0">
        <div className="flex items-center h-16 px-6">
          <h1 className="text-20 font-weight-500">Devouring Details</h1>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-80 bg-gray2 border-r border-gray4 flex-shrink-0 h-full">
          <div className="h-full flex flex-col overflow-hidden">
            {/* Component List */}
            <div className="flex-1 overflow-y-auto">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="text-11 uppercase tracking-widest font-weight-600 text-gray11 px-6 py-4 sticky top-0 bg-gray2 border-b border-gray4">
                    {category}
                  </h3>
                  <div className="p-4 space-y-1">
                    {Object.entries(componentRegistry)
                      .filter(([, c]) => c.category === category)
                      .map(([key, component]) => (
                        <motion.button
                          key={key}
                          onClick={() => {
                            setActiveComponent(key);
                          }}
                          className={`w-full text-left px-4 py-5 rounded-12 transition-all relative group ${
                            activeComponent === key
                              ? 'bg-gray3 border border-gray5'
                              : 'hover:bg-gray3/30 border border-transparent'
                          }`}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-18 font-weight-600 mb-2 text-gray12">{component.name}</div>
                              <div className="text-14 text-gray11 leading-22 mb-3">
                                {component.description}
                              </div>
                              {component.principles && (
                                <div className="flex gap-1.5 flex-wrap">
                                  {component.principles.map((principle: string) => (
                                    <span key={principle} className="text-11 px-2.5 py-1 bg-gray3 rounded-6 text-gray11 font-weight-500">
                                      {principle}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <ChevronRight className={`w-5 h-5 text-gray10 transition-all flex-shrink-0 mt-1 ${
                              activeComponent === key ? 'rotate-90 text-gray12' : 'group-hover:translate-x-1 group-hover:text-gray12'
                            }`} />
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray4">
              <p className="text-12 text-gray10 mb-3">
                An interactive reference for interaction-curious designers
              </p>
              <a
                href="https://rauno.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-13 text-gray11 hover:text-gray12 transition-colors inline-flex items-center gap-1"
              >
                by Rauno Freiberg
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {activeComponent && (
            <div className="border-b border-gray4 px-6 py-4 bg-gray2/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-24 font-weight-500 mb-1">
                    {componentRegistry[activeComponent].name}
                  </h2>
                  <div className="flex items-center gap-4 text-13 text-gray11">
                    <span>Dependencies:</span>
                    {componentRegistry[activeComponent].dependencies.map((dep: string) => (
                      <code key={dep} className="px-2 py-0.5 bg-gray3 rounded-4 text-gray12">
                        {dep}
                      </code>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-8 transition-all ${
                    showCode
                      ? 'bg-orange text-white'
                      : 'bg-gray3 hover:bg-gray4'
                  }`}
                >
                  <Code2 size={16} />
                  <span className="text-14 font-weight-500">
                    {showCode ? 'Hide' : 'Show'} Code
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Component Display Area */}
          <div className="flex-1 relative bg-gray1">
            <AnimatePresence mode="wait">
              {showCode && activeComponent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full"
                >
                  <div className="bg-gray2 rounded-16 p-8 h-full overflow-auto shadow-border-medium">
                    <h3 className="text-18 font-weight-500 mb-6">Implementation Guide</h3>
                    <div className="space-y-6 text-14 text-gray11">
                      <div className="bg-gray3 rounded-8 p-4">
                        <p className="font-weight-500 text-gray12 mb-2">1. Install Dependencies</p>
                        <pre className="mt-2 p-3 bg-gray1 rounded-6 overflow-x-auto">
                          <code>npm install {componentRegistry[activeComponent].dependencies.join(' ')}</code>
                        </pre>
                      </div>
                      <div className="bg-gray3 rounded-8 p-4">
                        <p className="font-weight-500 text-gray12 mb-2">2. Import system.css</p>
                        <p>Add to your app root or global styles</p>
                      </div>
                      <div className="bg-gray3 rounded-8 p-4">
                        <p className="font-weight-500 text-gray12 mb-2">3. Copy Component</p>
                        <p>Copy {componentRegistry[activeComponent].source} to your project</p>
                      </div>
                      <div className="bg-gray3 rounded-8 p-4">
                        <p className="font-weight-500 text-gray12 mb-2">4. Import & Use</p>
                        <pre className="mt-2 p-3 bg-gray1 rounded-6 overflow-x-auto">
                          <code>{`import ${componentRegistry[activeComponent].name.replace(/\s+/g, '')} from './components/${componentRegistry[activeComponent].name.replace(/\s+/g, '')}';`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full relative overflow-hidden"
                >
                  <ComponentDisplay component={activeComponent ? componentRegistry[activeComponent] : null} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Instructions */}
          {!activeComponent && (
            <div className="p-8 flex items-center justify-center h-full">
              <div className="bg-gray2 rounded-16 p-8 shadow-border-medium max-w-2xl">
                <h3 className="text-20 font-weight-500 mb-4">Getting Started</h3>
                <ol className="space-y-3 text-15 text-gray11">
                  <li className="flex gap-3">
                    <span className="text-orange font-weight-500">1.</span>
                    <span>Select a prototype from the sidebar to explore</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange font-weight-500">2.</span>
                    <span>Click "Show Code" for implementation details</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange font-weight-500">3.</span>
                    <span>Copy source files and styles to your project</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange font-weight-500">4.</span>
                    <span>Add new components to componentRegistry as you progress</span>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
