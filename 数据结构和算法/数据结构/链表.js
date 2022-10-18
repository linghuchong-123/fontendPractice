function LinkedList() {
  // 内部类：节点类
  function Node(data) {
    this.data = data;
    this.next = null;
  }

  // 属性
  this.head = null;
  this.length = 0;

  // 1.追加方法
  LinkedList.prototype.append = function (data) {
    // 1.创建新的节点
    const newNode = new Node(data);

    // 2.判断是否添加的是第一个节点
    if (this.length === 0) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  };

  // 2.toString()方法
  LinkedList.prototype.toString = function () {
    // 1.定义变量
    let current = this.head;
    let listString = "";

    // 2.循环获取一个个节点
    while (current) {
      listString += current.data + " ";
      current = current.next;
    }
    return listString;
  };
}

// 测试代码
// 1.创建LinkedList
const list = new LinkedList();

// 2.测试append方法
list.append("abc");
list.append("cba");
list.append("nba");
alert(list.toString());
console.log(list);
console.dir(list);
