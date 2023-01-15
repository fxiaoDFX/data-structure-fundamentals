import List from "./linked-lists.js"
import BST from "./binary-search-trees.js"

export function list() {
    const list = new List()
    list.append(5)
    list.append(10)
    list.append(1)
    list.prepend(0)
    console.log(list.toString())
    list.removeAt(3)
    console.log(list.toString(), list.size, list.head, "tail: ", list.tail)
}

export function bst() {
    const array = [0, 1, 2, 0, -1, 55, 44, 10, -5]
    const tree = new BST(array)

    console.log(tree.isBalanced())

    tree.prettyPrint()

    console.log(
        "levelorder:",
        tree.levelOrder((node) => node.data)
    )
    console.log(
        "preorder: ",
        tree.preorder((node) => node.data)
    )
    console.log(
        "inorder: ",
        tree.inorder((node) => node.data)
    )
    console.log(
        "postorder: ",
        tree.postorder((node) => node.data)
    )

    tree.insert(100)
    tree.insert(200)
    tree.insert(300)
    tree.insert(400)
    console.log(tree.isBalanced())
    tree.rebalance()
    console.log(tree.isBalanced())

    console.log(
        "levelorder:",
        tree.levelOrder((node) => node.data)
    )
    console.log(
        "preorder: ",
        tree.preorder((node) => node.data)
    )
    console.log(
        "inorder: ",
        tree.inorder((node) => node.data)
    )
    console.log(
        "postorder: ",
        tree.postorder((node) => node.data)
    )
    tree.prettyPrint()
}
