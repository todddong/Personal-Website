export function localPathToSupabasePath(localPath: string): string {
  return localPath.replace(/^\/media\//, '');
}

export function supabasePathToLocalPath(supabasePath: string): string {
  return `/media/${supabasePath}`;
}

export function isLocalPath(path: string): boolean {
  return path.startsWith('/media/');
}
