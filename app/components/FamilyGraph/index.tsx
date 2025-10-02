"use client";
import React, { useState, useCallback, useMemo } from "react";
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
  ConnectionLineType
} from "reactflow";
import { Modal } from "../Modal";
// Import some spiritual/memorial icons from react-icons
import { GiFeatheredWing } from "react-icons/gi";
import dagre from "dagre";

interface FamilyMember {
  name: string;
  children: string[];
  birth_date: string;
  biography?: string;
  location?: string;
  occupation?: string;
  spouse?: string | null;
  death_date?: string | null;
  gender?: string;
}

interface FamilyTreeData {
  data: {
    family_members: FamilyMember[];
    total_members: number;
  };
  success: boolean;
}

interface FamilyNodeData {
  name: string;
  birth_date: string;
  biography?: string;
  location?: string;
  occupation?: string;
  spouse?: string | null;
  death_date?: string | null;
  gender?: string;
  avatar: string;
  onClick: () => void;
}

interface FamilyGraphProps {
  data: FamilyTreeData;
}

// Format date to readable format (e.g., "Oct 8, 1990")
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
};

// Generate a gender-appropriate avatar URL based on the person's name and gender
const generateAvatar = (name: string, gender?: string): string => {
  const seed = name.replace(/\s+/g, "").toLowerCase();

  // Base parameters for happy avatars
  const baseParams = `seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50&mouth=smile,twinkle&eyes=happy,hearts,squint,wink`;

  // Simple gender differentiation using only well-documented parameters
  if (gender === 'female') {
    // Female: no facial hair
    return `https://api.dicebear.com/7.x/avataaars/svg?${baseParams}&facialHair=blank`;
  } else if (gender === 'male') {
    // Male: allow facial hair options
    return `https://api.dicebear.com/7.x/avataaars/svg?${baseParams}&facialHair=blank,beard,beardLight`;
  } else {
    // Default: no specific gender styling
    return `https://api.dicebear.com/7.x/avataaars/svg?${baseParams}`;
  }
};

// Custom layout that positions spouses next to each other
const getLayoutedElements = (nodes: Node[], edges: Edge[], members: FamilyMember[]) => {
  // First, identify spouse pairs
  const spousePairs = new Map<string, string>();
  const processedSpouses = new Set<string>();

  members.forEach((member) => {
    if (member.spouse && !processedSpouses.has(member.name) && !processedSpouses.has(member.spouse)) {
      spousePairs.set(member.name, member.spouse);
      spousePairs.set(member.spouse, member.name);
      processedSpouses.add(member.name);
      processedSpouses.add(member.spouse);
    }
  });

  // Use dagre for initial hierarchical layout (parent-child only)
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'TB',
    nodesep: 200,
    ranksep: 200,
    marginx: 100,
    marginy: 100,
  });

  // Add nodes to dagre
  nodes.forEach((node) => {
    const hasWings = node.data.death_date && node.data.death_date.trim() !== "";
    const nodeWidth = hasWings ? 160 : 120;
    const nodeHeight = 100;
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Add only parent-child edges to dagre for hierarchical structure
  const parentChildEdges = edges.filter(edge => edge.id.startsWith('parent-'));
  parentChildEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target, {
      minlen: 1,
      weight: 1
    });
  });

  // Calculate initial layout
  dagre.layout(dagreGraph);

  // Apply positions and adjust for spouse pairs
  const nodePositions = new Map<string, { x: number, y: number }>();

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const baseX = nodeWithPosition.x - nodeWithPosition.width / 2;
    const baseY = nodeWithPosition.y - nodeWithPosition.height / 2;

    // If this node has a spouse, position them side by side
    if (spousePairs.has(node.id)) {
      const spouseName = spousePairs.get(node.id)!;

      // Only process each pair once (use alphabetical order to be consistent)
      if (node.id < spouseName && !nodePositions.has(node.id)) {
        // Position current node slightly to the left (increased spacing)
        nodePositions.set(node.id, { x: baseX - 120, y: baseY });
        // Position spouse slightly to the right (increased spacing)
        nodePositions.set(spouseName, { x: baseX + 120, y: baseY });
      } else if (!nodePositions.has(node.id)) {
        // This spouse was already positioned, use existing position
        const existingPos = nodePositions.get(spouseName);
        if (existingPos) {
          nodePositions.set(node.id, { x: existingPos.x + 240, y: existingPos.y });
        } else {
          nodePositions.set(node.id, { x: baseX, y: baseY });
        }
      }
    } else {
      // Single person, use dagre position
      nodePositions.set(node.id, { x: baseX, y: baseY });
    }
  });

  // Apply final positions
  nodes.forEach((node) => {
    const pos = nodePositions.get(node.id);
    if (pos) {
      node.position = pos;
    }

    node.sourcePosition = Position.Bottom;
    node.targetPosition = Position.Top;
  });

  return { nodes, edges };
};

