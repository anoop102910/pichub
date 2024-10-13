export interface Image {
  _id: string;
  title: string;
  imageUrl: string;
  desc: string;
  views: number;
}

export interface ImageData {
  message?: string;
  pages?: number;
  totalPages?: number;
  data: Image[];
}

export interface GState {
  query: string;
}