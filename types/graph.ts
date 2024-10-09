import type { Edge, Node } from 'vis-network'

export interface Graph {
  nodes: Node[]
  edges: Edge[]
  maxLevel: number
}
