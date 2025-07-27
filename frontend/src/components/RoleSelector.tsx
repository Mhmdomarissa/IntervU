'use client';

import { useState, useEffect } from 'react';
import { roleAPI } from '@/utils/api';
import { Role } from '@intervu/shared';
import { ChevronDown, Code, Server, Cloud, Smartphone, Layers, Cog } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const roleIcons: Record<string, any> = {
  frontend: Code,
  backend: Server,
  devops: Cloud,
  mobile: Smartphone,
  fullstack: Layers,
  general: Cog
};

export default function RoleSelector({ selectedRole, onRoleChange }: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const response = await roleAPI.getDefaultRoles();
        if (response.success && response.roles) {
          setRoles(response.roles);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const selectedRoleData = roles.find(role => role.name === selectedRole);

  const handleRoleSelect = (roleName: string) => {
    onRoleChange(roleName);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full input-field flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-3">
          {selectedRoleData ? (
            <>
              {(() => {
                const Icon = roleIcons[selectedRoleData.category] || roleIcons.general;
                return <Icon className="w-5 h-5 text-primary-600" />;
              })()}
              <div>
                <div className="font-medium text-gray-900">{selectedRoleData.name}</div>
                <div className="text-sm text-gray-500">{selectedRoleData.description}</div>
              </div>
            </>
          ) : (
            <span className="text-gray-500">Select a role...</span>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {roles.map((role) => {
            const Icon = roleIcons[role.category] || roleIcons.general;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.name)}
                className="w-full p-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{role.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{role.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {role.techStack?.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {role.techStack && role.techStack.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{role.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
} 