// Custom node component for family members

const FamilyNode = ({ data }: { data: FamilyNodeData }) => {
  const isDeceased = data.death_date && data.death_date.trim() !== "";

  return (
    <div className={`family-node bg-zinc-800 border-2 rounded-lg p-3 min-w-[120px] cursor-pointer transition-colors relative ${
      isDeceased
        ? 'border-yellow-400/50 hover:border-yellow-300'
        : 'border-zinc-600 hover:border-blue-400'
    }`}>

      {/* Handle for incoming connections (from parents) */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: "#3b82f6", width: 8, height: 8 }}
      />

      {/* Handle for outgoing connections (to children) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: "#3b82f6", width: 8, height: 8 }}
      />

      {/* Handles for spouse connections */}
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ background: "#ef4444", width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ background: "#ef4444", width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: "#ef4444", width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        style={{ background: "#ef4444", width: 8, height: 8 }}
      />

      <div className="flex flex-col items-center space-y-2">
        {isDeceased ? (
          /* Angel Layout: Left Wing - Avatar - Right Wing */
          <div className="relative flex items-center justify-center w-20 h-12">
            {/* Left Wing */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white opacity-90">
              <GiFeatheredWing className="w-6 h-6 drop-shadow-lg" />
            </div>

            {/* Avatar in center */}
            <img
              src={data.avatar}
              alt={data.name}
              className="w-12 h-12 rounded-full border-2 border-white/60 relative z-10 shadow-lg shadow-white/20"
            />

            {/* Right Wing */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white opacity-90">
              <GiFeatheredWing className="w-6 h-6 drop-shadow-lg transform -scale-x-100" />
            </div>

            {/* Subtle glow for deceased members */}
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
          </div>
        ) : (
          /* Normal Avatar for living members */
          <img
            src={data.avatar}
            alt={data.name}
            className="w-12 h-12 rounded-full border-2 border-zinc-500"
          />
        )}

        <div className="text-center">
          <div className={`font-semibold text-sm ${
            isDeceased ? 'text-white' : 'text-zinc-100'
          }`}>
            {data.name.split(" ").slice(0, 2).join(" ")}
          </div>
          {data.occupation && data.occupation !== "None" && (
            <div className="text-zinc-500 text-xs truncate max-w-[100px] text-center">{data.occupation}</div>
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
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  // Transform family data into nodes and edges
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const members = data.data.family_members;
    const memberMap = new Map(members.map((m) => [m.name, m]));

    // Create nodes for each family member
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create nodes (positioning will be handled by dagre)
    members.forEach((member, index) => {
      nodes.push({
        id: member.name,
        type: "familyMember",
        position: { x: 0, y: 0 }, // Will be overridden by layout
        data: {
          ...member,
          avatar: generateAvatar(member.name, member.gender),
          onClick: () => {
            setSelectedMember(member);
            setIsModalOpen(true);
          },
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      });
    });

    // Create edges for parent-child relationships with unique routing
    let edgeCounter = 0;
    members.forEach((member) => {
      member.children.forEach((childName, childIndex) => {
        // Make sure both nodes exist before creating edge
        if (memberMap.has(childName)) {
          // Add slight offset to prevent edge combining
          const offset = childIndex * 10;

          const edgeId = `parent-${member.name}-${childName}-${edgeCounter}`;
          const isHighlighted = selectedEdges.includes(edgeId) ||
                               highlightedNode === member.name ||
                               highlightedNode === childName;

          // Debug logging
          if (highlightedNode && (highlightedNode === member.name || highlightedNode === childName)) {
            console.log('Highlighting edge:', edgeId, 'for node:', highlightedNode);
          }

          edges.push({
            id: edgeId,
            source: member.name,
            target: childName,
            type: "default",
            // Remove specific handles to let React Flow route automatically
            style: {
              stroke: isHighlighted ? "#22c55e" : "#3b82f6",
              strokeWidth: isHighlighted ? 4 : 2,
              opacity: highlightedNode && !isHighlighted ? 0.3 : 1,
            },
            animated: isHighlighted,
            // Add custom data to force unique rendering
            data: {
              offset: offset,
              parentName: member.name,
              childName: childName,
              edgeIndex: edgeCounter,
              relationship: 'parent-child'
            },
          });
          edgeCounter++;
        }
      });
    });

    // Create edges for spouse relationships with unique colors and proper handle connections
    const spouseColors = [
      "#ef4444", // red
      "#f97316", // orange
      "#eab308", // yellow
      "#22c55e", // green
      "#06b6d4", // cyan
      "#3b82f6", // blue
      "#8b5cf6", // violet
      "#ec4899", // pink
      "#f59e0b", // amber
      "#10b981", // emerald
    ];

    const processedSpouses = new Set<string>();
    let spouseColorIndex = 0;

    members.forEach((member) => {
      if (
        member.spouse &&
        memberMap.has(member.spouse) &&
        !processedSpouses.has(`${member.name}-${member.spouse}`) &&
        !processedSpouses.has(`${member.spouse}-${member.name}`)
      ) {
        const spouseColor = spouseColors[spouseColorIndex % spouseColors.length];

        // Determine which spouse is on the left (alphabetically first) to connect properly
        const leftSpouse = member.name < member.spouse ? member.name : member.spouse;
        const rightSpouse = member.name < member.spouse ? member.spouse : member.name;

        const spouseEdgeId = `spouse-${leftSpouse}-${rightSpouse}`;
        const isSpouseHighlighted = selectedEdges.includes(spouseEdgeId) ||
                                   highlightedNode === leftSpouse ||
                                   highlightedNode === rightSpouse;

        edges.push({
          id: spouseEdgeId,
          source: leftSpouse,
          target: rightSpouse,
          type: "straight", // Use straight for clean horizontal connections
          sourceHandle: "right", // Connect from right side of left spouse
          targetHandle: "left-target", // Connect to left side of right spouse
          style: {
            stroke: isSpouseHighlighted ? "#fbbf24" : spouseColor,
            strokeWidth: isSpouseHighlighted ? 5 : 3,
            strokeDasharray: "8,4",
            opacity: highlightedNode && !isSpouseHighlighted ? 0.3 : 1,
          },
          animated: true,
          label: "💕",
          labelStyle: {
            fontSize: isSpouseHighlighted ? 20 : 16,
            color: isSpouseHighlighted ? "#fbbf24" : spouseColor,
            fontWeight: 'bold'
          },
          data: {
            relationship: 'spouse',
            color: spouseColor,
            leftSpouse: leftSpouse,
            rightSpouse: rightSpouse
          }
        });

        processedSpouses.add(`${member.name}-${member.spouse}`);
        processedSpouses.add(`${member.spouse}-${member.name}`);
        spouseColorIndex++;
      }
    });

    // Apply custom layout that positions spouses next to each other
    const layouted = getLayoutedElements(nodes, edges, members);

    return layouted;
  }, [data, selectedEdges, highlightedNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update edge styles when highlighting changes
  React.useEffect(() => {
    setEdges(currentEdges =>
      currentEdges.map(edge => {
        const isHighlighted = selectedEdges.includes(edge.id) ||
                             highlightedNode === edge.source ||
                             highlightedNode === edge.target;

        const isSpouseEdge = edge.id.startsWith('spouse-');

        if (isSpouseEdge) {
          const originalColor = edge.data?.color || "#ef4444";
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: isHighlighted ? "#fbbf24" : originalColor,
              strokeWidth: isHighlighted ? 5 : 3,
              opacity: highlightedNode && !isHighlighted ? 0.3 : 1,
            },
            animated: true,
            labelStyle: {
              ...edge.labelStyle,
              fontSize: isHighlighted ? 20 : 16,
              color: isHighlighted ? "#fbbf24" : originalColor,
            }
          };
        } else {
          // Parent-child edge
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: isHighlighted ? "#22c55e" : "#3b82f6",
              strokeWidth: isHighlighted ? 4 : 2,
              opacity: highlightedNode && !isHighlighted ? 0.3 : 1,
            },
            animated: isHighlighted,
          };
        }
      })
    );
  }, [selectedEdges, highlightedNode, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Check if Ctrl/Cmd key is pressed for highlighting mode
    if (event.ctrlKey || event.metaKey) {
      // Toggle node highlighting
      if (highlightedNode === node.id) {
        setHighlightedNode(null);
        setSelectedEdges([]);
      } else {
        setHighlightedNode(node.id);
        // Find all edges connected to this node using current edges
        const connectedEdges = edges
          .filter(edge => edge.source === node.id || edge.target === node.id)
          .map(edge => edge.id);
        console.log('Node clicked:', node.id, 'Connected edges:', connectedEdges);
        setSelectedEdges(connectedEdges);
      }
    } else {
      // Normal click - open modal
      if (node.data.onClick) {
        node.data.onClick();
      }
    }
  }, [highlightedNode, edges]);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: any) => {
    event.stopPropagation();

    // Toggle edge selection
    if (selectedEdges.includes(edge.id)) {
      setSelectedEdges(prev => prev.filter(id => id !== edge.id));
      if (selectedEdges.length === 1) {
        setHighlightedNode(null);
      }
    } else {
      setSelectedEdges([edge.id]);
      setHighlightedNode(null);
    }
  }, [selectedEdges]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const clearSelection = () => {
    setSelectedEdges([]);
    setHighlightedNode(null);
  };

  return (
    <div className="w-full h-[600px] bg-zinc-900 rounded-lg overflow-hidden relative">
      {/* Selection Info Panel */}
      {(selectedEdges.length > 0 || highlightedNode) && (
        <div className="absolute top-4 left-4 z-10 bg-zinc-800/90 backdrop-blur-sm rounded-lg p-3 border border-zinc-600">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-zinc-200">
              {highlightedNode && (
                <div>Showing connections for: <span className="font-semibold text-green-400">{highlightedNode}</span></div>
              )}
              {selectedEdges.length > 0 && !highlightedNode && (
                <div>Selected: <span className="font-semibold text-blue-400">{selectedEdges.length} edge(s)</span></div>
              )}
            </div>
            <button
              onClick={clearSelection}
              className="text-zinc-400 hover:text-white transition-colors"
              title="Clear selection"
            >
              ✕
            </button>
          </div>
          <div className="text-xs text-zinc-400 mt-1">
            Click edges to select • Ctrl+Click nodes to highlight connections
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,  // More padding around the graph
          minZoom: 0.3,  // Allow zooming out more
          maxZoom: 1.2   // Limit zoom in
        }}
        attributionPosition="bottom-left"
        style={{ width: "100%", height: "100%" }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}  // Start more zoomed out
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        connectionLineType={ConnectionLineType.SmoothStep}
        edgesFocusable={true}
        nodesFocusable={true}
      >
        <Controls className="bg-zinc-800 border-zinc-600" />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#52525b" />
      </ReactFlow>

      {/* Member Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMember && (
          <div className="p-8 max-w-lg mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={generateAvatar(selectedMember.name, selectedMember.gender)}
                alt={selectedMember.name}
                className="w-20 h-20 rounded-full border-2 border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">
                    Born:{" "}
                    {selectedMember.birth_date
                      ? formatDate(selectedMember.birth_date)
                      : "Unknown"}
                  </p>
                  {selectedMember.death_date && selectedMember.death_date.trim() !== "" && (
                    <p className="text-gray-600 text-sm">
                      Died:{" "}
                      {formatDate(selectedMember.death_date)}
                      <span className="ml-2 text-yellow-600">👼</span>
                    </p>
                  )}
                  {selectedMember.spouse && (
                    <p className="text-gray-600 text-sm">Spouse: {selectedMember.spouse}</p>
                  )}
                  {selectedMember.location && (
                    <p className="text-gray-600 text-sm">Location: {selectedMember.location}</p>
                  )}
                  {selectedMember.occupation && selectedMember.occupation !== "None" && (
                    <p className="text-gray-600 text-sm">Occupation: {selectedMember.occupation}</p>
                  )}
                </div>
              </div>
            </div>

            {selectedMember.biography && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{selectedMember.biography}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
