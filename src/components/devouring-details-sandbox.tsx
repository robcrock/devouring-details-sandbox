import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, ExternalLink, Code, Github } from 'lucide-react';

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
    component: React.lazy(() => import('./line-minimap/index')),
    description: 'Animated line visualization with scroll and hover effects',
    dependencies: ['framer-motion'],
    source: 'line-minimap.tsx',
    principles: ['Motion', 'Proximity', 'Feedback']
  },
  // Add more components as you progress through the course
};

const ComponentDisplay = ({ component }: { component: ComponentInfo | null }) => {
  if (!component) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md">
          <motion.div
            className="relative inline-block mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-orange/20 to-orange/5 blur-xl -inset-4"></div>
            <Sparkles className="relative w-24 h-24 mx-auto text-gray9" />
          </motion.div>
          <motion.h2
            className="mb-3 text-2xl font-semibold text-center text-gray12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Devouring Details
          </motion.h2>
          <motion.p
            className="mb-8 leading-relaxed text-center text-gray11"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select a prototype from the sidebar to explore its details and implementation
          </motion.p>
          
          <motion.div
            className="p-6 border shadow-lg bg-gray2/50 backdrop-blur-sm rounded-2xl border-gray3/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray12">Getting Started</h3>
            <ol className="space-y-3">
              {[
                'Select a prototype from the sidebar',
                'Explore the interactive prototype',
                'Copy source files to your project',
                'Add new components as you progress'
              ].map((step, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray11"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-orange font-semibold text-sm mt-0.5">
                    {index + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    );
  }

  const Component = component.component;
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-3 text-gray11">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span>Loading prototype...</span>
          </div>
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
};

export default function DevouringDetailsSandbox() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const categories = [...new Set(Object.values(componentRegistry).map(c => c.category))];

  return (
    <div className="flex flex-col h-screen bg-gray1 text-gray12">
      {/* Navigation */}
      <nav className="flex-shrink-0 h-16 border-b bg-gray1 border-gray3/50 backdrop-blur-sm">
        <div className="flex items-center h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-orange/60">
              <Code className="w-4 h-4 text-gray1" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Devouring Details</h1>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex-shrink-0 border-r w-80 bg-gray2/30 border-gray3/50 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Component List */}
            <div className="flex-1 overflow-y-auto">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="sticky top-0 px-6 py-4 text-xs font-medium tracking-wider uppercase border-b text-gray11 bg-gray2/50 backdrop-blur-sm border-gray3/30">
                    {category}
                  </h3>
                  <div className="p-3 space-y-1">
                    {Object.entries(componentRegistry)
                      .filter(([, c]) => c.category === category)
                      .map(([key, component]) => (
                        <motion.button
                          key={key}
                          onClick={() => {
                            console.log('Clicked:', key);
                            setActiveComponent(key);
                          }}
                          onMouseEnter={() => setHoveredComponent(key)}
                          onMouseLeave={() => setHoveredComponent(null)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-200 relative overflow-hidden ${
                            activeComponent === key
                              ? 'bg-gray3 shadow-sm'
                              : 'hover:bg-gray2/50'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-base font-medium text-gray12">
                                {component.name}
                              </h4>
                              <ChevronRight 
                                className={`w-4 h-4 text-gray10 transition-transform duration-200 flex-shrink-0 mt-0.5 ${
                                  activeComponent === key ? 'rotate-90 text-orange' : 
                                  hoveredComponent === key ? 'translate-x-1 text-gray12' : ''
                                }`} 
                              />
                            </div>
                            <p className="mb-3 text-sm leading-relaxed text-gray11">
                              {component.description}
                            </p>
                            {component.principles && (
                              <div className="flex gap-1.5 flex-wrap">
                                {component.principles.map((principle: string) => (
                                  <span 
                                    key={principle} 
                                    className="px-2 py-1 text-xs font-medium rounded-md bg-gray3/50 text-gray11"
                                  >
                                    {principle}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {activeComponent === key && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-orange/10 to-transparent"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray3/30 bg-gray2/50">
              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-gray10">
                  An interactive reference for interaction-curious designers
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://rauno.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray11 hover:text-gray12 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <Github size={14} />
                    <span>by Rauno Freiberg</span>
                    <ExternalLink size={12} className="transition-opacity opacity-0 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeComponent && (
              <motion.div 
                className="px-6 py-5 border-b border-gray3/30 bg-gray1/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="mb-1 text-2xl font-semibold text-gray12">
                      {componentRegistry[activeComponent].name}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray11">
                      <span className="font-medium">Dependencies:</span>
                      <div className="flex gap-2">
                        {componentRegistry[activeComponent].dependencies.map((dep: string) => (
                          <code 
                            key={dep} 
                            className="px-2 py-1 font-mono text-xs rounded bg-gray2 text-gray12"
                          >
                            {dep}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Component Display Area */}
          <div className="relative flex-1 bg-gray1">
            <div className="relative h-full overflow-hidden">
              <ComponentDisplay
                key={activeComponent || 'welcome'}
                component={activeComponent ? componentRegistry[activeComponent] : null}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
