/** public/ 以下のファイルのパス（GitHub Pages のサブパスを付ける） */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
