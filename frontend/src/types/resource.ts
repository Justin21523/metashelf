export interface Resource {
  id: number;
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
  publication_year?: number;
  call_number?: string;
  subject_headings?: string;
  description?: string;
  cover_image?: string;
}
