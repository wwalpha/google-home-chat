/** パス変換 */
export const resolveLocalFileURL = (path: string): Promise<Entry> => new Promise((resolve, reject) => {
  window.resolveLocalFileSystemURL(path, (entry: Entry) => resolve(entry), (error: FileError) => reject(error),
  );
});

/** フォルダ */
export const getDirectory = (dirEntry: DirectoryEntry, path: string, options?: Flags): Promise<DirectoryEntry> => new Promise((resolve, reject) => {
  dirEntry.getDirectory(
    path,
    { create: true },
    (entry: DirectoryEntry) => resolve(entry),
    (error: FileError) => reject(error));
});

/**  */
export const getDir = async (parent: string, path: string): Promise<DirectoryEntry> => {
  const entry: Entry = await resolveLocalFileURL(parent);

  if (entry.isFile) {
    return Promise.reject(FileError.NOT_FOUND_ERR);
  }

  const dirEntry: DirectoryEntry = entry as DirectoryEntry;

  return await getDirectory(dirEntry, path, { create: true });
};

/** フォルダ一覧 */
export const dirEntries = (reader: DirectoryReader): Promise<Entry[]> => new Promise((resolve, reject) => {
  reader.readEntries((entries: Entry[]) => resolve(entries), (error: FileError) => reject(error));
});

export const dirList = async (path: string): Promise<Entry[]> => {
  const entry: Entry = await resolveLocalFileURL(path);

  if (entry.isFile) {
    return [];
  }

  const dirEntry: DirectoryEntry = entry as DirectoryEntry;

  return await dirEntries(dirEntry.createReader());
};

const read = (entry: FileEntry): Promise<any> => new Promise((resolve, reject) => {
  entry.file(
    (file: File) => {
      console.log('readfile');
      const reader = new FileReader();
      reader.onload = () => {
        console.log('onload', reader);
        resolve(reader.result);
      };

      reader.readAsArrayBuffer(file);
    },
    (err: FileError) => reject(err));
});

/** ローカルファイルを読取 */
export const readFile = async (localpath: string) => {
  const file: FileEntry = await resolveLocalFileURL(localpath) as FileEntry;

  return await read(file);
};
