import { motion } from 'motion/react';

// Import any shared utilities or hooks
// import { useSomeHook } from './hooks/useSomeHook';
// import { someUtility } from './utils/some-utility';

export default function PrototypeName() {
  // Component state and hooks
  // const someValue = useSomeHook();

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray1 via-gray1 to-gray2/20">
      {/* Your prototype content goes here */}
      <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-4 text-2xl font-semibold text-gray12">
            Prototype Name
          </h2>
          <p className="text-gray11">
            Replace this with your prototype implementation
          </p>
        </motion.div>
      </div>

      {/* Instructions overlay */}
      <Instructions />
    </div>
  );
}

function Instructions() {
  return (
    <motion.div 
      className="fixed z-20 -translate-x-1/2 bottom-8 left-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="px-6 py-4 border shadow-xl bg-gray2/80 backdrop-blur-md rounded-2xl border-gray3/50">
        <p className="text-sm text-center text-gray11">
          Add your interaction instructions here
        </p>
      </div>
    </motion.div>
  );
}
