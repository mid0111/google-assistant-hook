export interface Shortcut {
  id: number;
  name: String;
  words: String[];
  machines: Machine[];
  isEditMode: Boolean;
  getMachine(name: String): Machine;
}

export interface Machine {
  id: String;
  name: String;
  operations: String[];
  selectedOperation: String;
}
