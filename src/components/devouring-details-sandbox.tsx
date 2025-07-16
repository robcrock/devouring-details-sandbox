import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, ExternalLink } from 'lucide-react';

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

  useEffect(() => {
    // Apply dark mode class permanently
    document.documentElement.classList.add('dark');
  }, []);

  const categories = [...new Set(Object.values(componentRegistry).map(c => c.category))];

  const ComponentDisplay = ({ component }: { component: ComponentInfo | null }) => {
    if (!component) {
      return (
        <div className="flex items-center justify-center h-full text-gray11">
          <div className="text-center max-w-lg px-8">
            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 bg-orange rounded-full blur-2xl opacity-20 absolute inset-0"></div>
              <Sparkles className="w-32 h-32 text-gray9 relative" />
            </div>
            <p className="text-20 leading-32 px-4">Select a prototype from the sidebar to explore its details</p>
          </div>
        </div>
      );
    }

    const Component = component.component;
    return (
      <React.Suspense fallback={<div className="flex items-center justify-center h-full text-gray11 p-8">Loading...</div>}>
        <Component />
      </React.Suspense>
    );
  };

  return (
    <div className="h-screen bg-gray1 text-gray12 flex flex-col">
      {/* Navigation */}
      <nav className="h-16 bg-gray1 border-b border-gray4 flex-shrink-0">
        <div className="flex items-center h-16 px-8">
          <h1 className="text-20 font-weight-500 pl-4 py-2">Devouring Details</h1>
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
                  <h3 className="text-11 uppercase tracking-widest font-weight-600 text-gray11 px-8 py-5 sticky top-0 bg-gray2 border-b border-gray4">
                    {category}
                  </h3>
                  <div className="p-6 space-y-2">
                    {Object.entries(componentRegistry)
                      .filter(([, c]) => c.category === category)
                      .map(([key, component]) => (
                        <motion.button
                          key={key}
                          onClick={() => {
                            setActiveComponent(key);
                          }}
                          className={`w-full text-left px-6 py-6 rounded-12 transition-all relative group ${
                            activeComponent === key
                              ? 'bg-gray3 border border-gray5'
                              : 'hover:bg-gray3/30 border border-transparent'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="text-18 font-weight-600 mb-3 text-gray12">{component.name}</div>
                              <div className="text-14 text-gray11 leading-24 mb-4">
                                {component.description}
                              </div>
                              {component.principles && (
                                <div className="flex gap-1.5 flex-wrap">
                                  {component.principles.map((principle: string) => (
                                    <span key={principle} className="text-11 px-3 py-1.5 bg-gray3 rounded-6 text-gray11 font-weight-500">
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
              <p className="text-12 text-gray10 mb-4 leading-20">
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
            <div className="border-b border-gray4 px-8 py-6 bg-gray2/50">
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
              </div>
            </div>
          )}

          {/* Component Display Area */}
          <div className="flex-1 relative bg-gray1">
            <div className="h-full relative overflow-hidden">
              <ComponentDisplay component={activeComponent ? componentRegistry[activeComponent] : null} />
            </div>
          </div>

          {/* Instructions */}
          {!activeComponent && (
            <div className="p-8 flex items-center justify-center h-full">
              <div className="bg-gray2 rounded-16 p-10 shadow-border-medium max-w-2xl">
                <h3 className="text-20 font-weight-500 mb-6">Getting Started</h3>
                <ol className="space-y-4 text-15 text-gray11 leading-24">
                  <li className="flex gap-4">
                    <span className="text-orange font-weight-500 flex-shrink-0">1.</span>
                    <span className="leading-relaxed">Select a prototype from the sidebar to explore</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-orange font-weight-500 flex-shrink-0">2.</span>
                    <span className="leading-relaxed">Explore the interactive prototype</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-orange font-weight-500 flex-shrink-0">3.</span>
                    <span className="leading-relaxed">Copy source files and styles to your project</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-orange font-weight-500 flex-shrink-0">4.</span>
                    <span className="leading-relaxed">Add new components to componentRegistry as you progress</span>
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
