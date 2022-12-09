class TreeNode {
  files = {};
  name = "";
  nodes = [];
  parent = null;
  constructor(name) {
    this.name = name;
    this.files = {};
    this.nodes = [];
  }
  addNode(name) {
    const node = new TreeNode(name);
    node.parent = this;
    this.nodes.push(node);
  }

  addFile(file) {
    this.files[file.name] = file.size;
  }
}

module.exports.Tree = class Tree {
  constructor(name) {
    this.root = new TreeNode(name);
  }
};
