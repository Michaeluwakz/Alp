export interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string;
  imageHint: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  imageHint: string;
}

export interface ValuePropositionItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}
