'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, Code, Database, Server, Globe, Shield, Zap, Cpu } from 'lucide-react';
import { roleAPI } from '@/utils/api';

interface Role {
  id: string;
  name: string;
  description: string;
  category: string;
  techStack: string;
}

interface AnimatedRoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const roleIcons: Record<string, React.ComponentType<any>> = {
  'Frontend React Developer': Code,
  'Backend Node.js Developer': Server,
  'Full Stack Developer': Globe,
  'DevOps Engineer': Shield,
  'Data Scientist': Database,
  'Mobile Developer': Zap,
  'System Administrator': Cpu,
  'UI/UX Designer': Code,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function AnimatedRoleSelector({ selectedRole, onRoleChange }: AnimatedRoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await roleAPI.getDefaultRoles();
        if (response.success && response.roles) {
          setRoles(response.roles);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Select Your Role
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4"
      >
        Select Your Role
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {roles.map((role, index) => {
          const IconComponent = roleIcons[role.name] || Code;
          const isSelected = selectedRole === role.name;
          
          return (
            <motion.div
              key={role.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onRoleChange(role.name)}
              className={`
                relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/25' 
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                }
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}

              {/* Role Icon */}
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4"
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>

              {/* Role Name */}
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {role.name}
              </h3>

              {/* Role Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {role.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1">
                {role.techStack.split(',').slice(0, 3).map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: techIndex * 0.1 }}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full"
                  >
                    {tech.trim()}
                  </motion.span>
                ))}
                {role.techStack.split(',').length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded-full">
                    +{role.techStack.split(',').length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
} 