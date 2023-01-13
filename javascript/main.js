import createLinkedList from "./linked-lists.js"

const list = createLinkedList()

list.append(5)
list.append(10)
list.append(1)
list.prepend(0)
console.log(list.toString())
list.removeAt(3)
console.log(list.toString(), list.size, list.head, "tail: ", list.tail)
