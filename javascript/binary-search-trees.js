class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BST {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b)
        this.root = this.buildTree(sortedArray)
    }

    buildTree(array) {
        if (array.length === 0) return null

        const mid = Math.floor(array.length / 2)
        const node = new Node(array[mid])
        node.left = this.buildTree(array.slice(0, mid))
        node.right = this.buildTree(array.slice(mid + 1))

        return node
    }

    insert(data) {
        try {
            this.root = this.#insert(data, this.root)
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    #insert(data, root) {
        if (!root) return new Node(data)

        if (data === root.data) throw "Duplicates not allowed"
        if (data < root.data) root.left = this.#insert(data, root.left)

        if (data > root.data) root.right = this.#insert(data, root.right)

        return root
    }

    delete(data) {
        return this.#delete(data, this.root)
    }

    #delete(data, node) {
        if (!node) return null

        if (data < node.data) node.left = this.#delete(data, node.left)
        if (data > node.data) node.right = this.#delete(data, node.right)
        if (data === node.data) {
            node = this.#getSuccessor(node)
        }
        return node
    }

    #getSuccessor(node) {
        if (node.left && node.right) {
            const successor = this.#getMin(node.right)
            node.data = successor.data
            node.right = this.#delete(successor.data, node.right)
            return node
        } else {
            const successor = node.left || node.right
            node = null
            return successor
        }
    }

    #getMin(node) {
        if (!node.left) return node
        return this.#getMin(node.left)
    }

    find(value, node = this.root) {
        if (!node) return null
        if (value === node.data) return node

        if (value < node.data) return this.find(value, node.left)
        else return this.find(value, node.right)
    }

    levelOrder(cb) {
        const queue = [this.root]

        const bfsList = []
        while (queue.length) {
            const node = queue.shift()

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)

            if (cb) {
                cb(node)
            } else {
                bfsList.push(node)
            }
        }
        if (bfsList.length > 0) return bfsList
    }

    inorder(cb, node = this.root, list = []) {
        if (!node) return

        this.inorder(cb, node.left, list)
        if (cb) {
            cb(node)
        } else {
            list.push(node)
        }
        this.inorder(cb, node.right, list)

        if (list.length > 0) return list
    }

    preorder(cb, node = this.root, list = []) {
        if (!node) return

        if (cb) cb(node)
        else list.push(node)
        this.preorder(cb, node.left, list)
        this.preorder(cb, node.right, list)

        if (list.length > 0) return list
    }

    postorder(cb, node = this.root, list = []) {
        if (!node) return

        this.postorder(cb, node.left, list)
        this.postorder(cb, node.right, list)
        if (cb) cb(node)
        else list.push(node)

        if (list.length > 0) return list
    }

    height(node) {
        if (typeof node === "number") node = new Node(node)
        return this.find(node.data)
            ? this.#height(this.find(node.data)) - 1
            : null
    }

    #height(node) {
        if (!node) return 0

        const leftHeight = this.#height(node.left)
        const rightHeight = this.#height(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    depth(node) {
        if (typeof node === "number") node = new Node(node)
        return this.find(node.data) ? this.#depth(node) : null
    }

    #depth(node, root = this.root) {
        if (!node || !root) return null
        if (node.data === root.data) return 0

        if (node.data < root.data) return this.#depth(node, root.left) + 1
        else return this.#depth(node, root.right) + 1
    }

    isBalanced() {
        if (!this.root) return null

        let balanced = true
        this.levelOrder((node) => {
            let leftSubTreeHeight = node.left ? this.height(node.left) : -1
            let rightSubTreeHeight = node.right ? this.height(node.right) : -1

            if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1) {
                balanced = false
            }
        })
        return balanced
    }

    rebalance() {
        if (!this.root) return null

        let sorted = []
        this.inorder((node) => {
            sorted.push(node.data)
        })

        this.root = this.buildTree(sorted)
        console.log(sorted)
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            )
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            )
        }
    }
}

const test = (() => {
    const array = [1, 0, 1, 2, 3, 7, 5, 3, 12, 11, 4]
    const array2 = [10, 3, 4]
    const tree = new BST(array)
    const test = new BST(array2)
    tree.insert(10)
    tree.insert(0)
    test.insert(-1)
    test.insert(-3)
    tree.prettyPrint()
    console.log(tree.delete(11))
    tree.prettyPrint()
    tree.rebalance()
    tree.prettyPrint()
    console.log(tree.isBalanced())
})()

export default test
