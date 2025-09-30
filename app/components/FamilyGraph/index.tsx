"use client";
import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Position,
  Handle,
} from 'reactflow';
import dagre from 'dagre';
import { Modal } from '../Modal';

interface FamilyMember {
  name: string;
  children: string[];
  birth_date: string;
  biography?: string;
  location?: string;
  occupation?: string;
  spouse?: string | null;
}

interface FamilyTreeData {
  data: {
    family_members: FamilyMember[];
    total_members: number;
  };
  success: boolean;
}

interface FamilyGraphProps {
  data: FamilyTreeData;
}

// Generate a fake avatar URL based on the person's name (happy avatars only)
const generateAvatar = (name: string): string => {
  const seed = name.replace(/\s+/g, '').toLowerCase();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50&mouth=smile,twinkle&eyes=happy,hearts,squint,wink`;
};

// Custom layout that positions spouses horizontally
const getLayoutedElements = (nodes: Node[], edges: Edge[], familyData: FamilyMember[]) => {
  const memberMap = new Map(familyData.map(m => [m.name, m]));
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Find spouse pairs
  const spousePairs = new Set<string>();
  const spouseMap = new Map<string, string>();

  familyData.forEach(member => {
    if (member.spouse && !spousePairs.has(`${member.name}-${member.spouse}`) && !spousePairs.has(`${member.spouse}-${member.name}`)) {
      spousePairs.add(`${member.name}-${member.spouse}`);
      spouseMap.set(member.name, member.spouse);
      spouseMap.set(member.spouse, member.name);
    }
  });

  // Build generation hierarchy
  const generations = new Map<string, number>();
  const childToParentsMap = new Map<string, string[]>();

  // Build parent-child map
  familyData.forEach(member => {
    member.children.forEach(child => {
      if (!childToParentsMap.has(child)) {
        childToParentsMap.set(child, []);
      }
      childToParentsMap.get(child)!.push(member.name);
    });
  });

  // Find roots and calculate generations
  const rootMembers = familyData.filter(member => !childToParentsMap.has(member.name));

  const calculateGeneration = (memberName: string, gen: number) => {
    if (generations.has(memberName)) return;
    generations.set(memberName, gen);

    const member = memberMap.get(memberName);
    if (member) {
      member.children.forEach(child => {
        calculateGeneration(child, gen + 1);
      });
    }
  };

  rootMembers.forEach(root => calculateGeneration(root.name, 0));

  // Group by generation and position spouses side by side
  const generationGroups = new Map<number, string[]>();
  generations.forEach((gen, name) => {
    if (!generationGroups.has(gen)) {
      generationGroups.set(gen, []);
    }
    generationGroups.get(gen)!.push(name);
  });

  // Position nodes with proper spacing
  const nodeWidth = 150;
  const nodeHeight = 100;
  const spouseSpacing = 200; // Space between spouses in a pair
  const pairSpacing = 400; // Space between different pairs/singles
  const verticalSpacing = 200;

  // Calculate total width needed for each generation and center them
  const generationWidths = new Map<number, number>();

  generationGroups.forEach((members, generation) => {
    const processedInGeneration = new Set<string>();
    let totalWidth = 0;
    let pairCount = 0;

    members.forEach(memberName => {
      if (processedInGeneration.has(memberName)) return;

      const spouse = spouseMap.get(memberName);

      if (spouse && members.includes(spouse)) {
        // This is a spouse pair
        totalWidth += spouseSpacing + nodeWidth;
        processedInGeneration.add(memberName);
        processedInGeneration.add(spouse);
        pairCount++;
      } else {
        // Single person
        totalWidth += nodeWidth;
        processedInGeneration.add(memberName);
        pairCount++;
      }
    });

    // Add spacing between pairs/singles
    if (pairCount > 1) {
      totalWidth += (pairCount - 1) * (pairSpacing - nodeWidth);
    }

    generationWidths.set(generation, totalWidth);
  });

  // Position nodes centered for each generation
  generationGroups.forEach((members, generation) => {
    const processedInGeneration = new Set<string>();
    const totalWidth = generationWidths.get(generation) || 0;
    let currentX = -totalWidth / 2; // Start from left edge of centered layout

    members.forEach(memberName => {
      if (processedInGeneration.has(memberName)) return;

      const node = nodeMap.get(memberName);
      if (!node) return;

      const spouse = spouseMap.get(memberName);
      const spouseNode = spouse ? nodeMap.get(spouse) : null;

      if (spouse && spouseNode && members.includes(spouse)) {
        // Position spouse pair
        node.position = {
          x: currentX,
          y: generation * verticalSpacing,
        };

        spouseNode.position = {
          x: currentX + spouseSpacing,
          y: generation * verticalSpacing,
        };

        processedInGeneration.add(memberName);
        processedInGeneration.add(spouse);
        currentX += spouseSpacing + nodeWidth + (pairSpacing - nodeWidth);
      } else {
        // Single person
        node.position = {
          x: currentX,
          y: generation * verticalSpacing,
        };

        processedInGeneration.add(memberName);
        currentX += nodeWidth + (pairSpacing - nodeWidth);
      }
    });
  });

  // Set source/target positions
  nodes.forEach(node => {
    node.sourcePosition = Position.Bottom;
    node.targetPosition = Position.Top;
  });

  return { nodes, edges };
};

// Custom node component for family members
const FamilyNode = ({ data }: { data: any }) => {
  return (
    <div className="family-node bg-zinc-800 border-2 border-zinc-600 rounded-lg p-3 min-w-[120px] cursor-pointer hover:border-blue-400 transition-colors">
      {/* Handle for incoming connections (from parents) */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#3b82f6', width: 8, height: 8 }}
      />

      {/* Handle for outgoing connections (to children) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#3b82f6', width: 8, height: 8 }}
      />

      {/* Handles for spouse connections */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ background: '#ef4444', width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ background: '#ef4444', width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#ef4444', width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ background: '#ef4444', width: 8, height: 8 }}
      />

      <div className="flex flex-col items-center space-y-2">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-12 h-12 rounded-full border-2 border-zinc-500"
        />
        <div className="text-center">
          <div className="text-zinc-100 font-semibold text-sm">
            {data.name.split(' ')[0]}
          </div>
          <div className="text-zinc-400 text-xs">
            {data.birth_date ? new Date(data.birth_date).getFullYear() : ''}
          </div>
          {data.occupation && data.occupation !== 'None' && (
            <div className="text-zinc-500 text-xs truncate max-w-[100px]">
              {data.occupation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Node types for React Flow
const nodeTypes = {
  familyMember: FamilyNode,
};

export const FamilyGraph: React.FC<FamilyGraphProps> = ({ data }) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform family data into nodes and edges
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const members = data.data.family_members;
    const memberMap = new Map(members.map(m => [m.name, m]));

    // Create nodes for each family member
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create nodes (positioning will be handled by dagre)
    members.forEach((member, index) => {
      nodes.push({
        id: member.name,
        type: 'familyMember',
        position: { x: 0, y: 0 }, // Will be overridden by layout
        data: {
          ...member,
          avatar: generateAvatar(member.name),
          onClick: () => {
            setSelectedMember(member);
            setIsModalOpen(true);
          },
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
    });

    // Create edges for parent-child relationships
    members.forEach(member => {
      member.children.forEach(childName => {
        // Make sure both nodes exist before creating edge
        if (memberMap.has(childName)) {
          edges.push({
            id: `parent-${member.name}-${childName}`,
            source: member.name,
            target: childName,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            style: {
              stroke: '#3b82f6',
              strokeWidth: 2
            },
            animated: false,
          });
        }
      });
    });

    // Create edges for spouse relationships
    const processedSpouses = new Set<string>();
    members.forEach(member => {
      if (member.spouse &&
          memberMap.has(member.spouse) &&
          !processedSpouses.has(member.name) &&
          !processedSpouses.has(member.spouse)) {

        // Try different handle combinations for better visibility
        edges.push({
          id: `spouse-${member.name}-${member.spouse}`,
          source: member.name,
          target: member.spouse,
          type: 'straight',
          sourceHandle: 'right',
          targetHandle: 'left-target',
          style: {
            stroke: '#ef4444',
            strokeWidth: 3,
            strokeDasharray: '8,4'
          },
          animated: true,
          label: '💕',
          labelStyle: { fontSize: 16 },
        });
        processedSpouses.add(member.name);
        processedSpouses.add(member.spouse);
      }
    });

    console.log('Created nodes:', nodes.length);
    console.log('Created edges:', edges.length);
    console.log('Spouse edges:', edges.filter(e => e.id.startsWith('spouse-')));
    console.log('Parent edges:', edges.filter(e => e.id.startsWith('parent-')));

    // Apply custom layout with family data
    const layouted = getLayoutedElements(nodes, edges, members);

    return layouted;
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.data.onClick) {
      node.data.onClick();
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="w-full h-[600px] bg-zinc-900 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        style={{ width: '100%', height: '100%' }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls className="bg-zinc-800 border-zinc-600" />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#52525b" />
      </ReactFlow>

      {/* Member Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMember && (
          <div className="p-6 max-w-lg mx-auto bg-white rounded-lg">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={generateAvatar(selectedMember.name)}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-full border-2 border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedMember.name}
                </h2>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">
                    Born: {selectedMember.birth_date ?
                      new Date(selectedMember.birth_date).toLocaleDateString() :
                      'Unknown'
                    }
                  </p>
                  {selectedMember.spouse && (
                    <p className="text-gray-600 text-sm">
                      Spouse: {selectedMember.spouse}
                    </p>
                  )}
                  {selectedMember.location && (
                    <p className="text-gray-600 text-sm">
                      Location: {selectedMember.location}
                    </p>
                  )}
                  {selectedMember.occupation && selectedMember.occupation !== 'None' && (
                    <p className="text-gray-600 text-sm">
                      Occupation: {selectedMember.occupation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {selectedMember.biography && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {selectedMember.biography}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
