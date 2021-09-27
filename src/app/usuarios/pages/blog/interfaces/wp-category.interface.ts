/**Interfaz utilizada para crear una categoría */
export interface WpCategory {
    id: number;
    name: string;
    description?: string;
    slug?: string;
}